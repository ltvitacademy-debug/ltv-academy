# Distributed Systems and Salesforce

Chapters 1 and 2 covered distributed systems concepts in the abstract: availability, scalability, consistency, messaging, failure handling. This chapter applies them — starting here, with the platform many of you work with directly. Salesforce's multi-tenant cloud is itself a large distributed system, and several of its most distinctive features exist specifically to enforce the concepts you've already learned.

## What you'll learn

- Why Salesforce's multi-tenant architecture makes it a distributed system in its own right
- Governor limits as a real-world backpressure and rate-limiting mechanism
- Asynchronous Apex and Platform Events as real examples of asynchronous messaging
- Why none of this is unique to Salesforce — it's the same handful of concepts, applied

## Multi-tenancy is a distributed-systems problem

Salesforce runs enormous numbers of customer organizations ("orgs") on shared infrastructure. A single misbehaving org — one running an enormous, inefficient query or an infinite loop — could, in principle, degrade performance for every other org sharing that infrastructure if nothing stopped it. That's the same "noisy neighbor" problem every multi-tenant distributed system has to solve, and Salesforce solves it the same way any distributed system does: with hard limits enforced on every tenant, consistently.

## Governor limits as backpressure and rate limiting

Salesforce enforces **governor limits** on things like the number of SOQL queries, CPU time, DML statements, and callouts a single transaction can use. Conceptually, these are exactly the rate-limiting idea from this course: a deliberate cap on usage, enforced regardless of how much the requester "needs," to protect the shared system from any one tenant consuming more than its share. Rather than letting one runaway transaction degrade the platform for everyone else — the cascading-failure pattern from Lesson 10 — Salesforce fails that one transaction fast, with a governor limit exception, and keeps the rest of the platform healthy. This course deliberately doesn't quote specific limit numbers, since Salesforce revises them between releases — the concept is what matters, not the current ceiling.

## Asynchronous Apex and Platform Events

Salesforce gives developers several ways to move work off the synchronous request path, mirroring the async communication patterns from Lesson 6 and the messaging patterns from Lesson 9:

- **Future methods** and **Queueable Apex** let a transaction hand off work to run later, asynchronously, instead of making the user wait for it inside the same request.
- **Batch Apex** processes large volumes of records in chunks over multiple asynchronous transactions, so a job that would never fit in one governor-limited transaction can still complete.
- **Platform Events** implement a publish/subscribe pattern on the platform itself: one event can be published once and consumed independently by multiple subscribers, decoupling the publisher from whatever (and however many) things react to it — the same decoupling benefit Lesson 9 described for any message broker.
- **Change Data Capture** publishes record-change events automatically, letting external systems react to Salesforce data changes asynchronously rather than needing to poll for them.

## Why this matters beyond Salesforce

None of this is Salesforce-specific machinery — it's the same handful of distributed-systems ideas from Chapters 1 and 2, expressed through Salesforce's own vocabulary. Recognizing governor limits as rate limiting, and Platform Events as pub/sub, means you can carry the *reasoning* from this course into decisions about Salesforce architecture (and vice versa): understanding why a limit exists, or why an event-driven integration behaves the way it does, rather than just memorizing that it does.

## Key terms

- **Multi-tenancy** — many independent customers sharing the same underlying infrastructure
- **Governor limits** — per-transaction resource caps that protect the shared platform from any one tenant
- **Queueable Apex / Future methods** — ways to run Apex work asynchronously, off the main request path
- **Platform Events** — a publish/subscribe mechanism native to the Salesforce platform

## Recap

Salesforce's governor limits and asynchronous Apex tooling are real, concrete expressions of the rate-limiting and messaging concepts from Chapters 1 and 2 — not something new to learn from scratch. Next, in Lesson 13, you'll look at designing for failure as a deliberate philosophy, independent of any one platform.
