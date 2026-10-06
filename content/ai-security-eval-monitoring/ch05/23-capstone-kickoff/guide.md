# Lesson 23 — Capstone Kickoff

**Chapter 5 · Capstone · Lesson 23 of 25**

## What you'll learn

- What the capstone actually asks you to build, and why it's a pipeline, not a single artifact
- The four deliverables that make up a complete submission
- How to scope an AI feature that's small enough to finish and real enough to be worth building
- How this capstone maps back onto every chapter that came before it

## What you're actually building

Across 22 lessons, this course has built up two things in parallel: the discipline to evaluate an AI system before shipping it (Chapters 1-2), and the discipline to watch it, document it, and respond to it once it's live (Chapters 3-4). The capstone asks you to put both halves together into one working pipeline, end to end, for one real AI feature you choose — not a toy exercise disconnected from the rest of the course, but the actual muscle this course has been building, applied once, fully, by you.

## Pick a feature — small, real, and yours

The feature itself can be simple. What matters is that it's a genuine AI-powered feature with real inputs and outputs, not a hypothetical. A few shapes that work well:

- A support-ticket triage or auto-response assistant
- A document or meeting-notes summarizer
- A simple RAG-based Q&A tool over a small set of documents
- A classification or tagging tool (sentiment, category, priority)

Pick something you can actually run calls against — your own small script calling an API is enough. The goal isn't production scale; it's a real, working, end-to-end example you built and understand completely.

## The four deliverables

Lesson 24 walks through building each of these; this lesson is about knowing the shape of what you're aiming for before you start:

```text
1. Eval dataset  — Ch.2: ~15-20 test cases with expected behavior
2. Monitoring setup — Ch.3: logging, at least one dashboard view
3. One incident response plan — Ch.4: for one realistic failure mode
4. A model card — Ch.4: documenting the system you actually built
```

## How this maps back to the whole course

Every deliverable pulls from a specific earlier lesson, on purpose:

| Deliverable | Pulls from |
|---|---|
| Eval dataset | Lesson 7 (building datasets), Lesson 8 (metrics) |
| Monitoring setup | Lesson 13 (logging), Lesson 14 (cost/latency) |
| Incident response plan | Lesson 22, applied to your own feature's most likely failure |
| Model card | Lesson 21's actual section structure |

If a deliverable feels disconnected from anything you did earlier, that's a sign to go back and look — the capstone isn't new material, it's assembly.

## Scoping it to actually finish

The most common way a capstone goes wrong isn't doing the work badly — it's picking a feature too ambitious to finish. A five-question eval set you actually build beats a fifty-question eval set you plan and never complete. Favor a feature where you can realistically run 15-20 real calls and look at every single output yourself.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end pipeline | Eval, monitoring, incident response, and documentation covering one real feature together |
| Scoping | Choosing a feature small enough to actually finish within the capstone |

## Lab

Write down the one AI feature you're going to build the capstone around, in two sentences: what it does, and what its single most likely failure mode is. That failure mode is what Lesson 24's incident response plan will be built around.

## Check yourself

Can you name, without looking back, which earlier lesson each of the four capstone deliverables pulls its approach from?
