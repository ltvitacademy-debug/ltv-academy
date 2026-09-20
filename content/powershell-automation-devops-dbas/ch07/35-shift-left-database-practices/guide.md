# Shift-Left Database Practices

Lesson 34 covered getting a DBA into conversations earlier. This lesson names the broader
principle behind that: shift-left, and how the CI/CD pipeline you already built in Chapter 4
is exactly where shift-left database practices live in practice.

## What you'll learn

- What "shift left" means, and where the name comes from
- Where database problems traditionally surface, versus where shift-left catches them instead
- Concrete shift-left practices for databases, not just the abstract idea
- Why catching a problem earlier is so much cheaper than catching it later

## What "shift left" means

Draw a timeline of a change from a developer's first commit, on the left, through code review,
CI, staging, and finally production, on the right. "Shift left" means moving the point where a
problem gets caught as far left on that timeline as possible — out of production, out of
staging, ideally into code review or an automated check that runs the moment code is written.
The name is literal: you're moving detection earlier, toward the left edge of the timeline, not
adding new work so much as relocating when existing work happens.

## Where problems traditionally surface

Without shift-left practices, a bad migration or a missing index typically surfaces in
production: a page gets slow, an alert fires (Chapter 6 covered building those alerts), an
on-call DBA gets paged, and the fix now happens under incident pressure, with customers already
affected. The same problem, caught in development or during code review, is a five-minute fix
made by the person who already has the full context of the change in their head — no incident,
no page, no pressure.

## Concrete shift-left practices for databases

This isn't an abstract mindset — it's specific things a CI pipeline (Chapter 4) actually does
before a change merges:

```yaml
# A CI stage that runs before merge, not after deploy
- name: Validate migration against a throwaway schema copy
  run: Invoke-DbaQuery -SqlInstance $Ci -Database ScratchCopy -File $Migration
- name: Fail if the migration removes a column without an explicit flag
  run: pwsh ./scripts/check-destructive-changes.ps1 -Script $Migration
- name: Warn if a new query in this PR would run without a supporting index
  run: pwsh ./scripts/check-missing-indexes.ps1 -Diff $PullRequestDiff
```

A schema review built into the pull-request process — a human or an automated check reading the
migration diff before merge — catches design problems the same way; a migration that runs
successfully against a scratch copy of the schema in CI, before it ever reaches staging, catches
a syntax or dependency error the same day it's written, not weeks later.

## Why earlier is so much cheaper

The core argument for shift-left is cost, not virtue: a schema problem caught in code review
costs a comment and a five-minute fix. The same problem caught in production costs an incident,
a postmortem (Lesson 36 covers that directly), lost trust, and often a rushed fix made under far
worse conditions than the original change would have needed. Shifting left doesn't eliminate
problems — it changes which version of "finding out" you get.

## Key terms

| Term | Meaning |
|---|---|
| Shift left | Moving problem detection earlier in the development timeline — toward code, away from production |
| Schema review | A check on a proposed schema change before it merges, human or automated |
| CI validation | Running a migration or query against a scratch copy of the schema before it's merged |

## Check yourself

A missing index on a new query ships to production and only gets noticed when a page slows down
under real load. What CI check from this lesson could have caught that same problem before the
pull request was even merged?
