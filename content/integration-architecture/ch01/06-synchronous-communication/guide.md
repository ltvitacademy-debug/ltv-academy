# Lesson 6 — Synchronous Communication

**Chapter 1 · Integration Foundations · Lesson 6 of 28**

## What you'll learn

- What synchronous communication means in an integration context, and why it's the pattern most people reach for by default
- The real cost of synchronous communication: the caller is blocked, waiting, for as long as the callee takes to respond
- How Salesforce's own execution model constrains synchronous integration specifically (Apex callout timeouts)
- When synchronous is genuinely the right choice, and when it's a default being used without being questioned

## The caller waits

**Synchronous communication** means the calling system sends a request and then blocks — stops and waits — until it receives a response, before it can continue doing anything else. This is the mental model most people default to because it's how most everyday software works: you click a button, you wait for the page to respond, you see the result. A Salesforce Flow calling an external credit-check API and pausing until the score comes back, or an Apex trigger making an HTTP callout and waiting for a 200 response before continuing, are both synchronous integration patterns.

Synchronous communication has real advantages that explain why it's the default: it's conceptually simple (the response comes back right where you asked for it, in the same transaction, in the order you expect), and it gives the caller an immediate, definitive answer — success or failure — with no ambiguity about whether the other system actually processed the request.

## The real cost: you're stuck waiting on someone else's clock

The cost of synchronous communication is that the calling system's performance becomes dependent on the called system's performance and availability — a dependency the caller doesn't fully control. If the external system is slow, the caller is slow. If the external system is down, the caller's transaction fails or hangs, even though the caller's own logic was working perfectly. This coupling of availability is the central trade-off synchronous communication makes, and it's why it's the wrong default for flows that don't actually need an immediate answer.

Salesforce's own execution model enforces hard limits on synchronous callouts specifically because of this risk: a single Apex transaction can make a maximum of 100 callouts, each callout defaults to a 10-second timeout (configurable up to a maximum of 120,000 milliseconds), and the cumulative callout time across an entire transaction is capped at 120 seconds, additive across every callout that transaction makes. These aren't arbitrary numbers — they exist so that one slow or unresponsive external system can't indefinitely tie up Salesforce's own shared compute resources. An architect designing a synchronous integration has to design within these limits explicitly, not discover them in production when a transaction starts timing out.

## When synchronous is the right call — and when it's just the default

Synchronous communication is the right choice when the business process genuinely cannot proceed without an answer right now — a payment authorization before completing a checkout, a real-time inventory check before confirming an order, a credit score needed before a loan decision screen can continue. In each of these, the user or process is stuck either way; the only question is whether Salesforce holds the connection open while waiting, or does something else and checks back later.

It's the wrong choice — or at least an unexamined default — when the calling process doesn't actually need the answer immediately to keep moving. A common anti-pattern is an Apex trigger making a synchronous callout to log an event to an external system, or to kick off a downstream process that has no actual dependency on the trigger's own success. In both cases, the triggering transaction is being needlessly coupled to another system's availability and response time for no business reason — exactly the kind of decision Lesson 11 asks architects to interrogate before defaulting to it.

## Key terms

| Term | Meaning |
|---|---|
| Synchronous communication | A pattern where the caller sends a request and blocks, waiting for a response before continuing |
| Availability coupling | The calling system's reliability becoming dependent on the called system's uptime and response time |
| Apex callout limits | Salesforce's governor limits on synchronous HTTP callouts: 100 per transaction, 120-second cumulative timeout cap |

## Lab

A Salesforce order-entry Flow currently makes a synchronous callout to a shipping-rate API to calculate shipping cost before the rep can submit the order, and a second synchronous callout to a marketing platform to log the order for a newsletter segment, with the Flow failing if either callout fails. Evaluate both callouts against the "does the process genuinely need the answer right now" test from this lesson, and recommend which one should stay synchronous and which one is a candidate for the asynchronous pattern covered next lesson, with your reasoning.

## Check yourself

Can you explain, in your own words, why synchronous communication couples the caller's reliability to the callee's reliability? Can you state Salesforce's Apex callout limits (callouts per transaction, default and maximum timeout, cumulative timeout cap) without checking back?
