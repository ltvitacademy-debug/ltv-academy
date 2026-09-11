# Lesson 19 — Lookup Transformation

**Chapter 4 · Data Flow Transformations · Lesson 19 of 49**

## What you'll learn

- What the Lookup transformation does and when to reach for it instead of
  a SQL join
- The three cache modes — Full cache, Partial cache, No cache — and how
  each one trades memory for freshness
- The transformation's three outputs: Match, No Match, and Error
- Why lookups are case-sensitive and composite joins are allowed

## What the Lookup transformation does

The **Lookup transformation** performs lookups by joining data in your
data flow's input columns with columns in a **reference dataset** — a
table, a view, the result of a SQL query, or a cache file. You use it to
pull in additional information from a related table based on values in
common columns, the same way you'd write a join in T-SQL — except this
join runs row-by-row inside the data flow pipeline, not as a set-based
query against the database.

A classic example: your data flow is loading fact rows that reference a
`ProductID`. A Lookup transformation can take that `ProductID`, find the
matching row in the `Product` dimension table, and add the product's
name straight onto the pipeline as a new output column — no separate
query, no round trip after the fact.

Under the hood, the Lookup transformation tries to perform an **equi-join**
between the input and the reference dataset. It supports **composite
joins** — matching on more than one column at once — and any data type
except `DT_R4`, `DT_R8`, `DT_TEXT`, `DT_NTEXT`, or `DT_IMAGE`. One
important catch: lookups are **case sensitive**. If your source data has
inconsistent casing, run it through a Character Map transformation (or
`UPPER`/`LOWER` in the reference query) before it hits the Lookup.

## Three cache modes

The General page of the Lookup Transformation Editor is where you pick
how the reference dataset gets cached — and this choice affects both
performance and how current the data is:

- **Full cache** — the entire reference dataset is queried once and
  loaded into memory before the Lookup runs. Fast per-row lookups, but
  uses more memory and the cache reflects a single point in time.
- **Partial cache** — rows are cached as they're looked up during
  execution; matches and non-matches both get cached. Least frequently
  used rows get evicted when the cache fills up.
- **No cache** — every single lookup queries the reference dataset live,
  with no caching at all. Slowest option, but always current.

Full cache uses an OLE DB connection manager or a **Cache connection
manager** (letting you share a prebuilt cache across multiple packages).
Partial cache and No cache always query live through an OLE DB
connection manager.

## Three outputs: Match, No Match, Error

Every Lookup transformation has one input and up to three outputs:

- **Match output** — rows that found at least one matching row in the
  reference dataset.
- **No Match output** — rows that found nothing. By default, unmatched
  rows are treated as *errors*; you have to explicitly configure the
  Lookup to **redirect rows to no match output** instead if you want to
  handle them separately (a very common pattern for detecting "new"
  rows during an incremental load, which you'll see again in Chapter 7).
- **Error output** — rows that failed for a genuine error, separate from
  a simple non-match.

If the reference dataset has multiple matching rows, the Lookup only
returns the first match it finds — it does not fan out or duplicate the
input row.

## Key terms

| Term | Meaning |
|---|---|
| Reference dataset | The table, view, query result, or cache file the Lookup joins against |
| Full cache | Reference dataset loaded into memory entirely before the Lookup runs |
| Partial cache | Reference dataset cached incrementally as rows are looked up during execution |
| No cache | Every lookup queries the reference dataset live; nothing is cached |
| Match / No Match output | The two regular outputs a Lookup row can be routed to based on whether it found a matching reference row |
| Composite join | A join that matches on more than one column at once |

## Lab

1. Open a package with an OLE DB source that reads a fact-style table
   containing a foreign key column (for example, `ProductID` from
   AdventureWorks2012's `Sales.SalesOrderDetail`).
2. Drag a **Lookup** transformation onto the Data Flow tab and connect
   the source to it. On the **General** page, choose **Full cache** and
   an OLE DB connection manager.
3. On the **Connection** page, choose **Use a table or view** and point
   it at `Production.Product`.
4. On the **Columns** page, drag `ProductID` from Available Input
   Columns to `ProductID` in Available Lookup Columns, then check the
   box next to `Name` to add it to the output with the alias
   `ProductName`.
5. On the **General** page, set **Specify how to handle rows with no
   matching entries** to **Redirect rows to no match output**. Add a
   destination or data viewer on the No Match output and confirm it's
   empty (every `ProductID` in `SalesOrderDetail` should match).

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: what
are the three cache modes for a Lookup transformation, and which one do
you pick when you need the freshest possible data at the cost of
performance?
