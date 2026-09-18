# Lesson 14 — Lakeflow vs. Traditional Notebooks

**Chapter 3 · Lakeflow & Declarative Pipelines · Lesson 14 of 34**

## What you'll learn

- What Lakeflow actually takes off your plate, compared to a traditional notebook pipeline
- What a traditional notebook pipeline gives you that Lakeflow doesn't
- Retries, incremental state, and orchestration — the three things worth comparing directly
- When the honest answer is "keep the notebook"

## What Lakeflow takes off your plate

A Lakeflow Declarative Pipeline (Lessons 12-13) handles three things
automatically, once you've declared the tables: it retries a failed table
update on its own; it tracks exactly which rows a streaming table has
already processed, so a re-run doesn't reprocess or lose data; and it runs
every table in the correct order, inferred from the dependency graph — no
job/task configuration (Lesson 11) to maintain by hand.

## What a traditional notebook pipeline requires of you instead

A traditional notebook pipeline — the kind Databricks & Delta Lake Chapter 3
built (Lessons 29-30, 34) — gives you the exact same PySpark and the exact
same destination, but every one of those three things is now your job:

```
Retries:             wrap each step in a try/except, decide what "retry" means
Incremental state:   manage your own checkpointLocation (Lesson 33), by hand
Orchestration:       chain tasks yourself in a job (Lesson 11), in the right order
```

Nothing here is impossible — Lesson 33's Structured Streaming checkpoints
and Lesson 30's manual task chain are real, working solutions. They're just
work that a Lakeflow pipeline no longer requires you to write or maintain.

## What you give up for that convenience

The other side of the trade: a traditional notebook is fully yours to debug
one cell at a time, interactively, mid-run — exactly the workflow every
earlier lesson in this track assumed. A Lakeflow pipeline runs as a whole
graph; you don't step through `bronze_trips` cell-by-cell while it's
executing inside a pipeline run, the way you would in an ordinary attached
notebook. Debugging happens by testing the underlying function or query
independently, then re-running the pipeline — a different rhythm, not a
worse one, but a real adjustment.

## When "keep the notebook" is the honest answer

A one-off exploratory script, a pipeline with two or three ad-hoc steps that
change weekly, or a team still learning PySpark fundamentals is often better
served by a plain notebook and a Lesson 11 job — the overhead of learning
Lakeflow's declarative model isn't worth it yet. A pipeline with real
production SLAs, several interdependent tables, and a team that will
maintain it for years is exactly where Lakeflow's automatic retries and
dependency tracking start paying for themselves.

## Key terms

| Term | Meaning |
|---|---|
| Automatic retry | Lakeflow retries a failed table update without custom `try/except` code |
| Managed incremental state | Lakeflow tracks which rows a streaming table has processed, without a hand-managed checkpoint |
| Interactive debugging | Traditional notebooks support cell-by-cell debugging; a running pipeline is debugged as a whole graph |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: name one
thing a traditional notebook pipeline requires you to write by hand that a
Lakeflow Declarative Pipeline handles automatically.
