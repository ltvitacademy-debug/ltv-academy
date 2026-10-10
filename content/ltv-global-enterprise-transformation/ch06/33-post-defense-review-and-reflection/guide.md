# Lesson 33 — Post-Defense Review and Reflection

**Chapter 6 · Defense · Lesson 33 of 33**

## What you'll learn

- What happens after an "approved with conditions" outcome, in a real engagement
- How to close out LTV Global's two conditions from Lesson 32 concretely
- A full-course retrospective connecting all thirteen design areas back to the original vision
- What this capstone is actually certifying you're ready for, and what it deliberately isn't

## Closing the two conditions

Lesson 32 ended with "approved with conditions," not an unconditional pass — and closing those conditions out is real, necessary work, not a formality. The LedgerPoint reconciliation process gets load-tested against a full day's realistic batch volume, with results documented against the performance NFR from Lesson 17; if the test reveals the reconciliation step itself can't keep pace with real volume, that's a design gap caught before go-live rather than after, which is the entire point of the condition existing. The Equipment Financing field-level security configuration gets independently audited by the security team, confirming the credit-score and financing-terms field restrictions from Lesson 11 are configured exactly as designed, not just as intended. Only once both conditions are satisfied and documented does the design move from "approved with conditions" to simply "approved."

## A full-course retrospective

Looking back across all thirty-three lessons, every one of the thirteen design areas named back in Lesson 1 now has a real answer, each one traceable to the vision statement from Lesson 5: **application architecture** (single global org, for unified customer view), **data architecture** (the ownership map, so no system duplicates another's authority), **data model** (Equipment Asset and the rest, shaped by actual relationship needs, not defaults), **large data volumes** (queue ownership and archiving, so Parts Order's growth doesn't become a production incident), **security architecture** and **sharing architecture** (Private OWD plus layered, deliberate exceptions), **identity architecture** (Okta for the workforce, hybrid federation for external users, sized to each population), **integration architecture** and **API architecture** (a central hub applying named patterns, not point-to-point sprawl), **environment strategy** and **DevOps strategy** (per-BU sandboxes plus a shared integration sandbox, Salesforce DX, scratch orgs), **migration strategy** (phased waves sequenced by actual risk), **backup/recovery considerations** (point-in-time recovery, layered beyond Salesforce's own platform protection), **monitoring strategy** (platform health and integration health, covering what each other can't see), and **governance model** (a Center of Excellence that survives staff turnover by design, not by hope).

## What this capstone certifies, and what it doesn't

Completing this capstone demonstrates the ability to take a large, realistic, multi-system enterprise scenario and produce a coherent, internally consistent, defensible architecture across every major Technical Architect design discipline — and to defend that architecture's decisions, including its rejected alternatives, under live questioning. It does not certify that you are a Salesforce Certified Technical Architect: the real CTA credential requires its own review board, its own scenario, and substantial professional experience this course cannot substitute for. What this capstone does certify is that you've now practiced, start to finish, the actual shape of that work — which is exactly why it sits as the final course in this ladder, not an earlier one.

## Where you go from here

The Technical Architect ladder's content is now complete. From here, the path forward is professional experience: real client engagements, real review boards, real stakeholders whose priorities genuinely conflict in ways no course scenario can fully anticipate. LTV Global Industries was never a real company, but the reasoning you practiced defending its architecture — requirement to decision, decision to rejected alternative, rejected alternative to honest justification — is the real, transferable skill this entire capstone existed to build.

## Key terms

| Term | Meaning |
|---|---|
| Condition closure | Completing and documenting the specific follow-up work an "approved with conditions" outcome requires |
| Retrospective | Looking back across a completed body of work to confirm every stated goal was actually addressed |
| Transferable skill | A capability (here, requirement-to-decision-to-defense reasoning) that applies beyond the specific scenario it was practiced on |

## Lab

Write a short closing reflection (150-250 words): pick the one design area from this capstone's thirteen that you found hardest to defend convincingly, explain specifically why it was hard (not just "it was complex"), and state what you'd want to research or practice further before defending a real architecture in that same area for an actual client.

## Check yourself

Can you trace all thirteen design areas back to the Lesson 5 vision statement, stating in one phrase each how that area serves the vision? Can you explain, in your own words, exactly what this capstone certifies you're ready for and what it explicitly does not substitute for?
