# Lesson 11 — Building the Finance Revenue Page

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 11 of 16**

## What you'll learn

- Translating Lesson 1's Finance ask directly into specific visuals
- The exact DAX measures this page needs, built on `fct_orders.amount`
- Why a payment-method breakdown and a revenue-over-time view, together,
  answer what Finance actually asked for
- The one row-count sanity check to run before trusting anything this
  page shows

## Back to the actual ask

Lesson 1: "We need a number we trust for revenue, by day, by payment
method, that doesn't move when we're not expecting it to." That
sentence specifies the page almost completely — a trustworthy revenue
total, sliceable by date and by payment method.

## The core measure

```dax
Total Revenue = SUM ( fct_orders[amount] )
```

Because `amount` was already converted from cents to dollars inside
`stg_jaffle_shop__payments` back in Lesson 7, this measure needs no
unit conversion here — another real reason that conversion belonged
in dbt, not in a DAX formula a report author might forget to apply
consistently.

## The two required visuals

- **Revenue over time** — a line or column chart with `order_date` on
  the axis and `[Total Revenue]` as the value, answering "by day."
- **Revenue by payment method** — a bar chart or table with
  `payment_method` on the axis and `[Total Revenue]` as the value,
  answering "by payment method." `payment_method` lives on
  `fct_orders` already by way of the payments join from Lesson 6.

## A supporting measure Finance will ask for next

```dax
Revenue MTD =
CALCULATE (
    [Total Revenue],
    DATESMTD ( fct_orders[order_date] )
)
```

Month-to-date revenue is the natural next question after "revenue by
day" — a running total card next to the time chart, using the real
`DATESMTD` time-intelligence pattern.

## The sanity check before trusting this page

Before calling this page done, compare `[Total Revenue]` with no
filters applied against a plain `sum(amount)` run directly against
`fct_orders` in Snowflake. They have to match exactly. If they don't,
the problem is almost certainly upstream in the model, not in this
DAX — which is exactly the kind of mismatch Lesson 13 introduces on
purpose.

## Key terms

| Term | Meaning |
|---|---|
| `[Total Revenue]` | `SUM(fct_orders[amount])` — the page's core measure |
| `DATESMTD` | Time-intelligence function returning dates from the start of the current month through the latest date in context |
| Sanity check | Comparing a Power BI total against the same aggregation run directly in Snowflake |

## Lab

Build both visuals and the `[Total Revenue]` and `Revenue MTD`
measures. Run the Snowflake sanity check described above and record
whether the two totals match exactly.

## Check yourself

You're ready for Lesson 12 when `[Total Revenue]` in Power BI matches
the plain Snowflake `sum(amount)` exactly, with no filters applied on
either side.
