# Script — Invoice Types

## Segment 1 (title)

Chapter 2 built the supplier side of Payables. Chapter 3 turns to the invoice itself. Not every invoice looks the same, and Oracle Fusion gives each shape its own invoice type, so Payables knows whether it owes money, returns money, or references another invoice entirely.

## Segment 2 (steps)

Payables supports seven invoice types. Standard is the ordinary case, an amount owed for goods or services. Credit memo and debit memo both reduce what's owed, but from different directions. Mixed combines positive and negative lines on one document. PO Price Adjustment corrects a price after the fact. Prepayment is an advance applied later. Expense Report captures employee reimbursements as a payable transaction.

## Segment 3 (steps)

Here's the distinction almost everyone mixes up at first. A credit memo comes from the supplier - they're telling you they owe you credit. A debit memo is recorded by Brightfield when it believes it's owed credit but the supplier hasn't issued a credit memo themselves. Both reduce what's owed; the difference is who originated the document.

## Segment 4 (steps)

A mixed invoice exists because real billing isn't always one direction. If a supplier bills five thousand dollars for a new shipment but also credits three hundred for a prior short shipment on the same statement, a mixed invoice records both lines on one document instead of forcing two separate ones to be reconciled by hand.

## Segment 5 (outro)

Invoice type isn't just a label - it changes matching behavior and application rules, which is why picking the right one up front avoids correcting it later. Up next, lesson thirteen: creating standard invoices, the type you'll use constantly.
