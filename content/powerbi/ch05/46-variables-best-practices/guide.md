# Lesson 46 — Variables & DAX Best Practices

**Chapter 5 · DAX Fundamentals · Lesson 15 of 15**

## What you'll learn

- How VAR and RETURN work, and the problem they solve
- Three concrete benefits variables give you: performance, readability, debugging
- Why DIVIDE beats the plain `/` operator
- A short closing checklist for writing DAX you (and others) can trust

## The problem variables solve

Consider a year-over-year growth measure written the direct way:

Sales YoY Growth % =
DIVIDE(
    ([Sales] - CALCULATE([Sales], PARALLELPERIOD('Date'[Date], -12, MONTH))),
    CALCULATE([Sales], PARALLELPERIOD('Date'[Date], -12, MONTH))
)

Look closely: the *same* expression — sales for the same period last
year — appears twice. Power BI evaluates it twice too, doing the same
work over again for no reason.

## VAR and RETURN

**`VAR`** lets you calculate something once, name it, and reuse that name
as many times as you need — closed out with **`RETURN`**:

Sales YoY Growth % =
VAR SalesPriorYear =
    CALCULATE([Sales], PARALLELPERIOD('Date'[Date], -12, MONTH))
RETURN
    DIVIDE(([Sales] - SalesPriorYear), SalesPriorYear)

Same result, calculated in roughly half the query time — because
`SalesPriorYear` is computed once and referenced twice, instead of
computed twice from scratch.

## Three real benefits

- **Performance.** As above — an expression computed once and reused
  costs less than the same expression repeated.
- **Readability.** `SalesPriorYear` reads as plain English inside the
  `RETURN` line. A named variable documents *what* a subexpression means,
  not just what it calculates.
- **Debugging.** To inspect what a variable actually holds, temporarily
  change the `RETURN` line to output just that variable:

VAR SalesPriorYear = CALCULATE([Sales], PARALLELPERIOD('Date'[Date], -12, MONTH))
RETURN
    SalesPriorYear -- temporarily returning this to check its value

Comment out your real `RETURN` expression, check the number, then
uncomment it — a fast way to isolate exactly which part of a formula is
producing an unexpected result.

## A small habit worth adopting: DIVIDE over `/`

DIVIDE(<numerator>, <denominator> [, <alternate result>])

Plain division (`/`) throws an error the moment a denominator is zero or
blank — which, in a report someone else is using, shows up as a jarring
error message instead of a clean result. `DIVIDE` handles that
gracefully, returning blank (or a value you specify) instead of an
error:

Conversion Rate = DIVIDE([Conversions], [Visits])

If `[Visits]` is ever zero, this quietly returns blank instead of
crashing the visual. Make `DIVIDE` your default for any division in
DAX — there's essentially never a reason to prefer the plain `/`
operator in a report-facing formula.

## A closing checklist

You've now covered the fundamentals of DAX — syntax, calculated columns
and measures, context, `CALCULATE`, iterators, and the filter-modifier
functions. A few habits to carry forward into everything you write next:

- **Name measures clearly.** `Sales YoY Growth %` beats `Measure 3`.
- **Use variables** for any subexpression referenced more than once.
- **Prefer `DIVIDE`** over the `/` operator.
- **Fully qualify column references**, even within the same table.
- **Keep filter arguments simple** where you can — reach for `FILTER`
  only when a plain Boolean condition genuinely isn't enough.

## Key terms

| Term | Meaning |
|---|---|
| VAR / RETURN | Computes an expression once, names it, and reuses that name |
| DIVIDE | Division that returns blank (or a specified value) instead of erroring on a zero denominator |

## Lab

1. On **AdventureWorksDW2014**, write the year-over-year growth measure
   from this lesson for real:
   `Sales YoY Growth % = VAR SalesPriorYear = CALCULATE([Total Sales], PARALLELPERIOD(DimDate[FullDateAlternateKey], -12, MONTH)) RETURN DIVIDE(([Total Sales] - SalesPriorYear), SalesPriorYear)`.
2. Replace any `/` division in measures you've written across this
   chapter with `DIVIDE`, and test what happens when the denominator is
   zero (try filtering to a year with no prior-year data) — confirm it
   no longer errors.
3. Review your Lesson 40 Customer Segment measure against the closing
   checklist above, and tighten anything that doesn't yet follow it.

## Check yourself

Chapter 5 is complete when you can write a measure using `VAR`/`RETURN`,
`DIVIDE`, and a fully qualified column reference — without needing to
look any of the three up.
