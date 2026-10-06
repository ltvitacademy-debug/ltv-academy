# Lesson 18 — Finding Missing Records with NOT EXISTS

**Chapter 4 · Subqueries and CTEs · Lesson 3 of 5**

## What you'll learn

- `EXISTS` and `NOT EXISTS` — testing for presence, not matching values
- Why `NOT EXISTS` is usually safer than `NOT IN` once `NULL`s are involved
- Rewriting Lesson 8's outer-join pattern with `NOT EXISTS`
- Choosing between the outer-join and `NOT EXISTS` approaches

## EXISTS: does at least one row match?

```sql
SELECT s.vendor_name
FROM poz_suppliers s
WHERE EXISTS (
    SELECT 1
    FROM ap_invoices_all i
    WHERE i.vendor_id = s.vendor_id
);
```

`EXISTS` doesn't care **what** the subquery returns — only **whether it
returns any row at all**. `SELECT 1` is a common convention, since the
actual column list is irrelevant; Oracle stops as soon as it finds one
matching row. This returns every supplier with at least one invoice —
functionally similar to Lesson 6's `INNER JOIN`, but phrased as a
presence test instead of a join.

## NOT EXISTS: the missing-record pattern

```sql
SELECT s.vendor_name
FROM poz_suppliers s
WHERE NOT EXISTS (
    SELECT 1
    FROM ap_invoices_all i
    WHERE i.vendor_id = s.vendor_id
);
```

This is the direct alternative to Lesson 8's `LEFT OUTER JOIN ... WHERE ...
IS NULL` pattern — same result, suppliers with zero invoices, but read as
"a supplier for which no matching invoice exists" rather than "a supplier
joined to a NULL invoice." Both are correct and both appear constantly in
real Oracle Financials code; many consultants find `NOT EXISTS` reads more
directly as the business question being asked.

## Why NOT EXISTS beats NOT IN once NULLs are in play

```sql
-- DANGEROUS if invoice_payments.invoice_id can ever be NULL
SELECT invoice_num
FROM ap_invoices_all
WHERE invoice_id NOT IN (
    SELECT invoice_id FROM ap_invoice_payments_all
);
```

If even **one** row in the subquery's `invoice_id` column is `NULL`,
`NOT IN` returns **no rows at all** — not an error, just a silent, total
failure, because comparing anything to a `NULL` with `<>` (which is what
`NOT IN` does internally) is never true. `NOT EXISTS` has no such trap —
it only asks whether a matching row exists, so a stray `NULL` in the
subquery's result never corrupts the whole comparison:

```sql
-- SAFE regardless of NULLs in the subquery
SELECT invoice_num
FROM ap_invoices_all i
WHERE NOT EXISTS (
    SELECT 1 FROM ap_invoice_payments_all ip
    WHERE ip.invoice_id = i.invoice_id
);
```

This course uses `NOT EXISTS` over `NOT IN` for exactly this reason.

## Outer join vs. NOT EXISTS: which to use

Both approaches return the same rows for "missing" questions. Prefer
`LEFT OUTER JOIN ... IS NULL` when you also need columns from the
"right" table for matched rows in the **same** query; prefer `NOT EXISTS`
when all you need is the presence/absence test itself — it tends to read
more clearly as exactly that.

## Key terms

| Term | Meaning |
|---|---|
| `EXISTS` | True if the subquery returns at least one row |
| `NOT EXISTS` | True if the subquery returns zero rows |
| `NOT IN` pitfall | Silently returns no rows if the subquery's column contains any NULL |

## Lab

Rewrite Lesson 8's "invoices with no payment yet" query using
`NOT EXISTS` instead of `LEFT OUTER JOIN ... IS NULL`, and confirm it
returns the same invoices.

## Check yourself

You're ready for Lesson 19 when you can answer, without looking: why can
`NOT IN` silently return zero rows when the subquery's column contains a
`NULL`, and why doesn't `NOT EXISTS` have that problem?
