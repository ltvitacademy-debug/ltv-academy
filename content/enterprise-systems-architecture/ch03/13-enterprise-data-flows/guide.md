# Lesson 13 — Enterprise Data Flows

**Chapter 3 · Enterprise Design · Lesson 13 of 22**

## What you'll learn

- The three broad mechanisms data moves across an enterprise landscape through: batch, event-driven, and virtualized
- Where Change Data Capture, Platform Events, and Salesforce Connect each fit among those mechanisms
- Why Big Objects exist, and the trade-off they make to handle very high data volumes
- How to match a data flow's actual business need to the right mechanism, rather than defaulting to one

## Three mechanisms, one decision

Chapter 1 introduced the six integration patterns (Lesson 4). This lesson looks at the same territory from a different angle: the underlying *mechanisms* Salesforce offers for moving data across the enterprise landscape, independent of which specific pattern they implement. Broadly, three mechanisms recur:

- **Batch.** Data moves on a schedule, in bulk — a nightly export, a scheduled Bulk API job. Simple to reason about and reliable, at the cost of the data always being at least as stale as the batch interval.
- **Event-driven (real-time or near-real-time).** Data moves as discrete events fire, asynchronously, often with very low latency — Salesforce's Change Data Capture and Platform Events both work this way.
- **Virtualized.** Data isn't moved at all; it's read live from its source at query time — Salesforce Connect's external objects are the primary tool for this inside Salesforce.

## Change Data Capture and Platform Events

**Change Data Capture (CDC)** publishes change events automatically whenever a record is created, updated, deleted, or undeleted, covering custom objects and a defined subset of standard objects. It's built specifically to let external systems subscribe to Salesforce's own data changes without that external system having to poll Salesforce repeatedly asking "did anything change." **Platform Events** are a related but distinct mechanism: custom-defined events that fire based on business logic, not necessarily tied one-to-one to a record change, which makes them suited to signaling business moments (such as "a case was escalated") rather than purely structural data changes. Both are asynchronous — a published event isn't a guarantee the subscriber has processed it the instant it fires — so a System Architect designing against either one needs the receiving system to tolerate some delivery delay, not assume instantaneous processing.

## Big Objects for extreme volume

Some enterprise data genuinely outgrows what standard Salesforce storage is designed for: years of historical transaction records, high-frequency IoT-style event logs, or audit trails spanning hundreds of millions of records. **Big Objects** are Salesforce's purpose-built mechanism for this: they're designed to hold very large record volumes without the storage counting against the org's standard data storage limits, but the trade-off is real — Big Objects don't support the platform automation standard objects get (no triggers, no Flow, no out-of-the-box page layouts), so any user-facing display of Big Object data typically requires a custom Lightning web component built specifically for that purpose. A System Architect reaching for Big Objects is making a deliberate trade: massive scale and storage efficiency, in exchange for giving up the conveniences that come with a standard or custom object.

## Matching the mechanism to the need

The recurring discipline, consistent with Lesson 4's "requirement first, technology second" principle, is to let the business need determine the mechanism rather than defaulting to whichever one is most familiar. A requirement for "the ERP needs to know within seconds when a customer's credit status changes in Salesforce" points toward an event-driven mechanism like Platform Events or CDC. A requirement for "finance needs last night's final numbers every morning" points toward batch. A requirement for "sales reps need to see live inventory levels from the warehouse system, but that data should never actually live inside Salesforce" points toward virtualization through Salesforce Connect. Picking the wrong one in either direction — building real-time infrastructure for a nightly-batch need, or settling for stale batch data when the business genuinely needs near-real-time visibility — is an architecture mismatch, not a minor inefficiency.

## Key terms

| Term | Meaning |
|---|---|
| Change Data Capture (CDC) | Salesforce's mechanism for publishing change events whenever supported records are created, updated, deleted, or undeleted |
| Platform Events | Custom-defined events that fire based on business logic, not necessarily tied one-to-one to a record change |
| Big Objects | A Salesforce object type purpose-built for very high record volumes, without standard platform automation |
| Batch data movement | Moving data on a schedule, in bulk, accepting staleness up to the batch interval |

## Lab

Take three plausible enterprise data-flow requirements: (1) the ERP needs to know immediately when a high-value opportunity closes, (2) the data warehouse needs a complete nightly refresh of all Account data for reporting, and (3) a service agent needs to see a customer's current shipment status, which lives entirely in a logistics system and should never be duplicated into Salesforce. For each, name which of the three mechanisms (batch, event-driven, virtualized) fits, and justify your choice in one sentence.

## Check yourself

Can you name the three broad data-flow mechanisms this lesson describes, and give an example business need that fits each one? Can you explain the specific trade-off Big Objects make to achieve very high storage scale?

Sources: [Change Data Capture Events](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_objects_change_data_capture.htm), [Big Objects playbook](https://developer.salesforce.com/blogs/2026/06/big-objects-playbook-payload-capture-and-replay)
