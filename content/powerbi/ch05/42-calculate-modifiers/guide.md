# Lesson 42 — CALCULATE Filter Modifiers

**Chapter 5 · DAX Fundamentals · Lesson 11 of 15**

## What you'll learn

- What a filter modifier function is, and how it differs from a plain filter
- REMOVEFILTERS, and how it builds a "percent of total" measure
- KEEPFILTERS, and exactly what default behavior it changes
- USERELATIONSHIP, tying back to the active/inactive relationships from Chapter 4

## Beyond simple filters

Lesson 39 covered CALCULATE's ordinary filter arguments — conditions like
`'Product'[Color] = "Blue"` that narrow filter context. **Filter modifier
functions** do something more specific: instead of adding a condition,
they change *how* filtering itself behaves.

| Function | What it does |
|---|---|
| `REMOVEFILTERS` | Clears filters from specified tables/columns — or everything |
| `KEEPFILTERS` | Adds a filter without overwriting what's already there |
| `USERELATIONSHIP` | Activates a specific (normally inactive) relationship for one calculation |
| `CROSSFILTER` | Changes a relationship's filter direction, or disables it, for one calculation |

## REMOVEFILTERS: the tool behind "percent of total"

`REMOVEFILTERS` clears filters — from one column, several columns, or
everywhere if called with no arguments. It's the standard way to build a
percent-of-total measure:

%Sales = DIVIDE([TotalSales], CALCULATE([TotalSales], REMOVEFILTERS()))

The numerator, `[TotalSales]`, respects whatever's currently filtered —
say, one product category. The denominator uses `CALCULATE` with
`REMOVEFILTERS()` to strip away *every* filter, giving you the grand
total across the entire table regardless of what's selected. Divide one
by the other, and you get each category's share of the whole — a
classic pattern you'll use often.

You can also target `REMOVEFILTERS` at specific columns —
`REMOVEFILTERS(DimProductSubcategory[Name])` clears filters on just that
column, leaving every other active filter untouched.

## KEEPFILTERS: changing CALCULATE's default overwrite

Recall from Lesson 39: when `CALCULATE`'s filter argument targets a
column that's already filtered, it **overwrites** the existing filter by
default. `KEEPFILTERS` changes that — it makes the new filter *combine*
with the existing one (using their intersection) instead of replacing
it.

Picture a report already filtered to Washington and British Columbia.
Without `KEEPFILTERS`, `CALCULATE(..., 'Geography'[State] = "WA" ||
'Geography'[State] = "OR")` throws away the WA/BC filter and substitutes
WA/OR entirely. With `KEEPFILTERS` wrapped around that same condition,
the two filters intersect — and since only Washington appears in both,
the result narrows down to Washington alone.

Reach for `KEEPFILTERS` specifically when you want your filter argument
to *add* a constraint on top of whatever's already active, rather than
replace it.

## USERELATIONSHIP: reaching an inactive relationship

You met active and inactive relationships back in Chapter 4, Lesson 30 —
only one relationship between two tables can be active by default.
`USERELATIONSHIP` is how a specific measure reaches past that default
and uses an inactive relationship instead, just for that one
calculation:

Sales by Ship Date =
CALCULATE(SUM(Sales[SalesAmount]), USERELATIONSHIP(Sales[ShipDateKey], 'Date'[DateKey]))

This is the exact mechanism behind role-playing dimensions — a single
`Date` table filtering a fact table three different ways (order date,
ship date, delivery date), with only the order-date relationship active
by default, and measures like this one reaching the others on demand.

## Key terms

| Term | Meaning |
|---|---|
| Filter modifier function | A function that changes how filtering behaves, rather than adding a simple condition |
| REMOVEFILTERS | Clears filters from specified columns/tables, or everywhere |
| KEEPFILTERS | Makes a new filter combine with an existing one instead of overwriting it |
| USERELATIONSHIP | Activates a specific relationship for one calculation |

## Lab

1. On **AdventureWorksDW2014**, build
   `%Sales = DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS()))`
   in a table broken out by
   `DimProductCategory[EnglishProductCategoryName]`, and confirm the
   percentages sum to 100%.
2. Using the three `DimDate` relationships you built in Chapter 4,
   Lesson 30 (Order/Due/Ship Date), write a measure using
   `USERELATIONSHIP` to sum `FactInternetSales[SalesAmount]` by ship
   date instead of the active order-date relationship.
3. Try building a filter with and without `KEEPFILTERS` on
   `DimProduct[Color]` inside an existing report filter, and observe the
   difference in results.

## Check yourself

You're ready for Lesson 43 when you can explain the difference between
what a plain CALCULATE filter does and what REMOVEFILTERS or KEEPFILTERS
each do differently.
