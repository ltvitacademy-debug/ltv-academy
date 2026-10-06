# Script — Order-to-Cash Troubleshooting Practice

## Segment 1 (title)

You've seen a working transaction and several isolated exceptions. The last skill is a repeatable method for troubleshooting any Order-to-Cash problem, even one you've never seen before. Here's that method.

## Segment 2 (steps)

Five questions, in order, because each one narrows where the problem lives. What stage is this transaction actually in - check the status, don't assume. Did the last expected event actually complete - did ship confirmation run, did a receipt get created. Is there a hold or rejection sitting in the way. Do the amounts agree at the nearest checkpoint. Is the setup underneath actually complete.

## Segment 3 (steps)

Practice case one: an order won't invoice. The line shows awaiting billing, so it did ship. Manage AutoInvoice Lines shows a rejection - the item was never assigned to this order's price list. That's a setup gap wearing a shipping problem's clothes. Fix the assignment, resubmit.

## Segment 4 (steps)

Practice case two: a customer's balance won't clear. A receipt exists for the right amount and date - the cash is there. But it's sitting unapplied, on account, because the remittance referenced an invoice number that doesn't exist - probably a typo. The fix is a person manually applying that receipt to the real invoice.

## Segment 5 (outro)

Both cases resolve to something other than the obvious first guess. This completes Oracle Fusion Order-to-Cash. Next up in the Oracle Fusion Financials Consultant path: Subledger Accounting, where you'll go deeper into exactly the rules that generated every journal entry you saw fire automatically in this course.
