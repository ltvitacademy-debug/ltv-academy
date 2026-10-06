# Script — Following the Transaction into General Ledger

## Segment 1 (title)

Every accounting entry so far - the receipt accrual, the invoice accounting - has been sitting inside subledgers. Let's follow them the rest of the way into the General Ledger, where they finally become part of LTV's financial statements.

## Segment 2 (steps)

Receiving and Payables are both subledgers - detailed, transaction-level ledgers. Neither posts to GL directly. Subledger Accounting takes each one's events, applies configured rules, and creates the journals that actually get transferred to the General Ledger.

## Segment 3 (code)

Tracing this transaction end to end produces two journals. The receipt accrual debits maintenance expense and credits the uninvoiced accrual. The invoice accounting debits that same accrual, clearing it, and credits accounts payable. A third journal, from the actual cash payment, debits accounts payable and credits cash.

## Segment 4 (steps)

One of the most useful things a consultant can do is drill down - starting from a GL journal line and tracing it backward through Subledger Accounting to Chen's invoice, or Priya's receipt, all the way back to Marcus's purchase order and Dana's original requisition.

## Segment 5 (outro)

The expense rolls into LTV's income statement, and the liability sits on the balance sheet until payment clears it. Same GL structure you've studied before - but now you've watched one specific transaction travel the whole distance. Up next, lesson twenty-two: reconciling this entire cycle end to end.
