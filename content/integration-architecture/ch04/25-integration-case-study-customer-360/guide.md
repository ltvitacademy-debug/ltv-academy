# Lesson 25 — Integration Case Study: Customer 360

**Chapter 4 · Applying Integration Architecture · Lesson 25 of 28**

## What you'll learn

- A full "Customer 360" integration scenario — a single, unified customer view assembled from several source systems
- Why a Customer 360 goal is a data-virtualization-vs-replication decision (Lesson 14) more than a single-pattern choice
- API-led connectivity (Lesson 9) applied concretely: System APIs per source, a Process API assembling the unified view
- Why master data management and a "golden record" concept matter once the same customer exists in multiple systems with conflicting data

## The scenario: one customer, scattered across four systems

A B2B software company wants its support reps to see a single "Customer 360" view inside Salesforce: the customer's Salesforce Account and Contacts, their subscription and billing status from a separate finance system, their product-usage data from the application's own telemetry database, and their open support tickets from a legacy ticketing tool that's scheduled for eventual retirement. Each of these four sources holds a piece of the picture, and no single source has the whole thing — which is precisely the problem a Customer 360 initiative exists to solve, and precisely why it's rarely a single integration pattern decision.

## Deciding what to replicate and what to virtualize

Applying Lesson 14's framework source by source: billing status changes relatively infrequently and reps need it to be fast and reliably available even if the finance system is briefly down for maintenance, which argues for **replicating** a small, specific set of billing fields into Salesforce via a scheduled delta sync (Lesson 13) rather than querying the finance system live on every page load. Product-usage telemetry, by contrast, is enormous in volume, changes constantly, and is only occasionally looked at by a rep investigating a specific issue — a strong candidate for **data virtualization** via Salesforce Connect (Lesson 14), since replicating that volume into Salesforce storage for data that's rarely actually viewed would be wasteful. Support tickets from the legacy tool scheduled for retirement present a different consideration entirely: investing in a clean virtualization adapter for a system that will be decommissioned soon has a short shelf life, so a pragmatic, lower-investment integration (even a simpler batch sync) may be the right call specifically *because* this source won't exist much longer — a reminder that pattern choice also has to account for a system's own expected lifespan, not just its data's ideal access pattern in isolation.

## Structuring it with API-led connectivity

Each of the three external sources (finance, telemetry, legacy ticketing) gets its own **System API** (Lesson 9) — a stable interface hiding that specific backend's quirks. A **Process API** sits above all three, combining the finance System API's billing fields, the telemetry System API's usage summary, and the ticketing System API's open-ticket count into one assembled "customer health summary" response. The Salesforce-side component that reps actually see — a Lightning component or a Flow-driven screen — calls that single Process API (functioning as the Experience layer for this specific use case) rather than calling all three backends separately and assembling the view inside Salesforce itself. If a fifth data source needs to join the Customer 360 view next year, it gets its own new System API and gets folded into the existing Process API, without the Experience-layer component needing to change at all — the direct payoff of the layered design from Lesson 9.

## Master data and the golden record problem

Once the same customer's name, address, or primary contact exists in more than one of these four systems, a specific problem recurs: what happens when two sources disagree? The finance system might have an outdated billing contact that Salesforce's own Contact record has since corrected. **Master data management (MDM)** is the discipline of designating one system as the authoritative source — the **golden record** — for each specific data element, so that when sources disagree, there's a defined, non-arbitrary rule for which value wins, rather than every rep guessing which source to trust, or two synced systems silently overwriting each other's corrections back and forth. For this case study, the design would typically designate Salesforce as the golden-record source for contact information (since reps actively correct it there) while treating the finance system as the golden-record source for billing status (since that's genuinely owned by finance) — a deliberate, documented decision rather than an accident of whichever system happened to sync last.

## Key terms

| Term | Meaning |
|---|---|
| Customer 360 | A unified customer view assembled from multiple source systems that each hold a piece of the full picture |
| Master data management (MDM) | The discipline of designating an authoritative source for each data element when multiple systems hold conflicting copies |
| Golden record | The designated authoritative version of a specific data element when multiple systems disagree |

## Lab

For this lesson's four-source Customer 360 scenario, assign each of the four data elements — Account/Contact info, billing status, usage telemetry, and open ticket count — to either "replicate into Salesforce" or "virtualize via Salesforce Connect," justifying each choice using Lesson 14's trade-offs. Then name which system you'd designate as the golden record for the Contact's primary email address, and explain what should happen if the legacy ticketing tool's copy of that same email address disagrees with Salesforce's.

## Check yourself

Can you explain why a Customer 360 goal usually isn't a single integration-pattern decision, using this case study's four sources as your example? Can you define master data management and the golden record concept, and explain why a documented, deliberate rule for resolving disagreement matters more than whichever system happened to sync most recently?
