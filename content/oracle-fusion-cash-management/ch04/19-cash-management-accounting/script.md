# Script — Cash Management Accounting

## Segment 1 (title)

Reconciliation confirms the books match the bank. This lesson covers the last step: how reconciled Cash Management transactions actually become journal entries in the general ledger, and why reconciliation has to come first.

## Segment 2 (steps)

Here's the rule tying this whole course together: transactions posted directly in Cash Management, like bank transfers and external transactions, can only be accounted into the general ledger once reconciled with the bank statement. That's a real control principle — Oracle won't let you book a journal entry for cash movement until there's bank-confirmed evidence it actually happened.

## Segment 3 (steps)

Once reconciled, Create Accounting is the process that generates the journal entry, by submitting the transaction to Subledger Accounting, which applies the accounting rules and produces the entry that transfers to the general ledger. This can run in draft or final mode, online for one transaction or as a scheduled batch.

## Segment 4 (steps)

When a transaction involves a currency difference, like a cross-currency bank transfer, any resulting gain or loss is calculated by Subledger Accounting during Create Accounting — not by Cash Management when the transaction was first entered. And this is exactly why the Cash to General Ledger Reconciliation report from lesson fourteen can show a temporary gap: something reconciled but not yet through Create Accounting. Not an error — just timing, closing the moment Create Accounting runs.

## Segment 5 (outro)

A fictional example: Harborview Metals Inc's fifty thousand dollar weekly sweep reconciles Friday, and that evening's Create Accounting run generates both sides' journal entries, closing that day's gap on the GL reconciliation report. Up next, lesson twenty: a troubleshooting-style practice lesson pulling every chapter of this course together.
