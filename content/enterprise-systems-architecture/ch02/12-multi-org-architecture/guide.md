# Lesson 12 — Multi-Org Architecture

**Chapter 2 · Enterprise Concerns · Lesson 12 of 22**

## What you'll learn

- Why enterprises end up with more than one Salesforce org, planned or unplanned
- The real trade-offs between a single-org and a multi-org strategy
- The "Reference Architecture" idea: deciding in advance when an additional org is actually justified
- How this decision connects back to governance (Lesson 8) and systems-of-record thinking (Lesson 3)

## How multi-org actually happens

Multi-org Salesforce architectures arise two different ways, and a System Architect needs to recognize which one they're looking at. Sometimes it's a deliberate strategic choice. More often, it's something that simply accumulated: a merger or acquisition brings in an org that came with the acquired company, and immediate consolidation turns out to be harder than planned, so the two orgs run in parallel for years. Or a regional division implements Salesforce independently, tailoring it to local processes, without central coordination. Recognizing an org landscape is accidental rather than designed is itself diagnostic information — it tells a System Architect that the first job might be deciding whether to consolidate, not how to better support the status quo.

## The case for multiple orgs

Several real, legitimate factors push toward running more than one Salesforce org:

- **Business unit autonomy.** Divisions with genuinely different processes get the freedom to customize independently without one unit's change affecting another's configuration.
- **Isolation and compliance.** Separate orgs can keep data cleanly separated, which can matter for regulatory requirements or when business units have fundamentally different data-sensitivity profiles.
- **Avoiding org-level limits and complexity.** A single org accumulating years of customization across many unrelated business lines can become difficult to manage, and splitting unrelated lines of business across orgs can keep each org's complexity more contained.
- **Resilience.** Operations in one org can continue even if another org experiences an outage.
- **Data residency.** Some regional or regulatory requirements push specific data into a specific regional infrastructure.

## The case for a single org

Pulling the other way:

- **Standardization and collaboration.** One org makes cross-business-unit collaboration and consistent process design dramatically simpler.
- **Central reporting.** Accurate, comprehensive, cross-business reporting is far easier when all the data already lives in one place, rather than requiring a cross-org reporting solution to stitch it back together.
- **Cost.** Running multiple orgs tends to fragment licensing (missing volume discounts), duplicate administrative overhead, and create governance gaps between orgs that nobody owns.

## Deciding, not drifting

The questions that actually separate a justified multi-org decision from an accidental one: do the business units follow standardized processes and methodologies, or are they genuinely different? How much aggregated, cross-business reporting does the enterprise actually need? Are the business units essentially unrelated, with separate P&Ls, or deeply interdependent? A common piece of architect guidance is for the governance body (Lesson 8's Center of Excellence) to define a **Reference Architecture** — a documented decision framework stating in advance when an additional org is reasonable or necessary, so the question doesn't get re-litigated informally every time a new business unit or acquisition raises it.

## The systems-of-record problem, multiplied

Multi-org architectures recreate every systems-of-record and master-data-ownership problem this course has already covered, except now partially *within* what might look to the business like a single "Salesforce" system. Two orgs both claiming to be authoritative for the same customer's data is the dueling-systems-of-record failure from Lesson 3, just with both sides wearing the same platform's logo. Any multi-org decision has to be paired with an explicit answer to which org, if either, is authoritative for which shared entity, and how (or whether) the two orgs stay in sync.

## Key terms

| Term | Meaning |
|---|---|
| Multi-org architecture | Running more than one Salesforce org across an enterprise, whether by deliberate design or accumulated history |
| Reference Architecture | A documented decision framework defining in advance when creating an additional org is justified |
| Org-level limits | Practical complexity and manageability pressures that can build up within a single, heavily customized org |

## Lab

A company has grown through two acquisitions, each bringing its own Salesforce org, plus the original parent company's org — three orgs total, with no coordination between them. Using this lesson's decision questions (standardized processes, cross-business reporting need, P&L independence), write a short recommendation on whether this company should consolidate to one org, formally commit to a multi-org strategy with a Reference Architecture, or do something else. Justify your answer, and name at least one systems-of-record risk the company faces regardless of which path it chooses.

## Check yourself

Can you list at least two real factors favoring multiple orgs and two favoring a single org? Can you explain what a Reference Architecture is and why having one prevents the multi-org question from being re-litigated informally every time it comes up?

Sources: [Enterprise architecture multi org strategy](https://developer.salesforce.com/blogs/2014/10/enterprise-architecture-multi-org-strategy)
