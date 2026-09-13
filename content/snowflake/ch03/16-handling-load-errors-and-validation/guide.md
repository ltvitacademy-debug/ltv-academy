# Lesson 16 — Handling Load Errors & Validation

**Chapter 3 · Loading Data Into Snowflake · Lesson 16 of 60**

## What you'll learn

- The `ON_ERROR` options that decide what happens when a row fails to parse
- `VALIDATION_MODE`: checking a file before committing any rows
- Where to query load history after the fact, including failures
- A sane default policy for production loads

> No real Snowsight screenshot exists for this lesson's topics — checked
> quickstarts.snowflake.com (no dedicated error-handling guide found) and
> docs.snowflake.com's data-load-diagnostics page (renders no screenshots,
> same JS-rendering limitation noted since Lesson 1). Every example below
> is honest, correct SQL you can run yourself, not a claimed screenshot.

## ON_ERROR: what happens when a row is bad

Real files have bad rows — a stray comma, a malformed date, an extra
column. `ON_ERROR` decides what `COPY INTO` does when it hits one:

```sql
COPY INTO target_table
FROM @my_stage
FILE_FORMAT = (FORMAT_NAME = 'csv_ff')
ON_ERROR = 'CONTINUE';  -- skip the bad row, load everything else
```

| ON_ERROR value | Behavior |
|---|---|
| `ABORT_STATEMENT` (default) | Any error fails the whole file's load |
| `CONTINUE` | Skip the bad row, keep loading the rest of the file |
| `SKIP_FILE` | Skip the entire file if it has any error |
| `SKIP_FILE_<n>` | Skip the file only if error count exceeds `n` |
| `SKIP_FILE_<n>%` | Skip the file if more than `n`% of rows error |

`ABORT_STATEMENT` is the safe default for a reason: it's the difference
between "this load quietly dropped 40 rows and nobody noticed" and "this
load failed loudly and someone investigated." Reach for `CONTINUE` only
when you've deliberately decided a few bad rows shouldn't block the rest.

## VALIDATION_MODE: a dry run before you commit

Before trusting a new file source, check it without loading anything:

```sql
COPY INTO target_table
FROM @my_stage
FILE_FORMAT = (FORMAT_NAME = 'csv_ff')
VALIDATION_MODE = 'RETURN_ERRORS';
```

`VALIDATION_MODE = 'RETURN_ERRORS'` parses the file and returns every row
that *would* fail, without inserting a single row into the table — the
Snowflake equivalent of a dry-run flag. `RETURN_ALL_ERRORS` does the same
across every file matching the stage/pattern in one pass, useful for
vetting a whole batch of new files from an unfamiliar source before the
first real load.

## Checking what happened, after the fact

`COPY INTO`'s own result set (Lesson 14) is the first check, in the
moment. For history — including loads run by Snowpipe, or by someone
else entirely — query `INFORMATION_SCHEMA`'s load history:

```sql
SELECT file_name, status, row_count, error_count, first_error_message
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  TABLE_NAME => 'target_table',
  START_TIME => DATEADD(hours, -24, CURRENT_TIMESTAMP())
))
WHERE error_count > 0;
```

`COPY_HISTORY` is a table function, not a static view — it always needs a
table name and a time window, which is a deliberate design choice to keep
it fast on large accounts rather than scanning everything by default.

## A sane default policy

For production loads: keep `ON_ERROR = 'ABORT_STATEMENT'` (or a tight
`SKIP_FILE_<n>%` threshold) so failures are loud, run `VALIDATION_MODE`
against any new or unfamiliar file source before the first real load, and
check `COPY_HISTORY` on a schedule rather than only when someone
complains data is missing.

## Key terms

| Term | Meaning |
|---|---|
| ON_ERROR | Controls whether a bad row fails the whole load or gets skipped |
| VALIDATION_MODE | Dry-run option that reports errors without loading any rows |
| COPY_HISTORY | Table function reporting past load attempts, successes, and errors |
| first_error_message | The specific parse error for the first bad row in a failed file |

## Lab

1. Stage a CSV with one deliberately malformed row (e.g. an extra comma).
2. Run `COPY INTO` with `VALIDATION_MODE = 'RETURN_ERRORS'` and confirm it
   reports the bad row without loading anything.
3. Run the same load with `ON_ERROR = 'CONTINUE'` and confirm the good
   rows load while the bad one is skipped.
4. Query `COPY_HISTORY` for the table and confirm `error_count` matches.

## Check yourself

You're ready for Lesson 17 when you can explain the difference between
`VALIDATION_MODE` and `ON_ERROR = 'CONTINUE'` — one changes nothing in the
table, the other changes what ends up in it.
