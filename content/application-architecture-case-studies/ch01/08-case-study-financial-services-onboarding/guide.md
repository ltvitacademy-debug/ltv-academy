# Lesson 8 — Case Study: Financial Services Onboarding

**Chapter 1 · Application Case Studies · Lesson 8 of 16**

## What you'll learn

- Why a household relationship model matters even for a client who thinks of themselves as "just one person"
- How Action Plans turn a compliance-driven process into something enforceable, not just documented
- Why document tracking is a first-class design concern in a regulated onboarding flow, not an afterthought
- How to design for the exception (a client who doesn't fit the standard household) without rebuilding the standard flow

## The scenario: Meridian Wealth Advisors

Meridian Wealth Advisors is a wealth-management firm running Salesforce Financial Services Cloud (FSC). Onboarding a new client today means an advisor manually tracking a checklist in a spreadsheet: initial meeting, risk-tolerance questionnaire, signed advisory agreement, account-opening paperwork, and a compliance review before any money moves. Steps get missed under advisor workload, and compliance has flagged more than one case where a client's account was opened before a required document was actually signed — a real regulatory exposure, not just an efficiency complaint. Meridian wants onboarding "standardized and enforced," which is a more specific ask than most of this course's case studies start with, and still needs translating into FSC's actual mechanisms.

## The household model matters before onboarding even starts

FSC's data model is built around **households** — a structure that links a client, their spouse or partner, dependents, and related entities (a trust, a jointly owned business) through **Account-Contact Relationships**, **Account-Account Relationships**, and **Contact-Contact Relationships**, viewable together through the **Actionable Relationship Center**. This matters for onboarding specifically because a new client rarely arrives as a true individual in isolation: a married couple opening joint accounts needs both spouses' information captured against one household, and a client who also controls a family trust needs that trust's own account linked to the household rather than modeled as an unrelated, disconnected Account. Designing onboarding around a single isolated Contact record, without the household relationships behind it, would mean re-entering the same spouse and trust information separately for every related account that later gets opened — exactly the kind of avoidable duplicate data entry a wealth-management back office can't afford at scale.

## Action Plans turn the checklist into something enforceable

Meridian's actual problem — a documented process that depends on an advisor remembering every step — is what **Action Plans** are built to fix. An Action Plan Template defines the full onboarding sequence (initial meeting, questionnaire, agreement signature, account paperwork, compliance review) as an ordered set of tasks, which can auto-assign specific steps to specific roles (the advisor handles the client-facing steps; compliance is automatically assigned the review step only once the prior steps show complete) and track each step's status and deadline rather than leaving it to memory. This is the core architectural shift: a spreadsheet checklist is documentation that a process should happen; an Action Plan is a system that can block or flag the next dependent step until the prior one is actually marked done — which directly targets Meridian's specific compliance exposure (accounts opened before required documents were signed).

## Document tracking has to be a first-class part of the design

Compliance's flagged cases aren't abstract process gaps — they're specific missing or improperly-sequenced documents (a signed advisory agreement, in particular). A design that tracks task completion but not document status separately would let someone mark "agreement signed" as done without the actual signed document existing anywhere retrievable, which solves nothing for an actual audit. Document Checklist Items, tracked alongside the Action Plan's tasks, are the piece that makes the document itself — not just a checkbox claiming it exists — part of what the compliance review step checks before it can be marked complete. This is a case where a narrower, admittedly less convenient design (don't let the task be marked done without the linked document) is the correct one, because the entire reason this redesign exists is a compliance exposure, not a productivity complaint.

## Designing for the exception without rebuilding the standard flow

Not every client fits the standard married-couple-plus-trust household shape — Meridian also onboards single individuals with no related entities at all, and the Action Plan template built for the complex case shouldn't force an unrelated compliance review step that has nothing to review, or an empty household relationship that adds clutter with no data behind it. The right answer is usually more than one Action Plan Template (a simpler one for an individual client, a fuller one for a household with related entities), chosen at the start of onboarding based on the client's actual structure — rather than one maximally complex template everyone has to step through regardless of fit, which would recreate the same "process nobody actually follows closely" problem Meridian started with, just with more steps in it.

## Key terms

| Term | Meaning |
|---|---|
| Household (FSC) | FSC's data structure linking a client to related individuals and entities through Account-Contact, Account-Account, and Contact-Contact relationships |
| Actionable Relationship Center (ARC) | The view for navigating a household's linked relationships |
| Action Plan Template | A predefined, reusable sequence of onboarding tasks that an Action Plan is created from |
| Action Plan | An instance of a template's tasks applied to a specific client, tracking status, assignment, and deadlines per step |
| Document Checklist Item | A tracked document requirement tied to an Action Plan step, distinct from the task-completion checkbox itself |

## Lab

A Meridian client who completed standard onboarding six months ago now wants to add their adult child as a joint account holder on one account, with their own separate advisory relationship. Write a short design note: (1) how this changes the existing household's relationship structure, (2) whether this should trigger a brand-new Action Plan from scratch or a narrower one scoped to just the new joint-holder paperwork, and (3) one reason reusing the original household record, rather than creating a second disconnected one for the adult child, matters for compliance's later review.

## Check yourself

Can you explain why FSC's household model matters for onboarding specifically, not just for ongoing relationship management? Can you state, in your own words, why an Action Plan is a meaningfully different kind of control than a shared spreadsheet checklist, for the specific compliance problem Meridian had?
