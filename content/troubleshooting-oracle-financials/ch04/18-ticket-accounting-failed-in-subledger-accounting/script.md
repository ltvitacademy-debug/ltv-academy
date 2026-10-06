# Script — Ticket: Accounting Failed in Subledger Accounting

## Segment 1 (title)

Cascade Outdoor Supply, ticket forty-five-sixty-one. Create Accounting failed on a batch of receipts, and the error mentions balancing — the AR lead doesn't know what that means.

## Segment 2 (steps)

This is one layer further upstream than the last two tickets. Those were GL-side problems. This one happens inside Subledger Accounting itself — Create Accounting can fail before a journal entry even gets generated, for reasons specific to SLA's own accounting rules, not the chart of accounts.

## Segment 3 (steps)

The actual error: the subledger journal entry doesn't balance by balancing segment. Looking at what's different about the failed receipts specifically: every one is foreign currency, and every one is intracompany — settling a receivable recorded under one legal entity for a transaction originally billed under a different one. Checking the setup behind that: intracompany balancing is enabled for this ledger, but no intracompany balancing rule actually exists for Receivables receipts. SLA has no instruction for how to build the balancing lines this specific shape of transaction needs.

## Segment 4 (code)

That's why this only hit certain receipts — ordinary domestic ones never cross balancing segments, so they never needed that rule. The right diagnostic tool here is the Accounting Event Diagnostic report, which shows exactly what source values SLA referenced while trying to build the entry. The fix: define the missing intracompany balancing rule for this ledger, Receivables, and Receipts, working with whoever owns ledger setup, since this is a setup gap, not a mistake on any one receipt. Then re-run Create Accounting for the batch.

## Segment 5 (outro)

Resolution note: name the specific missing rule, confirm it only affected foreign-currency intracompany receipts, and recommend checking other sources like Payables for the same gap before it surfaces there too. Up next, lesson nineteen: what happens when accounting succeeds, but the entries still never make it to GL.
