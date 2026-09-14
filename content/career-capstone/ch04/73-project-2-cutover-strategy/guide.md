# Lesson 73 — Project 2: Cutover Strategy

**Chapter 4 · Added Projects — Capstones · Lesson 73 of 81**

## What you'll learn

- Big-bang vs. phased/parallel-run cutover, and why the migration built in
  Lessons 71–72 defaults to the second
- How to validate the new warehouse against the old sources *before*
  anyone's dashboard depends on it
- What a rollback plan actually needs to contain to be usable under pressure
- The go/no-go gate that decides when cutover is actually done

## Two ways to flip the switch

Lesson 72 built the target warehouse; this lesson decides how the
organization actually starts depending on it instead of the old sources.
There are two real options.

```
Big-bang:     old sources retired on a single date; every report,
              every downstream job, repointed at once
Phased /      old and new run side by side for a defined window;
parallel-run: consumers migrate report by report; old sources retired
              only after the last consumer moves off them
```

Big-bang is faster to finish and simpler to reason about, but it has no
partial-failure mode — if the new warehouse has a bug nobody caught,
*everything* is wrong at once, for every consumer, on day one. A
multi-source migration (Lesson 71's source assessment covered several
systems feeding this warehouse) almost always defaults to a phased,
parallel-run cutover instead: lower blast radius, and each report that
moves off the old system is evidence the migration is actually working
before the next one moves.

## Validate before anyone depends on it

A parallel run only earns its cost if the two systems are actually being
compared while they run side by side — not just left running and assumed
correct.

```sql
-- Reconciliation query pattern, run daily during the parallel-run window:
-- same business question, asked of both warehouses, diffed automatically
SELECT
    old.report_date,
    old.total_sales AS old_total,
    new.total_sales AS new_total,
    old.total_sales - new.total_sales AS variance
FROM OldWarehouse.dbo.DailySales AS old
JOIN NewWarehouse.dbo.DailySales AS new
    ON old.report_date = new.report_date
WHERE ABS(old.total_sales - new.total_sales) > 0.01;
```

Any row this query returns is a discrepancy that has to be explained —
either a bug in the migration (Lesson 72's transformation logic) or a
legitimate difference in grain or timing that needs documenting before
that report is allowed to move. Zero rows for a report, for the full
parallel-run window, is the actual bar for calling that report validated
— not "the numbers looked right once."

## The rollback plan

A cutover plan without a rollback plan isn't a cutover plan — it's a bet.
The rollback plan has to answer three questions *before* cutover starts,
not after something breaks:

| Question | Why it has to be answered in advance |
|---|---|
| What's the trigger? | A specific, pre-agreed threshold (e.g., reconciliation variance above X%) — not a judgment call made under pressure |
| What's the mechanism? | Repointing connection strings/reports back to the old source — proven to work *before* cutover, not improvised during an incident |
| How long is the old source kept alive? | Long enough to actually roll back to — retiring it too early is the one rollback-plan mistake that can't be undone |

## The go/no-go gate

Cutover for a given report or consumer is "go" only when its reconciliation
has shown zero unexplained variance for the full agreed window, and the
consumer has confirmed they've repointed and can see the new warehouse.
Anything short of that is "no-go" — stay on the old source a while longer.
This is the same instinct as the freshness-SLA and incident-response
thinking from earlier in the track: a fixed, pre-agreed bar decides the
outcome, not how confident anyone feels on the day.

## Key terms

| Term | Meaning |
|---|---|
| Big-bang cutover | Every consumer repointed at once, on one date — fast, but no partial-failure mode |
| Phased / parallel-run cutover | Old and new run side by side; consumers migrate one at a time as each is validated |
| Reconciliation query | An automated diff between old and new sources, run repeatedly, not eyeballed once |
| Go/no-go gate | A pre-agreed, objective bar a report must clear before it's allowed to cut over |

## Check yourself

You're ready for Lesson 74 when you can explain, without looking: why
does a reconciliation query need to run repeatedly across the whole
parallel-run window, rather than being checked once and trusted?
