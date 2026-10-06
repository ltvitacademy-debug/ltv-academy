# Ticket: Payment Is Missing from GL

**Chapter 2 · Payables Tickets · Lesson 5 of 7**

## What you'll learn

- Why a payment can be real in Payables but invisible in General Ledger
- The difference between Create Accounting and Transfer to GL — two separate steps, not one
- How to check a payment's accounting status before assuming data is lost
- A resolution note for an accounting-pipeline gap

## The ticket

> **Ticket #40288 — Thornfield Materials Holdings.** Treasury analyst reports: "We paid Component Edge Inc. on the 3rd — it shows paid in Payables — but the cash account in GL doesn't reflect it. Where did it go?" Severity: High (affects a cash position report going to the CFO).

## Nothing is actually lost

Before anyone panics about missing money: a payment that shows as **Paid** in Payables is a real, completed payment. What's being described here is an accounting problem, not a cash problem — the journal entry representing that payment simply hasn't reached General Ledger yet. Getting a subledger transaction into GL is not one step; it's two, and either one can stall independently:

1. **Create Accounting** — Subledger Accounting (SLA) generates the journal entry from the payment, in Draft or Final mode.
2. **Transfer to GL** — the Final-mode journal entry is moved into General Ledger as an unposted journal, which then still needs to be posted.

A payment can be sitting fully processed in Payables while being stuck at either of those two steps.

## Investigating

1. **Check the payment's accounting status** in Manage Payments: it shows **Accounted – Final**. So Create Accounting already ran successfully — the journal entry exists.
2. **Check General Ledger** for the corresponding journal batch. Nothing there for this payment.
3. **Check the Transfer Journal Entries to GL process log.** The scheduled process that normally runs nightly to transfer newly Final-accounted entries did not include this payment — it was accounted *after* that night's run completed, and the next scheduled run hasn't executed yet.

## Root cause

The payment's accounting entry was created successfully in Final mode, but it was accounted after the nightly Transfer Journal Entries to GL process had already run for that day, so it is correctly waiting for the next scheduled transfer — it was never lost, dropped, or accounted incorrectly.

## Resolving it

Run the **Transfer Journal Entries to GL** program manually (it can pick up any eligible Final-mode entries not yet transferred, not just the current batch), then confirm the resulting journal batch in GL and post it. This is the appropriate fix precisely because nothing is actually wrong with the data — it's a timing gap between when the entry became Final and when the next transfer was scheduled to run.

## Documenting it

> **Ticket #40288 — Thornfield Materials Holdings.** Treasury reported a payment to Component Edge Inc. missing from the GL cash account.
> **Root cause:** Payment was accounted (Final) after the nightly Transfer Journal Entries to GL process had already completed; it was correctly queued for the next scheduled run, not lost.
> **Fix:** Ran Transfer Journal Entries to GL manually; confirmed and posted the resulting journal batch.
> **Verified:** Cash account balance in GL now reflects the payment.
> **Note:** No data correction was needed — this was a timing gap, not an error. No change recommended unless the business wants the transfer scheduled more frequently.

## Key terms

| Term | Meaning |
|---|---|
| Create Accounting | SLA program that generates a journal entry from a subledger transaction, in Draft or Final mode |
| Transfer to GL | Separate program that moves Final-mode journal entries into General Ledger as unposted journals |
| Accounted – Final | Status confirming SLA has generated the journal entry and it's ready to transfer |

## Check yourself

What are the two separate steps between a Payables transaction and a posted GL journal, and why does distinguishing them matter when a transaction seems "missing" from GL?
