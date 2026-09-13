# Script — dbt Cloud Jobs & Scheduling

## Segment 1 (title)

A dbt Cloud job is two things: an ordered list of commands to run, and something that decides when to run them. Last lesson's CI check was exactly this — a job whose trigger happens to be "on pull request" instead of "on a schedule."

## Segment 2 (screenshot: job history)

Here's a real job — Morning Job, running on a daily cron schedule, with an execute-steps list of run, seed, run, test. Every setting change gets logged, so who changed the production schedule and when is always answerable.

## Segment 3 (steps: three trigger types)

A job runs three ways. Scheduled, on a cron expression, for production builds on a fixed cadence. On pull request, the CI trigger from last lesson. Or API-triggered, for when an orchestrator like Airflow needs to run dbt as one step in a bigger pipeline.

## Segment 4 (steps: where this fits)

If you already schedule dbt build from a GitHub Actions cron trigger, that works too — dbt doesn't care who calls it. dbt Cloud's scheduler just needs no external runner or YAML. Which one a team uses depends on whether dbt is the only thing that needs scheduling, or one step an orchestrator already manages.

## Segment 5 (outro)

Next lesson: Slim CI — using this same job system to build and test only what actually changed, not the whole project.
