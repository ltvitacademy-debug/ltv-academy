# Lesson 9 — SUMIFS, COUNTIFS & AVERAGEIFS

**Chapter 3 · Aggregation & Logic Functions · Lesson 9 of 25**

## What you'll learn

- Why SUMIF and COUNTIF stop being enough the moment a real question has
  more than one condition
- The exact syntax of SUMIFS, COUNTIFS, and AVERAGEIFS — criteria-range,
  criteria pairs, repeated for every condition
- A real multi-condition example: total sales for one region in one
  year, without a single helper column
- Why these three functions, aimed at an Excel Table, beat a stack of
  helper columns or a manual filter every time

## The problem with a single condition

`SUMIF` and `COUNTIF` answer one-condition questions: total sales for
the West region, count of orders from 2024. Real analyst questions are
almost never that simple — "total West region sales *in 2024*" needs
two conditions evaluated together, not two separate formulas added or
subtracted afterward. That's what the **-IFS** family is for: the same
idea as SUMIF/COUNTIF, extended to as many conditions as the question
needs.

## SUMIFS: sum a range across multiple conditions

```
=SUMIFS(Sales[Amount], Sales[Region], "West", Sales[Year], 2024)
```

Read this left to right: sum the `Amount` column, but only the rows
where `Region` is "West" **and** `Year` is 2024. Notice the argument
order is different from SUMIF — the range being summed comes *first* in
SUMIFS, then each condition as a criteria-range/criteria pair. That
swap trips up a lot of people moving from SUMIF to SUMIFS; it's worth
memorizing deliberately rather than guessing from muscle memory.

Every extra condition is just one more pair of arguments — three
conditions is `SUMIFS(sum_range, range1, crit1, range2, crit2, range3,
crit3)`, and so on. There's no practical limit that matters in real
work.

## COUNTIFS and AVERAGEIFS: same pattern, different aggregation

```
=COUNTIFS(Sales[Region], "West", Sales[Year], 2024)
=AVERAGEIFS(Sales[Amount], Sales[Region], "West", Sales[Year], 2024)
```

COUNTIFS has no separate "range to aggregate" argument — it's just
condition pairs, because counting doesn't need a value column, only
rows that match. AVERAGEIFS puts the averaged range first, exactly like
SUMIFS puts the summed range first. Once the pattern clicks for one of
the three, all three read the same way.

## Why this beats helper columns

A common workaround before learning SUMIFS is a helper column that
flags matching rows (`=IF(AND(B2="West", C2=2024), 1, 0)`) and then a
plain SUM of the flag column. That works, but it adds a column that has
to be maintained, re-copied down when rows are added, and explained to
whoever inherits the workbook later. SUMIFS does the same job in one
cell, with no extra column, and it recalculates automatically as rows
are added to the source Table — which is exactly why building on a real
Excel Table (Lesson 3) rather than a raw range matters here.

## Key terms

| Term | Meaning |
|---|---|
| Criteria range | The column checked against a condition (e.g., `Sales[Region]`) |
| Criteria | The value or test the criteria range is checked against (e.g., `"West"`) |
| Sum/average range | The column actually being aggregated — comes *first* in SUMIFS/AVERAGEIFS |

## Lab

1. In any Table with at least a category column, a date/year column, and a numeric column, write a SUMIFS that totals the numeric column for one category and one year.
2. Write the equivalent COUNTIFS for the same two conditions, then an AVERAGEIFS for the same two conditions.
3. Add a third condition to all three formulas (e.g., a specific salesperson or product) and confirm the totals narrow correctly.

## Check yourself

You're ready for Lesson 10 when you can write a SUMIFS with three
conditions from memory, without checking which argument comes first.
