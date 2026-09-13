# Lesson 14 — COPY INTO: Bulk Loading Fundamentals

**Chapter 3 · Loading Data Into Snowflake · Lesson 14 of 60**

## What you'll learn

- The `COPY INTO` syntax that ties a stage, a file format, and a table together
- Why Snowflake never reloads the same file twice by default
- How warehouse size affects load time, and why bigger isn't always the fix
- Where to look afterward to confirm what actually loaded

## The command that does the real work

Everything in Lessons 12 and 13 — the stage, the file format — exists to
make this one command work:

```sql
COPY INTO company_metadata
FROM @my_s3_stage
FILE_FORMAT = (FORMAT_NAME = 'csv_ff')
PATTERN = '.*\.csv'
ON_ERROR = 'CONTINUE';
```

`COPY INTO` reads every matching file in the stage, parses it with the
named file format, and inserts the rows into the target table. This is
the direct equivalent of an SSIS Data Flow Task moving rows from a flat
file source to an OLE DB destination — except it's one statement instead
of a designer surface.

## Snowflake tracks what it already loaded

The detail that surprises people coming from SSMS: **run the same
`COPY INTO` statement twice, and the second run loads nothing new.**
Snowflake records, per stage, which files it has already successfully
loaded (by file name and a checksum) for 64 days, and skips them on
subsequent `COPY INTO` calls automatically — no manual "have I already
processed this file" bookkeeping required. To force a reload anyway (for
testing, or after fixing bad source data), add `FORCE = TRUE`.

## What actually happened, in Snowsight

After running a load, Query History shows you the statement's duration
and details:

![Snowsight's Query History / Query Profile pane after a COPY INTO statement, showing execution duration and step-by-step statistics for the load.](/courses/snowflake/ch03/14-copy-into-bulk-loading-fundamentals/copy-into-query-history.png)
*Query History (Activity > Query History) is where you'd check a COPY INTO's duration and profile after the fact — the same instinct as checking an SSIS package's execution log.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

The `COPY INTO` result set itself, in the moment it runs, lists one row
per file: file name, status, rows parsed, rows loaded, and any error
count — that's your first and fastest place to check whether a load
actually succeeded.

## Warehouse size changes load time, not load logic

`COPY INTO` on a larger warehouse finishes faster on the same files —
more compute in parallel across more files — but it doesn't change what
gets loaded or how. The quickstart this course draws its screenshots from
demonstrates exactly this: the same load, first on a small warehouse,
then again after `ALTER WAREHOUSE ... SET WAREHOUSE_SIZE = 'LARGE'`, to
show the duration drop. Chapter 10 (Performance Optimization) covers
right-sizing warehouses properly; for now, know that resizing is a lever
you have, not a fix for a load that's failing rather than merely slow.

## Key terms

| Term | Meaning |
|---|---|
| COPY INTO | The statement that loads staged files into a table |
| Load metadata | Snowflake's internal record of which files were already loaded, kept 64 days |
| FORCE | Option to reload a file even if Snowflake thinks it's already loaded |
| ON_ERROR | Controls what happens when a row fails to parse (Lesson 16) |

## Lab

1. Create a small table matching a CSV you have staged (or reuse
   `my_internal_stage` from Lesson 12 with a sample file).
2. Run `COPY INTO` against it using the file format from Lesson 13.
3. Run the exact same `COPY INTO` again — confirm in the result set that
   0 additional rows loaded.
4. Re-run with `FORCE = TRUE` and confirm it reloads.

## Check yourself

You're ready for Lesson 15 when you can explain why running the same
`COPY INTO` statement twice in a row doesn't double your row count.
