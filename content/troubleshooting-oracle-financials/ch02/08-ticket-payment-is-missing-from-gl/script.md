# Script — Ticket: Payment Is Missing from GL

## Segment 1 (title)

Thornfield Materials Holdings, ticket forty-two-eighty-eight. A treasury analyst says a payment to Component Edge Inc. shows Paid in Payables, but the cash account in GL doesn't reflect it — and this one's High severity, because it's feeding a cash position report headed to the CFO.

## Segment 2 (steps)

First, nothing's actually lost. Paid in Payables means the payment really happened. What's missing is the accounting, not the cash — and getting a subledger transaction into GL is two separate steps, not one. Create Accounting generates the journal entry, in Draft or Final mode. Transfer to GL moves a Final entry into General Ledger as an unposted journal, which then still needs posting. A payment can stall at either step independently.

## Segment 3 (steps)

Checking the payment's accounting status: Accounted, Final. So Create Accounting already ran. Checking GL for the matching journal batch: nothing there. Checking the Transfer Journal Entries to GL process log explains it — the nightly run that normally picks up newly Final entries already ran for the day, and this payment was accounted after that, so it's just waiting for the next scheduled run.

## Segment 4 (code)

So the root cause is a timing gap, not an error: the entry went Final after the nightly transfer already happened. The fix is to run Transfer Journal Entries to GL manually — it can pick up any eligible Final entries still waiting, not just today's batch — then confirm the journal batch landed in GL and post it.

## Segment 5 (outro)

Resolution note here is a little different: no data correction was needed at all, just a manual run of a program that would have caught it on its own the next night. Say that plainly rather than implying something was broken. Up next, lesson nine: what it looks like when a Payment Process Request itself fails outright.
