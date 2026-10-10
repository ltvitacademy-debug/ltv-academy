# Lesson 12 — Presenting Application Designs

**Chapter 2 · Working the Cases · Lesson 12 of 16**

## What you'll learn

- Why a design presentation needs a different structure depending on who's in the room
- A reusable five-part structure for presenting an application architecture decision
- Why leading with the solution, before the problem is stated, loses most audiences
- How a decision log differs from a presentation deck, and why a design needs both

## The audience changes the presentation, not the underlying design

The design itself — Harrow's record types and sharing rules, Ferro's consolidation plan — doesn't change depending on who's hearing about it, but how it gets presented should. A technical review board wants to interrogate the sharing-rule logic and the edge cases; a business sponsor like Harrow's VP of Sales wants to know whether reps will actually find the new process easier, what it costs, and when it ships. Presenting the same slide deck, at the same level of technical detail, to both audiences either bores the sponsor with sharing-rule mechanics they didn't ask for, or frustrates the technical reviewers by skating past exactly the details they need to sign off responsibly. The content of the decision stays fixed; the altitude of the explanation moves.

## A five-part structure that works for either audience

Regardless of altitude, five parts belong in every design presentation, in this order:

1. **The problem, stated as the stakeholder experiences it** — not the solution, not yet. "Three sales segments are stuck sharing one Opportunity process that fits none of them well" before any mention of record types.
2. **The requirement**, extracted using Lesson 9's method, stated specifically enough to check a design against.
3. **The alternatives considered**, using Lesson 10's tradeoff dimensions — even a business audience benefits from seeing that more than one option existed and why one won.
4. **The recommended design**, at a level of detail matched to the audience — mechanics and edge cases for a technical board, outcomes and cost for a business sponsor.
5. **The open risks and assumptions**, from Lesson 11 — presented as things the team is actively managing, not quietly hidden hoping no one asks.

Skipping step 1 and opening directly on step 4 — leading with the solution — is the most common failure in a design presentation, because it forces the audience to reverse-engineer what problem the solution is even solving, which is a worse use of the room's time than just stating the problem first.

## Why leading with the solution loses the room

A presentation that opens with "we're implementing Omni-Channel routing with these three skill categories" before anyone has heard that Corvell's handle time has been rising because of mismatched case assignment puts the audience in a defensive, confused posture from the first slide — they're trying to figure out why this matters before they can evaluate whether it's a good idea. Opening with the problem, stated in terms the audience already recognizes and cares about, means every subsequent slide is answering a question the audience is already asking, instead of a question they have to be convinced to ask in the first place.

## A decision log is not the same artifact as a presentation deck

A presentation deck is built to be delivered once, to a specific audience, at a specific altitude — it's an argument, optimized for persuading the room in front of it. A **decision log** is a different artifact entirely: a running, dated record of what was decided, why, what alternatives were rejected and why, and what assumptions the decision depended on — built to be read later, by someone who wasn't in the room, possibly months after the fact, trying to understand why the system works the way it does. Harrow's eventual fourth sales segment (the Lesson 1 Lab) is exactly the kind of moment a decision log earns its cost: whoever designs that segment's record type needs to know why the original three were structured the way they were, and a presentation deck built to persuade a specific room on a specific day usually doesn't answer that nearly as well as a maintained decision log does.

## Key terms

| Term | Meaning |
|---|---|
| Presentation altitude | The level of technical detail matched to a specific audience's needs and concerns |
| Five-part structure | Problem, requirement, alternatives, recommended design, open risks/assumptions — in that order |
| Leading with the solution | Opening a presentation with the recommended design before the problem has been stated; a common failure mode |
| Decision log | A running, dated record of decisions, rejected alternatives, and assumptions, built for later readers rather than a specific audience in a specific room |

## Lab

Take Veltrix's subscription-billing case from Lesson 6. Write two short presentation outlines for the same underlying recommendation (adopt Revenue Cloud's integrated billing): one for Veltrix's finance leadership (business altitude) and one for the implementation team's technical architecture review (technical altitude). For each outline, list what you'd include at step 4 (the recommended design) and explain one specific thing you'd leave out of the business version that belongs in the technical version, and vice versa.

## Check yourself

Can you name the five-part presentation structure in order, and explain why the problem has to come before the recommended design? Can you explain, in your own words, why a decision log and a presentation deck serve different purposes even when they describe the same underlying decision?
