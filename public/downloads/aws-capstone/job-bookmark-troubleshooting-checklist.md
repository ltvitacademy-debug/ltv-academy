# Job Bookmark Troubleshooting Checklist

> Companion to Lesson 5 (Transforming With Glue ETL) and Lesson 12
> (A Cost Optimization Pass), and the worked example "Diagnosing Why
> northfield-orders-etl Suddenly Reprocessed a Year of History." A
> job bookmark failing doesn't throw an error — the job just quietly
> reprocesses everything, and the first sign is usually a cost or
> runtime spike, not a failure notification.

## Step 1 — Confirm it's actually a bookmark problem

Before chasing bookmarks, rule out a real data volume change:

- [ ] Check CloudWatch metrics for the run's actual row count
      processed, and compare it against the source table's full
      historical volume. If they match, the job reprocessed
      everything — this is a bookmark problem, not a legitimately
      larger incremental batch.
- [ ] Check the job's duration and DPU-hours against its normal
      baseline for a nightly incremental run. A jump from ~90 seconds
      to several hours, with no error in the logs, is the
      characteristic signature of a silently reset bookmark.

## Step 2 — Confirm bookmarks are still enabled at all

- [ ] `aws glue get-job --job-name <job-name>` and check
      `JobBookmark.Enabled` is `true`. If it's `false`, someone
      disabled it deliberately or by accident — that's your answer,
      and the fix is re-enabling it (understanding that the next run
      will still need to process everything once, since no bookmark
      history exists for the "disabled" period).

## Step 3 — Check for the real, specific ways bookmark identity breaks

A Glue job bookmark's state is keyed to specific strings in the job,
not just to the job existing. Any of these silently invalidates
existing bookmark history:

- [ ] **A renamed `transformation_ctx`.** The string passed into
      `create_dynamic_frame.from_catalog(..., transformation_ctx=...)`
      is part of the bookmark's identity. Changing it — even as a
      purely cosmetic rename during a refactor — makes Glue treat the
      read as brand new, with no prior history, so it defaults to
      reprocessing everything.
- [ ] **A renamed job.** Bookmark state is also tied to the job's own
      name. Renaming the Glue job (not just a cosmetic label change,
      but the actual job name AWS tracks) loses bookmark history the
      same way a `transformation_ctx` rename does.
- [ ] **An accidental `--job-bookmark-option` override.** Confirm the
      job's run parameters aren't passing `--job-bookmark-option
      job-bookmark-disable` or `job-bookmark-pause` on a run where
      that wasn't intended — either overrides the job's own saved
      `JobBookmark.Enabled` setting for that specific run.
- [ ] **A reset bookmark via the console or CLI.** Confirm no one ran
      `aws glue reset-job-bookmark --job-name <job-name>` recently —
      this intentionally clears history and is sometimes run during
      debugging, then forgotten about.

## Step 4 — Confirm bookmark state directly instead of guessing

- [ ] `aws glue get-job-bookmark --job-name <job-name>` — inspect the
      actual recorded bookmark state rather than inferring it from
      symptoms. This tells you what Glue currently believes it has
      already processed.

## Step 5 — Choose the fix based on what the target table can absorb

- [ ] **If the target can safely absorb a full reprocess** (its write
      mode is idempotent — an upsert/merge keyed on a real identity
      column, not a plain append that would create duplicates):
      accept the one-time reprocess as a cost, and let bookmark
      history build fresh from here under the new name/context.
- [ ] **If the target cannot safely absorb a full reprocess** (a
      plain append-only write, where reprocessing would double-count
      rows): revert the renamed `transformation_ctx` or job name back
      to its original value so existing bookmark history is
      recognized again, and treat the naming cleanup as a deliberate,
      planned migration instead of a routine refactor next time.

## After the fix — confirm it actually worked

- [ ] Run the job against exactly one new partition and confirm via
      CloudWatch that it processes only that partition's row count,
      not the full historical volume.
- [ ] Confirm duration and DPU-hours return to the normal baseline.
- [ ] If this keeps happening, consider a CloudWatch alarm on job
      duration or DPU-hours (not just on job failure) — a silently
      reset bookmark produces a *successful* run at a much higher
      cost, which a failure-only alert will never catch.
