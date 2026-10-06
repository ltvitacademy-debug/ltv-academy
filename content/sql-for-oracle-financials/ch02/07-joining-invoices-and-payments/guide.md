# Lesson 7 — Joining Invoices and Payments

**Chapter 2 · Joining Financial Tables · Lesson 2 of 5**

## What you'll learn

- `AP_INVOICE_PAYMENTS_ALL` and `AP_CHECKS_ALL` — how a paid invoice connects to the actual payment
- Joining three tables in one query
- Why a single invoice can have more than one row on the "payments" side
- `AP_PAYMENT_SCHEDULES_ALL` — the table that tracks what's still owed

## Three tables behind "how was this invoice paid?"

| Table | Role | Key columns |
|---|---|---|
| `AP_INVOICES_ALL` | The invoice itself | `INVOICE_ID`, `INVOICE_NUM`, `INVOICE_AMOUNT` |
| `AP_INVOICE_PAYMENTS_ALL` | Links an invoice to a payment | `INVOICE_ID`, `CHECK_ID`, `AMOUNT` |
| `AP_CHECKS_ALL` | The actual payment (check or EFT) | `CHECK_ID`, `CHECK_NUMBER`, `CHECK_DATE`, `AMOUNT` |

`AP_INVOICE_PAYMENTS_ALL` is a **linking table** — it exists specifically to
connect one invoice to one payment, because the relationship between the
two isn't as simple as "one invoice, one payment." An invoice can be paid
across more than one check (a partial payment followed by a final payment),
and a single check run can pay multiple invoices for the same supplier in
one payment — that's why this join needs a table in the middle rather than
a direct link.

## Joining three tables in one query

```sql
SELECT i.invoice_num, i.invoice_amount,
       c.check_number, c.check_date, ip.amount AS amount_on_this_check
FROM ap_invoices_all i
INNER JOIN ap_invoice_payments_all ip
    ON ip.invoice_id = i.invoice_id
INNER JOIN ap_checks_all c
    ON c.check_id = ip.check_id;
```

Each `INNER JOIN` adds one more table into the chain, each with its own
`ON` condition. Read it as a sequence: start with invoices, join to the
linking table on `INVOICE_ID`, then join from the linking table to checks
on `CHECK_ID`. Oracle doesn't care which table you list first as long as
every `ON` condition correctly connects the tables involved.

## Why one invoice can produce multiple result rows

If invoice `5001` was partially paid by check `9001` and the remainder paid
later by check `9002`, this query returns **two rows** for invoice `5001` —
one per check. That's expected and correct: the join reflects reality, one
row per invoice-to-check relationship that actually happened. If you want
one row per invoice instead, summing payments across checks, you'll use
`GROUP BY` — covered in Chapter 3.

## AP_PAYMENT_SCHEDULES_ALL: what's still owed

```sql
SELECT i.invoice_num, ps.due_date, ps.amount_remaining
FROM ap_invoices_all i
INNER JOIN ap_payment_schedules_all ps
    ON ps.invoice_id = i.invoice_id;
```

`AP_PAYMENT_SCHEDULES_ALL` tracks the **schedule** side — when each
installment is due (`DUE_DATE`) and how much is still unpaid
(`AMOUNT_REMAINING`), independent of whether a check has actually been cut
yet. This table, not `AP_CHECKS_ALL`, is where the unpaid-invoices challenge
will eventually get its "how much is still outstanding" number from.

## Key terms

| Term | Meaning |
|---|---|
| Linking table | A table that exists to connect two other tables in a many-to-many-style relationship |
| `AP_INVOICE_PAYMENTS_ALL` | Links invoices to the checks that paid them |
| `AP_CHECKS_ALL` | The actual payment record |
| `AP_PAYMENT_SCHEDULES_ALL` | Tracks due dates and remaining amounts owed |

## Lab

Write a query joining `ap_invoices_all` to `ap_payment_schedules_all` that
returns `invoice_num`, `due_date` and `amount_remaining` for every
installment where `amount_remaining > 0`.

## Check yourself

You're ready for Lesson 8 when you can answer, without looking: why can a
single invoice produce more than one row when joined to
`ap_invoice_payments_all`, and which table tracks what's still owed
regardless of whether a check has been cut?
