# Lesson 1 — The Business Ask: One Question, One Stakeholder

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 1 of 10**

## What you'll learn

- Why "show me how we're doing" is never actually one question until you ask follow-ups
- The four things every reporting request needs before you touch a keyboard: time window, scope, metric, and audience
- How to turn a hallway conversation into a one-paragraph requirement you could hand to anyone

## The ask

You work in the BI function at **Thornbury Cycle Supply Co.**, a reseller of Adventure Works
Cycles products. The Merchandising Manager stops by your desk on a Tuesday morning, a few days
before a broader pricing review meeting:

> "Can you show me how our product categories are doing this quarter? I want one dashboard I
> can pull up in the pricing review."

That's it. No ticket, no spec, no existing report to extend. One stakeholder, one sentence, and
a meeting on the calendar. This is exactly how most real BI work starts — not as a fully scoped
project, but as a request that sounds simple and isn't, yet.

## Why "how we're doing" is a trap

That sentence is doing a lot of hiding. If you start building before asking anything, you'll
guess wrong on at least one of these, and you won't find out until you're standing in the
pricing review:

- **"This quarter"** — the current calendar quarter? Quarter-to-date as of today, or the full
  quarter including days that haven't happened yet?
- **"Product categories"** — Thornbury's data groups products into categories, subcategories,
  and individual products (`Production.ProductCategory`, `Production.ProductSubcategory`,
  `Production.Product`). Does "categories" mean the top-level grouping, or something finer?
- **"How they're doing"** — total revenue? Number of orders? Both? Compared to anything, or
  just the raw numbers for this quarter alone?
- **"One dashboard"** — a single page meant to be glanced at during a meeting, or something the
  manager will keep open and explore for the rest of the quarter?

None of these are hard questions. They're just questions nobody asked yet.

## Turning a vague ask into a specific one

The skill this lesson teaches isn't SQL or Power BI — it's **requirements clarification**, and
it's the single most valuable five minutes you'll spend on this whole project. A short
follow-up conversation gets you concrete answers:

- **Time window**: the current calendar quarter to date, refreshed whenever the manager looks
  at it before the meeting.
- **Scope**: every product category Thornbury sells — the pricing review covers the whole
  catalog, not one category in isolation.
- **Metric**: total sales amount **and** order count, both, side by side — the manager wants to
  see whether a category's revenue is being driven by more orders or by bigger ones.
- **Grouping**: product **category** specifically — the top level of
  `Production.ProductCategory` — not subcategory. The pricing review is a category-level
  conversation; subcategory detail would be more than that meeting needs.
- **Audience and format**: one stakeholder, pulled up live during a meeting — not a printed
  handout, not a company-wide dashboard. That tells you it needs to be clear at a glance, not
  exhaustive.

Written down, the real ask becomes:

> *"Build a Power BI report showing total sales amount and order count for the current quarter,
> broken out by product category, for the Merchandising Manager to review ahead of the
> quarterly pricing review meeting."*

That one sentence is now something you could hand to a teammate and get the same report back.
That's the test for whether a requirement is actually specific.

## What you're NOT building

Scoping also means saying what's out of bounds. This project does not need:

- Subcategory-level detail — the pricing review is a category-level conversation; that's a
  reasonable follow-up project, not this one.
- A multi-quarter trend — just this quarter, because that's what was asked.
- Pricing recommendations — this report shows how categories are *performing*; deciding what to
  do about pricing is the meeting's job, not the dashboard's.

## Key terms

| Term | Meaning |
|---|---|
| Requirements clarification | Turning a vague request into a specific, answerable question before building anything |
| Scope | What is, and explicitly is not, included in the deliverable |
| Stakeholder | The person who asked for the report and will act on what it shows |
| Grain | The level of detail a report is built at — here, one row per product category |

## Lab

Before writing any code, write your own one-paragraph requirement statement for the Thornbury
ask, in your own words, covering: time window, scope, metric(s), and grouping. Compare it
against the example above — did you make the same assumptions, or different ones? Either is
fine, as long as you can defend the choice if the stakeholder asks.

## Check yourself

You're ready for Lesson 2 when you can state, from memory, the four questions you need answered
before writing a single query: what time window, what scope, what metric, and what grouping —
and explain why "categories" needed clarifying before you could pick a table to group by.
