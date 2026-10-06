# Lesson 22 — Identifying Exceptions

**Chapter 5 · Investigating Financial Data · Lesson 2 of 5**

## What you'll learn

- The difference between "doesn't reconcile" and "looks wrong on its own"
- Finding negative or zero amounts that shouldn't exist
- Finding invoices paid for more than their invoiced amount
- Combining several exception checks into one report with `UNION ALL`

## Two different kinds of problems

Lesson 21 found numbers that **disagree with each other**. This lesson is
about numbers that look suspicious **on their own**, without needing a
second table to compare against — data-quality red flags a consultant
checks routinely, independent of any specific reconciliation.

## Negative or zero amounts that shouldn't exist

```sql
SELECT invoice_num, invoice_amount
FROM ap_invoices_all
WHERE invoice_amount <= 0;
```

A normal invoice amount should be positive (credit memos are a separate,
intentional case, usually flagged by `INVOICE_TYPE_LOOKUP_CODE`, not by a
negative `INVOICE_AMOUNT`). Zero or negative invoice amounts where none
were expected are a classic sign of a data entry error or an incomplete
import.

## Overpayment: paid more than invoiced

```sql
SELECT i.invoice_num, i.invoice_amount, SUM(ip.amount) AS total_paid
FROM ap_invoices_all i
INNER JOIN ap_invoice_payments_all ip
    ON ip.invoice_id = i.invoice_id
GROUP BY i.invoice_num, i.invoice_amount
HAVING SUM(ip.amount) > i.invoice_amount;
```

This is a close cousin of Lesson 21's pattern, but notice the `HAVING`
condition isn't `<> 0` — it's specifically `>`, because here you only care
about one **direction** of the discrepancy: paying **more** than was
invoiced, which is the more operationally urgent exception to catch
quickly (an underpayment is often just "not fully paid yet"; an
overpayment usually means money needs to be recovered).

## Combining checks into one exception report

```sql
SELECT 'Negative/Zero Amount' AS exception_type, invoice_num, invoice_amount
FROM ap_invoices_all
WHERE invoice_amount <= 0

UNION ALL

SELECT 'Overpaid' AS exception_type, i.invoice_num, i.invoice_amount
FROM ap_invoices_all i
INNER JOIN ap_invoice_payments_all ip ON ip.invoice_id = i.invoice_id
GROUP BY i.invoice_num, i.invoice_amount
HAVING SUM(ip.amount) > i.invoice_amount;
```

`UNION ALL` from Lesson 20 combines several different exception checks
into a single result, each row labeled with which check flagged it
(`exception_type`) — a common real-world report shape: one query, several
independent rules, each contributing its own rows.

## Key terms

| Term | Meaning |
|---|---|
| Data-quality exception | A value that looks wrong on its own, without needing a second table |
| Reconciliation exception | Two numbers that should agree but don't (Lesson 21) |

## Lab

Add a third exception check to the combined query above: invoices where
`vendor_site_id IS NULL` (from Lesson 5's data-quality lesson), labeled
`'Missing Vendor Site'`.

## Check yourself

You're ready for Lesson 23 when you can answer, without looking: what's
the difference between a data-quality exception and a reconciliation
exception, and why does the overpayment check use `HAVING SUM(ip.amount) >
i.invoice_amount` instead of `<> 0`?
