# Lesson 4 — The Governance Capabilities Map

**Chapter 1 · Governance Architecture Foundations · Lesson 4 of 30**

## What you'll learn

- What a capability map is, and why it's independent of org chart or specific tooling
- The eight capability domains a complete governance architecture has to cover
- How to use the map to audit an existing organization's governance architecture
- How this course's later chapters map onto the capability domains

## What a capability map actually is

Enterprise architecture practice (capability-based planning, as used in TOGAF) separates *what an organization needs to be able to do* from *who does it and which tool does it* — the first is a capability, the second is implementation detail. A capability map for governance lists the "what," so you can audit any organization against it regardless of whether it's centralized or federated, running Purview or a homegrown catalog, five years into the program or five weeks in.

## The eight governance capability domains

1. **Metadata management.** Capturing and maintaining what data exists, what it means, and its basic properties.
2. **Cataloging and discovery.** Letting people actually find data that exists — search, browse, request access.
3. **Lineage tracking.** Tracing where a piece of data came from and everywhere it flows to.
4. **Classification and sensitivity labeling.** Identifying what kind of data something is (PII, financial, public) so other capabilities can act on that label.
5. **Access control and policy enforcement.** Turning classification and policy into actually-enforced permissions.
6. **Data quality management.** Measuring and improving whether data is accurate, complete, and consistent.
7. **Stewardship workflow.** Routing governance tasks — approvals, issue resolution, definition changes — to the right accountable person.
8. **Audit and monitoring.** Recording what actually happened, so compliance and investigation don't depend on memory.

## Using the map as an audit tool

For any organization, you can walk through these eight capabilities and rate each one — present and automated, present but manual, or genuinely absent — without first having to agree on operating model or platform. This is deliberately a different lens than the operating-model question from Chapter 2: two organizations can have identical capability gaps (say, no real lineage tracking) while running completely different operating models, and two organizations with the same operating model can have very different capability maturity. The map tells you what's missing; the operating model tells you who's responsible for building it.

## How this course maps onto the capability domains

This course doesn't cover all eight capabilities in equal depth everywhere — later chapters go deep on specific ones. Chapter 3 (Metadata and Catalog Architecture) covers capabilities 1 through 3 in architectural detail: metadata management, cataloging, and lineage. Chapter 4 (Security and Platform Architecture) covers capabilities 4 and 5: classification and access control/policy enforcement. Data quality management and stewardship workflow were covered at the practice level in Data Governance Foundations and aren't re-taught here; this course treats them as capabilities that need architecture support (a place to log issues, a system to route approvals) without re-explaining what stewardship is. Audit and monitoring reappears across Chapters 4 and 5 as a cross-cutting concern.

## Key terms

| Term | Meaning |
|---|---|
| Capability map | A list of what an organization needs to be able to do, independent of org chart or tooling |
| Capability-based planning | The enterprise-architecture practice of planning around capabilities rather than teams or tools |
| Capability maturity | How well-built and automated a given capability actually is, regardless of operating model |

## Lab

For an organization you know, rate each of the eight capability domains as "automated," "manual," or "absent." Don't worry about whether the organization is centralized or federated — just the capability itself. Note which two or three domains are weakest.

## Check yourself

Can you list all eight governance capability domains from memory, and explain in one sentence why a capability map is a different lens from the operating-model question?
