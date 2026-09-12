# Lesson 2 — Data Types & Formatting

**Chapter 1 · Excel Fundamentals Refresher · Lesson 2 of 25**

## What you'll learn

- Why Excel's automatic type detection is a frequent, silent cause of
  broken formulas
- How to spot a number that's secretly stored as text — and a date
  that's secretly a string
- The functions that fix it: `TEXT`, `VALUE`, and `DATEVALUE`
- Why `SUM`, `VLOOKUP`, and sorting all behave differently once a
  "number" isn't actually a number

## The gotcha this lesson is really about

Every cell in Excel has an underlying data type — number, text, date,
boolean, error — and Excel guesses that type the moment you type
something in. Most of the time the guess is right and you never think
about it. The problem is the times it's wrong, because a wrong guess
doesn't throw an error. It just quietly produces a workbook where
`=SUM(D2:D10)` returns a smaller number than it should, or a `VLOOKUP`
against an ID column returns `#N/A` even though the value is "right
there," because one side is the number `1024` and the other is the
text `"1024"` — and to Excel those are not the same value.

## Spotting a number stored as text

![A worksheet column of numbers with small green triangles in the top-left corner of several cells, with a tooltip reading 'Numbers that are actually text are usually left-aligned'.](/courses/excel/ch01/02-data-types-and-formatting/numbers-stored-as-text.png)
*The green triangle is Excel's built-in error-checking flag for a text-formatted number — and left-alignment (instead of numbers' normal right-alignment) is the tell even without the triangle.*
Source: [Microsoft Support — Convert numbers stored as text to numbers in Excel](https://support.microsoft.com/en-us/excel/convert-numbers-stored-as-text-to-numbers-in-excel)

Two visual tells, and you should check for both because the triangle
can be turned off in Excel's options while the alignment tell can't:

- **The green triangle** in the cell's top-left corner. Click the cell,
  click the warning icon that appears, and choose **Convert to Number**
  to fix it in place — the fastest fix when it's a handful of cells.
- **Left-alignment.** Numbers right-align by default; text left-aligns.
  A column of "numbers" that are all left-aligned is text, triangle or
  not — this is the tell that survives even when error-checking is
  disabled workbook-wide, which happens often in shared files.

This shows up constantly after importing from a CSV, copying from a
web page, or pulling from a system that exports IDs, zip codes, or
account numbers as text to preserve leading zeros.

## Fixing it with formulas

Selecting the cells and choosing Convert to Number doesn't scale past
a handful of cells, and it doesn't work at all when the source data
refreshes. For anything repeatable, use a formula in a helper column:

```
=VALUE(A2)       Converts a numeric-looking text string to a real number
=DATEVALUE(A2)   Converts a date-looking text string to a real date serial
=TEXT(A2,"0.00") The reverse — forces a real number to display as text
```

`VALUE` and `DATEVALUE` both fail with `#VALUE!` if the text doesn't
actually look like a number or date — which is useful, because it
flags rows that need a human look rather than silently converting
garbage.

`TEXT` goes the other direction on purpose: sometimes you want a
number to behave as text — building a formatted label like `"Q3 2026"`
inside a formula, for example — and `TEXT` is how you do that without
accidentally creating the exact problem this lesson is about.

## Why this matters for lookups specifically

This comes back hard in Chapter 2. `VLOOKUP`, `XLOOKUP`, and
`INDEX`/`MATCH` all compare values for an exact match, and a text
`"1024"` does not match a numeric `1024` even though they display
identically. When a lookup that "should obviously work" returns an
error, checking whether one side is text and the other is a real
number is one of the first things to check — before assuming the
formula itself is wrong.

## Key terms

| Term | Meaning |
|---|---|
| Green error triangle | Excel's error-checking flag on a cell, including for text-formatted numbers |
| `VALUE()` | Converts a numeric-looking text string into a real number |
| `DATEVALUE()` | Converts a date-looking text string into a real date serial value |
| `TEXT()` | Converts a real number or date into a formatted text string |

## Lab

1. Type a number into a cell, then format that same cell as Text
   (Home → Number Format → Text) and re-type the number. Confirm it
   left-aligns and shows the green triangle.
2. In a helper column, use `=VALUE()` to convert it back to a real
   number, and confirm it right-aligns with no triangle.
3. Build a small two-column table where one ID column is text and a
   matching ID column is numeric. Try `=VLOOKUP()` between them and
   confirm it fails with `#N/A` until you convert one side to match.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking it
up, why a `VLOOKUP` might fail against data that "looks identical" on
screen.
