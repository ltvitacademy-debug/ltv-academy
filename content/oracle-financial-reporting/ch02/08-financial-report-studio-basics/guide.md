# Financial Report Studio Basics

You've toured the Financial Reporting Center and run a seeded statement. Now it's time to open the hood: what is a Financial Reporting Studio report actually made of? This lesson covers the building blocks — the GL balances cube, rows, columns, and the point-of-view dimensions — before you build a simple report of your own in lesson 9.

## What you'll learn

- The GL balances cube: the data source every Financial Reporting Studio report is built against
- Rows and columns as the two core structural building blocks
- Members, and how a row or column references a specific account, account hierarchy, or other dimension value
- Where formulas and calculated rows fit in

## The GL balances cube

Financial Reporting Studio does not query the General Ledger's transactional tables directly. It queries a **GL balances cube** — a multidimensional summary structure (conceptually similar to the kind of OLAP cube used across Oracle's EPM products) built from posted GL balances, organized along dimensions such as ledger, period, account, cost center, and company or balancing segment. Because the cube is pre-summarized, a report can pull a balance for "Account 6100, Period 3, Ledger US Operations" quickly, without scanning every journal line.

This matters practically: a Financial Reporting Studio report is only as current as the cube's last refresh, and a report author needs to understand the cube's dimensions (which segments exist, what hierarchies are defined) to know what's even possible to build.

## Rows and columns: the two axes of every report

A Financial Reporting Studio grid, like a spreadsheet, is built from rows and columns:

- **Rows** typically represent the thing you're reporting *on* — individual accounts, account ranges, or summary lines like "Total Revenue" built from an account hierarchy or a formula.
- **Columns** typically represent the *point of view* being compared across — commonly periods (January, February, March) or scenarios (Actual vs. Budget), so a reader can scan left to right and see a trend or a variance.

A classic Income Statement, for example, has revenue and expense accounts as rows, and a handful of recent periods as columns, with a final column computing the variance between two of them.

## Members: what a row or column actually points at

Each row or column is defined by referencing one or more **members** — specific values (or ranges, or hierarchy nodes) from a dimension in the cube. A row might point at a single account, a range of accounts ("6000 to 6999"), or a parent node in an account hierarchy that automatically rolls up all its children. Understanding members is the difference between a report that updates correctly when new child accounts are added to the chart of accounts, and one that silently misses them because it referenced accounts individually instead of through a hierarchy.

## Formulas and calculated rows

Beyond members pulled straight from the cube, a row (or column) can be a **formula** — a calculation combining other rows, such as "Gross Margin = Total Revenue − Total Cost of Goods Sold," or a variance column computed as "Actual − Budget." Formula rows don't pull a balance from the cube directly; they compute a result from other rows already on the report.

## Putting it together

A finished Financial Reporting Studio report is, at its core: a point of view (which slice of the cube), a set of row definitions (members, hierarchies, or formulas), and a set of column definitions (typically periods or scenarios), rendered into a formatted grid with headers, fonts, and page setup on top. Everything from here is refinement of those same three ingredients.

## Recap

Every Financial Reporting Studio report is built from the GL balances cube, structured into rows (what you're reporting on — accounts, hierarchies, formulas) and columns (the point of view being compared — periods, scenarios), with each row or column referencing specific members in the cube. Next up, lesson 9: using these building blocks to construct a simple financial report from scratch.
