# Jobs, Steps & Runners

So far storefront's workflow has had one job. As Northbridge Retail's
pipeline grows, it needs more: a job that builds the Docker image, a job
that lints the code, a job that runs integration tests against a real
database. This lesson covers how multiple jobs relate to each other, what
runs inside one, and the machine it all happens on.

## What you'll learn

- How jobs run in parallel by default, and how `needs` changes that
- The difference between a step that runs an action and one that runs a shell command
- The runner types available — and why `self-hosted` exists
- How to read a finished run's job summary and step-level logs

## Jobs run in parallel, unless you say otherwise

Add a second job to storefront's workflow and, by default, GitHub runs both
at the same time, on two separate runners:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

`needs: lint` is what changes that — `test` now waits for `lint` to finish
successfully before it starts. If `lint` fails, `test` is skipped entirely.
Northbridge Retail uses this to fail fast: no point running a ten-minute
integration suite against code that doesn't even pass a linter.

## Steps: actions vs. commands

Every step inside a job is one of two things:

- **`uses:`** — runs a pre-built **action**, like `actions/checkout@v4` or
  `actions/setup-node@v4`. Actions package up common logic so nobody writes
  "clone a repo" by hand.
- **`run:`** — runs a raw shell command on the runner, exactly as if typed
  into a terminal. `run: npm test` is just that command.

Steps inside one job always execute in order, top to bottom, on the same
runner — later steps can see files earlier steps created, since they share
a filesystem. Steps in *different* jobs never share a filesystem by
default; each job gets its own clean runner.

## Choosing a runner

`runs-on` picks the machine a job executes on:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest   # GitHub-hosted — fastest to set up
  build-windows:
    runs-on: windows-latest
  build-mac:
    runs-on: macos-latest
  build-on-prem:
    runs-on: self-hosted     # a machine Northbridge Retail manages itself
```

GitHub-hosted runners (`ubuntu-latest`, `windows-latest`, `macos-latest`)
are fresh virtual machines, billed by the minute, with nothing to maintain.
A `self-hosted` runner is a machine Northbridge Retail registers and keeps
running itself — useful once storefront needs something a hosted runner
can't offer, like direct network access to an internal staging database.

## Reading a finished run

Click into any run and the summary page shows every job, its status, and
how long it took:

![Screenshot of a completed GitHub Actions workflow run summary, showing job status and duration with a green success checkmark.](/courses/ci-cd-pipelines/ch02/07-jobs-steps-and-runners/actions-quickstart-job.png)
*Status, duration, and the full job list — everything you need at a glance.*
Source: [GitHub Docs — Quickstart for GitHub Actions](https://docs.github.com/en/actions/writing-workflows/quickstart)

Click into a specific job for its step-by-step log:

![Screenshot of a GitHub Actions job's expanded step-by-step log output, each step showing its own checkmark and duration.](/courses/ci-cd-pipelines/ch02/07-jobs-steps-and-runners/actions-quickstart-logs.png)
*This is where debugging actually happens — one step at a time, not the job as a whole.*
Source: [GitHub Docs — Quickstart for GitHub Actions](https://docs.github.com/en/actions/writing-workflows/quickstart)

## Key terms

| Term | Meaning |
|---|---|
| Job | A group of steps that runs on one runner; jobs run in parallel by default |
| `needs` | Makes one job wait for another job to finish first |
| Step | One action (`uses:`) or shell command (`run:`) inside a job |
| Runner | The machine a job executes on — GitHub-hosted or self-hosted |
| `self-hosted` | A runner Northbridge Retail provides and manages itself |
