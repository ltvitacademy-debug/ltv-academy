# Lesson 39 — Aggregate vs. Non-Aggregate Calculations & Common Errors

**Chapter 6 · Calculated Fields · Lesson 7 of 7**

## What you'll learn

- The difference between an aggregate value and a disaggregated
  (row-level) value
- The rule Tableau enforces: never mix the two inside one expression
- Why `SUM([Profit]) / SUM([Sales])` works but `[Profit] /
  SUM([Sales])` doesn't
- The most common calculation errors this chapter builds toward, and
  how to read them

## Aggregate vs. disaggregated values

Every value in a Tableau calculation is either:

- **Disaggregated (row-level)** — the raw value for one individual
  record. `[Sales]` on its own, before any function wraps it, is
  disaggregated.
- **Aggregated** — a single summary value computed across many rows,
  produced by a function like `SUM`, `AVG`, `COUNT`, `MIN`, or `MAX`.
  `SUM([Sales])` is aggregated.

This distinction isn't cosmetic — it determines whether a formula is
even valid.

## The rule: don't mix them

Straight from Tableau's own documentation: **for any aggregate
calculation, you cannot combine an aggregated value and a
disaggregated value in the same expression.**

```
SUM([Sales]) * [Quantity]
```

That formula is **invalid** — `SUM([Sales])` is aggregated, but
`[Quantity]` on its own is disaggregated (row-level). Tableau has no
consistent way to multiply "one total" by "many individual row
values" in a single pass, so it refuses to save the calculation at
all.

## Two ways to fix it

Either aggregate *everything*, or aggregate *nothing* — just don't
mix the two:

```
Revenue Estimate A =
SUM([Sales] * [Quantity])

Revenue Estimate B =
SUM([Sales]) * SUM([Quantity])
```

`Revenue Estimate A` multiplies row by row first, *then* sums the
result — every piece stays row-level until the single outer `SUM`.
`Revenue Estimate B` sums each side independently first, then
multiplies the two totals together. Both are valid; which one is
*correct* depends on what you're actually trying to measure — they
can produce genuinely different numbers.

This is exactly why Lesson 34's `Profit Ratio` needed `SUM()` wrapped
around *both* sides: `SUM([Profit]) / SUM([Sales])` keeps both sides
aggregated. `[Profit] / SUM([Sales])` would mix a disaggregated
numerator with an aggregated denominator — invalid, for the same
reason as the multiplication example above.

## Reading the actual error message

When you mix aggregation levels, Tableau's Calculation Editor won't
let the formula save, and shows an error along the lines of:

> **Cannot mix aggregate and non-aggregate arguments with this
> function.**

That message is your signal to go find the one field in the formula
that isn't wrapped in an aggregate function (or the one that
shouldn't be), and fix the mismatch — either wrap it in `SUM`/`AVG`/
etc., or remove the aggregation from the other side.

## Other errors you'll hit in this chapter's formulas

A short list of the errors you're now equipped to recognize and fix,
drawn from everything covered in Lessons 33-39:

| Error message (roughly) | Likely cause | Fix |
|---|---|---|
| "Cannot mix aggregate and non-aggregate arguments" | One side of an operator is aggregated, the other isn't | Wrap the non-aggregated side in `SUM`/`AVG`, or remove aggregation from both |
| "The calculation contains errors" / unterminated `IF` | Missing `END` on an `IF` or `CASE` block | Add the missing `END` |
| "Expects a [type] argument" | Comparing or combining incompatible types (text vs. number, text vs. date) | Wrap one side in `STR`, `INT`, `FLOAT`, or `DATE` |
| Unexpected blank/NULL results | A `NULL` silently propagated through arithmetic | Wrap the field in `ZN` or `IFNULL` before using it |

## Key terms

| Term | Meaning |
|---|---|
| Disaggregated (row-level) value | A raw field value for one individual record, with no aggregate function applied |
| Aggregated value | A single summary value computed across many rows, via `SUM`, `AVG`, `COUNT`, etc. |
| "Cannot mix aggregate and non-aggregate arguments" | Tableau's error when one operator combines an aggregated and a disaggregated value |

## Lab

1. On **Sample Superstore**, try to create `SUM([Sales]) *
   [Quantity]` exactly as written, and read the exact error message
   Tableau's Calculation Editor shows.
2. Fix it two ways: `Revenue Estimate A = SUM([Sales] * [Quantity])`
   and `Revenue Estimate B = SUM([Sales]) * SUM([Quantity])`. Drop
   both on a table by `Category` and compare the numbers — they won't
   match, and that's the point.
3. Review every calculated field you built across this chapter
   (Lessons 33-38) and confirm each one is either fully aggregated or
   fully disaggregated, never a mix.

## Check yourself

You're ready to move on to Chapter 7 when you can explain, from
memory, why `SUM([Sales]) * [Quantity]` is invalid, and name at least
two different fixes for a "cannot mix aggregate and non-aggregate"
error.
