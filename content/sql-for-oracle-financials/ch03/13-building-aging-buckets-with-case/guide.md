# Lesson 13 — Building Aging Buckets with CASE

**Chapter 3 · Aggregation and Aging · Lesson 3 of 5**

## What you'll learn

- `CASE WHEN ... THEN ... END` — Oracle's conditional expression
- Building the standard AP/AR aging buckets: Current, 1-30, 31-60, 61-90, 90+
- Combining `CASE` with `GROUP BY` to total by bucket, not just by row
- Why aging buckets are the single most common finance report structure

## CASE: a conditional expression, not a statement

```sql
SELECT invoice_num,
       TRUNC(SYSDATE) - due_date AS days_overdue,
       CASE
           WHEN TRUNC(SYSDATE) - due_date <= 0 THEN 'Current'
           WHEN TRUNC(SYSDATE) - due_date BETWEEN 1 AND 30 THEN '1-30 Days'
           WHEN TRUNC(SYSDATE) - due_date BETWEEN 31 AND 60 THEN '31-60 Days'
           WHEN TRUNC(SYSDATE) - due_date BETWEEN 61 AND 90 THEN '61-90 Days'
           ELSE '90+ Days'
       END AS aging_bucket
FROM ap_payment_schedules_all
WHERE amount_remaining > 0;
```

`CASE` evaluates each `WHEN` condition **in order**, top to bottom, and
returns the result of the first one that's true. `ELSE` catches everything
that didn't match any `WHEN` — here, anything over 90 days overdue. This is
the standard five-bucket aging structure used across essentially every
Payables and Receivables aging report in the industry, not something
specific to Oracle.

## Why order matters in CASE

```sql
-- Still correct, but notice the BETWEENs must be mutually exclusive
WHEN TRUNC(SYSDATE) - due_date <= 0 THEN 'Current'
WHEN TRUNC(SYSDATE) - due_date BETWEEN 1 AND 30 THEN '1-30 Days'
```

Because `CASE` stops at the **first** matching `WHEN`, overlapping ranges
would silently produce the wrong bucket for some rows — always double-check
that your boundary conditions (`<= 0`, `BETWEEN 1 AND 30`, etc.) don't
overlap and don't leave gaps.

## Totaling by bucket, not just labeling rows

A label alone isn't a report — Finance wants a dollar total **per bucket**.
Combine the `CASE` expression with `GROUP BY`:

```sql
SELECT
    CASE
        WHEN TRUNC(SYSDATE) - due_date <= 0 THEN 'Current'
        WHEN TRUNC(SYSDATE) - due_date BETWEEN 1 AND 30 THEN '1-30 Days'
        WHEN TRUNC(SYSDATE) - due_date BETWEEN 31 AND 60 THEN '31-60 Days'
        WHEN TRUNC(SYSDATE) - due_date BETWEEN 61 AND 90 THEN '61-90 Days'
        ELSE '90+ Days'
    END AS aging_bucket,
    SUM(amount_remaining) AS total_outstanding
FROM ap_payment_schedules_all
WHERE amount_remaining > 0
GROUP BY
    CASE
        WHEN TRUNC(SYSDATE) - due_date <= 0 THEN 'Current'
        WHEN TRUNC(SYSDATE) - due_date BETWEEN 1 AND 30 THEN '1-30 Days'
        WHEN TRUNC(SYSDATE) - due_date BETWEEN 31 AND 60 THEN '31-60 Days'
        WHEN TRUNC(SYSDATE) - due_date BETWEEN 61 AND 90 THEN '61-90 Days'
        ELSE '90+ Days'
    END;
```

Notice `GROUP BY` repeats the **exact same** `CASE` expression — Oracle
groups by the expression's result, which means the expression has to
appear in full in `GROUP BY` too (Lesson 17's CTEs will show you a cleaner
way to avoid repeating it).

## Key terms

| Term | Meaning |
|---|---|
| `CASE WHEN ... THEN ... ELSE ... END` | Returns the result of the first matching WHEN, or ELSE if none match |
| Aging bucket | A standard range of days overdue (Current, 1-30, 31-60, 61-90, 90+) |

## Lab

Write the full aging-bucket query above against `ap_payment_schedules_all`,
then add `ORDER BY total_outstanding DESC` to see which bucket holds the
most money.

## Check yourself

You're ready for Lesson 14 when you can answer, without looking: why does
the order of `WHEN` conditions in a `CASE` expression matter, and why must
`GROUP BY` repeat the full `CASE` expression rather than referring to its
alias?
