# Lesson 6 — Fact Table Types

**Chapter 2 · Fact Tables · Lesson 6 of 39**

## What you'll learn

- The three fact table types every dimensional model is built from:
  transaction, periodic snapshot, and accumulating snapshot
- What actually changes between them — grain, row volume, how they're
  loaded, and whether their measures are additive
- Why picking the wrong type for a business process causes real
  problems, not just a stylistic difference
- Where a fourth variant, the factless fact table, fits in (covered on
  its own in Lesson 10)

## Same idea, three different jobs

Every fact table stores measurements about a business process at some
grain — that part doesn't change. What changes is *how the rows behave
over time*: whether a row is written once and never touched again,
whether the table gets a fresh batch of rows on a schedule, or whether
one row gets updated repeatedly as a process moves forward. Microsoft's
own guidance on modeling fact tables in Fabric names exactly three
types, and getting this classification right, before you write a single
`CREATE TABLE` statement, decides how the table gets loaded, how big it
grows, and which of its measures you're even allowed to add up.

- **Transaction fact tables** — one row per business event. A sales
  order line, a call, a click. All the data is known the moment it's
  inserted, and the row never changes except to correct an error.
- **Periodic snapshot fact tables** — one row per entity per fixed time
  interval, like the end-of-day stock balance for every product. The
  table gets a whole new batch of rows on a schedule, whether or not
  anything actually happened.
- **Accumulating snapshot fact tables** — one row per instance of a
  multi-step process, like an order moving through fulfillment. That
  single row gets *updated* — not re-inserted — every time the process
  reaches its next milestone.

## Why the type matters

These aren't just three flavors of the same table — the choice has
consequences that show up immediately in ETL design and in what queries
are even valid against the data.

- **Row volume.** A transaction table grows with every event and can
  reach billions of rows; a periodic snapshot table's size is bounded
  by (entities × time intervals), which is often far smaller and far
  more predictable.
- **Additivity.** Transaction measures are typically additive across
  every dimension. Periodic snapshot measures are usually
  *semi-additive* — you can sum an inventory balance across products on
  one day, but summing it across days double-counts stock that never
  moved.
- **ETL pattern.** Transaction tables are insert-only. Accumulating
  snapshot tables require an update statement that finds the existing
  row for a process instance and moves it to its next milestone — a
  fundamentally different load pattern than the other two.

## Key terms

| Term | Meaning |
|---|---|
| Transaction fact table | One row per business event, inserted once and left alone |
| Periodic snapshot fact table | One row per entity per fixed interval, loaded on a schedule |
| Accumulating snapshot fact table | One row per process instance, updated as it reaches each milestone |
| Additive measure | Can be validly summed across every dimension in the table |
| Semi-additive measure | Can be summed across some dimensions (e.g. products) but not others (e.g. time) |

## Lab

For each business process below, name which of the three fact table
types fits and explain the grain in one sentence:

1. Every scan of a package by a shipping carrier, from pickup to
   delivery.
2. The closing balance of every customer's bank account, captured once
   each night.
3. A support ticket that starts as "opened" and moves through
   "assigned," "in progress," and "closed," where you want to measure
   how long it sat in each stage.

## Check yourself

You're ready for Lesson 7 when you can state, without looking, the
grain and the load pattern (insert-only vs. update-in-place) for all
three fact table types — and explain why summing an inventory snapshot
measure across days gives a wrong answer.
