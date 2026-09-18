# Lesson 9 — File Notification Mode

**Chapter 2 · Auto Loader & Ingestion at Scale · Lesson 9 of 34**

## What you'll learn

- Directory listing mode — what Lessons 32 and 7 actually ran, without naming it
- Why directory listing gets expensive as a folder gets deep and busy
- File notification mode — cloud-native event queues instead of listing
- When notification mode's setup cost is actually worth paying

## The mode you were already using

Every Auto Loader example so far — Lesson 32's, and this chapter's
own Lesson 7 — ran in **directory listing mode** without ever naming
it: Auto Loader periodically lists the target directory's contents
and diffs that list against its own state store to find what's new.
It never needed naming before because, at modest scale, it just
works.

## Why listing gets expensive

```
/data/nyc_taxi/incoming/
  year=2024/month=01/day=01/ ... day=31/  (31 folders)
  year=2024/month=02/ ... month=12/       (12 months)
  -- millions of small files, nested deep, arriving continuously
```

Listing cost scales with how many objects and prefixes exist under
the path, not just how many are new. A deep, continuously growing
partition tree means every trigger interval pays a real cloud-storage
API cost to re-list a tree that's mostly unchanged since the last
check — a genuine, billable cost per API call, and it gets slower as
the tree grows, even though the *new* data each run is small.

## File notification mode — events, not listing

```python
.option("cloudFiles.useNotifications", "true")
```

Instead of listing, Auto Loader sets up a cloud-native event
pipeline — on Azure, an Event Grid subscription feeding a Queue
Storage queue — so the storage account itself pushes a notification
the moment a new file lands. Auto Loader then reads *that queue*,
not the directory tree, to know what's new. This needs one-time
setup permission to create the Event Grid subscription and queue,
which listing mode never required.

## When the setup cost is actually worth it

```
Directory listing:   fine for moderate file counts, shallow trees,
                      or infrequent triggers
File notification:   worth the setup for very large/deep trees,
                      high-frequency file arrival, or low-latency
                      requirements where re-listing delay matters
```

Notification mode isn't strictly "better" — it trades one-time
infrastructure setup (and a real, if usually small, event-queue cost)
for eliminating the re-listing cost entirely. For a modest directory
like Lesson 7's example, listing mode's simplicity wins. For a
directory ingesting at high volume across a deep partition tree, the
setup is worth it specifically because listing cost would otherwise
keep growing indefinitely.

## Key terms

| Term | Meaning |
|---|---|
| Directory listing mode | The default — periodically lists and diffs the target directory |
| File notification mode | Cloud storage events (Event Grid + Queue) push new-file notices instead |
| `cloudFiles.useNotifications` | The option that switches Auto Loader from listing to notification mode |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
does directory listing cost keep growing over time even when the
*amount of new data* each run stays small?
