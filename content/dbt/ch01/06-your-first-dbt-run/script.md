# Script — Your First dbt Run

## Segment 1 (title)

With a project connected, dbt run builds every model in the project, in dependency order. This is what that looks like the first time, against a real starter project.

## Segment 2 (screenshot: real dbt run output)

Found 2 models, 4 tests means dbt's first pass parsed every file and resolved every ref call — nothing has run yet. Then each model gets a START line and an OK created line, in the order the dependency graph decided.

## Segment 3 (steps: reading the summary)

One model built as CREATE TABLE, the other as CREATE VIEW — that's each model's materialization, decided by config. The very last line, Done, PASS equals 2, WARN 0, ERROR 0, SKIP 0, is the one line you check first, always.

## Segment 4 (steps: when it fails)

If a model fails instead, its line says ERROR, dbt prints the real SQL error, and everything downstream of it gets SKIPPED — the dependency graph protecting you from building on top of broken data.

## Segment 5 (outro)

Next lesson: Defining Sources — the sources.yml syntax that tells dbt where your raw, un-modeled data actually lives.
