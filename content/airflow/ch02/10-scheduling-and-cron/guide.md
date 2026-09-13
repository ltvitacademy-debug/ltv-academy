# Lesson 10 — Scheduling & Cron Expressions

**Chapter 2 · Building DAGs · Lesson 10 of 30**

## What you'll learn

- The `schedule` parameter and the cron syntax it accepts
- The difference between a DAG's logical date and when it actually
  runs
- Common `schedule` presets (`@daily`, `@hourly`) and when a real cron
  string is clearer
- Why a DAG can be scheduled but not actually run — and what
  `catchup` controls

## The schedule parameter

Every DAG's `schedule` parameter controls when it runs, and it accepts
real cron syntax:

```python
from airflow.sdk import dag

@dag(schedule="0 6 * * *")
def daily_customer_export():
    ...
```

`0 6 * * *` reads left to right: minute, hour, day-of-month, month,
day-of-week. This one means "6:00 AM, every day" — the same cron
syntax used by Unix `crontab`, not an Airflow-specific dialect.

## Logical date vs. actual run time

This is the single most common source of scheduling confusion: a DAG
run's **logical date** (sometimes called the execution date) is the
*start* of the period the run covers, not the moment it actually
executes. A DAG scheduled `@daily` that's meant to process "yesterday's
data" runs *after* midnight, but its logical date is the day that just
ended — because the run represents that completed day's data, not the
moment the clock struck midnight.

```python
@dag(schedule="0 6 * * *")
def daily_customer_export():
    ...
# A run with logical date 2024-01-15 actually executes at
# 2024-01-16 06:00 — after the 15th has fully completed.
```

This is exactly why `{{ ds }}` (Lesson 9) is so useful in a
`bash_command` — it gives you the period the run represents, not
"right now," which is what a data pipeline actually needs.

## Presets vs. real cron strings

Airflow ships a few readable presets for common cases:

| Preset | Equivalent cron |
|---|---|
| `@daily` | `0 0 * * *` |
| `@hourly` | `0 * * * *` |
| `@weekly` | `0 0 * * 0` |

Presets read better for the common case. Reach for a real cron string
the moment you need something a preset doesn't cover — `"0 6 * * 1-5"`
(6 AM, weekdays only) has no preset equivalent, and that specificity
matters constantly in real data pipelines that shouldn't run on
weekends.

## Catchup: why a DAG might run more than you expect

When a new DAG is deployed with a `start_date` in the past,
`catchup=True` (the default) makes Airflow schedule every missed run
between that start date and now — not just going forward. For a DAG
meant to only ever process "the latest data," this is almost always
the wrong behavior:

```python
@dag(schedule="@daily", start_date=pendulum.datetime(2024, 1, 1), catchup=False)
def daily_customer_export():
    ...
```

`catchup=False` is the right default for most analytics pipelines —
you want it running going forward, not backfilling every day since
January.

## Key terms

| Term | Meaning |
|---|---|
| `schedule` | The DAG parameter accepting a cron string or preset, controlling when it runs |
| Logical date | The start of the period a DAG run represents — not the moment it actually executes |
| `catchup` | Whether Airflow schedules every missed run since `start_date`, or only future ones |
| Preset | A readable shorthand (`@daily`, `@hourly`) for a common cron pattern |

## Lab

1. Write a DAG scheduled with a real cron string for "6 AM on
   weekdays only."
2. Set `start_date` two weeks in the past and `catchup=True`, then
   deploy it (in a test environment) and watch how many runs Airflow
   schedules immediately.
3. Change `catchup` to `False` and confirm only future runs get
   scheduled.

## Check yourself

You're ready for Lesson 11 when you can explain, in one sentence, why
a DAG run's logical date isn't the same as the moment it actually
executed.
