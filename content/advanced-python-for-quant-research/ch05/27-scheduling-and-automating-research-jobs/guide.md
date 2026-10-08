# Scheduling & Automating Research Jobs

A research job that only runs when someone remembers to run it isn't really production — the universe refresh, the overnight data pull, the daily signal recompute all need to happen on their own, reliably, without a person in the loop. This closing lesson of Chapter 5 covers the practical options for scheduling Python jobs — cron, Windows Task Scheduler, and in-process schedulers like APScheduler — and the two properties that separate a job that's safe to run unattended from one that silently does the wrong thing: idempotency and proper logging/failure handling.

## What you'll learn

- The three common ways to run a job on a schedule: cron, Windows Task Scheduler, in-process (APScheduler)
- Idempotency: why a job must be safe to re-run, including after a partial failure
- Failure handling and alerting for jobs nobody is watching in real time
- Logging for unattended jobs, tying back to the logging practices from Chapter 4
- A real, runnable example scheduling a job with APScheduler and watching it fire

## Three ways to schedule a job

- **cron** (Linux/macOS) runs a command at OS-level scheduled times defined in a crontab entry (`0 6 * * 1-5 /usr/bin/python3 /jobs/refresh_universe.py` — 6am, Monday through Friday). It's simple, battle-tested, and outside the Python process entirely — if the machine is up, cron runs the job.
- **Windows Task Scheduler** is the Windows equivalent: a GUI (or `schtasks` CLI) for defining triggers (daily, at logon, on an interval) and the program to run. Same idea as cron, different OS mechanism.
- **In-process schedulers**, like Python's **APScheduler**, run inside a long-lived Python process instead of being triggered by the OS. This trades OS independence for being able to schedule jobs dynamically from Python code, share state with the rest of the application, and not need any OS-level configuration at all — useful when the "job" is really part of a larger running service rather than a standalone script.

None of these is universally "correct" — a nightly batch script that only needs to run once a day is a natural fit for cron or Task Scheduler; a long-running research service that needs to add and remove scheduled jobs dynamically is a better fit for APScheduler.

## Idempotency: safe to re-run

A job is **idempotent** if running it twice (or re-running it after a failure) produces the same end state as running it once — no duplicated rows, no double-counted totals, no corrupted partial write. This matters enormously for unattended jobs, because the question isn't "will this job ever fail," it's "what happens when it does, and someone (or cron itself, on retry) runs it again." A job that appends a new row to a table every time it runs is not idempotent — run it twice by accident and the table has a duplicate. A job that writes/overwrites a dated snapshot (`prices_2024-01-15.parquet`, replacing any existing file with that name) or upserts by key is idempotent — running it again just re-produces the same correct state.

## Failure handling and logging

An unattended job has no one watching it fail in real time, so the job itself has to make failure visible: log a clear error message with enough context to diagnose it, and — for anything that matters — alert somewhere a human will actually see (an email, a Slack webhook, a monitoring dashboard), not just a log line nobody reads until next week. This connects directly back to the structured logging from Chapter 4: a job that logs `"universe refresh failed"` with no further detail is nearly useless at 2am when something breaks; a job that logs the exception, the inputs it was running with, and a timestamp gives you a real chance of diagnosing it without re-running anything.

## A real scheduled job with APScheduler

```python
import time
import logging
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("research_job")

run_count = {"n": 0}

def refresh_universe_job():
    """Idempotent: re-running it just re-writes the same output, no duplication."""
    run_count["n"] += 1
    log.info(f"refresh_universe_job firing (run #{run_count['n']}) at {datetime.now().isoformat()}")

scheduler = BackgroundScheduler()
scheduler.add_job(refresh_universe_job, "interval", seconds=1, id="refresh_universe", max_instances=1)
scheduler.start()
log.info("scheduler started")

time.sleep(3.5)  # let it fire a few times
scheduler.shutdown()
log.info(f"final run count: {run_count['n']}")
```

```text
2026-10-07 19:48:11,452 INFO Scheduler started
2026-10-07 19:48:11,454 INFO scheduler started
2026-10-07 19:48:12,452 INFO Running job "refresh_universe_job (trigger: interval[0:00:01], ...)"
2026-10-07 19:48:12,452 INFO refresh_universe_job firing (run #1) at 2026-10-07T19:48:12.452251
2026-10-07 19:48:13,450 INFO refresh_universe_job firing (run #2) at 2026-10-07T19:48:13.450563
2026-10-07 19:48:14,451 INFO refresh_universe_job firing (run #3) at 2026-10-07T19:48:14.451264
2026-10-07 19:48:14,957 INFO Scheduler has been shut down
2026-10-07 19:48:14,957 INFO final run count: 3
```

`BackgroundScheduler` runs the job on its own thread inside the same Python process, firing every second as scheduled, with every run timestamped in the log. `max_instances=1` prevents a slow run from overlapping with the next scheduled trigger — a real concern for a job that might occasionally take longer than its interval, where letting two overlapping runs execute concurrently against the same output file is exactly the kind of thing that breaks idempotency.

## Key terms

| Term | Meaning |
|---|---|
| cron / Task Scheduler | OS-level scheduling mechanisms that trigger a program at defined times |
| APScheduler | An in-process Python scheduler for triggering jobs dynamically within a running application |
| Idempotent | Safe to run more than once; re-running produces the same correct end state, not duplication |
| `max_instances` | APScheduler setting preventing a slow-running job from overlapping its own next scheduled run |

## Recap

Scheduling options range from OS-level (cron, Task Scheduler) to in-process (APScheduler), but whichever mechanism triggers a job, it must be idempotent — safe to re-run after a partial failure — and must log and surface failures clearly, since no one is watching an unattended job fail in real time. That closes Chapter 5 on research tooling. Chapter 6 turns to databases and data access: the next lesson covers SQL for time-series data, including window functions and point-in-time joins.
