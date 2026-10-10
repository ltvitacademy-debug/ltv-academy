# Lesson 20 — Application Architecture Review

**Chapter 3 · Application Architecture Practice · Lesson 20 of 25**

## What you'll learn

- Why a design review is a distinct step, not something the designer can fully substitute by reviewing their own work
- A practical checklist structure that ties together every quality attribute from Chapter 2
- How to give and receive review feedback productively, without it becoming either a rubber stamp or a personal conflict
- Where review fits in Lesson 15's solution design sequence and why it comes before, not after, build

## Why a designer can't fully review their own design

Design review exists because the person who built a design has already made every assumption baked into it feel reasonable to themselves — that's exactly what makes a second, independent reviewer valuable: they haven't internalized those assumptions, so a gap the designer has stopped noticing is often immediately visible to someone seeing the design fresh. This isn't a statement about skill or trust; it's a structural fact about how familiarity with your own reasoning makes it harder to question. A review step genuinely changes outcomes precisely because it's independent, not because the reviewer is necessarily more senior or more skilled than the designer.

## A review checklist that ties Chapter 2 together

A disciplined application architecture review walks through, explicitly, each quality attribute this course has covered, as questions asked of the specific design in front of the reviewer — not as abstract theory:

- **Requirements traceability**: does every major design decision trace back to an actual, sourced requirement (Lesson 2), or is there a decision nobody can explain the origin of?
- **Scalability** (Lesson 8): has this been evaluated against realistic future volume and concurrency, not just today's test data?
- **Maintainability** (Lesson 9): is there a naming convention, is configuration externalized, is automation consolidated rather than sprawled?
- **Reuse** (Lesson 10): is anything duplicated that should be shared, or is anything built generically before a second real use case justified it?
- **Technical debt** (Lesson 11): what debt is this design knowingly taking on, and is it written down?
- **Principles** (Lesson 12): does this design follow the team's agreed architecture principles, or does it deviate — and if it deviates, is that deviation deliberate and justified?
- **Performance** (Lesson 13): what's doing the most expensive work in the critical path, and has that been considered?
- **Extensibility** (Lesson 14): does this design handle the plausible near-term changes already signaled in requirements, without over-building for purely speculative ones?
- **Boundary and packaging fit** (Lessons 4 and 19): does this belong where it's being built, or does it actually belong in a different application or package?

Running through this list isn't busywork — it's the single mechanism that catches the gap between "this design looks complete" and "this design has actually been checked against every quality attribute that matters."

## Giving and receiving feedback without it becoming personal

Review feedback should be framed around the design's trade-offs, not the designer's competence — "this scalability assumption doesn't account for the volume mentioned in requirements, here's why that matters" is actionable and specific; "this isn't well thought out" is neither. A designer receiving review feedback should treat a caught gap as the review doing its job, not as a personal failure — catching a maintainability gap in review, before build, is strictly cheaper than discovering it after launch, and that's true regardless of how skilled the original designer is. A review that rubber-stamps everything without genuinely engaging the checklist defeats its own purpose just as thoroughly as a review that turns into an unproductive argument.

## Review happens before build, not as a formality after

Review belongs as step 8 of Lesson 15's solution design sequence — *before* a build team starts, not as a courtesy walkthrough after the feature is already built and deployed, at which point "fixing" a review finding usually means rework rather than a quick design adjustment. A review conducted after the fact can still catch real problems, but it catches them at the most expensive possible point to fix them — exactly the dynamic Lesson 13 described for performance issues discovered after launch, generalized across every quality attribute in this chapter.

## Key terms

| Term | Meaning |
|---|---|
| Design review | An independent check of a design against requirements and quality attributes, conducted before build starts |
| Requirements traceability | The ability to connect every major design decision back to a specific, sourced requirement |
| Rubber-stamp review | A review that approves a design without genuinely engaging its checklist, defeating the review's purpose |

## Lab

Take the Claim-approval automation design note from Lesson 17's lab. Run it through this lesson's full review checklist, writing one sentence per quality attribute (requirements traceability, scalability, maintainability, reuse, technical debt, principles, performance, extensibility, boundary/packaging fit) stating whether the design note, as written, actually gives you enough information to answer that question — and if not, what specific question you'd need to ask the designer before approving it.

## Check yourself

Can you explain why a design review is structurally more likely to catch gaps than the designer reviewing their own work alone? Can you list at least six of the nine checklist items from this lesson's review structure, and explain why review has to happen before build rather than after?
