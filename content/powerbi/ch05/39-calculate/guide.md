# Lesson 39 — CALCULATE Explained

**Chapter 5 · DAX Fundamentals · Lesson 8 of 15**

## What you'll learn

- What CALCULATE actually does, in one sentence
- Its syntax, and what each part of it means
- How CALCULATE's filters interact with filters already in place
- Why this one function shows up in almost every advanced DAX formula

## The most important function in DAX

**CALCULATE** evaluates an expression inside a *modified* filter context.
That's the whole function, in one sentence — but it's worth sitting with,
because nearly everything else advanced in DAX is built on top of it.

CALCULATE(<expression>, <filter1>, <filter2>, ...)

- **`<expression>`** — almost always a measure, or an aggregation like
  `SUM(...)`. This is what gets calculated.
- **`<filter1>, <filter2>, ...`** — optional. Each one narrows (or
  changes) the filter context the expression is evaluated in.

Call `CALCULATE` with just an expression and no filters, and it behaves
exactly like the expression on its own. The filters are where the power
is.

## A worked example

Blue Revenue = CALCULATE(SUM(Sales[SalesAmount]), 'Product'[Color] = "Blue")

This measure sums `SalesAmount` — but only for rows where
`Product[Color]` equals `"Blue"`. Put it on a report next to a plain
`SUM(Sales[SalesAmount])` measure, broken out by category, and you'd see
something like:

| Category | Sales Amount | Blue Revenue |
|---|---|---|
| Accessories | $1,272,057.89 | $165,406.62 |
| Bikes | $94,620,526.21 | $8,374,313.88 |
| Clothing | $2,117,613.45 | $259,488.37 |

Same expression underneath — `SUM(Sales[SalesAmount])` — but `CALCULATE`
adds one more filter on top of whatever the report is already filtering
by (here, Category).

## How the filter argument behaves

When you pass a filter to `CALCULATE`, one of two things happens,
depending on whether that column already has a filter active:

- If the column **isn't already filtered**, the new filter is simply
  added to the filter context.
- If the column **is already filtered** (say, by a slicer), `CALCULATE`'s
  filter **overwrites** it for that expression — it doesn't combine with
  the existing one.

This overwrite behavior is the default, and it's exactly what makes
`CALCULATE` powerful: you can force an expression to ignore what a user
selected and substitute your own condition instead. (Lesson 42 covers
`KEEPFILTERS`, which changes this default when you specifically don't
want an overwrite.)

## Filters can be more than a simple condition

The filter argument to `CALCULATE` doesn't have to be a simple
`Column = Value` comparison. It can be:

- A **Boolean expression**, like `'Product'[Color] = "Blue"` — the kind
  you've seen so far.
- A **table expression** — typically built with `FILTER` (Lesson 43),
  for conditions too complex for a simple comparison.
- A **filter modifier function** — like `REMOVEFILTERS` or `ALL`
  (Lessons 42 and 44), which change filter context in ways beyond simple
  narrowing.

You'll meet all three properly over the next several lessons. For now,
the Boolean form covers the majority of what you'll write.

## Why CALCULATE matters this much

Recall the "Previous Quarter Sales" formula from Lesson 32:
`CALCULATE(SUM(Sales[SalesAmount]), PREVIOUSQUARTER(Calendar[DateKey]))`.
That's `CALCULATE` again — this time with a time-intelligence function
supplying the filter instead of a simple comparison. Percent-of-total
calculations, year-over-year growth, running totals, security filters —
essentially every "interesting" DAX formula you'll eventually write
routes through `CALCULATE`. It's worth being genuinely comfortable with
before moving on.

## Key terms

| Term | Meaning |
|---|---|
| CALCULATE | Evaluates an expression inside a modified filter context |
| Filter argument | A condition passed to CALCULATE that narrows or changes filter context |
| Overwrite | CALCULATE's default behavior: a new filter replaces an existing one on the same column |

## Lab

1. On **AdventureWorksDW2014**, write
   `Red Sales = CALCULATE(SUM(FactInternetSales[SalesAmount]), DimProduct[Color] = "Red")`.
2. Put `Red Sales` and a plain `Total Sales` measure side by side in a
   table broken out by `DimProductCategory[EnglishProductCategoryName]`,
   and confirm `Red Sales` applies its color filter on top of each
   category.
3. Add a slicer on `DimProduct[Color]` and select "Blue" — confirm
   `Red Sales` still shows red-only totals for every category, because
   `CALCULATE`'s filter overwrites the slicer for that measure.

## Check yourself

You're ready for Lesson 40 when you can write, from memory, a simple
`CALCULATE` formula that sums a column filtered to one condition.
