# ETL Pipeline Design Checklist

From Chapter 6. Run through this before calling a pipeline done.

## Idempotency

- [ ] The load step uses an upsert (`INSERT OR REPLACE`, or your
      warehouse's `MERGE` equivalent) keyed on a real natural/primary
      key — not `if_exists="append"` with no safeguard.
- [ ] Running the full pipeline twice against the same input produces
      the same end state as running it once — actually test this,
      don't assume it.
- [ ] If the natural key is composite (e.g. `sku` + `warehouse_id` +
      `date`), the upsert key matches the real grain, not just the
      first column that looks unique.

## Incremental loads / watermarks

- [ ] A watermark only applies if the real requirement is "only
      process new data since last time." If the requirement is
      instead "safely reprocess the same batch if it's re-sent,"
      that's an idempotency problem, not a watermark problem — don't
      apply both by habit.
- [ ] **The watermark updates only AFTER the load succeeds, never
      before.** Updating it earlier means a failed load leaves the
      watermark claiming data is loaded that isn't — a silent,
      permanent gap with no error anywhere.
- [ ] A missing watermark file defaults to "load everything" (a very
      old date), not to a crash or a skipped run.

## Error recovery

- [ ] The pipeline can be safely rerun from the top after any failure
      — if idempotency is in place, this is almost always true for
      free.
- [ ] A failure's exception propagates (non-zero exit), so a
      scheduler can actually detect the run failed.
- [ ] If a bug caused data to be silently skipped (not just failed),
      there's a way to manually backfill a specific date range without
      reprocessing everything.

## Before calling it done

Walk through: what happens if this pipeline is run twice in a row
with no changes? What happens if it fails halfway through? What
happens if it's rerun after that failure? If any answer is "I'm not
sure" or "it would duplicate/skip data," it's not done yet.
