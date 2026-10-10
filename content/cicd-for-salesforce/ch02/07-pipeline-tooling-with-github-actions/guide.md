# Lesson 7 — Pipeline Tooling with GitHub Actions

**Chapter 2 · Pipelines in Practice · Lesson 7 of 19**

## What you'll learn

- The three levels of a GitHub Actions workflow file — triggers, jobs, steps — and how they relate
- A real, complete `.github/workflows/ci.yml` skeleton for a Salesforce DX project
- The difference between a `uses:` step (a pre-built action) and a `run:` step (a raw shell command)
- Where to actually watch a workflow execute once it's pushed

## Why GitHub Actions, specifically

Chapter 1 described pipeline stages in the abstract. This chapter makes them real using **GitHub Actions**, GitHub's built-in CI/CD runner. Every workflow lives as a YAML file inside `.github/workflows/` in your repository. The moment that file is committed and pushed, GitHub starts watching for the events it names — no separate registration step, no external service to wire up.

## The three levels of a workflow file

```yaml
name: Salesforce CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  validate-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v4

      - name: Install Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install Salesforce CLI
        run: npm install --global @salesforce/cli

      - name: Verify CLI install
        run: sf --version
```

- **`on`** — the trigger. This workflow runs on every pull request targeting `main` and every direct push to `main`.
- **`jobs`** — one job named `validate-and-test`, running on a fresh, disposable `ubuntu-latest` virtual machine that GitHub provisions and destroys after the run.
- **`steps`** — an ordered list inside that job. Each step is either a reusable **action** (`uses:`) or a raw shell command (`run:`).

## Reading the steps

1. **`actions/checkout@v4`** — without this, the runner is an empty Ubuntu machine with no code on it. This is almost always a workflow's first step.
2. **`actions/setup-node@v4`** — the Salesforce CLI ships as an npm package, so the runner needs Node.js before it can install the CLI at all. Pinning `node-version: "20"` keeps this behaving the same today and a year from now.
3. **`npm install --global @salesforce/cli`** — a plain shell command installing the CLI itself. This is the same command you'd run on your own laptop; CI just runs it on GitHub's machine instead of yours.
4. **`sf --version`** — a sanity check that the install actually worked, printing the installed CLI version to the log before any real work depends on it.

This file is deliberately incomplete — it stops right before anything Salesforce-specific happens. Lesson 8 picks up exactly here and adds the authentication and deploy steps.

## Watching a run happen

Once this file is pushed, open the repository on GitHub and click the **Actions** tab. The left sidebar lists every workflow file the repo has, named after each file's `name:` field. Click into a specific run to get a live, streaming log of every step — a green check on success, a red X and the exact failing line on failure. Reading that log top to bottom until you hit the first red line is, in practice, the single most useful debugging skill for working with this tool.

## Key terms

| Term | Meaning |
|---|---|
| Workflow file | A YAML file in `.github/workflows/` defining one automated pipeline |
| Trigger (`on`) | The event that starts a workflow run — a push, a pull request, etc. |
| Job | A group of steps that runs together on one fresh virtual machine |
| Runner | The disposable VM (e.g. `ubuntu-latest`) a job runs on |
| Action (`uses:`) | A reusable, pre-built step, like `actions/checkout@v4` |
| Step (`run:`) | A raw shell command executed directly on the runner |

## Lab

Create a new (or reuse an existing) GitHub repository containing a Salesforce DX project, and add `.github/workflows/ci.yml` with the exact file above. Commit and push it, open the Actions tab, and watch the run happen live. Then deliberately break something — misspell `runs-on` as `run-on` — push again, and read the error GitHub gives you before fixing it.

## Check yourself

Can you point at any line of the workflow file above and say what it does? Can you explain why `actions/checkout@v4` is almost always a workflow's very first step?
