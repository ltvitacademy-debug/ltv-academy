# Script — Glue Job Bookmarks

## Segment 1 (title)

Run the same Glue job twice against a source that's had new data added, and by default you'd reprocess everything from scratch — including data you already handled. Job bookmarks are Glue's mechanism for avoiding that.

## Segment 2 (code: what a bookmark tracks)

When bookmarks are enabled, Glue persists state about what's already been processed — for S3, that's the set of files and timestamps already read; for JDBC sources, it's the last value seen in a tracking column. That state only updates when the job calls job.commit() at the end of a successful run. A failed run never advances the bookmark.

## Segment 3 (steps: the incremental-load pattern)

Here's why that matters. Without bookmarks, a nightly job against a growing source directory reprocesses the entire history every single night. With bookmarks, each run only touches files that arrived since it last advanced. Runtime and DPU cost scale with new data volume, not total historical volume.

## Segment 4 (code: what breaks tracking, and when to turn it off)

A few things silently break bookmark tracking — changing what path the job reads from, or editing already-processed files in place. You can also explicitly reset a bookmark to force a full reprocess, which is sometimes exactly what you want after fixing a transform bug. And for small reference tables meant to be fully replaced every run, it's simpler to just leave bookmarks off.

## Segment 5 (outro)

Bookmarks make incremental loads practical without custom tracking logic. Next up: triggers and workflows — how crawlers and jobs actually get chained together and scheduled.
