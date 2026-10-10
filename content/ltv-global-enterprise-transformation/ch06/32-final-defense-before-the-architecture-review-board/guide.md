# Lesson 32 — Final Defense Before the Architecture Review Board

**Chapter 6 · Defense · Lesson 32 of 33**

## What you'll learn

- The full structure of LTV Global's final ARB defense, start to finish
- How the presentation opening, the design walkthrough, and the open questioning phase each work differently
- A complete worked example of the defense covering all thirteen design areas at the level a real board session would
- What "approved with conditions" looks like as a realistic outcome, and why it's not a failure

## The defense has three phases

LTV Global's final defense follows the same three-phase shape this catalog's architecture-review-board material describes generally: a **presentation phase**, where the architect walks the board through the design using the executive presentation (Lesson 28) as the visual spine, expanded with technical depth as needed; an **open questioning phase**, where board members ask about any of the thirteen design areas in any order, testing exactly the material rehearsed in Lessons 29 through 31; and a **deliberation and outcome phase**, where the board renders a decision.

## The presentation phase: opening strong

The defense opens with Lesson 1's elevator statement, refined through Lesson 27's executive summary: LTV Global Industries, ~10,000 users, three regions, four business units, millions of customer records, a legacy landscape (Meridian, LedgerPoint, EuroCRM) that constrains what's achievable, and the target-state vision from Lesson 5. The architect then walks the single-org decision (Lesson 7) as the foundational choice everything else builds from, followed by the data architecture and ownership map (Lesson 8), the security and sharing model (Lesson 11), identity (Lesson 12), the integration hub and its three system-specific designs (Lessons 13-15), the customer portal (Lesson 16), and the delivery strategy (Lessons 18-22) — each one stated with its decision, its reasoning, and its rejected alternative, in the same pattern rehearsed in Lessons 30 and 31.

## The open questioning phase: a representative sample

A representative exchange from LTV Global's actual defense:

**Board member (integration):** "Three different integration mechanisms for three different systems feels inconsistent. Why not pick one approach and apply it everywhere?"
**Architect:** "Because the three systems aren't actually equivalent. Meridian can do near-real-time, so order creation gets a synchronous callout. LedgerPoint has no API at all, so it gets batch with reconciliation. Snowflake doesn't need real-time for analytics, so it gets a predictable nightly extract. Applying one mechanism everywhere would mean either forcing real-time onto a system that can't do it, or needlessly slowing down Meridian's order confirmation to match LedgerPoint's constraint. The inconsistency you're seeing is actually three correct, independent answers to three different constraints."

**Board member (governance):** "What happens to this design in three years when the person who built it has moved on?"
**Architect:** "That's exactly what the Center of Excellence is for. The shared data model, the coding standards, and the architecture decision records are owned by a standing body with representation from every business unit, not by any one person's memory. The ADRs specifically exist so a future architect can see not just what we built, but why we rejected the alternatives — so they're not re-litigating a decision without knowing it was already considered and resolved."

**Board member (risk):** "Your risk register shows GDPR as medium likelihood, not low. Why haven't you fully eliminated that risk?"
**Architect:** "Because fully eliminating it isn't realistic, and I'd be overstating the design if I claimed otherwise. The layered controls — OWD, role hierarchy, field-level security, encryption, data-residency NFRs — substantially reduce it, which is why impact stays rated high but likelihood moved down from the initial assessment. A 'low' rating would imply we think a GDPR issue is unlikely without ongoing diligence, which isn't an honest claim to make about live data in a growing region."

## Deliberation and outcome: approved with conditions

A real ARB rarely issues an unconditional approval on the first pass, and treating "approved with conditions" as a failure misunderstands what the board is for. LTV Global's board approves the design **with conditions**: the LedgerPoint reconciliation process must be load-tested against a full day's realistic batch volume before go-live (tightening Lesson 17's NFR validation), and the Equipment Financing field-level security configuration must be independently audited by the security team before that business unit's rollout phase. Both conditions are narrow, specific, and tied to a concrete deliverable already named earlier in this course — exactly what a board adds value by catching, not evidence the underlying design was flawed.

## Key terms

| Term | Meaning |
|---|---|
| Presentation phase | The opening portion of a defense where the architect walks the board through the design |
| Open questioning phase | The portion where board members ask about any design area, testing depth and consistency |
| Approved with conditions | A realistic, common ARB outcome requiring specific follow-up before full approval |

## Lab

Write one additional mock exchange, in the same format as this lesson's three examples, for a design area this lesson didn't cover in the open questioning phase (for example, the customer portal, the migration strategy, or the identity architecture). Include the board member's question and a strong answer following the direct-answer/reasoning/rejected-alternative pattern from Lesson 30.

## Check yourself

Can you describe LTV Global's three defense phases and what happens in each? Can you explain why "approved with conditions" is a realistic, often appropriate outcome rather than a sign the design failed, and name LTV Global's two specific conditions from this lesson?
