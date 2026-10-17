# Incremental Strategy & Materialization Decision Guide

From Chapters 2 and 5.

## Choosing a materialization

| Situation | Materialization |
|---|---|
| Small, cheap-to-compute, queried rarely | `view` |
| Queried often, data doesn't grow unbounded | `table` |
| Large and growing — reprocessing full history every run is too slow | `incremental` |
| Only used inside another model, never queried directly | `ephemeral` |

A `view` re-runs its full query on every single query against it. A
`table` computes once per `dbt run` and stores the result. An
`incremental` table only recomputes new/changed rows on each run —
the fix when a `table`'s full-history recompute itself becomes the
bottleneck as history grows.

## Choosing an incremental strategy

| Situation | Strategy |
|---|---|
| Rows can be updated after arrival; need the latest value in place | `merge` |
| A whole batch replaces a whole prior batch, or `MERGE` isn't supported on this warehouse | `delete+insert` |
| Truly immutable, append-only event data — a row is never updated after it's first written | `append` |

**Using `append` on data that can be updated later produces duplicate
rows the moment a "new" row turns out to be a changed version of one
you already have.** This is a silent failure — it compiles and runs
without error.

## The two incremental gotchas

- **Schema drift**: a column added to the source after an incremental
  model's first build is missing/null on rows built before the
  change. Signature: `select count(*) from the_model where
  new_column is null` returns a large, suspicious count.
- **Late-arriving data**: a row that reaches the source after the
  model's watermark has already advanced past its timestamp gets
  silently skipped, forever. Fix: a lookback window (re-check the
  last N days every run) or switch the filter to processing time
  instead of event time.

## The fix for both: `dbt run --full-refresh`

Drops and rebuilds the target table from scratch, ignoring
`is_incremental()`'s filtering entirely. Correct, occasional cost —
not a free action to run on every deploy. Schedule periodic full
refreshes (weekly, or triggered after a known schema change) so
drift gets caught on a known cadence, not only when a report shows a
wrong number.
