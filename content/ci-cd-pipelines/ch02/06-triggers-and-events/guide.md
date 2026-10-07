# Triggers & Events

Lesson 5 showed storefront's workflow triggering on a push and a pull
request — but those are only two of the events GitHub Actions can react to.
Northbridge Retail's engineers need their pipeline to behave differently
depending on *why* it's running: fast feedback on a pull request, a full
build on a merge to `main`, and a nightly job that nobody has to remember to
start by hand. All of that comes from the `on:` block.

## What you'll learn

- How `on:` decides what starts a workflow, beyond a simple push
- Narrowing a trigger with `branches`, `paths`, and `types` filters
- Scheduling a workflow with cron syntax, and triggering one by hand
- Why most workflows combine more than one trigger

## Filtering push and pull_request

A bare `push:` trigger fires on every branch and every file. Northbridge
Retail's engineers don't want a full CI run for a change to the `README`, so
they narrow it:

```yaml
on:
  push:
    branches: [main]
    paths-ignore:
      - "**.md"
      - "docs/**"
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]
```

- **`branches`** — only `main`, not every feature branch.
- **`paths-ignore`** — skip the run entirely when only docs changed (its
  opposite, `paths`, runs the workflow only when matching files *do*
  change).
- **`types`** — for `pull_request`, this is the default set: a new PR, a new
  commit pushed to it, or a closed PR reopened. Leaving `types` off defaults
  to exactly this list.

## Running on a schedule, or on demand

Two more triggers round out what storefront actually uses:

```yaml
on:
  schedule:
    - cron: "0 6 * * 1-5"
  workflow_dispatch:
    inputs:
      environment:
        description: "Target environment"
        required: true
        default: "staging"
```

- **`schedule`** — cron syntax, always in UTC. `"0 6 * * 1-5"` means 6 AM,
  Monday through Friday — a nightly dependency-audit run for Northbridge
  Retail, timed to finish before the team's morning standup.
- **`workflow_dispatch`** — a manual "Run workflow" button in the Actions
  tab. The optional `inputs` block adds a form, so an engineer can pick which
  environment to target before clicking run.

Workflows commonly combine several of these in one `on:` block — exactly
like `storefront`'s real CI workflow does, with `push`, `pull_request`, and
`workflow_dispatch` all listed together so the same pipeline runs
automatically and on demand.

## Other events worth knowing

- **`release`** — fires when a GitHub Release is published; a common trigger
  for a production deployment workflow.
- **`issue_comment`** — fires on a new comment, useful for chat-ops style
  commands like `/deploy` typed into a pull request.
- **`workflow_call`** — doesn't fire from a GitHub event at all; it marks a
  workflow as reusable so another workflow can call it directly (Lesson 10
  covers this).

## Key terms

| Term | Meaning |
|---|---|
| Trigger (`on`) | The event or events that start a workflow run |
| `branches` / `paths` | Filters narrowing a trigger to specific branches or changed files |
| `types` | Narrows which sub-events of a trigger (like `pull_request`) count |
| `schedule` | A cron-syntax trigger that runs a workflow on a timer, in UTC |
| `workflow_dispatch` | A manual trigger — a "Run workflow" button in the Actions tab |
| `workflow_call` | Marks a workflow as reusable, callable from another workflow |
