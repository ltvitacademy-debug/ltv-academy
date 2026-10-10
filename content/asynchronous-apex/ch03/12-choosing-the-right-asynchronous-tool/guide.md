# Lesson 12 — Choosing the Right Asynchronous Tool

**Chapter 3 · Choosing and Practicing · Lesson 12 of 16**

## What you'll learn

- A decision framework for picking between future methods, Queueable Apex, Batch Apex, and Scheduled Apex
- Why "how much data" and "when does it need to run" are the two questions that matter most
- How the tools combine in practice, rather than being mutually exclusive choices
- Worked examples of picking a tool for a specific stated requirement

## The two questions that decide almost everything

Across Chapter 1 and Chapter 2, four tools and their rules piled up fast. In practice, choosing between them comes down to two questions, asked in order:

1. **Does this need to run on a recurring schedule, independent of any user action?** If yes, you need **Scheduled Apex** somewhere in the design — though as Lesson 6 covered, its `execute` method usually just kicks off a Batch Apex job rather than doing the work itself.
2. **How much data does this touch, and how complex are the parameters?** A small, simple, one-off task with primitive-only inputs can use a **future method**. Anything needing non-primitive parameters, job tracking, or chaining should default to **Queueable Apex**. Anything processing a large volume of records — thousands or more — needs **Batch Apex**, specifically because of the per-chunk transaction boundary covered in Lesson 5.

## A decision table

| Requirement | Tool |
|---|---|
| Fire a quick callout after a trigger, with only Id/primitive inputs needed | Future method |
| Fire a callout or background task needing an sObject parameter, job tracking, or chaining | Queueable Apex |
| Process thousands to millions of records in one run | Batch Apex |
| Run something on a recurring calendar schedule (nightly, weekly, monthly) | Scheduled Apex (often paired with Batch Apex inside `execute`) |
| Run a multi-step process where each step must fully commit before the next starts | Chained Queueable jobs (Lesson 7) |

## The tools combine — they aren't mutually exclusive

A real design rarely picks exactly one tool in isolation. The most common real pattern in this course is **Scheduled Apex kicking off Batch Apex**: the schedule decides *when* ("every night at 2 AM"), and the batch class decides *how* ("process every stale Lead in chunks of 200"). Another common pattern is a Queueable chain (Lesson 7) where an early step does something Batch Apex can't — like a callout with `Database.AllowsCallouts` — before handing off to a later step. Treat these four tools as building blocks you compose, not as four competing answers to the same question.

## Worked examples

- *"Whenever a Case is closed, notify an external ticketing system over HTTP."* One record, one callout, triggered by a specific event, no need for chaining or job tracking — a **future method** (`@future(callout=true)`) is a reasonable, simple fit; **Queueable Apex with `Database.AllowsCallouts`** is an equally valid, more modern choice if you also want a trackable job Id.
- *"Every night, re-score every open Lead against a scoring model, across an org with 2 million Leads."* Recurring schedule plus large volume — **Scheduled Apex** registers the nightly run, and its `execute` method calls `Database.executeBatch` on a **Batch Apex** class that does the actual scoring in chunks.
- *"When an Opportunity is marked Closed Won, run a three-step onboarding sequence where each step depends on the last one having fully committed."* A multi-step, dependency-ordered sequence — **chained Queueable jobs**, each one enqueuing the next from inside `execute`.

## Key terms

| Term | Meaning |
|---|---|
| Decision framework | The two-question method (recurring schedule? data volume/complexity?) for picking an async tool |
| Composable tools | The four async tools are frequently combined (e.g., Scheduled Apex triggering Batch Apex), not mutually exclusive |

## Lab

For each of these three requirements, state which asynchronous tool (or combination) you'd use and justify it in one or two sentences using this lesson's decision framework: (1) "Send a welcome email to a new Contact's email address whenever one is created, with no other processing needed." (2) "Once a month, recalculate a custom rollup field across every Account in the org." (3) "After a multi-step data import, step two needs the result of step one to have already committed before it starts, and step three needs step two's result."

## Check yourself

Can you walk through this lesson's two-question framework without looking at the table? Can you explain, with a concrete reason, why "Scheduled Apex calling Batch Apex" is such a common pattern rather than Scheduled Apex processing records directly?
