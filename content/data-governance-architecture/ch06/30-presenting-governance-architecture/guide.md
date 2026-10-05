# Lesson 30 — Presenting Governance Architecture

**Chapter 6 · Applied Architecture · Lesson 30 of 30**

## What you'll learn

- Why presenting a governance architecture is a distinct skill from designing one — and why good architects often present it badly
- How to shape the same architecture differently for executives, technical peers, and operational teams without changing the substance
- A simple four-part structure — problem, impact, recommendation, ask — that replaces the instinct to lead with a diagram
- How everything in this course, from Chapter 1's principles to Chapter 6's case studies, comes together the moment you have to explain it to someone else

## Designing it and presenting it are different skills

Everything through Lesson 29 was about building a sound governance architecture. This closing lesson is about the moment that architecture actually has to earn support from people who didn't spend twenty-nine lessons getting there with you. A technically excellent design that nobody understands or funds accomplishes nothing — and the most common reason a good design fails isn't the design. It's a presentation that leads with the architecture instead of the problem it solves.

## Know your audience — three groups, one architecture

The underlying architecture never changes. What changes is which parts you lead with:

- **Executives** want outcome, risk, and cost in the first thirty seconds: what breaks if nothing changes, what this costs to fix, and what decision you need from them today. They do not want the reference architecture diagram first — if they want it at all, it comes after they understand why it matters.
- **Technical peers and architects** want the actual design decisions and the reasoning behind them — the ADRs (Lesson 25), the operating model choice and why alternatives were rejected (Chapter 2), the platform trade-offs (Chapter 4). This is the one audience that genuinely wants the diagram early.
- **Operational teams and stewards** want to know what changes for them specifically — new responsibilities, new tools, what stays the same. Abstract architecture principles land poorly here; concrete "here's what's different in your day-to-day" lands well.

## A structure that works: problem, impact, recommendation, ask

Whatever the audience, this order rarely fails, because it mirrors how the case studies in Lessons 27 and 28 were actually told:

1. **Problem** — stated concretely, the way Castellan's "a month of manual reconciliation" or Northbridge's failed exam finding were stated. Not "governance is weak" — a specific, real symptom.
2. **Impact** — what it's actually costing, in terms the audience already cares about, not in governance-program terms.
3. **Recommendation** — the architecture decision, stated plainly, with the ADR available for anyone who wants the full reasoning.
4. **Ask** — the specific thing you need from this audience right now: budget, a sponsor's name on the roadmap, sign-off on an operating model, time from their team.

## Common mistakes

- **Leading with the diagram.** A reference architecture diagram is the reward for understanding the problem, not the opening move.
- **One presentation for every audience.** The content is the same architecture; the ordering and depth should not be.
- **No ask.** A presentation that ends with "and that's our governance architecture" instead of a specific decision needed from the room wastes everyone's attendance.
- **Jargon without translation.** Terms like "federated operating model" or "active metadata" mean nothing to an audience who hasn't taken Chapters 2 and 3 — translate once, in plain language, before using the term again.

## What this course built, end to end

Chapter 1 gave you the vocabulary and the capabilities map. Chapter 2 gave you the operating models and how to choose between them. Chapter 3 gave you metadata and catalog architecture. Chapter 4 gave you security and platform architecture. Chapter 5 gave you the strategy, roadmap, documentation, ADRs, and review board that turn architecture into an operating program. Chapter 6 proved all of it works together on two realistic, different scenarios, then had you build your own. This lesson is the last piece: making sure the work actually lands with the people who need to fund it, build it, and live inside it.

## Key terms

| Term | Meaning |
|---|---|
| Audience-shaped presentation | The same architecture, re-ordered and re-depth'd for executives, architects, or operational teams |
| Problem-impact-recommendation-ask | A four-part structure for presenting architecture decisions that leads with why, not with the diagram |
| Translation | Restating a governance term in plain language before relying on it, for an audience that doesn't already know it |

## Lab

Take the design package you built in Lesson 29's practice lab and write three short openings for it — one sentence each — as if you were starting a presentation to an executive, to a technical peer architect, and to an operational steward. Notice how differently each one has to start even though the underlying architecture hasn't changed at all.

## Check yourself

Can you explain, without notes, the four-part problem-impact-recommendation-ask structure, and describe in one sentence each how you'd open the same presentation differently for an executive versus an operational steward?
