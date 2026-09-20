# Query Performance & explain() in MongoDB

You can create every index in the world and still have no idea whether MongoDB is
actually using them. The answer is `explain()` — a real method available on any query or
aggregation that shows exactly what the query planner decided to do, in enough detail to
tell a healthy query from a slow one. This is genuinely the same exercise as pulling up an
actual execution plan in SQL Server Management Studio; the vocabulary changes, the
reasoning doesn't.

## What you'll learn

- How to run `explain()` and what its output modes mean
- How to read the two stages that matter most: `COLLSCAN` and `IXSCAN`
- Which `executionStats` fields tell you whether a query is actually efficient

## Running explain()

`explain()` attaches to a query (or aggregation) and returns the plan instead of the data:

```
db.orders.find({ status: "shipped" }).explain("executionStats")
```

It has three modes, passed as a string argument:

- **`"queryPlanner"`** (the default) — shows the *winning plan* the optimizer chose,
  without actually running the query.
- **`"executionStats"`** — actually runs the query and adds real numbers: documents
  examined, keys examined, documents returned, execution time.
- **`"allPlansExecution"`** — like `executionStats`, but also reports statistics for the
  *rejected* candidate plans the optimizer considered and didn't pick — useful when you
  suspect the optimizer chose badly.

## COLLSCAN vs. IXSCAN

Inside the `winningPlan`, the `stage` field tells you the single most important thing
about a query:

- **`COLLSCAN`** — a full collection scan. MongoDB is reading every document in the
  collection and testing each one against your filter. No usable index existed. This is
  the direct equivalent of a SQL Server **table scan** on your execution plan — fine for a
  tiny collection, a real problem at scale.
- **`IXSCAN`** — an index scan. MongoDB used an index to jump straight to the relevant
  entries instead of reading the whole collection. This is the equivalent of an **index
  seek/scan** in SQL Server — what you want to see for a selective query on a large
  collection.

## Reading executionStats

Run with `"executionStats"` and a few fields tell the real story:

```
{
  executionStats: {
    executionTimeMillis: 4,
    totalKeysExamined: 812,
    totalDocsExamined: 812,
    nReturned: 812,
    executionStages: { stage: "IXSCAN", ... }
  }
}
```

- **`nReturned`** — how many documents the query actually returned.
- **`totalDocsExamined`** — how many documents MongoDB had to look at to produce that
  result.
- **`totalKeysExamined`** — how many index entries it scanned.

The relationship between `totalDocsExamined` and `nReturned` is the real health check: if
they're roughly equal, the index is doing its job — MongoDB examined about as many
documents as it returned. If `totalDocsExamined` is dramatically larger than `nReturned`
(scanning thousands of documents to return a handful), the index isn't selective enough
for this query, or the wrong index is being used — the same red flag as a SQL Server plan
showing a huge "Actual Number of Rows" gap between a scan operator and the final result.

## Key terms

| Term | Meaning |
|---|---|
| `explain()` | Method that returns a query's execution plan instead of running it for data |
| `queryPlanner` mode | Default explain mode; shows the winning plan without executing |
| `executionStats` mode | Executes the query and adds real timing/document counts |
| `COLLSCAN` | Full collection scan — no index used; equivalent to a SQL Server table scan |
| `IXSCAN` | Index scan — an index was used; equivalent to a SQL Server index seek/scan |
| `totalDocsExamined` | Number of documents MongoDB had to inspect to answer the query |

## Check yourself

A query's `explain("executionStats")` shows `nReturned: 5` but `totalDocsExamined: 50000`
with a winning plan stage of `IXSCAN`. What does this combination suggest, and what would
you investigate next?
