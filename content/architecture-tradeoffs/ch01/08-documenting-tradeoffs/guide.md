# Lesson 8 — Documenting Tradeoffs

**Chapter 1 · Architecture Tradeoffs · Lesson 8 of 20**

## What you'll learn

- Why an undocumented tradeoff decision becomes a liability the moment the original architect leaves
- The concrete anatomy of an Architecture Decision Record (ADR)
- What belongs in a tradeoff writeup versus what's noise
- How documented tradeoffs connect to Chapter 3's review-board and executive-communication skills

## The decision isn't done until it's written down

Lessons 2 through 7 covered specific tradeoffs an architect resolves constantly — security vs. usability, performance vs. complexity, build vs. buy, sync vs. async, declarative vs. programmatic, real-time vs. batch. Every one of those decisions, made well, still has a shelf life problem if it only exists in the architect's head or in a Slack thread that scrolls out of view in a week. Six months later, a new team member looks at a system that chose batch over real-time, or Apex over Flow, and has no way to tell whether that was a deliberate, reasoned decision or an accident nobody got around to revisiting. Without a record, every past decision looks equally arbitrary, and the new team member's only options are to trust it blindly or re-litigate it from scratch — both bad outcomes that a short, honest writeup would have prevented.

Documenting a tradeoff isn't bureaucracy for its own sake. It's the mechanism that lets a decision survive past the person who made it, and it's what turns "we chose X" into something a future architect, an auditor, or an executive can actually evaluate without reconstructing the entire reasoning from scratch.

## The anatomy of a real decision record

An **Architecture Decision Record (ADR)** is a short, standard-format writeup capturing one decision. A good one has a consistent shape:

- **Context.** What problem forced this decision? What were the actual constraints — scale, team, budget, regulatory environment, timeline — that made this a real decision rather than an obvious one?
- **Options considered.** What were the realistic alternatives, not just the one chosen? If "we considered Apex vs. Flow" only lists the option picked, a reader can't tell whether the other side was seriously evaluated or dismissed without thought.
- **Decision.** Which option was chosen, stated plainly, with no hedging.
- **Rationale — specifically naming what was traded away.** This is the part most writeups skip, and it's the most important part. Don't just say "we chose Flow for maintainability." Say "we chose Flow for admin maintainability, and we accept that this caps how complex the branching logic can get before it needs to move to Apex." Naming the cost, not just the benefit, is what makes the record honest and useful later.
- **Conditions for revisiting.** What would have to change for this decision to need reconsideration? A specific record volume, a regulatory change, a team composition shift. This is what Lesson 1's third question ("what happens when the context changes?") looks like written down.

## What belongs in it, and what doesn't

A good ADR is short — often one page — and specific. It is not a design spec, not a full requirements document, and not a place to relitigate the decision after the fact. It records the reasoning at the moment the decision was made, with enough specificity that someone unfamiliar with the project could read it and understand both what was chosen and why the alternative was rejected. Vague language ("we chose the best option for scalability") is worse than useless, because it gives a false sense that reasoning happened without actually preserving any of it. A record that says "we chose Batch API over Platform Events because this integration handles 2 million records nightly and sub-minute freshness provides no business value here, at the cost of losing same-day visibility into record changes" tells a future reader exactly what to check if the business need ever changes.

This habit connects directly to where this course goes next. Chapter 3 covers explaining tradeoffs to executives and running a tradeoff review board — both of those are dramatically easier when the reasoning already exists in writing, rather than needing to be reconstructed live, under time pressure, in front of an audience that's going to ask exactly the "why not the other option" question an ADR already answers.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Decision Record (ADR) | A short, standard-format writeup capturing one architecture decision: context, options, decision, rationale, and conditions for revisiting |
| Rationale | The part of an ADR that explains why the decision was made, explicitly naming what was traded away, not just what was gained |
| Conditions for revisiting | The specific future circumstances under which a past decision should be re-evaluated, documented at the time the original decision was made |

## Lab

Pick one of the tradeoff decisions you reasoned through in this chapter's earlier labs (for example, the security-vs-usability nonprofit field-staff scenario, or the real-time-vs-batch Case data scenario). Write a one-page ADR for it using the five-part structure above: context, options considered, decision, rationale (naming the specific cost), and conditions for revisiting. Keep it to roughly 200-300 words — the discipline of being concise is part of what makes an ADR actually get read later.

## Check yourself

Can you name the five parts of a good Architecture Decision Record, and explain why "rationale" has to name the cost, not just the benefit, to be useful? Can you explain why an undocumented tradeoff decision becomes a liability specifically once the original architect is no longer on the project?
