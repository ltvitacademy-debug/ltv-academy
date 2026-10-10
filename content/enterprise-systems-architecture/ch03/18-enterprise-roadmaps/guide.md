# Lesson 18 — Enterprise Roadmaps

**Chapter 3 · Enterprise Design · Lesson 18 of 22**

## What you'll learn

- Why an enterprise roadmap has to sequence change across systems, not just inside Salesforce
- How sandbox strategy and release management connect to roadmap planning
- The role of Salesforce's own sandbox types (Developer, Developer Pro, Partial Copy, Full Copy) in a release pipeline
- Why this lesson closes Chapter 3 and sets up Chapter 4's practice work

## A roadmap is a sequencing problem, not a wish list

An **enterprise roadmap** is the multi-year plan for how an organization's systems landscape will evolve: what gets built, what gets retired, what gets migrated, and crucially, in what order. A roadmap that's just a list of desired outcomes with no sequencing ("add real-time ERP integration," "retire the legacy system," "roll out a new region's org") isn't actually a roadmap yet — it's a backlog. The sequencing is where the enterprise-architecture thinking from this entire course actually gets applied: a real-time ERP integration (Lesson 13) might depend on first resolving which system owns customer master data (Lesson 5); retiring a legacy system (Lesson 17) might need the strangler-fig migration to reach a certain point before full retirement is safe; a new region's org might need the governance body's Reference Architecture (Lesson 12) settled before the decision is even made.

## Dependencies across systems, not just within one

Because the systems in an enterprise landscape aren't independent, roadmap sequencing frequently runs into cross-system dependencies that a Salesforce-only view would miss entirely. A planned Salesforce feature might depend on an ERP upgrade that's scheduled for next year on the ERP team's own roadmap, over which the Salesforce team has no control. A data warehouse migration might require every upstream system, including Salesforce, to finalize its data model changes first, or the warehouse team will be building reports against a moving target. A System Architect's contribution to roadmap planning is making these cross-system dependencies visible and explicit — using the landscape diagrams from Lesson 10 as a communication tool — rather than letting each team plan in isolation and discover the conflict only when a dependency is missed.

## Sandbox strategy as part of the roadmap

Release management — how changes move from development through testing to production — is a practical piece of roadmap execution, and Salesforce's sandbox types shape what's realistic to plan. Salesforce offers four sandbox types with real differences in what they copy and how often they refresh: **Developer** sandboxes copy metadata only, with the smallest storage allocation and the most frequent refresh interval, suited to individual development work; **Developer Pro** sandboxes also copy metadata only, but with more storage, suited to slightly larger development efforts; **Partial Copy** sandboxes copy metadata plus a sample of production data (selected via a sandbox template), suited to testing scenarios like user acceptance testing that need realistic data; and **Full Copy** sandboxes replicate all production metadata and data, with the longest refresh interval of the four, suited to final UAT, performance testing, and troubleshooting production issues against a true production-like copy. A roadmap that plans a major release without accounting for a Full Copy sandbox's long refresh interval, for example, risks discovering too late that the environment needed for final testing isn't actually ready on the schedule the roadmap assumed.

## Where this chapter leaves off

Chapter 3 has covered how data actually moves (Lesson 13), how identity is managed (Lesson 14), how operations are monitored (Lesson 15), how availability and disaster recovery are planned (Lesson 16), how legacy constraints are designed around (Lesson 17), and now how all of this gets sequenced into an actual roadmap. Chapter 4, Practice, now turns from building this vocabulary and these concepts to applying them: a case study pulling multiple lessons together, an overview of how this material maps to the real System Architect certification path, and practice working through exam-style and review-board-style scenarios.

## Key terms

| Term | Meaning |
|---|---|
| Enterprise roadmap | The multi-year, sequenced plan for how an organization's systems landscape will evolve |
| Cross-system dependency | A roadmap dependency that spans two or more systems, invisible from a single-system view |
| Developer / Developer Pro sandbox | Salesforce sandbox types copying metadata only, with smaller storage and frequent refresh, suited to individual or team development |
| Partial Copy / Full Copy sandbox | Salesforce sandbox types copying a data sample or a full production copy respectively, suited to realistic testing, with longer refresh intervals |

## Lab

A company's roadmap calls for retiring a legacy order system (using the strangler-fig approach from Lesson 17), rolling out real-time ERP integration (Lesson 13), and expanding into a new region that may need its own org (Lesson 12), all within the same 18-month period. Write a sequenced plan (not just a list) showing which of these three initiatives should happen first, second, and third, and name at least one cross-system dependency between two of them that would break the plan if ignored.

## Check yourself

Can you explain why a roadmap is a sequencing problem rather than just a list of desired outcomes? Can you name the four Salesforce sandbox types this lesson describes and the general testing purpose each one is suited to?

Sources: [Choose the right Salesforce org for the right job](https://developer.salesforce.com/blogs/2024/05/choose-the-right-salesforce-org-for-the-right-job)
