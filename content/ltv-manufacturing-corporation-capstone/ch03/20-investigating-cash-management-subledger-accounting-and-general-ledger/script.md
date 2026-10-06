# Script — Investigating Cash Management, Subledger Accounting and General Ledger

## Segment 1 (title)

The remaining three symptoms get traced here: the bank variance, the Receivables transactions missing from the GL, and the intercompany mismatch. Like lesson nineteen, this lesson confirms root causes — the fixing is next.

## Segment 2 (steps)

Cash Management: the bank statement carries two nine-thousand-two-hundred-dollar debits for the same payment file. A call to Regions Bank's commercial services desk confirms a network timeout caused a retransmission — a bank-side error, not an LTV posting error.

## Segment 3 (steps)

Subledger Accounting: the accounting events report, filtered to Incomplete, lists fourteen Freight Charge transactions, all missing an Account Rule for account 7850. The rule was never updated when that account was added in December.

## Segment 4 (code)

General Ledger: the journal batch status report finds INTERCO-JAN-0131 sitting in Draft, never submitted. Because it never posted, the US entity carries overhead that should have split with Canada, and Canada shows no matching intercompany entry at all.

## Segment 5 (outro)

All six of Elena's symptoms now have confirmed causes — a bank error, a configuration gap, and a missed submission, alongside the three from lesson nineteen. Up next, lesson twenty-one: correcting, reconciling, and completing the month-end close.
