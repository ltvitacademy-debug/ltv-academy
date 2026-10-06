# Lesson 8 — Project 2 Kickoff

**Chapter 3 · Project 2 — AI Data Analyst (SQL/APIs) · Lesson 8 of 23**

## What you'll learn

- What Project 2 actually is, and the one capability that makes it worth
  putting on a resume
- The four lessons ahead, and what each one adds to the build
- How to scope your own version of this project — your own database, your
  own API, your own questions
- The deliverables you're accountable for at the end of Chapter 3

## What you're building

Project 1 (Chapter 2) was a RAG assistant that answers questions from
unstructured documents. Project 2 is the structured-data counterpart: an
**AI data analyst** that takes a question in plain English, turns it into
a real SQL query against a real database, runs it safely, and — when the
question calls for it — enriches the result with a call to an external
API before answering.

This is a genuinely different skill from Project 1. RAG retrieves text
that already says roughly what's needed. An AI data analyst has to
*generate* a correct, safe query against a schema it wasn't trained on,
execute it against live data, and reason about the result. Hiring
managers for data-adjacent AI roles ask about this pattern specifically
because it's where "the model makes something up" turns into "the model
ran untrusted code against your production database" if you get it
wrong.

## The four lessons ahead

| Lesson | What it adds |
|---|---|
| 9 — Connecting to a Database Safely | A read-only, parameterized connection — the foundation everything else sits on |
| 10 — Natural-Language-to-SQL Patterns | The actual prompt pattern that turns a question into a validated query |
| 11 — Combining SQL Results With API Data | Enriching a database row with a live external call |
| 12 — Wrap-Up & Presentation | Packaging the finished project for your portfolio |

Each lesson builds directly on the last — by Lesson 12 you'll have a
working, demoable tool, not a snippet.

## Scoping your own project

This is project-based: there's no fictional company and no dataset
handed to you. You choose both halves:

1. **A real database you can connect to.** Any SQL database you already
   have access to, or a free local one you stand up yourself (SQLite
   with a public sample dataset, or a local Postgres/MySQL instance,
   work fine). It needs at least two or three related tables — a single
   flat table doesn't give the natural-language-to-SQL work in Lesson 10
   anything interesting to do.
2. **A real external API that adds something the database doesn't have.**
   Something like current exchange rates, weather, a public company-info
   lookup, or a geocoding service — pick one covered conceptually in the
   APIs & JSON for AI Applications course. The point of Lesson 11 is
   combining *your* SQL results with *your* API call, not a prescribed
   pair.
3. **Three to five real questions** a user of your tool would actually
   ask, in plain English, that require both the database and (for at
   least one question) the API. Write these down now — they become your
   test cases in Lesson 10 and your demo script in Lesson 12.

## Project 2 deliverables

By the end of Lesson 12 you should have:

- A read-only database connection using parameterized queries (Lesson 9)
- A natural-language-to-SQL function with schema-aware prompting and
  pre-execution validation (Lesson 10)
- At least one question path that joins a SQL result with a live API
  call (Lesson 11)
- A short written or recorded walkthrough suitable for a portfolio or an
  interview (Lesson 12)

## Key terms

| Term | Meaning |
|---|---|
| AI data analyst | An LLM-driven tool that answers natural-language questions by generating and running real queries against structured data |
| Project scope | The specific database, API, and question set you choose to build this project around |
| Deliverable | A concrete artifact (code, config, writeup) you can point to as evidence the project works |

## Check yourself

- Why is generating SQL from a natural-language question a different
  (and riskier) problem than RAG's text retrieval?
- Name the database and API you're choosing for your own Project 2, and
  one question that needs both.
- What makes a flat, single-table database a poor choice for this
  project?
