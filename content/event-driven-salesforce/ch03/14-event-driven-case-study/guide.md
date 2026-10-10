# Lesson 14 — Event-Driven Case Study

**Chapter 3 · Applying Events · Lesson 14 of 16**

## What you'll learn

- How every concept from Chapters 1 and 2 fits together in one end-to-end system
- Why a real architecture mixes CDC, custom events, and external Pub/Sub API subscribers rather than picking just one
- How to trace a single business event through publish, schema, idempotency, and monitoring decisions
- Where this specific case study's choices could reasonably have gone differently
- How to read and critique an event-driven design, not just build one from scratch

## The scenario: multi-warehouse order fulfillment

A mid-size retailer runs Salesforce as its order-management system of record, with inventory and shipping handled by two separate external systems: a warehouse-management system (WMS) and a last-mile carrier platform. Today, Salesforce calls out to the WMS synchronously every time an order needs fulfillment, which means a slow or down WMS blocks order processing in Salesforce itself. The company wants an event-driven redesign.

## Walking the architecture end to end

**Step 1 — The order becomes fulfillment-ready (CDC).** CDC is enabled on `Order__c`. When a Flow sets `Status__c = 'Ready to Ship'`, Salesforce automatically emits a CDC change event on the `/data/Order__ChangeEvent` channel — no custom publish code needed for this raw field change (Lesson 4).

**Step 2 — A calculated fact gets derived (Apex + custom event).** An Apex trigger subscribed to that CDC channel checks `changedFields` for `Status__c` and the new value. Rather than handing the WMS Salesforce's entire Order object, it builds a purpose-built, moderately fat `Fulfillment_Requested__e` event (Lesson 9) carrying exactly what the WMS needs: order number, ship-to address, and a line-items summary — nothing more. This is the "fact, not command" and thin/fat schema-design decisions from Lesson 9 made concrete.

**Step 3 — An external system subscribes via Pub/Sub API (Lesson 13).** The WMS, running outside Salesforce, uses a Pub/Sub API client to subscribe to `Fulfillment_Requested__e`. Because this is an external, non-Salesforce client, Pub/Sub API — not `empApi` — is the right tool (Lesson 13). The WMS reserves inventory and begins its own fulfillment process the moment the event arrives, with no callout from Salesforce and no blocking on the WMS being available at that instant.

**Step 4 — Idempotency matters here (Lesson 10).** Reserving inventory twice for the same order would be a real, costly bug — not just an annoyance. The WMS's own subscriber logic tracks which event `id` values (Pub/Sub API's equivalent of `EventUuid`, per Lesson 13) it has already acted on, skipping a duplicate delivery before it reserves inventory a second time.

**Step 5 — The WMS publishes back (external publisher, Lesson 7).** Once inventory is reserved, the WMS publishes its own event — `Inventory_Reserved__e` — back into Salesforce via the REST API or Pub/Sub API. An Apex trigger inside Salesforce subscribes to it and updates `Order__c.Fulfillment_Status__c`, closing the loop without a synchronous callout in either direction.

**Step 6 — Monitoring the pipeline (Lesson 12).** Because this process now spans two systems connected only by events, nobody can read one Flow and see the whole thing (the choreography trade-off from Lesson 8). The design includes a `Processed_Event__c`-style tracking object inside Salesforce for events it consumes, plus a publish-callback-based check (Lesson 12) confirming `Fulfillment_Requested__e` actually finished publishing — so a stuck pipeline shows up as "published but never acknowledged by the WMS" rather than being invisible.

## Where this design could reasonably differ

A fair critique: Step 2's decision to derive a custom event from CDC, rather than letting the WMS subscribe to the `Order__ChangeEvent` CDC channel directly, costs one extra moving part (the Apex trigger) in exchange for a cleaner, smaller, purpose-built schema the WMS doesn't have to filter down itself. That's a defensible trade-off here specifically because the WMS is an external system maintained by a different team — the schema stability argument from Lesson 9 matters more across an org boundary than it would for an internal-only subscriber. A reasonable architect could choose differently for a simpler, single-team scenario.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end event chain | A full business process traced through every publish, subscribe, and design decision involved |
| Cross-system choreography | A multi-step process coordinated entirely through events across an organizational/system boundary |

## Lab

Critique this case study in writing: identify one design decision in Steps 1–6 you would make differently, explain specifically what you'd change (which lesson's concept your alternative draws on — CDC vs. custom event, fat vs. thin schema, idempotency approach, or monitoring approach), and argue in two or three sentences why your alternative is defensible for this scenario. There's no single correct answer here — the goal is reasoning like an architect defending a trade-off, not finding "the" right answer.

## Check yourself

Without re-reading the case study, can you narrate the six-step chain from memory, naming which lesson's concept each step relies on? Why does the design choose Pub/Sub API for the WMS's subscription rather than `lightning/empApi`?
