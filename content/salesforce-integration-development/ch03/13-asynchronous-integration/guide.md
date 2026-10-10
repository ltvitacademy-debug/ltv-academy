# Lesson 13 — Asynchronous Integration

**Chapter 3 · Asynchronous and Event-Based Integration · Lesson 13 of 23**

## What you'll learn

- The four asynchronous Apex mechanisms and what each is actually good for
- Why async Apex is often the only legal way to combine a callout with DML
- The difference between point-to-point async work and event-driven integration
- How Queueable Apex differs from a simple `@future` method for integration work
- How this chapter's remaining lessons build on the async foundation

## Why integration code so often goes asynchronous

Lesson 7 established the rule: a transaction can't make a callout while it has pending, uncommitted DML in that same transaction. A huge share of real integration requirements need both — save something in Salesforce *and* tell (or ask) an external system about it. Asynchronous Apex is how that gets resolved: by giving the callout and the DML their own separate transactions, chained together, rather than trying to force both into one.

## The four mechanisms

- **`@future(callout=true)` methods** — the simplest option: a static method, called from synchronous code, that runs later in its own transaction. Good for "fire off one callout after this record saves" when you don't need to pass complex state (future method parameters are limited to primitives and collections of primitives, not SObjects) or chain further work afterward.
- **Queueable Apex** (`implements Queueable, Database.AllowsCallouts`) — a real object, so it can hold arbitrary state (including SObjects) between enqueue and execution, and one Queueable job can enqueue another, letting you chain a sequence of steps. This is the pattern used for the retry logic in Lesson 6 and the Order Sync project in Lesson 21.
- **Batch Apex** (`implements Database.Batchable<sObject>`) — built for processing large record volumes in scoped chunks via `start`/`execute`/`finish`, with each `execute` invocation getting its own fresh transaction and governor limits. The natural fit for a bulk, scheduled sync against an external system (Lesson 19's Batch Data Synchronization pattern).
- **Scheduled Apex** (`implements Schedulable`) — cron-like recurring execution, often used to kick off a Batch or Queueable integration job on a timer (nightly, hourly) rather than in response to a specific user action.

## Point-to-point async vs event-driven integration

These four mechanisms are all "point-to-point" in a specific sense: a piece of code explicitly decides to enqueue a specific job that does a specific thing. Platform Events (Lesson 14) and Change Data Capture (Lesson 15) are different — they're **publish/subscribe**, where a publisher doesn't know or care who (if anyone) is listening, and any number of subscribers can react independently. Both styles are asynchronous, but they solve different problems: point-to-point async is right when you know exactly what needs to happen next; event-driven integration is right when multiple, decoupled systems might each need to react to the same thing happening, now or in the future, without the publisher having to know about any of them.

## Queueable over `@future` for anything with real state

A common mistake is defaulting to `@future(callout=true)` out of habit and then fighting its limitations. If the async work needs to carry an SObject, a list of IDs with associated data, or needs to potentially chain into a second step (like the retry pattern from Lesson 6), Queueable Apex is almost always the better fit — it costs little extra code for a real object with a constructor, and it avoids the parameter-type restrictions future methods impose.

## Key terms

| Term | Meaning |
|---|---|
| @future(callout=true) | Simplest async mechanism; limited parameter types, no chaining |
| Queueable Apex | Stateful async job supporting SObjects and job chaining |
| Batch Apex | Scoped-chunk processing for large record volumes, each chunk its own transaction |
| Scheduled Apex | Cron-like recurring execution, often triggering a Batch or Queueable job |
| Point-to-point vs event-driven | Explicitly enqueuing a known next step vs. decoupled publish/subscribe |

## Lab

Scenario-analysis exercise: a trigger needs to (1) call out to validate a new Contact's email address with an external verification service, and record the result back on the Contact. Decide which of the four async mechanisms fits best, and justify why the other three are worse fits for this specific scenario. Then do the same for: (2) syncing all Accounts modified in the last 24 hours against an ERP's customer master, once per night.

## Check yourself

Name all four async Apex mechanisms from memory and one thing each is specifically good for. Then explain the difference between point-to-point async work and event-driven integration, and why that distinction matters for choosing a tool.
