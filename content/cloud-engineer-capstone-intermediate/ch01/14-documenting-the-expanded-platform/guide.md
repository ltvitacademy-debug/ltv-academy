# Lesson 14 — Documenting the Expanded Platform

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 14 of 16**

## What you'll learn

- Why documentation written after a project ships is a different, and in some ways harder, task
  than documenting as you go
- What belongs in a platform write-up versus what belongs in a runbook or a PR description
- How to document a mistake and its fix honestly, without either hiding it or over-dramatizing it
- Why the guardrail from Lesson 13 needs to be documented as a behavior, including what its
  override path is for

## Writing for someone who wasn't there

Everything from Lesson 1 through Lesson 13 happened inside Theo's head, a string of pull requests,
and a handful of Slack threads with Priya Suresh and Casey Lindqvist. None of that is discoverable
by the next engineer who touches this app in six months, or even by Theo himself a year from now
when the details have gone fuzzy. The write-up's job is to make the whole platform — and both
mistakes — understandable to someone who wasn't in the room for any of it.

## What the document actually covers

A single README-style document, checked into the platform repo alongside the Terraform modules and
the pipeline it describes, organized in the order someone would actually need it:

- **Architecture overview** — the containerized app, deployed to Azure via Terraform-provisioned
  AKS, backed up to AWS S3 with cross-cloud replication, all flowing through the GitHub Actions
  pipeline from Lesson 5
- **The two scaling profiles** — `standard` (2/6) and `peak-season` (10/20), what each is for, and
  explicitly: **only change this via the module's `profile_name` argument in a reviewed pull
  request, never by editing the live HPA directly**
- **The backup bucket's access model** — `driftwood-outdoor-backups`, scoped to the
  `driftwood-backup-writer` role only, with S3 Block Public Access enabled, and why that specific
  role exists
- **What happened and what changed** — both findings, in plain language, covered next
- **The new guardrail** — what it checks, what failing it looks like, and exactly how the
  `peak-season-override` label is meant to be used

## Documenting the mistakes honestly

This is the section that's easiest to get wrong in either direction. Soft-pedaling it — "a small
configuration adjustment was made" — leaves the next engineer with no idea what actually went
wrong or why the guardrail exists. Overdramatizing it — treating a copy-paste error and an
unscoped bucket policy like a security breach with casualties — makes a normal, caught-and-fixed
mistake sound like something it wasn't. The honest version states plainly what was wrong, why it
happened, how it was found, and how it was fixed and verified:

> **Autoscaling floor (found and fixed):** this app's Terraform module referenced the
> `peak-season` scaling profile (minReplicas: 10) instead of `standard` (minReplicas: 2) during
> initial setup, most likely copied from a different, higher-traffic environment's config. This
> ran the app at roughly 40% more cost than projected for about three weeks before being caught in
> a routine cost review, traced, and corrected. No customer impact; the app was never undersized,
> only oversized.
>
> **S3 backup bucket policy (found and fixed):** the backup bucket's policy granted access to any
> principal (`"*"`) instead of only the intended replication role, with S3 Block Public Access
> disabled. This was caught during the same review pass, before any confirmed unauthorized access,
> and corrected by scoping the policy to the `driftwood-backup-writer` role and enabling Block
> Public Access.

Both entries name what was wrong, why it happened, and how it's now prevented — which is exactly
the information Lesson 15 needs for presenting this to Priya and Casey without either hiding
anything or making it sound worse than it was.

## Documenting the guardrail as a behavior, not just a feature

The guardrail isn't just "we added a check" — it needs its failure message and its override path
documented clearly enough that a future engineer hitting it for the first time knows exactly what
to do: fix the underlying value, or apply the `peak-season-override` label if the high value is
genuinely intentional for a scheduled event. Undocumented, a guardrail that blocks a merge with no
clear explanation just looks like a broken pipeline to the next person who hits it.

## Key terms

| Term | Meaning |
|---|---|
| Platform write-up | A single reference document covering a system's architecture, operational model, and history of material changes |
| Honest incident documentation | Stating what happened, why, how it was found, and how it was fixed — without minimizing or overdramatizing |
| Access model | The documented statement of who/what is allowed to do what with a given resource, and why |

## Lab

Draft the one-paragraph "what changed" summary for the autoscaling fix that you would want a new
engineer to read six months from now, using only information that's actually true and verifiable
from Lessons 9–12 — no invented detail.

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: what's the difference between
documenting a mistake honestly and either hiding it or overdramatizing it, and why does the
guardrail's override path need to be written down as clearly as the check itself?
