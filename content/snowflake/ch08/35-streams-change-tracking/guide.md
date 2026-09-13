# Lesson 35 — Streams: Change Tracking in Snowflake

**Chapter 8 · Streams & Tasks · Lesson 35 of 60**

> A note on this lesson's visuals: a Stream is a SQL/DDL object with no
> dedicated Snowsight visual beyond appearing as a generic entry in the
> database object tree — a real Streams-focused Snowsight quickstart
> was searched for and not found (see `sources.json`). This lesson
> uses real, runnable SQL instead of a screenshot.

## What you'll learn

- The problem Streams solve: knowing which rows changed in a table,
  without tracking a watermark column yourself
- How to create a `STREAM` on a table and query it like a table
- The metadata columns every stream adds — `METADATA$ACTION`,
  `METADATA$ISUPDATE`, `METADATA$ROW_ID`
- Why a stream is "consumed" once you act on it — and what that means
  for how you use it in a pipeline

## The problem: finding out what changed

You already built incremental loading patterns back in Lesson 23,
tracking a high-watermark column (like `updated_at`) yourself to find
new or changed rows. That works, but it's homemade — you own the
bookkeeping, and it breaks the moment a row gets updated without
touching that column, or deleted entirely (a watermark can't see a
`DELETE`).

Snowflake's answer is a native object: a **Stream**.

```sql
CREATE OR REPLACE STREAM orders_stream ON TABLE orders;
```

That single statement creates an object that tracks every insert,
update, and delete against `orders` from this point forward. You don't
maintain anything — Snowflake does the bookkeeping internally.

## Querying a stream

A stream reads like a table. Query it, and you get back only the rows
that changed since the last time this stream was consumed:

```sql
SELECT * FROM orders_stream;
```

Every row a stream returns carries three extra metadata columns
alongside the table's own:

| Column | Meaning |
|---|---|
| `METADATA$ACTION` | `INSERT` or `DELETE` — what happened to this row |
| `METADATA$ISUPDATE` | `TRUE` if this row is part of an update (Snowflake represents an UPDATE as a paired DELETE + INSERT) |
| `METADATA$ROW_ID` | A unique identifier for the row version, used internally to track change history |

That `METADATA$ISUPDATE` detail matters: Snowflake doesn't have a
separate "UPDATE" action — an update to a row shows up as a `DELETE`
of the old version and an `INSERT` of the new one, both flagged
`METADATA$ISUPDATE = TRUE`, so you can tell them apart from a genuine
delete or a genuine new row.

## Streams are consumed, not just read

Here's the part that trips people up coming from a "just SELECT it"
mental model: a stream's changes are marked consumed the moment a
**DML statement** reads from it inside a transaction that commits —
not by a plain `SELECT`. In practice, this means:

- A `SELECT * FROM orders_stream;` on its own, just to look, does
  **not** consume the stream — you can peek safely.
- An `INSERT INTO ... SELECT * FROM orders_stream` or a `MERGE` that
  reads from the stream, once that statement's transaction commits,
  *does* advance the stream's offset — those changes won't show up
  again next time.

That's exactly the behavior a pipeline wants: process the changes
once, and the stream automatically stops returning rows you've already
handled. Lesson 37 builds a full incremental pipeline around exactly
this behavior, paired with Tasks to run it on a schedule.

## Key terms

| Term | Meaning |
|---|---|
| Stream | A Snowflake object that tracks INSERT/UPDATE/DELETE changes on a table or view since it was last consumed |
| `METADATA$ACTION` | Whether a captured change was an INSERT or a DELETE |
| `METADATA$ISUPDATE` | Flags that a DELETE+INSERT pair together represent an UPDATE |
| Consuming a stream | Reading from a stream inside a DML statement that commits, which advances what the stream considers "already seen" |

## Lab

1. Create a small table and a stream on it:
   `CREATE OR REPLACE STREAM my_stream ON TABLE my_table;`
2. Insert a few rows into the base table, then `SELECT * FROM
   my_stream;` — confirm you see the new rows with `METADATA$ACTION =
   'INSERT'`.
3. Update one of those rows, then query the stream again — find the
   DELETE/INSERT pair with `METADATA$ISUPDATE = TRUE`.
4. Run `INSERT INTO another_table SELECT * FROM my_stream;`, then
   query the stream a third time — confirm it's now empty (the changes
   were consumed).

## Check yourself

You're ready for Lesson 36 when you can explain, in one sentence, why
a stream needs `METADATA$ISUPDATE` at all — and you've watched a
stream go from populated to empty after consuming it in a real DML
statement.
