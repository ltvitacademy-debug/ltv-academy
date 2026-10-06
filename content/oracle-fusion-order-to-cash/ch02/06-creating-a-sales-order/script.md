# Script — Creating a Sales Order

## Segment 1 (title)

With the customer and the order structure in place, it's time to actually create SO-48217. Let's walk through the fields a user fills in, and what each one sets in motion later.

## Segment 2 (steps)

The sequence usually goes like this. Select the customer account, which pulls in their default bill-to and ship-to and their price list. Confirm or override those defaults. Add the order line — item and quantity. Let pricing calculate automatically. Set the requested ship date. Then submit.

## Segment 3 (steps)

Submission is the real trigger point. Before it, the order is just a draft, editable, invisible to the rest of the system. Submitting hands it to the order orchestration engine, which checks business rules like credit checks and approvals, and then kicks off whatever fulfillment steps aren't held up. It's also the moment a warehouse's pick list or a credit analyst's queue can see it.

## Segment 4 (code)

Here's SO-48217 as entered. Harborview Industrial Supply, Charlotte for both ship-to and bill-to, one line for four hundred Model CP-220 Control Panels, requested within five business days. Status after submission: submitted, pending validation — because of its size, it doesn't go straight to fulfillment.

## Segment 5 (outro)

Up next, lesson seven: how the system actually calculated this order's price, and where that five percent discount came from.
