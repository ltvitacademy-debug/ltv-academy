# Lesson 17 — Dynamic Array Functions

**Chapter 5 · Dynamic Arrays & Modern Excel · Lesson 17 of 25**

## What you'll learn

- What actually makes a function "dynamic" instead of just "a formula
  that returns a range"
- How legacy CSE array formulas worked, and why they were painful to
  live with
- The dynamic array functions you'll use for the rest of this chapter
- How to recognize a spilled range the moment you see one

## The old way: legacy CSE array formulas

Before the 2018 dynamic array engine, an Excel formula that needed to
work across multiple cells at once — say, summing values only where a
condition on a second range was true — had to be entered as an
**array formula**: type the formula, then press `Ctrl+Shift+Enter`
instead of just `Enter`. Excel wrapped it in curly braces automatically
(`{=SUM(IF(...))}`) — you never typed the braces yourself.

The painful part wasn't the keypress. It was that a legacy array
formula always returned a **fixed-size result**, decided the moment
you entered it. If your source data grew from 50 rows to 80, the
formula didn't grow with it — you had to reselect the range and
re-enter the whole formula with `Ctrl+Shift+Enter` again.

## The new way: it just spills

A **dynamic array function** returns as many values as the calculation
produces, and if you enter it into a single cell, Excel automatically
places the rest into the neighboring cells below and to the right —
no `Ctrl+Shift+Enter`, no fixed size, no re-entering the formula when
the source data changes. This is called **spilling**.

![A spilled array's results outlined with a thin blue border — the visual signal that this is one dynamic formula, not five separate ones.](/courses/excel/ch05/17-dynamic-array-functions/dynamic-array-blue-border.png)
*Excel draws that blue border automatically around every spilled range — it disappears the instant you click elsewhere.*
Source: [Microsoft Support — Dynamic array formulas and spilled array behavior](https://support.microsoft.com/en-us/office/dynamic-array-formulas-and-spilled-array-behavior-205c6b06-03ba-4151-89a1-87a7eb36e531)

Only the **top-left cell** of that blue-bordered range actually holds
the formula. Click any other cell inside it and the formula bar shows
the same formula, dimmed and non-editable — it's a live result of the
one formula, not five independent cells you could each overwrite.

## The dynamic array functions in this chapter

| Function | What it returns |
|---|---|
| `FILTER` | Rows matching a condition (Lesson 18) |
| `SORT` | A range reordered by one or more columns (Lesson 18) |
| `UNIQUE` | Distinct values from a range (Lesson 18) |
| `SEQUENCE` | A generated run of numbers |
| `RANDARRAY` | A generated array of random numbers |

`XLOOKUP` (Chapter 2) is also dynamic-array-aware — give it an array
lookup value and it spills a full set of matches back, something
`VLOOKUP` was never built to do.

## Legacy vs. dynamic, side by side

```
Legacy (Excel 2016 and earlier, Ctrl+Shift+Enter):
{=SUM(IF(C2:C100="East",D2:D100))}
Fixed result size, must re-enter if C2:C100 grows

Dynamic (Microsoft 365, press Enter):
=UNIQUE(C2:C100)
Spills automatically, resizes itself if C2:C100 grows
```

## Key terms

| Term | Meaning |
|---|---|
| Spill | A dynamic array's automatic placement of results into neighboring cells |
| Spill range | The full block of cells a dynamic formula's results occupy |
| CSE formula | A legacy array formula entered with Ctrl+Shift+Enter; fixed size |
| Dynamic array function | A function whose result spills automatically when it doesn't fit in one cell |

## Lab

1. In an empty area of a worksheet, enter `=SEQUENCE(10)` in one cell
   and press Enter. Watch it spill ten numbers down a single column.
2. Click a cell in the middle of that spill — confirm the formula bar
   shows the formula dimmed and won't let you edit it directly.
3. Change `=SEQUENCE(10)` to `=SEQUENCE(5,4)` and confirm the spill
   reshapes itself into 5 rows by 4 columns automatically.

## Check yourself

You're ready for Lesson 18 when you can explain, in one sentence, why
a spilled range is *one formula* rather than many — that idea is the
foundation for everything else in this chapter.
