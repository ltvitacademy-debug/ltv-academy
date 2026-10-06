# Lesson 36 — Accounting for Payables Transactions

**Chapter 7 · Accounting, Reconciliation and Close · Lesson 36 of 42**

## What you'll learn

- What Subledger Accounting (SLA) is and where it sits in the architecture
- Which Payables events actually generate accounting entries
- The basic journal pattern for an invoice and for a payment
- Why the accounting is rules-driven, not hardcoded

## Subledger Accounting: the engine behind every journal

Every transaction covered so far in this course — an invoice, a payment, a credit memo, a prepayment — eventually has to turn into a double-entry accounting journal in the general ledger. In Oracle Fusion, that translation isn't handled by Payables directly; it's handled by a shared engine called **Subledger Accounting (SLA)**, used by every subledger (Payables, Receivables, Fixed Assets, and so on) rather than each one building its own accounting logic.

SLA works from **accounting rules** tied to an **accounting method**, assigned to a ledger. Those rules define which accounts get debited and credited for a given type of **accounting event** — not hardcoded account numbers buried in code, but configurable rules an implementation team sets up once, per ledger.

## Which events generate accounting

Not every action in Payables creates an accounting entry — only specific **accounting events** do:

| Event | What it generates |
|---|---|
| **Invoice validation** | Debits an expense or asset account, credits the AP liability account |
| **Payment** | Debits the AP liability account, credits the cash/bank account |
| **Prepayment application** | Reclassifies between a prepayment asset account and the liability/expense it offsets |

## The basic journal pattern

### At invoice validation

**Cascade Industrial Parts** (fictional, reused from Lesson 23) invoices $1,250 for bearing assemblies, matched and validated with no holds.

| Account | Debit | Credit |
|---|---|---|
| Inventory / Expense | $1,250 | |
| Accounts Payable Liability | | $1,250 |

### At payment

When that invoice is later paid by EFT:

| Account | Debit | Credit |
|---|---|---|
| Accounts Payable Liability | $1,250 | |
| Cash / Bank | | $1,250 |

Two separate accounting events, two separate journals — the liability is recognized when the invoice validates, and it's cleared only when the payment actually happens. This is also why an unpaid, validated invoice shows up as a liability on the balance sheet: the expense already happened in the accounting sense, even though cash hasn't moved yet.

## Why rules instead of hardcoding

Because the actual accounts involved depend on things like the ledger, the business unit, the expense category, and even the supplier's own setup, a rules-driven engine lets one accounting method handle every combination correctly, instead of someone writing custom logic for every supplier or category. It also means the same transaction can be accounted differently in a secondary ledger (say, for a different accounting standard) without touching the Payables transaction itself.

## Key terms

| Term | Meaning |
|---|---|
| Subledger Accounting (SLA) | The shared engine that turns subledger transactions into GL journals |
| Accounting event | A specific action (validation, payment, etc.) that triggers an accounting entry |
| Accounting method | The named set of rules assigned to a ledger, governing how events are accounted |

## Check yourself

You're ready for Lesson 37 when you can answer, without looking: why does invoice validation and payment each create its own separate journal, rather than one combined entry?
