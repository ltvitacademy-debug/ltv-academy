# Lesson 11 — Totals with SUM, COUNT and GROUP BY

**Chapter 3 · Aggregation and Aging · Lesson 1 of 5**

## What you'll learn

- `SUM` and `COUNT` — collapsing many rows into one number
- `GROUP BY` — one total per supplier instead of one total overall
- The rule: every non-aggregated `SELECT` column must appear in `GROUP BY`
- Solving Lesson 7's multi-row problem: one row per invoice, totaled

## One number for everything

```sql
SELECT SUM(invoice_amount) AS total_invoiced
FROM ap_invoices_all;
```

`SUM` adds up every value in a column across every row that reaches it.
Without `GROUP BY`, you get exactly **one row back** — the grand total
across the whole table (or whatever `WHERE` narrowed it to).

```sql
SELECT COUNT(*) AS invoice_count
FROM ap_invoices_all
WHERE payment_status_flag <> 'Y';
```

`COUNT(*)` counts rows, not values in a particular column — this returns
how many invoices are not fully paid.

## GROUP BY: one number per group

Finance almost never wants one number for the entire company — it wants one
number **per supplier**, or **per period**. That's `GROUP BY`:

```sql
SELECT vendor_id, SUM(invoice_amount) AS total_invoiced, COUNT(*) AS invoice_count
FROM ap_invoices_all
GROUP BY vendor_id;
```

Think of it in three steps: **split** the rows into groups, one per
distinct `vendor_id`; **aggregate** `SUM` and `COUNT` separately within
each group; **combine** into one result row per group. The result has
exactly one row per distinct `vendor_id` that appears in the table.

## The rule that causes every beginner's error

```sql
-- ERROR: invoice_num isn't aggregated and isn't in GROUP BY
SELECT vendor_id, invoice_num, SUM(invoice_amount)
FROM ap_invoices_all
GROUP BY vendor_id;
```

Once Oracle has grouped rows by `vendor_id`, `invoice_num` varies **within**
each group — there's no single, unambiguous `invoice_num` to show per
group, so Oracle rejects the query outright. Every column in `SELECT` must
be either wrapped in an aggregate function (`SUM`, `COUNT`, `AVG`, `MIN`,
`MAX`) or listed in `GROUP BY` itself.

## Solving Lesson 7's problem: one row per invoice

Recall from Lesson 7 that joining invoices to payments can return multiple
rows per invoice, one per check. `GROUP BY` collapses that back down:

```sql
SELECT i.invoice_num, SUM(ip.amount) AS total_paid
FROM ap_invoices_all i
INNER JOIN ap_invoice_payments_all ip
    ON ip.invoice_id = i.invoice_id
GROUP BY i.invoice_num;
```

Now each invoice appears exactly once, with every check applied to it
added together into `total_paid` — the join still produces multiple rows
under the hood, but `GROUP BY` folds them back into one row per invoice
before the result reaches you.

## Key terms

| Term | Meaning |
|---|---|
| `SUM(column)` | Adds up values across the rows it sees |
| `COUNT(*)` | Counts rows |
| `GROUP BY` | Splits rows into groups, aggregates within each, one result row per group |
| Group | A set of rows sharing the same `GROUP BY` value(s) |

## Lab

Write a query against `ap_invoices_all` returning `vendor_id`,
`SUM(invoice_amount)` and `COUNT(*)`, grouped by `vendor_id`, for invoices
where `payment_status_flag <> 'Y'` — your first per-supplier outstanding
total.

## Check yourself

You're ready for Lesson 12 when you can answer, without looking: what are
the three conceptual steps `GROUP BY` performs, and why must every
non-aggregated `SELECT` column also appear in `GROUP BY`?
