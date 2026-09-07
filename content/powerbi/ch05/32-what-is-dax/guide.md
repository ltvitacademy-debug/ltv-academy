# Lesson 32 — What Is DAX?

**Chapter 5 · DAX Fundamentals · Lesson 1 of 15**

## What you'll learn

- What DAX actually is, in plain terms
- Why dragging fields onto a report isn't always enough
- What kinds of questions DAX answers that simple aggregation can't
- How this chapter is organized, and where it's headed

## A formula language built for your model

**DAX** — Data Analysis Expressions — is a collection of functions,
operators, and constants you combine into formulas that calculate and
return values. It's how you create new information from data that's
already in your Power BI model.

You've built reports for four chapters now without writing a single DAX
formula. That's not an accident — Power BI can sum, count, and average a
column automatically the moment you drag it onto a visual. For a lot of
reporting, that's genuinely enough.

## Where automatic summarization runs out

Drag `SalesAmount` onto a card visual, and Power BI sums it for you — no
DAX required. But what about:

- Sales for the *previous* quarter, to compare against this one?
- Year-over-year growth as a percentage?
- A running total that only counts values above a threshold?

None of these are "sum this column." Each one requires a formula that
reasons about *which* rows to include, not just which column to add up.
That's the gap DAX fills.

## A simple measure, and what it buys you

Here's the simplest possible DAX formula — a measure that does exactly
what automatic summarization already does:

Total Sales = SUM(Sales[SalesAmount])

On its own, this doesn't do anything a dragged field wouldn't. The payoff
comes later: once **Total Sales** exists as a named measure, you can
reference it inside *other* formulas — building more complex calculations
on top of it instead of repeating the same `SUM` everywhere. You'll see
this pattern constantly for the rest of the chapter.

## What a real DAX formula unlocks

Here's a report built with a slightly more ambitious formula — one that
calculates **Previous Quarter Sales** by filtering `SalesAmount` down to
just the prior quarter, and comparing it against the current one:

![Screenshot of a Power BI report with Year and QuarterOfYear slicers, and a clustered column chart comparing Previous Quarter Sales against SalesAmount.](/courses/power-bi/ch05/32-what-is-dax/qsdax_3_chart.png)
*This comparison — this quarter against last — isn't something a dragged field can produce on its own. It took one DAX formula.*

That formula uses two functions working together: `CALCULATE` (which
modifies what gets filtered) and `PREVIOUSQUARTER` (which defines *which*
period to filter to). You'll meet both properly later in this chapter —
`CALCULATE` gets two full lessons to itself, because it's the single most
important function in the language.

## Where this chapter is headed

Fifteen lessons, building in order:

| Lessons | What they cover |
|---|---|
| 32–33 | What DAX is, and how a formula is put together |
| 34–36 | Calculated columns, measures, and when to use each |
| 37 | The basic aggregation functions: SUM, COUNT, DISTINCTCOUNT |
| 38–40 | Row context, filter context, and CALCULATE — the core mental model |
| 41 | Iterator functions like SUMX, which calculate row by row |
| 42–45 | CALCULATE's filter modifiers, FILTER, and the ALL family of functions |
| 46 | Variables and the habits that keep formulas readable |

Each lesson stays short and focused — DAX rewards small, solid building
blocks more than it rewards memorizing long formulas.

## Key terms

| Term | Meaning |
|---|---|
| DAX | Data Analysis Expressions — the formula language for calculations in Power BI |
| Measure | A DAX formula that calculates a result dynamically |
| Automatic summarization | Power BI summing/counting a dragged field with no formula needed |

## Lab

1. Open any Power BI file and drag a numeric column onto a card visual —
   confirm it sums automatically, no DAX involved.
2. Think of one question about your data that a single dragged field
   couldn't answer (a comparison, a ratio, a filtered subset). Keep it in
   mind — you'll be able to build it by the end of this chapter.

## Check yourself

You're ready for Lesson 33 when you can explain, in your own words, the
difference between what Power BI can summarize automatically and what
requires an actual DAX formula.
