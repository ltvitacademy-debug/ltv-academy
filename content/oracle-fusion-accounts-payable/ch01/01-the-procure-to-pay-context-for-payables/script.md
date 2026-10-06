# Script — The Procure-to-Pay Context for Payables

## Segment 1 (title)

Welcome to Oracle Fusion Accounts Payable, the second course in the Oracle Fusion Financials Consultant path. Before we open a single Payables screen, we need to see where Payables actually sits inside the bigger chain of events that gets a business from "we need something" to "we paid for it."

## Segment 2 (steps)

That chain is called procure-to-pay. An employee requisitions something. Procurement turns it into a purchase order with a supplier. Receiving confirms the goods or services actually arrived. Then the supplier's invoice shows up, and that's where Payables takes over. Payables hands the paid invoice to Payments, and every step along the way can generate a journal entry in the General Ledger.

## Segment 3 (steps)

Here's the important part: Payables doesn't own the requisition, the purchase order, or the receipt. It's a downstream consumer of all three. Its job, once an invoice arrives, is to record it, compare it to whatever documents already exist, route it for approval if needed, and get it ready to pay.

## Segment 4 (steps)

This is why so many "Payables problems" are really upstream problems. A price mismatch is often a purchase order nobody updated. A quantity hold usually means receiving hasn't logged the delivery yet. And not every invoice even has a purchase order — plenty, like a utility bill, are coded straight to an account with no matching step at all.

## Segment 5 (outro)

Through this course we'll follow a fictional company, Brightfield Office Supply, to make all of this concrete. Up next, lesson two: a tour of the Payables work areas and the full lifecycle an invoice travels through once it lands there.
