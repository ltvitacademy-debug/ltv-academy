# Workflow Basics

Northbridge Retail's engineering team just containerized their storefront
application and pushed it to a fresh GitHub repository. Before anything from
that repo reaches their Kubernetes cluster automatically, GitHub Actions
needs to build and test every change first. This lesson covers the one file
that makes that possible: a **workflow**.

## What you'll learn

- What a GitHub Actions workflow file is and where it lives
- The four pieces every workflow is built from: trigger, job, runner, and steps
- How to read `storefront`'s first real `.github/workflows/ci.yml` file
- Where to watch a workflow actually run, in the real GitHub UI

## A workflow is just a YAML file

Every GitHub Actions workflow is a YAML file committed to `.github/workflows/`
in a repository. GitHub watches that folder — the moment a file lands there
and the repo experiences an event it matches, GitHub runs it. There's no
separate registration step and no dashboard to click through first.

Here's the first workflow Northbridge Retail's engineers wrote for
`storefront`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

## The four pieces, top to bottom

- **`name`** — the label that shows up in the Actions tab. Purely cosmetic.
- **`on`** (the trigger) — the event that starts the run. This one fires on
  every push to `main` and every pull request targeting `main`.
- **`jobs`** — one job here, `build`, running on `ubuntu-latest`, a
  disposable Ubuntu virtual machine GitHub spins up fresh and throws away
  once the run finishes.
- **`steps`** — an ordered list inside the job. Each step is either a
  reusable **action** (`uses:`) or a raw shell command (`run:`).

`actions/checkout@v4` always comes first for a reason: a fresh runner starts
as an empty machine with no code on it at all. Without that step, `npm ci`
would have nothing to install against.

## Watching it run

Push `ci.yml` and open the repository on GitHub. The **Actions** tab sits
right next to Code, Issues, and Pull requests:

![Screenshot of a repository's tab bar with the Actions tab highlighted in an orange outline.](/courses/ci-cd-pipelines/ch02/05-workflow-basics/actions-tab-global-nav-update.png)
*The Actions tab is where every workflow run for storefront will live, starting the moment this file is pushed.*
Source: [GitHub Docs — Viewing workflow run history](https://docs.github.com/en/actions/how-tos/monitor-workflows/view-workflow-run-history)

Click in, and the left sidebar lists every workflow file the repo has —
`CI` shows up here, named after the `name:` field, right alongside anything
else Northbridge Retail adds later:

![Screenshot of the Actions tab's left sidebar, listing workflow files including a CI workflow and CodeQL.](/courses/ci-cd-pipelines/ch02/05-workflow-basics/superlinter-workflow-sidebar.png)
*Every file in .github/workflows/ gets its own row here — click one to see its full run history.*
Source: [GitHub Docs — Viewing workflow run history](https://docs.github.com/en/actions/how-tos/monitor-workflows/view-workflow-run-history)

## Key terms

| Term | Meaning |
|---|---|
| Workflow file | A YAML file in `.github/workflows/` defining one automated pipeline |
| Trigger (`on`) | The event that starts a workflow run |
| Job | A group of steps that runs together on one fresh virtual machine |
| Runner | The disposable VM (e.g. `ubuntu-latest`) a job runs on |
| Step | One action (`uses:`) or shell command (`run:`) inside a job |
| Action | A reusable, pre-built step, like `actions/checkout@v4` |
