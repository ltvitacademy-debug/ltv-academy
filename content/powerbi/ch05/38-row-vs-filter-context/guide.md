# Lesson 38 — Row Context vs. Filter Context

**Chapter 5 · DAX Fundamentals · Lesson 7 of 15**

## What you'll learn

- What "context" means in DAX, and why it's the concept everything else depends on
- What row context is, with a worked example
- What filter context is, with a worked example
- Why the same formula can produce a different result depending on where you put it

## The concept the rest of the chapter depends on

Every DAX formula is evaluated *within* something — a specific row, a
specific set of active filters, or both. That surrounding situation is
called **context**, and it's the single most important idea in DAX.
`CALCULATE`, iterator functions, the entire `ALL` family — every one of
them exists to read or change context in some way. Understanding it now
pays off for the rest of the chapter.

There are two kinds: **row context** and **filter context**.

## Row context: "the current row"

Row context is exactly what it sounds like — the current row a formula
is being evaluated for. It's most at home in calculated columns, which
you met in Lesson 34.

= [Freight] + [Tax]

This formula, in a calculated column, automatically knows which
**Freight** and which **Tax** to use: the ones in the current row. No
filter, no `WHERE` clause — DAX evaluates the formula once per row, and
row context supplies the values.

Row context also follows relationships. This formula reaches into a
*related* table to pull a value based on the current row:

= [Freight] + RELATED('Region'[TaxRate])

`RELATED` looks up the tax rate for the region tied to the current row —
still row context, just extended across a relationship.

## Filter context: "which rows count right now"

**Filter context** is different: it's the set of filters currently
narrowing down what a formula sees, layered on top of everything else.
Every slicer, every report filter, every value in a visual's rows or
columns adds to it.

Here's a measure that adds an *explicit* filter directly inside the
formula:

![Screenshot of a DAX formula in the formula bar, annotated with letters pointing to the measure name, CALCULATE function, the Total Sales measure being evaluated, and a filter on Channel equals Store.](/courses/power-bi/ch05/38-row-vs-filter-context/qsdax_4_context.png)
*Store Sales = CALCULATE([Total Sales], Channel[ChannelName] = "Store") — the filter argument is filter context, written directly into the formula.*

This measure doesn't just sum sales — it sums sales *only for rows where
the Channel is "Store."* That restriction, `Channel[ChannelName] =
"Store"`, is filter context, and `CALCULATE` (which you'll meet properly
next lesson) is what makes it possible to set filter context from inside
a formula instead of only from slicers and filters in the report.

## The same formula, two different results

This is why context matters so much: the exact same measure formula can
return a different number depending on the filter context surrounding
it. Put `[Total Sales]` on a report with no filters, and you get the
grand total. Add a **Year** slicer and select 2024, and the *same
measure* — unchanged — now returns just that year's total. The formula
never changed; the context around it did.

## Why this distinction matters

Mixing up row context and filter context is the single most common
source of confused DAX results. A calculated column only ever sees row
context — it has no idea what filters exist in a report, because it was
computed once, at refresh time, before any report filter existed. A
measure, by contrast, is constantly re-evaluated inside whatever filter
context the report currently has active. Keep that distinction straight,
and most of what feels mysterious about DAX starts making sense.

## Key terms

| Term | Meaning |
|---|---|
| Context | The surrounding situation — row, filters, or both — a formula is evaluated within |
| Row context | The "current row" a formula is evaluated for, most common in calculated columns |
| Filter context | The set of active filters narrowing down what a formula sees |
| RELATED | Pulls a value from a related table, using the current row context |

## Lab

1. On **AdventureWorks2012**'s `Sales.SalesOrderDetail`, write a
   calculated column `LineCheck = [OrderQty] * [UnitPrice]` — row
   context fills it in correctly for every row without any filter
   involved.
2. On **AdventureWorksDW2014**, put
   `Total Sales = SUM(FactInternetSales[SalesAmount])` on a report card
   with no filters, note the number, then add a `DimDate[CalendarYear]`
   slicer and change its selection — watch the same measure return a
   different number each time.
3. On `Sales.SalesOrderDetail`, try a calculated column using `RELATED`
   to pull `Sales.SpecialOffer[Category]` (via `SpecialOfferProduct`)
   across the relationship, if your model includes that table.

## Check yourself

You're ready for Lesson 39 when you can explain, in your own words, why
a calculated column's value doesn't change when a report's slicers
change, but a measure's value does.
