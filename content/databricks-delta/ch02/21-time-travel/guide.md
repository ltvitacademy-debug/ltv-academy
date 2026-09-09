# Lesson 21 — Time Travel — Querying Historical Versions

**Chapter 2 · Delta Lake · Lesson 21 of 57**

## What you'll learn

- Querying a table exactly as it looked at a past version, or a past timestamp
- Why this is possible at all — tracing straight back to Lesson 17's `remove` action
- Restoring a table to an earlier version, on purpose
- Why time travel isn't a permanent backup, and what actually limits it

## Querying an older version

```python
# By version number
df_v3 = spark.read.format("delta").option("versionAsOf", 3).load("/data/nyc_taxi/delta/trips")

# By timestamp
df_yesterday = spark.read.format("delta").option("timestampAsOf", "2026-09-08").load("/data/nyc_taxi/delta/trips")
```

```sql
SELECT * FROM trips VERSION AS OF 3;
SELECT * FROM trips TIMESTAMP AS OF '2026-09-08';
```

Both return an ordinary DataFrame — every method from Foundations'
Chapter 4 works on it exactly as before. The only difference from a
normal read is which version of the table's history you're looking
at.

## Why this is possible — Lesson 17, paying off

Recall Lesson 17: a `remove` action marks a file as no longer part
of the *current* version, but usually doesn't delete it from disk
immediately. Time travel is the direct consequence of that fact —
Delta can reconstruct any past version because the files that
version depended on are, for a while, often still sitting right
there on disk, and the log records exactly which ones they were.

## Restoring a table, deliberately

```sql
RESTORE TABLE trips TO VERSION AS OF 3;
```

Querying an old version doesn't change the table. `RESTORE` does —
it's a real, deliberate action that makes an old version become the
current one again, useful for undoing a bad write (a botched
`MERGE`, an accidental `DELETE`) cleanly, without hand-reconstructing
anything.

## Why it's not a permanent backup

Time travel depends on old files still existing on disk. Lesson 24's
`VACUUM` explicitly deletes files no longer referenced by the
current version, past a retention window (30 days, by default) —
after that, the corresponding old versions genuinely become
unqueryable. Time travel is a real, useful safety net for recent
history, not a substitute for a genuine backup strategy on data you
truly can't lose.

## Key terms

| Term | Meaning |
|---|---|
| `versionAsOf` / `timestampAsOf` | Read options that query a specific past version of a table |
| `RESTORE TABLE` | Makes an old version become the current one again, permanently |
| Retention window | How long old files stick around before `VACUUM` can remove them (Lesson 24) |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
does time travel stop working for a version older than the
retention window?
