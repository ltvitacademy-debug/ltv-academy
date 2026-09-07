# Lesson 45 — ALLSELECTED

**Chapter 5 · DAX Fundamentals · Lesson 14 of 15**

## What you'll learn

- What problem ALLSELECTED solves that ALL can't
- The precise difference between ALL and ALLSELECTED
- A worked example showing "visual totals" — the classic use case
- A simple rule for choosing between the two

## The gap ALL leaves open

`ALL` ignores every filter, full stop — including ones a user chose
deliberately, like a slicer selection. That's a problem for one common
report pattern: a table with subtotals or a "% of visible total" column,
where you want a total that respects the user's slicer choices, but
still ignores the row/column breakdown *within* the visual itself.

`ALL` can't do that — it throws away the slicer selections too, giving
you the total for the *entire* dataset, not the total for what the user
actually selected.

## What ALLSELECTED does differently

`ALLSELECTED` returns the context representing everything a query has
access to — while specifically **keeping** any filters explicitly
applied outside the visual (slicers, report filters), and only removing
the row/column filters generated *by the visual itself*.

ALLSELECTED([<table> | <column>, ...])

## Worked example: visual totals

Picture a table visual broken out by **Product Category** and **Calendar
Year**, on a report already filtered to **Europe** and **Volume
Discount** promotions via two report-level filters. Four measures show
the difference clearly:

| Measure | What it ignores | What it keeps |
|---|---|---|
| `SUM(Sales[Amount])` | Nothing | Category, Year, Europe, Volume Discount — everything |
| `CALCULATE([Sales], ALL(Sales))` | Everything | Nothing — always the full dataset's grand total |
| `CALCULATE([Sales], ALLSELECTED())` | Category, Year (the visual's own breakdown) | Europe, Volume Discount (the report-level filters) |

The `ALLSELECTED()` version is what people mean by a **visual total**: it
answers "what's the total for everything currently selected in this
report, ignoring only how this one visual happens to be broken out." The
`ALL(Sales)` version answers a different question entirely — the total
across the whole dataset, Europe filter and all.

You can also target `ALLSELECTED` at a specific column —
`ALLSELECTED('Date'[Calendar Year])` removes just that column's
visual-level breakdown while leaving everything else (including other
report filters) intact.

## Choosing between ALL and ALLSELECTED

Ask: **should this total respect what the user explicitly selected via
slicers and report filters, or ignore that too?**

- If the answer is *"respect the user's selections, just not the
  visual's own row/column breakdown"* — use `ALLSELECTED`.
- If the answer is *"give me the true grand total, no matter what's
  selected anywhere"* — use `ALL`.

Most "visual total" or "% of visible total" requirements call for
`ALLSELECTED`. True "grand total across the whole model" requirements
call for `ALL`.

## Key terms

| Term | Meaning |
|---|---|
| ALLSELECTED | Removes filters created by the visual's own layout, but keeps filters applied outside it (slicers, report filters) |
| Visual total | A total that respects report-level selections but ignores the current visual's row/column breakdown |

## Lab

1. On **AdventureWorksDW2014**, build a table visual with
   `DimProductCategory[EnglishProductCategoryName]` and
   `DimDate[CalendarYear]` broken out, plus a slicer on
   `DimSalesTerritory[SalesTerritoryRegion]` set to "Europe."
2. Add `CALCULATE([Total Sales], ALL(FactInternetSales))` and
   `CALCULATE([Total Sales], ALLSELECTED())` as two measures.
3. Change the slicer selection and watch how each measure responds
   differently — confirm `ALLSELECTED` respects your Europe selection
   while `ALL` ignores it entirely and shows the worldwide total.

## Check yourself

You're ready for Lesson 46 when you can explain, in one sentence, the
exact difference between what ALL ignores and what ALLSELECTED ignores.
