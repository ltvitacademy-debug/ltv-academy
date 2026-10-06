# Lesson 12 — Wrap-Up & Presentation

**Chapter 3 · Project 2 — AI Data Analyst (SQL/APIs) · Lesson 12 of 23**

## What you'll learn

- What you actually built across Lessons 9–11, in the terms an
  interviewer or hiring manager cares about
- A five-part structure for presenting this project in a portfolio or
  interview
- Why the safety decisions are the most interview-relevant part of this
  project, not an afterthought to mention if there's time
- How to write an honest "known limitations" section instead of hiding
  what the project doesn't do

## What you built

Across three lessons, you built an AI data analyst with three real,
interview-defensible pieces:

- A **read-only, parameterized database connection** (Lesson 9) that
  can't be tricked into writing or destroying data, no matter what text
  reaches it.
- A **validated natural-language-to-SQL pipeline** (Lesson 10) using
  real Messages API tool calling — Claude proposes a query as a
  structured `tool_use` block, your code checks it before anything runs.
- A **multi-tool enrichment step** (Lesson 11) where Claude orchestrates
  a database call and a live external API call, with retry/backoff and
  N+1 avoidance handled in your code.

That's a complete, safety-conscious slice of what an "AI data analyst"
product actually requires — not a toy that only works when nobody asks
it anything unexpected.

## A five-part structure for presenting it

Don't just demo the happy path and stop. Structure the walkthrough:

1. **The problem.** What question couldn't be answered without this
   tool — one of your Lesson 8 test questions, stated plainly.
2. **The architecture.** The path from question to answer: prompt with
   schema → `tool_use` (SQL) → validation → read-only execution →
   (optionally) `tool_use` (API) → `tool_result` → final answer.
3. **The safety decisions.** This is the part most portfolio projects
   skip and most interviewers actually probe: why a dedicated read-only
   role, why pre-execution validation *in addition to* that role, why
   parameterized queries were non-negotiable from the start.
4. **The demo.** Run two or three of your real test questions live —
   including one that needs the API enrichment from Lesson 11.
5. **Known limitations.** State what it doesn't handle yet, honestly.

## Known limitations, written honestly

A short, specific limitations section is more credible than a polished
demo with no acknowledged edge cases — it shows you understand the
system's actual boundaries, not just its happy path.

```text
Known limitations:
- No conversation memory -- each question is handled independently.
- Schema is hard-coded in the system prompt; a schema change requires
  a manual prompt update, not automatic introspection.
- The exchange-rate API has no caching layer yet, so repeated
  questions re-fetch the same rate within a session.
- Validation blocks write keywords, but hasn't been tested against
  adversarial prompt-injection attempts in the user's question itself.
```

That last line matters specifically for this project: the validation in
Lesson 10 defends the *query*, but a determined user could still try to
manipulate Claude's *reasoning* through a cleverly worded question.
Naming that as a known gap is more honest, and more impressive to an
interviewer, than implying the system is airtight.

## Why this matters more than the demo itself

An interviewer who has seen a dozen RAG chatbots and basic CRUD apps
will ask pointed questions about *this* project specifically: "what
stops a bad actor from running a destructive query," "what happens if
the API times out," "how would you scale the enrichment step." You've
already built real, specific answers to all three — the presentation
structure above exists to make sure you actually say them out loud.

## Key terms

| Term | Meaning |
|---|---|
| Architecture walkthrough | Tracing the actual path a request takes through your system, step by step |
| Known limitations | An honest, specific list of what a project doesn't yet handle |
| Prompt injection (via user question) | An attempt to manipulate the model's reasoning through the wording of the input itself, distinct from SQL injection in the query text |

## Lab

Write your Project 2 README using the five-part structure above, record
or rehearse a 3–5 minute walkthrough covering all five parts, and get
it in front of one other person (classmate, mentor, or peer) for
feedback before moving on.

## Check yourself

- Why does this lesson recommend leading with the safety decisions
  rather than saving them for the end if there's time?
- What's the difference between the SQL injection risk from Lesson 9
  and the prompt-injection-via-question risk named in the limitations
  section?
- Pick one of your own project's real limitations and write one honest
  sentence describing it.
