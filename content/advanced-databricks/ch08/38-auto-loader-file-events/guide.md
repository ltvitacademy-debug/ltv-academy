# Lesson 38 — Auto Loader With File Events

**Chapter 8 · Agentic Data Engineering & What's New · Lesson 38 of 42**

## What you'll learn

- Why File Events exists — the real trade-off between directory
  listing and classic notifications it finally resolves
- The architecture: what happens automatically versus what you had to
  manage yourself under classic notifications
- How to enable it, and the exact option that turns it on in a
  stream or a Declarative Pipeline
- How this directly extends what you already learned in Chapter 2,
  Lesson 9 (File Notification Mode)

## Why this lesson follows Lesson 9, not replaces it

Back in Chapter 2, Lesson 9, you learned classic file notification
mode: Auto Loader sets up a cloud-native subscription (SNS/SQS on AWS,
Event Grid on Azure, Pub/Sub on GCP) so new files are discovered via
events instead of repeated directory listing. That's still real and
still works. File Events is the evolution of that same idea, built to
remove the two real costs classic notifications always had.

## The trade-off File Events resolves

Historically, Auto Loader forced a choice between two real, working
modes:

- **Directory listing** — simple to set up, no extra permissions
  needed, but expensive and slow at high file volumes because it
  requires repeatedly scanning the cloud storage directory to find new
  files.
- **Classic notifications** — efficient, but requiring permissions to
  create notification infrastructure (SQS/Event Grid) beyond what
  Unity Catalog already grants, plus manual lifecycle management of
  those resources as streams are created or deleted.

There's also a hard cloud-provider ceiling on classic notifications:
each Auto Loader stream with its own notification setup needs its own
queue/subscription, and cloud providers cap the number of these per
storage container — **100 jobs on AWS/GCP, 500 on Azure**. Hit that
ceiling and you're stuck re-architecting.

File Events eliminates this choice entirely: it provides the
simplicity of directory listing with the performance of classic
notifications, by having a **Databricks-managed service** create and
own the notification infrastructure for you.

## What File Events actually automates

With `cloudFiles.useManagedFileEvents` enabled, this is the real
sequence of what happens:

1. **Set up** — enabling file events on an external location makes
   Databricks create the cloud subscriptions and queues itself.
   New external locations have this on **by default**.
2. **Publish files** — your producer writes files into cloud storage,
   same as always.
3. **Publish notifications** — the subscription service (SNS/Event
   Grid/Pub/Sub) that Databricks set up receives the event.
4. **Publish to queue** — that event lands in a queue.
5. **Get file events** — the Databricks file events service reads
   from that queue.
6. **Store file metadata** — the read messages get cached.
7. **List objects** — when a stream runs with managed file events, it
   incrementally reads from that cache. On first run, it does one
   directory listing to catch up, then runs incrementally forever
   after — `cloudFiles.backfillInterval` is simply ignored, since this
   periodic re-check is now handled automatically.

The critical architectural difference from classic notifications: one
**single queue per external location**, not one queue per stream.
Many Auto Loader streams can share that one queue, which is exactly
what sidesteps the 100/500-per-container cloud ceiling.

## Classic notifications vs. File Events, side by side

| Dimension | Classic notifications | File Events |
|---|---|---|
| Cloud infrastructure | One dedicated queue/subscription per stream | One queue/subscription per external location, shared |
| Cloud resource limits | Capped at 100 (AWS/GCP) or 500 (Azure) streams per container | Avoided — many streams share one queue |
| Permissions | Elevated permissions needed per stream to manage its own queue | Permissions granted once via Unity Catalog's storage credential; no extra per-stream permissions |
| Lifecycle management | You manually manage queue/subscription lifecycle as streams come and go | Databricks automatically manages it |

## Enabling it

All new external locations have File Events enabled by default. For
an existing one, edit it and choose Advanced Options, then select the
File Event Type: **Automatic** (Databricks sets up the queue/
subscription for you — recommended) or **Provided** (you supply your
own queue). Test the connection on the external location page to
confirm it's active.

In a plain Auto Loader stream:

```python
stream_df = (spark.readStream.format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.maxFilesPerTrigger", 5000)
    .option("cloudFiles.schemaLocation", f"{checkpoint_path}/schema")
    .option("cloudFiles.useManagedFileEvents", True)
    .load(f"{volume_path}")
    .writeStream
    .queryName("file-events-stream")
    .option("checkpointLocation", f"{checkpoint_path}")
    .trigger(processingTime="30 seconds")
    .table(f"{target_table}")
)
```

If you're already using a Lakeflow Declarative Pipeline with a
`STREAMING TABLE` (Chapter 3), add the same option to the
`cloud_files()` call:

```sql
CREATE OR REFRESH STREAMING TABLE <table-name>
AS SELECT <select clause expressions>
FROM cloud_files(
  "abfss://path/to/external/location/or/volume",
  "<format>",
  map(..., "cloudFiles.useManagedFileEvents", "True", ...)
);
```

## File arrival triggers benefit too

File Events also makes **file arrival triggers** on Databricks Jobs
dramatically more scalable. Without File Events, a file arrival
trigger relies on directory listing and tops out at 10,000 files in
the watched directory, with a maximum of 50 such triggers per
workspace. With File Events enabled, both limits become unlimited.

## When to migrate

Per Databricks' own recommendation: migrate to File Events if you're
currently on directory listing mode (straightforward latency and cost
win), or if you're on classic notifications and ingesting under 2,000
files per second. File Events is generally available on AWS, Azure,
and GCP.

## Key terms

| Term | Meaning |
|---|---|
| File Events | Databricks-managed cloud notification service giving directory-listing simplicity with classic-notification performance |
| cloudFiles.useManagedFileEvents | The Auto Loader / Declarative Pipeline option that turns File Events on |
| Single queue per external location | The architectural change that avoids the per-stream cloud notification ceiling (100 AWS/GCP, 500 Azure) |
| File arrival trigger | A Job trigger that starts on new files; unlimited directory size with File Events, 10,000-file cap without it |

## Check yourself

Without looking back: what specific cloud-provider ceiling did classic
notifications run into at scale, and what architectural change does
File Events make to avoid hitting it?
