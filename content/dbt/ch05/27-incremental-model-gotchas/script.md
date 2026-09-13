# Script — Incremental Model Gotchas & Full Refreshes

## Segment 1 (title)

Incremental models don't reprocess history, which is exactly why a bad run doesn't fix itself. Two real failure modes: a schema change breaking things silently, and late-arriving data getting quietly skipped forever.

## Segment 2 (code: schema drift)

If someone adds a column to the source, the model's existing rows never re-run against it. The new column shows up populated for new rows and null for everything built before the change — invisible until someone notices, and easy to mistake for a data quality bug instead of what it actually is.

## Segment 3 (code: late-arriving data)

The is_incremental filter trusts a row's timestamp reflects when it actually showed up. Real systems don't cooperate — a row that arrives late with an old timestamp gets filtered out by a watermark that already moved past it, and never gets picked up again. A lookback window re-checks a few recent days every run to catch this.

## Segment 4 (code: full refresh)

dbt run --full-refresh drops the target table and rebuilds it from scratch, ignoring is_incremental's filtering entirely — the same select that ran on the model's very first build. It fixes both gotchas with the same mechanism: nothing gets filtered out.

## Segment 5 (steps: the habit)

A full refresh costs exactly what incremental was built to avoid, so it's not a casual, run-it-on-every-deploy action. Run incrementally day to day, and schedule periodic full refreshes on a known cadence so silent drift gets caught before someone notices bad numbers downstream.

## Segment 6 (outro)

Next lesson: Jinja Basics Inside dbt — the templating syntax that is_incremental(), ref(), and every config block you've been using this whole chapter are actually built on.
