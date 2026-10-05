# Lesson 21 — Distributing Master Data

**Chapter 5 · Enterprise Consistency · Lesson 21 of 25**

## What you'll learn

- Why creating a golden record is only half the job
- Batch versus real-time distribution, and when each one is the right call
- Publish-subscribe distribution versus point-to-point integration
- Why keeping every downstream system in sync is an ongoing operational problem, not a one-time setup task

## Half the job is creating it; the other half is delivering it

Chapter 2 covered how a **golden record** gets built — matching, deduplication, survivorship rules producing one trusted version of a customer, product, or vendor. None of that work pays off until the golden record actually reaches every system that needs it: the e-commerce platform needs the current product description, the billing system needs the current customer address, the warehouse needs the current vendor's ship-to location. **Distribution** is the discipline of getting master data from the system that governs it out to every system that consumes it, reliably and on a known schedule.

This connects directly back to Lesson 15's employee and location master: the reason those domains are comparatively easy to *create* but still require real ongoing effort is almost entirely a distribution problem — keeping IT provisioning, payroll, and badge access synchronized with whatever HR just changed.

## Batch vs. real-time distribution

**Batch distribution** sends master data updates on a schedule — nightly, hourly — as a bundled extract that consuming systems pick up and load. It's simpler to build and easier to troubleshoot (you know exactly when the data moved and what moved with it), but it means every consuming system is, by design, somewhat stale between runs. For most reference data and a good deal of master data, that's a perfectly acceptable tradeoff — nobody needs a vendor's updated phone number propagated within the second.

**Real-time distribution** sends an update the moment it happens, typically via an event or message the instant a golden record changes. This matters when staleness has real consequences: a customer's credit hold status needs to reach the order-entry system immediately, not at tonight's batch run, or an order could ship to a customer who shouldn't be extended further credit. Real-time distribution is more complex to build and operate — it requires message queues or event streams staying healthy — and that complexity should be reserved for the cases where staleness genuinely causes harm, not applied by default everywhere.

## Publish-subscribe vs. point-to-point

The simplest way to distribute master data is **point-to-point**: the system of record builds a direct integration to each consuming system individually. This works for two or three systems; it becomes unmanageable fast, because adding a tenth consuming system means building and maintaining a tenth custom integration, and the system of record has to know about every consumer's specific format.

A **publish-subscribe** pattern flips this: the system of record publishes golden record updates to a central channel (a message bus, an API, a hub in a hub-and-spoke MDM architecture from Lesson 3) without needing to know who's listening. Consuming systems subscribe to the updates relevant to them and handle their own ingestion. Adding an eleventh consumer means that system subscribes — the publisher doesn't change at all. This is why most MDM distribution architecture, past a handful of systems, converges on publish-subscribe rather than point-to-point.

## The ongoing operational reality

Distribution isn't a project that finishes — it's a running system that needs monitoring like any other. A consuming system that silently stops receiving updates (a broken subscription, a failed batch job) drifts out of sync invisibly, and nobody notices until someone acts on stale data. Mature MDM programs monitor distribution itself: confirming each consumer actually received and applied the last update, not just that the system of record successfully sent it.

## Key terms

| Term | Meaning |
|---|---|
| Distribution | Getting master data from its system of record out to every system that consumes it |
| Batch distribution | Sending updates on a fixed schedule as a bundled extract |
| Real-time distribution | Sending an update immediately via an event or message when the golden record changes |
| Publish-subscribe | A distribution pattern where the source publishes to a channel and consumers subscribe, without point-to-point integrations |

## Lab

Pick one master data domain from Chapter 3 (customer, product, vendor, employee, or location) and one change that could happen to it (a customer's credit hold, a product going out of stock, a vendor's bank details changing). Decide whether that specific change belongs in batch or real-time distribution, and explain the real-world consequence of getting that choice wrong in either direction.

## Check yourself

Explain why publish-subscribe distribution scales better than point-to-point as the number of consuming systems grows, using the "tenth system" example from this lesson.
