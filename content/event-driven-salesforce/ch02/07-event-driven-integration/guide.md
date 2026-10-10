# Lesson 7 — Event-Driven Integration

**Chapter 2 · Designing Event-Driven Solutions · Lesson 7 of 16**

## What you'll learn

- How event-driven integration compares to the callout-based integration you already know
- The event relay concept for forwarding Salesforce events to external destinations
- Where an external system publishes into Salesforce rather than only consuming from it
- A realistic integration shape combining CDC, a custom event, and an external subscriber
- The trade-offs: what event-driven integration buys you, and what it costs

## You already know one integration style

The Salesforce Integration Development course covered outbound integration through Apex HTTP callouts and Named Credentials: Salesforce as the caller, reaching out to an external system and waiting for a response. That's **synchronous, Salesforce-initiated** integration. Event-driven integration is a different shape entirely: Salesforce (or the external system) **announces** something happened, and the other side **reacts whenever it's ready**, with no callout, no waiting, and no direct knowledge of who's listening.

## Three integration directions

Event-driven integration with Salesforce flows in three directions, and a real architecture often uses more than one at once:

- **Salesforce publishes, an external system subscribes.** A platform event or CDC change event fires inside Salesforce; an external subscriber (a middleware platform, a custom Pub/Sub API client, a CometD client) listens on that channel and reacts — updating an ERP, notifying a logistics partner, triggering a downstream workflow. No Apex callout code is involved on the Salesforce side at all; the event bus does the work of getting the message out.
- **An external system publishes, Salesforce subscribes.** An external application can publish a platform event into Salesforce using the REST API, SOAP API, or the Pub/Sub API (covered in Lesson 13), and an Apex trigger or Flow inside Salesforce reacts to it exactly like any other platform event. This lets an outside system notify Salesforce of something without Salesforce ever polling or calling out to ask.
- **Event relay: Salesforce events forwarded to a cloud event bus.** Salesforce's **Event Relay** feature is a managed, declarative connector that forwards platform events and CDC events from your org directly to Amazon EventBridge, without you building and running a custom subscriber client at all — Salesforce establishes and maintains the subscription on your behalf. Events can also flow back the other direction: an EventBridge API destination can send events back into Salesforce. This is the right tool when your downstream subscribers already live in an AWS-centric integration landscape, rather than reaching for a hand-rolled Pub/Sub API client to do the same job.

## A realistic combined shape

Consider an order-to-fulfillment scenario: a Flow in Salesforce marks an `Order__c` record `Status__c = 'Ready to Ship'`. Because CDC is enabled on `Order__c`, that update automatically produces a CDC change event. An Apex trigger subscribed to that CDC channel checks `changedFields` for `Status__c`, and — only when the new status is `'Ready to Ship'` — publishes a custom `Fulfillment_Requested__e` platform event carrying just the fields a fulfillment system actually needs (order number, shipping address, line items summary), rather than every field CDC would have exposed. An external fulfillment system, built against the Pub/Sub API, subscribes to `Fulfillment_Requested__e` and kicks off its own process the moment that event arrives. Three distinct event mechanisms (CDC, a custom platform event, Pub/Sub API) each doing the one job they're suited for, chained together.

## What this buys you, and what it costs

Event-driven integration isn't a strictly better replacement for callout-based integration — it's a different trade-off:

- **It buys you:** the publisher doesn't need to know the external system's endpoint, authentication, or even whether it's currently running; multiple subscribers can react to the same fact without the publisher changing; and a slow or temporarily-down subscriber doesn't block or fail the publishing transaction.
- **It costs you:** you give up the immediate, synchronous confirmation a callout gives you ("the external system says this succeeded, right now"). Debugging is harder, because the cause (the publish) and the effect (the subscriber's reaction) are separated in time and often in logs across two different systems. And you take on the duplicate-delivery and ordering considerations from Lesson 6 — a callout-based integration doesn't have to think about replay IDs or idempotency the way an event-driven one does.

Choosing between the two isn't about which is "modern" — Lesson 15 builds a decision framework for exactly this choice.

## Key terms

| Term | Meaning |
|---|---|
| Event relay | A mechanism forwarding platform/CDC events from one Salesforce org to another org or supported external destination |
| Salesforce-initiated callout | The synchronous integration style where Apex calls out and waits for a response |
| External publisher | An outside system publishing a platform event into Salesforce via REST/SOAP/Pub-Sub API, rather than Salesforce calling out |
| Combined event chain | A design where one event mechanism's reaction publishes a different, purpose-built event for the next subscriber |

## Lab

Take the order-to-fulfillment scenario above and diagram it as a short written sequence (five or six numbered steps, in plain English, no code) from "Flow updates Order__c status" through "external fulfillment system receives Fulfillment_Requested__e." For each step, note which mechanism is responsible (CDC, Apex trigger, custom platform event, Pub/Sub API subscriber) and why that mechanism — rather than one of the others — is the right tool for that specific step.

## Check yourself

What's the difference between "Salesforce publishes, an external system subscribes" and "an external system publishes, Salesforce subscribes" — and can you give a believable business scenario for each direction? Why might a design chain CDC into a custom platform event rather than having the external subscriber listen to the CDC channel directly?
