# Lesson 9 — Communicating Architecture

**Chapter 2 · From Requirements to Blueprint · Lesson 9 of 19**

## What you'll learn

- Why a correct design that isn't communicated clearly fails just as often as an incorrect one
- The difference between a diagram's job and a narrative's job, and why a design needs both
- A simple structure for presenting a design decision that survives tough questions
- How to defend a design under challenge without becoming defensive

## A design nobody understands is a design nobody can approve, build, or trust

An architect can produce a technically excellent design and still watch it fail, not because the design was wrong, but because nobody in the room understood it well enough to approve it, fund it, or build it correctly. Communication isn't a soft add-on to the real work of architecture — it's the mechanism by which a design actually becomes real. A design that lives only in one architect's head, or in a diagram too dense for anyone else to parse, has no more practical value than no design at all, because nobody else can act on it correctly.

## Diagrams and narrative do different jobs

A diagram shows structure: what the pieces are and how they connect — which systems talk to which, how data flows, where a boundary sits. A narrative explains reasoning: why this structure, instead of some other one, and what trade-off that choice makes. Neither one substitutes for the other. A diagram without narrative leaves the audience able to see the shape of a solution but not why it's shaped that way, which means they can't meaningfully evaluate it — they can only either trust it blindly or push back blindly. A narrative without a diagram forces the audience to build the structure in their head from a description, which gets harder and more error-prone as a solution gets more complex. A design worth presenting needs both: a clear picture of the structure, and a clear account of the reasoning behind it.

## A structure for presenting a decision

A dependable way to present any individual design decision, whether in a one-paragraph email or a formal review, follows a consistent shape: state the decision itself first, in one sentence, before any justification — the audience should know what you're proposing before they have to follow why. Then state the one or two factors that actually drove the decision, not every factor that was considered. Then name the real alternative that was seriously considered and explain, specifically, why it lost. Finish by naming the decision's main known weakness or risk, the way Lesson 5's "find your own failure mode first" habit plays out in a presentation. A decision presented this way gives the audience everything they need to either agree, or push back on something specific, rather than pushing back vaguely because they couldn't tell what was actually being decided.

## Defending a design without becoming defensive

Every real design review eventually includes a challenge: a reviewer who thinks a different approach would have been better, or who's found a weakness the architect didn't mention. The instinct to protect a design that took real effort to build is natural, but it's the wrong instinct to act on. The right response treats a challenge as useful information rather than an attack: restate the challenge back in your own words to confirm you understood it correctly, then either explain why the design already accounts for it (pointing to the specific reasoning, not just asserting it's fine), or acknowledge genuinely that it's a gap and say what you'd do about it. "That's a fair point — I hadn't weighted that scenario heavily enough, let me think through what changes" is a stronger answer, and a more credible one, than defending a design past the point where the defense actually holds up. This is exactly the posture a CTA review board panel is testing for: not whether a candidate's first design was perfect, but whether they can take a real challenge, actually process it, and respond with genuine reasoning instead of either collapsing or stonewalling.

## Key terms

| Term | Meaning |
|---|---|
| Diagram | A visual showing a design's structure: the pieces and how they connect |
| Narrative | The explanation of why a design is shaped the way it is, and what trade-off that shape makes |
| Decision statement structure | Decision first, then key drivers, then the alternative considered and why it lost, then the main known risk |
| Defending under challenge | Treating a reviewer's challenge as information to process, not an attack to repel |

## Lab

Pick a design decision from an earlier lesson in this course (for example, Lesson 5's choice of a scheduled batch job over a real-time trigger). Write it up using the four-part decision structure from this lesson: the decision in one sentence, the one or two real drivers behind it, the alternative that was considered and why it lost, and the decision's main known weakness.

## Check yourself

Can you explain why a diagram and a narrative serve different purposes, and why a design presentation generally needs both? Can you walk through the four-part structure for presenting a design decision, using an example of your own? Can you describe the right way to respond when a reviewer challenges a part of your design you hadn't fully considered?
