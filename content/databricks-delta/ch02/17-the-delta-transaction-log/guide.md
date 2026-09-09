# Lesson 17 — The Delta Transaction Log

**Chapter 2 · Delta Lake · Lesson 17 of 57**

## What you'll learn

- Opening `_delta_log/` and reading one JSON commit file directly
- `add` and `remove` actions — how a commit describes a change
- A checkpoint — why the log doesn't grow forever unmanaged
- How Spark reconstructs "the current table" from this log alone

## Reading a commit file directly

```
%fs ls dbfs:/data/nyc_taxi/delta/trips/_delta_log/
# 00000000000000000000.json
# 00000000000000000001.json
```

Each numbered `.json` file is one **commit** — one atomic change to
the table. Opening `00000000000000000000.json` (the table's very
first commit) shows a sequence of JSON records, each describing one
action taken during that write.

## add and remove — the two actions that matter most

```json
{"add": {"path": "part-00000-....parquet", "size": 1234567, "modificationTime": 1735000000000}}
{"add": {"path": "part-00001-....parquet", "size": 987654, "modificationTime": 1735000000000}}
```

An `add` action means exactly one thing: "this Parquet file is now
part of the table." A `remove` action (which shows up starting with
Lesson 22's `UPDATE`/`DELETE`/`MERGE`) means the opposite: "this
file is no longer part of the table's current version" — critically,
the file itself usually isn't deleted from disk yet, just marked as
no longer current. This distinction is exactly what makes time
travel (Lesson 21) possible: old files often still exist, the log
just stops pointing at them for the newest version.

## Checkpoints — so the log doesn't grow forever

After enough commits accumulate, Delta periodically writes a
**checkpoint** — a Parquet file summarizing the entire table state
up to that point, so a reader doesn't have to replay every single
JSON commit from the very beginning just to know the table's current
contents. This is purely an internal optimization; nothing about how
you read or write a Delta table changes because of it.

## How "the current table" gets reconstructed

Reading a Delta table means: start from the latest checkpoint (if
one exists), replay every commit after it, and the result is exactly
the current set of active Parquet files — the ones with an `add`
that was never followed by a `remove`. This is the entire mechanism
behind everything Lesson 13 promised: there's no ambiguity about
"the real current version," because the log defines it precisely,
every time.

## Key terms

| Term | Meaning |
|---|---|
| Commit | One numbered JSON file in `_delta_log/`, describing one atomic change |
| `add` / `remove` | Actions marking a file as currently part of, or no longer part of, the table |
| Checkpoint | A periodic summary Parquet file, so readers don't replay the whole log |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: when
a `remove` action appears in the log, does the underlying Parquet
file usually get deleted from disk immediately?
