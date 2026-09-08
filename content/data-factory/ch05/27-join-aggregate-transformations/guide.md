# Lesson 27 — Join & Aggregate Transformations

**Chapter 5 · Mapping Data Flows · Lesson 5 of 7**

## What you'll learn

- The five join types mapping data flows support
- How to configure a join condition, including non-equi joins
- What Aggregate does, and why unlisted columns disappear by default
- A genuinely practical use: deduplication

## Join: combining two streams

The **Join** transformation combines data from two streams into one,
matched on a condition — choose the right stream, the join type, and
the key columns to match on:

![Screenshot of the Join transformation settings, showing right stream selection, join type, and key column matching.](/courses/data-factory/ch05/27-join-aggregate-transformations/join.png)

Five join types are supported:

| Join type | Output |
|---|---|
| **Inner** | Only rows matching in both streams |
| **Left outer** | Every row from the left, matched rows from the right (NULLs where unmatched) |
| **Right outer** | Every row from the right, matched rows from the left |
| **Full outer** | Every row from both, NULLs wherever nothing matched |
| **Custom cross** | Every row pair meeting a custom condition — including non-equi conditions like `>` or `!=` |

By default, a join matches on **equality** between one column in each
stream. For a **non-equi join** — greater than, not equal to — switch
the operator dropdown between the two columns, and enable **Fixed**
broadcasting on at least one side.

## Aggregate: collapsing rows into summaries

**Aggregate** groups rows and computes summary values over each
group — genuinely similar to a SQL `GROUP BY`:

![Screenshot of the Aggregate transformation's Group by settings.](/courses/data-factory/ch05/27-join-aggregate-transformations/agg.png)

![Screenshot of the Aggregate transformation's Aggregates tab, showing an aggregation expression being built for a new column.](/courses/data-factory/ch05/27-join-aggregate-transformations/aggregate-columns.png)

A real example: group `MoviesYear` by `year`, and create a new column
`avgrating` equal to `avg(toInteger(Rating))` — one row per year,
each with that year's average rating.

## The gotcha: unlisted columns disappear

**Any column not included in a group-by clause or an aggregate
expression doesn't flow through to the output at all** — Aggregate
behaves exactly like a SQL `SELECT` with a `GROUP BY`, not like a
row-preserving transformation. To keep another column around, either
aggregate it explicitly (`first()`, `last()`), or rejoin it afterward
using a self-join pattern.

## A genuinely practical use: deduplication

Group by whatever columns define a "duplicate" for your data, then
apply `first()` (or `last()`, `max()`, `min()`) to every other column
via a **column pattern** — the first (or last, or highest, or lowest)
matching row's values win, and duplicates collapse down to one row
per group. `count()` in the same aggregation tells you exactly how
many duplicates existed before you collapsed them.

## Key terms

| Term | Meaning |
|---|---|
| Join | Combines two streams on a matching condition |
| Non-equi join | A join condition using an operator other than equals |
| Aggregate | Groups rows and computes summary values per group |
| Deduplication | Using Aggregate's group-by plus a heuristic to collapse duplicate rows |

## Lab

1. Build a Join transformation combining two sources you have,
   choosing Inner or Left outer based on what actually makes sense
   for your data.
2. Build an Aggregate transformation grouping by one column, with one
   real aggregate expression (`sum()`, `avg()`, or `count()`).
3. Add a column that isn't in the group-by or aggregate list, and
   confirm in Data Preview that it genuinely disappears from the
   output — then fix it with `first()`.

## Check yourself

You're ready for Lesson 28 when you can explain, in one sentence,
why a column left out of both the group-by clause and every aggregate
expression simply vanishes from Aggregate's output.
