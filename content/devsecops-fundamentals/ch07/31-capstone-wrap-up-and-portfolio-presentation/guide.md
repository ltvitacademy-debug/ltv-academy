# Capstone: Wrap-Up & Portfolio Presentation

You've got a secured order-service pipeline: six controls, in the right order, gated by one precise rule, deployed by a scoped identity. This final lesson does two things: runs a retrospective on the build the way Lesson 28 taught you to run one after a real incident, and turns the finished project into something you can actually show in an interview.

## What you'll learn

- How to run a short retrospective on your own capstone build, using the Lesson 28 format
- The gap between "it works" and "it's explainable" — and why interviews test the second one
- A structure for presenting this project in a portfolio or technical interview
- How to talk about trade-offs you made, instead of pretending the design was flawless

## Retrospective on your own build

Lesson 28's Post-Incident Activity phase asked three questions after a real incident: what happened, what worked, what would you change. Run the same three questions on your capstone, as a builder instead of a responder:

- **What happened** — which six controls did you implement, and in what order? Where did you simplify versus a real production pipeline (this course used generic pipeline pseudocode, not one vendor's exact syntax — a real build would pick one CI/CD tool and implement the stages precisely)?
- **What worked** — which control, if any, would have caught a real problem had one existed? (Review your sample findings from Lesson 29's acceptance checklist.)
- **What would you change** — if you extended this to a second service, what would you reuse directly, and what was specific to order-service and would need rethinking?

Write this down. It's not busywork — it's the raw material for the next section.

## "It works" isn't the same as "it's explainable"

A pipeline definition that runs is a prerequisite, not the finish line. An interviewer (or a hiring manager skimming a portfolio) isn't primarily checking whether your YAML is syntactically valid — they're checking whether you can explain *why* the secrets scan runs before the build stage, *why* the policy gate threshold is CVSS 9.0 and not some other number, and *why* the deploy identity lists exactly three permissions instead of five. Every one of those "why" answers already exists in Lessons 29 and 30 — the work now is being able to say them out loud, concisely, without re-reading the guide.

## A structure for presenting it

When you walk someone through this project — in an interview, a portfolio write-up, or a demo — use this shape:

1. **The problem** — order-service shipped with zero automated security checks and a broad, stale deploy identity.
2. **The design** — six controls, ordered cheapest-and-earliest first, gated by one precise rule.
3. **One concrete trade-off** — for example, choosing to exclude a known-unfixable low-severity finding from the gate rather than blocking shipping indefinitely, and how you'd revisit that decision later.
4. **What you'd do with more time** — runtime security, a full SIEM, broader coverage beyond one service — named explicitly as deliberately out of scope, not as something you forgot.

## Talking about trade-offs honestly

The strongest answer to "what would you do differently" isn't "nothing, it was perfect." It's naming a real trade-off you made under the course's scoping constraints — like the CVSS 9.0 threshold being a starting point that a real team would tune against its own incident history — and showing you understand *why* it's a trade-off, not just that one exists. That's the difference between having followed a checklist and actually understanding the system you built.

## Key terms

- **Retrospective** — the structured review of what happened, what worked, and what you'd change, applied here to your own capstone build rather than a live incident
- **Explainability** — the ability to justify a design decision out loud, not just produce a working artifact
- **Trade-off** — a deliberate choice made under real constraints (time, scope, risk tolerance) that a strong presentation names and defends, rather than hides

## Recap

This closes DevSecOps Fundamentals. You moved from the shift-left mindset in Chapter 1 through identity, secrets, scanning, container and pipeline hardening, and compliance and response — and the capstone proved you can assemble all of it into one real, defensible pipeline for Northbridge Retail's order-service. That's the project to bring to your next interview.
