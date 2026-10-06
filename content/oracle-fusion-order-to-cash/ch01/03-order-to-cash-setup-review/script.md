# Script — Order-to-Cash Setup Review

## Segment 1 (title)

Before any sales order can be entered, a lot of configuration already has to exist. Most of it, you've already seen. This is a quick review that connects what you know to the job it plays specifically in Order-to-Cash.

## Segment 2 (steps)

Some setup you already have. Business unit and legal entity, from Enterprise Structures. The chart of accounts and ledger that will eventually receive the accounting. The customer account and site you saw created in Accounts Receivable — Order Management reads that same record, it doesn't keep its own list. And the Receivables transaction types and receipt classes that govern how the resulting invoice and payment will behave.

## Segment 3 (steps)

Some setup is new to this course specifically. Items and a price list Order Management will use to calculate price. Order orchestration rules — the sequence of steps an order follows, and which ones are automatic. Credit check and hold rules, which decide what stops an order before it ships. And shipping parameters, like which warehouse it ships from.

## Segment 4 (steps)

Here's why it matters. A huge share of "the order won't invoice" tickets trace back to one missing setup object: a customer site with no price list, a warehouse not enabled for an item, a transaction source pointing at a disabled transaction type. A sales order isn't really one object — it's a chain of references into all of this setup, and the chain breaks wherever one reference is missing.

## Segment 5 (outro)

Up next, lesson four: meet the fictional company and customer we'll follow for the rest of this course, and the plan for their one transaction.
