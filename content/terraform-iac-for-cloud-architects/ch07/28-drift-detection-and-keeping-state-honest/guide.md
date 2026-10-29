# Lesson 28 — Drift Detection and Keeping State Honest

**Chapter 7 · Terraform in CI/CD · Lesson 4 of 4**

## What you'll learn

- What drift actually is, and why it's one of the most common real-world
  problems a Terraform-managed environment runs into
- Why someone fixing something urgently in the Azure or AWS console, instead
  of through the pipeline, is the usual cause
- How to run `terraform plan -detailed-exitcode` on a schedule, even with no
  code changes, to catch drift automatically
- How to turn that exit code into a failed, alerting pipeline run instead of
  a plan nobody ever reads

## What drift is, and why it happens

**Drift** is what happens when the real infrastructure in the cloud no
longer matches what Terraform's state file believes is there. The usual
cause isn't exotic: an on-call engineer gets paged at 2 a.m., a firewall
rule or a VM size needs to change *right now*, and the fastest path is
clicking directly in the Azure or AWS console instead of opening a pull
request and waiting for a review. The fix works. But Terraform's state
still records the old configuration, and nothing about the next `plan` or
`apply` tells anyone that happened — unless something is specifically
looking for it.

## Why drift is a real, ongoing risk

Left undetected, drift compounds in two dangerous directions. The next
`terraform apply` from the pipeline might silently revert that urgent
manual fix, because as far as Terraform knows the old configuration is
still correct. Or, just as bad, the team's mental model of "what's actually
running" slowly drifts away from what the `.tf` files describe, so nobody
can fully trust `terraform plan` to show the whole picture anymore. Neither
failure mode announces itself — they just sit there until someone hits
them.

## Catching it with a scheduled plan

The fix is to run `terraform plan` even when nothing has changed in the
repository, on a recurring schedule, and treat any detected change as a
signal worth investigating:

```yaml
name: Nightly Drift Check

on:
  schedule:
    - cron: "0 6 * * *"
  workflow_dispatch:

jobs:
  drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init

      - name: Terraform Plan
        id: plan
        run: |
          terraform plan -detailed-exitcode -no-color
          echo "exitcode=$?" >> "$GITHUB_OUTPUT"
        continue-on-error: true
```

`cron: "0 6 * * *"` runs this every day at 06:00 UTC, with no code change
required to trigger it — `workflow_dispatch` adds a manual run for whenever
someone wants to check sooner. `-detailed-exitcode` is the flag that makes
this whole pattern work: a plain `terraform plan` always exits `0` whether
or not anything changed, but `-detailed-exitcode` returns `0` for no
changes, `1` for an error, and `2` specifically when the plan found
differences — exactly the "did reality drift from state" signal this job
needs.

## Turning the exit code into a real alert

Capturing that exit code and failing the job on a `2` is what turns a plan
nobody would otherwise read into a pipeline failure the team actually
notices:

```yaml
      - name: Fail if drift detected
        if: steps.plan.outputs.exitcode == '2'
        run: |
          echo "::error::Drift detected — infrastructure no longer matches state"
          exit 1
```

A red, failed "Nightly Drift Check" run is a far more reliable alert than
hoping someone remembers to run `terraform plan` by hand next week. From
there, the fix is always to decide deliberately: either codify the manual
change into the `.tf` files so the pipeline's next `apply` matches reality
on purpose, or run a real `apply` to put the drifted resource back the way
the configuration says it should be — never just leave the mismatch sitting
there for the next person to find by accident.

## Key terms

| Term | Meaning |
|---|---|
| Drift | When real infrastructure no longer matches what the Terraform state file records |
| `-detailed-exitcode` | A `terraform plan` flag that returns 0 (no changes), 1 (error), or 2 (changes found) |
| `schedule:` / `cron` | The workflow trigger that runs a job on a recurring time, with no code change required |
| `workflow_dispatch` | A trigger that adds a manual "run now" button for a workflow in the GitHub Actions UI |

## Check yourself

You're ready for Chapter 8 when you can explain, without looking: what does
`-detailed-exitcode` return in each of its three cases, and why does a
drift-check job specifically need that flag instead of a plain
`terraform plan`?
