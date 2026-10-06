# Lesson 9 — Joining Customers, Transactions and Receipts · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Receivables mirrors everything you just learned on the Payables side —
same chaining logic, different tables. Customer, transaction, cash
receipt, and a linking table in between.

## S2 · STEPS CARD (four receivables tables)

Four tables: H-Z Cust Accounts for the customer's account, R-A Customer Trx
All for a transaction to that customer, A-R Receivable Applications All
linking a payment schedule to the cash that paid it, and A-R Cash Receipts
All for the actual money that came in.

## S3 · CODE CARD (customer to transaction)

Why does "customer" split into its own account table? Fusion keeps a
customer's identity separate from their account relationship with you.
Select account number, transaction number, transaction date. From cust
accounts, inner join customer trx all, on bill-to-customer-id equals
cust-account-id.

## S4 · CODE CARD (chaining to applied cash and receipt)

Now chain further. Transaction, to payment schedules, to receivable
applications, to the cash receipt itself. Notice applications doesn't join
straight to the transaction — it joins through the payment schedule's own
ID, because its whole job is tracking how much of that specific schedule
has been applied.

## S5 · STEPS CARD (same principle, different names)

Four tables, four ON conditions — exactly the same chaining principle from
the Payables join in lesson 7. Different table names, same mental model:
start at the customer, chain forward link by link to the money.

## S6 · OUTRO CARD

Receivables isn't a new skill — it's the same joins, aimed at a mirror set
of tables. Next lesson: journals, ledgers, and periods, on the General
Ledger side.
