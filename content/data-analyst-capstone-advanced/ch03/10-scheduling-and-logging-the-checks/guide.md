# Lesson 10 — Scheduling and Logging the Checks

**Chapter 3 · Python Data-Quality Automation · Lesson 10 of 26**

## What you'll learn

- How to schedule Lesson 9's script to run automatically every night
  with Windows Task Scheduler
- How to write each run's result into a real `dw.DataQualityLog`
  table, instead of only printing to a console nobody is watching
- Why logging to a table beats a plain text file for this particular
  job
- What "done" actually means for this chapter: a validation layer that
  runs with zero humans involved on a normal night

## Why a log, not just a console print

Lesson 9's script prints `PASS`/`FAIL` lines when you run it by hand.
That's fine while you're developing it — it's useless at 2 AM when
nobody's looking at a terminal. The script needs to write its result
somewhere a human (or another system) can check *later*, on their own
schedule, not only at the exact moment the check ran.

## Logging to the warehouse itself

```sql
CREATE TABLE dw.DataQualityLog (
    LogID        INT IDENTITY(1,1) PRIMARY KEY,
    RunAt        DATETIME2    NOT NULL DEFAULT SYSUTCDATETIME(),
    CheckName    NVARCHAR(50) NOT NULL,
    Passed       BIT          NOT NULL,
    Detail       NVARCHAR(MAX) NULL
);
```

A table in the same `dw` schema beats a plain text log file for one
concrete reason: it's queryable with the exact same SQL skills every
other lesson in this capstone already uses. "Show me every failed
check in the last 30 days" is a `WHERE` clause against
`dw.DataQualityLog`, not a script that has to parse log files by hand.

```python
from sqlalchemy import text

def write_log(engine, results):
    with engine.begin() as conn:
        for r in results:
            conn.execute(
                text(
                    "INSERT INTO dw.DataQualityLog (CheckName, Passed, Detail) "
                    "VALUES (:name, :passed, :detail)"
                ),
                {"name": r["check"], "passed": r["passed"], "detail": str(r["detail"])},
            )
```

This extends Lesson 9's `run_all_checks()` with one more step: instead
of only printing each result, write it as a row in
`dw.DataQualityLog`, with a real timestamp, so the history of every
run accumulates on its own.

```sql
SELECT CheckName, Passed, Detail, RunAt
FROM dw.DataQualityLog
WHERE Passed = 0
ORDER BY RunAt DESC;
```

That's the query a human actually runs the morning after something
goes wrong — not re-running last night's script, just reading what it
already recorded.

## Scheduling the run with Windows Task Scheduler

The script itself doesn't change to be "schedulable" — Task Scheduler
just runs the exact same Python file on a timer, the same way you'd
run it by hand:

1. Open **Task Scheduler** → **Create Task**
2. **General** tab: name it `Thornbury DW Validation`, set it to run
   whether the user is logged on or not
3. **Triggers** tab: **New** → **Daily**, start time set a few minutes
   after the warehouse's own nightly refresh job finishes — the
   validation has to run *after* the load, never before or during it
4. **Actions** tab: **New** → **Start a program**, point it at your
   Python executable, with the script's path as an argument (e.g.
   `python.exe C:\Thornbury\dw_validation.py`)
5. **Conditions**/**Settings** tabs: leave default, but check "Run
   task as soon as possible after a scheduled start is missed" so a
   machine that was off at 2 AM still runs the check once it's back on

From this point forward, the check genuinely runs with zero humans
involved on a normal night — a human only gets pulled in when
`dw.DataQualityLog` actually shows a failed row.

## Why order matters: after the load, not before

Scheduling the validation to run *before* the nightly warehouse
refresh finishes would check yesterday's data and call it done, which
defeats the entire purpose. The validation step has to be the last
step in the nightly chain, strictly after the load, so a `FAIL` logged
tonight is actually about tonight's data.

## Key terms

| Term | Meaning |
|---|---|
| `dw.DataQualityLog` | A warehouse table recording the result of every automated validation run, queryable like any other table |
| Windows Task Scheduler | A built-in Windows tool for running a program automatically on a recurring schedule |
| Unattended run | A scheduled process that requires no human action to execute, only to review its results afterward |

## Lab

1. Create `dw.DataQualityLog` in your scratch database and extend
   Lesson 9's script with the `write_log` function above.
2. Run the extended script once by hand and confirm five new rows
   land in `dw.DataQualityLog`, one per check.
3. Set up a real Task Scheduler entry pointed at the script (even if
   you set the trigger a few minutes in the future just to prove it
   fires), and confirm a new batch of rows appears in the log table
   without you running anything by hand.

## Check yourself

You're ready for Chapter 4 when you can explain why this logs to a
SQL table instead of a text file, why the validation task has to be
scheduled strictly after the nightly warehouse refresh instead of
before it, and what a human actually has to do on a normal night when
every check passes.
