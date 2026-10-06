# Script — Order Approvals and Holds

## Segment 1 (title)

SO-48217 submitted cleanly and priced correctly, but it didn't sail straight into fulfillment. Because of its size, it triggered a credit check, and that put a hold on the order. Let's look at how approvals and holds actually work.

## Segment 2 (steps)

These two words mean different things. An approval is a request routed to a person before something can proceed - like a manager approving a bigger-than-normal discount. A hold is an automatic stop the system applies on its own when a condition is met. Credit checks are the most common source of a hold: the system checks automatically, no one has to request anything.

## Segment 3 (steps)

A credit check compares the order's value, often combined with the customer's current open balance, against their credit limit. Fusion can check this at more than one point - at submission, and again before shipment, since balances change. If a line fails, a credit check hold goes on that line, while anything that passed keeps moving.

## Segment 4 (code)

Here's what happens to our order. Harborview's open balance from an earlier invoice, combined with this order's fifty-five thousand, one hundred dollars, fails the automatic check at submission. A credit check hold goes on SO-48217's line. A credit analyst reviews Harborview's payment history and aging, finds nothing concerning, and releases the hold.

## Segment 5 (outro)

The order wasn't rejected, just paused and reviewed. Up next, lesson nine: how an order like this one could still be changed or even cancelled, even after reaching this point.
