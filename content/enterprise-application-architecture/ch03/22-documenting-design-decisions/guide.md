# Lesson 22 — Documenting Design Decisions

**Chapter 3 · Application Architecture Practice · Lesson 22 of 25**

## What you'll learn

- Why documenting the "why" behind a decision matters more than documenting the "what"
- A lightweight, practical format for recording an architecture decision (an ADR-style record)
- What belongs in a decision record and what's better left to other documentation
- How this habit protects a design from being accidentally undone by someone who wasn't there

## The "what" is usually obvious later; the "why" isn't

Months after a design ships, the data model, the automation, and the UI are all still inspectable — anyone can open the org and see *what* was built. What's much harder to reconstruct after the fact is *why* a particular choice was made over its plausible alternatives: why Equipment became a custom object instead of mapping to Asset, why the automation stayed entirely declarative, why the manager dashboard was descoped. Without a record of the reasoning, a future admin or developer — possibly including the original architect, eighteen months later — has no way to tell the difference between "this was a deliberate trade-off, don't casually reverse it" and "this was just how it happened to get built, nobody will mind if it changes."

## A lightweight decision-record format

A practical, lightweight format for recording a significant design decision — borrowed from the general software-engineering practice of Architecture Decision Records (ADRs), adapted for a Salesforce context — covers four short parts: **Context** (what requirement or situation prompted this decision, with a pointer back to the sourced requirement from Lesson 2), **Decision** (what was actually decided, stated plainly), **Alternatives considered** (what else was on the table, and in one sentence each, why it wasn't chosen), and **Consequences** (what this decision commits the team to, including any technical debt or constraint it creates, per Lesson 11). This doesn't need to be a long document — a decision record that takes fifteen minutes to write and saves two hours of future reconstruction, repeated across a project's lifetime, is a clearly worthwhile trade.

## What belongs in a decision record, and what doesn't

A decision record is for choices that genuinely had a real alternative worth recording — "we chose a custom object over Asset because Asset's standard fields didn't cover our rental-specific tracking needs" is worth recording, because someone later might reasonably ask "why isn't this just Asset?" and deserves a real answer. A decision with no real alternative worth documenting — "we created a field called `Status__c` to hold the status" — doesn't need its own record; routine configuration choices belong in ordinary technical documentation (field descriptions, help text), not in a decision log reserved for choices that actually required judgment. Treating every small configuration choice as decision-record-worthy dilutes the log until nobody reads it anymore, which defeats the purpose just as thoroughly as not keeping one at all.

## Protecting a design from being accidentally undone

A documented decision is a design's best defense against being quietly reversed by someone who didn't know it was deliberate. Without a record, a future developer who notices "this logic is weirdly all declarative, I could clean this up with an Apex rewrite" has no way to know that the all-declarative choice was a deliberate, documented trade-off made under a specific set of constraints (Lesson 17's reasoning, applied at the time) — and might "improve" the design in a way that actually undoes a decision that was correct for its original reasons and might still be correct now. A decision record doesn't prevent a design from ever changing — new requirements can absolutely justify revisiting an old decision — but it makes that revisiting a deliberate, informed choice rather than an accidental regression.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Decision Record (ADR) | A lightweight, structured record of a significant design decision: context, decision, alternatives considered, consequences |
| Decision-worthy choice | A choice with a real, plausible alternative that someone might later reasonably question |

## Lab

Write an ADR-style decision record, using this lesson's four-part format, for the Harborline case study's decision (Lesson 21) to keep the Maintenance Request automation entirely declarative rather than introducing any Apex. Be specific in the "Alternatives considered" section about what the Apex alternative would have looked like and why it wasn't chosen, and specific in "Consequences" about what this commits the team to if requirements later grow in complexity.

## Check yourself

Can you explain why documenting the "why" behind a decision matters more than documenting the "what," with an original example of a decision that would be genuinely confusing to encounter later without its reasoning? Can you name the four parts of this lesson's lightweight decision-record format and explain, in your own words, what kind of decision is and isn't worth recording this way?
