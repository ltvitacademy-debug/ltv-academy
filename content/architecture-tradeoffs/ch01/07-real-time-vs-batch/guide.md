# Lesson 7 — Real-Time vs. Batch

**Chapter 1 · Architecture Tradeoffs · Lesson 7 of 20**

## What you'll learn

- The real cost of real-time integration versus batch processing in a Salesforce architecture
- Concrete tools on each side: Platform Events and Change Data Capture (real-time) versus Bulk API 2.0 (batch)
- The criteria that actually decide which pattern fits a given integration
- Why "always real-time" quietly becomes an expensive, fragile decision at scale

## Freshness has a price

Real-time integration delivers data the moment it changes — a record update in Salesforce triggers an event, a subscriber picks it up within seconds, and a downstream system reflects the change almost immediately. Batch integration collects changes over a window of time and processes them together, on a schedule or in a background job, trading immediacy for efficiency and simplicity. Neither is the universally correct choice, and the difference isn't cosmetic — it changes what infrastructure you need, how failures get handled, and how much engineering discipline the integration demands going forward.

Salesforce gives architects two different real-time primitives with genuinely different tradeoffs between themselves. **Change Data Capture (CDC)** is the faster, lower-effort option: it's a built-in feed that automatically streams create, update, delete, and undelete events for whichever objects you enable, with the full set of changed fields included, and no custom payload design required — which is exactly why it's the fastest way to get started when you just need to broadcast that a Salesforce record changed, full stop. **Platform Events** cost more setup effort because you design the event schema yourself, but that effort buys you a custom payload that can carry business meaning beyond "this record changed" — useful when multiple systems need the same structured business event, or when the information needs to travel in a shape that doesn't match a Salesforce record at all. Both support replay for durable subscribers, which matters when a downstream system goes offline temporarily and needs to catch up without losing events.

On the batch side, **Bulk API 2.0** is built for exactly the opposite profile: large volumes processed asynchronously as a background job, with Salesforce creating the job, accepting uploaded data, processing it on its own schedule, and returning results the caller then checks for and reconciles — including the fact that results can come back in a different order than the records were submitted, which callers need to handle explicitly. This is the right tool for data migrations, nightly syncs with a data warehouse, and mass updates — exactly the cases where "the data existed a few minutes later than it changed" costs nothing real, and trying to push that same volume through a real-time, synchronous path would be slow, fragile, and likely to hit limits that the batch path was specifically designed to avoid.

## Deciding which pattern actually fits

- **Does the business process actually depend on sub-second or sub-minute freshness?** A fraud-detection trigger, a live inventory check before checkout, or a support agent needing to see a just-submitted case immediately all genuinely need real-time delivery. A nightly financial reconciliation or a weekly marketing segment refresh does not — pushing those to real-time buys nothing the business asked for.
- **What's the actual data volume, and how does it scale?** Real-time patterns handle a steady trickle of individual changes well. They were never designed to carry a one-time migration of millions of records, or a nightly full-table sync — that volume belongs on a bulk, asynchronous path regardless of how "fresh" anyone would prefer it to be.
- **How much ongoing engineering discipline can the team sustain?** A real-time integration that silently stops processing events (a dead subscriber, an expired replay window) can quietly drop data with no obvious symptom until someone notices missing records downstream. A batch job that fails typically leaves a clearer failure signal — a job status, a row count mismatch — that's easier to monitor without specialized event-driven tooling.
- **Does the receiving system need a Salesforce-shaped payload, or a custom business event?** If a downstream system just needs to know "this record changed," CDC's zero-schema-design approach is less work and less to maintain. If several systems need the same meaningful business event — not tied to one record's field list — a Platform Event is worth the extra setup.

A common mistake is reaching for real-time integration by default because it sounds more sophisticated, without asking whether the business process on the other end can actually use that freshness, or whether it was ever worth the added fragility and monitoring burden. The correct default is closer to: batch unless something specific requires real-time, not the reverse.

## Key terms

| Term | Meaning |
|---|---|
| Change Data Capture (CDC) | A built-in Salesforce feed that automatically streams record change events (create/update/delete/undelete) for enabled objects, with no custom payload design |
| Platform Event | A custom-schema event message an architect designs and publishes, used for business events or payloads shared across multiple systems |
| Bulk API 2.0 | Salesforce's asynchronous, job-based API for processing large data volumes in the background, used for migrations, mass updates, and warehouse syncs |
| Replay | The ability for a durable event subscriber to catch up on events it missed while offline, supported by both CDC and Platform Events |

## Lab

A retailer wants Salesforce Case data mirrored into an external support analytics platform. Two scenarios: (1) a support manager wants a live dashboard that reflects case status changes within seconds, and (2) the same data also needs to land in a nightly data warehouse ETL job for historical trend reporting. Using the criteria above, design both integrations: which tool fits each scenario, and why would building scenario (2) the same way as scenario (1) be the wrong call even though it would technically work?

## Check yourself

Can you explain the real difference in setup effort and payload design between Change Data Capture and Platform Events, and when each is the better fit? Can you state why Bulk API 2.0's asynchronous, job-based design is actually the right tool for large migrations rather than a limitation to work around?
