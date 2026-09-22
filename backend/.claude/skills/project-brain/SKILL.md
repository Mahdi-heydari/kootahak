---
name: project-brain
description: Full project vision, architecture, database schema, auth strategy, scope boundaries, security hardening, and open decisions for the link-shortener backend — written directly by the backend developer. This is the project's brain, consult it before any architecture decision, schema change, new endpoint, auth change, Redis/queue/worker design, or anything that touches scope (e.g. per-user public pages, categories, WebSocket/polling, refresh tokens) or security (rate limiting, input validation, CORS, error handling). Use whenever you need to know what the developer actually intends for the project, not just a quick summary — check it often, not only when explicitly asked.
---

# Project: Link Shortening System with Advanced Analytics

> This is the skill-ified, English version of the project's `CLAUDE.md` (kept at `backend/CLAUDE.md`, in Persian). `CLAUDE.md` itself is auto-loaded every session as permanent project context; this skill exists so the same context can be consulted deliberately and in depth — treat it as the project's brain, not just a duplicate of the file.

---

## 1. Project vision and goal

This project is a **URL shortener with a special focus on visit analytics** (similar to bit.ly, but with more detailed stats: device, geographic location, referral source).

**The project's goal is resume-building AND it is meant to actually be deployed to production — it will also be open-sourced.** This means:
- Code quality, readability, and clean architecture matter more than aggressive development speed.
- The project should demonstrate that the team (me + two frontend developers) can coordinate on a real, multi-service system (NestJS + Postgres + Redis + Worker).
- **Correctness and production-readiness are not optional.** Real race conditions (e.g. cache stampede on hot cache keys, stale cache after a link is edited/deleted, the atomic `clickCount` rule in section 4) must be handled with actual best practices, not skipped for simplicity.
- **Still avoid engineering for imaginary scale** (e.g. sharding, multi-region, premature microservices, distributed caching topologies) — this guidance is about not chasing scale this project will never see, not an excuse to skip legitimate correctness or best-practice concerns.

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
| Queue library | BullMQ (raw `bullmq` package, wired with custom Nest providers in `src/bullmq/` — not the `@nestjs/bullmq` wrapper) |
| Geo-IP lookup | `ip-geolocation-api-sdk-typescript` (ipgeolocation.io) |
| User-Agent parsing | `ua-parser-js` |

## 4. Overall architecture — the most important section of the project

### Link shortening flow
1. Authenticated user submits the original URL.
2. Backend generates a unique `shortCode`.
3. The link record is saved to Postgres.

### Redirect flow (performance-sensitive part)
0. **Entrypoint:** `GET /:shortCode`, served by `RedirectController`, mounted at the application **root**. There is no global prefix on the app — each other controller declares its own `"api/..."` prefix explicitly on `@Controller()` (see `main.ts`); `RedirectController`'s `@Controller()` simply has no prefix, so it stays at the root and short links stay genuinely short (`domain.com/abc123`). (A previous approach used `setGlobalPrefix('api', { exclude: [...] })`, but NestJS matches `exclude` patterns against each controller's own route path at bootstrap, not the incoming request URL — a single-segment `exclude` pattern like `:shortCode` silently exempted *any* other single-segment GET route, such as `GET /api/links`, from the prefix too. Explicit per-controller prefixes avoid this footgun entirely.) This route is **public/anonymous** — it must never sit behind the JWT guard. It responds with an HTTP **302** redirect to `originalUrl`. This is a stable public API contract the frontend depends on (per section 2).
1. A visitor clicks the short link.
2. Backend first checks Redis (**cache-aside pattern**): if the `shortCode` is cached, redirect immediately.
3. If not cached, read from Postgres, cache it in Redis, then redirect.
4. **The user is never blocked on analytics processing.** Right after the cache read/write resolves, `LinksService.visitLink()` calls `bullMQ.add("recordVisit", { ip, userAgent, referer, id, originalUrl }, ...)` on the `visit` queue **without awaiting it** (fire-and-forget) — a failure to enqueue is logged via `PinoLogger` and never reaches the caller, so a Redis/queue hiccup can't turn into an unhandled rejection or block the redirect.
   > Implementation status: done. `visitLink()` does the cache-aside lookup, the `isActive` / `deletedAt` / `expiresAt` filtering on the DB read (link must be active, not soft-deleted, and not expired — otherwise treated as not-found, same as an unknown `shortCode`), the redirect, and the fire-and-forget enqueue.
5. A **BullMQ Worker** (`src/bullmq/visitWorker.provider.ts`) — a distinct queue consumer, decoupled from the request-handling code path — processes this job asynchronously:
   - Parses the User-Agent → detects device/browser (`ua-parser-js`)
   - Converts IP → geographic location (`ip-geolocation-api-sdk-typescript`, see section 8)
   - Converts Referer → `SourceType` enum (`DIRECT` / `SOCIAL` / `SEARCH` / `EMAIL` / `OTHER`)
   - Creates a new `Visit` record
   - Updates `clickCount` on `Link` — **not yet implemented**, see the note right below
   > Deployment note: this Worker currently runs in the same Node process as the API (bootstrapped via Nest DI inside `AppModule`, alongside the HTTP server), not as a separately deployed service/container. That's a deliberate choice for this project's scale, not a gap — "separate Worker" above means a logically distinct queue consumer (its own `Worker` instance, its own concurrency/retry lifecycle, decoupled from request handling), not necessarily a separate OS process.

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

> The developer's original document had a schema that had drifted from the real `prisma/schema.prisma`. Per the developer's decision, this section reflects the actual current schema (read from `backend/prisma/schema.prisma`) rather than the original plan. Differences from the original plan, worth remembering: `clickCount` does not exist yet on `Link`, even though section 4's atomic-increment rule depends on it; `title` is required (`@IsNotEmpty` in the DTO, `NOT NULL` in the schema) — if the frontend doesn't collect a title from the user, the frontend itself must supply one (e.g. derived from `originalUrl`) before calling `POST /links`, since the backend will reject an empty/missing title; `Visit.location` was split into separate `country`/`city` fields instead of one `location` string; the generator uses `prisma-client` (not `prisma-client-js`) with a custom `output` path and `moduleFormat = "cjs"`; and `Link` has two extra indexes (`expiresAt`, `deletedAt`).

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
  title       String    @db.VarChar(255)
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
- The list-links endpoint (`GET /api/links`) must support query params for search, filter, pagination, and sort.
- The link-details endpoint (`GET /api/links/:id`) must return both the link's own info and its related stats/visits.

> Note on prefixes: all dashboard/CRUD endpoints live under the `api` prefix (`/api/links`, ...), declared explicitly as `"api/..."` on each controller's `@Controller()` decorator (not via `setGlobalPrefix`). The **only** exception is the public redirect route `GET /:shortCode` (section 4), which is deliberately mounted at the root.

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

**Redis wiring (how the client is provided):**
- A single `ioredis` client is exposed as a NestJS provider under the token `REDIS_CLIENT` (`src/redis/redis.constants.ts`), built by `redisProvider` (`src/redis/redis.provider.ts`) from a `useFactory` that reads `REDIS_HOST` / `REDIS_PORT` via `ConfigService`.
- `RedisModule` provides and exports `REDIS_CLIENT`; consumers (e.g. `LinksModule`) import `RedisModule` and inject with `@Inject(REDIS_CLIENT) private redis: Redis`.
- Env vars: `REDIS_HOST`, `REDIS_PORT` (see `.env.example`).
- There is no `RedisService` wrapper class — it was removed as dead code. The only way to talk to Redis is the injected `REDIS_CLIENT`.

**Cache correctness rules (non-negotiable, per section 1 — this is a production system):**
- **Cache key:** `link:{shortCode}` — derived only from data available at redirect time (the shortCode from the URL param), never from the DB-only `id`.
- **TTL:** `LINK_CACHE_TTL_SECONDS` in `src/redis/redis.constants.ts` — currently **12 hours**. This closes the section-14 open decision on cache TTL.
- **Cache value:** a JSON string, `{ id, originalUrl }` (`id` is the link's DB id, used as `linkId` downstream), written with `SET key value EX <LINK_CACHE_TTL_SECONDS> NX`. This lets a cache **hit** enqueue the visit-processing job (needs the id) without a DB round-trip.
- **Cache invalidation is mandatory, not optional:** any endpoint that changes a link's `originalUrl`, `isActive`, `deletedAt`, or `expiresAt` must `DEL link:{shortCode}` as part of that same operation. Without this, edited/deleted links keep serving stale data from Redis until TTL expiry — a real correctness bug, not just a performance nuance. (Not yet implemented — no link-edit/delete endpoint exists yet. Note the gap this leaves today: the `isActive`/`deletedAt`/`expiresAt` checks only run on a cache **miss** — a link deactivated/expired/deleted after being cached keeps serving from cache until TTL expiry, since nothing invalidates it yet.)
- **Cache stampede (concurrent misses on a hot key):** plain concurrent re-population is safe here (all concurrent readers get the same DB answer, so redundant writes aren't corrupting — unlike the `clickCount` increment case). A `SETNX`-based single-flight lock (`lock:link:{shortCode}`) is the standard fix if stampede protection is wanted for hot/viral links; not required for a first correct implementation, but a legitimate follow-up, not something to dismiss as over-engineering.

**Visit-queue wiring (role 2 — how jobs actually flow):**
- Queue name `"visit"`, job name `"recordVisit"`. `VISIT_QUEUE` token (`src/bullmq/bullMq.constant.ts`) resolves to a `bullmq` `Queue` built by `bullMQProvider` (`src/bullmq/bullMq.provider.ts`) from `REDIS_HOST`/`REDIS_PORT`. `LinksModule` imports `BullMqModule` and injects with `@Inject(VISIT_QUEUE) private bullMQ: Queue`.
- Job options: `attempts: 3`, exponential backoff (1s base), `removeOnComplete: 100`, `removeOnFail: 100` (bounds how many finished/failed jobs Redis retains).
- The consumer side (`VISIT_WORKER` token, `src/bullmq/visitWorker.provider.ts`) builds a `bullmq` `Worker` on the same `"visit"` queue and delegates each job to `VisitsService.visitProcess()` (`src/visits/visits.service.ts`), which does the UA parsing, geo-IP lookup, `SourceType` classification, and `Visit` creation described in section 4. `BullMqModule` imports `VisitsModule` for this.
- Geo-IP client: `GEOLOCATION_CLIENT` token (`src/visits/geolocation.constants.ts`), built by `geolocationProvider` from `ip-geolocation-api-sdk-typescript` using `GEOLOCATION_TOKEN`. Outside production, the real visitor IP (often `127.0.0.1` locally, which the API rejects) is swapped for `GEO_FALLBACK_IP` (see `.env.example`) so the pipeline is testable end to end; production always uses the real IP.

## 9. Testing rules

**No unit tests or e2e tests need to be written unless explicitly requested.** This is a deliberate decision to prioritize project development speed.

## 10. Things currently out of scope

Claude Code **should not** add these without explicit confirmation:
- Categories for links
- A per-user dedicated public page (full explanation in section 7)
- WebSocket / polling for real-time stats
- Refresh Token

## 11. Proposed backend folder structure

> This is a sensible default based on common NestJS convention, not a locked-in decision — it can change.

Actual current structure (diverged from the original proposal below — no dedicated `worker/`; the queue+worker live in `bullmq/`):

```
backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── links/           ← LinksController (POST /api/links), RedirectController (GET /:shortCode), LinksService
│   │   └── validators/    ← IsSafeRedirectUrl (SSRF/open-redirect guard on originalUrl)
│   ├── short-code/       ← ShortCodeService (nanoid generation)
│   ├── redis/            ← REDIS_CLIENT provider (cache-aside) + throttler.provider.ts (rate-limit config)
│   ├── bullmq/            ← VISIT_QUEUE (Queue) + VISIT_WORKER (Worker), both for the "visit" queue
│   ├── visits/             ← VisitsService (UA parsing, geo-IP, SourceType, Visit creation)
│   ├── prismaClient/        ← PrismaService
│   ├── common/               ← cross-cutting concerns, not tied to one feature
│   │   ├── config/              ← env.validation.ts (Joi schema, checked at boot)
│   │   └── all-exceptions.filter.ts  ← global error handler (see section 15)
│   └── main.ts
├── prisma/
│   └── schema.prisma
├── Dockerfile
└── .env
```

Original proposal (kept for reference; not what actually exists):
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

- [x] `shortCode` generation algorithm → **`nanoid`** (`customAlphabet`, alphanumeric only), length scales with total link count via `ShortCodeService.calculateCodeLength()`: 4 chars under 1k links, 5 under 100k, 6 under 5M, 7 beyond.
- [x] Can the user pick a custom alias for `shortCode`? → **Yes, both are supported.** `CreateLinkDto.suggestedCode` (optional) — if provided, checked for uniqueness (409 `ConflictException` on collision) and used as-is; if omitted, a code is generated and retried up to `MAX_GENERATION_ATTEMPTS` (5) on a unique-constraint collision.
- [x] Redis queue library → **BullMQ**, confirmed and implemented (raw `bullmq` package, not `@nestjs/bullmq`) in `src/bullmq/`.
- [x] Exact Redis cache TTL for shortCodes → **12 hours** (`LINK_CACHE_TTL_SECONDS`, `src/redis/redis.constants.ts`)
- [ ] Exact cache-invalidation procedure when a link is edited/deleted — still open; no edit/delete endpoint exists yet, so nothing calls `DEL link:{shortCode}` today.
- [x] geo-IP service/library → **`ip-geolocation-api-sdk-typescript`** (ipgeolocation.io), via `GEOLOCATION_TOKEN`; see section 8's "Visit-queue wiring".
- [ ] Is a Refresh Token needed, or is a simple Access Token enough?
- [x] Rate limiting strategy → **`@nestjs/throttler`**, storage backed by the existing Redis (`@nest-lab/throttler-storage-redis`), so limits survive restarts and are shared across processes. Full details in section 15.

## 15. Security hardening (added in a dedicated hardening pass)

The API used to have almost no defensive layer — the public redirect route in particular
was reachable by anyone on the internet with no auth, no rate limit, and no input guards.
The items below were added end to end; all are implemented, tested manually with `curl`,
and committed.

**Rate limiting** — `@nestjs/throttler`, global `APP_GUARD`, storage on the existing Redis
(`@nest-lab/throttler-storage-redis`, `src/redis/throttler.provider.ts`) so counters survive
restarts and are shared across processes. Default tier 60 req/60s; `@Throttle()` overrides
per route: redirect 30/60s, `auth` controller (login+register) 5/60s, `POST /links` 20/60s.
Requires `main.ts`'s `trust proxy` setting (below) to key on the real client IP behind nginx.

**HTTP headers** — `helmet()` first in the middleware chain (HSTS, CSP, X-Content-Type-Options,
X-Frame-Options, etc.), `x-powered-by` disabled, `trust proxy` set to `1` (single nginx hop)
so `req.ip` and the rate limiter see the real client IP, not nginx's.

**Swagger (`/docs`)** — only mounted when `NODE_ENV !== "production"`; in production the
route doesn't exist (404). It exposes the full API surface, so it must not be public.

**Input validation** —
- Global `ValidationPipe`: `whitelist`, `forbidNonWhitelisted` (unknown body fields are a
  400, not silently dropped), `transform`, `disableErrorMessages` in production.
- `getLinkDto.shortCode` requires `/^[A-Za-z0-9_-]{4,20}$/` — matches exactly what
  `ShortCodeService`/`suggestedCode` can produce, so junk is rejected before any Redis/DB
  work on the public redirect path.
- `CreateLinkDto.originalUrl` has a custom validator, `@IsSafeRedirectUrl()`
  (`src/links/validators/is-safe-redirect-url.validator.ts`): http(s) only, no
  credentials in the URL, rejects loopback/private/link-local hosts (localhost, 127.0.0.1,
  10/8, 172.16-31/12, 192.168/16, 169.254/16 incl. cloud metadata, `*.local`), max 2048
  chars. Best-effort, not a full SSRF guard — we never fetch `originalUrl` server-side, we
  only 302 the visitor's browser to it, so the blast radius of a bad entry is that browser,
  not our network.
- Request body capped at 16kb (`express.json`/`urlencoded` limits in `main.ts`) — well
  above the largest real payload (`POST /links` is ~2.3kb worst case), stops oversized-body
  memory pressure before JSON parsing even starts.

**CORS** — fails closed: `main.ts` throws at boot if `FRONT_END_URL` is unset (never falls
back to reflecting the request's `Origin`), and `methods`/`allowedHeaders` are an explicit
allowlist rather than the cors package's permissive defaults.

**Env var validation at boot** — `src/common/config/env.validation.ts`, a Joi schema wired
into `ConfigModule.forRoot({ validationSchema })`. Rejects a missing/weak `JWT_SECRET`
(`min(32)`, and explicitly `.invalid("change-me")` so the `.env.example` placeholder can
never reach production unnoticed) and validates the shape of every other required var. The
app refuses to boot rather than start silently insecure.

**Global exception filter** — `src/common/all-exceptions.filter.ts`, registered as
`APP_FILTER`. `@Catch()` with no argument, so it's the last line of defense for anything
unhandled:
- `ThrottlerException` → Persian 429 message (checked first since it's also an
  `HttpException`, to override its default English text).
- Our own `HttpException`s (e.g. `ConflictException("...")`) pass through unchanged — we
  wrote those messages ourselves, they're already safe.
- `Prisma.PrismaClientKnownRequestError` → mapped to a safe Persian message per code
  (`P2002` → 409, `P2025` → 404) instead of leaking Prisma's internal error text.
- Anything else (a real bug, a raw Node/Express error) → full details go to `PinoLogger`
  server-side only; the client always gets a generic Persian 500, never a stack trace.
- **Known gap:** body-parser's request-too-large error is a plain `Error` with a `status`
  field, not an `HttpException`, so it currently falls through to the generic 500 path
  instead of `413`. The response is still safe (no leaked detail), just not the most
  precise status code. Not fixed yet — a legitimate follow-up if a future pass touches this
  filter.

**Redirect response headers** — `Cache-Control: no-store` on `GET /:shortCode` so
browsers/proxies never cache a redirect that cache invalidation (section 8's still-open
`DEL link:{shortCode}` item) hasn't caught up to yet.
`Referrer-Policy` was deliberately **not** set here after weighing it: it would strip the
`Referer` a destination site sees, which cuts both ways — it also hides that the traffic
came from this service, which has real marketing/analytics value the team wants to keep.
Don't add it back without checking first.

**`bcrypt` cost factor** — raised from 10 to 12 in `UsersService.createUser` (harder
offline cracking, ~50ms slower per login/register; `bcrypt.compare` reads the cost from the
existing hash, so old hashes at 10 still verify fine — no migration needed).

**`npm audit` — reviewed, no action taken.** All current findings
(`deepmerge-ts`/`mysql2` via the Prisma CLI's dev tooling, `fast-uri` via `@nestjs/cli`
and webpack, `multer` via `@nestjs/platform-express`) are either build-time-only tooling
that never runs on the deployed server, or code paths this app doesn't exercise (Prisma
targets Postgres, not MySQL; there is no file-upload endpoint). `qs`'s vulnerable code path
is already avoided by `urlencoded({ extended: false })` in `main.ts`. `npm audit fix --force`
would downgrade `prisma` and `@nestjs/core` to much older majors for no real security gain
on this app — deliberately not run. Re-check this reasoning if new findings show up, don't
assume it's still all noise.

`.dockerignore` was already correct (`.env`, `.git`, `node_modules` all excluded) —
no change was needed there.

---

**General reminder for Claude Code:** this project is for a resume, so clean, sensible architecture matters more than piling on features. Before any big structural change (schema, queue architecture, auth strategy), coordinate with the developer first instead of implementing directly.
