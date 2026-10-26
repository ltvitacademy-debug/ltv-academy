# Lesson 23 — Finding the Real Cause

**Chapter 7 · Resolving the Discrepancy and Wrap-Up · Lesson 23 of 26**

## What you'll learn

- How to actually isolate a discrepancy down to the specific rows
  causing it, instead of guessing at a cause
- Why checking "does this happen every quarter-end" is the right
  second question, right after confirming the gap is real
- The real bug: an inclusive date range on **both** ends of a
  `SUMIFS` formula, double-counting orders placed exactly on the
  quarter boundary
- Why this is the same underlying concept this career path's
  Beginner capstone already taught, now showing up as a genuine Excel
  mistake instead of a warehouse design choice

## Reproducing the gap

Lesson 22 established the gap is real and repeatable. The first real
step in Chapter 7 is reproducing it on command, not just once by
accident:

1. Re-open the Excel workbook, re-run the `SUMIFS` formula from
   Lesson 21, and re-confirm it's still higher than Power BI's and
   Tableau's totals by the same amount as before.
2. Check whether the same thing happens at a *different* quarter
   boundary — pick a different quarter from the warehouse and build
   the equivalent `SUMIFS` formula for it. If the gap reappears, this
   rules out a one-time data entry mistake specific to Q3 and points
   at the formula's *logic*, not any particular quarter's data.

## Isolating the exact rows

With the formula confirmed to be the suspect, the next step is
finding precisely which rows it's including that it shouldn't be:

```
=SUMIFS(
    Data[LineTotal],
    Data[OrderDate], DATE(2013,10,1)
)
```

This isolated formula sums every line where `OrderDate` is **exactly**
October 1st, 2013 — the first day of Q4, not Q3. If this returns a
nonzero amount, and that amount matches the size of the discrepancy
from Lesson 22, that's not circumstantial evidence — it's the exact
mechanism, caught in the act.

## The real bug: inclusive on both ends

Go back to Lesson 21's formula and read its upper bound literally:

```
Data[OrderDate], "<=" & DATE(2013,10,1)
```

`<=` October 1st includes October 1st. But October 1st isn't part of
Q3 at all — it's the **first day of Q4**. Every order placed on that
exact date gets summed into Finance's "Q3" total twice over, in
effect: once correctly, when Finance later runs Q4's own total, and
once incorrectly, right now, in the Q3 total that's supposed to
exclude it. The formula's author read "through the start of October"
as "October 1st included," which is a completely natural way to talk
about a quarter in plain English — and exactly the wrong way to
express it as a date-range boundary.

## The same concept, a new context

This career path's Beginner capstone already taught the fix for
exactly this shape of problem: a **half-open date range** —
`>= start date` **and** `< start of next period`, with the upper
bound **exclusive**. The correct version of this formula is:

```
=SUMIFS(
    Data[LineTotal],
    Data[OrderDate], ">=" & DATE(2013,7,1),
    Data[OrderDate], "<" & DATE(2013,10,1)
)
```

Only one character changes — `<=` becomes `<` — but that character is
the entire bug. Power BI's and Tableau's totals never had this
problem in the first place, because both ultimately filter against
`dw.DimDate`'s discrete calendar rows (one row per real day, each
belonging to exactly one quarter), which has no equivalent "is this
boundary day included or excluded" ambiguity for a human to get wrong.
`SUMIFS` against a continuous date value does — and that's exactly
where this mistake lived.

## Key terms

| Term | Meaning |
|---|---|
| Half-open range | A range that includes its starting boundary but excludes its ending boundary (`>= start` and `< end`) |
| Inclusive boundary | A range boundary that includes the exact boundary value itself (`<=` instead of `<`) |
| Isolation query | A narrowed check built specifically to surface the exact rows responsible for a discrepancy, rather than the discrepancy's total size alone |

## Lab

1. Run the isolation formula above against your own workbook, summing
   only `OrderDate = DATE(2013,10,1)`.
2. Confirm that number matches the size of the gap you recorded in
   Lesson 22.
3. Write out, side by side, the original (buggy) and corrected
   `SUMIFS` formulas, with the one character that differs circled or
   highlighted.

## Check yourself

You're ready for Lesson 24 when you can explain exactly which rows
the original formula double-counted and why, explain why Power BI and
Tableau were never vulnerable to this specific mistake, and state the
fix in one sentence: change the upper bound from inclusive to
exclusive.
