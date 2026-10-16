# Lesson 42 — Scheduling & Automating Scripts

**Chapter 7 · Logging, Testing, Error Handling and Automation · Lesson 42 of 48**

## What you'll learn

- Why a finished ETL script still needs something to actually run it
- Scheduling a script on Linux/macOS with `cron`
- Scheduling a script on Windows with Task Scheduler
- Things that break an automated run that never show up when you run it by hand

## Cron: scheduling on Linux/macOS

```bash
crontab -e
```

```
# minute hour day month weekday  command
0 6 * * *  /usr/bin/python3 /home/data/etl_pipeline.py >> /home/data/etl_run.log 2>&1
```

Each `*` is a field cron doesn't restrict — this line means "at
minute 0 of hour 6, every day, every month, every weekday": 6:00 a.m.
daily. `>> ... 2>&1` appends both normal output and errors to the log
file, which matters because cron runs with no terminal attached —
without redirecting output somewhere, it's gone.

```
30 */4 * * *  /usr/bin/python3 /home/data/etl_pipeline.py
```

`*/4` means "every 4 hours" — this line runs at :30 past the hour,
every 4th hour (0:30, 4:30, 8:30, ...).

## Task Scheduler on Windows

The GUI equivalent is `Task Scheduler` → Create Task:

- **Trigger**: Daily, at a specific time (e.g., 6:00 AM)
- **Action**: Start a program — point it at `python.exe`, with the
  script's full path as an argument
- **Settings**: "Run whether user is logged on or not" so it still
  fires if nobody's signed in

The same thing is scriptable from PowerShell:

```powershell
$action = New-ScheduledTaskAction -Execute "python.exe" -Argument "C:\data\etl_pipeline.py"
$trigger = New-ScheduledTaskTrigger -Daily -At 6am
Register-ScheduledTask -TaskName "DailyETL" -Action $action -Trigger $trigger
```

## Why an automated run breaks things that worked by hand

```python
import os

# This works when you run it from your own terminal, in the project folder --
# it silently fails under cron/Task Scheduler, which starts in a different directory:
df = pd.read_csv("orders.csv")

# This is the fix -- always use an absolute path, or build one relative
# to the script's own location:
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
df = pd.read_csv(os.path.join(SCRIPT_DIR, "orders.csv"))
```

A scheduler doesn't start the script from the folder you'd `cd` into
by hand — it has its own working directory, often your home directory
or `C:\Windows\System32`. A relative path like `"orders.csv"` that
worked every time you ran it manually can simply not be found at
all when cron or Task Scheduler runs it. This is also exactly why
Lesson 39's logging-to-a-file matters: it's the only way to find out
what actually happened on a run nobody watched.

## Confirming the schedule actually ran

```bash
# Linux/macOS -- check cron's own log of what it attempted to run
grep CRON /var/log/syslog
```

```powershell
# Windows -- check Task Scheduler's history for the task
Get-ScheduledTaskInfo -TaskName "DailyETL"
```

The pipeline's own log file (from Lesson 39) tells you whether the
*script* succeeded. The scheduler's own log tells you whether it was
even *launched* in the first place — both matter, because a script
that never ran leaves an empty pipeline log, not an error in it.

## Key terms

| Term | Meaning |
|---|---|
| `cron` | Linux/macOS's built-in job scheduler, configured via `crontab` |
| Task Scheduler | Windows's equivalent for running a program on a schedule |
| Working directory | The folder a script runs from — not always the folder it lives in |
| `2>&1` | Redirects a command's error output to the same place as its normal output |

## Lab

Write a crontab line (you don't need to actually install it) that
runs `/home/data/load_orders.py` every weekday at 7:15 a.m., appending
both output and errors to `/home/data/load_orders.log`:

```
15 7 * * 1-5  /usr/bin/python3 /home/data/load_orders.py >> /home/data/load_orders.log 2>&1
```

`1-5` for the weekday field means Monday through Friday. Confirm you
can read back what each of the five fields means without checking a
reference.

## Check yourself

You're ready for Lesson 43 when you can explain, without looking: why
can a relative file path work fine when you run a script by hand, but
fail when the same script runs under cron or Task Scheduler?
