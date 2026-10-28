# Lesson 26 — Running a Script from a Pipeline, Not a Laptop

**Chapter 7 · CI/CD for Infrastructure Scripts · Lesson 26 of 32**

## What you'll learn

- The real risks of "it works on my machine" when the machine in question is someone's personal laptop
- Why a script that only runs from a laptop has no record of who ran it, when, or with what result
- What a real CI/CD pipeline — GitHub Actions or Azure DevOps Pipelines — actually gives you instead
- Why a consistent environment, logged execution, and reliable triggers are the whole point of running
  automation this way

## The laptop problem

A script that only runs when someone opens a terminal on their own laptop has three real problems,
and none of them are about the script's logic being wrong.

**No record of who ran it, when, or what happened.** If a tag-compliance script silently stops
running for two weeks because the person who normally runs it was on vacation, nobody finds out
until something downstream breaks. There's no log to check — the only record was in that person's
head.

**It breaks if the laptop isn't available.** A script tied to one machine stops being reliable the
moment that machine is in for repair, reimaged, or simply turned off. The automation isn't actually
automated; it's one person manually remembering to run a command.

**The environment is inconsistent.** One laptop has PowerShell 7.4 and the Az module at version
11; another has PowerShell 5.1 and an older Az module. A script that behaves correctly on one
machine can behave differently — or fail outright — on another, for reasons that have nothing to
do with the script itself.

## What a real pipeline gives you instead

A **CI/CD pipeline** — **GitHub Actions** or **Azure DevOps Pipelines** are the two you'll see most
in Azure-centered shops — runs your script on a managed, hosted machine instead of anyone's laptop,
and it fixes all three problems directly:

- **Consistent environment.** The pipeline definition specifies exactly which runner image, which
  PowerShell version, which modules get installed — every run gets the identical environment, every
  time, regardless of whose commit triggered it.
- **Logged execution.** Every run is recorded automatically: the exact commit that triggered it, the
  timestamp, the full console output, and whether it succeeded or failed — all visible later, to
  anyone on the team, without anyone having to remember to keep notes.
- **Reliable triggers.** A pipeline can run on a schedule (a cron expression), on every push to a
  branch, or on demand with a manual button — and it fires exactly when configured to, with no
  dependency on a specific person being at their desk.

## A trigger, defined once

Here's a GitHub Actions trigger that runs a script automatically on a schedule, with a manual
override available too:

```
on:
  schedule:
    - cron: "0 7 * * MON-FRI"
  workflow_dispatch:

jobs:
  run-script:
    runs-on: ubuntu-latest
```

`cron: "0 7 * * MON-FRI"` fires the job at 07:00 UTC every weekday; `workflow_dispatch:` adds a
button in GitHub's UI to run it manually whenever needed. `runs-on: ubuntu-latest` picks a hosted
runner with a known, consistent image — the same one every single run uses.

## Key terms

| Term | Meaning |
|---|---|
| CI/CD pipeline | An automated system that runs defined steps (build, test, deploy, or run a script) on a hosted machine, triggered by events |
| Runner / agent | The hosted machine a pipeline platform provisions to actually execute a pipeline's steps |
| Trigger | The event that starts a pipeline run — a push, a schedule, a pull request, or a manual button |
| `workflow_dispatch` | A GitHub Actions trigger that adds a manual "Run workflow" button in the UI |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: name the three specific problems
with running automation only from a personal laptop, and how a CI/CD pipeline's hosted runner fixes
each one.
