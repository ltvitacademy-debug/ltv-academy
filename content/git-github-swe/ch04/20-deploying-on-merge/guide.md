# Lesson 20 — Deploying on Merge

**Chapter 4 · CI/CD Basics · Lesson 20 of 22**

## What you'll learn

- Why a pull request and an actual merge to `main` need different jobs
- Using `github.event_name` and `github.ref` to gate a job to real merges only
- Where deployment credentials come from, safely
- What "deploy" means for different kinds of projects

## A PR check and a deployment are different events

Lesson 19's test job ran on both `push` and `pull_request` — good for
verification, wrong for deployment. You never want to deploy a branch
just because someone opened a PR against `main`; you want to deploy
*after* that PR's code is actually merged. GitHub Actions gates this
with conditions on the event itself:

```yaml
name: Test and Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm test

  deploy:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run deploy
```

Every PR triggers `build-and-test` — reviewers see pass/fail. The
`deploy` job's `if` condition only evaluates true when the event is a
`push` (not a `pull_request`) and the branch being pushed to is
literally `refs/heads/main` — in other words, only on a real merge
commit landing on `main`, never on an open PR, and never on a push to
some other branch. `needs: build-and-test` also means deploy can't run
until the test job passes, even on a real merge.

## Where deployment credentials come from

A deploy step needs real credentials — a cloud provider's API key, a
hosting platform's deploy token — and those can never be hardcoded
into the workflow file, which is plain text, visible to anyone who can
read the repository. GitHub Actions **secrets**, configured in the
repository's settings, get injected as environment variables at run
time and are automatically masked in any log output:

```yaml
  deploy:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run deploy
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

`${{ secrets.DEPLOY_TOKEN }}` never appears in plain text anywhere a
workflow run's logs are visible — GitHub replaces it with `***` if a
step's output ever happens to include it, even accidentally.

## What "deploy" actually means

The specific meaning of this job's last step depends entirely on what
kind of project it is:

- A web app or API: restart a running process, or trigger a hosting
  platform's deploy hook (Vercel, Netlify, a container registry push
  that triggers a rolling update).
- A static site: build it and push the output to the hosting target
  (Lesson 18's checkout + build + upload-to-storage pattern).
- A data project — a dbt project, for instance: there's no server to
  restart at all. Running `dbt build --target prod` successfully *is*
  the deploy — the moment that command finishes, production tables
  already reflect the change.

## Key terms

| Term | Meaning |
|---|---|
| `github.event_name` | The event that triggered this run (`push`, `pull_request`, etc.) — usable in an `if` condition |
| `github.ref` | The branch or tag ref associated with this run, e.g. `refs/heads/main` |
| `needs:` | Makes one job wait for another job to succeed before it runs |
| GitHub Actions secret | An encrypted value stored in repository settings, injected as an env var and masked in logs |

## Lab

1. Extend a practice repository's test workflow with a second job
   gated by `github.event_name == 'push' && github.ref ==
   'refs/heads/main'`, using `needs:` to depend on the test job.
2. Add a fake "deploy" step (an `echo` is fine for practice) using a
   repository secret, and confirm in the logs that the secret value
   never appears in plain text.
3. Open a PR and confirm the deploy job does *not* run; merge it and
   confirm the deploy job *does* run.

## Check yourself

You're ready for Lesson 21 when you can explain, from the `if`
condition alone, exactly which events trigger a deploy job and which
don't — and you've watched a deploy job correctly skip on a PR and
correctly fire on a real merge.
