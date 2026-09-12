# Lesson 20 — A Real GitHub Actions Workflow, Start to Finish

**Chapter 5 · Building a CI/CD Pipeline for a Data Project · Lesson 20 of 25**

## What you'll learn

- The one project this entire chapter builds on: a small, real dbt
  project called `retail-orders-analytics`
- Every line of a complete, working `.github/workflows/ci.yml` file,
  explained top to bottom
- How the three trigger, job, and step levels of a workflow file
  actually relate to each other
- Where to actually watch this workflow run, in the real GitHub UI

## The project this whole chapter uses

Chapters 1-4 taught Git, GitHub, and CI/CD concepts one at a time.
This chapter — and the capstone in Chapter 6 — puts all of it together
on one real, concrete project: **`retail-orders-analytics`**, a small
dbt project that:

- Takes raw retail order data (a `raw_orders` source table) and builds
  a staging model, `stg_orders`, that cleans up types and column names
- Builds one mart model on top of it, `fct_orders`, aggregating
  revenue per day
- Has dbt tests on both models — `not_null` and `unique` on the order
  ID, and a `relationships` test tying `fct_orders` back to
  `stg_orders`

That's the whole project. It's small on purpose — small enough that
every YAML file in this chapter fits on one screen, and real enough
that the CI/CD pattern you build around it works identically on a
50-model dbt project at a real job.

## The workflow file, top to bottom

Every GitHub Actions workflow lives in `.github/workflows/` as a YAML
file. Here's the complete first version for `retail-orders-analytics`:

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dbt
        run: pip install dbt-postgres==1.7.4

      - name: Install dbt packages
        run: dbt deps
```

Read it in four layers:

- **`name`** — what shows up in the Actions tab. Just a label.
- **`on`** — the trigger. This workflow runs on every pull request
  targeting `main`, and every push directly to `main`. Chapter 4
  covered this; here it's the real thing.
- **`jobs`** — one job, `build-and-test`, running on a fresh Ubuntu
  virtual machine (`runs-on: ubuntu-latest`) that GitHub spins up and
  throws away after the run.
- **`steps`** — an ordered list, top to bottom, inside that one job.
  Each step either reuses a pre-built **action** (`uses:`) or runs a
  raw shell command (`run:`).

## Reading the steps in order

1. **`actions/checkout@v4`** — without this step, the runner is an
   empty Ubuntu machine with no code on it at all. This action clones
   your repository into the runner. Almost every workflow's first step
   is a checkout.
2. **`actions/setup-python@v5`** — installs a specific Python version
   onto the runner and puts it on the `PATH`. Pinning `"3.11"`
   explicitly means this workflow behaves the same today and a year
   from now, instead of silently picking up whatever Ubuntu ships by
   default.
3. **`pip install dbt-postgres==1.7.4`** — a plain shell command,
   installing dbt itself. This is exactly the same command you'd run
   on your own laptop — CI is not a different tool, it's your own
   commands running on GitHub's machine instead of yours.
4. **`dbt deps`** — installs any dbt packages `retail-orders-analytics`
   depends on. Lesson 21 picks up right here and adds the steps that
   actually run the models and tests.

This file is intentionally incomplete — it stops right before
`dbt run` and `dbt test`. That's deliberate: Lesson 21 is entirely
about what those next steps look like and why the database connection
step is the trickiest part of the whole file.

## Watching it actually run

Once `.github/workflows/ci.yml` is committed and pushed, GitHub picks
it up immediately — no separate registration step. Open the repository
on GitHub and click the **Actions** tab:

![Screenshot of a repository's tab bar with the Actions tab highlighted in an orange outline.](/courses/git-cicd/ch05/20-a-real-github-actions-workflow/actions-tab-global-nav-update.png)
*The Actions tab lives alongside Code, Issues, and Pull requests on every repository — this is where every workflow run for this repo lives.*
Source: [GitHub Docs — Viewing workflow run history](https://docs.github.com/en/actions/how-tos/monitor-workflows/view-workflow-run-history)

Inside the Actions tab, the left sidebar lists every workflow file the
repository has — this is where `CI` would show up right under the
workflow's `name:` once it's run at least once:

![Screenshot of the Actions tab's left sidebar, listing workflow files including a CI workflow and CodeQL.](/courses/git-cicd/ch05/20-a-real-github-actions-workflow/superlinter-workflow-sidebar.png)
*Every workflow file in `.github/workflows/` gets its own row here, named after its `name:` field — click one to see every past run.*
Source: [GitHub Docs — Viewing workflow run history](https://docs.github.com/en/actions/how-tos/monitor-workflows/view-workflow-run-history)

Click into a specific run and you get a live, streaming log of every
step — a green check on success, a red X and the exact failing line of
output on failure. That log is the single most useful debugging tool
in this entire chapter: when a workflow fails, the fix is almost never
guesswork, it's reading that log top to bottom until you hit the first
red line.

## Key terms

| Term | Meaning |
|---|---|
| Workflow file | A YAML file in `.github/workflows/` defining one automated pipeline |
| Trigger (`on`) | The event that starts a workflow run — a push, a pull request, etc. |
| Job | A group of steps that runs together on one fresh virtual machine |
| Runner | The disposable virtual machine (e.g. `ubuntu-latest`) a job runs on |
| Step | One action (`uses:`) or shell command (`run:`) inside a job |
| Action | A reusable, pre-built step, like `actions/checkout@v4` |

## Lab

1. Create a new repository (or reuse one from Chapter 2) and add
   `.github/workflows/ci.yml` with the exact file above, but for a
   project you actually have — if you don't have a dbt project handy,
   swap the two dbt-specific steps for `pip install pytest` and
   `pytest --version` instead, just to prove the pipeline itself works.
2. Commit and push it, then open the Actions tab and watch the run
   happen live. Click into the `Check out the repo` and
   `Set up Python` steps and read their logs.
3. Deliberately break something — misspell `runs-on` as `run-on` — and
   push again. Read the error GitHub gives you before fixing it.

## Check yourself

You're ready for Lesson 21 when you can point at any line of the
`ci.yml` file above and say what it does, and when you've watched at
least one real run complete in your own Actions tab.
