# Lesson 15 — Designing a Serving Layer

**Chapter 1 · System Design for Data Engineers · Lesson 15 of 81**

## What you'll learn

- The serving layer as the last mile — who actually reads gold, and how
- Four real serving choices: warehouse, semantic model, API, cache
- Read-optimized vs. write-optimized, revisited from Lesson 4
- A concrete decision for this course's own gold layer

## The last mile

Lesson 14's gold layer holds business-ready, aggregated data. The
**serving layer** is what actually puts that data in front of
whoever needs it — an analyst's dashboard, an application's API
call, a data scientist's notebook. Getting bronze, silver, and gold
right and then serving gold badly still leaves the end user with a
slow, wrong, or unusable answer — this layer is not an
afterthought, even though it comes last in the design.

## Four real serving choices

```text
Data warehouse:   T-SQL queries against gold tables directly --
                   Fabric Warehouse (Fabric Lesson 10), full
                   INSERT/UPDATE/SELECT surface
Semantic model:   relationships + measures defined once, queried by
                   name -- Fabric Lesson 13, sitting on top of gold
API:              a service exposing specific, pre-shaped endpoints --
                   for application code, not ad hoc analyst queries
Cache:            precomputed results served instantly -- this
                   course's own Lesson 16, next
```

None of these is universally "the" serving layer — Lesson 4's OLTP-
vs-OLAP framing applies here directly: a **warehouse** fits an
analyst team comfortable with T-SQL running ad hoc queries; a
**semantic model** fits a BI tool needing consistent, named
business logic (Fabric Lesson 13's measures, defined once instead
of redefined per report); an **API** fits application code that
needs a specific, stable shape rather than open-ended query access.

## Direct Lake — a serving layer detail worth knowing

```text
Import:      Power BI's own copy -- fast, but a refreshed snapshot
DirectQuery:  a live query to gold every time -- fresh, but slower
Direct Lake:  Power BI reads gold's Delta Parquet files directly --
              fast AND fresh, no query engine in between
```

Fabric Lesson 12's Direct Lake mode is what a semantic-model serving
layer actually looks like when it's built well: instead of choosing
between Import's staleness and DirectQuery's latency, it reads
gold's Delta files directly, leaning on the same transaction log
(Databricks & Delta Lake Lesson 17) that already made time travel
and safe concurrent writes possible. It's a serving-layer decision,
not a Power BI feature to memorize in isolation.

## Read-optimized vs. write-optimized, revisited

```text
Serving layer:  read-optimized -- gold is written once (or
                incrementally, Lesson 14), read many times, by many
                different consumers, often concurrently
Transformation
layer:          write-optimized -- MERGE-heavy, built for correct
                repeated writes (Lesson 11's idempotency), not for
                thousands of concurrent readers
```

Lesson 4 established OLTP/OLAP as a choice driven by read pattern.
The serving layer is where that choice gets made concretely for
gold: it should be tuned for concurrent reads at low latency, even
if that means trading away some of the write flexibility the
transformation layer needed one step earlier. Optimizing gold for
writes it rarely receives, at the expense of the reads it constantly
receives, gets the trade-off backward.

## A concrete decision

```text
This course's own gold layer:  analysts need T-SQL ad hoc access
    AND a BI dashboard needs consistent measures
  -> Warehouse for ad hoc analyst queries
  -> Semantic model (Direct Lake) on the same gold tables, for the
     dashboard
  -- same gold, two serving layers, each matching its own consumer
```

Serving isn't always one choice — Fabric Lesson 11's Lakehouse-vs-
Warehouse "mixed pattern" applies at the serving layer just as
directly as it did at the transformation layer: the same gold data
can serve a warehouse and a semantic model simultaneously, because
different consumers genuinely need different front doors onto it.

## Key terms

| Term | Meaning |
|---|---|
| Serving layer | What puts gold data in front of its actual consumers |
| Semantic model | Relationships + measures, defined once, queried by name (Fabric Lesson 13) |
| Direct Lake | Reading gold's Delta files directly — fast and fresh, no engine in between |
| Read- vs. write-optimized | Serving tunes for concurrent reads; transformation tunes for correct writes |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
can the same gold table reasonably serve both a T-SQL warehouse and a
Direct Lake semantic model at once, rather than needing to pick one?
