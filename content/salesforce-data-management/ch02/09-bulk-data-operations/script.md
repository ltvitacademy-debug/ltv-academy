# Script — Bulk Data Operations

## Segment 1 (title)

The Import Wizard queues an asynchronous job and points you to a Bulk Data Load Job page. Data Loader uses, in its own words, the same Bulk API machinery under the hood. Let's connect those threads.

## Segment 2 (screenshot: Settings, Use Bulk API)

By default, Data Loader uses the standard SOAP-based API — synchronous, capped at 200 records per batch. Bulk API is a different, asynchronous API built for scale: parallel processing, fewer round-trips, batches up to 10,000 records. Check Use Bulk API in Settings to turn it on.

## Segment 3 (steps: SOAP vs Bulk API)

This applies to every operation — Insert, Update, Upsert, Delete, Hard Delete — until you turn it back off. Enable serial mode processes batches one at a time instead of in parallel, trading speed for avoiding database contention on heavily automated objects.

## Segment 4 (screenshot: Data Loader main window)

The six-button screen doesn't change. Bulk API changes how each operation runs underneath, not which operations are available.

## Segment 5 (code: #N/A to null a field)

A few behaviors do change, though. Insert null values and Allow field truncation disappear as options. And with Bulk API on, a blank cell during update is simply ignored, not cleared — to explicitly null a field, use the literal value hash-N-slash-A in that cell instead.

## Segment 6 (steps: when it's worth it)

There's no hard rule that forces Bulk API on, but reach for it once a job crosses a few thousand records, touches an object with heavy automation, or needs scale past what the SOAP API comfortably handles.

## Segment 7 (outro)

With the mechanics of loading and exporting covered, next we turn to Setup's own built-in tools for deleting and mass transferring records at scale.
