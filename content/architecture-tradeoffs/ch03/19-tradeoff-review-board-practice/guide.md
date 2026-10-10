# Lesson 19 — Tradeoff Review Board Practice

**Chapter 3 · Applying Tradeoffs · Lesson 19 of 20**

## What you'll learn

- What a real Salesforce architecture review board actually tests, modeled on the Certified Technical Architect (CTA) review board
- Why defending a design under challenge is a distinct skill from designing it
- A practice format you can run solo or with a study partner
- The specific habits that separate a design that survives challenge from one that collapses under it

## What a review board is actually testing

Salesforce's own Certified Technical Architect credential culminates in a review board: a candidate is given a scenario, designs a solution against it under real time pressure, presents that solution to a panel of experienced CTAs acting as judges, and then has to defend it through a Q&A period where the judges challenge the design, probe its weak points, and see whether the candidate can justify, defend, or appropriately revise their reasoning in real time. The judges are trained specifically not to signal approval or disapproval during the challenge — the test isn't whether the design is liked, it's whether the candidate actually understands the tradeoffs behind their own decisions well enough to defend them under pressure, or revise them credibly when a judge surfaces a real gap.

This matters for this course's purpose even if you never sit a formal CTA board: the underlying skill — defending a tradeoff decision when someone pushes back with a scenario you didn't originally consider — is exactly what happens in a real project's own internal architecture review, a client presentation, or a skeptical VP's questions after your Lesson 15-style executive summary. Designing a good tradeoff analysis and defending it live under challenge are genuinely different skills, and the second one only gets built through practice, not by reading about it.

## Running a practice review board

This works solo (playing both roles in sequence) or with a study partner (one presents, one challenges):

1. **Pick a scenario** — reuse one from Lesson 16 or 17-18's case studies, or write a new one.
2. **Prepare a short presentation** (10-15 minutes if timed) covering the decision using Lesson 15's structure: business impact, the tradeoff named honestly, why it fits this specific scenario, and the revisit trigger.
3. **Run the challenge round.** If solo, write down the three hardest questions you can think of against your own design before you let yourself move on — and answer them in writing, not just in your head, since writing forces the same rigor a live panel would. If with a partner, the partner should specifically probe: "what if the scenario had twice the volume," "why didn't you choose [the other side of the tradeoff]," and "what would make you wrong here."
4. **Score the defense**, not just the original design, against the habits below.

## The habits that separate a defense that survives from one that collapses

- **Point the challenger to the specific scenario fact that drove the decision**, rather than repeating the general tradeoff reasoning. "I chose batch here specifically because the scenario states this is a nightly financial reconciliation with no same-day requirement" survives a challenge better than "batch is usually fine for integrations like this," because the first answer shows the decision was actually grounded in this scenario's stated facts, not a reflex.
- **When a challenge surfaces a real gap, say so and revise, rather than defending a position that's actually wrong.** A candidate who can say "that's a fair point — if the volume doubled, I'd need to revisit this because X" is demonstrating exactly the skill being tested. Defending an indefensible position after a judge has clearly found the hole is a worse outcome than revising it.
- **Don't let a single tough question derail the whole presentation.** One question answered imperfectly doesn't need to become five minutes of backpedaling through the entire design — acknowledge the specific point, address it, and move forward.
- **Anticipate the "why not the other side" question for every tradeoff in the design**, because it's close to guaranteed to be asked. If an ADR was written per Lesson 8, the rationale section's "what we're giving up" should already contain most of this answer.

## Key terms

| Term | Meaning |
|---|---|
| Certified Technical Architect (CTA) review board | Salesforce's capstone architect certification exam: a timed scenario, a presentation, and a judged Q&A defense |
| Challenge round | The practice-exercise phase where a design is actively probed for weaknesses, simulating a review board's Q&A |
| Defensible position | A decision whose rationale can withstand a direct, specific challenge because it was genuinely grounded in the scenario's facts |

## Lab

Using one of your ADRs from an earlier lesson's lab, run a full practice review board solo: write the 10-15 minute presentation outline, then write the three hardest challenge questions you can construct against your own design, and write your answer to each — including at least one answer where you'd genuinely revise the design rather than defend it as originally written.

## Check yourself

Can you explain what a CTA review board is actually testing, beyond whether the design itself is good? Can you describe at least two of the habits this lesson names that separate a defense that survives challenge from one that collapses, and explain why revising a position under a valid challenge is treated as a stronger outcome than defending it regardless?
