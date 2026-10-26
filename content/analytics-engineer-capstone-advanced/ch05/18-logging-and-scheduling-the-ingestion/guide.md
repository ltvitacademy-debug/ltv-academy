# Lesson 18 — Logging and Scheduling the Ingestion

**Chapter 5 · Python Ingestion Layer · Lesson 18 of 26**

## What you'll learn

- Why a script that runs once by hand isn't enough for a real source
- Real Python `logging` added to Lesson 17's script, instead of bare
  `print` statements
- A real scheduling mechanism — Windows Task Scheduler or cron — run
  on a recurring basis, with no human remembering to kick it off
- What "governed ingestion" actually looks like once logging and
  scheduling are both in place

## Why print() isn't enough

Lesson 17's script uses `print()` to report how many rows loaded —
fine for a first manual run, not good enough for something expected to
run unattended, repeatedly, for months. A `print` statement disappears
the moment the terminal closes; nothing records whether yesterday's
3 a.m. run succeeded, failed, or even ran at all.

## Adding real logging

```python
# ingestion/load_campaign_exports.py (excerpt)
import logging

logging.basicConfig(
    filename="ingestion.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)

def load_to_snowflake(df):
    logging.info(f"Starting load of {len(df)} rows")
    conn = snowflake.connector.connect(...)
    cur = conn.cursor()
    try:
        cur.execute("CREATE TABLE IF NOT EXISTS raw_campaign_sends (...)")
        rows = list(df.itertuples(index=False, name=None))
        cur.executemany("INSERT INTO raw_campaign_sends ... VALUES (%s, %s, %s, %s)", rows)
        conn.commit()
        logging.info(f"Loaded {len(rows)} rows into raw_campaign_sends")
    except Exception as e:
        logging.error(f"Load failed: {e}")
        raise
    finally:
        cur.close()
        conn.close()
```

`logging.basicConfig(...)` writes every run's outcome to
`ingestion.log` with a real timestamp and level — `INFO` for a normal
successful run, `ERROR` for a failure, caught and re-raised so the
script still exits with a nonzero status a scheduler can detect.
Six months from now, "did Tuesday's load actually run" is a question
`ingestion.log` can answer; a closed terminal window never could.

## Scheduling it: Windows Task Scheduler

On the machine this script runs on, Windows Task Scheduler runs it on
a recurring basis with no one remembering to:

1. Open Task Scheduler → **Create Basic Task**.
2. Trigger: **Daily**, at a fixed time (for example, 3:00 AM, after
   the marketing platform's own nightly export completes).
3. Action: **Start a program** → point it at `python.exe`, with
   `load_campaign_exports.py`'s full path as the argument.
4. Confirm the task's "Run whether user is logged on or not" option is
   set, so it still runs unattended overnight.

The equivalent on a Linux/macOS machine is a one-line crontab entry:

```
0 3 * * * /usr/bin/python3 /path/to/load_campaign_exports.py >> /path/to/cron.log 2>&1
```

Both mechanisms do the same real job: run this script on a fixed
schedule, with no human in the loop to forget.

## Why this closes the original governance gap

Lesson 1 named "a new raw source gets loaded by hand, when someone
remembers" as one of the five real gaps leadership complained about.
A scheduled script with real logging is the direct, concrete fix: the
load happens automatically, on a fixed cadence, and `ingestion.log`
gives anyone a real record of whether it worked — not a hope that
someone remembered.

## Key terms

| Term | Meaning |
|---|---|
| `logging.basicConfig(...)` | Configures where and how a script's log messages get written |
| `logging.INFO` / `logging.ERROR` | Severity levels distinguishing a normal run from a failure |
| Task Scheduler / cron | Real OS-level mechanisms for running a script on a recurring schedule |
| Unattended run | A scheduled execution with no human present to trigger or monitor it directly |

## Lab

1. Add the logging shown above to your Lesson 17 script.
2. Deliberately break the Snowflake connection (wrong password) and
   confirm `ingestion.log` records an `ERROR` line with the real
   exception message.
3. Write the Windows Task Scheduler steps (or the crontab line) that
   would run this script every night at 3 AM.

## Check yourself

You're ready for Chapter 6 when you can explain why `print()` alone
isn't enough for an unattended script, and you can describe a real
scheduling mechanism that runs this ingestion script without anyone
having to remember to.
