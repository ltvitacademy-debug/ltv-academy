# Lesson 2 — Choosing Your Project Emphasis

**Chapter 1 · Capstone Overview · Lesson 2 of 23**

## What you'll learn

- What skill set each of the three flagship projects actually
  demonstrates
- A simple framework for deciding which project to polish deepest,
  based on the role you're targeting
- Why building all three in order still makes sense even if you
  ultimately showcase one above the others

## Each project teaches a different thing

The three flagship projects share a lot of groundwork — calling an LLM
API, building an evaluation set, containerizing a service — but each
one leans hardest on a different skill set, and that's worth being
deliberate about:

- **Project 1 — A Production RAG Knowledge Assistant** leans on
  retrieval quality and grounded generation: chunking strategy,
  embedding and vector-database tuning, and making sure an answer is
  actually backed by a cited source. This is the skill set an **AI
  engineer / RAG engineer** role probes hardest.
- **Project 2 — An AI Data Analyst (SQL/APIs)** leans on safe,
  correct natural-language-to-SQL generation and combining structured
  data from more than one source — closer to what an **applied AI
  engineer working alongside data and analytics teams** does day to
  day.
- **Project 3 — A Tool-Using Agent With Human Approval** leans on
  agent orchestration, security, and operational discipline — approval
  gates before risky actions, logging, and safe deployment — which
  maps most directly to **agentic AI engineer / AI platform engineer**
  roles.

## A framework for choosing

You don't have to guess. Ask yourself one question: **what role am I
actually applying for?**

- Targeting an **AI engineer / RAG engineer** role → go deepest on
  Project 1. Interviewers in this lane will probe chunking choices,
  retrieval metrics, and why your generation is grounded rather than
  hallucinated.
- Targeting an **applied AI engineer working with data** role → go
  deepest on Project 2. You'll be expected to talk fluently about SQL
  injection risk, query validation, and merging structured and API
  data cleanly.
- Targeting an **agentic AI / AI platform engineer** role → go deepest
  on Project 3, and make sure your security and logging habits (reused
  from Project 1's evaluation discipline) show up again there.

If you're not sure yet which role you want, that's fine too — build all
three to a working baseline, then come back and push the one that felt
most interesting the furthest.

## You still build all three, in order

This course builds Project 1 first regardless of your target role,
because its patterns — building an eval set, measuring instead of
guessing, containerizing a service behind an API — are reused directly
in Projects 2 and 3. Choosing an emphasis doesn't mean skipping the
other two — it means deciding, going in, which one gets the extra
polish pass before you put it in front of an employer: a sharper
README, a deeper evaluation, a recorded demo walkthrough.

## Key terms

| Term | Meaning |
|---|---|
| Emphasis | The one flagship project you polish deepest for your portfolio, chosen to match your target role |
| Grounded generation | An LLM answer built only from retrieved context, with citations back to where each claim came from |
| Agent orchestration | The logic that decides which tool an agent calls, in what order, and when a human needs to approve a step |

## Lab

Write down, in one sentence, which of the three roles above (AI/RAG
engineer, applied AI engineer with data, agentic/platform engineer) you
are currently aiming for — or "undecided" if you genuinely aren't sure
yet. Keep that sentence next to the README you started in Lesson 1;
you'll revisit it at the end of Project 1.

## Check yourself

- Which flagship project leans hardest on retrieval quality and
  grounded generation?
- If you're targeting an applied AI engineer role working with data
  teams, which project should you plan to polish deepest, and why?
- Does choosing an emphasis mean skipping the other two projects? Why
  or why not?
