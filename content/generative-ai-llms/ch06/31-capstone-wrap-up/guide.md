# Lesson 31 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 6 · Capstone · Lesson 31 of 31**

## What you'll learn

- How to talk about your capstone project in a portfolio, resume, or interview — the
  concepts to name, not just "I built a chatbot"
- A full-course recap: the concept map from Lesson 1 to Lesson 30, in one lesson
- Concrete next steps to keep extending the project after this course ends
- Where this course sits in your learning path, and what comes next

## What you actually built, in interview terms

"I built a chatbot" undersells it. Here's what to actually say, because every phrase below
maps to something you can explain if asked a follow-up question:

- "I built a **stateful, multi-turn conversational application** against a production LLM
  API" — not a stateless single-request script.
- "It uses **server-sent-event streaming** for incremental response rendering" — you can
  explain the real event sequence (Lesson 16), not just that "streaming" was a checkbox.
- "The system behavior is controlled through a **dedicated system parameter**, separate
  from conversation turns" — you understand the role architecture (Lesson 14), not just
  that there's a persona string somewhere.
- "I made a deliberate **model-selection and cost-tradeoff decision**" — you can explain
  *why* you picked the model you picked (Lessons 6, 10, 11), not just that you used
  whichever one the docs defaulted to.

That's a project that demonstrates real understanding of how production LLM applications
are actually built, not a tutorial you copied.

## The whole course, as one map

| Chapter | What it gave the capstone |
|---|---|
| 1 — How LLMs Actually Work | Why `messages` has to carry the full history every turn |
| 2 — The LLM Landscape | How to choose and justify a specific model |
| 3 — Working With LLM APIs | The exact request/response/streaming shapes the build runs on |
| 4 — Fine-Tuning & Customization | Why a system prompt, not a fine-tune, was the right tool here |
| 5 — Multimodal & Beyond-Text | The concrete next features: images, and when they're worth it |
| 6 — Capstone | Putting all five chapters into one real, running application |

If you can explain every row of that table out loud, you've internalized the course — not
just completed it.

## Extending the project further

Pick one as your next step, in roughly increasing difficulty: add a `try/except` around
the API call for dropped connections and rate limits; add tool/function calling (Lesson 17)
so the assistant can call a real function, like a calculator or a weather lookup; add
structured JSON output (Lesson 18) to make the assistant return machine-readable data
alongside its reply; or add image input (Lesson 26) so a user can share a picture as part
of the conversation. Each one is a real, resume-worthy addition built entirely from
material in this course.

## Where this course sits in your path

This is **course 5 of 12** in the AI Engineer path's Job-Ready stage. You've gone from "how
LLMs work" all the way to a working, streaming application — the foundation every later
course builds on. Next up: **Prompt & Context Engineering**, which takes the system
prompts and message-shaping you used casually in this capstone and turns prompt design
itself into a disciplined, testable practice — exactly the skill that separates a working
demo from a production-grade AI feature.

## Key terms

| Term | Meaning |
|---|---|
| Stateful application | Software that remembers prior interactions, as opposed to treating each request independently |
| Portfolio framing | Describing a project in terms of the real concepts it demonstrates, not just what it does |
| Concept map | Tracing which earlier lesson/chapter a finished feature actually came from |

## Lab

1. Write a 2–3 sentence portfolio description of your capstone project, using at least
   three of the "interview terms" phrases from this lesson.
2. Pick one extension from this lesson and implement it in your own copy of the capstone.
3. Fill in the chapter-to-capstone table from memory, without looking back at this guide.

## Check yourself

The course is complete when you can describe your capstone project out loud in portfolio
language, explain which chapter each of its pieces came from, and state the name of the
next course in this path.
