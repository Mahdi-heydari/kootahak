---
name: git-flow
description: Handle git for the backend folder end-to-end (branching, committing, rebasing, pushing) following the team's workflow. Use when the user says things like "git رو خودت هندل کن", "این تغییرات رو کامیت و برنچ کن", "handle git for backend", or otherwise asks to take care of git branching/committing for backend changes without walking through each step manually.
---

# Backend Git Flow

Scope: **only `backend/`**. Never stage, commit, or branch for `frontend/` changes under this skill — that's a separate workflow owned by the frontend team. If staged changes include files outside `backend/`, stop and ask before touching them.

This encodes the team's git workflow from [workflow.md](../../../workflow.md), applied specifically to backend work. The user of this skill is the backend owner (per workflow.md: "I'm handling backend"), so this skill can act with more autonomy on backend-only branches — but pushing to shared branches (`develop`, `main`) still needs explicit confirmation, per the repo's normal safety rules.

## Branch naming

```
feature/be-<short-description>   → new backend functionality
fix/be-<short-description>       → backend bug fixes
```

Always branch from `main`. Pick the description from what actually changed (e.g. `feature/be-user-login-api`, `fix/be-jwt-expiry`).

## Commit message format

`type: what you did`, using: `feat`, `fix`, `docs`, `refactor`, `chore`.

Prefer several small, focused commits over one giant commit — group by logical change (e.g. one commit for a new module, another for its tests), not by file.

## Steps to run when asked to "handle git" for backend

1. **Check state first.** Run `git status` and `git diff` (scoped to `backend/`) to see what actually changed. Never blindly `git add -A` across the whole repo — stage `backend/...` paths explicitly.
2. **Figure out the branch.**
   - If already on a `feature/be-*` or `fix/be-*` branch whose scope matches the current changes, keep committing there.
   - Otherwise: `git checkout main && git pull origin main && git checkout -b feature/be-<desc>` (or `fix/be-<desc>` for bug fixes).
3. **Commit.** Stage the relevant backend files and commit with the `type: message` convention above. Split into multiple commits if the diff covers distinct logical changes.
4. **Rebase on main before pushing**, to avoid conflicts later:
   ```bash
   git checkout main
   git pull origin main
   git checkout <branch>
   git rebase main
   ```
5. **Push and confirm before merging anywhere shared.** Pushing the feature branch itself (`git push -u origin <branch>`) is fine to do directly. Do NOT merge into `develop` or `main`, and do NOT force-push, without explicitly confirming with the user first — those affect the shared team history.
6. **Stop there.** Opening the PR to `main`, review, squash-merge, and branch deletion (steps 6-9 of workflow.md) are manual/team steps — mention them as next steps rather than doing them automatically, unless the user explicitly asks you to also open the PR (e.g. via `gh pr create`).

## Notes

- If unsure whether a change is "backend" scope, check that all touched paths are under `backend/`.
- Don't invent a branch name from guesswork if the change's purpose is unclear — ask the user for a short description first.
- Never push directly to `main` or `develop`. Never skip hooks.
