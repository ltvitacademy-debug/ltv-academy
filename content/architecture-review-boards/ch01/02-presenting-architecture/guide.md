# Lesson 2 — Presenting Architecture

**Chapter 1 · The Review Board · Lesson 2 of 14**

## What you'll learn

- Why presenting architecture is a distinct skill from designing it
- The audience-first mindset: who is actually in the room and what they each care about
- How to lead with the business problem before the technical solution
- Why diagrams, not prose, should carry the weight of an architecture presentation
- Common ways technically sound presentations still fail to land with a board

## Designing and presenting are two different skills

An architect can produce a technically excellent design and still fail an architecture review — not because the design was wrong, but because the presentation of it didn't let the board actually evaluate it. Review boards don't grade the artifact you built in isolation; they grade what they were able to understand and probe in the time they had with you. A design that lives entirely in your head, or in forty slides of dense bullet text, gives a board nothing to grab onto. Presenting architecture well is a learnable, separate skill from designing it, and it's the one most candidates and architects under-practice relative to the design work itself.

## Know who's actually in the room

A review board is rarely homogeneous. A panel might include a security-focused architect who will immediately probe your data protection model, an integration specialist who will stress-test every system boundary you drew, and a generalist evaluating whether the whole thing actually serves the stated business goal. Before you present, identify (or infer, if you don't know in advance) the likely concerns of each kind of reviewer in the room, and make sure your presentation gives each of them something to engage with — not by trying to cram in a dedicated slide for every possible specialty, but by making sure your core narrative doesn't quietly skip the concern a specialist in that room would go looking for first.

## Lead with the problem, not the solution

A common failure mode is starting a presentation with the architecture diagram before the board has any shared understanding of what problem it's solving. Reviewers who don't yet know the requirements will spend the first several minutes trying to reverse-engineer the business context from your technical choices — exactly the minutes you need them spending on evaluating your design instead. The fix is simple and almost always underused: open with the business scenario and its real constraints (data volumes, existing systems, budget, timeline, non-negotiable requirements) in plain language, *before* showing a single box-and-line diagram. Every design decision you present after that point now has a clear justification already sitting in the board's mind, instead of landing as an unexplained technical assertion they have to take on faith.

## Diagrams carry the weight, not prose

A review board's job is to evaluate a system, and systems are inherently relational — components connected to other components, data flowing in specific directions, boundaries drawn in specific places. That structure is much harder to absorb from a paragraph of prose or a bulleted list than from a clear diagram, because prose forces the reader to mentally reconstruct the relationships a diagram just shows directly. Good diagrams in an architecture presentation are legible at a glance (clear boxes, labeled connections, a consistent visual language for "this is a system," "this is data," "this is a security boundary"), scoped to one coherent idea each rather than one mega-diagram trying to show everything at once, and narrated out loud as you present them rather than left to speak entirely for themselves. The diagram is the argument; your narration is the proof.

## Why sound designs still fail to land

A few recurring, avoidable failures: burying the actual recommendation under a wall of options with no stated preference, so the board has to ask what you'd actually do; presenting every component at the same level of detail, so the board can't tell which three decisions are load-bearing and which are incidental; and reading a script verbatim instead of actually explaining — a board can tell the difference between someone who memorized slides and someone who understands the design well enough to talk about it naturally, and the second impression is the one that survives sharp questioning later.

## Key terms

| Term | Meaning |
|---|---|
| Audience-first presenting | Structuring a presentation around what each kind of reviewer actually needs to evaluate, not just what the presenter wants to show |
| Problem-first structure | Opening with the business scenario and constraints before any technical design content |
| Diagram-led narrative | Letting diagrams carry the architectural argument, with spoken narration as supporting proof rather than the diagram being decorative |
| Load-bearing decision | A design choice significant enough that the whole architecture would change if it were made differently |

## Lab

Take a design you already know well (a past project, a personal project, or the retailer scenario from Lesson 1's lab). Draft a 90-second opening for presenting it to a review board — written out as what you would actually say — that covers the business problem and its real constraints, with zero technical architecture content yet. Then identify the one diagram you would show first after that opening, and write one sentence describing exactly what it needs to make legible at a glance.

## Check yourself

Can you explain why a technically correct design can still fail a review if it's presented poorly? Can you name three specific things you'd do differently opening a presentation to a mixed-specialty panel versus a single generalist reviewer? Can you describe, in concrete terms, what makes a diagram "narrated" rather than just displayed?
