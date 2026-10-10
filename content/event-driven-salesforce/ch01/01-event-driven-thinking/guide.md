# Lesson 1 — Event-Driven Thinking

**Chapter 1 · Events in Salesforce · Lesson 1 of 16**

## What you'll learn

- The difference between request-response thinking and event-driven thinking
- What an "event" is in software architecture terms, independent of any one vendor
- Why Salesforce added a whole event layer on top of its existing request-response APIs
- The publisher/subscriber relationship, and why publishers don't know who's listening
- Where this course sits relative to the integration and automation skills you already have

## Two ways to connect systems

Up to this point in the Salesforce track, almost everything you've built follows the same shape: something asks a direct question and waits for a direct answer. A Lightning Web Component calls Apex and waits for a return value. Apex calls out to an external system with `HttpRequest`/`Http`/`HttpResponse` and waits for a response. A Flow calls a subflow and waits for it to finish. This is **request-response** (sometimes called synchronous, or RPC-style) thinking: Side A asks, Side B answers, and Side A is blocked — or at least waiting — until it gets that answer back.

**Event-driven** thinking inverts the relationship. Instead of asking a question and waiting, a system announces that *something happened* — a fact about the world, already true, already in the past tense — and moves on without waiting for anyone to react. "Order #4521 just shipped" is an event. It isn't a request for anything to happen; it's a statement that something already did. Any number of other systems can notice that announcement and react to it on their own schedule, or none can, and the system that made the announcement never knows or cares which.

## What makes something an "event"

Three properties define an event, regardless of which vendor's platform you're using:

- **It already happened.** An event describes a fact in the past — a record was created, a status changed, a threshold was crossed — not an instruction for the future.
- **It's published once, to a channel, not to a specific recipient.** The publisher doesn't address the event to "the inventory system" or "the email service." It puts the event on a channel and is done.
- **Subscribers decide for themselves whether and how to react.** Zero, one, or many subscribers can be listening to the same channel at the same time, each running completely independent logic in response to the same event.

This is the **publish/subscribe** (pub/sub) pattern, and it's the foundation under everything else in this course — Platform Events, Change Data Capture, and the Streaming/Pub-Sub APIs are all specific Salesforce implementations of this same general idea.

## Why Salesforce needed an event layer at all

Salesforce already gives you triggers, Flow, and Process Builder-style automation that reacts to DML inside a single transaction, and REST/SOAP/Bulk APIs for an external system to request data on demand. Neither of those covers the event-driven case well:

- A trigger only sees what happens inside its own transaction and org. It can't cleanly notify an external logistics system, a different Salesforce org, or a Heroku app that something changed, without turning that notification into a slow, tightly-coupled synchronous callout sitting inside the triggering transaction.
- An external system polling a REST API every few minutes to ask "did anything change?" wastes API calls, adds latency, and still misses changes that happen and get reversed between polls.

Salesforce's event layer — Platform Events (Lesson 2) and Change Data Capture (Lesson 4), delivered over the Streaming API or the newer Pub/Sub API (Lessons 5 and 13) — exists to solve exactly this: let something that happens inside Salesforce be announced the moment it happens, to any number of listeners inside or outside the org, without the publisher blocking on or even knowing about those listeners.

## Decoupling is the whole point

The benefit event-driven thinking buys you is **decoupling**: the publisher and subscriber don't need to know about each other, don't need to be deployed together, and don't need to be available at the same instant. A new subscriber can start listening to an existing event channel tomorrow without the publisher changing a single line of code. An existing subscriber can go offline for maintenance without blocking the publisher at all. Chapter 2 of this course builds directly on this idea when it covers decoupled architectures and event schema design.

## Key terms

| Term | Meaning |
|---|---|
| Request-response | A synchronous interaction where the caller waits for a direct answer before continuing |
| Event | An announcement that something already happened, published without targeting a specific recipient |
| Publish/subscribe (pub/sub) | The pattern where publishers put events on a channel and any number of subscribers independently react |
| Decoupling | Publishers and subscribers operating without knowing about, or depending on the availability of, each other |

## Lab

Pick a business process you already know from the Salesforce Administration or Flow Automation courses — for example, an Opportunity closing as Won. Write two short paragraphs: one describing how that moment is normally handled with request-response thinking (a Flow or trigger that directly updates related records in the same transaction), and one re-imagining it as an event: what fact would you announce, what channel would it go on, and name at least two independent subscribers (inside or outside Salesforce) that might react to that same announcement differently.

## Check yourself

Can you explain, in your own words, why a publisher in an event-driven system doesn't need to know which subscribers exist? Can you name one real limitation of pure request-response automation that an event-driven approach solves?
