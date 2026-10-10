# Lesson 8 — Decoupled Architectures

**Chapter 2 · Designing Event-Driven Solutions · Lesson 8 of 16**

## What you'll learn

- What "coupling" means architecturally, and why tight coupling is a design liability
- Fan-out: one event, many independent subscribers
- Choreography vs. orchestration as two different ways to coordinate multi-step processes
- A worked comparison of the same business process built both ways
- Why decoupling is a trade-off, not a free win

## Coupling, defined

Two components are **tightly coupled** when a change to one forces a change to the other, or when one can't function without the other being available and correct at the same moment. A Flow that directly updates five related objects in sequence is tightly coupled to all five: if any one of those updates needs new logic, you're editing the same Flow, and if any one of those objects is temporarily locked or invalid, the whole Flow fails. **Loose coupling** is the opposite: components interact through a stable, minimal contract (an event's schema, from Lesson 9) and don't need to know about each other's internals, availability, or implementation details.

Event-driven design is one specific technique for achieving loose coupling — not the only one, but the one this course is built around.

## Fan-out: one event, many subscribers

**Fan-out** is what happens when a single published event has more than one independent subscriber reacting to it, each unaware of the others. Publish one `Order_Shipped__e` event, and you might have: an Apex trigger that updates an internal `Order__c` status field, an LWC on a service agent's console that shows a live notification, and an external logistics system subscribed via Pub/Sub API that kicks off a delivery-tracking workflow. None of those three subscribers call each other, depend on each other's success, or even know the others exist. Compare this to a single Flow trying to do all three things in one transaction: one slow or failing step there can block or fail the whole thing, where fan-out lets each subscriber succeed or fail entirely on its own.

## Choreography vs. orchestration

When a business process has multiple steps that each react to the step before it, there are two fundamentally different ways to coordinate that sequence:

- **Orchestration** has a central coordinator that knows the whole process and explicitly calls each step in order, waiting for each to finish before calling the next. A Flow that calls subflow A, then subflow B, then subflow C is orchestration — there's one place that holds the entire recipe.
- **Choreography** has no central coordinator. Each component reacts to an event, does its own job, and — if relevant — publishes its own event, which the next component reacts to in turn. Nobody holds the whole recipe; the process emerges from each piece knowing only its own small part.

Event-driven designs tend toward choreography: Component A publishes "Order Placed," Component B (listening for that) does its own work and publishes "Inventory Reserved," Component C (listening for *that*) does its own work and publishes "Payment Captured," and so on. Each component only needs to know what event to listen for and what event to publish next — never the full chain.

## The same process, two ways

**Orchestrated version:** A single Flow, triggered on Order creation, calls a subflow to reserve inventory, waits for it to finish, then calls a subflow to capture payment, waits for that, then calls a subflow to notify the warehouse. One failure anywhere stops the whole Flow; adding a fourth step means editing this same Flow.

**Choreographed version:** An `Order_Placed__e` event is published. An inventory-reservation subscriber reacts to it and, on success, publishes `Inventory_Reserved__e`. A payment subscriber reacts to *that* event and, on success, publishes `Payment_Captured__e`. A warehouse-notification subscriber reacts to *that*. Adding a fourth step later means adding a new subscriber to an existing event — none of the existing three components change at all.

## Decoupling is a trade-off, not a free win

Choreography buys real flexibility, but it costs you something orchestration gives you for free: **a single place to see and reason about the whole process**. With orchestration, reading one Flow tells you the entire sequence. With choreography, understanding the full order-to-warehouse process means tracing through several independent subscribers, each only aware of its own slice — which is exactly why monitoring and observability (Lesson 12) matter more, not less, in an event-driven design. Neither style is universally "better"; a architecture review should pick deliberately based on how often the process changes, how many teams own different steps, and how important centralized visibility is for that specific process.

## Key terms

| Term | Meaning |
|---|---|
| Tight coupling | Two components where a change to one forces a change to the other, or one can't run without the other |
| Loose coupling | Components interacting through a stable, minimal contract without depending on each other's internals |
| Fan-out | One published event reaching multiple independent subscribers, each reacting on its own |
| Orchestration | A central coordinator explicitly calling each step of a process in order |
| Choreography | No central coordinator; each component reacts to events and publishes its own, with the process emerging from the pieces |

## Lab

Take the Order Placed → Inventory Reserved → Payment Captured → Warehouse Notified process from this lesson and write it out as a choreographed event chain: name the four events involved (in publish order), and for each one, name the single subscriber responsible for reacting to it and what event (if any) that subscriber publishes next. Then write two sentences arguing for *orchestration instead* for this same process — under what business condition would a Flow-based orchestrated version actually be the better architectural choice here?

## Check yourself

What's the practical difference between fan-out and simply having multiple steps inside one Flow? Can you explain, without looking back, the difference between choreography and orchestration using your own example (not the order-to-warehouse one from this lesson)?
