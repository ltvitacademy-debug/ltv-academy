# Lesson 24 — Tracing a Payment Back to the Invoice

**Chapter 5 · Investigating Financial Data · Lesson 4 of 5**

## What you'll learn

- The difference between a "list" question and a "trace" question
- Starting from a payment and walking backward to the invoice and supplier
- Doing the same trace on Receivables: a receipt back to the transaction
- Why audit trails usually start from the opposite end of a normal report

## A different shape of question

Every query so far in this course starts from a condition and finds the
rows that match it — a **list**. An audit trail is different: it starts
from **one specific, known record** (a check number, a receipt number) and
walks backward through the joins to answer "what was this for?" The joins
are identical to Chapter 2's; only the starting point and the intent
change.

## Starting from a check number

```sql
SELECT c.check_number, c.check_date, c.amount AS check_amount,
       s.vendor_name,
       i.invoice_num, i.invoice_date, i.invoice_amount,
       ip.amount AS amount_applied_to_this_invoice
FROM ap_checks_all c
INNER JOIN ap_invoice_payments_all ip
    ON ip.check_id = c.check_id
INNER JOIN ap_invoices_all i
    ON i.invoice_id = ip.invoice_id
INNER JOIN poz_suppliers s
    ON s.vendor_id = i.vendor_id
WHERE c.check_number = '100542';
```

Notice the chain runs in the **opposite direction** from Lesson 7's
original invoice-to-payment join: here you start at `AP_CHECKS_ALL` and
work backward through `AP_INVOICE_PAYMENTS_ALL` to `AP_INVOICES_ALL`, then
out to `POZ_SUPPLIERS` for the name. If this check paid more than one
invoice (recall Lesson 7: one check can pay multiple invoices), this query
correctly returns one row per invoice the check actually paid.

## The same trace, on Receivables

```sql
SELECT r.receipt_number, r.receipt_date, r.amount AS receipt_amount,
       c.account_number,
       t.trx_number, t.trx_date,
       ra.amount_applied
FROM ar_cash_receipts_all r
INNER JOIN ar_receivable_applications_all ra
    ON ra.cash_receipt_id = r.cash_receipt_id
INNER JOIN ar_payment_schedules_all ps
    ON ps.payment_schedule_id = ra.applied_payment_schedule_id
INNER JOIN ra_customer_trx_all t
    ON t.customer_trx_id = ps.customer_trx_id
INNER JOIN hz_cust_accounts c
    ON c.cust_account_id = t.bill_to_customer_id
WHERE r.receipt_number = 'RCPT-88213';
```

Same idea, mirrored: start at the cash receipt, walk through applications
and payment schedules to the transaction, then out to the customer
account. This is exactly Lesson 9's chain, just traversed starting from
the opposite end.

## Why this matters

When an auditor or a supplier disputes "what was check 100542 actually
for?", a consultant who can write this trace in under a minute — instead
of searching through screens — looks like they actually understand the
data model, not just the UI.

## Key terms

| Term | Meaning |
|---|---|
| Audit trail / trace query | Starts from one known record, walks backward through joins to its origin |
| List query | Starts from a condition, returns every row that matches |

## Lab

Write the check-trace query above, but starting from a receipt number
instead — adapt it to answer "what invoice(s) did receipt `RCPT-88213`
actually pay?"

## Check yourself

You're ready for Lesson 25 when you can answer, without looking: how does
a trace query's starting point differ from a list query's, and why might
a single check or receipt trace produce more than one output row?
