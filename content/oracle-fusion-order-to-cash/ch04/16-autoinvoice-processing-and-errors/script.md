# Script — AutoInvoice Processing and Errors

## Segment 1 (title)

AutoInvoice runs against the staged data from last lesson. Usually it runs clean. This lesson covers what it actually checks, and walks through a realistic case where our order's line doesn't pass the first time.

## Segment 2 (steps)

AutoInvoice checks a lot before creating a transaction: does the customer exist and is their account active, is the item recognized, is there a valid transaction type and source, is currency and tax set up, and critically - can a remit-to address be determined. A remit-to tells the customer where to send payment. No remit-to, no transaction.

## Segment 3 (steps)

Rejected and error aren't quite the same thing. A rejected record usually fails for a structural reason, like a missing remit-to, and the standard report might only show a count, not always a reason. An error record gets flagged with a more specific reason Receivables can point to. Either way, the record stays safely in the interface tables - nothing's lost.

## Segment 4 (code)

Here's what actually happens to our order. Harborview was just set up with a new secondary bill-to site, and nobody assigned it a remit-to address. AutoInvoice can't tell Harborview where to send payment for that site, so the line is rejected.

## Segment 5 (outro)

The fix runs through Manage AutoInvoice Lines: find the rejected record, see the reason, assign the missing remit-to, flag it, and resubmit. This time it passes, and a real Receivables transaction is finally created. Up next, lesson seventeen: the financial side of those twenty damaged units - the credit memo.
