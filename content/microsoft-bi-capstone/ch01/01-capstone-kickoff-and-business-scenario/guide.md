# Lesson 1 — Capstone Kickoff & Business Scenario

**Chapter 1 · Capstone Overview · Lesson 1 of 25**

## What you'll learn

- What this capstone actually is: one project that uses every tool from
  every prior course in this program, wired together into a single
  working pipeline
- The business process this capstone models — **manufacturing work
  orders** — and why it's a genuinely new scenario, not a repeat of the
  Sales process (SSIS Development, SSRS Development) or the Procurement
  process (Data Modeling & Data Warehousing) already built elsewhere in
  this catalog
- The real `AdventureWorks2012` tables involved
- How this course is structured, chapter by chapter, from build to job
  search

## What this capstone is

Every course before this one taught one piece of the Microsoft BI
stack in isolation: T-SQL Development taught you to query and design a
database. SSIS Development taught you to move data. SSRS Development
taught you to report on it. Power BI's track taught you to visualize
it. Data Modeling & Data Warehousing taught you to design the warehouse
those pieces feed into.

This capstone is where those stop being five separate skills and
become one job. You're going to build a single pipeline — raw data
loaded into SQL Server, moved and transformed by an SSIS package,
landed into a dimensionally modeled warehouse, then read by both an
SSRS paginated report and a Power BI dashboard — and you're going to
build it end to end, the way you'd actually be asked to at a real BI
developer job.

## The business scenario: manufacturing work orders

SSIS Development's capstone (`CapstoneFactOrderSales`) and SSRS
Development's capstone (`RegionalSalesSummary` /
`OrderDetailByTerritory`) both modeled **Sales**. Data Modeling & Data
Warehousing's capstone deliberately modeled **Procurement** instead,
specifically because `AdventureWorksDW2014` has no purchasing fact
table to fall back on.

This capstone picks a third, still-unused business process:
**manufacturing work orders** — how AdventureWorks tracks the physical
production of the bikes it sells. It's captured in a small, real set of
`AdventureWorks2012` tables:

| Table | What it holds |
|---|---|
| `Production.WorkOrder` | One row per work order — the product being built, quantity ordered, quantity scrapped, start/end/due dates |
| `Production.Product` | The product being manufactured |
| `Production.Location` | The physical work-center location where production happens |
| `Production.ScrapReason` | Why a unit was scrapped, when it was (a small reference table) |

A work order is a genuinely different kind of business event from a
sales order or a purchase order: it has a planned quantity, an actual
quantity produced, a scrapped quantity, and a due date that may or may
not be met. That gives this capstone's fact table a different shape
from either of the other two — which matters, because part of the
point of this course is proving you can make dimensional modeling
decisions on a business process you haven't already memorized the
answer for.

## Why this scenario fits a full-stack capstone

Chapter 2 of this course builds the entire pipeline against this
scenario: raw work order data loaded into SQL Server (Lesson 3), moved
by an SSIS package (Lesson 4), landed into staging and warehouse tables
(Lesson 5), modeled as facts and dimensions (Lesson 6), then read by an
SSRS paginated report (Lesson 7) and a Power BI dashboard (Lesson 8) —
both pointed at the *same* warehouse tables, which Lesson 9 confirms
directly. Lessons 10 and 11 then stress-test the finished pipeline:
validating it end to end, and handling a schema change that shows up
late, the way real production changes actually do.

## How this course is structured

| Chapter | Focus |
|---|---|
| 1. Capstone Overview | This lesson, plus architecture planning (Lesson 2) |
| 2. Building the Full Stack | The entire pipeline, tool by tool (Lessons 3-11) |
| 3. Production Practices | Deployment, scheduling, documentation, monitoring (Lessons 12-15) |
| 4. Job Preparation | Resume, portfolio, interviews, negotiation, job postings (Lessons 16-23) |
| 5. Wrap-Up | Presenting the finished capstone and closing out the program (Lessons 24-25) |

Chapters 1-3 are the technical project. Chapters 4-5 turn that finished
project into the thing that actually gets you hired — this is the last
course in the Microsoft Data & BI Developer program, and it ends with
a job search, not just a finished database.

## Key terms

| Term | Meaning |
|---|---|
| Full-stack BI pipeline | The complete path from raw source data to a finished report or dashboard, passing through every tool a BI developer role touches |
| Work order | A manufacturing instruction to produce a quantity of a product, with a planned quantity, an actual quantity, and a due date |
| Scrap | Units of a work order that failed and were not usable — a quantity a BI developer would be asked to report on and explain |

## Lab

1. In SSMS, against `AdventureWorks2012`, run:
   ```sql
   SELECT COUNT(*) AS WorkOrders FROM Production.WorkOrder;
   SELECT MIN(StartDate) AS Earliest, MAX(EndDate) AS Latest
   FROM Production.WorkOrder;
   SELECT TOP 10 * FROM Production.WorkOrder ORDER BY WorkOrderID;
   ```
   Note the row count and date range — you'll use both again in Lesson
   5 when you scope the warehouse tables.
2. Run `SELECT * FROM Production.ScrapReason;` and skim it. It's a
   small table, but it's exactly the kind of reference data a real
   dimension gets built from.
3. Write two or three sentences, in your own words, describing what
   "manufacturing work orders" means as a business process — you'll
   need this exact framing again in Lesson 24 when you present the
   finished capstone.

## Check yourself

You're ready for Lesson 2 when you can name the five tools this
capstone's pipeline passes through, in order, and explain why
manufacturing work orders was chosen as this capstone's business
process instead of reusing Sales or Procurement.
