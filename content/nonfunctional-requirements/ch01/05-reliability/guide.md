# Lesson 5 — Reliability

**Chapter 1 · Nonfunctional Requirements · Lesson 5 of 18**

## What you'll learn

- Reliability as an NFR: correct, consistent behavior over time, including how the system behaves when something fails
- The difference between reliability and availability — two related but distinct NFRs
- Idempotency, retry logic, and error handling as the core reliability design tools in Salesforce integrations
- Why reliability requirements must specify failure behavior, not just success behavior

## Reliability is about failure, not just success

A **reliability** NFR describes how consistently a system behaves correctly over time, including under conditions that aren't the happy path: a callout that times out, an API that returns a transient error, two records being updated in a race condition, a batch job hitting a locked record. A system that works perfectly every time nothing goes wrong has told you nothing about its reliability — reliability is specifically about what happens when something does go wrong, and whether the system recovers, degrades gracefully, or silently corrupts data.

This is distinct from **availability**, covered in depth in Lesson 12: availability asks whether the system is up and reachable; reliability asks whether, while it's up, it behaves correctly. A system can be 100% available and still unreliable — always reachable, but intermittently processing records incorrectly, dropping integration messages, or applying automation inconsistently depending on timing.

## Idempotency: the core reliability property for integrations

**Idempotency** means that performing the same operation more than once produces the same result as performing it once — it's one of the most important reliability properties in Salesforce integration design, because network failures guarantee that operations will sometimes be retried, and a retried operation must not create a duplicate or corrupt the data.

Consider an integration that creates an Order record when a payment confirmation arrives. If the confirmation callout succeeds on Salesforce's side but the acknowledgment back to the sender is lost in transit, the sender will likely retry the same confirmation. A non-idempotent design creates a second, duplicate Order. An idempotent design — for example, checking for an existing Order with the same external ID before creating a new one, or using Salesforce's upsert operation against an External ID field — produces the same end state (one Order) whether the confirmation was processed once or three times. Designing for idempotency up front is far cheaper than discovering duplicate records months into production and trying to reconcile which ones are real.

## Retry logic and error handling as explicit design

A reliability NFR should specify what happens when a dependency fails, not just what happens when it succeeds. For a synchronous callout to an external system, that means deciding: how many retries, with what backoff, and what the user sees if all retries fail. For asynchronous integration patterns, Salesforce's Platform Events and the Streaming API support at-least-once delivery semantics in various configurations, which means a subscriber has to be designed to tolerate occasionally receiving the same event more than once — another place idempotency matters.

Apex itself offers reliability tools worth naming in an NFR's design notes: try/catch blocks around callouts and DML, custom exception handling that logs failures somewhere a human will actually see them (rather than silently swallowing an exception), and Database methods with `allOrNone` set to false when a bulk operation should save the records that succeeded and report the ones that failed, rather than rolling back an entire batch over one bad record.

## Writing a reliability requirement that's actually testable

A vague "the integration must be reliable" is as untestable as "the system must be fast." A real reliability NFR names the failure scenario and the required behavior: "If the external payment gateway does not respond within 10 seconds, the integration must retry up to 3 times with exponential backoff; if all retries fail, the Order record must be flagged for manual review rather than left in an ambiguous state, and the support queue must be notified." That's testable — a reviewer can simulate the gateway failing and check whether the specified behavior actually happens.

## Key terms

| Term | Meaning |
|---|---|
| Reliability | The system behaving correctly and consistently over time, including how it handles failure |
| Availability | Whether the system is up and reachable (distinct from whether it behaves correctly while up) |
| Idempotency | A property where repeating the same operation produces the same result as performing it once |
| At-least-once delivery | A messaging guarantee where a message may be delivered more than once, requiring the receiver to tolerate duplicates |
| allOrNone | A Database method parameter controlling whether a bulk DML operation rolls back entirely on one failed record, or saves the successes and reports the failures |

## Lab

An integration receives a webhook every time a customer updates their shipping address, and creates a Task for the fulfillment team. The sending system is known to occasionally retry a webhook delivery when it doesn't receive a fast-enough acknowledgment. Write a reliability NFR for this integration that specifically addresses the duplicate-delivery risk, and describe the idempotency mechanism (an External ID, a dedupe check, or similar) you'd design into the Apex that processes the webhook.

## Check yourself

Can you explain the difference between reliability and availability with an example where a system has one but not the other? Can you define idempotency and explain why it matters specifically for integrations that might be retried?
