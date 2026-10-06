# Script — Cash Management Troubleshooting Practice

## Segment 1 (title)

This final lesson doesn't introduce new concepts — it puts everything from chapters one through four to work on two realistic troubleshooting scenarios, the way a consultant actually encounters this material: as a problem to diagnose, not a list to recite.

## Segment 2 (steps)

Scenario one: reconciliation won't clear. Harborview Metals Inc's operating account normally reconciles over ninety five percent automatically overnight, and this morning it's under ten percent. The statement imported cleanly, so that's not it. The real cause: First Continental Bank changed its ACH credit code from 475 to 478 after a system upgrade, and the mapping table only recognized 475. The fix is to add the mapping for 478 once — not reconcile each line by hand — and the backlog clears on the next automatic run.

## Segment 3 (steps)

Scenario two: the cash position doesn't look right. Monday's concentration account position is twenty eight thousand dollars lower than expected. Checking reconciliation turns up the cause: a wire transfer reconciled on the From account's statement, but the matching inflow external transaction was never created on the To account. The fix is to create that missing inflow transaction, reconcile it, and let Create Accounting close the gap.

## Segment 4 (steps)

Here's the whole course in four pieces. Chapter one built the foundation — banks, branches, accounts, uses, security. Chapter two got the bank's own data into Oracle — formats, loading, codes, errors. Chapter three matched that data against the system — rules, automatic and manual reconciliation, AP and AR specifics, unreconciled items, reporting. Chapter four covered what's built on top of reconciled data — external transactions, transfers, positioning, forecasting, and the accounting that closes the loop.

## Segment 5 (outro)

This completes the first course of the Financial Operations stage in the Oracle Fusion Financials Consultant path. Troubleshooting here means tracing a symptom back through these layers, not guessing. Up next: Oracle Fusion Fixed Assets — asset books, categories, additions, capitalization, depreciation, transfers and retirements.
