# Script — Reconciling Procure-to-Pay End to End

## Segment 1 (title)

LTV's bearing transaction has reached the General Ledger. Let's cover how a consultant confirms the whole chain actually ties out - that nothing was lost, duplicated, or left dangling along the way.

## Segment 2 (steps)

Reconciliation confirms that every piece - the requisition, the purchase order, the receipt and its accrual, the invoice and its accounting, the payment - agrees with each other and with the General Ledger. An open accrual should correspond to a real, explainable, in-progress transaction, not an error.

## Segment 3 (steps)

One common check compares the Payables trial balance against the matching liability in GL - they should match, since Subledger Accounting is what moved Payables into GL in the first place. A mismatch usually means something's untransferred, or a manual journal bypassed the subledger entirely.

## Segment 4 (steps)

A separate check is accrual reconciliation - comparing the uninvoiced receipts accrual balance against GL, and investigating any receipt with no matching invoice weeks later. For LTV's transaction, once Meridian's invoice is matched and accounted, that accrual clears to zero.

## Segment 5 (outro)

Walking the whole chain, every checkpoint resolves cleanly: approved requisition, closed purchase order, accepted receipt, matched invoice, AP tying to GL, accrual at zero. That agreement across the whole chain is what "it worked correctly" actually means. Up next, lesson twenty-three: practicing what to do when a checkpoint doesn't resolve cleanly.
