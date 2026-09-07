# Lesson 47 — Building a Date Table

**Chapter 6 · Dates & Time Intelligence · Lesson 1 of 5**

## What you'll learn

- Why time intelligence functions need a dedicated date table
- Auto date/time vs. a table you build and mark yourself
- How to mark a table as a date table, step by step
- The four validation rules Power BI checks before accepting it

## Why dates need special treatment

Every DAX function you'll meet in this chapter — `DATEADD`, `TOTALYTD`,
`DATESBETWEEN`, and the rest — depends on being able to reason about a
contiguous, gap-free sequence of dates. Your fact table's date column
almost never provides that on its own: it only contains dates where a
transaction actually happened, with gaps on days nothing sold.

That's what a **date table** solves — a table with one row for every
single day in a range, whether or not anything happened that day. Time
intelligence functions are built to work against a table shaped exactly
like this.

## Auto date/time: Power BI's default

By default, Power BI Desktop automatically detects date columns and
builds hidden date tables and hierarchies behind the scenes — this is
**auto date/time**. It's convenient, and it's why you've already been
able to drill into Year → Quarter → Month → Day on a date field without
building anything yourself.

Many modelers prefer building their own date table instead — using
`CALENDAR` (Lesson 48) or importing one from a source like
`AdventureWorksDW2014`'s `DimDate`. Doing so gives you control over
fiscal years, custom holidays, and exactly which hierarchy levels exist.

## Marking a table as your date table

Once you have a table shaped like a date table, tell Power BI to use it
by right-clicking it in the Fields pane and choosing **Mark as date
table**:

![Screenshot of the Fields pane context menu with "Mark as date table" highlighted for a table named Time.](/courses/power-bi/ch06/47-date-table/date-tables_02.png)
*Right-click the table (here, "Time") → Mark as date table → Mark as date table.*

Then pick which column holds the actual date values:

![Screenshot of the "Mark as date table" dialog, with a Date column dropdown showing "Validated successfully."](/courses/power-bi/ch06/47-date-table/date-tables_03.png)
*Select the date column and confirm — "Validated successfully" means Power BI accepted it.*

## The four validation rules

Power BI checks your chosen column against four rules before accepting
it as a date table:

| Rule | What it means |
|---|---|
| Unique values | No date can repeat — exactly one row per day |
| No null values | Every row must have an actual date |
| Contiguous dates | No gaps — every day between the first and last date must exist |
| Consistent timestamp (if Date/Time) | If the column includes a time portion, it must be identical on every row |

If any rule fails, Power BI rejects the table and tells you why — most
often it's a gap (a day with no row at all) or a duplicate date.

## When you must mark one explicitly

You don't always have to mark a date table by hand — auto date/time
often covers you. You **do** need to mark one explicitly when:

- Your relationship to the date table is built on a surrogate key
  column (like `20241231` as a whole number) rather than an actual
  Date/Time column — common in data warehouses like
  `AdventureWorksDW2014`.
- You're using the classic time intelligence functions this chapter
  covers (as opposed to newer calendar-based time intelligence).
- You want advanced date filtering in Excel PivotTables built on your
  Power BI data.

Marking a table as a date table replaces any auto-generated hidden date
table Power BI had built for that column — so do this before building
visuals or DAX expressions that depend on the auto-generated hierarchy,
where possible.

## Key terms

| Term | Meaning |
|---|---|
| Date table | A table with one row per day, gap-free, over a contiguous range |
| Auto date/time | Power BI's automatic, hidden date table generation |
| Mark as date table | The explicit setting that tells Power BI which table and column to use for time intelligence |

## Lab

1. Import **AdventureWorksDW2014**'s `DimDate` table (it's already
   shaped correctly — one row per day, no gaps).
2. Right-click `DimDate` in the Fields pane, choose **Mark as date
   table**, and select `FullDateAlternateKey` as the date column.
   Confirm it validates successfully.
3. Note that `FactInternetSales` relates to `DimDate` through
   `OrderDateKey` — a whole-number surrogate key, not the date column
   itself. This is exactly the "different data type" scenario that
   requires explicitly marking the date table.

## Check yourself

You're ready for Lesson 48 when you can list, from memory, the four
validation rules Power BI checks before accepting a date table.
