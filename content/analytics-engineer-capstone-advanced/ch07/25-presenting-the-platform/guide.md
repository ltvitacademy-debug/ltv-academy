# Lesson 25 — Presenting the Platform

**Chapter 7 · The Power BI Layer, Incident, and Wrap-Up · Lesson 25 of 26**

## What you'll learn

- How to present this finished platform back to Jaffle Shop's
  leadership, in their own original terms from Lesson 1
- What governance actually bought them, concretely, versus the
  original ad hoc SQL — using Lesson 23-24's real incident as proof
- How to structure a presentation that a non-technical stakeholder can
  follow, without losing the real technical substance
- Why "nothing broke silently" is a stronger pitch than a feature list

## Starting from their own words

Lesson 1 opened with leadership's real complaint, paraphrased:
*"Every number comes from somebody's personal SQL file. Nobody knows
if it's still right. When something breaks, we find out from a
confused VP, not an alert."* The strongest way to present this
platform isn't a tour of dbt, Snowflake, and GitHub Actions — it's
answering their original complaint, point by point, in their own
language.

## A five-point structure, mapped to the original five gaps

| Their original complaint | What to show them |
|---|---|
| "Anyone can query or break anything" | `TRANSFORMER`/`ANALYST` roles — Power BI never touches raw or unverified data |
| "Nobody knows if a number is still right" | Real tests running on every build; a `unique` test catching a real mistake in Lesson 23 |
| "Nobody can see what depends on what" | The generated lineage graph — pull it up live, click through `customers`' dependencies |
| "A new source gets loaded by hand" | The scheduled Python ingestion script and its log |
| "A bad change ships straight to the dashboard" | The actual blocked pull request from Lesson 23 — screenshot or live demo |

## The strongest single artifact: the real incident

Lesson 23's join fanout isn't just a teaching exercise — it's the
single best proof point for this presentation. It's a real mistake, a
reasonable developer could have made it, and the platform caught it
before a single business user ever saw an inflated `lifetime_value`
number. Showing the actual blocked pull request, the actual failing
test output, and the actual fix is far more convincing than describing
tests in the abstract.

## Translating technical wins into business language

| Technical fact | Business translation |
|---|---|
| `dbt build` stops on a failed test | "A mistake gets caught before it reaches a dashboard, not after" |
| CI required status check | "No one — including the person who wrote the code — can accidentally skip the safety check" |
| `PROD`-only Power BI connection | "What you see in a report has already been double-checked" |
| Generated lineage graph | "Anyone can see what a number depends on, without asking a developer" |

## Why "nothing broke silently" beats a feature list

A list of tools (Snowflake, dbt, Python, GitHub Actions, Power BI)
means nothing to someone who didn't ask for tools — they asked for
trust in the numbers. The real pitch is the *outcome*: a real mistake
happened during this build, and it never reached anyone who would have
acted on a wrong number. That's the platform doing exactly the job
leadership described in Lesson 1.

## Key terms

| Term | Meaning |
|---|---|
| Business translation | Restating a technical control in terms of the outcome it guarantees, not the tool that provides it |
| Proof point | A real, concrete event (the Lesson 23 incident) used as evidence instead of an abstract claim |

## Lab

1. Write a two-minute verbal pitch of this platform, structured around
   Lesson 1's five original complaints, without naming a single tool
   until the very end.
2. Pick one technical fact from this lesson's translation table and
   rewrite it in your own words for a non-technical audience.
3. Explain, in one sentence, why the Lesson 23 incident is a stronger
   proof point than a slide listing "5 dbt tests added."

## Check yourself

You're ready for Lesson 26 when you can present this platform to a
non-technical stakeholder using their own original complaint as the
structure, with the real incident as your strongest evidence.
