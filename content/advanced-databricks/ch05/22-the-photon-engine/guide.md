# Lesson 22 — The Photon Engine

**Chapter 5 · Performance at Scale · Lesson 22 of 34**

## What you'll learn

- What Photon actually is — a native engine, not a Spark config flag
- Which query shapes benefit most, and which barely benefit at all
- How to tell, concretely, whether a cluster is actually using it
- Why a query can be "on Photon" for part of its plan and not the rest

## Not a flag you flip — a different engine

It's tempting to think of Photon as one more Spark setting, like
`spark.sql.shuffle.partitions`. It isn't. Photon is a **native
execution engine written in C++**, built to replace the JVM-based
row-at-a-time execution Spark normally uses, for the specific
operators it supports. Turning it on doesn't tune Spark — it swaps
out the thing actually doing the work, for those operators.

```text
Standard Spark execution:
  JVM, row-at-a-time processing, one row through the operator
  pipeline at a time

Photon execution:
  native C++, vectorized -- processes a batch of rows per operator
  call, using CPU SIMD instructions the JVM can't reach directly
```

## What benefits most

```text
SCANS       -- reading Parquet/Delta files, decompressing columns
AGGREGATIONS -- GROUP BY, SUM, COUNT over large row counts
JOINS       -- especially large shuffle or broadcast joins

Python UDFs        -- Photon can't vectorize arbitrary Python;
                       execution falls back to the JVM for that step
Small, row-by-row   -- little batch of rows means little benefit
  interactive queries  from batch-oriented vectorization
```

Photon rewrites specific physical operators — scan, filter,
aggregate, join, and write — into their vectorized equivalents. A
query mixing a big aggregation with a Python UDF gets Photon for
the aggregation and standard JVM execution for the UDF step, in the
same query plan. It's not all-or-nothing per query; it's
operator-by-operator.

## Confirming it's actually running

The honest way to check isn't "I enabled the Photon checkbox, so
it must be running" — it's looking at the query itself.

```text
Databricks SQL / notebook Spark UI:
  Query profile view -> individual operator nodes show a
  Photon indicator (a lightning-bolt icon) on the operators
  Photon actually executed

  An operator WITHOUT that indicator ran on standard JVM Spark,
  even in a query that's otherwise "Photon-enabled"
```

A cluster or SQL warehouse can have Photon acceleration turned on
and still run a chunk of a given query on plain JVM Spark — checking
the query profile, not the cluster config screen, is what actually
answers "is this query using Photon."

## Key terms

| Term | Meaning |
|---|---|
| Photon | A native, vectorized C++ execution engine, replacing JVM execution for supported operators |
| Vectorized execution | Processing a batch of rows per operator call instead of one row at a time |
| Fallback | Operators Photon can't accelerate (e.g., Python UDFs) still run on standard JVM Spark |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
can a single query be partly accelerated by Photon and partly not,
and where do you actually check which is which?
