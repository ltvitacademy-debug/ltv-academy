# Lesson 55 — Monitoring Pipeline Runs

**Chapter 5 · Lakeflow · Lesson 55 of 57**

## What you'll learn

- The pipeline graph view — Lesson 50's dependency graph, made visible
- Per-table metrics: row counts, and Lesson 52's expectation pass/fail, together
- Event log — a queryable table of the pipeline's own run history
- Where to actually look, first, when something in the pipeline breaks

## The pipeline graph, visualized

Every declarative pipeline (Lesson 50) has a graph view in the
workspace UI: each `@dlt.table`/`@dlt.view` as a node, arrows for
the same dependencies inferred from `dlt.read()`/`dlt.read_stream()`
calls. This is the exact bronze→silver→gold structure Lesson 44's
lineage diagram showed for tables generally, but scoped specifically
to one pipeline's own execution, updated live as a run progresses.

## Per-table metrics, in one place

For each table in the graph, the UI shows: rows processed this run,
and — for any table using Lesson 52's `@dlt.expect*` — the pass/fail
count per named expectation, directly alongside it. This is Lesson
36's separate `gold.data_quality_metrics` table and Lesson 11's
separate job run history, now shown together, per table, without
needing to query either one by hand.

## The event log — a real, queryable table

```sql
SELECT * FROM event_log(TABLE(nyc_taxi_pipeline))
WHERE level = 'ERROR'
ORDER BY timestamp DESC;
```

The **event log** is itself a real, queryable Delta table (exactly
Chapter 2's material — nothing exotic about querying it) recording
every event across every run: which tables updated, which
expectations failed, which run raised an error, and when. This
turns "did something break, and where" from a UI-clicking exercise
into a real SQL query, filterable and joinable like any other table
this course has worked with.

## Where to look first, when something breaks

1. **Graph view** — which table's node shows a failure, first, in the dependency chain.
2. **Per-table metrics** — did expectations catch it (Lesson 52), or did the table fail to update at all?
3. **Event log** — the actual error message, queried directly, for the specific failing run.

This ordered approach — visual overview, then metrics, then the
actual error — is the practical answer to Lesson 44's lineage-based
"what breaks if I change this?" question, applied after something
has already broken, rather than before a planned change.

## Key terms

| Term | Meaning |
|---|---|
| Graph view | The pipeline's dependency graph, visualized, updated live per run |
| Per-table metrics | Row counts and expectation pass/fail, shown together per table |
| Event log | A real, queryable Delta table recording every event across every run |

## Check yourself

You're ready for Lesson 56 when you can explain, without looking: why
is the event log described as "nothing exotic," in terms of how you
actually query it?
