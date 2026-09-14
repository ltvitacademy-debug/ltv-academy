# Lesson 79 — Building Your Data Engineering Portfolio

**Chapter 4 · Added Projects — Capstones · Lesson 79 of 81**

## What you'll learn

- What a hiring manager actually looks for when they open a portfolio
  project — and what they skip
- Why README/documentation quality is doing more work than the code
- What an architecture diagram needs to show, and what it should leave out
- Turning three capstone projects and three written retrospectives into
  one coherent portfolio

## What a hiring manager actually looks for

A hiring manager reviewing a portfolio spends minutes, not hours, on any
one project — often just skimming the README and one diagram before
deciding whether to look closer. That changes what's worth polishing:

```
What gets read first:      README summary, architecture diagram
What gets skimmed:         a couple of the more interesting code files
What almost never gets     the full commit history, every file in
read closely:               the repo, exhaustive inline comments
```

This isn't a reason to write sloppy code — it's a reason to make sure
the 30 seconds a reviewer actually spends land on the decisions that
matter, not force them to dig for it.

## The README is doing more work than the code

The README for each capstone project should answer four questions, in
this order, before anything else:

| Question | Why it comes first |
|---|---|
| What does this system do? | One or two sentences — the scenario from the project's kickoff lesson |
| What does it look like? | The architecture diagram, immediately visible, not linked |
| What were the hard decisions? | Pulled straight from the retrospective — "chose a phased cutover because..." |
| How do I run it? | Setup steps — proof the project actually works, not just described |

Project 2's and Project 3's retrospectives (Lessons 74 and 78) are the
direct source for the "hard decisions" section — the honest, specific
answers to "what would you change" are exactly the kind of thing a
resume bullet can't convey but a README paragraph can.

## What an architecture diagram needs — and doesn't

A good architecture diagram for Project 3's fraud detector shows the
Eventstream, the windowed feature computation, the scoring step, and the
alert — five or six boxes and arrows, matching Lesson 75–77's own
`Eventstream -> windowed aggregation -> feature record -> scoring`
sketch. It does not need every Fabric capacity setting or every column in
every table. The test for whether a diagram is doing its job: could
someone who never took this course understand the system's shape from
the diagram alone, in under a minute?

## Assembling the portfolio

Three capstone projects, each with a working system, a README following
the pattern above, and a retrospective mined for its honest specifics —
that's a portfolio, not a list of finished coursework. The retail
platform (Project 1), the warehouse migration (Project 2), and the fraud
detector (Project 3) between them cover batch, migration, and streaming
work — a deliberately wide range for a reviewer to sample from, rather
than three variations on the same idea.

## Key terms

| Term | Meaning |
|---|---|
| README-first portfolio | Structuring each project so the README carries the weight a reviewer actually reads |
| Diagram sufficiency test | Whether someone outside the course could understand the system's shape in under a minute |

## Check yourself

You're ready for Lesson 80 when you can explain, without looking: why
does this lesson pull the README's "hard decisions" section directly
from each project's retrospective, rather than writing it fresh?
