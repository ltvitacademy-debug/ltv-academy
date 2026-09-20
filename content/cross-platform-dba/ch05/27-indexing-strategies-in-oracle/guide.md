# Indexing Strategies in Oracle

Reading Oracle Execution Plans showed `INDEX RANGE SCAN` and `INDEX UNIQUE SCAN` as
operators the optimizer reaches for. This lesson is about deliberately giving it good
options to reach for — and about a category of index SQL Server DBAs generally haven't had
to think about, because it solves a problem the SQL Server storage engine doesn't structure
the same way.

## What you'll learn

- Oracle's default: the B-tree index, and why it behaves like the one you already know
- Bitmap indexes: what low cardinality means, and why they suit analytical workloads
- Why bitmap indexes are a bad fit for OLTP tables with frequent concurrent writes
- Function-based indexes, and the specific problem they solve

## B-tree indexes: the default, and mostly familiar territory

Oracle's default index type is the **B-tree index**, and structurally it behaves like the
nonclustered index you already know from SQL Server: a balanced tree of index entries
pointing to rows, efficient for high-cardinality columns (lots of distinct values) and for
equality or range predicates. `CREATE INDEX emp_last_name_ix ON employees(last_name);`
looks almost identical to the SQL Server syntax you'd write. The genuine platform
difference to remember: Oracle has no clustered index in the SQL Server sense — a regular
Oracle table is a heap by default (an **index-organized table**, or IOT, is the closer
analog to a clustered index, but it's a distinct, deliberately-chosen table type, not the
default storage for every table).

## Bitmap indexes: built for low cardinality and analytics, not OLTP

A **bitmap index** stores, for each distinct value in the indexed column, a bitmap (a
string of bits) marking which rows have that value. This is a genuinely different
structure from anything in the SQL Server toolkit, and it's the right tool specifically
for **low-cardinality** columns — a handful of distinct values across many rows, like
`GENDER`, `MARITAL_STATUS`, or `ORDER_STATUS` — in a data warehouse or reporting context.
Bitmaps combine with `AND`/`OR` extremely efficiently (bitwise operations across bitmaps
are cheap), which is exactly the pattern a `WHERE region = 'WEST' AND status = 'CLOSED'`
analytical query needs. The tradeoff is sharp: bitmap indexes are a poor fit for tables with
frequent concurrent single-row inserts, updates, or deletes, because updating one row can
require locking an entire bitmap segment covering many rows — fine for a data warehouse
loaded in batches, actively harmful for an OLTP table with lots of concurrent small writes.

```sql
CREATE BITMAP INDEX orders_status_bmx ON orders(order_status);
```

## Function-based indexes: indexing the result of an expression

A **function-based index** indexes the result of a function or expression applied to a
column, not the raw column value — solving the specific problem of a `WHERE` clause that
wraps a column in a function, which normally defeats a plain B-tree index entirely:

```sql
-- Without this index, a predicate like
--   WHERE UPPER(last_name) = 'SMITH'
-- can't use a plain index on last_name at all.
CREATE INDEX emp_upper_lastname_ix ON employees(UPPER(last_name));
```

Once created, the optimizer can use this index for any predicate matching that exact
expression — case-insensitive searches and computed-column lookups being the two most
common real-world uses.

## Key terms

| Term | Meaning |
|---|---|
| B-tree index | Oracle's default balanced-tree index, suited to high-cardinality columns |
| Bitmap index | Index storing a bitmap per distinct value; suited to low-cardinality analytical columns |
| Cardinality | The number of distinct values a column has relative to its row count |
| Index-organized table (IOT) | A table stored as its own B-tree, the closer analog to a SQL Server clustered index |
| Function-based index | An index on the result of an expression rather than a raw column value |

## Check yourself

A reporting table has a `REGION` column with 6 distinct values across 40 million rows, and
an `ORDER_ID` column that's unique per row. Which index type fits which column, and why
would swapping them be a mistake?
