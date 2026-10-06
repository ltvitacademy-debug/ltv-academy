# Lesson 31 — Quick Payments

**Chapter 6 · Payments · Lesson 31 of 42**

## What you'll learn

- What a quick payment is and how it differs from the standard batch flow
- When a quick payment is the right tool to reach for
- How a quick payment is created, directly from an invoice
- What a quick payment skips compared to a Payment Process Request

## Paying one invoice, right now

Most payments in Payables go through a **Payment Process Request (PPR)** — a batch process that selects many due invoices, groups them, and builds payments together (covered in Lesson 32). That batch approach is efficient, but it isn't built for speed on a single invoice.

A **quick payment** is the alternative: a single, immediate payment to one supplier, created directly from the invoice itself, bypassing the batch selection process entirely. It exists specifically for situations where waiting for the next scheduled payment run isn't acceptable.

## When to reach for a quick payment

- A supplier is on **credit hold** elsewhere and needs an urgent, individually-authorized payment
- A **rush invoice** has to be paid today — a deposit needed to unblock a delivery, for instance
- A **one-off manual check** needs to be cut for a situation a batch run wouldn't naturally cover (e.g., paying a one-time reimbursement alongside a trade invoice)

Quick payments trade the efficiency of batching for immediacy. They're meant to be the exception, not the default way invoices get paid — using them for everything would defeat the point of running Payment Process Requests at all.

## How it works

A quick payment is initiated from the **Manage Invoices** or **Manage Payments** area, selecting one or more invoices for the *same supplier* and directly specifying:

- The **payment method** (check, EFT, wire)
- The **disbursement bank account**
- The **payment date**

Oracle Fusion then creates the payment immediately — no proposed-payment review step, no batch file generation step. It's processed one-off, as its own transaction.

## Illustrative example

**Harbor Point Logistics** (fictional, reused from Lesson 24) has a $4,200 invoice that must be paid today to release a shipment stuck at the organization's dock pending payment confirmation. Rather than waiting for tomorrow's scheduled Payment Process Request, the AP clerk creates a quick payment directly against that invoice, selecting the wire payment method and the primary disbursement account, and the payment is issued the same day.

## What it skips, by design

| Standard PPR | Quick payment |
|---|---|
| Groups many invoices across many suppliers | One supplier, one or a few invoices |
| Goes through a proposed-payment review step | No review step — processes immediately |
| Runs on a schedule | Runs on demand, any time |

## Key terms

| Term | Meaning |
|---|---|
| Quick payment | A single, immediate payment to one supplier, created directly from an invoice |
| Payment Process Request (PPR) | The batch process most invoices are paid through instead |

## Check yourself

You're ready for Lesson 32 when you can answer, without looking: what situation would make a quick payment the right choice instead of waiting for the next scheduled payment run?
