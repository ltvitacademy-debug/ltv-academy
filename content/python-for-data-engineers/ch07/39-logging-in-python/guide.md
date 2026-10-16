# Lesson 39 — Logging in Python (the logging Module)

**Chapter 7 · Logging, Testing, Error Handling and Automation · Lesson 39 of 48**

## What you'll learn

- Why `print()` stops being good enough once a script runs unattended
- The `logging` module — levels, handlers, and formatters
- Logging the real steps of an ETL script: start, row counts, errors, finish
- Writing logs to both the console and a file at the same time

## Why print() isn't enough for a real pipeline

The ETL script from Chapter 6 runs on a schedule, with nobody watching
the terminal. If it fails at 3 a.m., `print()` output is gone the
moment the process exits — there's nothing to look back at. `logging`
writes timestamped, leveled messages that can go to a file, so when
something breaks, there's a record of exactly what happened and when.

## Setting up a basic logger

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

logger = logging.getLogger(__name__)

logger.info("ETL run started")
logger.warning("Source file is 2 days old")
logger.error("Failed to connect to the database")
```

`basicConfig()` sets the format once, for the whole script.
`%(asctime)s` adds a timestamp, `%(levelname)s` adds the severity
(`INFO`, `WARNING`, `ERROR`, ...), and `%(message)s` is whatever you
pass to the logger call.

## The five logging levels

```python
logger.debug("Row 4521: raw value before cleaning = '  42.0 '")
logger.info("Extracted 10,482 rows from orders.csv")
logger.warning("312 rows had a missing customer_id")
logger.error("Could not write to target table: connection refused")
logger.critical("Pipeline aborted — no output was written")
```

Levels exist so you can filter noise without deleting anything.
`level=logging.INFO` in `basicConfig()` means `debug()` calls are
silently skipped, while `info()` and above still print — switch it to
`logging.DEBUG` temporarily when you're troubleshooting, then switch
it back.

## Logging a real pipeline's steps

```python
logger.info("Starting extract from orders.csv")
rows = extract_orders("orders.csv")
logger.info("Extracted %d rows", len(rows))

try:
    cleaned = transform(rows)
    logger.info("Transform complete: %d rows passed validation", len(cleaned))
except Exception:
    logger.exception("Transform step failed")
    raise
```

Passing `%d` and arguments separately (instead of an f-string) means
the string formatting only happens if the message is actually going
to be logged — a small efficiency `logging` builds in.
`logger.exception()` is `error()` plus the full traceback, which is
exactly what you want when something unexpected breaks mid-run.

## Writing to a file as well as the console

```python
file_handler = logging.FileHandler("etl_run.log")
console_handler = logging.StreamHandler()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[file_handler, console_handler],
)
```

A handler decides *where* a log message goes. Using both a
`FileHandler` and a `StreamHandler` means every message appears on
screen while you're watching, and is still saved to `etl_run.log` for
later — the file is what you'd check the morning after an unattended
run.

## Key terms

| Term | Meaning |
|---|---|
| `logging.basicConfig()` | Sets the format, level, and handlers for the whole script, once |
| Logging level | `DEBUG` < `INFO` < `WARNING` < `ERROR` < `CRITICAL` — filters what gets shown |
| `logger.exception()` | Logs an error message plus the full traceback |
| Handler | Decides where a log message is sent (console, file, etc.) |

## Lab

Add logging to a small pipeline step:

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.FileHandler("etl_run.log"), logging.StreamHandler()],
)
logger = logging.getLogger(__name__)

def load_row_count(path):
    logger.info("Checking row count for %s", path)
    with open(path) as f:
        count = sum(1 for _ in f) - 1  # minus the header row
    if count == 0:
        logger.warning("%s has no data rows", path)
    else:
        logger.info("%s has %d data rows", path, count)
    return count

load_row_count("orders.csv")
```

Run it, then open `etl_run.log` and confirm the same messages that
printed to the console were also saved to the file.

## Check yourself

You're ready for Lesson 40 when you can explain, without looking: why
is `logger.exception()` more useful than `logger.error()` when a
pipeline step raises an unexpected exception?
