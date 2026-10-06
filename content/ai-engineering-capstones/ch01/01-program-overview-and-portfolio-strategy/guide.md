# Lesson 1 — Program Overview & Portfolio Strategy

**Chapter 1 · Capstone Overview · Lesson 1 of 23**

## What you'll learn

- What this capstone course covers, and why it closes out the standalone
  AI Engineer path
- The three flagship projects you'll build end to end, and the
  career-prep chapter that follows them
- Why hiring teams respond better to 2-3 deep, complete AI projects than
  to a long list of half-finished scripts
- What "complete" actually means for an AI project you'll put in front
  of an interviewer

## Why this course exists

Every course earlier in the AI Engineer path taught you a piece: how
LLMs work and how to prompt them, retrieval-augmented generation and
vector databases, tool use and agents, and containerizing and deploying
AI applications. This course doesn't teach a new piece. It's where you
take everything you already know and ship it — three real, working
systems, built start to finish, that you can put your name on.

There is no fictional company running through this course. You are the
one building the project, under your own name, in your own repository.
That's intentional: a capstone is supposed to produce something that's
actually yours — built on documents, data, and tools you chose.

## The three flagship projects

- **Project 1 — A Production RAG Knowledge Assistant** (this chapter and
  the next): a real retrieval-augmented generation system over a
  document set you choose — ingestion, chunking, embeddings, a vector
  database, grounded generation with citations, and a measured
  evaluation pass.
- **Project 2 — An AI Data Analyst (SQL/APIs)**: a system that takes a
  natural-language question, turns it into safe SQL against a real
  database, and combines the result with live API data.
- **Project 3 — A Tool-Using Agent With Human Approval**: an agent with
  a real tool set, a human-approval step before anything risky runs,
  security and logging, and a deployment.

Each project follows the same arc: kickoff and scope → the core pipeline
→ refinement and evaluation → deployment and wrap-up. A final **Career
Preparation** chapter closes the course: resume, portfolio presentation,
interview questions, system design questions, and negotiation.

## Portfolio strategy: depth over breadth

A GitHub profile with fifteen half-finished notebooks tells an
interviewer nothing except that you start things. A profile with two or
three AI projects that are actually finished — a working pipeline, a
measured evaluation with real numbers, a deployed service, and a README
that explains your design decisions — tells them you can take an AI
system from an idea to something that runs in production. That second
profile is what gets you hired.

This course is built around that principle. You will walk away with up
to three complete projects. Even if you only finish one fully (Project
1, in this chapter range), a single complete, well-documented project
beats three abandoned ones.

## What "complete" means for each project

- **A working end-to-end pipeline** that calls a real LLM API — not a
  notebook that only runs on your machine with hardcoded test inputs.
- **A measured evaluation**, with actual numbers (retrieval recall,
  judge scores, SQL correctness) — never just "it felt right when I
  tried it."
- **A deployed, callable service** — containerized and exposed behind a
  minimal API, not just a script you run by hand.
- **A README** that states the architecture, the tradeoffs you made, and
  what's intentionally out of scope.

## Key terms

| Term | Meaning |
|---|---|
| Flagship project | One of this course's three complete, portfolio-grade builds (RAG assistant, AI data analyst, tool-using agent) |
| Eval set | A small, hand-built set of test questions with known-correct answers or sources, used to measure quality instead of guessing |
| Grounded generation | An LLM answer built only from retrieved context, with citations back to where each claim came from |

## Lab

Open a blank repository (public, under your own account) for Project 1
now. Write a one-paragraph project brief in the README: what document
set you'll build the RAG assistant over, what stack you'll use, and
what "done" will look like for you. You'll keep refining this README
through Lesson 7.

## Check yourself

- Why does this course avoid building around one fictional company,
  unlike some other capstones in this catalog?
- What are the three flagship projects, in order?
- Name the four things a "complete" AI project needs, per this lesson.
