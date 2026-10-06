# Script — Bank Account Transfers

## Segment 1 (title)

Last lesson previewed it: a bank account transfer isn't a special object of its own — it's two external transactions wired together. This lesson covers why companies move money between accounts, how the mechanics work, and what currency differences add.

## Segment 2 (steps)

Companies commonly centralize cash into one concentration account and sweep smaller accounts up into it, or fund a disbursement account right before a payment run. The point is usually consolidating idle cash to invest it in one place, or making sure a specific account can cover upcoming outflows.

## Segment 3 (steps)

Mechanically, a transfer creates two external transactions: an outflow at the from account, and an inflow at the to account, both carrying the same transfer reference. Each one needs its own reconciliation against its own bank statement before it's accounted — so a transfer isn't really done, accounting-wise, the moment it's entered. It's done once both sides show up on statements and reconcile.

## Segment 4 (steps)

A transfer can be intracompany, between two accounts owned by the same legal entity, or intercompany, between accounts owned by different legal entities. If the from and to accounts use different currencies, Cash Management just records the two transaction amounts — any resulting gain or loss from the exchange rate is calculated by Subledger Accounting when Create Accounting runs.

## Segment 5 (outro)

A fictional example: Harborview Metals Inc sweeps fifty thousand dollars every Friday from its lockbox account into its main concentration account, same currency, same legal entity. Its UK subsidiary occasionally needs an intercompany transfer converted to pounds, with any FX gain or loss landing through Subledger Accounting. Up next, lesson seventeen: Cash Positioning, the view that often drives the decision to transfer in the first place.
