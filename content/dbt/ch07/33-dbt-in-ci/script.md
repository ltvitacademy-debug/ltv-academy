# Script — Running dbt in Continuous Integration

## Segment 1 (title)

The Git and CI/CD course already showed you how to hand-roll this with a GitHub Actions workflow. dbt Cloud offers a second path: a CI job that runs automatically on every pull request, with no YAML to write.

## Segment 2 (screenshot: CI workflow diagram)

Either way, the goal is identical — run dbt build against the changed code before it merges. dbt Cloud does that by creating a temporary schema scoped to that specific pull request, built from the same raw sources dev and prod read from, then discarded once the run finishes.

## Segment 3 (steps: what happens on a PR)

A pull request opens. dbt Cloud spins up a temp schema for it. dbt build runs seeds, models, tests, and snapshots in dependency order into that schema. The result posts back to the PR as a pass or a fail — and the temp schema disappears either way.

## Segment 4 (steps: why dbt build specifically)

dbt build, not separate run and test commands, because it stops downstream work the moment an upstream test fails. In CI that matters even more — a red X should mean something is actually broken, not forty unrelated models that built on top of one failure you haven't seen yet.

## Segment 5 (outro)

Next lesson: dbt Cloud Jobs & Scheduling — the same job system that just ran your CI check, used to run production on a schedule too.
