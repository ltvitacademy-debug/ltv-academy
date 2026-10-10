# Lesson 2 — Platform Events

**Chapter 1 · Events in Salesforce · Lesson 2 of 16**

## What you'll learn

- What a Platform Event is, and how its definition differs from a custom object
- The `__e` suffix and the handful of fields every platform event automatically carries
- The difference between high-volume and standard-volume platform events
- The two publish-behavior options and when each one matters
- How to define a custom platform event in Setup

## A platform event is not a custom object

A **Platform Event** is a Salesforce metadata type purpose-built to represent something that happened, built to be published and subscribed to rather than queried and edited. You define one in Setup under **Platform Events**, the same way you'd define a custom object — give it a label, a plural label, and add custom fields — but a platform event is fundamentally different from a custom object in a few important ways:

- Platform event records are **never stored as queryable, updatable rows** the way `Account` or a custom object are. You can't run a SOQL `SELECT` against a platform event's past activity; once it's published and delivered, it's gone (subject to the retention window covered in Lesson 6).
- Every platform event API name ends in **`__e`** (compare to `__c` for a custom object field or object), so `Order_Shipped__e` is a platform event, while `Order_Shipped__c` would be a custom object.
- You add custom fields to a platform event exactly like a custom object, with the usual `__c` suffix on each field — `Order_Number__c`, `Carrier__c`, and so on — but the object itself holds no relationships, no page layouts, and no list views, because nothing ever gets a "view" of a platform event after the moment it's delivered.

Every platform event also automatically carries a `ReplayId` (its position in the event stream, covered in Lesson 6) and an `EventUuid` — fields you don't define yourself.

## High-volume vs. standard-volume

When you define a platform event, Salesforce classifies it as either **high-volume** or **standard-volume**, and this choice changes how publishing actually behaves:

- **High-volume platform events** are queued first and written to the event bus once resources are available, with the platform retrying internally if the initial publish attempt fails. A successful call to publish only confirms the event was *queued*, not that it has already been delivered. High-volume events are the default for any new platform event definition (API version 45.0 and later), and they're built for the kind of throughput an integration or high-frequency automation needs.
- **Standard-volume platform events** are the older model. Historically they published synchronously and immediately; current releases (Spring '21 and later) publish standard-volume events asynchronously as well, closing most of the practical gap with high-volume events. Salesforce has announced that standard-volume custom platform events are being retired — new event definitions should default to high-volume, and any existing standard-volume custom event should eventually be migrated.

For any new platform event you build today, there's rarely a reason to choose anything other than the high-volume default.

## Publish behavior: Immediate vs. After Commit

Every platform event definition also has a **Publish Behavior** setting with two options:

- **Publish Immediately.** The event is published the moment the `EventBus.publish()` call runs, regardless of whether the surrounding transaction later commits or rolls back. This fits events used for things like debug logging, where you want a record of what was attempted even if the overall transaction fails.
- **Publish After Commit.** The event is only published once the enclosing transaction commits successfully; if the transaction rolls back, the event is never published at all. This is the right choice whenever a subscriber needs to trust that the data behind the event is actually durable — for example, an "Order Confirmed" event that an external fulfillment system will act on. You should not build a subscriber that assumes committed data unless the publisher uses this setting.

## Defining a platform event

In Setup, search **Platform Events**, click **New Platform Event**, and fill in:

- **Label / Plural Label / Object Name** — same conventions as a custom object; the Object Name will automatically get the `__e` suffix.
- **Publish Behavior** — Publish Immediately or Publish After Commit, per the guidance above.
- Then add custom fields the same way you would on a custom object — text, number, checkbox, picklist, and so on (platform events don't support every field type a custom object does; for example, they don't support relationship fields like lookups or master-detail).

Once saved, the event is immediately available to publish from Apex, Flow, or an external API client, and to subscribe to from Apex triggers, Lightning Web Components, or external subscribers — all covered starting next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Platform Event | A Salesforce metadata type representing something that happened, published once and not stored as a queryable row |
| `__e` suffix | The API-name suffix identifying a platform event object, parallel to `__c` for custom objects |
| High-volume platform event | The default, higher-throughput event type; queued then published asynchronously |
| Standard-volume platform event | The legacy event type being phased out in favor of high-volume |
| Publish Behavior | The platform event setting controlling whether publish happens immediately or only after the transaction commits |

## Lab

In a free Developer Edition or scratch org, go to Setup → Platform Events → New Platform Event. Define an event called `Order_Shipped` (the record ends up with API name `Order_Shipped__e`) with Publish Behavior set to **Publish After Commit**, and add three custom fields: `Order_Number__c` (Text), `Carrier__c` (Text), and `Shipped_Date__c` (Date). Save it, then open the event's detail page and confirm the automatically-added `ReplayId` and `EventUuid` fields are present. Write one sentence explaining why you chose Publish After Commit for this particular event rather than Publish Immediately.

## Check yourself

What's the practical difference between a platform event and a custom object in terms of whether you can query its past records? When would you deliberately choose Publish Immediately over Publish After Commit?
