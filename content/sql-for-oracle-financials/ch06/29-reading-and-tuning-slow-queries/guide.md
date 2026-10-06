# Lesson 29 — Reading and Tuning Slow Queries

**Chapter 6 · Practice Sets · Lesson 4 of 5**

## What you'll learn

- `EXPLAIN PLAN` and `DBMS_XPLAN.DISPLAY` — seeing how Oracle will run a query
- Sargable predicates: writing `WHERE` clauses the database can actually use an index for
- Why wrapping a column in a function usually defeats an index
- A short list of patterns to watch for on a slow-running finance query

## Seeing the plan before you run it

```sql
EXPLAIN PLAN FOR
SELECT i.invoice_num, s.vendor_name
FROM ap_invoices_all i
INNER JOIN poz_suppliers s ON s.vendor_id = i.vendor_id
WHERE i.invoice_amount > 10000;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

`EXPLAIN PLAN FOR` doesn't actually run the query — it asks Oracle to work
out **how** it would run it, and stores that plan. `DBMS_XPLAN.DISPLAY`
then prints it in a readable form: which table gets scanned first, whether
an index is used, how the join is performed. On a table with millions of
invoices, this is the difference between a query returning in
milliseconds and one that scans the entire table every time.

## Sargable predicates: writing WHERE clauses an index can use

A predicate is **sargable** when the database can use an index to jump
straight to qualifying rows, instead of checking every row one by one.
Wrapping the indexed column in a function usually breaks that:

```sql
-- NOT sargable: TRUNC(invoice_date) defeats any index on invoice_date
WHERE TRUNC(invoice_date) = DATE '2026-06-15'

-- SARGABLE: a plain range on the unmodified column
WHERE invoice_date >= DATE '2026-06-15'
  AND invoice_date <  DATE '2026-06-16'
```

Both conditions describe "invoices dated June 15, 2026," but the first
forces Oracle to compute `TRUNC(invoice_date)` for **every single row**
before it can check the condition — an index on `invoice_date` can't help,
because the index stores the original values, not the `TRUNC`-ed ones. The
second version uses the column exactly as it's stored, so an index can be
used directly.

## A short checklist for a slow finance query

| Pattern | Why it hurts |
|---|---|
| A function wrapped around an indexed column in `WHERE` | Defeats the index (see above) |
| `NOT IN` on a large subquery | Often performs worse than `NOT EXISTS` (Lesson 18) |
| Joining on mismatched data types | Forces an implicit conversion, row by row |
| Missing a `WHERE`/join filter on a large table entirely | Scans everything by default |

## Why this matters for a consultant, not just a DBA

You don't need to be a performance-tuning specialist to write
**reasonably** efficient queries — you just need to recognize these
patterns and avoid them by habit. A query that times out or takes minutes
against a real client's production-scale AP or AR tables, on something
that should be instant, reflects on the whole investigation, not just the
one report.

## Key terms

| Term | Meaning |
|---|---|
| `EXPLAIN PLAN` / `DBMS_XPLAN.DISPLAY` | Shows how Oracle intends to execute a query |
| Sargable predicate | A WHERE condition the database can use an index to satisfy directly |

## Lab

Take any `WHERE TRUNC(some_date) = ...` pattern you've written in an
earlier lesson's lab, and rewrite it as a sargable date-range condition
instead.

## Check yourself

You're ready for Lesson 30 when you can answer, without looking: why does
wrapping a column in a function like `TRUNC()` usually defeat an index on
that column, and what does `EXPLAIN PLAN FOR` actually do (and not do)?
