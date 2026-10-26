# Lesson 13 — Documenting the Solution

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 13 of 16**

## What you'll learn

- Why a fixed bug still needs a written record, even once it's working
- The four sections a real root-cause document needs
- Writing a prevention step that's specific, not generic advice
- Where this document should live so the next person actually finds it

## Why document something that's already fixed

The report works now. That's not the same as the problem being closed. Without a written record,
the next time someone asks "has this happened before," the answer depends entirely on whether you
personally remember it — and six months from now, you might not. A short root-cause document
turns a one-time fix into institutional knowledge.

## The four sections that make a root-cause document useful

**1. Problem** — stated the way it was reported, not the way you later understood it:

> The Executive Summary page's Total Sales figure did not match the Drill-Down page's Total Sales
> for the same region filter. The Executive Summary figure never changed regardless of which
> region was selected.

**2. Root cause** — stated precisely, not vaguely:

> The Executive Summary's headline Total Sales card was bound to the `[Total Sales (All Regions)]`
> measure instead of the plain `[Total Sales]` measure. `[Total Sales (All Regions)]` uses
> `CALCULATE ( [Total Sales], ALL ( TerritoryDim ) )`, which intentionally ignores the region
> filter — correct for its intended use as a company-wide benchmark, incorrect for this card. With
> no region selected, both measures returned the same value, which is why the mis-binding wasn't
> caught when the page was originally built.

**3. Fix** — exactly what changed:

> Rebound the Executive Summary's headline card to `[Total Sales]`. No DAX was modified.
> `[Total Sales (All Regions)]` was renamed to `Total Sales — Company Benchmark (ALL Territories)`
> and moved, along with `[Pct of Company Total]`, into a new `Benchmarks` display folder.

**4. Prevention** — a specific, actionable step, not "be more careful":

> Any new measure intended to ignore a standard filter (using `ALL`, `ALLEXCEPT`, or similar)
> should go into the `Benchmarks` display folder immediately on creation, and its name should
> make the override explicit rather than starting with the same words as the base measure it's
> built from.

## Why vague prevention steps don't help

"Double-check your measures before publishing" sounds responsible but gives the next person
nothing concrete to actually do differently. "Put any ALL()-based measure in a Benchmarks folder
and name it so the override is explicit" is a rule someone can actually follow and a reviewer can
actually check for.

## Where this document lives

Keep it next to the project, not buried in an email thread: a short Markdown or Word file in the
same folder as the `.pbix`, or a page in whatever internal wiki the team already uses for this
kind of project note. The goal is that the *next* person debugging a similar mismatch — on this
report or a different one — finds this in under a minute.

## Key terms

| Term | Meaning |
|---|---|
| Root-cause document | A short written record of problem, cause, fix, and prevention |
| Institutional knowledge | Information that outlives any one person's memory of an incident |
| Actionable prevention step | A specific rule someone can follow and verify, not general advice |

## Lab

Write the actual root-cause document for this bug, using the four sections above as your
template, in your own words grounded in what you diagnosed in Lessons 10-12. Save it alongside
your `.pbix` file.

## Check yourself

You're ready for Lesson 14 when you can answer, without looking: what's the difference between a
vague prevention step and an actionable one, and why does the "Problem" section get written from
how it was originally reported, not from what you later learned?
