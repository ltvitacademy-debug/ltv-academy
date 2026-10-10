# Lesson 25 — Deliverables: Risk Register and Decision Records

**Chapter 5 · Deliverables · Lesson 25 of 33**

## What you'll learn

- How Lesson 6's risk register gets formalized with updated assessments now that the design is known
- What an architecture decision record (ADR) is, and why LTV Global writes one for each major rejected alternative
- The specific ADRs this capstone has already earned, just by making its design decisions honestly
- Why a decision record without a rejected alternative isn't actually a decision record

## Formalizing the risk register

Lesson 6 identified six risks before any detailed design existed. Now that Chapters 2 through 4 have actually designed the mitigations, this deliverable updates that same register with what's actually true today: Risk #1 (LedgerPoint batch delay) is now mitigated and formally documented as an accepted NFR tolerance window (Lesson 17), downgrading its practical urgency even though the underlying fact hasn't changed. Risk #2 (ownership skew) is mitigated by queue-based ownership (Lesson 10), with its likelihood now low rather than medium, since the mitigation is actually designed, not just planned. Risks #3 through #6 follow the same pattern — each one's mitigation column, written as a placeholder in Lesson 6, now points to a specific, completed lesson's actual design. A risk register that never gets updated after the initial identification is a worse artifact than no risk register at all, because it gives false confidence that the risks are still exactly as unmitigated as the day they were written down.

## Architecture decision records

An **architecture decision record (ADR)** documents one specific decision: what was decided, what alternatives were considered, why the chosen option won, and — critically — why each rejected alternative was rejected. The last part is what separates a real ADR from a design summary: a decision record that only describes what was chosen, without naming what wasn't chosen and why, gives a future reader (or an Architecture Review Board) no way to tell whether the alternatives were genuinely considered or never occurred to the architect at all.

## LTV Global's key ADRs

This capstone has already produced the content for at least five real ADRs, simply by making its design decisions honestly in Chapters 2 through 4:

- **ADR-01: Single global org vs. multi-org** (Lesson 7) — chosen: single org. Rejected: per-region or per-BU multi-org, because it would break the vision's unified-customer-view commitment and multiply licensing/integration cost.
- **ADR-02: Central integration hub vs. point-to-point** (Lesson 13) — chosen: hub with Enterprise Integration Patterns. Rejected: point-to-point, because it doesn't scale past the first few integrations.
- **ADR-03: LedgerPoint batch integration vs. forcing real-time** (Lesson 14) — chosen: nightly batch with reconciliation. Rejected: a real-time API project, because it would require modernizing core financial infrastructure outside this transformation's scope.
- **ADR-04: Summarized vs. full GL replication into Salesforce** (Lesson 8) — chosen: summarized AR/invoice status only. Rejected: full ledger replication, because it duplicates the system of record and bloats storage for no benefit any Salesforce user needs.
- **ADR-05: Hybrid external identity vs. routing everyone through corporate Okta** (Lesson 12) — chosen: large-dealer federation optional, Experience Cloud-native login otherwise. Rejected: universal corporate Okta, because its workforce licensing isn't priced or built for millions of consumer logins.

## Why ADRs matter most in Chapter 6

An Architecture Review Board doesn't just ask "what did you decide" — it asks "what else did you consider, and why didn't you pick it." A written ADR means that question has an already-prepared, specific answer instead of an improvised one invented under live questioning. This is precisely why Chapter 6's defense lessons (30 through 32) walk through exactly these five ADRs, among others, as rehearsal material.

## Key terms

| Term | Meaning |
|---|---|
| Architecture decision record (ADR) | A document recording a specific decision, the alternatives considered, and why each was accepted or rejected |
| Rejected alternative | An option genuinely considered and explicitly not chosen, with a stated reason |
| Risk register update | Revisiting a previously identified risk's assessment once its actual mitigation is designed |

## Lab

Pick one of the five ADRs above and rewrite it in your own words as a three-part statement: "We chose X. We considered Y instead. We rejected Y because Z." Keep each part to one sentence, and make sure the "because Z" part states an actual reason, not just "it was better."

## Check yourself

Can you name LTV Global's five key architecture decision records and, for each, state the rejected alternative and the specific reason it was rejected? Can you explain, in your own words, why a decision record that doesn't name a rejected alternative isn't actually functioning as a decision record?
