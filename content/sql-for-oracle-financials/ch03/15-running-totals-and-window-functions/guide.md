# Lesson 15 — Running Totals and Window Functions

**Chapter 3 · Aggregation and Aging · Lesson 5 of 5**

## What you'll learn

- What a window function is, and how it differs from `GROUP BY`
- `SUM() OVER (...)` for a running total, without collapsing rows
- `ROW_NUMBER()`, `RANK()` and `DENSE_RANK()` with `PARTITION BY`
- Closing out Chapter 3 by combining aggregation with detail rows

## The problem GROUP BY can't solve

`GROUP BY` always collapses rows — one output row per group. But Finance
sometimes wants a running total **alongside** every individual row, not
instead of them: "show me each payment to this supplier, and a running
total as of that payment." A window function does exactly this.

## SUM() OVER: a running total

```sql
SELECT vendor_id, check_date, amount,
       SUM(amount) OVER (
           PARTITION BY vendor_id
           ORDER BY check_date
       ) AS running_total
FROM ap_checks_all
ORDER BY vendor_id, check_date;
```

`OVER (...)` turns `SUM` into a **window function** instead of a regular
aggregate — it computes a sum **per row**, over a defined "window" of
other rows, without collapsing anything. `PARTITION BY vendor_id` restarts
the running total for each new supplier, the same conceptual job
`GROUP BY` does, except every individual row survives in the output.
`ORDER BY check_date` inside the `OVER(...)` tells Oracle which rows count
toward the running total so far — everything up to and including the
current row, in date order.

## ROW_NUMBER, RANK and DENSE_RANK

```sql
SELECT vendor_id, invoice_num, invoice_amount,
       ROW_NUMBER() OVER (PARTITION BY vendor_id ORDER BY invoice_amount DESC) AS rn,
       RANK() OVER (PARTITION BY vendor_id ORDER BY invoice_amount DESC) AS rnk
FROM ap_invoices_all;
```

All three number rows within each `PARTITION BY` group, ordered by the
`ORDER BY` inside `OVER(...)`:

| Function | Behavior on ties |
|---|---|
| `ROW_NUMBER()` | Always unique, 1, 2, 3... even if values tie |
| `RANK()` | Ties share the same rank; the next rank skips ahead |
| `DENSE_RANK()` | Ties share the same rank; the next rank does **not** skip |

`ROW_NUMBER()` is what you'll use most often in this course — for example,
to find "the single largest invoice per supplier" (Chapter 4 does exactly
this).

## Chapter 3, tied together

Chapter 3 built every tool for turning raw rows into a number Finance
trusts: `SUM`/`COUNT` for totals, `GROUP BY` for per-group totals,
`HAVING` for filtering those totals, `CASE` for aging buckets, and now
window functions for running totals and per-group ranking — all without
losing the individual rows when you don't want to.

## Key terms

| Term | Meaning |
|---|---|
| Window function | Computes a value per row, over a defined window of other rows, without collapsing them |
| `PARTITION BY` | Restarts the window's calculation for each group — like GROUP BY, but rows survive |
| `ROW_NUMBER()` | Unique sequential number within each partition |
| `RANK()` / `DENSE_RANK()` | Ranking functions that handle ties differently |

## Lab

Write a query against `ap_invoices_all` returning `vendor_id`,
`invoice_num`, `invoice_amount`, and `ROW_NUMBER() OVER (PARTITION BY
vendor_id ORDER BY invoice_amount DESC)` as `rn`.

## Check yourself

You're ready for Chapter 4 when you can answer, without looking: what's
the key difference between what `GROUP BY` does to your rows and what a
window function with `PARTITION BY` does, and how do `RANK()` and
`DENSE_RANK()` differ when two rows tie?
