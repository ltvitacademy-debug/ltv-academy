# Regional Sales Snapshot — Core DAX Measures Reference

Beginner Capstone, Lesson 6: "Writing the Core DAX Measures." Keep this open
in Power BI Desktop while you build the three measures the dashboard runs on.

## Total Sales

```dax
Total Sales = SUM(RegionalSalesSnapshot[TotalSalesAmount])
```

Adds up every value of `TotalSalesAmount` currently visible to the measure —
all rows with nothing filtering the report, or just one territory's rows once
the Lesson 7 slicer narrows it down.

## Order Count

```dax
Order Count = SUM(RegionalSalesSnapshot[OrderCount])
```

This is `SUM`, not `COUNT` or `DISTINCTCOUNT` — the counting already happened
in T-SQL (Lesson 3's `COUNT(DISTINCT SalesOrderID)`), so `OrderCount` is
already a column of numbers. Summing those pre-counted numbers gives the
right total; `DISTINCTCOUNT` on this column would count something meaningless.

## Average Order Value

```dax
Average Order Value = DIVIDE([Total Sales], [Order Count])
```

Built on the first two measures, not the raw columns, so it automatically
stays correct under any filter. `DIVIDE` returns blank instead of erroring if
`[Order Count]` is ever zero for a filtered combination — a real possibility
once the region slicer exists.

## Where to put them

All three live in the Power BI model as measures (Fields pane → right-click
the table → New measure), never baked into the T-SQL query and never as
calculated columns, so they can be reused across the KPI cards, the chart,
and the table without being duplicated anywhere.

## Quick self-check

- [ ] `Total Sales` matches the T-SQL query's total, unfiltered
- [ ] `Order Count` uses `SUM`, not `DISTINCTCOUNT` — can you say why?
- [ ] `Average Order Value` uses `DIVIDE`, not `/` — can you say why?
