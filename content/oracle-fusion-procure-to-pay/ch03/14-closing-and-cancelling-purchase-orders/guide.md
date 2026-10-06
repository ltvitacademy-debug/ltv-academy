# Closing and Cancelling Purchase Orders

Not every purchase order ends the same way. This lesson covers how a purchase order reaches the end of its life in Oracle Fusion Cloud, and the real difference between closing it and cancelling it.

## What you'll learn

- The full set of purchase order statuses, beyond just "Open"
- The difference between Closed, Closed for Invoicing, Closed for Receiving, and Finally Closed
- What Cancelled means, and when it is used instead of closing
- What LTV's bearing purchase order's ending looks like in this course's main scenario

## The status lifecycle beyond "Open"

Once a purchase order is approved, its status is **Open**, meaning it is available for receiving and invoicing. From there, several statuses describe how fulfillment activity winds down:

- **Closed for Receiving** — no further receiving activity is expected on the order, though invoicing can still occur (for example, a final invoice still needs to be matched and paid).
- **Closed for Invoicing** — no further invoicing activity is expected, though receiving could still technically continue in some scenarios.
- **Closed** — no further fulfillment activity of any kind is expected on the order.
- **Finally Closed** — all receiving and invoicing activity has fully completed, and the purchase order is eligible to be archived and eventually purged. This is treated as the true end-of-life for a purchase order.

Purchase orders can close automatically when quantities are fully received and invoiced and tolerance settings are met, or a buyer can close a purchase order manually, which is common when a supplier under-delivers and the remaining quantity will never be fulfilled.

## Cancelled: a different outcome entirely

**Cancelled** means the order will not be fulfilled at all — distinct from closing, which assumes some or all of the order was fulfilled as intended. A purchase order (or a specific line) might be cancelled if LTV no longer needs the item, if a supplier cannot fulfill it, or if the order was created in error. Cancelling a line or order that already has a receipt or invoice against it is restricted or requires special handling, since reversing financial activity that already occurred is not as simple as just marking the document cancelled.

## What this looks like for LTV's bearing purchase order

In this course's main transaction, Meridian Bearing Supply Co. ships and LTV receives and invoices the full 50 units as ordered. Once the receipt and the matched, validated invoice are both complete, the purchase order progresses naturally: Closed for Receiving once the full quantity is received, Closed for Invoicing once the invoice is fully matched and paid, and eventually Finally Closed once both conditions are met and no further activity is expected. There is no need to cancel anything in this clean path — cancellation becomes relevant in Chapter 6, when this course works through exception scenarios where a purchase order does not play out so cleanly.

## Recap

A purchase order's life after approval moves through Open, then various flavors of Closed as receiving and invoicing activity completes, ending at Finally Closed. Cancelled is a separate outcome used when an order, or part of one, will never be fulfilled at all. LTV's bearing purchase order follows the clean path to Finally Closed. Next up, Chapter 4: receiving the bearings at LTV's dock.
