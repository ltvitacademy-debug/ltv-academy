# Script — Slim CI: Only Running What Changed

## Segment 1 (title)

A pull request that changes one staging model, in a two-hundred-model project, doesn't need to rebuild all two hundred. That's the problem Slim CI solves.

## Segment 2 (code: the selector)

dbt build, select state modified plus, defer, state path to prod manifest. Read left to right: build only the modified nodes and everything downstream of them, and for anything not selected, defer to where it already exists.

## Segment 3 (screenshot: deferred CI run)

Here's a real dbt Cloud CI run doing exactly that — executed in deferred mode, using the manifest from a prior production run, with the connection schema overridden to a PR-specific temp schema. Unselected models are read from that prior run instead of being rebuilt.

## Segment 4 (steps: why this is the default for CI)

state:modified+ picks what changed. Deferral makes every ref() still resolve for what didn't. Together, that's exactly what dbt Cloud's CI job does automatically — a one-model PR builds one model, not the whole project.

## Segment 5 (outro)

Next lesson: Deployment Environments — dev, staging, and prod, and how a project moves between them.
