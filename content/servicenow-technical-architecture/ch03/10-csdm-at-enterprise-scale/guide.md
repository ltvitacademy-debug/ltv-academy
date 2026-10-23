# Lesson 10 — CSDM at Enterprise Scale

**Chapter 3 · Data Architecture · Lesson 10 of 32**

## What you'll learn

- A one-sentence recap of why CSDM exists, its layered model, and the Business vs. Technical Services split from course 9
- Why getting the initial CSDM implementation right is the easy part compared to what comes after
- The real governance challenge: maintaining CSDM discipline across dozens of teams, over years, not just at launch
- Why CMDB data quality degrades on its own without deliberate, ongoing governance
- What an architect actually owns here: the governance process, not just the data model

## The one-sentence recap

Course 9 covered why CSDM exists — a standard, layered model for describing services, applications, and infrastructure consistently, with a real split between Business Services (what the organization delivers to customers or employees) and Technical Services (the underlying components that support them). That's the model. This lesson is about what happens to that model once it's live, across an entire enterprise, for years.

## The easy part is day one

Standing up a correct CSDM model for a single team, with a small group of engaged people who were in the room when it was designed, is genuinely achievable — course 9 showed you how. What course 9 didn't need to cover, because it's a different problem entirely, is what happens when that same model has to stay correct across 40 different teams, none of whom were in that original room, each independently creating and updating CIs, relationships, and service mappings for years after the original implementation team has moved on to other projects.

That's the real test of a CSDM implementation. Not "was it modeled correctly once," but "does it stay modeled correctly as dozens of people who never read the original design keep touching it."

## Why data quality degrades without deliberate governance

CMDB data quality doesn't hold steady by default — it erodes, gradually and predictably, unless something actively pushes back against the erosion. A few concrete ways this happens at enterprise scale:

- **Inconsistent classification.** One team models a new application as a Business Application CI; another, doing functionally the same thing, invents a slightly different pattern because they never saw how the first team did it. Both are "working," but they're no longer the same model.
- **Stale relationships.** A server gets decommissioned, but the relationship linking it to a Business Service never gets removed, because removing it wasn't anyone's assigned job.
- **Orphaned or duplicate CIs.** Discovery and manual creation both populate the CMDB, and without a deliberate reconciliation process, the same real-world asset ends up represented by two CIs that drift apart over time.
- **Silent scope creep.** A team under time pressure skips the "right" way to map a new service into the CSDM layers and does something expedient instead — and that shortcut becomes the new unofficial pattern other teams copy.

None of these failures happen all at once. Each one is small, individually explainable, and easy to excuse in the moment. The damage is cumulative — a CMDB that was clean at launch slowly becomes one nobody fully trusts, which defeats the entire point of having a CSDM model in the first place.

## What the architect actually owns: the process, not just the model

This is the real shift at enterprise scale. An architect's CSDM responsibility isn't "design the model once and hand it off" — it's designing the **ongoing governance process** that keeps dozens of teams, over years, consistent with that model:

- **Stewardship assignments.** Course 9's data-quality and stewardship concepts, now applied with named owners for each service domain — someone whose job includes noticing and fixing drift in their area, not just the original implementation team.
- **Change discipline at the point of creation.** New CI classes, new relationship types, and new service mappings go through a defined review, the same way a new table or integration pattern does — not created ad hoc by whichever team needs one first.
- **Recurring data-quality audits.** A scheduled, repeated check against known quality indicators (orphaned CIs, missing relationships, classification consistency) — not a one-time cleanup that quietly lapses.
- **Feedback into the model itself.** Governance isn't just enforcement — when a team's "wrong" pattern turns out to solve a real gap in the model, that's a signal the model itself may need updating, deliberately and centrally, rather than being quietly worked around team by team.

## Key terms

| Term | Meaning |
|---|---|
| CSDM governance | The ongoing process of keeping CMDB data consistent with the CSDM model across many teams over time |
| Data stewardship | Named ownership for a service domain's CMDB data quality, beyond the original implementation team |
| Drift (CSDM) | Gradual divergence from the intended model as different teams independently classify and relate data |
| Change discipline | Requiring new CI classes, relationship types, or service mappings to go through review, not ad hoc creation |

## Check yourself

Eighteen months after a CSDM rollout, two different departments have each created their own slightly different way of mapping a new SaaS application into the model. What does this lesson say is the real root cause, and what governance mechanism would have caught it earlier?
