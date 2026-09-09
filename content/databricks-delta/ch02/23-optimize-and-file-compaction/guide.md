# Lesson 23 — OPTIMIZE and File Compaction

**Chapter 2 · Delta Lake · Lesson 23 of 57**

## What you'll learn

- The "small files problem" — what causes it, concretely
- `OPTIMIZE` — compacting many small files into fewer, larger ones
- `ZORDER BY` — co-locating related data within those compacted files
- Why this matters most after lots of small, frequent writes

## The small files problem

Recall Foundations Lesson 42: Parquet's columnar layout is efficient
partly because reading fewer files means less overhead. But every
individual write — especially Lesson 22's frequent `UPDATE`/`MERGE`
operations, or Chapter 3's streaming micro-batches — tends to create
its own small set of files. Over time, a heavily-updated table can
accumulate thousands of small files, and reading many small files is
genuinely slower than reading a few large ones, even holding total
data size constant.

## OPTIMIZE — compacting files together

```sql
OPTIMIZE trips;
```

`OPTIMIZE` rewrites a table's small files into fewer, larger ones —
same data, same schema, dramatically fewer files to open and read
later. This is itself just another Delta commit: new, compacted
files get `add`-ed, the old small ones get `remove`-d, exactly
Lesson 17's mechanism again, just used here for a performance
cleanup rather than a data change.

## ZORDER BY — organizing what's inside the files

```sql
OPTIMIZE trips ZORDER BY (VendorID);
```

Compaction alone just makes files bigger; `ZORDER BY` also
co-locates rows that share similar values for the named column(s)
within those bigger files. A later query filtering on `VendorID`
(Foundations Lesson 45's `.filter()`) can then skip whole files that
provably contain no matching `VendorID` at all — this is Foundations
Lesson 61's partition pruning idea, but working at the level of
individual files' contents instead of folder names.

## When this actually matters

`OPTIMIZE` isn't something you run after every single write — it's
a periodic maintenance operation, typically scheduled (Lesson 11's
jobs) to run on a cadence matching how frequently a table gets
updated. A table written once a month needs it rarely; a table
receiving thousands of small streaming writes a day (Chapter 3)
needs it regularly, or query performance degrades noticeably over
time.

## Key terms

| Term | Meaning |
|---|---|
| Small files problem | Many tiny files accumulate from frequent writes, slowing reads |
| `OPTIMIZE` | Compacts small files into fewer, larger ones — itself a Delta commit |
| `ZORDER BY` | Co-locates related rows within compacted files, enabling file-level skipping |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
does `OPTIMIZE` itself generate a new commit in the transaction log,
rather than modifying files silently?
