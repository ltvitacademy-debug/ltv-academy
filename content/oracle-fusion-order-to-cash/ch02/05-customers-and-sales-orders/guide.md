# Customers and Sales Orders

Before Harborview's order can exist in Oracle Fusion, two sets of records already have to be in place: the customer, and the structure of a sales order itself. This lesson looks at both, so lesson 6, where we actually create SO-48217, has something to build on.

## What you'll learn

- How customer accounts and sites work inside Order Management
- Why "bill-to" and "ship-to" are separate decisions, not one address
- The header/line structure every sales order uses
- How SO-48217's details map onto that structure

## The customer, revisited

You met customer accounts and sites in Accounts Receivable: a customer **account** is the overall relationship (Harborview Industrial Supply), and a customer **site** is a specific address and business purpose tied to that account — billing, shipping, or both. Order Management does not duplicate this setup. When Harborview's buyer calls in an order, the order references their existing account and the specific sites involved.

This matters because bill-to and ship-to are frequently different places, even for the same order. Harborview's accounts payable team might process invoices out of a Charlotte corporate office, while the physical goods go to a separate Charlotte distribution warehouse. Oracle Fusion captures both addresses independently on the order, and each one drives different downstream processing: the ship-to address drives which warehouse fulfills the order and how freight is calculated; the bill-to site drives where the Receivables invoice is sent and which payment terms and tax rules apply.

## The structure of a sales order

Every sales order in Oracle Fusion has two levels:

- **The header** — information that applies to the whole order: the customer account, the order date, the bill-to and ship-to sites, payment terms, and the overall order status.
- **One or more lines** — each line is a request for a specific item, at a specific quantity, with its own price, requested ship date, and its own status as it moves through fulfillment. A single order can have one line or dozens; each line can even reach a different stage of fulfillment at a different pace.

This two-level structure is why an order's overall status and a line's individual status are not the same thing, and why a consultant troubleshooting "the order is stuck" needs to check the specific line, not just the header.

## Mapping SO-48217

| Field | Value |
|---|---|
| Customer account | Harborview Industrial Supply |
| Ship-to site | Charlotte, NC distribution warehouse |
| Bill-to site | Harborview accounts payable, Charlotte, NC |
| Order line 1 | Model CP-220 Control Panel, qty 400 |

Because SO-48217 has only one line, its header and line status will largely move together in this example — but keep the two-level structure in mind, because lesson 9 (changing and cancelling orders) depends on understanding that a change can apply to a single line without touching the rest of the order.

## Recap

A sales order references an existing customer account and one or more of its sites, separating the bill-to decision from the ship-to decision. The order itself splits into a header (order-wide information) and one or more lines (item-specific information, each with its own status). Next up, lesson 6: actually creating SO-48217 in Oracle Fusion Order Management.
