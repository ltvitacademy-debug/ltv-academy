# Lesson 34 — Arithmetic & KPI Calculations

**Chapter 6 · Calculated Fields · Lesson 2 of 7**

## What you'll learn

- Tableau's arithmetic operators, and how they behave on measures
- How to build a basic subtraction calculation like `Profit`
- How to build a ratio (percentage-style) calculation like `Profit
  Ratio`
- Why order of operations matters just as much here as anywhere else

## Tableau's arithmetic operators

Tableau supports the same arithmetic operators you'd expect from any
spreadsheet or programming language:

| Operator | Meaning |
|---|---|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `%` | Modulo (remainder after division) |

These work directly on any numeric field — Measures like `[Sales]`,
`[Cost]`, or `[Quantity]` — and combine exactly the way you'd expect
from basic math, including standard order of operations (multiplication
and division before addition and subtraction, unless parentheses say
otherwise).

## A basic arithmetic calculation

The simplest possible calculated field is one measure combined with
another:

```
Profit =
[Sales] - [Cost]
```

That single subtraction is a real, working calculated field the
moment you save it — Tableau evaluates `[Sales] - [Cost]` for every
row, and aggregates the result (usually as a `SUM`) whenever you drop
`Profit` onto a view.

## Building a KPI ratio

Raw differences like `Profit` are useful, but most real dashboards
also want a **ratio** — a percentage that stays meaningful even when
the underlying scale changes:

```
Profit Ratio =
SUM([Profit]) / SUM([Sales])
```

Notice the `SUM()` wrapped around both `Profit` and `Sales` here. This
matters: `Profit Ratio` needs to be calculated *after* aggregation —
you want the ratio of *total* profit to *total* sales for whatever's
on the view (a region, a category, a whole year), not a row-by-row
ratio averaged in some confusing way. Lesson 39 covers exactly why
that `SUM()` wrapping is required in more depth.

## Order of operations still applies

Parentheses control evaluation order in Tableau calculations exactly
like they do in algebra. Compare these two formulas:

```
Margin A = [Sales] - [Cost] / [Sales]
Margin B = ([Sales] - [Cost]) / [Sales]
```

`Margin A` divides `Cost` by `Sales` *first* (division before
subtraction), then subtracts that from `Sales` — almost certainly not
what you meant. `Margin B` forces the subtraction to happen first by
wrapping it in parentheses, then divides the result by `Sales` to get
an actual profit margin. When a formula isn't behaving the way you
expect, missing parentheses around the piece you want computed first
are one of the most common causes.

## Common KPI patterns

A huge share of real-world calculated fields fall into one of three
shapes:

1. **Absolute** — a plain difference, like `Profit = [Sales] -
   [Cost]`.
2. **Ratio** — one aggregated total divided by another, like `Profit
   Ratio = SUM([Profit]) / SUM([Sales])`.
3. **Index** — a value compared against a baseline or target, like
   `Sales Index = SUM([Sales]) / [Target Sales]`.

Recognizing which shape a business question is asking for — "how much
did we make," "what percent," or "how are we doing versus a goal" —
is most of the work of writing the right formula.

## Key terms

| Term | Meaning |
|---|---|
| Arithmetic operator | `+`, `-`, `*`, `/`, `%` — the basic math operators available in any calculation |
| KPI (Key Performance Indicator) | A calculated metric summarizing performance, often as an absolute value, ratio, or index |
| Order of operations | The rule that multiplication/division evaluate before addition/subtraction, unless parentheses override it |

## Lab

1. On **Sample Superstore**, create `Profit = [Sales] - [Cost]` — if
   your extract doesn't have a `Cost` field, use the built-in `Profit`
   field instead and skip to step 2.
2. Create `Profit Ratio = SUM([Profit]) / SUM([Sales])`, format it as
   a percentage, and drop it on a table broken out by `Category`.
3. Deliberately write `Profit Ratio (wrong) = [Profit] / [Sales]`
   without the `SUM()` wrapping, drop it next to the correct version,
   and see how Tableau handles it differently once aggregated.

## Check yourself

You're ready for Lesson 35 when you can write a ratio-style
calculated field from memory, correctly wrapping both sides in
`SUM()`, and explain in one sentence why order of operations
parentheses matter for margin formulas.
