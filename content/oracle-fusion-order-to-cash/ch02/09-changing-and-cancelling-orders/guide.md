# Changing and Cancelling Orders

SO-48217's credit hold is released and the order is moving forward — but "moving forward" doesn't mean "frozen." Customers change their minds, warehouses discover stock shortages, and businesses occasionally need to cancel an order entirely. This lesson covers what can still be changed about an order once it's submitted, and what cannot.

## What you'll learn

- Why what can be changed depends on how far an order has progressed
- The difference between changing a line and cancelling a line
- What happens downstream when a submitted order is changed
- A short look at how this would play out for SO-48217

## What's changeable depends on status

An order's lines move through a sequence of statuses as fulfillment progresses — roughly: awaiting processing, awaiting shipping, shipped, invoiced, closed. The further along a line is, the fewer changes are allowed, and the more consequences a change has:

- **Before fulfillment has started**, quantity, requested date, and even the ship-to can usually still be changed cleanly, because nothing downstream has acted on the old values yet.
- **Once a line has been picked or packed**, changing the quantity can mean the warehouse has to physically adjust what it already pulled — this still works, but it costs time and sometimes a re-pick.
- **After shipping**, the physical goods are gone. A line's quantity can no longer be reduced through an ordinary change; a reduction at this point has to go through a return, which is a separate process covered in lesson 13.
- **After invoicing**, the Receivables transaction exists independently of the order. A change to the order no longer automatically changes an invoice that's already been created; correcting that requires action in Receivables, typically a credit memo (lesson 17).

## Change vs. cancel

A **change** modifies a line that remains open — a different quantity, date, or address on the same line. A **cancellation** closes a line (or the whole order) without it ever completing. Cancelling a line that hasn't shipped is usually straightforward: it simply never reaches fulfillment. Cancelling a line that has already shipped is not really possible in the normal sense — at that point the only path is a return, because the goods physically exist at the customer's site.

## How this would play out for SO-48217

Suppose, hypothetically, that after the credit hold was released but before the warehouse began picking, Harborview called back and asked to reduce the quantity from 400 to 350 units. Because fulfillment hadn't started, the order administrator could simply update the line quantity. Order Management would re-price the line against the same discount rule — 350 units still clears the 300-unit volume threshold, so the 5% discount still applies, just against a smaller base. If Harborview had called after the shipment had already left Savannah, reducing the quantity would instead require them to ship 50 units back, using the return process in lesson 13, rather than a simple line edit.

## Recap

What can be changed on an order depends entirely on how far it has progressed: changes before fulfillment are simple, changes after shipping require a return, and changes after invoicing require action in Receivables. A change modifies an open line; a cancellation closes it before it completes, which is only straightforward for lines that haven't shipped yet. Chapter 2 is complete — SO-48217 is created, priced, credit-checked, and released. Next up, Chapter 3 begins with lesson 10: fulfillment and shipping, where the order actually leaves the warehouse.
