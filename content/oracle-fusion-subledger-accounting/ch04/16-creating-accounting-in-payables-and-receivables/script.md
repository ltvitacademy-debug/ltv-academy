# Script — Creating Accounting in Payables and Receivables

## Segment 1 (title)

You understand Draft and Final mode in the abstract. This lesson grounds that in the two subledgers you know best: Payables and Receivables. You'll see exactly what triggers an accounting event in each.

## Segment 2 (steps)

In Payables, the two common triggers are invoice validation and payment. Validating an invoice raises an Invoices event - the company now owes the supplier. Paying that invoice raises a separate Payments event, relieving the liability and reducing cash. Many implementations auto-run Create Accounting in Draft right after validation; Final runs on a schedule, like nightly or at period-end.

## Segment 3 (steps)

In Receivables, the equivalent triggers are invoice completion and receipt application. Completing a transaction represents revenue earned and an amount due. Applying a receipt reduces the receivable and increases cash. Same pattern as Payables: Draft close to real time, Final on a recurring job.

## Segment 4 (steps)

Notice the shape is identical even though the specific actions differ. One event recognizes the transaction - validated in AP, completed in AR. A second event records cash moving - payment in AP, receipt applied in AR. That mirrors basic accounting: recognize first, record the cash movement separately, often on a different date.

## Segment 5 (code)

Beyond automatic and scheduled runs, you can also run Create Accounting on demand from Scheduled Processes, specifying the subledger application, ledger, date range, and mode. That manual option matters most during implementation testing, period-end catch-up, and the troubleshooting you'll cover in chapter five.

## Segment 6 (outro)

So remember: invoice validation and payment drive AP, invoice completion and receipt application drive AR, and both typically run Draft near real time with Final on a schedule. Up next, lesson seventeen: reviewing subledger journal entries, how to actually read what Create Accounting produced.
