# Script — Pipelines as Code

## Segment 1 (title)

Older CI systems configured pipelines by clicking through a web UI — invisible to git log, un-reviewable in a pull request. Pipeline as code means the pipeline's definition is a plain text file, committed to the same repository it builds.

## Segment 2 (screenshot: event, runner, job, step diagram)

GitHub Actions structures a pipeline into four concepts: an event that triggers it, a runner that executes the work, a job — a set of steps running together on one runner — and a step, a single command or action run in order.

## Segment 3 (code: a real workflow file)

A real workflow file, read top to bottom: on pull_request is the event, runs-on ubuntu-latest picks the runner, test is the job, and each item under steps runs in order — checking out the code, installing dbt, then running the build.

## Segment 4 (steps: why this beats a UI)

This beats a UI-configured pipeline three ways: it's reviewable as a diff in a pull request, reproducible identically on every branch, and recoverable — git log shows exactly when and why it changed, and git revert undoes a bad change like any other file.

## Segment 5 (outro)

Next lesson: GitHub Actions basics — writing your first real workflow file from scratch.
