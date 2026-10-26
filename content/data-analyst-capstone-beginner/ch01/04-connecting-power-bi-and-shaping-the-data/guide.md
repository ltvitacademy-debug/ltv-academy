# Lesson 4 — Connecting Power BI and Shaping the Data

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 4 of 10**

## What you'll learn

- Why this report uses Import mode, not DirectQuery
- Connecting Power BI Desktop to SQL Server with a native query
- The Power Query cleanup every import needs: names, types, and a sanity check

## Choosing Import mode

Power BI can connect to SQL Server two ways: **Import** (Power BI copies the query result into
its own compressed in-memory model) or **DirectQuery** (Power BI sends live queries to SQL
Server every time a visual needs data). For this project, Import is the right call:

- The dataset is tiny — at most four rows, one per product category, for a single quarter,
  nowhere near the size where Import's memory cost becomes a problem.
- The stakeholder only needs to pull this up during a meeting, not watch numbers change in real
  time — a manual or scheduled refresh is more than enough freshness.
- Import gives faster-feeling visuals and lets you build and test the report in Power BI Desktop
  without the AdventureWorks2012 server needing to be reachable every time you open the file.

## Connecting with the Lesson 3 query

Rather than importing the raw tables and rebuilding the five-table join and aggregation inside
Power BI, this report connects using the **exact T-SQL query from Lesson 3** as a native query:

1. In Power BI Desktop: **Get Data → SQL Server**.
2. Enter the server name, and expand **Advanced options**.
3. Paste the full Lesson 3 query into the **SQL statement** box, then **OK**.
4. Power BI runs the query against AdventureWorks2012 and shows a preview of exactly the three
   columns from the `SELECT` list: `CategoryName`, `TotalSalesAmount`, `OrderCount`.
5. Choose **Load** to bring it in as-is, or **Transform Data** to open Power Query first — for
   this project, always choose Transform Data, so the next few checks happen before anything is
   loaded.

Doing the joins, filtering, and grouping in T-SQL instead of in Power Query keeps the heavy
lifting on the database server, where it belongs, and keeps the Power Query step simple: a tiny,
already-shaped table, not millions of raw rows.

## What to check in Power Query

Even though the query already aggregates everything correctly, three housekeeping checks belong
in Power Query before loading:

- **Column names**: the query's aliases (`CategoryName`, `TotalSalesAmount`, `OrderCount`) are
  already report-friendly, so no renaming should be needed — but confirm it. If a column came
  through as `Column1` or similar, rename it here, not later in DAX.
- **Data types**: confirm `TotalSalesAmount` is typed as a **Decimal Number** or **Fixed Decimal
  Number**, and `OrderCount` as a **Whole Number**. SQL Server's `money`/`numeric` types
  sometimes import as text if the connector guesses wrong — catching that here avoids DAX
  measures that silently fail or return blank later.
- **Row count sanity check**: this report should load **at most four rows** — one per
  AdventureWorks2012 product category (Bikes, Components, Clothing, Accessories), fewer if any
  category had zero sales this quarter. If it's zero, the quarter filter excluded everything
  (check today's date against the data); if it's more than four, the `GROUP BY` or a join
  condition from Lesson 3 is wrong, and it's worth going back to check before loading further.

## Naming the query

Rename the query itself (right panel, under **Queries**) from the generic default to something
a stakeholder-facing report deserves — `CategoryPerformanceSnapshot` — since this name appears
in the Power BI data model and should describe what it holds, not just "Query1."

## Key terms

| Term | Meaning |
|---|---|
| Import mode | Power BI copies and compresses the query result into its own model |
| DirectQuery mode | Power BI queries the source live for every visual interaction |
| Native query | A hand-written SQL statement passed through to the source, instead of letting the connector build one |

## Lab

Connect Power BI Desktop to AdventureWorks2012 using **Get Data → SQL Server**, paste in the
Lesson 3 query as a native query, and open **Transform Data**. Confirm all three columns have
correct names and types, confirm the row count is four or fewer, rename the query to
`CategoryPerformanceSnapshot`, and then **Close & Apply**.

## Check yourself

You're ready for Lesson 5 when you can explain why this report uses Import mode instead of
DirectQuery, why running the joins and aggregation in T-SQL (rather than in Power Query) was the
right call, and what row count this specific query should never exceed.
