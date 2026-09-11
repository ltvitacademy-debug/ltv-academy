# Lesson 18 — Common Microsoft BI Developer Interview Questions

**Chapter 4 · Job Preparation · Lesson 18 of 25**

## What you'll learn

- The two categories every Microsoft-stack BI developer interview
  mixes together: conceptual questions and tool-specific questions
- A realistic set of conceptual questions — star vs. snowflake schema,
  SCD types, when to use SSIS vs. Power Query
- A realistic set of tool-specific questions — SSIS Lookup
  transformations, SSRS parameters, Power BI DAX basics
- How to prepare for each category differently, before you walk into
  the room

## Why interview questions split into two kinds

A Microsoft-stack BI developer interview almost never stays in one
lane. An interviewer will move from "why did you choose that fact
table grain" straight into "how would you handle a slowly changing
dimension in SSIS specifically" in the same five minutes. That's not
disorganized interviewing — it's testing two different things on
purpose: do you understand the *concepts* underneath dimensional
modeling and ETL, and can you actually *operate the specific tools*
that implement those concepts. This lesson previews both. Lesson 19
then walks through answering one of these questions end to end.

## Conceptual questions

These test whether you understand *why* a design choice gets made,
independent of any one tool. You can prepare for these by reasoning
through the answer, not by memorizing a script.

| Question | What it's really testing |
|---|---|
| "What's the difference between a star schema and a snowflake schema, and when would you pick one over the other?" | Whether you understand normalization tradeoffs — snowflake normalizes dimensions further, star schema keeps them flat for simpler, faster queries |
| "Walk me through the slowly changing dimension types — what's the difference between a Type 1 and a Type 2?" | Whether you know that Type 1 overwrites history and Type 2 preserves it with new rows — and can say which one a given business question requires |
| "When would you use SSIS instead of Power Query, or the other way around?" | Whether you understand SSIS as a heavier, server-side ETL tool for scheduled, production pipelines, versus Power Query as lighter, self-service transformation closer to the report itself |
| "What's the grain of a fact table, and why does it matter?" | Whether you know that grain is the single most important decision in a dimensional model — get it wrong and every downstream measure is wrong with it |
| "What's an accumulating snapshot fact table, and when would you use one?" | Whether you can name a fact table pattern beyond the basic transaction fact — exactly the pattern this capstone's `FactWorkOrder` uses |

## Tool-specific questions

These test whether you've actually operated the tool, not just read
about it. Vague, textbook answers fall apart quickly here because the
interviewer usually has a specific follow-up ready.

| Question | What it's really testing |
|---|---|
| "How does a Lookup transformation work in SSIS, and what happens on a no-match row?" | Whether you've actually configured one — including the error-output path for rows that don't match, not just the happy path |
| "How do you add a parameter to an SSRS report, and how does it affect the underlying query?" | Whether you understand parameters as filters that change the dataset's query, not just a UI dropdown |
| "What's the difference between a calculated column and a measure in Power BI?" | Whether you know a calculated column is computed row-by-row and stored, while a measure is computed at query time based on filter context |
| "What does CALCULATE do in DAX, and why is it central to almost every real measure?" | Whether you understand filter context manipulation, which is the concept nearly every non-trivial DAX formula depends on |
| "How would you schedule an SSIS package to run automatically?" | Whether you know SQL Server Agent jobs are the standard mechanism, and can describe how failure notifications typically get wired up |

## Preparing for each category differently

Conceptual questions reward being able to explain a tradeoff out loud,
in your own words, without a script — practice by explaining each
concept to someone who's never heard of it, and notice where you
stumble. Tool-specific questions reward hands-on repetition — the
fastest prep is reopening your own capstone project and walking
through the actual Lookup transformation, the actual SSRS parameter,
the actual DAX measure you wrote, so your answer references something
real instead of something remembered from a video.

That's also exactly why this capstone matters here: every tool-specific
question above has a direct, concrete answer sitting in your own
project. You didn't just read about a Lookup transformation — you
built one when you loaded `Production.WorkOrder` data into staging and
matched it against dimension keys. Point to it.

## Key terms

| Term | Meaning |
|---|---|
| Conceptual question | A question testing whether you understand a design tradeoff, independent of any specific tool |
| Tool-specific question | A question testing whether you've actually operated a specific feature of a specific tool |
| Filter context | The set of active filters DAX measures are evaluated within — the concept CALCULATE manipulates |

## Lab

Pick three questions from the tables above — at least one conceptual
and at least one tool-specific — and write a short, spoken-style
answer to each (2-4 sentences, as if you were answering out loud, not
a formal essay). For the tool-specific question, reference something
specific from your own capstone build (a table name, a transformation
you configured, a DAX measure you wrote) rather than a generic
description. Save these; Lesson 19 builds on this same habit for one
question in much greater depth.

## Check yourself

You're ready for Lesson 19 when you can sort a new interview question
you haven't seen before into "conceptual" or "tool-specific" within a
few seconds, and explain why those two categories get prepared for
differently.
