# Lesson 19 — Technical Interview Walkthrough

**Chapter 4 · Job Preparation · Lesson 19 of 25**

## What you'll learn

- The four-part structure a strong technical interview answer follows:
  clarify scope, state the design decision, justify it, name a
  tradeoff
- A full worked example of that structure, answering "walk me through
  the ETL pipeline you built," using this capstone directly
- Why answering in that order — rather than jumping straight to "I
  used SSIS" — is what separates a strong answer from a weak one
- How to adapt the same structure to a different question you get
  asked in a real interview

## Why structure matters more than knowledge here

Lesson 18 gave you a realistic set of questions to prepare for. Knowing
the material isn't actually where most candidates lose points —
knowing the material and then answering it as a disorganized stream of
facts is. An interviewer listening to an answer that jumps straight
into implementation details, with no scope and no reasoning, has to do
the work of reconstructing your thought process themselves. An answer
that's structured does that work for them.

## The four-part structure

| Step | What it does | What it sounds like |
|---|---|---|
| 1. Clarify scope | Confirms what's actually being asked before you answer it | "Are you asking about the full pipeline, or specifically the warehouse design?" |
| 2. State the design decision | Names the concrete choice you made, without justifying it yet | "I modeled the fact table as an accumulating snapshot." |
| 3. Justify it | Explains *why* that choice fits the business problem | "Because a work order has multiple milestone dates — start, end, due — that all update the same row as production progresses." |
| 4. Name a tradeoff | Shows you understand what you gave up, not just what you gained | "The tradeoff is that accumulating snapshots need updates, not just inserts, which is a heavier load pattern than a simple transaction fact." |

Skipping step 1 makes you guess at what the interviewer wants. Skipping
step 3 makes you sound like you memorized a term without understanding
it. Skipping step 4 makes you sound like you've never questioned your
own decision — which is a bigger red flag to an experienced
interviewer than picking an imperfect design in the first place.

## Worked example: "Walk me through the ETL pipeline you built"

Here's the full structure applied to one realistic question, using
this capstone's manufacturing work order pipeline as the answer.

**1. Clarify scope.**

> "Happy to walk through it — do you want the end-to-end architecture,
> or should I focus on a specific piece, like the SSIS package or the
> warehouse design?"

This isn't stalling. It's confirming you're about to spend the next
two minutes answering the actual question, not a guess at it. If the
interviewer says "the whole thing," you now know to keep each piece
brief; if they say "just the ETL," you know to go deeper there and
skip the rest.

**2. State the design decision.**

> "At a high level: I loaded raw `Production.WorkOrder` data from
> AdventureWorks into a SQL Server staging table, then built an SSIS
> package that transforms and loads it into a dimensional warehouse —
> a fact table and its supporting dimensions."

Concrete and short. No justification yet — just the shape of the
answer, so the interviewer has a map before you fill in detail.

**3. Justify it.**

> "I used SSIS rather than doing the transformation in T-SQL directly
> because this needed to run as a repeatable, scheduled job — SSIS
> gives you built-in scheduling through SQL Server Agent, a visual
> lineage of the transformation steps, and a Lookup transformation to
> match incoming rows against dimension keys, including a defined path
> for rows that don't match anything."

This is where the tool-specific knowledge from Lesson 18 actually gets
used — not recited on its own, but deployed in service of explaining a
decision.

**4. Name a tradeoff.**

> "The tradeoff is that SSIS is heavier to set up than, say, Power
> Query, for something this size — for a much smaller or one-off
> transformation, Power Query inside Power BI would've been faster to
> build. I chose SSIS here because this needed to be a standalone,
> schedulable, production-style pipeline, not a transformation tied to
> one report."

Naming a real tradeoff — and being specific about *when* the other
option would have won — is what makes this sound like a decision, not
a fact you looked up.

## Adapting this to a different question

The same four steps work on nearly any "walk me through" or "how would
you design" question, technical-interview style. Try it on "walk me
through how you'd design a dimensional model for manufacturing work
orders": clarify whether they want the fact grain or the full schema,
state that you'd model one row per work order as an accumulating
snapshot, justify it by pointing to the multiple milestone dates, and
name the tradeoff against a simpler transaction fact. Same skeleton,
different content — because the skeleton is what the interviewer is
actually evaluating.

## Key terms

| Term | Meaning |
|---|---|
| Clarify scope | Confirming what's actually being asked before answering, to avoid guessing at the question |
| Design decision | The concrete technical choice being explained — stated plainly, before it's justified |
| Tradeoff | What you gave up by choosing one design or tool over an alternative, named honestly |

## Lab

Pick one question from Lesson 18's tables that you didn't fully answer
in that lesson's lab. Write out a full four-part answer — clarify
scope, state the design decision, justify it, name a tradeoff — the
way the worked example above did for the ETL pipeline question. Then
say it out loud, timed, without reading it verbatim. If it runs past
about two minutes, cut detail from step 3, not from steps 1, 2, or 4 —
scope, the decision itself, and the tradeoff are what an interviewer
remembers.

## Check yourself

You're ready for Lesson 20 when you can answer "walk me through the
ETL pipeline you built" out loud, from memory, hitting all four steps
in order, using this capstone's real details rather than the exact
wording of the example above.
