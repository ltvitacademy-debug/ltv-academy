# Lesson 16 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 16 of 16**

## What you'll learn

- A real inventory of everything this project actually required, start to finish
- Why this project's skills are a genuine step up from the Beginner capstone
- How the bug chapter (Lessons 10-12) is itself a skill, not a detour
- What's different and harder about the path's Advanced capstone ahead

## What you actually built

Sixteen lessons ago, this started as two stakeholders wanting more than a one-time pull. Here's
the real inventory of what that turned into:

- **T-SQL:** a five-table join across real `AdventureWorks2012` data (Lesson 3), staged into a
  reusable keys-only fact view plus two dimension views (Lesson 4), later altered in place to add
  a new business rule without breaking anything downstream (Lesson 15).
- **Data modeling:** an actual star schema — one fact, two dimensions, a proper Date table —
  with real many-to-one relationships, not a single flat result (Lesson 5).
- **DAX:** measures built with `CALCULATE`, `DATEADD`, `ALL`, `AVERAGEX`, and `DIVIDE` — a real
  step up from the Beginner project's plain `SUM` and `DISTINCTCOUNT` (Lesson 6).
- **Two report pages, two audiences:** an executive-level summary and an exploratory drill-down,
  each designed around how its specific stakeholder actually works (Lessons 7-8).
- **Operations:** a real Power BI Service scheduled refresh through the On-premises Data Gateway
  (Lesson 9).
- **Diagnosis:** reproducing a reported bug, isolating the variable, confirming a root cause with
  a controlled test, and fixing it without touching correct code (Lessons 10-12).
- **Communication:** documenting a fix for future reference, and presenting the same facts two
  different ways for two different audiences (Lessons 13-14).
- **Change management:** turning a stakeholder's new ask into a specific, scoped, cleanly
  implemented addition (Lesson 15).

## Why the bug chapter matters as much as the build

It would have been easy to design this project without a bug in it — just build two correct
pages and call it done. That's not what real BI work looks like. Reports get copied, measures get
renamed, visuals get rebuilt in a hurry before a deadline, and "the numbers don't match" is one of
the most common tickets any BI developer gets. Lessons 10-12 weren't a detour from the real
project — diagnosing exactly that kind of mismatch, calmly and systematically, *is* the skill.

## This was the Intermediate project — on purpose

The Beginner capstone was one stakeholder, one query, one page, built once. This project added
real breadth: multiple tables, multiple pages, a schedule, a bug, a change request. Each of those
is a genuine step up in scope and responsibility — not just more content, but a different kind of
project.

## What's next: the path's Advanced capstone

The path's Advanced capstone goes further still — larger, more production-style builds, with the
kind of complexity (and the kind of real-world mess) that a single staged view and two dimension
tables won't fully prepare you for on their own. Everything in this project — staging, modeling,
CALCULATE-based DAX, diagnosing a real discrepancy, communicating across audiences — is exactly
the foundation that next tier builds on. You're not starting over; you're building up.

## Key terms

| Term | Meaning |
|---|---|
| Change management | Handling a new stakeholder request without breaking what already works |
| Root-cause diagnosis | A real, named BI skill, not an afterthought to "real" development work |

## Lab

Write a short, honest self-assessment: pick the single lesson in this chapter you found hardest,
and explain specifically why — not "DAX is hard," but the actual concept that took the most
re-reading. That's useful information for deciding what to review before the Advanced capstone.

## Check yourself

Before moving to the path's Advanced capstone, you should be able to explain, without looking:
why `ALL(TerritoryDim)` made `[Total Sales (All Regions)]` ignore the region filter, why the fact
view stayed at order-line grain throughout this entire project, and why the fix in Lesson 12
didn't touch a single line of DAX.
