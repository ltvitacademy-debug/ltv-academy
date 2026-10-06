# Creating Accounting in Payables and Receivables

You now understand Draft and Final mode in the abstract. This lesson grounds that in the two subledgers you know best from earlier courses in this path: Payables and Receivables. You'll see exactly what triggers an accounting event in each, and how Create Accounting fits into the day-to-day workflow you already learned.

## What you'll learn

- What specific actions in Payables raise accounting events
- What specific actions in Receivables raise accounting events
- How Create Accounting can run automatically versus on a schedule
- Why timing and frequency decisions differ by subledger and by company

## Payables: validation and payment as the triggers

In Payables, the two most common accounting-triggering actions are invoice validation and payment. When an invoice is validated, Payables raises an event (event class Invoices, as you learned in lesson 2) that represents the liability — the company now owes the supplier. When a payment is made against that invoice, a separate event (event class Payments) represents relieving that liability and reducing cash.

Many Payables implementations are configured to automatically kick off Create Accounting in Draft mode immediately after validation, so the accounting impact of an invoice is visible right away without anyone having to remember to run anything manually. Final mode accounting is more commonly run on a schedule — for example, nightly, or as part of a period-end routine — once a batch of transactions is considered settled.

## Receivables: completion and receipt application as the triggers

In Receivables, the equivalent triggers are invoice completion (when a Receivables transaction is finished and ready to post, representing revenue earned and an amount due from the customer) and receipt application (when a customer payment is applied against an invoice, reducing the receivable and increasing cash). Receivables, like Payables, commonly runs Draft accounting close to real time and schedules Final accounting on a recurring job.

## Why the specific triggers differ, but the pattern doesn't

Notice the shape of the pattern is identical in both subledgers, even though the specific triggering actions are different: one event represents the transaction being recognized (invoice validated in AP, invoice completed in AR), and a second event represents cash moving (payment made in AP, receipt applied in AR). This mirrors exactly what you'd expect from basic accounting — recognize the obligation or the earning first, then record the cash movement separately when it happens, often on a different date.

## Running Create Accounting manually

Beyond automatic and scheduled runs, a consultant or accountant can also run Create Accounting on demand from the Scheduled Processes area, specifying the subledger application, the ledger, a date range, and the mode (Draft or Final). This manual option matters most during implementation testing, period-end catch-up, and the troubleshooting scenarios you'll study in Chapter 5.

## Recap

In Payables, invoice validation and payment are the primary triggers for accounting events; in Receivables, it's invoice completion and receipt application. Both subledgers typically run Draft accounting close to real time for visibility and schedule Final accounting on a recurring or on-demand basis. Next up, lesson 17: reviewing subledger journal entries, where you'll learn how to actually read and drill into what Create Accounting produced.
