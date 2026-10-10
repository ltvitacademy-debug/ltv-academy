# Lesson 17 — Presenting an Enterprise Integration Design

**Chapter 3 · Review and Defense · Lesson 17 of 20**

## What you'll learn

- The structure a CTA-style review board expects an integration design presentation to follow
- Why requirements traceability has to be explicit, not implied by the diagram
- What a review-ready integration diagram actually needs to show, and what it should leave out
- How to present tradeoffs as deliberate choices rather than as a single "best" answer with no alternatives considered

## Why presentation structure is part of the architecture skill

A technically correct design that's presented as a wall of implementation detail, with no visible reasoning, reads to a review board as "got lucky" rather than "architected deliberately" — even when the underlying decisions were sound. The Salesforce Certified Technical Architect review board specifically evaluates a candidate's ability to communicate and justify a design, not just produce one. Lessons 1-16 built the reasoning; this lesson is about the separate, learnable skill of presenting it so that reasoning is visible.

## The structure a review board expects

A CTA-style design presentation generally follows a consistent shape, and deviating from it (skipping straight to the diagram, or burying the requirements in the middle of a long narrative) makes a design harder to follow regardless of its quality:

1. **Business context and requirements** — stated explicitly, in the client's own language where possible, before any technical content appears.
2. **Key design decisions and the alternatives considered** — not just the chosen pattern, but what else was on the table and why it lost.
3. **The design itself** — diagram plus narrative, covering data flow, system boundaries, and integration points.
4. **Risks and mitigations** — named explicitly, not left for the reviewer to find by asking.
5. **Assumptions** — stated up front, since an assumption surfaced only when challenged looks like it was never actually considered.

## Requirements traceability: connecting every decision back to a stated need

A reviewer's most common line of attack is asking "why did you choose X" for a decision that, on the diagram alone, looks arbitrary. **Requirements traceability** means every significant design decision can be traced back to a specific, previously-stated requirement or constraint — Doverfield's event-driven ERP sync (Lesson 1) traces back to "order creation can tolerate a short delay, and must not risk stalling the Opportunity close"; the portal's sharing-set design (Lesson 4) traces back to "each customer must see only their own records, scoped automatically as new customers are added." Presenting the design without this traceability forces the reviewer to assume it exists (optimistic) or assume it doesn't (common, and fatal to the candidate's score) — making it explicit removes the guesswork.

## What a review-ready diagram shows, and what it leaves out

An integration diagram built for a review board needs to show system boundaries, direction of data flow, and the specific integration points (which API, which event, which sync mechanism) connecting them — enough that a reviewer can trace Lesson 15's comparison-matrix reasoning onto the actual architecture. It should *not* attempt to show every field mapping or every Apex class name; that level of detail belongs in supporting documentation referenced during questions, not on the primary diagram, where it would bury the structure the diagram exists to communicate.

## Presenting tradeoffs as deliberate choices

Lesson 15's comparison matrix is exactly the artifact that turns "I chose event-driven" into "I chose event-driven over request-reply and batch, because the failure-risk profile ruled out blocking the close transaction, and the freshness requirement didn't demand instant delivery." A presentation that only states the final choice, with no visible alternative considered and rejected, reads as either lucky or untested — stating the alternatives and the specific reason each one was rejected is what demonstrates the choice was actually deliberate.

## Key terms

| Term | Meaning |
|---|---|
| Requirements traceability | The ability to trace every significant design decision back to a specific stated requirement or constraint |
| Review-ready diagram | A diagram showing system boundaries, data flow direction, and integration points, without implementation-level clutter |
| Deliberate tradeoff presentation | Stating the alternatives considered and the specific reason each was rejected, not just the final choice |

## Lab

Using Doverfield's CRM+Identity Provider case (Lessons 3, 12), draft the five-section outline from this lesson: state the business context/requirement in one sentence, name at least one alternative to SAML federation that was considered and why it was rejected for this case, describe what the diagram needs to show, name one risk with its mitigation, and state one assumption the design depends on.

## Check yourself

Can you list the five sections of a CTA-style presentation structure from memory, in order? Can you explain, using one of Doverfield's own design decisions, what "requirements traceability" looks like in practice rather than just defining the term?
