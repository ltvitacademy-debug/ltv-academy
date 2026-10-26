# Lesson 5 — Why This Model Needs to Be Incremental

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 5 of 16**

## What you'll learn

- Why `materialized='table'` is the right default, and exactly when it
  stops being the right choice
- How to connect the "orders table grows daily" fact from Lesson 1 to
  a concrete materialization decision
- What specifically breaks (cost, not correctness) if this orders fact
  model stays `table`-materialized indefinitely
- Why this decision belongs on the final marts model, not the
  intermediate model from Lesson 4

## The default so far: `table`

Every model built in this chapter so far — the staging models, the
intermediate model — has used the default `table` materialization
(or `view`, for the cheap staging layer). `table` drops and rebuilds
the entire model from scratch on every `dbt run`, reading the full
upstream history every single time. That's the right choice for a
model that's small or doesn't change shape often — and it was the
right choice for every model built in Lessons 2-4.

## The orders fact model is different, by design

Lesson 1 established the fact that matters here: `raw_orders` gets new
rows every day the shop is open, not a static one-time load. The final
orders fact model — the one Finance and Ops will both query — sits
directly on top of that growing table. Picture this project live for a
year: a `table`-materialized fact model would re-scan and re-transform
every order ever placed, every single `dbt run`, just to pick up
today's new rows. The compute cost of that rebuild grows every day,
while the *useful new work* each run actually does (processing one
day's new orders) stays roughly constant.

## What specifically breaks: cost, not correctness

This isn't a bug — a `table`-materialized version of this model would
still produce the right numbers. What breaks is time and compute
cost: a run that took seconds against a small seed file starts taking
minutes, then longer, as the real history grows, with almost all of
that cost spent re-deriving rows that were already correct yesterday.
That's the exact same problem the dbt course's own incremental-models
chapter identifies for a large fact table with years of history behind
it — this project has the same shape of problem, just arriving sooner
because the orders table is being fed daily from day one.

## Why this decision belongs on the final fact model, not Lesson 4's model

The intermediate model from Lesson 4 is a clean, relatively cheap join
— it's not yet the expensive thing. The final orders fact model
(built in Lesson 6) is where the incremental materialization actually
goes, because that's the model Finance and Ops's BI reports hit
directly and repeatedly. Putting the incremental logic on the
intermediate model instead would solve the wrong layer's cost problem.

## Key terms

| Term | Meaning |
|---|---|
| `materialized='table'` | Rebuilds a model from scratch every run — correct, but increasingly costly as history grows |
| Incremental materialization | Processes only new/changed rows on repeat runs instead of reprocessing all history |
| Cost vs. correctness | A table-materialized model stays correct as it grows; it just gets slower and more expensive to rebuild |

## Lab

Estimate it yourself: if `raw_orders` gains roughly 50 new rows a day,
sketch (in words, no need for exact math) how the useful-work-to-total-work
ratio of a `table`-materialized rebuild changes between month 1 and
month 12 of this project running live.

## Check yourself

You're ready for Lesson 6 when you can explain, without saying
"it's faster," specifically *why* it's faster — what a `table`
materialization keeps re-doing that an incremental model skips.
