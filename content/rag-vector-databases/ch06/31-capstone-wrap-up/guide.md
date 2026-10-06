# Lesson 31 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 6 · Capstone · Lesson 31 of 31**

## What you'll learn

- How to present this capstone to an employer, not just finish it for yourself
- The one sentence that ties the whole course together
- A recap of the six chapters and what each contributed to the finished assistant
- What's next in the AI Engineer path

## Presenting the capstone: show the numbers, not just the answer

Most people showing off a RAG project demo the happy path: user asks, assistant retrieves, assistant answers correctly. That's table stakes. What makes this capstone worth presenting is everything this course added on top: show the *abstention* path firing on a genuinely out-of-scope question, show a *citation* that actually traces back to a real source, show the *evaluation scores* from Lesson 30 — before and after a measured tuning change. An interviewer who builds RAG systems for a living has seen plenty of happy-path demos. They've seen far fewer candidates who can show a context-recall number that actually moved after a specific, explainable change — and that's exactly the skill this course spent six chapters building.

## The sentence that ties it together

If you need one sentence for a resume, a portfolio page, or an interview answer: *"I built a retrieval-augmented assistant with a tuned chunking and re-ranking pipeline, grounded and cited prompt assembly, an honest abstention path for low-confidence retrieval, and a Ragas-based evaluation I used to diagnose and fix a specific weakness — not just a demo that happened to work."* Every clause in that sentence maps to a lesson you can speak to in detail if asked a follow-up.

## Six chapters, one assistant

```
Ch 1  Why RAG Exists             -> the architecture this assistant follows
Ch 2  Embeddings Deep Dive       -> the embedding model this build uses
Ch 3  Vector Databases           -> where chunks are stored and searched
Ch 4  Building a RAG Pipeline    -> ingestion through citations and failure handling
Ch 5  Advanced RAG Patterns      -> the evaluation metrics behind the tuning pass
Ch 6  Capstone                   -> all of it, built, measured, and presented together
```

Nothing in this course was theoretical by the end — every chapter's concept became a specific, working piece of the same single-knowledge-base assistant, which is exactly why the capstone stayed scoped to one source rather than growing to impress.

## What's next

This course is part of the AI Engineer path's Job-Ready stage. The next course, **AI Agents**, picks up exactly where this one leaves off: what you built here was a pipeline that always runs the same shape — retrieve, then generate. AI Agents covers what happens when a model gets to decide for itself when to call a tool (including the `search_knowledge_base` tool from Lesson 25's agentic RAG pattern), hold for human approval on a consequential action, and operate inside real safety and monitoring guardrails.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio sentence | A single, specific claim about the project that maps directly to what you can explain in an interview |
| Measured claim | A statement about the project backed by an actual before/after number, not an assertion |

## Check yourself

Practice saying the "sentence that ties it together" out loud, then pick any one clause in it and explain, without notes, which lesson it came from and why that stage mattered.
