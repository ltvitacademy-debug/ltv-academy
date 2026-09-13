# Lesson 6 — Your First dbt Run

**Chapter 1 · Analytics Engineering & dbt Fundamentals · Lesson 6 of 45**

## What you'll learn

- What `dbt run` actually does when you invoke it
- How to read real `dbt run` output line by line
- The difference between "found," "started," and "OK created" in that
  output
- What to check first when a run doesn't say "Completed successfully"

## Running it for the first time

With a project connected (Lesson 5), `dbt run` builds every model in
the project, in dependency order. Here's a real run against a
starter project's two example models:

![A terminal running dbt run: "Found 2 models, 4 tests..." followed by "1 of 2 START table model," "1 of 2 OK created table model," "2 of 2 START view model," "2 of 2 OK created view model," then "Completed successfully" and "Done. PASS=2 WARN=0 ERROR=0 SKIP=0 TOTAL=2."](/courses/dbt/ch01/06-your-first-dbt-run/successful-dbt-run.png)
*Every model gets a START line and an OK line — in the order the dependency graph decided, not the order they appear in the folder.*
Source: [dbt Docs — Quickstart for manual install](https://docs.getdbt.com/guides/manual-install)

## Reading the output line by line

- **`Found 2 models, 4 tests, ... 0 sources`** — dbt's first pass:
  parse every file, resolve every `ref()`, count what it found.
  Nothing has run yet.
- **`Concurrency: 1 threads (target='dev')`** — how many models dbt
  will build in parallel, and which target (dev vs. prod) it's
  building into.
- **`1 of 2 START table model ... [RUN]`** — dbt is about to build
  this specific model as a table.
- **`1 of 2 OK created table model ... [CREATE TABLE (2) in 3.79s]`**
  — it succeeded; `(2)` is the row count, `3.79s` is how long the
  actual `CREATE TABLE AS SELECT` took in Snowflake.
- **`Finished running ... in 5.38s`** then **`Completed
  successfully`** — the run-level summary.
- **`Done. PASS=2 WARN=0 ERROR=0 SKIP=0 TOTAL=2`** — the final
  tally. This line is what you check first, always.

## What "table model" vs. "view model" means here

Notice one model built as `[CREATE TABLE]` and the other as `[CREATE
VIEW]` — that's each model's **materialization** (Lesson 11 covers
all four types). dbt decided which based on config, either a default
in `dbt_project.yml` or a `{{ config(materialized=...) }}` call inside
the model itself.

## When it doesn't say "Completed successfully"

If a model fails, its line says `ERROR` instead of `OK`, dbt prints
the actual SQL error underneath, and — critically — **anything
downstream of that model gets `SKIP`ped**, not run against broken
data. That's the dependency graph from Lesson 1 protecting you: dbt
would rather skip a model than build it on top of something that
just failed.

## Key terms

| Term | Meaning |
|---|---|
| `dbt run` | The command that builds every selected model, in dependency order |
| `PASS` / `ERROR` / `SKIP` | Per-model outcomes in the run summary |
| Materialization | How a model gets built — table, view, and others (Lesson 11) |
| Target | Which environment (dev/prod) a run builds into |

## Lab

1. Run `dbt run` (dbt Core) or click "Run" in dbt Cloud, against the
   connection you set up last lesson.
2. Find, in your own output, the `Found N models` line and the final
   `Done. PASS=...` line.
3. Deliberately break one model (typo a column name) and run again —
   read the `ERROR` line dbt prints, then fix it and confirm you get
   back to `Completed successfully`.

## Check yourself

You're ready for Lesson 7 when you can run `dbt run` against your own
project and correctly explain every line it prints, including what
happens to downstream models if one upstream model fails.
