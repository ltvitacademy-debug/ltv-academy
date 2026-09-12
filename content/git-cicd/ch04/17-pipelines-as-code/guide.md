# Lesson 17 — Pipelines as Code

**Chapter 4 · CI/CD Concepts · Lesson 17 of 25**

## What you'll learn

- What "pipeline as code" means, and why it matters that the pipeline
  itself is versioned
- The vocabulary GitHub Actions uses: events, runners, jobs, and steps
- Reading a real workflow file's structure end to end
- Why a pipeline defined in a file beats one configured by clicking
  through a UI

## The pipeline itself is code now

Older CI systems configured pipelines by clicking through a web UI —
the pipeline's definition lived on a server somewhere, invisible to
`git log`, un-reviewable in a pull request, and impossible to roll
back the way you'd roll back any other change. **Pipeline as code**
means the pipeline's definition is a plain text file, committed to the
same repository it builds — reviewed in PRs, versioned in history,
and identical for every branch that checks it out.

## The vocabulary: event, runner, job, step

GitHub Actions structures a pipeline into four concepts:

![A diagram showing an Event connecting to Runner 1 (running Job 1, made of ordered Steps), connecting to Runner 2 (running Job 2, also made of ordered Steps).](/courses/git-cicd/ch04/17-pipelines-as-code/overview-actions-simple.png)
*One event can trigger multiple runners in sequence or in parallel — each runner executes one job, and each job is an ordered list of steps.*
Source: [GitHub Docs — Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understanding-github-actions)

- **Event** — what triggers the pipeline (a push, a pull request, a
  schedule)
- **Runner** — the machine that actually executes the work
- **Job** — a set of steps that run together, on one runner
- **Step** — a single command or a reusable action, run in order
  within a job

## Reading a real workflow file

```yaml
name: dbt CI
on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dbt
        run: pip install dbt-snowflake
      - name: Run dbt build
        run: dbt build
```

Reading it top to bottom against the vocabulary above: `on:
pull_request` is the event. `runs-on: ubuntu-latest` picks the runner.
`test:` is the job. Each item under `steps:` runs in order — checking
out the code, installing dbt, then running the build. Nothing here is
mysterious once you can name each piece.

## Why this beats clicking through a UI

- **Reviewable.** A change to the pipeline shows up as a diff in a
  pull request, exactly like a change to a dbt model.
- **Reproducible.** Every branch that checks out this file gets the
  identical pipeline — no drift between what ran last week and what
  runs today.
- **Recoverable.** `git log` on the workflow file shows exactly when
  and why the pipeline changed, and `git revert` undoes a bad change
  the same way it would for any other file.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline as code | A pipeline's definition stored as a versioned file in the repository it builds |
| Event | What triggers a workflow — a push, a PR, a schedule |
| Job | A set of steps executed together on one runner |
| Step | A single command or action within a job, run in order |

## Lab

1. Find (or create) a `.github/workflows/*.yml` file in a real
   repository, and identify its event, runner, job(s), and steps by
   name.
2. Change one step's order or add a new step, open it as a pull
   request, and look at the diff — notice it reviews exactly like any
   code change.
3. Run `git log` on that workflow file and read through its history,
   if it has any.

## Check yourself

You're ready for Lesson 18 when you can read a real
`.github/workflows/*.yml` file and correctly name its event, job, and
steps without help.
