# Lesson 1 — The Business Ask: One Question, One Stakeholder

**Chapter 1 · Beginner Capstone: Regional Sales Snapshot · Lesson 1 of 10**

## What you'll learn

- Why "something simple" is never actually simple until you ask follow-up questions
- The four things every reporting request needs before you touch a keyboard: time window, scope, metric, and audience
- How to turn a hallway conversation into a one-paragraph requirement you could hand to anyone

## The ask

You work in the BI function at **Carraway Supply Co.**, a mid-size office and industrial
supply distributor. The Southeast regional sales manager stops by your desk on a Thursday
afternoon:

> "Can you put together something simple showing how sales are doing by region and product
> line this quarter? I just need to glance at it before our Monday call."

That's it. No ticket, no spec, no existing report to extend. One stakeholder, one sentence,
and a deadline four days out. This is exactly how most real BI work starts — not as a fully
scoped project, but as a request that sounds simple and isn't, yet.

## Why "simple" is a trap

"Something simple" is doing a lot of hiding in that sentence. If you start building before
asking anything, you'll guess wrong on at least one of these, and you won't find out until
Monday morning:

- **"This quarter"** — the current calendar quarter? The company's fiscal quarter (which may
  not match the calendar)? Quarter-to-date as of today, or the full quarter including days
  that haven't happened yet?
- **"By region"** — every sales territory in the company, or just the regions this manager
  actually oversees?
- **"How sales are doing"** — total revenue? Number of orders? Both? Compared to what — last
  quarter, the same quarter last year, or no comparison at all, just the raw numbers?
- **"Product line"** — Carraway's `Production.Product` data groups items by category and
  subcategory. Does "product line" mean category, subcategory, or something coarser the
  manager has in their head?

None of these are hard questions. They're just questions nobody asked yet.

## Turning a vague ask into a specific one

The skill this lesson teaches isn't SQL or Power BI — it's **requirements clarification**,
and it's the single most valuable five minutes you'll spend on this whole project. A short
follow-up conversation (in person, by chat, or by a quick email) gets you concrete answers:

- **Time window**: this calendar quarter to date, refreshed whenever the manager looks at it.
- **Scope**: the Southeast territory group used company-wide in `Sales.SalesTerritory` — no
  need to invent a new regional breakdown.
- **Metric**: total sales amount **and** order count, both, side by side — the manager wants
  to see if a slow quarter is fewer orders or smaller ones.
- **Grouping**: product line, meaning the `ProductLine` field already on `Production.Product`
  (Carraway uses the same category you'd find on a standard AdventureWorks2012 install).
- **Audience and format**: one stakeholder, viewed on a laptop before a Monday call — not a
  printed handout, not a company-wide dashboard. That tells you it needs to be clear at a
  glance, not exhaustive.

Written down, the real ask becomes:

> *"Build a Power BI report showing total sales amount and order count for the current
> quarter, broken out by sales territory and product line, for the Southeast regional sales
> manager to review before a Monday call."*

That one sentence is now something you could hand to a teammate and get the same report back.
That's the test for whether a requirement is actually specific.

## What you're NOT building

Scoping also means saying what's out of bounds. This project does not need:

- A multi-year trend — just this quarter, because that's what was asked.
- Every region in the company — the stakeholder only cares about their own view, though you
  may choose to show all territories for context (decide and note why).
- A data warehouse or an ETL pipeline — this is one T-SQL query and one Power BI file, nothing
  more. Matching effort to the actual ask is part of professionalism, not a shortcut.

## Key terms

| Term | Meaning |
|---|---|
| Requirements clarification | Turning a vague request into a specific, answerable question before building anything |
| Scope | What is, and explicitly is not, included in the deliverable |
| Stakeholder | The person who asked for the report and will act on what it shows |
| Grain | The level of detail a report is built at — here, one row per territory + product line combination |

## Lab

Before writing any code, write your own one-paragraph requirement statement for the Carraway
ask, in your own words, covering: time window, scope (which regions), metric(s), and grouping.
Compare it against the example above — did you make the same assumptions, or different ones?
Either is fine, as long as you can defend the choice if the stakeholder asks.

## Check yourself

You're ready for Lesson 2 when you can state, from memory, the four questions you need
answered before writing a single query: what time window, what scope, what metric, and what
grouping — and explain why "something simple" almost never means "skip asking."
