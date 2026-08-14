# Git Workflow

Hey team, here's how we're going to work together on this repo. It's simple, but let's stick to it so our history stays clean and nobody steps on anyone's toes.

We have one repo with two folders: `backend` and `frontend`. I'm handling backend, and you two are on frontend. We don't need to wait for each other ... backend already has the API defined in Swagger, so frontend can start building right away using the DTOs, even before an endpoint is fully done.

## Branches Overview

- **`main`** : the source of truth. Always stable, always protected. Nobody pushes or pulls directly to it.
- **`develop`** : an integration branch. Once your work is pushed, I merge your branch here so we can review and test it together as a team before it goes anywhere near `main`.
- **Feature/fix branches** :: where all actual work happens. Always created from `main`.

## Branch Naming

Every new branch comes from `main`, and the name should tell us what it is:

```
feature/be-<short-description>   → backend work
feature/fe-<short-description>   → frontend work
fix/fe-<short-description>       → bug fixes
```

Examples:

```
feature/be-user-login-api
feature/fe-login-page
fix/fe-navbar-broken-on-mobile
```

Please don't push/pull directly to `main`. Always work on a branch.

## Daily Flow

**1. Start a new branch from `main`**

```bash
git checkout main
git pull origin main
git checkout -b feature/fe-login-page
git push -u origin feature/fe-login-page
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

**4. Push your branch**

```bash
git push origin feature/fe-login-page
```

**5. I merge it into `develop` for team review**

Once your branch is pushed, I'll pull it into `develop` so we can review and test it together as a team:

```bash
git checkout develop
git pull origin develop
git merge feature/fe-login-page
git push origin develop
```

This is where we catch integration issues — stuff that only shows up when your work meets everyone else's — before it's anywhere near `main`.

**6. Open a Pull Request to `main`**

If everything checks out on `develop`, open a PR **from your feature branch into `main`** on GitHub, with a short description of what you did.

Example PR title: `feat: login page UI + API integration`

**7. Get it reviewed before merging**

At least one other person needs to review and approve before it gets merged. I'll review frontend PRs, and you two can review each other's, or review mine when I touch backend.

We'll turn on branch protection on `main` so PRs can't be merged without an approval.

**8. Merge using Squash and Merge**

This keeps `main`'s history clean — one commit per feature instead of ten messy ones.

Example: your branch has 6 commits like "wip", "fix typo", "fix again" → after squash merge, `main` just shows one clean commit: `feat: login page UI + API integration`.

**9. Delete the branch after merging**

Keeps things tidy. GitHub even shows a "Delete branch" button right after merge — just click it.

Let's keep it clean.