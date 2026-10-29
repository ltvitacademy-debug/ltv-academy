# Lesson 26 — Requiring Approval Before terraform apply

**Chapter 7 · Terraform in CI/CD · Lesson 2 of 4**

## What you'll learn

- Why `terraform apply` should never run unattended on every merge, the way a
  simpler application deployment might
- How a GitHub Actions **environment** with required reviewers pauses a job
  until a human approves it
- How to wire that environment protection rule into an apply workflow with
  one line
- How Terraform Cloud's run-approval model enforces the same gate for teams
  using it instead of GitHub Actions

## Why apply is not like deploying an app

A bad application deployment is usually recoverable in seconds — roll back
to the previous container image or the previous build, and the old version
comes right back. A bad `terraform apply` is a different kind of risk
entirely. It can delete a production database, replace a VPC that other
resources depend on, or rewrite a security group in a way that locks out
real traffic — and some of those changes are destructive and not simply
reversible by redeploying something. That asymmetry is exactly why this
chapter already put `terraform plan` on autopilot in Lesson 25 but stops
short of doing the same for `apply`: the plan is cheap to run automatically,
the apply is not.

## A GitHub Actions environment as the gate

GitHub Actions has a built-in mechanism for exactly this: an **environment**.
A job that targets an environment with required reviewers configured simply
pauses — showing "Waiting for review" — until one of those reviewers
approves it, no matter what triggered the workflow:

```yaml
name: Terraform Apply

on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  apply:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3

      - name: Terraform Init
        run: terraform init

      - name: Terraform Apply
        run: terraform apply -auto-approve
```

The trigger, `on: push: branches: [main]`, still fires automatically on
every merge — but `environment: production` is what stops `apply` from
actually running the moment that happens. That one line ties the job to a
GitHub Environment configured under the repository's **Settings →
Environments**, where "Required reviewers" is turned on and one or more
people are named. The job sits paused until a named reviewer clicks Approve
in the GitHub UI — only then does `terraform apply -auto-approve` run.

## Setting the required reviewers

A repository admin configures this once, either in the Settings UI or with
the GitHub CLI:

```
gh api repos/OWNER/REPO/environments/production \
  --method PUT \
  -f "reviewers[][type]=User" \
  -f "reviewers[][id]=12345678"
```

Every subsequent workflow run that targets the `production` environment
inherits this rule automatically — no changes to the workflow file itself
are needed once it's set.

## The same idea in Terraform Cloud

Teams running Terraform Cloud instead of their own GitHub Actions pipeline
get an equivalent gate built into the platform itself. A VCS-driven
workspace can be set to **Manual Apply**, so every run stops after the plan
and waits for a person to click "Confirm & Apply" in the Terraform Cloud UI
— the same plan-then-pause-for-a-human shape, enforced by the platform
instead of a workflow file.

## Key terms

| Term | Meaning |
|---|---|
| GitHub Environment | A named deployment target (e.g. `production`) that a job can be gated on |
| Required reviewers | An environment protection rule that pauses a job until a named person approves it |
| `environment:` | The job-level key in a workflow that ties a job to a GitHub Environment and its protection rules |
| Manual Apply | Terraform Cloud's workspace setting that pauses a run after plan until a person confirms the apply |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why is a
one-line `environment: production` key enough to stop `terraform apply` from
running unattended, when the trigger itself is still fully automatic?
