# Lesson 16 — Availability and Disaster Recovery Concepts

**Chapter 3 · Enterprise Design · Lesson 16 of 22**

## What you'll learn

- The general concepts of availability, business continuity planning (BCP), and disaster recovery (DR)
- What Salesforce, as a multi-tenant SaaS vendor, is and isn't responsible for in a DR conversation
- Why "Salesforce handles its own uptime" doesn't mean an enterprise has nothing left to plan
- How to think about availability across an entire integrated landscape, not just one vendor's platform

## Three related but distinct concepts

**Availability** is simply whether a system is up and usable when someone needs it. **Business Continuity Planning (BCP)** is the broader organizational discipline of keeping critical business functions running through a disruption, of which IT availability is only one part. **Disaster Recovery (DR)** is the specific technical plan for restoring systems and data after a major disruption — a data center failure, a large-scale outage, a catastrophic error. These three concepts nest inside each other: DR is a technical component that supports BCP's broader goal, and availability is the day-to-day baseline that both are ultimately protecting.

## What Salesforce owns versus what the enterprise owns

Salesforce, as the vendor of a multi-tenant SaaS platform, maintains its own enterprise resilience program — the company publishes that it maintains Business Continuity Planning and Disaster Recovery programs for its cloud services, each reviewed against industry standards and regulatory requirements, with separate published DR materials for different infrastructure (including its Hyperforce infrastructure and its first-party AWS-hosted infrastructure). This means the underlying platform's own uptime, data center failover, and infrastructure-level resilience are substantially Salesforce's responsibility, not the customer's — a meaningful difference from a self-hosted system where the enterprise would have to build and test all of that itself.

But this doesn't mean the enterprise has nothing left to plan. Salesforce's own infrastructure resilience doesn't automatically protect against an enterprise's own configuration mistakes, a bad deployment that corrupts data, an integration that propagates bad data into Salesforce from elsewhere, or a disruption to one of Salesforce's *neighboring* systems in the landscape. A System Architect has to be precise about this boundary: Salesforce's resilience program covers the Salesforce platform itself; everything the enterprise builds on top of it, and every other system in the landscape, still needs its own availability and recovery plan.

## Backup is a separate conversation from platform resilience

Salesforce also offers a dedicated customer-facing backup product, described as offering scheduled daily backups and on-demand snapshots covering data, metadata, files, and attachments. This is deliberately distinct from the platform's own infrastructure-level DR program: infrastructure DR protects against Salesforce's own systems failing, while a backup product protects against an enterprise's own mistake — an accidental bulk delete, a bad data load, a misconfigured automation that corrupts thousands of records. A System Architect designing for availability and recovery has to account for both: platform-level resilience (largely Salesforce's job) and application-level backup and recovery from self-inflicted or integration-inflicted data problems (the enterprise's own job, even on a SaaS platform).

## Availability across the whole landscape

The enterprise's own availability planning has to extend past Salesforce to every system this course has discussed: if the ERP goes down, does order processing stop entirely, or is there a degraded mode? If the middleware layer brokering integrations fails, does data simply queue up and catch up later, or does it get silently dropped? A landscape is only as available, for any given end-to-end business process, as its least available critical dependency — which is exactly why availability planning has to be an enterprise-wide exercise, not something each system owner reasons about only for their own piece.

## Key terms

| Term | Meaning |
|---|---|
| Availability | Whether a system is up and usable when needed |
| Business Continuity Planning (BCP) | The organizational discipline of keeping critical business functions running through a disruption |
| Disaster Recovery (DR) | The technical plan for restoring systems and data after a major disruption |
| Backup and Recover | Salesforce's customer-facing product for scheduled and on-demand backups of org data, metadata, files, and attachments |

## Lab

A company relies on Salesforce, an on-premises ERP, and a third-party middleware platform to process customer orders end to end. Write a short availability assessment: for each of the three systems, state whether its availability is primarily the vendor's responsibility (as with Salesforce's own platform resilience) or the enterprise's own responsibility to plan for. Then identify the single least available system in this chain, and describe what "degraded mode" order processing might look like if that system went down for several hours.

## Check yourself

Can you explain the difference between availability, Business Continuity Planning, and Disaster Recovery, and how they relate to each other? Can you explain why Salesforce's own infrastructure resilience program doesn't eliminate the enterprise's need for its own backup and recovery plan?

Sources: [Resilience, BCP & DR (compliance.salesforce.com)](https://compliance.salesforce.com/categories/disaster-recovery-bcp)
