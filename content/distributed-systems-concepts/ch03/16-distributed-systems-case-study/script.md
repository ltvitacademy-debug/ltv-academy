# Script — Distributed Systems Case Study

## Segment 1 (title)

This lesson doesn't introduce anything new — it walks through one realistic scenario, an online checkout system, and shows how nearly every idea from this course shows up together in a single design. Treat it as a worked example you could describe in an interview.

## Segment 2 (steps)

A customer places an order. That single action has to confirm the item's in stock, charge the card, record the order, and kick off fulfillment — and keep working even when parts of the system are degraded or temporarily unreachable.

## Segment 3 (steps)

Here's the key decision, and it's not the same answer for every piece of data. Inventory count is treated as eventually consistent — showing "12 in stock" that's a few seconds stale is an acceptable risk, because refusing to show the page at all would hurt the business more than an occasional oversell. Payment state is treated as strongly consistent — the system would rather briefly refuse to confirm a charge than risk two conflicting records of whether someone was charged.

## Segment 4 (steps)

Once payment succeeds, checkout doesn't call fulfillment directly and wait. It publishes an "order placed" message to a queue and returns success to the customer immediately. Fulfillment consumes that message whenever it's ready — if fulfillment is temporarily down, the message just waits in the queue instead of the customer's checkout failing.

## Segment 5 (code)

The call to the payment processor has a timeout, so a slow processor can't hold checkout hostage. If it times out, checkout retries — but with an idempotency key attached first. If the original attempt actually succeeded and only the response got lost, the retry safely returns that same original result instead of charging the card twice.

## Segment 6 (outro)

A real system rarely makes one choice — it combines availability, scaling, a deliberate per-data CAP trade-off, queue-based decoupling, and idempotent retries, each handling a specific risk. Next, lesson seventeen, the final lesson: reviewing and practicing everything from across the whole course.
