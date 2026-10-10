# Lesson 19 — Enterprise Integration Mock Review Board

**Chapter 3 · Review and Defense · Lesson 19 of 20**

## What you'll learn

- How a full mock review session runs end to end, from presentation through objections to a verdict
- How to combine Lesson 17's presentation structure and Lesson 18's objection-handling into one live session
- What a review board actually scores, beyond whether the final design was technically correct
- How to run this same exercise yourself, as practice, before a real review

## The scenario: defending Doverfield's combined landscape

This lesson walks through a full mock review of Doverfield's integration landscape — not one case study, but the combined picture from Lesson 6, defended as a whole. The candidate (call them Priya, playing the architect role) presents, and a three-person mock panel raises objections drawn from Lesson 18's patterns. This is the closest thing in the course to an actual CTA-style review board session, compressed into one lesson.

## The presentation

Priya opens with business context: "Doverfield runs five production integrations touching ERP, a data warehouse, an identity provider, a customer portal, and a shipping carrier. My goal today is to walk through how these were designed, where tradeoffs were made deliberately, and how the landscape holds up under failure." She walks the panel through Lesson 15's comparison matrix first, before touching any single case in detail — establishing the consistent criteria (volume, latency tolerance, failure risk) up front, exactly as Lesson 17 recommends, so every individual design choice that follows can be judged against criteria the panel already has in view.

## The objections, live

**Panelist 1**: "You've got five integrations all touching Salesforce. Why isn't this all behind one middleware hub?" Priya answers with Lesson 18's Objection 1 pattern: conceding point-to-point's simplicity for a single connection, then pointing at the maintenance-cost tradeoff that justifies routing new work through the hub while migrating the ERP connection — the highest-maintenance existing one — rather than claiming the hub is unconditionally better.

**Panelist 2**: "Your data warehouse sync uses CDC for Account and Opportunity, but incremental extract for everything else. Isn't that inconsistent?" Priya answers by naming the actual criterion behind the split — not every object needs real-time freshness or delete-sensitivity badly enough to justify CDC's added complexity — and connects it back to Lesson 15's matrix: the choice tracks each object's own failure-risk and freshness profile, not a blanket "CDC is better" or "CDC is worse" rule.

**Panelist 3**: "What's your evidence the retry-and-dead-letter design in the ERP sync actually works, versus just sounding reasonable on a diagram?" Priya gives Lesson 18's Objection 4 answer honestly: a sandbox test taking the ERP endpoint offline and confirming the backoff sequence and dead-letter landing behaved as designed was run before go-live, and she describes specifically what that test checked — not just asserting confidence without evidence.

## What the panel is actually scoring

A real CTA-style panel scores more than "was Priya's final answer correct." It's also watching: did she concede a valid point in Panelist 1's objection rather than arguing against it reflexively; did she connect Panelist 2's question back to a previously-stated criterion rather than inventing a new justification on the spot; did she have actual evidence, not just confidence, for Panelist 3's resilience question. A candidate who gets every final answer "right" but argues defensively, invents justifications on the spot, or can't distinguish tested from assumed behavior scores worse than one who answers more humbly but demonstrates the reasoning underneath holds together.

## Running this yourself

The exercise generalizes directly: pick any one of Doverfield's five case studies (or your own real integration), write a two-minute presentation opening using Lesson 17's structure, then write out your own honest answers to all four of Lesson 18's objection patterns applied to that specific case — including admitting, out loud, anywhere your design doesn't actually have a good answer yet.

## Key terms

| Term | Meaning |
|---|---|
| Mock review board | A practice session simulating a real CTA-style panel's presentation-and-objection format |
| Scoring beyond correctness | Evaluating how an answer was reasoned and defended, not only whether the final conclusion was right |

## Lab

Write your own three-panelist mock review for Doverfield's customer-portal case (Lessons 4, 13): one objection about the sharing-set vs. role-hierarchy choice, one about what happens if a sharing-set misconfiguration briefly exposes one customer's data to another, and one about whether the design has actually been tested for that exposure scenario. Answer all three using Lesson 18's objection-handling patterns.

## Check yourself

Can you explain, from this mock session, what Priya did differently in each of her three answers that reflects Lesson 18's "conceding partially," "honest gap admission," and "naming a specific mitigation" patterns respectively? Can you describe, in your own words, what a review panel scores beyond whether the final technical answer was correct?
