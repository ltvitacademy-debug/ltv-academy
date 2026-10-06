# Lesson 19 — Finding Duplicates

**Chapter 4 · Subqueries and CTEs · Lesson 4 of 5**

## What you'll learn

- Why duplicate invoices are a real (and costly) Payables risk
- Finding duplicates with `GROUP BY` and `HAVING COUNT(*) > 1`
- Finding duplicates with `ROW_NUMBER()` instead — and why you'd choose it
- The difference between "flagging" duplicates and "listing" them

## Why this matters in Payables

Paying the same invoice twice is one of the most common, most expensive
mistakes in Accounts Payable — a supplier submits the same invoice number
twice (sometimes by accident, sometimes not), and if nothing catches it,
it gets paid twice. Consultants are regularly asked to build exactly this
check.

## Approach 1: GROUP BY and HAVING

```sql
SELECT vendor_id, invoice_num, COUNT(*) AS occurrences
FROM ap_invoices_all
GROUP BY vendor_id, invoice_num
HAVING COUNT(*) > 1;
```

This is the pattern from Lesson 12, applied here: group by the columns
that define "the same invoice" (the same supplier **and** the same
invoice number — a different supplier can legitimately reuse an invoice
number), then keep only the groups with more than one row. This tells you
**which** invoice numbers are duplicated and **how many times**, but not
the individual row details (invoice dates, amounts) for each duplicate.

## Approach 2: ROW_NUMBER() to list every duplicate row

```sql
WITH numbered AS (
    SELECT invoice_id, vendor_id, invoice_num, invoice_date, invoice_amount,
           ROW_NUMBER() OVER (
               PARTITION BY vendor_id, invoice_num
               ORDER BY invoice_id
           ) AS rn
    FROM ap_invoices_all
)
SELECT *
FROM numbered
WHERE rn > 1;
```

`PARTITION BY vendor_id, invoice_num` restarts the numbering for every
distinct supplier/invoice-number combination. The **first** occurrence
(by `invoice_id`) gets `rn = 1`; every row after the first duplicate gets
`rn = 2`, `3`, and so on. Filtering to `rn > 1` returns the actual
duplicate **rows**, with every column intact — exactly what you'd need to
investigate or clean up, unlike the `GROUP BY` version above.

## Choosing between the two

`GROUP BY`/`HAVING` answers "how many duplicates exist, and for which
invoice numbers" — a quick summary. `ROW_NUMBER()` answers "show me the
actual duplicate rows" — what you need to actually act on them. In
practice, consultants often run the `GROUP BY` version first to size the
problem, then the `ROW_NUMBER()` version to investigate the specific rows.

## Key terms

| Term | Meaning |
|---|---|
| `GROUP BY` + `HAVING COUNT(*) > 1` | Finds which key combinations repeat, and how often |
| `ROW_NUMBER()` + `WHERE rn > 1` | Lists the actual duplicate rows beyond the first occurrence |

## Lab

Write both versions of the duplicate-invoice check against
`ap_invoices_all`, partitioned/grouped by `vendor_id` and `invoice_num`,
and compare what each one tells you.

## Check yourself

You're ready for Lesson 20 when you can answer, without looking: why would
you group by both `vendor_id` and `invoice_num` together, rather than
`invoice_num` alone, to check for duplicate invoices?
