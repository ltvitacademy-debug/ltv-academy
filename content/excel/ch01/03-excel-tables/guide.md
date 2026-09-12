# Lesson 3 — Excel Tables

**Chapter 1 · Excel Fundamentals Refresher · Lesson 3 of 25**

## What you'll learn

- Why converting a range to a real Excel Table (`Ctrl+T`, from Lesson 1)
  is a genuine analyst habit, not a cosmetic upgrade
- Structured references — `Table1[Sales]` instead of `$B$2:$B$500` —
  and why they're more reliable, not just more readable
- The specific thing a Table does that a plain range never will:
  auto-expand formulas and formatting as new rows are added

## A range vs. a Table

Any block of cells with headers can be summed, filtered, and sorted.
Pressing `Ctrl+T` on that same block converts it into an actual Excel
Table object — a different underlying thing, not just a style. Once
it's a Table, Excel tracks it as a named, self-contained range with
its own behavior.

![A converted Excel Table with a filter-arrow header row (Product, Qtr 1, Qtr 2, Grand Total), banded row shading, and a Total row summing each column at the bottom.](/courses/excel/ch01/03-excel-tables/excel-table-overview.png)
*Filter arrows on every header, banded rows, and a Total row all come free the moment a range becomes a Table — none of it requires separate setup.*
Source: [Microsoft Support — Overview of Excel tables](https://support.microsoft.com/en-us/office/overview-of-excel-tables-7ab0bb7d-3a9e-4b56-a3c9-6c94334e492c)

## The real reason analysts use Tables: auto-expansion

This is the habit worth building, and it's easy to underrate until you
watch it happen: add a new row directly beneath a Table, and every
formula in every column of that Table extends automatically to the
new row — no copy-down, no dragging the fill handle. Any formatting
(banded rows, borders, conditional formatting) extends the same way.

Compare that to a plain range: a `SUM` formula referencing `$B$2:$B$500`
does not know row 501 exists. Every analyst has shipped a report that
silently excluded the newest rows of data because the range reference
was never updated — a Table structurally prevents that specific
mistake.

## Structured references

Inside a Table, formulas can reference columns by name instead of by
cell address:

```
=SUM(Table1[Sales])
=Table1[@Sales]*Table1[@Quantity]
```

`Table1[Sales]` means "the entire Sales column of Table1," and it
keeps meaning that as rows are added or removed — no `$` signs to
manage, and no risk of the reference silently pointing at the wrong
range after an edit. `[@Sales]` (with the `@`) means "the Sales value
in this same row," which is what you use inside a calculated column.

Structured references are also self-documenting: `=SUM(Table1[Sales])`
tells the next person reading the formula what it sums, where
`=SUM(B2:B500)` tells them nothing without checking the header row
first.

## Key terms

| Term | Meaning |
|---|---|
| Excel Table | A range converted (`Ctrl+T`) into a tracked object with its own name, filtering, and auto-expansion behavior |
| Structured reference | A formula reference by column name, e.g. `Table1[Sales]`, instead of a cell address |
| `[@ColumnName]` | Inside a Table, refers to that column's value in the current row |
| Total row | An optional summary row at the bottom of a Table using `SUBTOTAL`, which ignores filtered-out rows |

## Lab

1. Take any range of data with headers and press `Ctrl+T` to convert
   it to a Table.
2. Add a formula in a new column using a structured reference, like
   `=[@Price]*[@Quantity]`, and confirm it fills down automatically.
3. Type a new row of data directly beneath the Table and confirm the
   formula and formatting extend to it with no manual action.

## Check yourself

You're ready for Lesson 4 when you can explain the one concrete thing
a Table does that a plain formatted range never will.
