# Lesson 22 — Capstone Kickoff: Building a Prompt Library

**Chapter 5 · Capstone · Lesson 22 of 24**

## What you'll build

Everything from this course, applied to a project of your own — not
another walkthrough of a pre-built example. This capstone has one
goal: prove you can take a real use case and build a tested,
versioned, genuinely evaluated prompt library around it, the way
Chapters 1 through 4 covered, without a lesson walking you through
each step.

Pick a use case you'd actually want this for: a support-triage
assistant, a SQL-generation helper, a code-review assistant, a
data-extraction pipeline — anything concrete enough that "did this
work" has a real answer. The specific use case matters less than
building every layer this course covered around it.

## The full deliverable list

This lesson is the brief; Lesson 23 is where you build it, and Lesson
24 is where you present it. The whole capstone, end to end:

1. **Pick a real use case** and **write a real system prompt** for it
   (Ch. 1) — role, rules, and format, not a one-line instruction.
2. **Build at least two task-specific prompt templates** (Ch. 1) —
   reusable and parameterized, the way Lesson 4 covered, not strings
   you'd have to hand-edit for every new input.
3. **Apply at least one advanced technique** (Ch. 2) — chain-of-thought
   reasoning or constrained/structured output, whichever your use case
   actually benefits from.
4. **Define a real token budget** (Ch. 3, Lesson 13) — an output
   reserve, fixed costs (system prompt, any tool schemas), and capped
   variable costs (history, retrieval), the worksheet shape from that
   lesson.
5. **Write real tool descriptions** (Lesson 16) if your use case calls
   a tool — what it does, when to use it, its constraints — or skip
   this deliverable if your use case genuinely has no tool calls.
6. **Order your context assembly** (Lesson 15) so the highest-priority
   material sits in the strong positions, not buried in the middle.
7. **Build an eval set of at least 10 real cases** (Lesson 18),
   covering common, edge, known-failure, and adversarial categories.
8. **Run automated testing** (Lesson 19) and produce a real pass-rate
   report with specific failed case IDs — not a description of what
   testing would look like.
9. **Run one real A/B comparison** (Lesson 20) — one prompt variable
   changed, tested on the same eval set, with a documented winner and
   a specific reason.
10. **Set a regression baseline** (Lesson 21) and demonstrate, with a
    real example, that it actually catches a pass-to-fail flip between
    two versions.

## What "done" looks like

A real prompt library — system prompt, templates, a documented context
budget, an eval set, test results, an A/B comparison, and a regression
baseline — that a stranger could open and understand: what the prompt
is for, what was tested, what changed between versions, and why the
current version is the one that shipped. Not "I thought about
testing," but "here are the actual results."

## A realistic order of operations

1. Get the use case and prompts working first — there's nothing to
   budget, order, or test yet if the prompts themselves aren't doing
   their job.
2. Add the context budget and ordering once the prompts work — this
   is where Chapter 3's discipline applies to what you just built.
3. Build the eval set and run automated testing once there's a stable
   prompt + context combination worth measuring.
4. Only then run the A/B comparison and set the regression baseline —
   both need a working, already-tested version to compare against.

## Key terms

| Term | Meaning |
|---|---|
| Capstone | A project applying this course's full pipeline to a use case you choose, not a guided walkthrough |
| Prompt library | The versioned collection of prompts, templates, eval results, and test history this capstone produces |
| Done | Real results exist for every deliverable above — not a description of what each step would involve |

## Lab

1. Write down your chosen use case in one sentence, specific enough
   that a stranger would know exactly what it's for.
2. Draft your system prompt and at least one task template before
   Lesson 23 — having real material to work with is what makes the
   rest of the capstone concrete instead of hypothetical.

## Check yourself

You're ready for Lesson 23 when you have a real use case chosen, a
draft system prompt written, and a clear sense of which Chapter 2
technique your use case actually calls for.
