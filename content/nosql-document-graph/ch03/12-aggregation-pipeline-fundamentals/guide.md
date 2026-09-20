# Aggregation Pipeline Fundamentals

`find()` filters and shapes a single query's worth of documents, but it can't group data,
compute running totals, or reshape documents through multiple transformation steps the way a
SQL query with `GROUP BY`, subqueries, and derived tables can. For that, MongoDB has the
**aggregation pipeline** — a genuinely different execution model from `find()`, but one that
maps onto the same SQL instincts you already have: a pipeline is a sequence of steps, and each
step's output becomes the next step's input, the same way you might chain CTEs in T-SQL.

## What you'll learn

- What the aggregation pipeline actually is, and why it exists alongside `find()`
- The core stages: `$match`, `$project`, `$sort`, `$limit`
- How to read a pipeline as a left-to-right sequence of transformations

## The pipeline model: an array of stages

An aggregation pipeline is run with `db.collection.aggregate([...])`, where the argument is
an **array of stage documents**. Each stage takes the documents coming out of the previous
stage, does one job, and passes its output to the next stage:

```
db.orders.aggregate([
  { $match: { status: "shipped" } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
```

Read that left to right: filter to shipped orders, sort by total descending, keep the top 10.
There's no single "query" being parsed and optimized as a whole unit the way a SQL statement
is — it's a literal, ordered sequence of operations, closer in spirit to piping output from one
command to the next than to a declarative SQL `SELECT`.

## $match: filtering, but as a pipeline stage

`$match` uses the exact same query operators as `find()` — `$eq`, `$gt`, `$in`, `$and`, `$or`,
all of it — but as a pipeline stage rather than a standalone call:

```
{ $match: { status: "shipped", total: { $gt: 100 } } }
```

Put `$match` as early in the pipeline as possible. Just like a SQL Server query planner wants
a `WHERE` clause to narrow rows before doing expensive work, an early `$match` lets MongoDB use
an index and reduces how many documents later stages have to process.

## $project: reshaping documents mid-pipeline

`$project` looks like a `find()` projection, but it's more powerful — inside a pipeline it can
also compute new fields, not just include or exclude existing ones:

```
{
  $project: {
    customerName: 1,
    total: 1,
    isLargeOrder: { $gt: ["$total", 500] },
    _id: 0
  }
}
```

That's the aggregation-pipeline equivalent of a computed column in a SQL `SELECT` list — a
value derived from other columns, not just a raw column pass-through.

## $sort and $limit

`$sort` and `$limit` work exactly like `ORDER BY` and `TOP` / `FETCH NEXT`:

```
{ $sort: { total: -1 } }   // -1 descending, 1 ascending
{ $limit: 10 }
```

Ordering matters. `$sort` then `$limit` gives you the top N by that sort order; `$limit` before
`$sort` would arbitrarily cap the input *before* it's ordered, which is almost never what you
want — the same trap as forgetting `ORDER BY` before `TOP` in T-SQL.

## Key terms

| Term | Meaning |
|---|---|
| Aggregation pipeline | An ordered array of stages, each transforming the documents produced by the stage before it |
| Stage | A single step in a pipeline (e.g. `$match`, `$project`, `$sort`, `$limit`), expressed as one document in the pipeline array |
| `$match` | Filters documents using the same query operators as `find()`; best placed early for performance |
| `$project` | Reshapes documents — includes, excludes, or computes fields, mid-pipeline |

## Check yourself

Write an aggregation pipeline against a `sales` collection that keeps only documents where
`region` is `"West"`, sorts by `revenue` descending, and returns only the top 5.
