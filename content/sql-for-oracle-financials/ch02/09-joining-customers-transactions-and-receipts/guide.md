# Lesson 9 — Joining Customers, Transactions and Receipts

**Chapter 2 · Joining Financial Tables · Lesson 4 of 5**

## What you'll learn

- The receivables tables: `HZ_CUST_ACCOUNTS`, `RA_CUSTOMER_TRX_ALL`, `AR_RECEIVABLE_APPLICATIONS_ALL`, `AR_CASH_RECEIPTS_ALL`
- Why Fusion models a customer's identity separately from their account
- Chaining four tables together: customer to transaction to applied cash to receipt
- Receivables is a mirror image of the Payables joins you already know

## Four tables on the receivables side

| Table | Role | Key columns |
|---|---|---|
| `HZ_CUST_ACCOUNTS` | The customer **account** | `CUST_ACCOUNT_ID`, `ACCOUNT_NUMBER`, `PARTY_ID` |
| `RA_CUSTOMER_TRX_ALL` | An invoice/transaction to that customer | `CUSTOMER_TRX_ID`, `BILL_TO_CUSTOMER_ID`, `TRX_NUMBER` |
| `AR_RECEIVABLE_APPLICATIONS_ALL` | Which cash receipt paid which transaction | `APPLIED_PAYMENT_SCHEDULE_ID`, `CASH_RECEIPT_ID`, `AMOUNT_APPLIED` |
| `AR_CASH_RECEIPTS_ALL` | The actual cash receipt (the money that came in) | `CASH_RECEIPT_ID`, `RECEIPT_NUMBER`, `RECEIPT_DATE`, `AMOUNT` |

This is the Receivables mirror of the Payables chain from Lesson 7:
transaction (instead of invoice), receipt (instead of check), and an
applications table in the middle (instead of `AP_INVOICE_PAYMENTS_ALL`)
doing the linking.

## Why "customer" splits into HZ_CUST_ACCOUNTS

Fusion models a customer's **identity** (`HZ_PARTIES` — the company or
person) separately from a customer's **account** with you
(`HZ_CUST_ACCOUNTS`) — the same real-world company could, in principle, have
more than one account relationship. For this course, you mostly only need
`HZ_CUST_ACCOUNTS.CUST_ACCOUNT_ID`, which is what `RA_CUSTOMER_TRX_ALL`
actually joins to through `BILL_TO_CUSTOMER_ID`.

```sql
SELECT c.account_number, t.trx_number, t.trx_date
FROM hz_cust_accounts c
INNER JOIN ra_customer_trx_all t
    ON t.bill_to_customer_id = c.cust_account_id;
```

## Chaining to applied cash and the receipt itself

`AR_RECEIVABLE_APPLICATIONS_ALL` links a transaction's **payment schedule**
to the **cash receipt** that paid it — notice the join isn't straight to
`CUSTOMER_TRX_ID`, but through `AR_PAYMENT_SCHEDULES_ALL`'s
`PAYMENT_SCHEDULE_ID`, exactly as you'd expect from a table whose whole job
is tracking "how much of this specific payment schedule has been applied":

```sql
SELECT t.trx_number, r.receipt_number, r.receipt_date, ra.amount_applied
FROM ra_customer_trx_all t
INNER JOIN ar_payment_schedules_all ps
    ON ps.customer_trx_id = t.customer_trx_id
INNER JOIN ar_receivable_applications_all ra
    ON ra.applied_payment_schedule_id = ps.payment_schedule_id
INNER JOIN ar_cash_receipts_all r
    ON r.cash_receipt_id = ra.cash_receipt_id;
```

Four tables, four `ON` conditions, same chaining principle as the Payables
join in Lesson 7 — just with Receivables' own table and column names.

## Key terms

| Term | Meaning |
|---|---|
| `HZ_CUST_ACCOUNTS` | A customer's account record, keyed by `CUST_ACCOUNT_ID` |
| `RA_CUSTOMER_TRX_ALL` | A customer invoice/transaction, keyed by `CUSTOMER_TRX_ID` |
| `AR_PAYMENT_SCHEDULES_ALL` | Tracks what's due/outstanding on a transaction |
| `AR_RECEIVABLE_APPLICATIONS_ALL` | Links a payment schedule to the cash receipt that paid it |
| `AR_CASH_RECEIPTS_ALL` | The actual cash receipt record |

## Lab

Write a query joining `hz_cust_accounts` to `ra_customer_trx_all` that
returns `account_number`, `trx_number` and `trx_date` for every transaction
dated in 2026.

## Check yourself

You're ready for Lesson 10 when you can answer, without looking: which
table does `AR_RECEIVABLE_APPLICATIONS_ALL` actually join to in order to
connect back to a transaction — `RA_CUSTOMER_TRX_ALL` directly, or
`AR_PAYMENT_SCHEDULES_ALL`?
