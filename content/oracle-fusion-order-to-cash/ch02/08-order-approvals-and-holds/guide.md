# Order Approvals and Holds

SO-48217 submitted cleanly and priced correctly — but it did not sail straight into fulfillment. Because of its size, it triggered a credit check, and the credit check put a hold on the order. This lesson covers how approvals and holds work in Order Management, and walks through exactly what happens to SO-48217 as a result.

## What you'll learn

- The difference between an approval and a hold
- How credit checks work and what triggers one
- Who reviews and releases a credit hold, and what they actually look at
- What happens to SO-48217 specifically

## Approvals vs. holds

These two terms get used loosely, but they mean different things:

- An **approval** is a request routed to a person (often through Approval Management, AME) before an action can proceed — for example, a manager approving a discount beyond standard policy. The order typically waits in a pending state until someone approves or rejects it.
- A **hold** is an automatic stop applied by the system itself when a defined condition is met, rather than a request sent to a person. A hold blocks an order, or a specific line, from moving to its next step until someone with the right access investigates and releases it.

Credit checks are the most common source of a hold in Order Management: the system checks the condition automatically, and if it fails, the hold is applied without anyone having to request anything.

## How the credit check works

A credit check compares something about the order — usually its value, sometimes combined with the customer's current open balance — against a credit limit configured for that customer. Oracle Fusion credit check rules can run at more than one point in the cycle; a common configuration checks at order submission and again later, before shipment, since a customer's open balance can change between those two moments. If a line (or the whole order, depending on configuration) fails the check, a **credit check hold** is applied to the affected line(s), while any lines that passed can continue.

## What happens to SO-48217

Harborview Industrial Supply has a credit limit on file, and $55,100.00 is large enough, combined with their current open balance from an earlier invoice, to fail the automatic credit check at order submission. Order Management applies a credit check hold to SO-48217's line. The order itself is not rejected — it is paused, visible in a credit analyst's hold queue, waiting for a decision. A credit and collections analyst reviews Harborview's account: their payment history, their current aging, and the size of this specific order. Finding nothing concerning — Harborview has a clean payment record, this is just a larger order than usual — the analyst releases the hold, and SO-48217 is now free to proceed into fulfillment.

## Recap

An approval routes a decision to a person before something is allowed to happen; a hold is an automatic system stop applied when a condition, like a credit check, fails. SO-48217 triggered a credit check hold purely because of its size, and a credit analyst reviewed and released it after confirming Harborview's payment history didn't raise any concerns. Next up, lesson 9: how an order like this one could still be changed or cancelled, even after reaching this point.
