# Lesson 22 — Governance Model

**Chapter 4 · Delivery Strategy · Lesson 22 of 33**

## What you'll learn

- How LTV Global's Center of Excellence (CoE) governs four business units without becoming a bottleneck
- How the CAB from Lesson 19 fits inside the broader CoE governance structure
- The specific standards the CoE owns, and why ownership has to be centralized even when execution isn't
- How this lesson resolves Risk #6 and closes the loop on Lesson 5's "sustainable governance" vision commitment

## Why governance needs an owner, not just good intentions

Lesson 6's Risk #6 named a real danger: four business units building inconsistent customizations independently, with nobody owning the resulting sprawl. "Everyone should just follow good practices" is not a governance model — it's a hope, and Lesson 6 rated this risk as high likelihood specifically because hope doesn't survive four independent teams moving at their own pace under their own local pressure. A real governance model names who owns what, and gives that ownership actual authority, not just a suggestion.

## The Architecture Center of Excellence

LTV Global establishes an **Architecture Center of Excellence (CoE)** — a standing body, not a one-time committee, with representation from the architecture/platform team and each of the four business units. The CoE owns four specific things: the **shared data model** (Equipment Asset, Account structure, and any object genuinely common across BUs, so no BU unilaterally changes a field every other BU also depends on); **coding and declarative standards** (naming conventions, when to use Flow versus Apex, how shared Apex classes in the integration hub get modified); the **Change Advisory Board process** from Lesson 19, which is the CoE's release-governance arm specifically; and **architecture decision records** (Lesson 25 covers the specific artifact), ensuring that a decision made once doesn't get silently re-litigated or contradicted by a different BU months later without anyone noticing.

## Centralized ownership, not centralized execution

A common governance failure mode is swinging too far the other way — a CoE that tries to personally review and approve every single change across all four business units becomes exactly the bottleneck Lesson 19 was careful to avoid when it let BU-specific changes skip full CAB review. LTV Global's CoE avoids this by owning the *standards* centrally while leaving *execution* distributed: each BU's own admins and developers build their own features against the shared standards, and only changes touching shared/cross-BU territory route through the CoE's CAB process. The CoE sets and maintains the rules; it doesn't personally write or approve every line of metadata four business units produce.

## Resolving Risk #6 and closing the vision loop

This lesson directly resolves Risk #6 from Lesson 6 — governance sprawl across four business units — with a named body, named ownership, and a named process, rather than a general intention to "be more coordinated." It also closes the loop on Lesson 5's target-state vision, which committed to governance "sustainable" enough that one engagement team member leaving doesn't put the system at risk: because the CoE's standards and decision records are owned by a standing body with BU representation, not by any single individual's memory, that specific commitment is something this design can actually point to evidence for, not just assert.

## What the CoE is accountable for presenting

The CoE, through the architect presenting on its behalf, is the body ultimately accountable for defending this capstone's thirteen design areas to the Architecture Review Board in Chapter 6 — which is exactly why Chapter 5's deliverables (the diagrams, the risk register, the decision records, the technical architecture document) are written as artifacts the CoE owns and maintains going forward, not as one-time documents produced only to pass the review board and then abandoned.

## Key terms

| Term | Meaning |
|---|---|
| Center of Excellence (CoE) | A standing cross-functional governance body owning shared standards and decisions across business units |
| Architecture decision record (ADR) | A documented record of a specific decision, its reasoning, and the alternatives it rejected |
| Centralized ownership | Owning standards and rules centrally, while distributing day-to-day execution of them |
| Governance sprawl | Inconsistent, uncoordinated customization across independent teams, left unchecked |

## Lab

A new BU admin asks, "if the CoE owns the standards, does that mean every change I make has to go through them first?" Using this lesson's centralized-ownership-vs-distributed-execution distinction, write a three-sentence answer clarifying exactly when CoE/CAB review is required and when it isn't, referencing Lesson 19's split if useful.

## Check yourself

Can you name the four specific things LTV Global's Center of Excellence owns? Can you explain, in your own words, the difference between centralized ownership and centralized execution, and why LTV Global's CoE deliberately practices the former without the latter?
