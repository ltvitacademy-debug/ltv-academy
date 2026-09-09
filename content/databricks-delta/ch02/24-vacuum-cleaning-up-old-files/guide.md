# Lesson 24 — VACUUM — Cleaning Up Old Files

**Chapter 2 · Delta Lake · Lesson 24 of 57**

## What you'll learn

- What's actually been piling up since Lesson 21: unreferenced files, still on disk
- `VACUUM` — permanently deleting them, past a retention window
- The default 7-day retention, and why shortening it is dangerous
- Why `VACUUM` and time travel are in direct, deliberate tension

## What's been quietly accumulating

Every `UPDATE`, `DELETE`, `MERGE` (Lesson 22), and `OPTIMIZE`
(Lesson 23) leaves old files behind on disk — Lesson 17's point
that a `remove` action doesn't delete a file immediately. These
files aren't part of the *current* table version, but they're not
gone either — which is exactly what makes Lesson 21's time travel
possible, and exactly what means storage costs quietly grow forever
if nothing ever cleans them up.

## VACUUM — actually deleting them

```sql
VACUUM trips;
-- or, to see what WOULD be deleted, without deleting anything:
VACUUM trips DRY RUN;
```

`VACUUM` permanently deletes files no longer referenced by the
current version, but **only** ones older than the retention
threshold — 7 days, by default. Files younger than that are left
alone, even if they're already unreferenced, specifically to
protect time travel and any long-running query that might still be
reading an older version.

## Why the 7-day default matters, and why shortening it is risky

```sql
VACUUM trips RETAIN 24 HOURS;  -- allowed, but genuinely risky
```

Lowering the retention window below 7 days is technically possible,
but dangerous: a long-running query or a concurrent job reading an
older version of the table can have files deleted out from under it
mid-read, causing a real failure. The 7-day default exists
specifically to make that scenario unlikely in practice.

## The direct tension with time travel

This is the tradeoff Lesson 21 already flagged: `VACUUM` is what
makes time travel *not* a permanent backup — every version older
than the current retention window becomes genuinely unqueryable
once its files are actually deleted. Real production tables balance
this deliberately: retention long enough to be a useful safety net,
short enough that storage costs don't grow unbounded from every
past version's files sitting around forever.

## Key terms

| Term | Meaning |
|---|---|
| `VACUUM` | Permanently deletes unreferenced files older than the retention window |
| Retention window | 7 days by default — how long unreferenced files are protected |
| `DRY RUN` | Shows what `VACUUM` would delete, without actually deleting anything |

## Chapter 2 recap

Delta wraps Parquet with a transaction log, giving real ACID
guarantees, schema enforcement, time travel, safe concurrent
`MERGE`, and the maintenance operations (`OPTIMIZE`/`VACUUM`) that
keep it all performant and bounded in size. Chapter 3 puts every one
of these tools to work in a real, structured pipeline design:
medallion architecture.

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why
does lowering `VACUUM`'s retention window below 7 days create a real
risk for a long-running query?
