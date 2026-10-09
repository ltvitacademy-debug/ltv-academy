# Agile vs. Waterfall

Every IT department plans and delivers work using one of two basic shapes — or some blend of
both. Before you can understand a Jira ticket, a sprint, or a change-control form, you need to
know which shape the team around you is using, because it changes what's expected of you on day
one.

## What you'll learn

- The sequential, phase-by-phase shape of Waterfall
- The iterative, repeating shape of Agile
- Why most real companies land somewhere in between

![A side-by-side comparison of the Waterfall model's five sequential phases — Requirements, Design, Build, Test, Release — against the Agile cycle's four repeating steps — Plan, Build, Review, Adapt.](/courses/how-it-teams-work/ch01/01-agile-vs-waterfall/agile-vs-waterfall.png)

## Waterfall: one pass, in order

Waterfall plans an entire project up front, then moves through fixed phases once, in order:
requirements are gathered and signed off, then the whole system is designed, then built, then
tested, then released. Each phase finishes before the next one starts — there's no "circling
back" to requirements once design is underway.

That rigidity is the point, not a flaw. Waterfall fits work where the requirements are genuinely
stable and well understood up front — a regulatory report with a legally defined format, a
database migration with a fixed source and target schema, a vendor contract with a specific
delivery date. The cost of that rigidity is that a requirement discovered wrong in month four
(after design and half the build are already done) is expensive to fix.

## Agile: short cycles, repeated

Agile instead breaks the same work into short, repeating cycles — typically one to two weeks. In
each cycle the team plans a small slice of work, builds it, reviews it with real feedback, and
adapts the next cycle based on what was learned. The system literally never finishes a single
"design phase" the way Waterfall does; design keeps happening, a little at a time, every cycle.

That repetition is the point. Agile fits work where requirements are likely to shift as people see
the product take shape — most product development, most internal tooling, most reporting that
business users will react to once they can click around in it. The cost is less predictability
up front: a stakeholder asking "when will the whole thing be done" gets a rougher answer than they
would from a Waterfall plan.

## Hybrid approaches: most real companies

Few companies are purely one or the other. A common hybrid keeps Waterfall's up-front charter and
final sign-off — useful for budgeting and executive buy-in — while running the actual build in
Agile sprints in between:

![Blending both approaches in practice: a Waterfall-style charter and budget set once up front, broken into Agile sprints for the actual build, shipped as working increments, then closed out with a formal Waterfall-style UAT sign-off.](/courses/how-it-teams-work/ch01/01-agile-vs-waterfall/hybrid-approach.png)

This is exactly why you'll hear both vocabularies at the same company — "the charter is approved,
let's get it into the backlog for sprint planning" is a completely normal sentence in a hybrid
shop, even though "charter" is a Waterfall term and "sprint" is an Agile one.

## Key terms

| Term | Meaning |
|---|---|
| Waterfall | A sequential delivery model — each phase (requirements, design, build, test, release) completes before the next begins |
| Agile | An iterative delivery model — short, repeating cycles of planning, building, and adapting based on feedback |
| Sprint | One short, fixed-length Agile cycle, typically 1-2 weeks |
| Hybrid approach | Combining Waterfall's up-front planning/sign-off with Agile's iterative build cycles |

## Check yourself

Why does a requirement discovered to be wrong in month four cost far more to fix under Waterfall
than it does under Agile?
