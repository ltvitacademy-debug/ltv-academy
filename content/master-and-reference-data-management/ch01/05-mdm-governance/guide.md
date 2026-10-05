# Lesson 5 — MDM Governance

**Chapter 1 · MDM Foundations · Lesson 5 of 25**

## What you'll learn

- The three governance pillars that keep an MDM program from drifting back into chaos
- The roles typically involved, and how they relate to the data owner/steward roles from Data Governance Foundations
- What a written MDM policy actually needs to cover
- How this closes out Chapter 1 and sets up Chapter 2

## Why MDM needs its own governance layer

Data Governance Foundations covered governance broadly: frameworks, operating models, data owners and stewards. MDM governance is that same discipline applied to one specific, high-stakes problem — because an MDM program without governance doesn't stay fixed. Matching rules drift, nobody owns new fields added to the customer record, and within a year the "single source of truth" has quietly forked into two versions again.

## Three governance pillars

- **Domain ownership.** Each master data domain (customer, product, vendor — Chapters 3 and 4) needs a named owner accountable for its quality and definition, the same way Data Governance Foundations assigns a data owner to any other critical dataset.
- **Standards and rules.** The match rules (Chapter 2), survivorship rules (Lesson 10), and naming/formatting standards for a domain need to be written down and version-controlled — not left as institutional knowledge in one engineer's head.
- **Stewardship workflow.** A defined process for who reviews uncertain matches, who approves a new attribute being added to the golden record, and who has authority to override an automated decision (Lesson 11 goes deep on this).

## Roles, concretely

- **MDM data steward** — the hands-on role, usually per domain, who reviews flagged matches, maintains match and survivorship rules, and is the first escalation point when the golden record looks wrong.
- **Domain owner** — typically a business-side role (e.g., a sales operations leader for the customer domain) accountable for the domain's quality and for resolving disputes between departments about what counts as correct.
- **MDM program lead** — coordinates across domains, owns the architecture style decision (Lesson 3) and the overall roadmap, and is usually the one presenting the business case (Lesson 4) upward.

These roles extend, rather than replace, the data owner and data steward roles already introduced in Data Governance Foundations — an MDM data steward is a data steward whose scope is specifically master data matching and merging.

## What a written MDM policy covers

A usable MDM governance policy documents, at minimum: which domains are in scope, who owns each one, what the match rules are and how confident a match has to be before it auto-merges versus needs review, what the survivorship rules are per attribute, and who can approve a change to any of the above. Without this written down, every new team that touches master data re-litigates the same questions from scratch.

## Closing out Chapter 1

This chapter built the vocabulary: what master data is (Lesson 1), how it differs from reference and transactional data (Lesson 2), the architecture styles available to manage it (Lesson 3), the business case for investing in it (Lesson 4), and now the governance structure that keeps it from decaying (Lesson 5). Chapter 2 goes hands-on: the actual mechanics of matching records, deduplicating them, building golden records, applying survivorship rules, and routing uncertain cases to a human steward.

## Key terms

| Term | Meaning |
|---|---|
| Domain owner | The business-side role accountable for a specific master data domain's quality and definitions |
| MDM data steward | The hands-on role maintaining match/survivorship rules and reviewing flagged matches for a domain |
| MDM policy | The written document covering domain scope, ownership, match rules, and survivorship rules |

## Lab

Draft the skeleton of an MDM policy for one domain (pick Customer). List: who would own it, what fields matter most, and one match rule you'd want written down rather than left to memory (for example, "an exact match on tax ID always auto-merges").

## Check yourself

Can you name the three governance pillars from this lesson, and explain how an MDM data steward's role relates to the general data steward role from Data Governance Foundations?
