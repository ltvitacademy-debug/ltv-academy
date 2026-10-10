# Lesson 12 — Availability and Disaster Recovery Design

**Chapter 2 · Applying Nonfunctional Requirements · Lesson 12 of 18**

## What you'll learn

- Availability as its own NFR, distinct from reliability (Lesson 5) and recoverability (Lesson 6)
- What Salesforce actually commits to on uptime, and what it deliberately does not
- RTO and RPO: the two numbers that define a real disaster-recovery requirement
- Why a Salesforce architect's DR design has to account for what Salesforce controls and what the customer still owns

## Availability is its own NFR

**Availability** asks a narrower question than reliability or recoverability: is the system up and reachable right now? A system can be reliable (behaves correctly when it works) and recoverable (can be restored after a loss) while still having an availability problem if it's frequently, if briefly, unreachable. Availability is usually expressed as a percentage of time the system is reachable over a period — "three nines" (99.9%) or "four nines" (99.99%) are common shorthand, though as this lesson covers next, exactly what percentage (if any) a vendor actually commits to in writing matters a great deal more than the shorthand.

## What Salesforce actually commits to — and what it doesn't

This is a place where architects routinely repeat a number they've heard rather than one they've verified, so it's worth being precise. Salesforce does not publish a single, universal, numeric uptime percentage as a blanket contractual commitment covering the core Salesforce platform in the way some infrastructure vendors publish a flat "99.9% or we credit you" SLA. **trust.salesforce.com** is Salesforce's transparency and status site — it publishes real-time and historical status information about incidents and performance — but publishing status information is not the same thing as a contractually guaranteed percentage with a financial remedy attached. Some specific Salesforce products and clouds do carry their own explicit, numeric SLA with defined remedies in their own product-specific agreements — treat any such number as applying only to the specific product and contract it's written into, not as a platform-wide guarantee, and always verify the actual figure against the current, signed agreement rather than a blog post or a prior year's terms.

The architectural implication: an architect should never design a customer-facing SLA on top of Salesforce by assuming a specific uptime number applies platform-wide. The correct move is to check the actual, current contractual terms that apply to the specific products in use, and build any customer-facing commitment with margin for the parts of the stack Salesforce explicitly does not cover under a numeric guarantee — the customer's own network, any middleware, and any integrated third-party system in the chain.

## RTO and RPO: the two numbers a DR requirement actually needs

A disaster-recovery requirement that just says "we need good DR" is exactly the kind of vague, untestable statement this course has rejected since Lesson 1. A real DR requirement needs two specific numbers:

- **Recovery Time Objective (RTO)** — the maximum acceptable time between a disaster and the system being functional again. This isn't just "data restored" — a functional recovery means a working org: data, metadata configuration (Flows, permission sets, page layouts), and active integrations all operating again, not just rows back in a table.
- **Recovery Point Objective (RPO)** — the maximum acceptable amount of data loss, measured as a time window. An RPO of 24 hours means losing up to a day's worth of changes is acceptable in a disaster; an RPO of 15 minutes means it isn't, and the backup/replication strategy has to be frequent enough to actually deliver that.

These two numbers drive the entire DR design. A tight RPO (near-zero data loss tolerance) generally demands continuous or near-real-time replication rather than periodic backups; a tight RTO demands a tested, fast failover or restore process, not just the existence of a backup file somewhere. Loosening either number meaningfully changes what the DR solution has to cost and how it has to work — which is exactly why RTO and RPO need to be decided deliberately with the business, the same way a performance target does, rather than inherited by default from whatever backup tooling happens to be configured.

## Native options vs. what they actually deliver

Salesforce's native data-protection options sit on a spectrum: a basic data export capability provides an infrequent, non-continuous copy of data, which implies a correspondingly loose RPO — not a fit for a business that has stated a same-day or near-real-time RPO requirement. Salesforce's native **Backup and Restore** product (covered in Lesson 6) provides automated, more frequent backups with a defined restore path, closing part of that gap for data specifically. For organizations with a genuinely tight RTO/RPO requirement, many turn to specialized third-party backup and disaster-recovery tools built specifically for Salesforce, which can offer more frequent, more granular, or more automated recovery than the native options alone — the architect's job is matching the actual stated RTO/RPO requirement to a solution that can really deliver it, rather than assuming any one backup mechanism automatically satisfies whatever number the business names.

## Key terms

| Term | Meaning |
|---|---|
| Availability | Whether the system is up and reachable, as its own NFR distinct from reliability and recoverability |
| trust.salesforce.com | Salesforce's transparency and status site, publishing incident and performance information — not itself a contractual uptime guarantee |
| Recovery Time Objective (RTO) | The maximum acceptable time between a disaster and the system being fully functional again |
| Recovery Point Objective (RPO) | The maximum acceptable amount of data loss, measured as a time window |

## Lab

A client's compliance team states: "We need 99.99% uptime and zero data loss, no exceptions." Treat this as a starting position to negotiate, not a final requirement. Write a short response that (a) explains why a platform-wide numeric uptime guarantee can't simply be assumed without checking the actual current contractual terms for the specific products involved, (b) proposes a specific, realistic RTO and RPO as a starting point for discussion, and (c) names one native or third-party tool that would help meet the RPO you proposed.

## Check yourself

Can you explain the difference between availability, reliability, and recoverability as three distinct NFRs? Can you define RTO and RPO in your own words and explain why a DR requirement needs both numbers, not just one?
