# The Cosmos DB SQL Query Language

Chapter 6 covered how data lands in a Cosmos DB container — documents, partition keys, request
units. This lesson covers how you get it back out. The Core (SQL) API's query language looks
immediately familiar to anyone who knows T-SQL: `SELECT`, `FROM`, `WHERE`, `ORDER BY`. But
underneath that familiar syntax is a genuinely different execution model — the engine is walking
JSON documents, not scanning fixed-width rows, and there's no schema to check a query against.

## What you'll learn

- The core `SELECT` / `FROM` / `WHERE` syntax and what the container alias actually means
- How to query nested, optional, and array-valued JSON properties
- Why a query's cost in RUs depends heavily on whether it targets a single partition

## SELECT, FROM, WHERE — familiar syntax, different target

A basic Cosmos DB SQL query reads almost like T-SQL:

```sql
SELECT c.name, c.type
FROM c
WHERE c.type = "customer"
ORDER BY c.name
```

The difference is `FROM c`. There's no table named `c` — `c` is a conventional alias standing in
for "every item in this container." You could alias it to anything (`FROM Customers cust`), but
`c` is the near-universal convention in Cosmos DB documentation and code, the same way `SELECT *`
is universal in relational SQL. Because containers hold JSON documents rather than typed rows, you
reach into nested structure with dot paths: `c.address.city`, `c.pricing.currency`. There's no
`JOIN`-ing to a separate `Address` table because the address is just nested inside the document.

`SELECT VALUE` is worth knowing early: a plain `SELECT c.name FROM c` wraps each result in a JSON
object (`{"name": "..."}`); `SELECT VALUE c.name FROM c` returns the bare values instead. It's the
Cosmos DB equivalent of projecting a single scalar column without the wrapper.

## Schema-less querying: optional properties and array unwinding

Because Cosmos DB documents aren't validated against a schema, two documents in the same container
can legally have different shapes. `IS_DEFINED()` checks whether a property exists at all before
you rely on it:

```sql
SELECT c.id, c.address.city
FROM c
WHERE IS_DEFINED(c.address)
```

Arrays are handled with a real `JOIN` keyword — but it's easy to misread as a relational join. It
isn't one. It's an **intra-document join**: it unwinds an array property inside a single document
into multiple result rows, entirely within that one document. It never reaches into another
container.

```sql
SELECT VALUE tag
FROM c
JOIN tag IN c.tags
WHERE c.type = "product"
```

This returns one row per tag, per matching product document — the same idea as `CROSS APPLY`
against a JSON array in T-SQL, not a `JOIN` against a second table.

## Query cost: partition key filters change everything

A query that includes an equality filter on the partition key can be routed directly to the single
physical partition holding that data — a cheap, targeted operation. A query with no partition key
filter is a **cross-partition query**: the gateway fans it out to every physical partition in the
container, gathers results, and merges them, which costs more RUs and more latency as the
container grows. This is the same instinct a relational DBA already has about a query that can use
a selective index versus one that forces a full scan — except here the "index" that matters most
is the partition key itself, chosen back in Lesson 32.

## Key terms

| Term | Meaning |
|---|---|
| Core (SQL) API | Cosmos DB's native query surface — SQL-like syntax over JSON documents |
| Container alias (`c`) | Conventional stand-in for "every item in this container" in `FROM c` |
| `SELECT VALUE` | Returns bare scalar/array values instead of wrapping each result in a JSON object |
| Intra-document `JOIN` | Unwinds an array property within a single document — not a cross-container join |
| Cross-partition query | A query without a partition key filter, fanned out across all physical partitions |

## Check yourself

A query includes `JOIN tag IN c.tags`. A relational DBA reads "JOIN" and assumes it's pulling data
from a second table. Why is that assumption wrong here, and what is the `JOIN` actually doing?
