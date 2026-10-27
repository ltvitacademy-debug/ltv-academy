# Lesson 9 — Presenting the Dashboard

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 9 of 10**

## What you'll learn

- Why presenting the pipeline's output means leading with the answer, not the architecture
- How to design the actual Power BI page around one question, not a wall of visuals
- What to say when the Store Operations lead asks "can you trust this number?"

## The meeting is not about the pipeline

Everything from Lesson 1 through Lesson 8 — Bronze, Silver, Gold, scheduling, Power BI's connection
mode — was necessary to build this. None of it is what the Store Operations lead actually wants to
hear about. They asked one question, back in Lesson 1: *how did we do yesterday?* The whole point of
presenting this is answering that question in the first ten seconds, not walking through the
medallion architecture that produced it.

## Lead with the number

The report page itself should mirror that priority. One KPI card at the top, large: **yesterday's
total sales amount**, the single number this entire project exists to deliver. Everything else on
the page supports that number, it doesn't compete with it:

- A short trend visual (a simple bar or line chart of the last 14–30 days) directly below the KPI
  card, giving "yesterday" some context — was it a normal day, a strong one, a weak one — without
  requiring a second meeting to explain it.
- The order count from Gold as a smaller secondary number, answering the natural follow-up question
  ("was that fewer, bigger orders, or more of them?") before it gets asked.

What the page does *not* need: a dozen slicers, five different chart types, or a breakdown by store
and product line — that's explicitly out of scope, named back in Lesson 1, and cramming it in now
would bury the one number this project was actually asked to deliver.

## Presenting it, in the room

Open with the answer, not the build: "Yesterday's total sales were $X, combining both in-store and
online." Only then, if asked, explain how it's produced — one line, not a walkthrough: "This refreshes
automatically every morning from a pipeline that cleans and combines both channels' sales data, so
you're never looking at a stale or manually-pulled number."

## "Can you trust this number?"

This question will come up, and Lesson 6's validation work is the honest answer to it — not a vague
reassurance. You can say, specifically: every morning, the pipeline checks that the cleaned data
never has more rows than the raw data it came from, and that the daily summary has exactly as many
rows as there are actual days of sales data, catching that automatically before the number ever
reaches this report. That's a concrete, checkable claim — exactly the kind of answer a stakeholder
can actually evaluate, instead of "trust me."

## Naming what's out of scope, out loud, again

If the Store Operations lead asks for a per-store breakdown or a returns-adjusted number on the spot,
that's not a failure of this presentation — it's new scope. Say so directly: "That's a real, useful
follow-up — it's not in this version, which only answers the daily total across both channels. I can
scope that as a next iteration." That's the same discipline from Lesson 1, applied live, in the room.

## Key terms

| Term | Meaning |
|---|---|
| Lead with the answer | Opening a presentation with the result, not the process that produced it |
| Supporting visual | A chart or number that adds context to the headline number without competing with it |
| Trust claim | A specific, checkable statement about validation, rather than a vague assurance |

## Lab

Write the exact one-sentence opening line you would say to the Store Operations lead, using a made-up
number, following the "lead with the answer" pattern from this lesson.

## Check yourself

You're ready for Lesson 10 when you can explain why a presentation of this pipeline should open with
the number, not the architecture, and what specific, checkable claim you'd make if asked whether the
number can be trusted.
