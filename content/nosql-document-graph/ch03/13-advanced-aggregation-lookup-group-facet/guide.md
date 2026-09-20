# Advanced Aggregation: $lookup, $group & $facet

`$match`, `$project`, `$sort`, and `$limit` handle filtering and reshaping, but the real power
of the aggregation pipeline — and the stages that finally give MongoDB a genuine answer to
`JOIN` and `GROUP BY` — are `$lookup`, `$group`, and `$facet`. These three stages are what let
you do real relational-style analysis on top of a document database.

## What you'll learn

- `$lookup` — MongoDB's join-equivalent, for pulling in data from another collection
- `$group` — aggregating documents by a key, MongoDB's `GROUP BY`
- `$facet` — running multiple aggregation pipelines in parallel on the same input

## $lookup: MongoDB's join

`$lookup` performs a left outer join against another collection in the same database. You
give it the foreign collection, the local field, the foreign field, and a name for the array
it attaches the matches under:

```
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerInfo"
    }
  }
])
```

The result is important to understand: `customerInfo` comes back as an **array**, not a single
embedded document — even if there's exactly one match — because `$lookup` is fundamentally a
one-to-many join under the hood. If you know there's exactly one matching customer, you'll
typically follow `$lookup` with `$unwind` (or an `$arrayElemAt`) to flatten that single-element
array into a plain embedded object. This is the clearest place where "MongoDB isn't relational
with joins removed" becomes concrete: a `$lookup` is a genuine cross-collection join, but it's
bolted onto a document model, so the output shape needs an extra step that a SQL join wouldn't.

## $group: MongoDB's GROUP BY

`$group` aggregates documents by a key, exactly like SQL's `GROUP BY` combined with aggregate
functions in the `SELECT` list:

```
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      totalRevenue: { $sum: "$total" },
      orderCount: { $count: {} },
      avgOrder: { $avg: "$total" }
    }
  }
])
```

`_id` in a `$group` stage is the grouping key (it plays the role of your `GROUP BY` column
list) — it doesn't have to be the document's original `_id` field, despite the name. `$sum`,
`$avg`, `$count`, `$min`, and `$max` are the accumulator operators, directly equivalent to
`SUM()`, `AVG()`, `COUNT()`, `MIN()`, and `MAX()` in a SQL `SELECT`. Grouping by `null` (`_id:
null`) aggregates the entire pipeline input into a single summary document, the equivalent of
an aggregate query with no `GROUP BY` at all.

## $facet: multiple pipelines, one pass

`$facet` runs several independent sub-pipelines against the *same* input documents and returns
all of their results together, each under its own named key:

```
db.orders.aggregate([
  {
    $facet: {
      byStatus: [
        { $group: { _id: "$status", count: { $count: {} } } }
      ],
      topOrders: [
        { $sort: { total: -1 } },
        { $limit: 5 }
      ]
    }
  }
])
```

This is genuinely useful for a scenario relational databases handle with multiple round trips
or a set of `UNION`-free separate queries: producing a dashboard's worth of different
summaries (a status breakdown *and* a top-5 list) from a single pass over the data, in one
call to the database.

## Key terms

| Term | Meaning |
|---|---|
| `$lookup` | Left outer join against another collection; result attaches as an array field |
| `$group` | Groups documents by a key (`_id`) and computes accumulator values, MongoDB's `GROUP BY` |
| Accumulator operator | `$sum`, `$avg`, `$count`, `$min`, `$max` — used inside `$group` to compute per-group values |
| `$facet` | Runs multiple sub-pipelines in parallel on the same input, returning each result set under its own key |

## Check yourself

Why does `$lookup` return its matched documents as an array, even when you expect exactly one
match, and what stage would you typically add afterward to flatten it?
