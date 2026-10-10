# Lesson 11 — Building a Governance Framework

**Chapter 3 · Building Governance · Lesson 11 of 14**

## What you'll learn

- How to assemble everything from Chapters 1 and 2 into one coherent framework document, rather than a pile of disconnected policies
- The Center of Excellence (CoE) model and the four areas a Salesforce governance framework typically needs to address
- Why a framework needs an explicit release/change strategy, not just data policies
- How a framework should name, in writing, who approves what and how often
- Why a framework is a living document, not a one-time deliverable

## From separate lessons to one framework

Chapters 1 and 2 covered governance piece by piece: ownership, stewardship, data quality, retention, privacy, compliance, classification, audit. A **governance framework** is the single document (or structured set of documents) that ties all of those pieces together into one coherent, referenceable whole — who's accountable for what, what the standards are, and what process enforces them — so that a new admin, a new business stakeholder, or an auditor doesn't have to reconstruct the program from scattered memory and tribal knowledge.

## The Center of Excellence model

A common and practical way to organize Salesforce governance is around a **Center of Excellence (CoE)**: a cross-functional team, drawn from a few different stakeholder groups rather than owned entirely by IT, that manages governance as an ongoing function. A real framework built around this model typically organizes its scope into four connected areas:

- **Org strategy** — the overall vision for what the platform is for, which roadmap items matter, and how competing feature requests get prioritized against that vision.
- **Data governance** — everything covered in Chapters 1 and 2: ownership, quality, classification, retention, privacy, compliance.
- **Technical governance** — code and configuration standards: how Apex and Flow are reviewed, naming conventions, what counts as acceptable technical debt.
- **Change management** — the lifecycle a change goes through from a business request to a production deployment, covered in depth next lesson.

Framing data governance as one deliberate pillar of a larger CoE, rather than an isolated side project, is what keeps it from being deprioritized the moment something more visible (a new feature request) competes for the same people's attention.

## A framework needs a release strategy too

It's tempting to think of a "data governance framework" as covering only data topics, but a framework that's silent on *how changes reach production* will undermine even a well-designed data policy. If a new custom field can go live without anyone checking whether it needs a Data Sensitivity Level (Lesson 9) or whether it should feed into an existing retention policy (Lesson 6), the governance program has a hole exactly where new risk enters the org. A real framework sets the release strategy — who approves a change, what tiers of change exist (an urgent fix vs. a routine monthly batch vs. a major quarterly release), and what review that change passes through — and makes a data-governance checkpoint (even something as light as "does this introduce a new field type that needs classification?") part of that existing release gate, rather than inventing a separate, parallel approval process nobody follows.

## Naming who approves what, in writing

The single most common reason a framework fails isn't that it's wrong — it's that it's vague. "The admin team reviews changes" doesn't survive contact with a real dispute about who actually has final say. A usable framework names, specifically: which named role (not "IT") approves a new custom field touching customer data; which role resolves a disagreement between two departments over a shared object's standards (Lesson 2's dispute-resolution problem); and how often each of these approval points is reviewed to confirm it's still the right person or group. Vague accountability is functionally the same as no accountability — it just takes longer for someone to discover that during an actual crisis.

## A living document, not a binder on a shelf

A governance framework written once and never revisited degrades exactly the way an unreviewed classification label or an unmonitored data-quality metric does (Chapters 1 and 2's recurring theme). The framework itself needs an owner — typically the CoE or governance committee covered next lesson — and a scheduled review, so that when the org adds Data Cloud, acquires another company with its own Salesforce instance, or simply grows past the size where informal coordination worked, the framework gets updated to match reality rather than being quietly ignored because it no longer describes how the org actually operates.

## Key terms

| Term | Meaning |
|---|---|
| Governance framework | The single coherent document/set of documents tying together an org's governance roles, standards, and processes |
| Center of Excellence (CoE) | A cross-functional team managing governance as an ongoing function across org strategy, data, technical, and change-management areas |
| Release strategy | The defined process and approval tiers a change passes through before reaching production |
| Change control gate | A checkpoint in the release process where a change (like a new field) is reviewed against governance requirements before it ships |

## Lab

Your company has solid individual policies from Chapters 1-2 (a documented retention policy, an active set of Duplicate Rules, a classification scheme) but no single framework document, and a new custom field recently went live with no one checking whether it should carry a Compliance Categorization. Draft the outline (section headings only, with a one-sentence description of each) for a framework document that would close this gap, and identify specifically where in your release-strategy section the missing classification check should have been enforced.

## Check yourself

Can you explain why a framework that covers data policy but says nothing about change/release process has a real gap? Can you describe, specifically, what makes an approval-authority statement like "the admin team reviews changes" too vague to be useful during a real dispute?
