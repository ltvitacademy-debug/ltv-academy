# Lesson 14 — Trial Migrations and Rehearsals

**Chapter 3 · Proving and Cutting Over · Lesson 14 of 18**

## What you'll learn

- Why a migration needs to be rehearsed before the real cutover, not just designed well
- Which sandbox types actually support a meaningful rehearsal, and which don't
- How rehearsal timing feeds directly into the cutover plan in the next lesson
- Why a rehearsal defect is a success for the project, not a failure

## A good design still has to be rehearsed

Everything built in Chapter 2 — mapping, transformation, sequencing, External ID handling — represents a plan for how the migration should go. A **trial migration** (or rehearsal) is the practice of actually running that plan, against real or realistic data, before the actual cutover event, specifically to find out whether the plan survives contact with reality. A design can look completely correct on paper and still fail in execution — a transformation rule that works on the 20 sample records someone checked by hand can break on record #4,312 because of an edge case nobody happened to sample. Rehearsal is how a project finds that out on a Tuesday afternoon weeks before go-live instead of during the actual cutover weekend.

## Not every sandbox can rehearse a real load

Salesforce sandboxes come in a few types, and they don't all hold production data, which matters enormously for rehearsal:

- **Developer and Developer Pro** sandboxes copy an org's metadata but carry no production records at all (Developer: roughly 200 MB data / 5 MB files; Developer Pro: roughly 1 GB data / 1 GB files, capacities aimed at configuration and unit testing, not data volume). Neither one can meaningfully rehearse an actual data load, because there's no realistic data in them to migrate against.
- **Partial Copy** sandboxes include a defined subset of production data and metadata, chosen via a sandbox template, with roughly 5 GB data / 5 GB files and a refresh cycle of about every 5 days. This is the practical environment for early-stage rehearsals — testing mapping logic and load scripts against real (if partial) data, refreshed often enough to iterate quickly as mapping bugs get fixed.
- **Full** sandboxes are a complete copy of production, refreshable only roughly every 29 days. This is the closest thing to rehearsing at true production scale and is the right target for a final dress rehearsal before cutover — but its slow refresh cycle and higher cost mean it isn't where a team should be debugging basic mapping mistakes for the first time.

The practical sequence most projects follow: validate configuration in Developer/Developer Pro, rehearse load logic early and iteratively in Partial Copy, and run a final, production-scale dress rehearsal in Full before committing to the real cutover date.

## Timing the rehearsal is itself a deliverable

Beyond just confirming the load works, a rehearsal produces a number the project genuinely needs: how long the migration actually takes to run at real (or close to real) volume. That duration feeds directly into Lesson 15's cutover plan — a freeze window has to be long enough to actually fit the load, and the only credible way to know that is to have timed it for real, not estimated it from a smaller sample and hoped it scales linearly (it frequently doesn't, especially once Bulk API 2.0's batch-size and per-batch time limits start to matter at real volume).

## A rehearsal defect is the rehearsal working, not failing

The instinct to treat a problem found during rehearsal as bad news is backwards. A rehearsal that surfaces a sequencing bug, a transformation edge case, or an unexpectedly slow load step did exactly what it was supposed to do — found the problem while there was still time and budget to fix it, instead of during the live cutover event when there usually isn't either. The actual warning sign is the opposite: a rehearsal that reports "everything worked perfectly, no issues at all" on the first attempt, with real data at real volume, deserves more scrutiny, not less — it's at least as likely that the rehearsal wasn't thorough enough to find what's actually there as it is that the migration is genuinely flawless.

## Key terms

| Term | Meaning |
|---|---|
| Trial migration (rehearsal) | Running the migration plan against real or realistic data before the actual cutover, to find problems early |
| Developer / Developer Pro sandbox | Metadata-only sandboxes with no production records; unsuitable for rehearsing an actual data load |
| Partial Copy sandbox | A sandbox holding a template-defined subset of production data, refreshed roughly every 5 days; good for early, iterative rehearsals |
| Full sandbox | A complete copy of production, refreshable roughly every 29 days; the right target for a final, production-scale dress rehearsal |

## Lab

A project is six weeks from its planned cutover date. The team has only tested their migration mapping logic in a Developer sandbox so far, and the architect is asked whether the project is on track. Write a short assessment explaining why testing in a Developer sandbox alone does not constitute a real rehearsal, what sandbox progression you'd recommend for the remaining six weeks, and why you'd insist on at least one rehearsal in a Full sandbox before cutover, even though it only refreshes roughly every 29 days.

## Check yourself

Can you explain why Developer and Developer Pro sandboxes can't meaningfully rehearse an actual data load? Can you explain why finding a defect during rehearsal should be treated as the rehearsal succeeding, not the project failing?
