# Lesson 1 — The Ask Grows: Two Stakeholders, Every Week

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 1 of 16**

## What you'll learn

- How a one-time report request turns into a recurring, multi-table BI solution
- Why "two stakeholders" changes the architecture, not just the page count
- The real shape of this project's data: AdventureWorks2012's sales and fulfillment tables
- The roadmap for this chapter's 16 lessons, including the real bug you'll fix in Lessons 10-12

## A quick recap, if you built the Beginner project

In the Beginner capstone, Carraway Supply Co.'s Sales Director asked one question — "how did each
region do last quarter?" — and you answered it with a single T-SQL extract query, a one-page Power
BI dashboard, and a presentation. It was a one-time pull: you ran the query, built the report,
showed it once, and moved on. If you haven't built that project, nothing here depends on it line
by line — just know that Carraway Supply Co. is the same fictional office and industrial supply
distributor, and the data source is the same real `AdventureWorks2012` database you already have
access to in SQL Server Management Studio.

## The ask grows

The regional snapshot worked well enough that word got around the office. Now two people want a
piece of it, and neither wants a one-off:

- **The Sales Director** wants an **executive summary** — total sales, average order value, a
  trend line — refreshed automatically every week, so it's always current when the Monday
  leadership meeting rolls around. No more "can you re-run that for me."
- **The Operations Manager** wants to **drill into specific regions and product lines** — not a
  single summary number, but a page she can filter and slice herself, down to subcategory and
  territory, to spot where orders are piling up or shipping late.

Two stakeholders, two different jobs, from the same underlying data. That's the real-world
pattern that turns a single query into an actual BI solution: one data model, multiple report
pages, each built for how its audience actually uses it.

## Why "recurring" changes everything

A one-time pull only has to be *correct once*. A recurring report has to be:

- **Repeatable** — the same query logic has to run again next week without you retyping it.
- **Scheduled** — Power BI has to refresh the data on its own, not wait for you to open Power BI
  Desktop and republish.
- **Model-driven, not just query-driven** — with two pages pulling different cuts of the same
  numbers, you need real tables with real relationships behind them, not one flat `SELECT` result
  pasted into a single visual.

Each of those is its own lesson in this chapter: staging the query (Lesson 4), building an actual
data model with relationships (Lesson 5), and scheduling the refresh in the Power BI Service
(Lesson 9).

## The real tables behind this project

Everything in this chapter comes from `AdventureWorks2012` — the same real database, no invented
tables:

| Table | What it holds |
|---|---|
| `Sales.SalesOrderHeader` | One row per order: order date, due date, ship date, territory |
| `Sales.SalesOrderDetail` | One row per order **line**: product, quantity, line total |
| `Sales.SalesTerritory` | Region names and groupings (e.g. North America, Europe, Pacific) |
| `Production.Product` | Product names |
| `Production.ProductSubcategory` | Product subcategory names, for the Ops Manager's drill-down |

Lesson 3 writes the multi-table query that pulls these together.

## The honest part of this project: a real bug

Every multi-page, multi-table Power BI report eventually runs into this: two visuals that are
supposed to show "the same number" don't. This project includes that moment on purpose. After
Lessons 7-9 publish the Executive Summary page, the Drill-Down page, and the scheduled refresh,
Lessons 10-12 walk through noticing the mismatch, finding the real DAX cause, and fixing it —
because knowing how to diagnose a wrong number is as much a real BI skill as building the report
in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Recurring report | A report refreshed on a schedule, not re-pulled by hand each time |
| Stakeholder requirements | The specific, different thing each audience needs from the same data |
| Executive summary | A small set of headline numbers built for a time-constrained audience |
| Drill-down page | A filterable, detailed page built for an audience that explores the data |

## Lab

Before touching SQL, write out the requirements in plain English, the way you would in a real
discovery conversation. For the Sales Director's executive summary, list the 3-4 numbers that
belong on it. For the Operations Manager's drill-down page, list the 2-3 dimensions she needs to
filter or slice by. Keep both lists short — you'll hold yourself to them in Lesson 2.

## Check yourself

You're ready for Lesson 2 when you can answer, without looking: why does a *recurring, two-page*
report need a real data model with relationships, instead of just one bigger flat query result
like the Beginner project used?
