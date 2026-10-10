# Lesson 7 — Asynchronous Communication

**Chapter 1 · Integration Foundations · Lesson 7 of 28**

## What you'll learn

- What asynchronous communication means, and how it removes the availability coupling from Lesson 6
- Request-reply vs. fire-and-forget, the two sub-patterns within asynchronous communication
- Salesforce's asynchronous building blocks at a conceptual level: Platform Events, Change Data Capture, Queueable/Future/Batch Apex
- The real cost asynchronous communication introduces in exchange for removing the caller's wait

## The caller doesn't wait

**Asynchronous communication** means the calling system sends a request (or publishes an event, or enqueues a job) and continues its own work immediately, without blocking to wait for a response. Whatever happens on the other end happens independently, on its own schedule, and the calling system either doesn't need to know the outcome at all, or finds out later through a separate mechanism. This directly removes the availability coupling from Lesson 6: if the other system is slow or briefly unavailable, the caller's own transaction isn't blocked waiting on it.

## Two sub-patterns: request-reply and fire-and-forget

Asynchronous communication isn't one single pattern — it splits into two meaningfully different sub-patterns depending on whether the caller ever expects to learn the outcome:

- **Fire-and-forget.** The caller sends the request or publishes the event and genuinely does not need to know what happened to it afterward — no correlation, no follow-up check. A common example is publishing a Platform Event to notify any number of interested subscribers that "this Opportunity just closed," without caring whether any particular subscriber actually processed it, or how. Fire-and-forget is appropriate when the triggering system has no business reason to track the outcome — notifications, logging, and broadcast-style updates are the classic cases.
- **Request-reply (asynchronous version).** The caller does eventually need to know the outcome, but is willing to find out later rather than block right now. This typically works through a correlation identifier: the caller sends a request tagged with a unique ID, continues its own work, and either polls for a result tagged with that same ID later, or receives a separate callback/notification containing it. This is more complex to build than fire-and-forget — it requires tracking which outstanding requests are still waiting for a reply, and handling the case where a reply never arrives at all — but it preserves the caller's ability to know the result without paying the blocking cost of true synchronous communication.

## Salesforce's asynchronous building blocks, conceptually

Several Salesforce platform features exist specifically to support asynchronous patterns, and an architect needs to know what each is for at a conceptual level:

- **Platform Events** are Salesforce's native publish-subscribe mechanism: a system (Salesforce or external) publishes an event, and any number of subscribers — Apex triggers, Flows, external systems via CometD or the Pub/Sub API — receive it independently, without the publisher waiting on any of them. Published events are retained on the event bus for a defined window (72 hours) so a subscriber that's briefly offline can still retrieve what it missed.
- **Change Data Capture (CDC)** is built on the Platform Events infrastructure specifically to publish change events — creates, updates, deletes, and undeletes — for selected Salesforce objects, so external systems can subscribe to a stream of "what changed" rather than polling Salesforce repeatedly to find out.
- **Queueable, Future, and Batch Apex** let Salesforce-side logic run asynchronously relative to the transaction that triggered it — useful for a callout or a long-running process that shouldn't block the user's original save, and for work (like Batch Apex) that needs to run over very large data volumes in chunks.

## The real cost of going asynchronous

Removing the caller's wait doesn't remove complexity — it relocates it. Asynchronous flows require some mechanism for the caller to find out later if something needs tracking (the correlation-ID problem above), they make debugging harder because a failure can surface far away in time and system from the action that caused it, and they introduce the ordering and timing questions from Lesson 2 — events don't always arrive in the order they were published, and a subscriber has to be designed to cope with that rather than assume it away.

## Key terms

| Term | Meaning |
|---|---|
| Asynchronous communication | A pattern where the caller continues its own work immediately, without blocking for a response |
| Fire-and-forget | An asynchronous pattern where the caller never needs to learn the outcome of what it triggered |
| Request-reply (async) | An asynchronous pattern where the caller eventually needs the outcome, tracked via a correlation identifier |
| Platform Events | Salesforce's native publish-subscribe mechanism for asynchronous, event-based integration |
| Change Data Capture | A Platform-Events-based feature that publishes change events for selected Salesforce object records |

## Lab

A Salesforce org needs to notify an external data warehouse whenever any Account's billing address changes, and separately needs to send a loan application to an external underwriting system and eventually show the rep the underwriting decision once it's ready (which can take anywhere from seconds to an hour). Identify which of the two asynchronous sub-patterns (fire-and-forget or request-reply) fits each scenario, and name one Salesforce building block from this lesson you'd use for the address-change notification.

## Check yourself

Can you explain the difference between fire-and-forget and asynchronous request-reply in your own words? Can you name three Salesforce asynchronous building blocks from this lesson and, for each, what kind of problem it's built to solve?
