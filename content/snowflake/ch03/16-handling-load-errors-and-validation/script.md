# Script — Handling Load Errors & Validation

## Segment 1 (title)

Real files have bad rows. This lesson is about what Snowflake does when it hits one, and how to check before you ever commit a row.

## Segment 2 (code: ON_ERROR options)

ON_ERROR decides the behavior. ABORT_STATEMENT, the default, fails the whole file on any error — loud and safe. CONTINUE skips just the bad row. SKIP_FILE and its threshold variants skip an entire file once errors cross a count or percentage.

## Segment 3 (code: VALIDATION_MODE)

Before trusting a new file source, VALIDATION_MODE equals RETURN_ERRORS parses the file and reports every row that would fail, without loading a single row into the table — a real dry run, not a guess.

## Segment 4 (code: COPY_HISTORY)

For history after the fact — including loads Snowpipe ran on its own — query COPY_HISTORY, a table function that needs a table name and a time window by design, so it stays fast even on large accounts.

## Segment 5 (outro)

Next lesson: a hands-on lab tying stages, file formats, COPY INTO, and error handling together into one real dataset load, start to finish.
