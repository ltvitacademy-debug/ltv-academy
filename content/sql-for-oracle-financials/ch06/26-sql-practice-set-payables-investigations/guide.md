# Lesson 26 — SQL Practice Set: Payables Investigations

**Chapter 6 · Practice Sets · Lesson 1 of 5**

## What you'll learn

This lesson is three independent Payables investigations, each framed the
way Finance would actually ask it, each solved with tools from across this
course. Work each one out yourself before reading the solution.

## Investigation 1: "Which suppliers are we most exposed to right now?"

**The ask:** the top 5 suppliers by total outstanding (unpaid) balance.

```sql
SELECT s.vendor_name, SUM(ps.amount_remaining) AS total_outstanding
FROM poz_suppliers s
INNER JOIN ap_invoices_all i
    ON i.vendor_id = s.vendor_id
INNER JOIN ap_payment_schedules_all ps
    ON ps.invoice_id = i.invoice_id
WHERE ps.amount_remaining > 0
GROUP BY s.vendor_name
ORDER BY total_outstanding DESC
FETCH FIRST 5 ROWS ONLY;
```

Three chapters at once: the join chain from Chapter 2, `GROUP BY`/`SUM`
from Chapter 3, and `FETCH FIRST` from Chapter 1 to cap the result at the
top 5.

## Investigation 2: "Did we pay any single invoice more than once?"

**The ask:** invoices where the sum of all payments applied to them
doesn't just exceed the invoice amount, but does so by enough to suspect
an outright duplicate payment, not just a small overpayment.

```sql
SELECT i.invoice_num, i.invoice_amount, SUM(ip.amount) AS total_paid
FROM ap_invoices_all i
INNER JOIN ap_invoice_payments_all ip
    ON ip.invoice_id = i.invoice_id
GROUP BY i.invoice_num, i.invoice_amount
HAVING SUM(ip.amount) >= i.invoice_amount * 2;
```

A close variant of Lesson 22's overpayment check, but the threshold
(`>= invoice_amount * 2`) is deliberately tuned to catch the specific
pattern of "paid twice," not every minor overpayment.

## Investigation 3: "Are any of our active suppliers missing a remit-to site?"

**The ask:** suppliers with at least one invoice, but where that invoice
has no `vendor_site_id` recorded — a data-quality gap that can block
payment processing entirely.

```sql
SELECT DISTINCT s.vendor_name, i.invoice_num
FROM poz_suppliers s
INNER JOIN ap_invoices_all i
    ON i.vendor_id = s.vendor_id
WHERE i.vendor_site_id IS NULL;
```

Chapter 1's `IS NULL` check (Lesson 5), applied to a real investigation
rather than a toy example.

## Key terms

| Term | Meaning |
|---|---|
| Practice set | A set of realistic investigations combining tools from across the course |

## Lab

Before moving to Lesson 27, write your own fourth investigation: "which
suppliers had an invoice dated in the last 90 days with no payment at all
applied yet?" — combine what you've learned about dates (Chapter 1), joins
(Chapter 2), and `NOT EXISTS` (Chapter 4).

## Check yourself

You're ready for Lesson 27 when you can answer, without looking: which
chapters' tools did each of the three investigations in this lesson draw
on, and why does Investigation 2 use `>= invoice_amount * 2` instead of
simply `> invoice_amount`?
