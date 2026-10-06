# Script — Configuring Ledger, Legal Entity and Business Units

## Segment 1 (title)

Lesson three designed it. This lesson builds it — the hands-on configuration for LTV's two legal entities, two primary ledgers, and two business units, in that exact order, because each object references the one before it.

## Segment 2 (steps)

Legal entity first: LTV Manufacturing Corporation in the US, LTV Manufacturing Canada ULC in Canada, both flagged for Subledger Accounting and intercompany participation. Primary ledger second: LTV US Primary Ledger in USD, LTV Canada Primary Ledger in CAD, both referencing the same shared chart of accounts structure and calendar.

## Segment 3 (code)

Each ledger assigns its own legal entity, currency, and accrual accounting method, but the same LTV Manufacturing chart of accounts structure and the same LTV Corporate Calendar object — you're not building two different designs, just assigning one shared design twice.

## Segment 4 (steps)

Business unit last, because it requires an existing primary ledger. US Manufacturing and Distribution BU attaches to the US ledger; Canada Operations BU attaches to the Canada ledger. Each becomes the default BU for its entity's Procurement, Payables, and Receivables transactions.

## Segment 5 (outro)

Up next, lesson five: configuring the chart of accounts and calendar that both ledgers reference.
