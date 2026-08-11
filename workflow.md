# Git Workflow

Hey team, here's how we're going to work together on this repo. It's simple, but let's stick to it so our history stays clean and nobody steps on anyone's toes.

We have one repo with two folders: `backend` and `frontend`. I'm handling backend, and you two are on frontend. We don't need to wait for each other — backend already has the API defined in Swagger, so frontend can start building right away using the DTOs, even before an endpoint is fully done.

## Branch Naming

Every new branch comes from `main`, and the name should tell us what it is:

```
feature/be-<short-description>   → backend work
feature/fe-<short-description>   → frontend work
fix/<short-description>          → bug fixes
```

Example:

```
feature/be-user-login-api
feature/fe-login-page
fix/fe-navbar-broken-on-mobile
```

Please don't push directly to `main`. Always work on a branch.

## Daily Flow

**1. Start a new branch from main**

```bash
git checkout main
git pull origin main
git checkout -b feature/fe-login-page
```

Example: you're starting the login page → `feature/fe-login-page`.

**2. Commit often, and keep messages clear**

Use this format: `type: what you did`

```
feat: add something new
fix: fix a bug
docs: update docs
refactor: clean up code, no behavior change
chore: config, dependencies, etc.
```

Example:

```bash
git commit -m "feat: build login form UI"
git commit -m "feat: connect login form to auth endpoint"
```

Don't wait until the whole feature is done to commit. Small, frequent commits are way easier to review and revert if something breaks.

**3. Before pushing, sync with main**

This avoids nasty conflicts later.

```bash
git checkout main
git pull origin main
git checkout feature/fe-login-page
git rebase main
```

Example: I just merged a change to the auth API. You rebase, and now your branch already has that update before you even push.

**4. Push and open a Pull Request**

```bash
git push origin feature/fe-login-page
```

Then open a PR on GitHub, targeting `main`. Write a short description of what you did.

Example PR title: `feat: login page UI + API integration`

**5. Get it reviewed before merging**

At least one other person needs to review and approve before it gets merged. I'll review frontend PRs, and you two can review each other's, or review mine when I touch backend.

We'll turn on branch protection on `main` so PRs can't be merged without an approval.

**6. Merge using Squash and Merge**

This keeps `main`'s history clean — one commit per feature instead of 10 messy ones.

Example: your branch has 6 commits like "wip", "fix typo", "fix again" → after squash merge, `main` just shows one clean commit: `feat: login page UI + API integration`.

**7. Delete the branch after merging**

Keeps things tidy. GitHub even shows a "Delete branch" button right after merge — just click it.



Let's keep it clean
