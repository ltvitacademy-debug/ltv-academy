# Script — Accounting for Receivables Transactions

## Segment 1 (title)

Every transaction and receipt in this course quietly generates accounting behind the scenes. This lesson makes it explicit: what debits and credits actually get created, and how Receivables picks the GL accounts.

## Segment 2 (steps)

Receivables is a subledger, not the General Ledger itself. It captures every invoice and receipt with full transaction-level detail, and Subledger Accounting translates that activity into summarized journal entries that reach the GL.

## Segment 3 (steps)

A standard invoice typically debits Accounts Receivable and credits Revenue, plus tax and freight accounts as applicable. A standard receipt reverses that: debit Cash, credit Accounts Receivable.

## Segment 4 (steps)

Receivables doesn't ask a clerk to pick GL accounts by hand. AutoAccounting is a rules engine, configured once, that derives the correct account automatically based on the transaction type, the Receivables Activity, the customer, or the salesperson.

## Segment 5 (outro)

Configure the rule once, and every matching transaction accounts itself consistently. Up next, lesson 36: creating accounting in Receivables, the process that actually runs these rules.
