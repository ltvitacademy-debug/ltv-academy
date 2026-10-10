# Lesson 10 — CRM + ERP: Failure and Reconciliation

**Chapter 2 · Deep Dives · Lesson 10 of 20**

## What you'll learn

- Why retry-with-backoff beats immediate, unlimited retries for a failed sync call
- What a dead-letter queue is and why failed messages need somewhere to go besides disappearing
- Why idempotency (via upsert on an External ID) is what makes retries safe at all
- How a scheduled reconciliation job catches what retries and dead-letter handling miss

## Picking up where Lesson 7 left off

Lesson 7 looked at Doverfield's ERP outage as a failure of design — a synchronous callout that shouldn't have been synchronous. This lesson goes deeper into a related but distinct question: once Doverfield has fixed that specific coupling problem and moved order creation to an asynchronous, event-driven pattern (Lesson 1), what happens when an individual sync *call* still fails, for any ordinary reason — a transient network blip, the ERP briefly rejecting a request, a timeout?

## Retry with backoff, not retry forever

A naive retry strategy — immediately retry a failed call, in a tight loop, until it succeeds — makes outages worse, not better: if the ERP is struggling under load, a flood of immediate retries from every failed call adds more load to the exact system that's already failing. **Retry with exponential backoff** waits a short interval before the first retry, then a longer interval before the next, and so on, up to a capped maximum number of attempts — giving the struggling system room to recover instead of being hit hardest exactly when it's weakest. Doverfield's order-creation sync uses this pattern: a failed attempt waits, retries, and if it still fails, waits longer before trying again, rather than hammering the ERP continuously.

## The dead-letter queue: where failures go, not where they disappear

Backoff and retry eventually has to stop — no system should retry forever. When Doverfield's sync exhausts its retry attempts without success, the failed message doesn't just vanish; it lands in a **dead-letter queue**, a holding area for messages that couldn't be processed, specifically so a human (or an automated alert) can investigate and either manually resubmit the message once the underlying problem is fixed, or determine that the message itself was bad and needs correction before resubmission. A design with no dead-letter queue and no retry cap either retries forever (compounding an outage) or silently drops the failed message (losing a sales order that a rep believes was already created) — both worse outcomes than giving the failure a visible, recoverable home.

## Idempotency is what makes retrying safe in the first place

None of this retry-and-recover design works safely unless retrying the same operation twice produces the same result as running it once. If Doverfield's sync created a brand-new sales order on every attempt, a retried call that actually succeeded the first time (but whose success response got lost in transit) would create a duplicate order on the retry. This is exactly why Lesson 1's External ID and `upsert` pattern matters here, not just for the happy path: an `upsert` keyed on a stable External ID either creates the order if it doesn't exist yet, or updates the same existing order if it already does — so retrying a call that actually already succeeded is harmless, because the second attempt lands on the same record instead of creating a second one.

## Scheduled reconciliation: catching what retries can't

Retries and dead-letter handling cover failures the sync system itself detects. They don't catch cases where a message was silently lost before it even reached the retry logic, or where a bug briefly produced incorrect data that didn't technically "fail." Doverfield runs a **scheduled reconciliation job** — a periodic batch comparison between Salesforce's and the ERP's record counts and key field values for a sample of recent records — specifically to catch this category of drift, on a cadence independent of and in addition to the real-time sync. Reconciliation is deliberately not a replacement for real-time sync and retry logic; it's a second, slower safety net that catches exactly the failures the first net was never designed to see.

## Key terms

| Term | Meaning |
|---|---|
| Retry with exponential backoff | Progressively longer waits between retry attempts, capped at a maximum, to avoid overloading a struggling system |
| Dead-letter queue | A holding area for messages that exhausted retries without success, awaiting human investigation |
| Idempotency | The property that repeating an operation produces the same result as running it once, making retries safe |
| Reconciliation job | A periodic batch comparison that catches sync drift retries and dead-letter handling don't detect |

## Lab

Doverfield's dead-letter queue has accumulated 40 failed order-creation messages over the past week, all failing for the same reason: a new required field the ERP started enforcing that Salesforce's sync payload doesn't populate. Walk through how this failure would have been surfaced (which mechanism catches it, and at what point), and describe the two separate fixes needed: one for the 40 already-stuck messages, and one structural fix so new messages stop landing in the dead-letter queue for this same reason.

## Check yourself

Can you explain why immediate, unlimited retries can make an outage worse rather than better? Can you state, in your own words, why idempotency (via upsert and a stable External ID) is a precondition for retry logic being safe, not a separate, unrelated feature?
