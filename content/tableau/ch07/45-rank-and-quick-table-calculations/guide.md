# Lesson 45 — Rank & Other Quick Table Calculations

**Chapter 7 · Time Series & Table Calculations · Lesson 45 of 95**

## What you'll learn

- How **Rank** orders values within the view, and the tie-handling
  options it offers
- How **Percentile** expresses rank as a percentage instead of a
  whole number
- The rest of the quick table calculations menu you haven't
  covered yet: **Year over Year Growth** and **YTD Total**
- How Rank's tie-breaking rules map onto SQL's `RANK()` vs.
  `DENSE_RANK()`

## Rank

A **Rank** table calculation orders values from highest to lowest (or
lowest to highest) within the current scope, assigning each one a
whole-number position:

![Tableau's Table Calculation panel with Calculation Type set to Rank, Descending, Competition (1,2,2,4), Compute Using Table (down) — an orange-highlighted rank column applied to a sales-by-month table.](/courses/tableau/ch07/45-rank-and-quick-table-calculations/rank-dialog.png)
*Competition (1,2,2,4) — the same tie-breaking rule as SQL's RANK() function: two tied values both get rank 2, and the next value jumps straight to 4.*
Source: [Tableau Help — Table Calculation Types](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations_definebasic_runningtotal.htm)

That **Competition (1,2,2,4)** tie-handling option is exactly SQL's
`RANK()` behavior — ties share a position, and the position after a
tie skips ahead by the number of tied rows. Tableau's dropdown also
offers **Modified Competition (1,3,3,4)**, **Dense (1,2,2,3)** —
matching SQL's `DENSE_RANK()`, where tied rows don't cause a
skip — and **Unique (1,2,3,4)**, which breaks every tie arbitrarily so
no two rows ever share a rank.

## Percentile

**Percentile** is Rank's cousin: instead of a whole-number position,
it expresses where a value falls as a percentage of the range:

![Tableau's Table Calculation panel with Calculation Type set to Percentile, Ascending, Compute Using Table (down), on the same sales-by-month table.](/courses/tableau/ch07/45-rank-and-quick-table-calculations/percentile-dialog.png)
*The lowest value in the partition scores 0%; the highest scores 100% — everything else falls proportionally between.*
Source: [Tableau Help — Table Calculation Types](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations_definebasic_runningtotal.htm)

Use Rank when you want to say "this was the 3rd-best month." Use
Percentile when you want to say "this month outperformed 73% of all
other months" — the second framing scales more gracefully when you're
comparing across differently-sized groups.

## The rest of the quick calculations menu

Two more entries round out Tableau's quick table calculation list:

- **Year over Year Growth** — a specialized Percent Difference From
  that's pre-configured to compare each year to the one before it,
  saving you from setting Compute Using and Relative To by hand.
- **YTD Total** — a Running Total that's pre-configured to restart at
  the beginning of each year, giving you a proper year-to-date
  accumulator without manually setting Restarting Every yourself.

Both are genuinely just Running Total and Percent Difference From
with smart defaults already applied — nothing new is happening
underneath, which is exactly why "quick" table calculations are worth
learning as shortcuts once you already understand the calculations
they're built from.

## Key terms

| Term | Meaning |
|---|---|
| Rank (Competition) | Ranking where ties share a position and the following rank skips ahead (matches SQL `RANK()`) |
| Rank (Dense) | Ranking where ties share a position with no skip (matches SQL `DENSE_RANK()`) |
| Percentile | A value's position expressed as a percentage of the range, rather than a whole number |
| Year over Year Growth | A pre-configured Percent Difference From comparing each year to the previous one |
| YTD Total | A pre-configured Running Total that restarts every year |

## Lab

1. Build a text table: Month of Order Date on Rows, Sales on Text.
2. Add a **Rank** table calculation with **Competition (1,2,2,4)**, Descending. Note what happens to the rank sequence if two months happen to tie.
3. Switch the same calculation to **Dense (1,2,2,3)** and compare the rank of the month right after the tie.
4. Clear it, then try **Percentile** instead, and compare how the same data reads as percentages versus whole-number ranks.

## Check yourself

You're ready for Lesson 46 when you can explain the difference between
Competition and Dense ranking in one sentence, and name which quick
calculation — Year over Year Growth or YTD Total — is really just a
pre-configured Running Total.
