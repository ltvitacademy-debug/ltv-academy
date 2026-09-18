# Script — Databricks Jobs

## Segment 1 (title)

Lesson 11 already built a Job the simple way — one notebook, one schedule. Here's everything a real production Job supports beyond that single-task case.

## Segment 2 (screenshot: the Jobs UI, for real)

This is a real screenshot of the Databricks Jobs UI: one job, four tasks, one daily trigger. Every piece on this screen is a real, configurable part of the Job object.

## Segment 3 (code: trigger types)

Lesson 11 only needed a simple schedule. A Job's trigger can also be file arrival, continuous, or manual — file arrival especially, starting a run the moment new data actually lands instead of guessing at a schedule.

## Segment 4 (code: retry policy and timeout)

Two job-level settings Lesson 11 didn't need: a retry policy controlling how failures are retried, and a timeout capping how long a run is allowed to take — both set once, applying to every task inside the job.

## Segment 5 (outro)

A Job is genuinely more than one notebook on a timer. Next up: the Workflows UI, where these tasks actually get built.
