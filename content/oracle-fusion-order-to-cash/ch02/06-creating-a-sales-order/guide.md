# Creating a Sales Order

With the customer and the order structure in place, it's time to actually create SO-48217. This lesson walks through the fields a Fusion Order Management user fills in, in the order they're typically filled in, and what each one sets in motion downstream.

## What you'll learn

- The typical sequence of steps for entering a sales order in Order Management
- What each key field controls later in the cycle
- What "submitting" an order actually triggers behind the scenes
- How SO-48217 looks once it's entered

## Entering the order, step by step

1. **Select the customer account.** Choosing Harborview Industrial Supply pulls in their default bill-to and ship-to sites, their payment terms, and makes their price list and any assigned agreements available.
2. **Confirm or override bill-to and ship-to.** The defaults from step 1 are usually correct, but a buyer can specify a different site for a particular order — this is where that choice is made.
3. **Add the order line(s).** For SO-48217, this means adding the item (Model CP-220 Control Panel) and the requested quantity (400 units). Order Management checks that the item is enabled for the customer and for the ship-from warehouse before accepting the line.
4. **Let pricing calculate.** Once the item and quantity are entered, Order Management prices the line from the applicable price list and applies any eligible discounts — this is the step covered in detail in the next lesson.
5. **Set the requested ship date and any special instructions.** This feeds the fulfillment schedule used in Chapter 3.
6. **Submit the order.** Submission is the trigger point: it's when the order is validated against business rules (including credit checks, covered in lesson 8), and — if nothing stops it — it's released to the orchestration process that will drive it through fulfillment and billing.

## What "submit" actually does

Before submission, an order is a draft: it can be edited freely and nothing downstream knows about it yet. Submitting the order hands it to Oracle's order orchestration engine, which evaluates the business rules configured for this order type (credit checks, approval requirements, any holds) and then begins executing the fulfillment steps that weren't held up. This is also the moment the order becomes visible to other parts of the system, like a warehouse's pick list or a credit analyst's hold queue.

## SO-48217 as entered

| Field | Value entered |
|---|---|
| Customer | Harborview Industrial Supply |
| Ship-to / Bill-to | Charlotte, NC (both defaults accepted) |
| Line 1 item | Model CP-220 Control Panel |
| Line 1 quantity | 400 |
| Requested ship date | Within 5 business days |
| Status after submission | Submitted — pending validation |

Because of the order's size, submitting SO-48217 does not immediately move it into fulfillment. As you'll see in lesson 8, it is flagged for a credit check before it can proceed.

## Recap

Creating a sales order means selecting the customer, confirming bill-to/ship-to, adding lines with items and quantities, letting the system price them, setting a requested ship date, and submitting. Submission is the moment the order leaves draft status and becomes subject to the business rules — including credit checks — that decide whether it can move forward. Next up, lesson 7: how Order Management actually calculated SO-48217's price and its 5% discount.
