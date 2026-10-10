# Lesson 8 — Full Mock Review Board

**Chapter 1 · Technical Architect Case Studies · Lesson 8 of 21**

## What you'll learn

- The real structure and timing of a CTA-style review board presentation, from opening to closing
- How to turn a written case-study design (like Lesson 1's Meridian Outfitters) into a live, whiteboard-driven presentation
- What a panel is actually listening for in the first five minutes, and why that shapes how you open
- How to practice the full format solo, using one of this chapter's case studies as your material

## Why this lesson is different

Lessons 1 through 7 each built one case study's design on paper. This lesson doesn't add a new scenario — it teaches the *format* a real review board uses, and asks you to run one of the previous seven case studies through it end to end. Everything from here forward in the course assumes you understand this format, so treat this lesson as the hinge the rest of the course turns on.

## The shape of a review-board session

A review-board-style architecture presentation generally follows a consistent shape, whether it's a formal certification board or a client-facing solution review: a short opening that frames the problem in the panel's own terms, a structured walkthrough of the design across each relevant architecture domain, and an open question period where the panel probes specific decisions. The single biggest timing mistake candidates make is spending too long on the opening and not leaving enough time for the panel's questions — the questions are where a design actually gets tested, not the prepared walkthrough, so pacing has to protect that time deliberately rather than letting the walkthrough run long and crowd it out.

## Opening: frame the problem before you show the solution

The first few minutes should restate the business problem in a way that shows you understood it, not just memorized it — naming the hard facts, the explicit requirements, and the one or two constraints that most shaped your design (the way Lesson 1 named the nine-month deadline and the data-quality risk as the forces that ruled out literal org consolidation). A panel listening to this opening is checking whether you understood what you were actually asked to solve before you show them how you solved it; an opening that jumps straight to a diagram without first restating the problem in your own words reads as having skipped that step, even if the design itself is sound.

## The walkthrough: domain by domain, but one connected story

The middle of the presentation walks through the design's architecture domains — data model, security and sharing, integration, identity, and anything else the scenario touches — but the strongest walkthroughs present these as one connected decision, not five unrelated slides. Using Meridian Outfitters as the material: the unified customer-profile layer (data architecture) exists *because of* the event-driven inventory sync (integration architecture) and the decision not to merge the three orgs (system architecture) — each domain's choice follows from and reinforces the others. A walkthrough that covers data architecture, then integration, then security as three disconnected topics loses the thread that a panel is specifically listening for: that this is one coherent design, not three independent decisions bolted together.

## Fielding questions: answer the question asked, then the reasoning behind it

When the panel opens the floor, the strongest answers do two things in order: directly answer the specific question asked, then briefly justify the reasoning, the way Lesson 1's closing example answered "why didn't you just merge the orgs" by naming the specific risk factors rather than deflecting or re-explaining the whole design from scratch. A common failure mode is treating every question as an invitation to re-present the whole solution; the better instinct is to answer precisely what was asked, then stop, leaving room for a follow-up if the panel wants to go deeper.

## Running your own mock session

Pick one case study from this chapter — Lesson 1 through 7 — and run the full format solo or with a study partner: a timed opening (aim for brevity), a domain-by-domain walkthrough that tells one connected story, and then have your study partner (or yourself, after a short break, reading back through the scenario cold) ask three or four challenging questions drawn straight from the scenario's edge cases.

## Key terms

| Term | Meaning |
|---|---|
| Opening/framing | Restating the business problem and its key constraints before presenting the solution |
| Domain walkthrough | Presenting the design across each relevant architecture domain as one connected story |
| Q&A / objection period | The portion of a review where the panel probes specific decisions directly |
| Pacing | Deliberately protecting time for questions rather than letting the prepared walkthrough run long |

## Lab

Choose one case study from Lessons 1–7. Write a timed outline for a mock review-board presentation of that case study: an opening (2–3 sentences, read it aloud and time it), a domain-by-domain walkthrough outline (bullet points only, in presentation order), and a list of four questions you predict the panel would ask based on that scenario's specific edge cases.

## Check yourself

Can you explain why a panel listens for problem-understanding in the opening before judging the solution itself? Can you describe, using your chosen case study, how two of its architecture domains connect into one decision rather than standing as separate, unrelated choices?
