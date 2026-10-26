# Lesson 6 — Writing the Core DAX Measures

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 6 of 10**

## What you'll learn

- Why measures, not raw columns, should power the KPI cards and chart
- Two real DAX measures: `Total Sales` and `Order Count`
- A third measure, `Average Order Value`, built on top of the first two

## Why measures instead of dragging the column straight on

The query from Lesson 3 already returns a `TotalSalesAmount` column and an `OrderCount` column
— it's possible to drag those columns straight onto a KPI card and get a number. But this
project uses **DAX measures** instead, for a reason that matters beyond this one report:
measures recalculate correctly as filters change. Add a category slicer in Lesson 7, and a
measure recalculates `Total Sales` for whatever's selected. A raw column dragged onto a card
does the same thing here only because the data happens to already be aggregated — in a bigger
model, with unaggregated rows, that raw-column shortcut breaks immediately. Building the habit
of writing a measure, even when a shortcut would technically work today, is the real skill.

## Total Sales

```dax
Total Sales = SUM(CategoryPerformanceSnapshot[TotalSalesAmount])
```

`SUM` adds up every value of `TotalSalesAmount` that is currently visible to the measure — all
rows, if nothing is filtering the report, or just the row for one category, if a slicer is
narrowing it. The column already holds pre-aggregated dollar amounts from the T-SQL `GROUP BY`,
so `SUM` here is adding across category rows, not across individual transactions — correct
either way, because `SUM` always adds whatever rows are in view.

## Order Count

```dax
Order Count = SUM(CategoryPerformanceSnapshot[OrderCount])
```

This one deserves a pause: it's `SUM`, not `COUNT` or `DISTINCTCOUNT`. That's because the
counting already happened in T-SQL — `OrderCount` is a column of **numbers**, one per category
row, each already the result of `COUNT(DISTINCT SalesOrderID)` from Lesson 3. Summing those
pre-counted numbers across rows gives the right total. Using
`DISTINCTCOUNT(CategoryPerformanceSnapshot[OrderCount])` here would be wrong — that would count
how many *distinct order-count values* appear, a meaningless number, not how many orders there
were. The lesson to take: match the DAX function to what the column actually contains, not to
what the measure's name suggests.

## Average Order Value

```dax
Average Order Value = DIVIDE([Total Sales], [Order Count])
```

This measure builds directly on the first two — referencing `[Total Sales]` and `[Order Count]`
rather than the raw columns, so it automatically stays correct under any filter the first two
measures already handle correctly. `DIVIDE` is used instead of a plain `/` because `DIVIDE`
returns blank (instead of raising a division-by-zero error) if `[Order Count]` is ever zero for
a filtered combination — a real possibility once a category slicer exists in Lesson 7, if a
category somehow had no orders this quarter.

## Where these measures go

All three measures live in the Power BI model (right-click the table in the **Fields** pane →
**New measure**, or use the formula bar), not baked into the T-SQL query and not as calculated
columns. Keeping them as measures means they can be reused on the KPI cards, the bar chart, and
the table without being recalculated or duplicated anywhere.

## Key terms

| Term | Meaning |
|---|---|
| Measure | A DAX calculation that responds dynamically to whatever filters are applied |
| `DIVIDE` | A safe division function that returns blank instead of erroring on divide-by-zero |
| Pre-aggregated column | A column that already holds a summarized value (like `OrderCount` here), changing which DAX function is correct to use on it |

## Lab

Create all three measures in your Power BI model. Put `Total Sales` and `Order Count` on the two
KPI cards from Lesson 5's sketch, and confirm the numbers match what the T-SQL query returned
for the whole quarter (no filters applied yet).

## Check yourself

You're ready for Lesson 7 when you can explain why `Order Count` uses `SUM`, not
`DISTINCTCOUNT`, and why `Average Order Value` uses `DIVIDE` instead of a plain division
operator.
