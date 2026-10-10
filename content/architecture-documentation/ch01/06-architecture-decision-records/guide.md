# Lesson 6 — Architecture Decision Records

**Chapter 1 · Documenting Architecture · Lesson 6 of 17**

## What you'll learn

- What an architecture decision record (ADR) is and the specific gap it fills that diagrams don't
- The standard ADR sections: title, status, context, decision, consequences
- Why ADRs are treated as an immutable log, not a document you edit in place
- How to write an ADR for a realistic Salesforce architecture choice

## The gap diagrams don't fill

An ERD shows what the data model is. A sequence diagram shows what order calls happen in. Neither one shows *why* the architect chose this shape over the alternatives that were considered and rejected. That gap — the reasoning, not the result — is what an **architecture decision record (ADR)** exists to capture. The format traces back to Michael Nygard's 2011 proposal that teams record each significant architectural decision as its own short, dated document, rather than letting the reasoning live only in a meeting, a Slack thread, or an architect's memory that fades within a year.

An ADR is not a design document (Lesson 7 covers that) and it's not a diagram — it's a short, focused record of one decision, written at the time the decision is made, while the context and the rejected alternatives are still fresh and honest.

## The standard sections

The classic ADR format is short on purpose — Nygard's original template fits on roughly a page:

- **Title**: a short, specific name, usually numbered — "ADR-014: Use Platform Events for Order-Status Sync to Warehouse System."
- **Status**: where this decision currently stands — commonly `Proposed`, `Accepted`, `Deprecated`, or `Superseded by ADR-0XX`. Status is the one field expected to change after the record is written; everything else about the record stays fixed.
- **Context**: the forces at play when the decision was needed — the business requirement, the technical constraints, the options that were realistically on the table. Written honestly, including constraints that made some options infeasible, not just the ones that made the final choice attractive.
- **Decision**: the choice that was made, stated plainly — "We will publish an Order_Status_Change platform event from Apex whenever Order.Status__c changes, rather than a scheduled batch sync."
- **Consequences**: what follows from this decision — both the benefits and the costs accepted. A decision record that lists only upside isn't an honest one; every real architectural choice trades something away.

## Why ADRs are a log, not a living document

A design document gets updated as understanding improves — that's expected and healthy (Lesson 15 covers keeping documentation current). An ADR is different: once accepted, the original record is treated as **immutable**. If circumstances change and the team decides Platform Events were the wrong call eighteen months later, the fix is not to edit ADR-014 to say something different. The fix is to write a new ADR — say, ADR-031 — that changes the decision, and mark ADR-014's status as "Superseded by ADR-031." The old record stays exactly as it was written, honestly describing what the team believed and chose at the time, given what they knew then.

This matters for the same reason a court doesn't edit old rulings when a new one overturns them: the historical record of what was decided, when, and why is valuable precisely because it reflects the reasoning available at that moment — including reasoning that later turned out to be wrong. An editable ADR log quietly becomes useless for the one thing it's supposed to do, which is let a future reader understand why today's system looks the way it does.

## When to write one

Not every configuration choice deserves an ADR — a debate over field label capitalization doesn't need one. An ADR earns its place when a decision is: architecturally significant (it would be expensive or risky to reverse), genuinely debated (there were real alternatives, not an obvious single choice), and likely to be questioned later ("why didn't we just use X" is a predictable future question). Integration pattern choices, platform vs. custom-build decisions, multi-org vs. single-org structure, and sharing-model design choices are classic ADR territory in Salesforce architecture work.

## Key terms

| Term | Meaning |
|---|---|
| Architecture decision record (ADR) | A short, dated record capturing one significant architectural decision, its context, and its accepted consequences |
| Status | The ADR field tracking whether a decision is Proposed, Accepted, Deprecated, or Superseded |
| Immutable log | The convention that an accepted ADR's content is never edited after the fact — a changed decision gets a new ADR that supersedes the old one |
| Consequences | The honest statement of both benefits and costs accepted by a decision, required in a complete ADR |

## Lab

Write a full ADR for this scenario: your team is deciding how a Salesforce org should receive real-time inventory updates from a legacy on-premises warehouse system that has no modern REST API, only a nightly file export. The realistic options are: (a) build a middleware layer that polls for the file and pushes updates via REST, (b) accept a once-nightly batch sync with inventory data being up to 24 hours stale, or (c) push the warehouse system vendor to build a real-time API (timeline unknown, likely 6+ months). Write all five ADR sections — Title, Status, Context, Decision, Consequences — making a real choice and stating real trade-offs, not just upside.

## Check yourself

Can you name the five standard ADR sections from memory? Can you explain why Status is the only field expected to change on an accepted ADR, while everything else stays fixed? Can you explain why "superseding" an old ADR with a new one is different from simply editing the old one?
