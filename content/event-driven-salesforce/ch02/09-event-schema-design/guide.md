# Lesson 9 — Event Schema Design

**Chapter 2 · Designing Event-Driven Solutions · Lesson 9 of 16**

## What you'll learn

- Why an event's field design is a public contract, not an implementation detail
- "Fact, not command" as the core design rule for what belongs in an event
- Why you can't safely change a platform event field's type once subscribers depend on it
- Fat events vs. thin events, and the trade-off between them
- A practical field-design checklist for a new custom platform event

## An event's schema is a contract, not an internal detail

Once you publish a platform event and even one subscriber starts depending on its fields, that field list becomes a **public contract** between you and every subscriber — inside your org and potentially outside it. Unlike a private helper method you can freely refactor, changing a published event's fields can silently break a subscriber you don't control and may not even know about. Schema design deserves the same deliberateness you'd give a public REST API, not the "I'll just add a field later" looseness of an internal Apex class.

## Rule one: a fact, not a command

The single most common event-design mistake is modeling an event as a disguised instruction rather than an announcement of something that already happened. `Please_Cancel_Order__e` with an `OrderId__c` field is really a command wearing an event's clothes — it tells a subscriber what to do, not what happened. `Order_Cancelled__e` with an `OrderId__c` and `CancelledReason__c` describes a fact: the cancellation already occurred, and any number of subscribers can decide independently how to react to that fact (one subscriber un-reserves inventory, another sends a confirmation, a third notifies a partner — none of them were *told* to do those specific things, they each inferred their own reaction from the fact). Keeping to "fact, not command" is what keeps an event-driven design from quietly turning back into tightly-coupled request-response with extra steps.

## You can't casually change a published event's schema

A platform event field, once subscribers depend on it, is nearly as hard to change as a live REST API's response shape. Changing a field's **data type** on an existing platform event isn't something you can safely do after subscribers are live — existing subscriber code that expects a `Text` field will break against a field that's now a `Number`, and there's no graceful migration path for an in-place type change the way there might be for a custom object field in some cases. The safe patterns are: add a **new** field for a changed data need and leave the old one in place (deprecated but functioning) until every subscriber has migrated, or publish an entirely new event version (`Order_Cancelled_v2__e`) when the shape needs to change substantially. Either path requires coordinating with every known subscriber before the old field or event disappears — exactly the kind of cross-team coordination a decoupled design is supposed to minimize, which is why getting the schema right the first time matters disproportionately more for events than for most other Salesforce metadata.

## Fat events vs. thin events

There's a real design spectrum in how much data an event carries:

- A **thin event** carries just enough to identify what happened — often little more than a record ID and a change type — and expects subscribers to look up any additional detail themselves (a SOQL query, an API callout) if they need it.
- A **fat event** carries the full set of fields a subscriber is likely to need, so the subscriber can act without a follow-up lookup at all.

Thin events keep the event small and the schema simple, but create extra round-trips (and, for an external subscriber, extra API calls) whenever a subscriber needs more than the ID. Fat events save that round-trip but grow the event's schema surface area — and the contract-change problem above — every time a new subscriber needs one more field nobody anticipated. Most real designs land somewhere in between: carry the handful of fields you can confidently predict every near-term subscriber will need, and let the rare subscriber that needs something unusual do its own lookup rather than growing the event for everyone.

## A field-design checklist

Before finalizing a new custom platform event's fields, check:

- Does every field describe something that's already true, not an instruction for what to do next?
- Have you picked data types you're confident won't need to change? (Text vs. Number vs. Date decisions are much costlier to revisit on an event than on a custom object.)
- Is this event carrying enough for its most likely subscribers to act without an immediate follow-up lookup, without trying to anticipate every conceivable subscriber's needs?
- Have you named the event and its fields clearly enough that a subscriber built by a different team, who never read your Apex, can understand what happened from the field names alone?

## Key terms

| Term | Meaning |
|---|---|
| Event schema | The set of fields a platform event carries — a public contract once subscribers depend on it |
| Fact, not command | The rule that an event should describe something that already happened, not instruct a subscriber what to do |
| Thin event | An event carrying minimal data (often just an ID), expecting subscribers to look up detail themselves |
| Fat event | An event carrying enough data for a subscriber to act without a follow-up lookup |

## Lab

Design the fields for a new `Invoice_Overdue__e` custom platform event for a billing system. Write out the field list (name, type, one-sentence purpose for each), applying the "fact, not command" rule and the checklist above. Then write two sentences justifying where you landed on the thin-event/fat-event spectrum for this specific event — what's the most likely subscriber, and what does it need to act without an extra lookup?

## Check yourself

Why is changing a platform event's field type after subscribers are live a much bigger problem than changing a similar field on a custom object you control end-to-end? Can you rewrite a "command-shaped" event name of your own invention into a proper "fact" name, and explain why the rewrite matters?
