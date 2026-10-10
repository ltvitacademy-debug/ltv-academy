# Lesson 1 — What Data Governance Is

**Chapter 1 · Governing Data · Lesson 1 of 14**

## What you'll learn

- How data governance differs from day-to-day data management
- Why a Salesforce org needs its own governance lens, not just a general IT policy
- The four pillars a working governance program rests on: people, policy, process, technology
- What it looks like, concretely, when a Salesforce org's data goes ungoverned
- How the rest of this course builds toward a working governance program

## Governance is not the same job as management

Data **management** is the day-to-day work of keeping data flowing: importing leads, updating records, running reports, fixing a broken integration. Data **governance** is the layer above that — the set of decisions, roles, and rules that determine *how* that day-to-day work is supposed to happen in the first place. A Salesforce admin who deduplicates a batch of Accounts is doing data management. The decision that duplicate Accounts should be blocked at the point of entry, who owns that decision, and how exceptions get approved — that's governance. Without governance, management work is reactive: the same problems recur because nothing upstream changed. Governance exists to make management work stick.

## Why a Salesforce org needs its own governance lens

Generic IT governance policies ("encrypt sensitive data," "review access quarterly") are necessary but not sufficient inside a Salesforce org, because Salesforce has its own concrete surface where governance decisions actually land: objects and fields (standard like Account and Contact, or custom), records owned by users through the role hierarchy, automation (Flow, Apex) that touches those records at scale, and increasingly a unified data layer like Data Cloud pulling from multiple source systems. A governance program that only speaks in abstractions ("protect PII") never gets implemented. A governance program that also says *which* field on *which* object carries that PII, who's accountable for keeping it accurate, and what Salesforce feature enforces the rule — that gets implemented. This course teaches governance applied at that level of specificity, inside a Salesforce org.

## The four pillars

Every real governance program, Salesforce or otherwise, rests on four pillars working together:

- **People.** Named roles with real accountability — not "IT is responsible for everything," but a specific data owner for Accounts, a specific steward who maintains the Lead matching rules, a specific committee that resolves disputes.
- **Policy.** The written rules: what counts as a duplicate, how long a closed Case's data is kept, which fields require Shield-level encryption.
- **Process.** The recurring, scheduled activities that keep policy real over time: a quarterly data-quality review, a change-approval step before a new custom field ships to production.
- **Technology.** The actual Salesforce (and Salesforce Shield/Data Cloud) features that enforce or support the policy: Duplicate Rules, Validation Rules, Field Audit Trail, Platform Encryption, Data Classification metadata.

A program missing any one of these four fails in a predictable way: policy without process goes stale; technology without policy gets configured arbitrarily; people without process burn out re-deciding the same question every time it comes up.

## What ungoverned data looks like

Picture a mid-size company running three connected Salesforce orgs — Sales, Service, and Marketing — each with its own Account object, none of them governed. Within a year: the same customer exists as four different Account records with slightly different names and billing addresses across the orgs; nobody can say definitively who the system of record is for a customer's primary contact; a marketing campaign sends five emails to the same person because five slightly different Contact records exist; and when a customer requests their data be deleted under a privacy law, the company has no reliable way to find every copy. None of this happened because Salesforce is a bad platform — it happened because nobody decided who owns Account data, what "duplicate" means, or how long records live, and then kept enforcing those decisions over time.

## Where this course is headed

Chapter 1 covers the people and quality side of governance: ownership, stewardship roles, and how to actually measure data quality. Chapter 2 covers policy and compliance: retention, privacy and consent, regulatory compliance, classification, and audit. Chapter 3 puts it all together into a working framework: committees, a case study that threads multiple lessons together, and how to measure whether a governance program is actually succeeding.

## Key terms

| Term | Meaning |
|---|---|
| Data governance | The decisions, roles, and rules that determine how an organization's data is created, used, and protected — distinct from the daily work of managing it |
| Data management | The day-to-day operational work of handling data: entering, updating, importing, reporting on it |
| System of record | The one application or data source officially designated as authoritative for a given type of data |
| Governance program | The ongoing, coordinated combination of people, policy, process, and technology that keeps data trustworthy over time |

## Lab

The three-org scenario above (Sales, Service, Marketing, each with its own ungoverned Account object) is deliberately realistic. Write a short analysis: (1) name three concrete governance decisions that, if made and enforced a year earlier, would have prevented the duplicate-Account and failed-deletion problems described; (2) for each decision, say which of the four pillars (people, policy, process, technology) it belongs to; (3) name one real Salesforce feature (you'll meet several across this course) that could help enforce at least one of those decisions.

## Check yourself

Can you explain, in one or two sentences, the difference between data governance and data management, using an example from a Salesforce org? Can you name all four governance pillars and give a one-line example of each inside a Salesforce context?
