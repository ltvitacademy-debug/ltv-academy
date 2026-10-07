# Distributed Systems Case Study

This lesson is a synthesis. Instead of introducing a new concept, it walks through one realistic scenario — an online checkout system — and shows how nearly every idea from this course shows up together in a single, concrete design. Treat it as a worked example you could describe in an interview or a design review.

## What you'll learn

- How a single system applies availability, scaling, CAP, messaging, and retries together
- Why different pieces of the same system can make different CAP trade-offs
- How a message queue, idempotency, and timeouts combine to make one workflow safe
- How to read a system design by asking "what did they choose, and why"

## The scenario

A customer places an order through a checkout service. That one action has to: confirm the item is in stock, charge the customer's card, record the order, and kick off fulfillment — and it has to keep working even when parts of the system are degraded, overloaded, or temporarily unreachable.

## Staying available under partial failure

Following Lesson 2 and Lesson 4, the checkout service runs as multiple identical instances behind a load balancer, with no single instance being a single point of failure (Lesson 13). If one instance crashes, the load balancer simply stops routing to it, and the others keep serving traffic — the system stays available even though one component failed outright.

## Scaling and load balancing

Per Lesson 3, the checkout service scales horizontally: during a sale, more instances are added behind the same load balancer rather than trying to make one instance bigger. The database layer behind it is partitioned (sharded) by customer ID, so no single database node has to hold or serve the entire system's order history.

## An explicit CAP trade-off, applied per piece of data

This is the key design decision from Lesson 8, and it's not the same answer for every piece of data in the system:

- **Inventory count** is treated as **eventually consistent (AP)**: showing "12 in stock" that's a few seconds stale is an acceptable risk, because refusing to show a product page at all (to guarantee perfect freshness) would hurt the business far more than an occasional oversell, which can be resolved after the fact.
- **Payment state** is treated as **strongly consistent (CP)**: the system would rather briefly refuse to confirm a charge than risk two conflicting records of whether a customer was charged. Here, correctness matters more than always answering immediately.

## Decoupling fulfillment with a message queue

Per Lesson 9, once payment succeeds, the checkout service doesn't call the fulfillment system directly and wait. It publishes an "order placed" message to a queue and returns success to the customer immediately. The fulfillment system consumes that message whenever it's ready — if fulfillment is temporarily down, the message simply waits in the queue instead of the customer's checkout failing.

## Handling failure safely: timeouts, retries, and idempotency

Per Lesson 10 and Lesson 11, the call to the payment processor has a timeout, so a slow processor doesn't hold the checkout service hostage. If that call times out, the checkout service retries — but it attaches an **idempotency key** to the charge request first. If the first attempt actually succeeded and only the response was lost, the retry safely returns the original result instead of charging the customer twice.

## Reading a design this way

When you look at any real distributed system, you can ask the same handful of questions this case study just answered: Where's the single point of failure, and how is it removed? Which pieces chose consistency, and which chose availability, and why? What's decoupled through a queue instead of a direct call? What makes a retry here safe rather than dangerous? Those questions are the actual, durable skill this course has been building toward.

## Key terms

- **Horizontal scaling + load balancing** — multiple instances sharing load, with no single point of failure
- **Per-data CAP trade-off** — different parts of the same system can reasonably choose C or A differently
- **Decoupled fulfillment** — a queue lets checkout succeed even if fulfillment is temporarily unavailable
- **Idempotent retry** — a timeout-triggered retry made safe by an idempotency key

## Recap

A real system rarely makes one CAP choice or uses one pattern — it combines availability, scaling, a deliberate per-data consistency trade-off, queue-based decoupling, and idempotent retries, each addressing a specific risk. Next, in Lesson 17, the final lesson, you'll review and practice everything from across the whole course.
