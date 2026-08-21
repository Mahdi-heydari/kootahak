# Project: Link Shortening System with Advanced Analytics

> This file lives at `backend/CLAUDE.md` and is auto-loaded automatically by Claude Code for any session working inside `backend/` (Claude Code walks up from the working directory looking for `CLAUDE.md`, so keeping it here — not at the monorepo root — is intentional: it should not leak into `frontend/` sessions, since Claude Code's scope is backend-only, see section 2). No need to mention it explicitly.

> ⚠️ **Project brain:** a skill-formatted copy of this same content also lives at [`.claude/skills/project-brain/SKILL.md`](.claude/skills/project-brain/SKILL.md). Unlike this file, that skill is **not** auto-loaded — it's only pulled in deliberately (via `/project-brain`, or when the skill's description matches the current task). Treat the skill as the deliberate, deep-dive companion to this always-loaded summary; check it before any architecture decision, schema change, or anything touching project scope. Keep both files in sync when either one changes.

---

## 1. Project vision and goal

This project is a **URL shortener with a special focus on visit analytics** (similar to bit.ly, but with more detailed stats: device, geographic location, referral source).

**The project's goal is resume-building, not a real commercial product.** This means:
- Code quality, readability, and clean architecture matter more than aggressive development speed.
- The project should demonstrate that the team (me + two frontend developers) can coordinate on a real, multi-service system (NestJS + Postgres + Redis + Worker).
- **Avoid over-engineering for a scale that will never happen.** This is a demo for presenting, not a service with millions of users.

## 2. Roles and Claude Code's scope

- I (the developer who wrote this file) am the project's sole backend developer.
- Two other people work independently on `frontend/`.
- **Claude Code should only work inside `backend/`**, unless explicitly asked to touch another file (e.g. the root `docker-compose.yml` or `README.md`).
- This is my first team project, and the first time I don't have my hands on the frontend — so **the API contract (endpoints, exact response shape, status codes) must stay stable and documented**, because the other two people depend on it and an uncoordinated breaking change is expensive.

## 3. Final tech stack

| Part | Technology |
|---|---|
| Framework | NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache + async queue | Redis |
| Queue monitor (proposed, unconfirmed) | BullMQ (`@nestjs/bullmq`) — the standard NestJS ecosystem choice for Redis-backed queues |

## 4. Overall architecture — the most important section of the project

### Link shortening flow
1. Authenticated user submits the original URL.
2. Backend generates a unique `shortCode`.
3. The link record is saved to Postgres.

### Redirect flow (performance-sensitive part)
1. A visitor clicks the short link.
2. Backend first checks Redis (**cache-aside pattern**): if the `shortCode` is cached, redirect immediately.
3. If not cached, read from Postgres, cache it in Redis, then redirect.
4. **The user is never blocked on analytics processing.** Immediately after or concurrently with the redirect, a job (containing IP, User-Agent, Referer, `linkId`, timestamp) is pushed onto the Redis queue.
5. A **separate Worker** (an independent queue consumer) processes this job asynchronously:
   - Parses the User-Agent → detects device/browser
   - Converts IP → geographic location (the geo-IP service/library hasn't been chosen yet — see section 8)
   - Converts Referer → `SourceType` enum (`DIRECT` / `SOCIAL` / `SEARCH` / `EMAIL` / `OTHER`)
   - Creates a new `Visit` record
   - Updates `clickCount` on `Link`

### ⚠️ Strict rule: atomic increment
`clickCount` must **always** be updated with this pattern:
```ts
prisma.link.update({
  where: { id: linkId },
  data: { clickCount: { increment: 1 } },
});
```
**Never** use a read-then-write pattern (read the value, add manually, write it back) — with multiple concurrent Workers this causes a race condition and the count gets lost.

> Note: as of this writing, `clickCount` does not yet exist on the `Link` model in the actual `prisma/schema.prisma` — see section 5. It needs to be added before this rule can be enforced in code.

### ⚠️ Important clarification: what does "real-time analytics" mean here?
Even though the project's name talks about "real-time analytics," this **only means fast, async processing behind the scenes — not a live push to the dashboard.**
- **No WebSocket or periodic polling is needed.**
- The user sees updated stats by **manually refreshing the page**.
- This is a deliberate decision to keep the project simple — Claude Code should not add a WebSocket Gateway or polling on its own initiative.

## 5. Database model (synced to the actual current Prisma schema)

> The original plan for this schema had drifted from the real `prisma/schema.prisma`. This section reflects the actual current schema (read from `backend/prisma/schema.prisma`) rather than the original plan. Differences from the original plan, worth remembering: `clickCount` does not exist yet on `Link`, even though section 4's atomic-increment rule depends on it; `title` is nullable (not required); `Visit.location` was split into separate `country`/`city` fields instead of one `location` string; the generator uses `prisma-client` (not `prisma-client-js`) with a custom `output` path and `moduleFormat = "cjs"`; and `Link` has two extra indexes (`expiresAt`, `deletedAt`). If you change the schema, update this section too.

```prisma
generator client {
  provider     = "prisma-client"
  output       = "../src/generated/prisma"
  moduleFormat = "cjs"
}

datasource db {
  provider = "postgresql"
}

// Enums
enum SourceType {
  DIRECT
  SOCIAL
  SEARCH
  EMAIL
  OTHER
}

// models
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now()) @map("created_at") @db.Timestamptz(6)
  email     String   @unique
  name      String
  password  String
  links     Link[]

  @@map("users")
}

model Link {
  id          Int       @id @default(autoincrement())
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamptz(6)
  updatedAt   DateTime  @updatedAt @map("updated_at") @db.Timestamptz(6)
  isActive    Boolean   @default(true) @map("is_active")
  title       String?   @db.VarChar(255)
  shortCode   String    @unique @map("short_code") @db.VarChar(20)
  originalUrl String    @map("original_url") @db.Text
  expiresAt   DateTime? @map("expires_at") @db.Timestamptz(6)
  isPin       Boolean   @default(false) @map("is_pin")
  deletedAt   DateTime? @map("deleted_at") @db.Timestamptz(6)

  author   User @relation(fields: [authorId], references: [id])
  authorId Int  @map("author_id")

  visits Visit[]

  @@index([shortCode])
  @@index([authorId])
  @@index([expiresAt])
  @@index([deletedAt])
  @@map("links")
}

model Visit {
  id        Int        @id @default(autoincrement())
  visitedAt DateTime   @default(now()) @map("visited_at") @db.Timestamptz(6)
  ipAddress String?    @map("ip_address") @db.VarChar(45)
  country   String?    @db.VarChar(2)
  city      String?    @db.VarChar(100)
  device    String?
  browser   String?
  source    SourceType @default(OTHER) @map("source_type")

  link   Link @relation(fields: [linkId], references: [id])
  linkId Int  @map("link_id")

  @@index([linkId])
  @@index([visitedAt])
  @@map("visits")
}
```

**Important design note:** if a new feature (e.g. Category) is added in the future, following the normalization principle, **add a new table, don't add a column to existing tables** — this lets the schema evolve without large-scale rebuilding.

## 6. Authentication (Auth)

- The JWT is issued by the backend and set on the client as an **httpOnly cookie** (not an Authorization header).
- This means we need: `cookie-parser`, `CORS` configured with `credentials: true`, and a custom Guard that reads the JWT from the cookie (not from Passport-JWT's standard header).
- **Undecided:** is a Refresh Token needed, or is a simple Access Token enough? For now, assume **just a simple Access Token** with a reasonable expiry (e.g. 7 days) — until explicitly told otherwise.

## 7. Dashboard structure (for coordinating the API with the frontend)

The main dashboard page (after login) has two parts:
1. A search/filter bar + a "Create Link" button that opens a modal
2. A list of the user's link cards; clicking a card → that link's detail page

**This means:**
- The list-links endpoint (`GET /links`) must support query params for search, filter, pagination, and sort.
- The link-details endpoint (`GET /links/:id`) must return both the link's own info and its related stats/visits.

### About the "public page" (an important contradiction with the original idea)
The project's original idea was for every user to have a public page showing their links. **This was ultimately dropped.** Per the final decision:
- The public page is just a **simple landing page introducing the project** (viewable without login).
- To create or view any link, the user **must have an account**.
- **There is no per-user dedicated public page.** Claude Code should not build an `isPublic` field or a per-user public endpoint unless explicitly asked.

## 8. Redis — exact usage rules

Redis has exactly two roles, no more:
1. **Cache for shortCode → original URL mapping** (cache-aside, for fast redirects)
2. **Async queue for visit processing** by the Worker (full explanation in section 4)

**Caching full link metadata or summary stats is currently out of scope** — this decision was made to keep cache-invalidation complexity under control.

## 9. Testing rules

**No unit tests or e2e tests need to be written unless explicitly requested.** This is a deliberate decision to prioritize project development speed.

## 10. Things currently out of scope

Claude Code **should not** add these without explicit confirmation:
- Categories for links
- A per-user dedicated public page (full explanation in section 7)
- WebSocket / polling for real-time stats
- Refresh Token
- Rate limiting (not yet decided)

## 11. Proposed backend folder structure

> This is a sensible default based on common NestJS convention, not a locked-in decision — it can change.

```
backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── links/
│   ├── visits/
│   ├── worker/        ← Redis queue consumer/processor
│   ├── common/         ← guards, filters, interceptors, decorators
│   ├── prisma/          ← PrismaService
│   └── main.ts
├── prisma/
│   └── schema.prisma
├── Dockerfile
└── .env
```

## 12. API documentation (Swagger)

Every Controller and DTO must be fully documented:
- On the Controller: `@ApiTags`, `@ApiOperation({ summary: '...' })`, `@ApiResponse` (including errors like 401/404), `@ApiBearerAuth()` on protected routes
- On the DTO: `@ApiProperty({ example: '...', description: '...' })` with a realistic example, `@ApiPropertyOptional()` for optional fields
- `class-validator` decorators (`@IsUrl()`, `@IsNotEmpty()`, etc.) alongside `@ApiProperty` on the DTO — this covers both validation and documentation

## 13. Deployment and infrastructure

- **Monorepo**: `backend/` + `frontend/` + a shared root `docker-compose.yml`; each service has its own `Dockerfile`.
- **Deployment target**: an Iranian VPS, 4GB RAM / 2 cores, Ubuntu — because Postgres + Redis + NestJS + Worker all need to run at the same time.

## 14. Open decisions — must be checked with the developer before implementation

Claude Code should not decide these on its own; if they come up, ask first:

- [ ] `shortCode` generation algorithm (proposed: `nanoid`) and its exact length
- [ ] Can the user pick a custom alias for `shortCode`, or is it auto-generated only?
- [ ] Redis queue library (proposed: BullMQ) — unconfirmed
- [ ] Exact Redis cache TTL for shortCodes
- [ ] Exact cache-invalidation procedure when a link is edited/deleted
- [ ] geo-IP service/library for converting IP to geographic location
- [ ] Is a Refresh Token needed, or is a simple Access Token enough?
- [ ] Rate limiting strategy to prevent abuse of the shortening service

---

**General reminder for Claude Code:** this project is for a resume, so clean, sensible architecture matters more than piling on features. Before any big structural change (schema, queue architecture, auth strategy), coordinate with the developer first instead of implementing directly.
