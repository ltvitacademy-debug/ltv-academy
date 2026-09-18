# Lesson 17 — Databricks Jobs

**Chapter 4 · Jobs, Workflows & Orchestration · Lesson 17 of 34**

## What you'll learn

- Databricks & Delta Lake Lesson 11 already covered a Job's basics — a notebook, a schedule, a run history — this is not a re-teach
- What a Job actually is at the level this chapter needs: one or more tasks, a trigger, and a compute configuration, as one deployable unit
- Trigger types beyond a simple daily schedule: cron, file arrival, continuous
- Retry policy and timeout — job-level settings Lesson 11 didn't cover

## What Lesson 11 already covered

Lesson 11 built a Job the simple way: one notebook, one schedule, checked in
Run history afterward. That's a real, working Job — this lesson doesn't
re-teach it. What it adds is everything a Job supports beyond that
single-task case, because a real production Job is rarely just one notebook
on a timer.

## A real Job, as Databricks' own UI shows it

![A Databricks Jobs overview page showing a job with four tasks and a daily trigger.](/courses/advanced-databricks/ch04/17-databricks-jobs/example-job-overview.png)

This is a real screenshot of the Databricks Jobs UI: one job, four tasks,
one daily trigger. Every piece on this screen is a real, configurable part
of the Job object — not just a notebook path and a cron string.

## Trigger types beyond "every day at 2 AM"

Lesson 11 only needed a simple schedule. A Job's trigger can also be:

```
Scheduled    -- cron expression, same idea as Lesson 11, more precise control
File arrival -- runs when new files land in a specified storage location
Continuous   -- keeps the job running, restarting automatically if it stops
Manual       -- triggered on demand, no schedule at all
```

File arrival is the trigger type most directly useful to this course's own
Chapter 2 ingestion work: a Job can start the moment Auto Loader's source
location actually receives a new file, instead of guessing at a schedule
that might run too early or too late.

## Retry policy and timeout

Two job-level settings Lesson 11 didn't need: a **retry policy** (how many
times a failed task retries, and how long to wait between attempts) and a
**timeout** (how long a run is allowed to take before it's killed). Both are
set once, at the job level, and apply to every task inside it — real
protection against a transient failure or a runaway run, without any custom
retry code in the notebook itself.

## Key terms

| Term | Meaning |
|---|---|
| Job | One or more tasks, a trigger, and a compute configuration, as one deployable unit |
| File arrival trigger | Starts a job run when new files land in a specified storage location |
| Retry policy / timeout | Job-level settings controlling automatic retries and maximum run duration |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: what real
advantage does a file-arrival trigger have over a fixed schedule, for a
source like this course's own Auto Loader ingestion?
