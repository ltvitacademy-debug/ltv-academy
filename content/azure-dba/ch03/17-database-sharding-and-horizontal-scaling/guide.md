# Lesson 17 — Database Sharding & Horizontal Scaling

**Chapter 3 · Designing & Scaling Database Resources · Lesson 4 of 5**

## What you'll learn

- Sharding — splitting one logical dataset across *multiple physical databases*
- How this is fundamentally different from partitioning inside one database
- Azure's Elastic Database tools and the split-merge concept
- The real complexity cost: cross-shard queries and rebalancing

## Partitioning vs. sharding — don't confuse the scope

Lesson 15's table partitioning splits **one table's storage inside
one database** into pieces. Sharding is a different scale entirely:
it splits **one logical dataset across multiple separate physical
databases** — each shard is its own Azure SQL Database, with its own
compute, storage, and connection string. A single query against "the
customers table" might actually mean querying ten different databases
that each hold a slice of customers.

```
Partitioning (one database):        Sharding (many databases):
   OrderHistory                        Shard 1: Customers A-F
   |-- Partition 1 (2024)              Shard 2: Customers G-M
   |-- Partition 2 (2025)              Shard 3: Customers N-S
   |-- Partition 3 (2026)              Shard 4: Customers T-Z
```

## Why shard at all

A single Azure SQL Database has a ceiling — maximum size, maximum
compute (DTU/vCore), maximum throughput. When a dataset outgrows what
one database can hold or serve, sharding spreads the data (and the
load) across many databases that each stay comfortably under that
ceiling. It's horizontal scaling: more databases, not a bigger one.

## Azure's Elastic Database tools

Azure SQL Database offers **Elastic Database tools** specifically for
this pattern — a **shard map manager** database that tracks which
shard holds which range of a sharding key (e.g. `CustomerID` ranges),
and a client library that routes each application query to the
correct shard automatically based on that key.

```sql
-- Conceptual: the shard map manager tracks ranges like this
-- CustomerID 1-250000      -> Shard1.database.windows.net
-- CustomerID 250001-500000 -> Shard2.database.windows.net
-- The app asks the shard map for "where does CustomerID 300000 live?"
-- and gets routed straight to Shard2 -- no manual lookup table needed.
```

The **split-merge** service (part of the same tool set) is what
physically moves ranges of data between shards when one shard grows
too large or a new shard is added — splitting a range in two, or
merging two small ranges back together, without an application
outage.

## The real complexity cost

Sharding solves a scale problem by creating a distribution problem:

- **Cross-shard queries are hard.** A query that needs data from
  multiple shards (a report across all customers, for example) can't
  be a single T-SQL query anymore — it has to fan out to each shard
  and combine results in application code or with elastic query.
- **Rebalancing is an operation, not a setting.** As shards grow
  unevenly, someone has to run split-merge operations to keep them
  balanced — this doesn't happen automatically like scaling one
  database's compute tier does.
- **Referential integrity across shards isn't enforced by the
  database.** A foreign key can't point from a row in Shard 1 to a
  row in Shard 2 — that consistency becomes the application's job.

## When it's actually worth it

Shard only when a single database's real ceiling — size, compute, or
throughput — is the actual, measured constraint, not a guess about
future scale. Partitioning (Lesson 15) and the compute/storage scaling
from Lesson 11 solve most large-database problems without taking on
sharding's cross-shard complexity at all.

## Key terms

| Term | Meaning |
|---|---|
| Shard | One physical database holding a slice of a larger logical dataset |
| Shard map manager | The database that tracks which sharding-key range lives on which shard |
| Split-merge service | Moves data ranges between shards to rebalance them |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: how
is sharding different in scope from the table partitioning in Lesson
15, and what's the real complexity cost of splitting data across
multiple databases?
