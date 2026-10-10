# Lesson 22 — Capstone II Retrospective

**Chapter 4 · Analytics and Delivery · Lesson 22 of 25**

## What you'll learn

- How to run a structured retrospective against the Definition of Done from Lesson 1
- What actually changed between the plan from Chapter 1 and what got built
- The specific technical debt this build knowingly left behind, and why that's normal
- How this retrospective is different from Chapter 5's demo and presentation

## Closing the loop on the Definition of Done

Lesson 1 opened with a 10-row Definition of Done and asked you to track "Built in Lesson ___" against each row as you went. This lesson is where that tracking pays off: go back through all 10 rows and confirm, specifically, where each requirement was actually satisfied — not "roughly," but the exact lesson and artifact. A requirement you can't point to a specific lesson for isn't actually done; it's a gap this retrospective exists to surface before Chapter 5's presentation, not during it.

## What changed from the plan

A real retrospective isn't just a checklist pass — it's an honest look at where the build diverged from Chapter 1's architecture, and why. Two concrete examples from this capstone's own path:

- **Lesson 2's architecture overview** placed the REST integration entirely in Chapter 3 as a clean, isolated piece. By Lesson 15, it had grown a second dependency the original plan didn't anticipate: the exception-handling design needed its own retry logic living partly in the Queueable (Lesson 11) and partly in the integration class (Lesson 14) — not a failure of the plan, but a normal refinement once the real error cases got worked through.
- **Lesson 20's performance review** found that `WarrantyClaimTriggerHandler`'s original design (Lesson 9) genuinely broke at bulk volume and needed the refactor from Lesson 20 — worth naming explicitly in a retrospective rather than glossing over, because "we found and fixed a real governor-limit bug during performance testing" is a stronger, more honest statement than pretending the first version was always correct.

## Technical debt: what this build knowingly leaves behind

Every real project ships with some technical debt — deliberate, documented gaps rather than accidental ones. This capstone has a few worth naming out loud instead of hiding:

- `StaleInstallationJobBatch`'s `finish()` method doesn't actually notify Dmitri's team yet (Lesson 11 left a comment noting where that would go) — a real next iteration would add a Platform Event or email alert there.
- The "Assign Technician" subflow (Lesson 6) uses a simple least-loaded assignment and doesn't account for which technicians are certified on which appliance categories — a reasonable v1 simplification, not an oversight, but one worth flagging for v2.
- `ManufacturerWarrantyClient` only handles a single claim submission per callout; a real high-volume day might benefit from a batch submission endpoint if the fictional manufacturer's API supported one.

Naming technical debt explicitly, with a reason for the simplification, is what separates a documented trade-off from a silent shortcut nobody remembers making.

## How this differs from the demo and presentation

This retrospective is an internal, honest self-assessment — written for you, Priya, and the project record, not for an audience. Chapter 5's demo and presentation (Lessons 23–24) is the external-facing version: a curated walkthrough built to show the platform's strengths clearly. Both are necessary, and they're not the same document — a presentation that included every piece of technical debt from this lesson's list would bury the platform's real strengths in caveats, while a retrospective that only talked about strengths wouldn't actually help anyone improve the next build.

## Key terms

| Term | Meaning |
|---|---|
| Retrospective | A structured, honest internal review of what was built against what was planned |
| Technical debt | A deliberate, documented simplification or gap left for a future iteration |
| Definition of Done | The Lesson 1 requirements checklist this retrospective closes out |

## Lab

Complete your "Built in Lesson ___" column from Lesson 1's checklist for all 10 requirements. Then write a short retrospective covering: one place the build diverged from the original Chapter 1 plan and why, and three pieces of technical debt this platform knowingly carries, each with a one-sentence reason for the simplification.

## Check yourself

- Why does naming technical debt explicitly matter more than it might seem?
- Give one example from this capstone of where the plan and the actual build diverged, and why that's not itself a problem.
- How does a retrospective differ in purpose from the demo and presentation in Chapter 5?
