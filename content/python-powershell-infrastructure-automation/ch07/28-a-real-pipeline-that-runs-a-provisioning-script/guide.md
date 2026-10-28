# Lesson 28 — A Real Pipeline That Runs a Provisioning Script

**Chapter 7 · CI/CD for Infrastructure Scripts · Lesson 28 of 32**

## What you'll learn

- How source control, a hosted pipeline, and a stored secret from the last three lessons come
  together into one complete, working example
- How a GitHub Actions workflow authenticates to Azure using a credential from the pipeline's own
  secret store, never from a hardcoded value
- How to read a real workflow file step by step: trigger, checkout, login, run
- Why this exact pattern is what actually runs the scripts you've already written earlier in this
  course, on a schedule, without anyone touching a laptop

## Putting it all together

Lessons 25 through 27 covered three separate ideas: scripts live in Git, pipelines run them on a
hosted machine instead of a laptop, and credentials come from the pipeline's own secret store. A
real pipeline uses all three at once. Here's a complete GitHub Actions workflow that runs the
VM start/stop script from Lesson 21, automatically, every weeknight:

```
name: Stop Dev VMs Nightly

on:
  schedule:
    - cron: "0 23 * * MON-FRI"
  workflow_dispatch:

jobs:
  stop-vms:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Azure login
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Run VM stop script
        shell: pwsh
        run: ./scripts/Stop-DevVMs.ps1
```

## Reading it step by step

**The trigger.** `on: schedule:` with `cron: "0 23 * * MON-FRI"` fires this job at 23:00 UTC every
weeknight — exactly the kind of reliable, unattended trigger Lesson 26 described.
`workflow_dispatch:` adds a manual override if someone needs to run it early.

**`actions/checkout@v4`.** The runner starts with an empty hosted machine. This step pulls the
actual repository content — including `scripts/Stop-DevVMs.ps1` — onto that machine, because a
hosted runner has nothing on it until a workflow puts something there.

**`azure/login@v2`.** This is the authentication step, and it's where Lesson 27 matters directly:
`creds: ${{ secrets.AZURE_CREDENTIALS }}` pulls a service principal credential from the repository's
GitHub Actions secrets — never written into this file — and uses it to log the runner into Azure
for the rest of the job.

**The run step.** With the repo checked out and the runner authenticated, `./scripts/Stop-DevVMs.ps1`
runs exactly the same script from Lesson 21, on a consistent hosted image, with a full log of this
run kept automatically.

## Why this is the real pattern

Nothing in this workflow is a toy example — it's the same shape every pipeline in this chapter has
pointed toward: a script committed to a repo (Lesson 25), triggered reliably from a hosted runner
instead of a laptop (Lesson 26), authenticating with a credential that's never hardcoded and never
printed (Lesson 27). Swap `Stop-DevVMs.ps1` for the tag-compliance script from Lesson 22 or the
backup-verification script from Lesson 23, and the same four steps — trigger, checkout, login,
run — still apply.

## Key terms

| Term | Meaning |
|---|---|
| `actions/checkout@v4` | The GitHub Actions step that pulls the repository's files onto the hosted runner |
| `azure/login@v2` | The GitHub Actions step that authenticates the runner to Azure using a stored credential |
| Service principal | An identity Azure issues for an application or automation to authenticate with, instead of a human user account |
| Workflow | A complete pipeline definition file — trigger, jobs, and steps — stored in a repo's `.github/workflows` folder |

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: walk through this workflow's four
steps in order — trigger, checkout, login, run — and say what Lesson 25, 26, or 27 each one is
actually built on.
