# Lesson 22 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 5 · Capstone · Lesson 22 of 22**

## What you'll learn

- How to turn `AIClient` into something a portfolio reviewer actually reads
- What to say about the project in an interview, in under a minute
- A full recap of everything this course covered, chapter by chapter
- Where the AI Engineer path goes from here

## Presenting the project, not just the code

A portfolio reviewer won't read every line of `AIClient`. They'll read a
short README and skim your tests. Make the README do the work: what the
client does, the design decisions worth calling out (why a `Session`, why
custom exceptions, why retries only happen on transient errors), and how
to run the test suite yourself.

## The one-minute interview answer

Practice explaining this project out loud, in under a minute, hitting
three things: *what it does* ("a Python client that wraps a chat-based AI
API"), *the one hardest decision* ("deciding which errors to retry and
which to fail immediately"), and *how you proved it works* ("mocked tests
that simulate a rate limit and confirm the client recovers"). That's a
real, concrete answer — far stronger than "I built an API wrapper."

## The full course, in one page

| Chapter | What it covered |
|---|---|
| 1. Understanding APIs | REST fundamentals, HTTP methods, reading docs |
| 2. JSON Deep Dive | Syntax, nesting, JSON Schema, parsing, pitfalls |
| 3. AI Provider APIs | Real request/response shapes, streaming, tools, errors, pagination, webhooks |
| 4. Building a Wrapper | Client class design, retries, rate limiting, testing |
| 5. Capstone | Combining it all into one real, portfolio-ready project |

Every lesson in Chapters 1 and 2 was there so Chapter 3's real JSON shapes
would already make sense the moment you saw them — and Chapter 3 existed
so Chapter 4 had something real worth wrapping.

## Where this path goes next

This course is the third course in the **AI Engineer** path. The next
course is **AI/ML Foundations** — where you move from *calling* AI models
through an API to understanding how the models themselves actually work.

## Key terms

| Term | Meaning |
|---|---|
| README | The first (often only) thing a reviewer reads about your project |
| One-minute answer | A concise, concrete way to describe a project in an interview |
| AI/ML Foundations | The next course in the AI Engineer path |

## Lab

Write the actual README for your `AIClient` project: a two-sentence
description, a bullet list of what it handles (from Lesson 21's
checklist), and the exact command to run its tests.

## Check yourself

Say your one-minute answer out loud right now, from memory, without
looking back at this guide. Did it include what it does, the hardest
decision, and how you proved it works?
