# Lesson 16 — Subqueries

**Chapter 4 · Subqueries and CTEs · Lesson 1 of 5**

## What you'll learn

- What a subquery is — a query inside another query
- Scalar subqueries: one value, used like a single number
- Multi-row subqueries with `IN`
- Correlated subqueries: referencing the outer row

## A query inside a query

A subquery is a `SELECT` nested inside another SQL statement, used wherever
you could use an expression or a list of values. It's evaluated first, and
its result feeds into the outer query.

## Scalar subquery: returns exactly one value

```sql
SELECT invoice_num, invoice_amount
FROM ap_invoices_all
WHERE invoice_amount > (
    SELECT AVG(invoice_amount) FROM ap_invoices_all
);
```

The inner query returns a single number — the average invoice amount
across the whole table — and the outer query treats it exactly like a
literal number would be used. This is a **scalar subquery**: it must
return exactly one row and one column, or Oracle raises an error.

## Multi-row subquery with IN

```sql
SELECT vendor_name
FROM poz_suppliers
WHERE vendor_id IN (
    SELECT vendor_id
    FROM ap_invoices_all
    WHERE invoice_amount > 10000
);
```

Here the inner query can return **many** rows — every `vendor_id` with at
least one invoice over $10,000. `IN` checks the outer row's `vendor_id`
against that whole list. This answers "which suppliers have at least one
large invoice," without needing a `JOIN` plus `GROUP BY`/`DISTINCT` to get
there.

## Independent vs. correlated subqueries

Both examples above are **independent** subqueries — they run completely
on their own, with no reference to the outer query, and would return the
identical result no matter what row the outer query happens to be
considering.

A **correlated subquery** is different — it references a column from the
**outer** query, so it must be re-evaluated once per outer row:

```sql
SELECT i1.invoice_num, i1.invoice_amount, i1.vendor_id
FROM ap_invoices_all i1
WHERE i1.invoice_amount > (
    SELECT AVG(i2.invoice_amount)
    FROM ap_invoices_all i2
    WHERE i2.vendor_id = i1.vendor_id
);
```

Notice `i1.vendor_id` appears **inside** the subquery. For each outer row,
the inner query recomputes the average **for that specific supplier**, then
compares. This finds invoices priced above average **for their own
supplier**, not above the overall average across every supplier — a much
more useful question in practice. Both queries use two aliases (`i1`,
`i2`) referring to the same table, exactly as a self-join would.

## Key terms

| Term | Meaning |
|---|---|
| Subquery | A SELECT nested inside another statement |
| Scalar subquery | Returns exactly one value; used like a literal |
| Multi-row subquery | Returns many rows; used with `IN`, `ANY`, `ALL` |
| Correlated subquery | References the outer query's current row; re-evaluated per row |

## Lab

Write a correlated subquery that returns every invoice priced above the
average invoice amount **for its own supplier**, using `ap_invoices_all`
aliased twice.

## Check yourself

You're ready for Lesson 17 when you can answer, without looking: what's
the difference between a scalar and a multi-row subquery, and what makes a
subquery "correlated" instead of independent?
