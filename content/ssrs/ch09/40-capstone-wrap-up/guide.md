# Lesson 40 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 9 · Capstone · Lesson 40 of 40 — Course Finale**

## What you'll learn

- How to check the finished report suite against Lesson 38's original
  scope
- How to present this project the way a real employer would want to
  see it — not just "it runs," but "here's what it demonstrates"
- How to turn three lessons of work into a specific set of resume and
  portfolio talking points
- Where to go next in this catalog, now that SSRS Development is
  complete

## Checking against Lesson 38's scope

Pull Lesson 38's architecture table back up and confirm, piece by
piece, that the finished suite actually does what it set out to do:

| Piece | What Lesson 38 promised | What the suite does now |
|---|---|---|
| Summary report | A matrix of sales by territory and year | `RegionalSalesSummary.rdl` — matrix over `AdventureWorksDW2014`, grouped by region and year (Lesson 39) |
| Parameters | A cascading territory-group parameter and a multi-value year parameter | `@TerritoryGroup` (single-value, query-driven) and `@CalendarYear` (multi-value), both filtering the dataset's own query (Lesson 39) |
| Drillthrough | Clicking a summary cell jumps to the detail report with context | The matrix data cell's "Go to report" action, passing `TerritoryID` and `Year` (Lesson 39) |
| Detail report | The real order line items behind a summary number | `OrderDetailByTerritory.rdl` — grouped table over `AdventureWorks2012`, reachable only via drillthrough (Lesson 39) |

If every row in that table has a real answer, the project is done — not
because it has extra features nobody asked for, but because it does
exactly what Lesson 38 scoped, and does it as one connected suite
rather than two unrelated reports.

## Presenting it like a real project

A working report suite isn't the same thing as a report suite someone
else can evaluate in five minutes. When you show this off — to a
mentor, in an interview, or just to future-you — walk through it in
this order:

1. **State the problem in one sentence**, not the implementation:
   "This report suite gives a manager a summarized view of sales by
   territory and year, with a one-click path down to the actual orders
   behind any number that looks interesting."
2. **Show the summary report first**, and explain the two parameters
   in plain language — what a viewer can change, and why the query
   itself (not just the display) responds to those changes.
3. **Show the drillthrough second**, and be ready to explain *why*
   `OrderDetailByTerritory`'s parameters are Internal — that one design
   decision is a fair proxy for whether you actually understand
   report-to-report navigation, not just Report Builder's UI.
4. **Show the detail report last**, and frame it as the difference
   between "a single report with a lot of numbers" and "a suite that
   lets someone actually investigate one of them."

## Turning this into resume and portfolio language

You can't attach a live paginated report to a resume, but you can
describe it precisely. A version worth using:

> Built a two-report paginated report suite in SQL Server Reporting
> Services: a parameter-driven matrix summarizing warehouse sales data
> by territory and year, with a drillthrough action linking each cell
> to a detail report querying live transactional order data — filtered
> entirely by parameters passed from the summary report.

Every clause in that sentence maps back to something you actually
built in Lesson 39, not something you're claiming. If you keep both
`.rdl` files and a short README describing the two databases and the
architecture table above, that's a real, inspectable portfolio artifact
— something Chapter 7's subscription concepts would turn into an actual
scheduled email delivery in a real workplace.

## What you've built, across nine chapters

Chapter 1 taught you the Report Server, Report Builder, and SSDT.
Chapter 2 gave you the datasets, tables, and matrices this capstone's
two reports are built from. Chapter 3 gave you the parameters — single,
multi-value, cascading, internal — this capstone's filtering depends
on entirely. Chapters 4 and 5 covered the expression, formatting, and
charting vocabulary that would extend a suite like this one further.
Chapter 6 gave you the drillthrough action this capstone's two reports
are linked by. Chapter 7 covers exactly how a finished suite like this
gets delivered on a schedule instead of run on demand. Chapter 8 covers
the security and administration a real deployment of this suite would
need on a shared Report Server.

## Where to go from here

- **Data Modeling & Data Warehousing**, this catalog's next course,
  goes deeper into the star-schema design decisions behind
  `AdventureWorksDW2014` — why `DimSalesTerritory` and `FactInternetSales`
  look the way they do, and how to design tables like that from scratch
  instead of being handed them.
- **Microsoft Data & BI Capstone + Job Preparation**, later in this
  catalog, is where a project like this one gets folded into a full
  portfolio alongside your T-SQL, SSIS, and Power BI work.
- If you want more practice with this same pattern, rebuild it against
  a different pair of tables — `DimProduct`/`Production.Product` instead
  of territory and date — using the identical
  Dataset/Layout/Parameters/Drillthrough shape.

## Check yourself

The course is complete when you can hand someone both `.rdl` files and
the architecture table above, and they can tell — without watching you
click through it — exactly what each report does, how the two are
connected, and why the detail report's parameters are Internal.

Congratulations — you've built a real paginated report suite, start to
finish.
