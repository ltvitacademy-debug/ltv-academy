# Lesson 108 — What Is a Data Warehouse?

**Chapter 12 · Data Warehouse Concepts · Lesson 2 of 12**

## What you'll learn

- The classic four-part definition of a **data warehouse**
- Why "time-variant" and "non-volatile" matter more than they sound like
  they should
- How `AdventureWorksDW2014` demonstrates all four properties for real
- Where the data in a warehouse actually comes from

## The classic definition

A **data warehouse** is a centralized store of data, pulled from one or
more source systems, structured specifically for reporting and analysis
rather than day-to-day transaction processing. The classic definition
(from Bill Inmon, one of the field's founding figures) breaks it into four
properties:

| Property | What it means |
|---|---|
| **Subject-oriented** | Organized around business subjects — sales, customers, products — not around whichever application happened to create the data |
| **Integrated** | Data from different sources is made consistent — same naming, same units, same formats — before it lands in the warehouse |
| **Time-variant** | The warehouse keeps *history*, not just the current state — you can ask "what did this look like a year ago?" |
| **Non-volatile** | Once loaded, data isn't updated or deleted in place — new facts are appended, old ones are kept |

## Seeing all four in AdventureWorksDW2014

`AdventureWorksDW2014` is subject-oriented around sales, products, and
customers — its central tables are literally named `FactInternetSales` and
`FactResellerSales`, not "the tables the web app happens to use."

It's time-variant in a way `AdventureWorks2012` genuinely isn't: every row
in `FactInternetSales` is anchored to a specific `OrderDateKey`, so the
warehouse can answer "how did sales look in 2011?" without losing anything
to updates that happened since. Compare that to `AdventureWorks2012`,
where an order's status can simply be updated in place — the *history* of
that change isn't preserved unless something else captures it.

```sql
-- Time-variant in action: real history, not just current state
SELECT d.CalendarYear, d.EnglishMonthName, SUM(f.SalesAmount) AS MonthlySales
FROM dbo.FactInternetSales AS f
JOIN dbo.DimDate AS d ON d.DateKey = f.OrderDateKey
WHERE d.CalendarYear = 2011
GROUP BY d.CalendarYear, d.EnglishMonthName, d.MonthNumberOfYear
ORDER BY d.MonthNumberOfYear;
```

It's non-volatile because that query will return the exact same numbers
every time you run it — nobody is going back and editing 2011's sales
figures the way an OLTP system might correct a typo in a customer's name.

## Where the data actually comes from

A warehouse doesn't originate data — it's *fed* by one or more OLTP
systems (and sometimes external sources) through a periodic loading
process. `AdventureWorksDW2014` is, conceptually, what you'd get if you
took `AdventureWorks2012`'s transactional history and reshaped it for
analysis. Lesson 112 covers exactly how that loading process works: ETL
vs. ELT.

## Key terms

| Term | Meaning |
|---|---|
| Data warehouse | A centralized, subject-oriented store built for reporting, not transactions |
| Subject-oriented | Organized around business concepts, not source applications |
| Time-variant | Preserves history instead of only the current state |
| Non-volatile | Data is appended, not updated or deleted, once loaded |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Confirm the warehouse holds multiple full years of history
SELECT DISTINCT d.CalendarYear
FROM dbo.FactInternetSales AS f
JOIN dbo.DimDate AS d ON d.DateKey = f.OrderDateKey
ORDER BY d.CalendarYear;
```

## Check yourself

You're ready for Lesson 109 when you can name, without looking, all four
properties of a data warehouse and explain what "time-variant" means in
practice.
