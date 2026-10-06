# Lesson 21 — Reconciling Transactions with SQL

**Chapter 5 · Investigating Financial Data · Lesson 1 of 5**

## What you'll learn

- What "reconciliation" actually means as a SQL task
- Comparing an invoice's recorded amount to what was actually paid
- Comparing a cash receipt's amount to what was actually applied
- The general reconciliation pattern you'll reuse all chapter

## Reconciliation, defined for SQL purposes

Reconciliation means confirming that two numbers that **should** agree
actually **do** agree — and if they don't, finding exactly where they
diverge. In SQL terms, it's almost always: join two things that represent
the same economic event from two different angles, then compare.

## Invoice amount vs. amount actually paid

```sql
SELECT i.invoice_num, i.invoice_amount,
       NVL(SUM(ip.amount), 0) AS total_paid,
       i.invoice_amount - NVL(SUM(ip.amount), 0) AS difference
FROM ap_invoices_all i
LEFT OUTER JOIN ap_invoice_payments_all ip
    ON ip.invoice_id = i.invoice_id
GROUP BY i.invoice_num, i.invoice_amount
HAVING i.invoice_amount - NVL(SUM(ip.amount), 0) <> 0;
```

This brings together several chapters at once: `LEFT OUTER JOIN` (Lesson
8) so invoices with zero payments still appear, `NVL` (Lesson 5) so an
unpaid invoice's `SUM` doesn't come back `NULL` and silently break the
subtraction, `GROUP BY` (Lesson 11) to collapse multiple payment rows per
invoice, and `HAVING` (Lesson 12) to keep only the invoices where the
difference **isn't zero** — a fully paid invoice has `difference = 0` and
drops out, which is exactly what you want: reconciliation reports should
surface exceptions, not everything.

## Cash receipt amount vs. amount applied

The mirror image, on Receivables:

```sql
SELECT r.receipt_number, r.amount AS receipt_amount,
       NVL(SUM(ra.amount_applied), 0) AS total_applied,
       r.amount - NVL(SUM(ra.amount_applied), 0) AS unapplied_amount
FROM ar_cash_receipts_all r
LEFT OUTER JOIN ar_receivable_applications_all ra
    ON ra.cash_receipt_id = r.cash_receipt_id
GROUP BY r.receipt_number, r.amount
HAVING r.amount - NVL(SUM(ra.amount_applied), 0) <> 0;
```

A cash receipt with money left unapplied (`unapplied_amount <> 0`) is a
real, common finance problem — cash that came in but hasn't been matched
to an invoice yet, which means the customer's balance doesn't reflect the
payment they already made.

## The general pattern

1. Identify the two things that should reconcile (invoice ↔ payments total,
   receipt ↔ applications total).
2. `LEFT OUTER JOIN` from the "should have a match" side, so zero-match
   rows survive.
3. `NVL`-guard any `SUM` that could be `NULL` before subtracting.
4. `GROUP BY` the identifying columns, `HAVING` the difference `<> 0`.

You'll reuse this exact shape for the rest of this chapter.

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation | Confirming two numbers that should agree actually do, and flagging where they don't |
| `difference <> 0` in `HAVING` | The standard way to surface only the exceptions |

## Lab

Run the invoice-vs-paid reconciliation query above against
`ap_invoices_all`, and separately identify: fully paid invoices
(`difference = 0`, filtered out already) vs. partially paid vs. completely
unpaid, by comparing `total_paid` to `0` and to `invoice_amount`.

## Check yourself

You're ready for Lesson 22 when you can answer, without looking: why does
the reconciliation query use `LEFT OUTER JOIN` instead of `INNER JOIN`, and
why is `NVL` necessary before the subtraction in `HAVING`?
