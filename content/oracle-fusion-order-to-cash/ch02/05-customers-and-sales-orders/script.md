# Script — Customers and Sales Orders

## Segment 1 (title)

Before Harborview's order can exist in the system, two things already have to be in place: the customer record, and the structure of a sales order itself. Let's look at both before we create the actual order next lesson.

## Segment 2 (steps)

You met customer accounts and sites in Accounts Receivable. The account is the overall relationship — Harborview Industrial Supply. A site is a specific address and purpose tied to that account — billing, shipping, or both. Order Management doesn't keep its own separate customer list; it references these same records.

## Segment 3 (steps)

Bill-to and ship-to are separate decisions. Harborview's payables team might sit in one office while the physical goods go to a different warehouse across town. The ship-to address drives which warehouse fulfills the order and how freight is calculated. The bill-to site drives where the invoice goes and which terms and tax rules apply.

## Segment 4 (steps)

Every sales order has two levels. The header holds order-wide information: customer, dates, bill-to and ship-to, payment terms, overall status. One or more lines each hold an item, a quantity, a price, and their own status as they move through fulfillment. That's why an order's header status and a single line's status aren't the same thing.

## Segment 5 (outro)

SO-48217 maps onto exactly this structure: Harborview Industrial Supply as the account, a Charlotte ship-to and bill-to, and one line for four hundred Model CP-220 Control Panels. Up next, lesson six: actually creating that order.
