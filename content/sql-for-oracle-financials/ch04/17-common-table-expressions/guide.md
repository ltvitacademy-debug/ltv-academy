# Lesson 17 — Common Table Expressions

**Chapter 4 · Subqueries and CTEs · Lesson 2 of 5**

## What you'll learn

- `WITH` — naming a subquery so you can reference it like a table
- Solving Lesson 13's repeated-CASE problem with a CTE
- Chaining multiple CTEs in one `WITH` clause
- Why CTEs read top-to-bottom, unlike a nested nest of subqueries

## WITH: giving a subquery a name

```sql
WITH overdue_invoices AS (
    SELECT i.invoice_num, i.vendor_id, ps.amount_remaining, ps.due_date
    FROM ap_invoices_all i
    INNER JOIN ap_payment_schedules_all ps
        ON ps.invoice_id = i.invoice_id
    WHERE ps.amount_remaining > 0
)
SELECT vendor_id, SUM(amount_remaining) AS total_overdue
FROM overdue_invoices
GROUP BY vendor_id;
```

A **Common Table Expression** (CTE) is a named, temporary result set,
defined with `WITH ... AS (...)`, that you can then query **as if it were
a real table** in the main query below it. Here, `overdue_invoices` isn't
a table that exists in the database — it only exists for the duration of
this one query — but after it's defined, `FROM overdue_invoices` reads
exactly like querying any other table.

## Solving the repeated-CASE problem from Lesson 13

Recall Lesson 13's aging-bucket query had to repeat the entire `CASE`
expression in both `SELECT` and `GROUP BY`. A CTE fixes that:

```sql
WITH bucketed AS (
    SELECT invoice_num, amount_remaining,
        CASE
            WHEN TRUNC(SYSDATE) - due_date <= 0 THEN 'Current'
            WHEN TRUNC(SYSDATE) - due_date BETWEEN 1 AND 30 THEN '1-30 Days'
            WHEN TRUNC(SYSDATE) - due_date BETWEEN 31 AND 60 THEN '31-60 Days'
            WHEN TRUNC(SYSDATE) - due_date BETWEEN 61 AND 90 THEN '61-90 Days'
            ELSE '90+ Days'
        END AS aging_bucket
    FROM ap_payment_schedules_all
    WHERE amount_remaining > 0
)
SELECT aging_bucket, SUM(amount_remaining) AS total_outstanding
FROM bucketed
GROUP BY aging_bucket
ORDER BY total_outstanding DESC;
```

The `CASE` expression is computed **once**, inside the CTE, and given the
alias `aging_bucket`. The outer query just groups by that alias, like any
ordinary column — no repetition.

## Chaining multiple CTEs

A single `WITH` can define more than one CTE, each able to reference the
ones defined before it:

```sql
WITH supplier_totals AS (
    SELECT vendor_id, SUM(invoice_amount) AS total_invoiced
    FROM ap_invoices_all
    GROUP BY vendor_id
),
big_suppliers AS (
    SELECT vendor_id, total_invoiced
    FROM supplier_totals
    WHERE total_invoiced > 100000
)
SELECT s.vendor_name, b.total_invoiced
FROM big_suppliers b
INNER JOIN poz_suppliers s
    ON s.vendor_id = b.vendor_id
ORDER BY b.total_invoiced DESC;
```

`big_suppliers` builds directly on `supplier_totals` — separate `AS (...)`
blocks, separated by a comma, each one readable and testable on its own.

## Why CTEs read better than nested subqueries

A deeply nested subquery forces you to read from the **inside out** to
understand it. A chain of CTEs reads **top to bottom**, each one named for
what it represents — far closer to how you'd actually explain the logic to
another consultant.

## Key terms

| Term | Meaning |
|---|---|
| CTE | A named, temporary result set defined with `WITH ... AS (...)` |
| `WITH` | Introduces one or more CTEs before the main query |

## Lab

Rewrite Lesson 13's full aging-bucket-with-totals query using a CTE named
`bucketed`, as shown above, and confirm it returns the same totals.

## Check yourself

You're ready for Lesson 18 when you can answer, without looking: what
problem from Lesson 13 does a CTE solve, and why does a chain of CTEs tend
to read more clearly than a deeply nested subquery?
