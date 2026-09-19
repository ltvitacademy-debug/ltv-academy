# Glue Job Bookmarks

Run the same Glue job twice against a source that's had new data added since the last run,
and by default you'd reprocess everything from scratch — including data you already
handled. **Job bookmarks** are Glue's mechanism for avoiding exactly that: tracking what's
already been processed so a rerun only touches what's new.

## What you'll learn

- What state a job bookmark actually tracks
- How bookmarks enable incremental loads without custom tracking logic
- What can silently break bookmark tracking
- When to disable bookmarks on purpose

## What a bookmark tracks

When bookmarks are enabled on a job, Glue persists state about what that job has already
processed — for S3 sources, this is typically the set of files (and their timestamps)
already read; for JDBC sources, it's typically the last value seen in a specified column
used to detect new rows. That state is stored per job, tied to the job's name, and updated
only when the job calls `job.commit()` (from Lesson 14's boilerplate) at the end of a
successful run. A failed run doesn't advance the bookmark — so a retry after a failure
safely reprocesses the same data rather than skipping it.

## The incremental-load use case

Bookmarks are what make a simple pattern practical: schedule a job to run nightly against
a source directory that new files land in throughout the day, and each run only processes
the files that arrived since the bookmark last advanced. Without bookmarks, that same job
would reprocess the entire history of files every night — correct, but wasteful, and
increasingly slow as the dataset grows. With bookmarks, the job's runtime (and DPU cost)
scales with new data volume, not total historical volume.

This is enabled per job (a setting when you create or edit it) rather than being automatic
— a job with bookmarks off always does a full reprocess of its source on every run, which
is sometimes exactly what you want for a small reference table that gets fully replaced.

## What silently breaks bookmark tracking

A few things can cause a bookmark to behave unexpectedly. Changing the job's script logic
around what it reads (e.g., pointing it at a different S3 path) can make Glue treat it as
effectively a different source. Manually editing already-processed files in place can
confuse timestamp-based tracking. And resetting a bookmark — an explicit action available
in the console/CLI — forces the next run to reprocess everything, which is sometimes
exactly what you want after fixing a bug in the transform logic and needing to reprocess
historical data correctly.

## When to turn bookmarks off on purpose

Bookmarks are the wrong tool when a job is meant to fully replace its output every run —
small dimension/reference tables, or any job where "reprocess everything, every time" is
the intended behavior rather than an inefficiency to fix. Leaving bookmarks off there is
simpler than managing incremental logic for a dataset small enough that a full reprocess
is cheap anyway.

## Key terms

| Term | Meaning |
|---|---|
| Job bookmark | Persisted state tracking what a job has already processed |
| Incremental load | Processing only new/changed data since the last successful run |
| job.commit() | The call that advances bookmark state after a successful run |
| Bookmark reset | An explicit action that forces the next run to reprocess everything |

## Check yourself

A nightly Glue job with bookmarks enabled fails halfway through due to a transient network
error. When it's retried, does it skip the files it already started reading before the
failure? Why or why not?
