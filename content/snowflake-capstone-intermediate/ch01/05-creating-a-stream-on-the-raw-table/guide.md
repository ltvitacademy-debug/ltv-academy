# Lesson 5 — Creating a Stream on the Raw Table

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 5 of 16**

## What you'll learn

- The real `CREATE STREAM ... ON TABLE ...` syntax
- What a Stream actually stores: an offset, not a copy of the data
- The metadata columns a Stream adds to every row it returns
- Previewing a Stream's contents safely, without consuming it

## Creating the Stream

```sql
CREATE STREAM driftwood_analytics.raw.tickets_stream
    ON TABLE driftwood_analytics.raw.tickets_api_raw;
```

That's the entire statement. A Stream is created once, pointed at a source table, and from that
moment forward it tracks every row inserted, updated, or deleted in `tickets_api_raw` — starting
from right now, not retroactively from the table's full history.

## What a Stream actually is

A Stream doesn't store a copy of the changed rows. It stores an **offset** — a marker for where it
last left off — and uses Snowflake's underlying change-tracking metadata to compute, on demand,
which rows have changed since that offset. Querying a Stream is just a `SELECT`; nothing about
reading it changes any data in the source table.

The offset only moves forward when a **DML statement that successfully commits** references the
Stream — a plain `SELECT` against it, run on its own, doesn't advance anything. That distinction
matters a great deal later: Lesson 14's root-cause investigation depends on understanding exactly
when a Stream's offset does and doesn't move.

## The metadata columns

Every row a Stream returns includes the source table's own columns, plus three extra ones:

| Column | Meaning |
|---|---|
| `METADATA$ACTION` | `INSERT` or `DELETE` — what kind of change this row represents |
| `METADATA$ISUPDATE` | `TRUE` if this row is one half of an update (an update shows as a paired DELETE + INSERT) |
| `METADATA$ROW_ID` | A stable identifier for the underlying row, used to pair an update's DELETE and INSERT together |

For `tickets_api_raw`, every real-world change is an `INSERT` — each ticket event lands as a new
row in the raw table, never an in-place update — so in this specific pipeline,
`METADATA$ACTION` will consistently read `INSERT` and `METADATA$ISUPDATE` will read `FALSE`. It's
still worth knowing what these columns mean in general, because Lesson 6's `MERGE` statement
references `METADATA$ACTION` directly, and because almost every other real Snowflake Streams
pipeline (including raw tables that genuinely do get updated or deleted in place) relies on this
same distinction.

## Previewing a Stream without consuming it

```sql
SELECT *
FROM driftwood_analytics.raw.tickets_stream;
```

A plain `SELECT` like this is completely safe to run as many times as you like — on its own, with
no other DML in the same transaction, it does not advance the Stream's offset. This is genuinely
useful for sanity-checking what a Stream currently holds before letting a Task consume it for
real.

## Checking whether a Stream has anything to offer

```sql
SELECT SYSTEM$STREAM_HAS_DATA('driftwood_analytics.raw.tickets_stream');
```

Returns `TRUE` or `FALSE`. This is the exact function Lesson 6's Task uses in its `WHEN` clause, so
the Task's warehouse only spins up and runs a `MERGE` when there's genuinely something new to
process — not on every scheduled tick regardless of whether anything changed.

## Key terms

| Term | Meaning |
|---|---|
| Offset | The marker a Stream uses to track what's already been read |
| `METADATA$ACTION` | A Stream column reporting whether a row represents an INSERT or a DELETE |
| `SYSTEM$STREAM_HAS_DATA` | A function returning TRUE/FALSE for whether a Stream currently has unconsumed changes |

## Lab

Create `tickets_stream` on your own `tickets_api_raw` table. Load a few more rows of sample JSON
(or re-run Lesson 3's load with a second small file), then query the Stream directly and confirm
you see exactly the new rows, each with `METADATA$ACTION = 'INSERT'`. Run the `SELECT` twice in a
row and confirm the second query still shows the same rows — proving a plain `SELECT` doesn't
consume anything.

## Check yourself

You're ready for Lesson 6 when you can answer, without looking: what specifically has to happen
for a Stream's offset to move forward, and why doesn't running a plain `SELECT * FROM
tickets_stream` do that on its own?
