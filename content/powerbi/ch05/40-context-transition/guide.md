# Lesson 40 — Context Transition

**Chapter 5 · DAX Fundamentals · Lesson 9 of 15**

## What you'll learn

- What context transition is, in plain terms
- When it happens automatically, and when you have to trigger it with CALCULATE
- A full worked example, step by step
- Why this explains a specific class of "why did my formula do that?" surprises

## The bridge between the two kinds of context

Lesson 38 covered row context (the current row) and filter context (the
active filters). **Context transition** is what happens when DAX
converts one into the other — specifically, turning the current row
context into an equivalent filter context, restricted to just that row's
values.

It sounds abstract. The trigger for it is simple: **context transition
happens whenever CALCULATE evaluates an expression inside row context.**

## The automatic case: measures in row context

If you reference a *measure* from inside row context — like inside a
calculated column — context transition happens for you automatically,
with no `CALCULATE` visible in your formula at all. That's because every
measure is implicitly wrapped in its own `CALCULATE` behind the scenes.

This is exactly why a measure referenced inside a calculated column
"knows" to respect the current row, even though a calculated column is
normally all row context and no filter context. The measure quietly
converts that row context into a one-row filter context first.

## The explicit case: CALCULATE inside row context

Context transition also happens whenever you write `CALCULATE` yourself
inside something that's already in row context — most often, a
calculated column. Here's a real example, a calculated column on a
**Customer** table that classifies each customer as high or low value:

Customer Segment =
IF (
    CALCULATE (
        SUM ( Sales[Sales Amount] ),
        ALLEXCEPT ( Customer, Customer[CustomerKey] )
    ) < 2500,
    "Low",
    "High"
)

Walk through what happens for one row — one specific customer:

1. **Row context** starts things off: DAX is evaluating this formula for
   one particular customer, identified by their `CustomerKey`.
2. **CALCULATE triggers context transition.** The row context (this one
   customer) becomes a filter context — as if you'd filtered the whole
   model down to just that customer's `CustomerKey`.
3. **`ALLEXCEPT(Customer, Customer[CustomerKey])`** then removes any
   *other* filters on the Customer table, while deliberately keeping the
   one context transition just created on `CustomerKey`.
4. **`SUM(Sales[SalesAmount])`** now sums every sale belonging to that
   one customer — because the filter context, thanks to the relationship
   between Customer and Sales, has narrowed the Sales table down to just
   their rows.
5. **`IF`** compares that customer's total against 2500 and labels the
   row accordingly.

Every row in the Customer table repeats this independently — row context
in, filter context out, one customer at a time.

## Why this explains real confusion

Without knowing about context transition, formulas like this look
impossible: how can a calculated column, which only ever sees row
context, produce a result that depends on filtering an entirely
different table? The answer is always the same shape: something
triggered `CALCULATE` (visibly, or invisibly through a measure
reference), which converted the row you were on into a filter, which
then restricted whatever the expression aggregates.

You don't need to reach for this pattern often as a beginner — but
recognizing it when you see it, in your own formulas or someone else's,
will save you real confusion later.

## Key terms

| Term | Meaning |
|---|---|
| Context transition | Converting the current row context into an equivalent filter context |
| Implicit CALCULATE | Every measure reference is automatically wrapped in CALCULATE, triggering context transition in row context |

## Lab

1. Reread the Customer Segment example above and, without looking back at
   the walk-through, explain out loud what happens for one customer row.
2. Import **AdventureWorksDW2014**'s `DimCustomer` and
   `FactInternetSales` (related on `CustomerKey`), then build the real
   thing on `DimCustomer`:

   Customer Segment =
   IF (
       CALCULATE (
           SUM ( FactInternetSales[SalesAmount] ),
           ALLEXCEPT ( DimCustomer, DimCustomer[CustomerKey] )
       ) < 2500,
       "Low", "High"
   )

   Add it to a table visual and confirm each customer gets labeled
   correctly based on their own total purchases.

## Check yourself

You're ready for Lesson 41 when you can state the one-sentence trigger
for context transition: what has to happen for row context to become
filter context.
