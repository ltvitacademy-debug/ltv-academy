# Order-to-Cash Exception Scenarios

SO-48217 hit exactly two exceptions: a credit hold and an AutoInvoice rejection. Real Order-to-Cash work involves many more kinds of exceptions than one order can demonstrate. This lesson walks through four new, independent scenarios — different customers, different problems — to broaden what you can recognize and reason through.

## What you'll learn

- Four distinct exception types you haven't seen yet in this course
- What causes each one and where in the cycle it surfaces
- The general resolution path for each, without re-walking every system screen

## Scenario 1: the short shipment

A customer orders 500 units of an item; the warehouse can only pick 460 due to a cycle-count discrepancy. This is a **short pick** becoming a **short shipment**: the order ships with less than requested. The line's actual shipped quantity (460) becomes what gets invoiced — Oracle Fusion invoices what shipped, not what was originally ordered — while the remaining 40 units either back-order on the same line for a later shipment or require a separate decision from the customer (partial fulfillment accepted, or wait for the full quantity).

## Scenario 2: the price override needing approval

A salesperson wants to offer a customer 15% off, well beyond the 5% automatic volume discount rule most orders use. Because this exceeds standard pricing policy, it is not an automatic discount — it requires a manual override that routes through an approval rule (typically in Approval Management, AME) before the order can proceed. Unlike a credit check hold, which the system applies on its own, this is a true approval: someone with the right authority has to say yes before the discounted price is allowed to stand.

## Scenario 3: the disputed invoice

A customer calls, insisting an invoice is wrong — they believe they were billed for a quantity they never received. This isn't resolved by simply writing off the balance. It starts an investigation: comparing the invoice back to the shipment it came from (exactly the kind of checkpoint from lesson 22), and, if the customer is right, correcting it with a credit memo referencing the actual discrepancy found. If the customer is mistaken — the shipment and invoice do agree — the dispute is resolved by sharing that evidence, not by crediting a balance that was actually correct.

## Scenario 4: the duplicate payment

A customer's accounts payable team accidentally pays the same invoice twice. Receivables will happily record both receipts, but only one has anything to apply against — the second becomes either an unapplied, on-account credit on the customer's account (to be used against their next invoice) or, if the customer requests it, a refund. This is not an error to "fix" by deleting a receipt; cash that arrived has to be accounted for somewhere, and deleting a receipt that represents real money received would misstate the company's cash position.

## Recap

A short shipment invoices the actual shipped quantity, not the ordered quantity. A price override beyond standard policy requires a true approval, not an automatic hold. A disputed invoice gets investigated against its source shipment before anything is credited. A duplicate payment is retained as an on-account credit or refunded, never deleted. Next up, lesson 25, the final lesson of this course: troubleshooting practice that pulls all of this together.
