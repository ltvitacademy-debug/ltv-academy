# Lesson 1 — Interface & Shortcuts for Speed

**Chapter 1 · Excel Fundamentals Refresher · Lesson 1 of 25**

## What you'll learn

- What this course assumes you already know about Excel, and what it
  actually teaches
- A fast refresher on the ribbon, the grid, and the Name Box
- The handful of keyboard shortcuts that separate a fast analyst from
  a slow one
- Why this course starts with a refresher chapter instead of jumping
  straight to PivotTables

## What this course is — and isn't

This is **not** a 100-video "Excel from zero" course. It assumes you
already know how to open Excel, type into a cell, and build a basic
formula. What it teaches is the specific slice of Excel that shows up
constantly in analyst work: lookups, aggregation logic, PivotTables,
dynamic arrays, and Power Query — the tools that turn Excel from "a
place to type numbers" into a real analysis tool. Chapter 1 is a short
refresher to make sure everyone's starting from the same baseline
before Chapter 2 gets into real analyst-grade functions.

## The grid and the ribbon, briefly

![A blank Excel workbook grid — columns A through D, rows 1 through 9, with cell A1 selected.](/courses/excel/ch01/01-interface-and-shortcuts-for-speed/excel-blank-workbook.jpg)
*Every workbook starts here — the grid is the whole product; everything else exists to manipulate what's in it.*
Source: [Microsoft Support — Basic tasks in Excel](https://support.microsoft.com/en-us/office/basic-tasks-in-excel-dc775dd1-fa52-430f-9c3c-d998d1735fca)

The ribbon groups commands by tab — Home, Insert, Formulas, Data,
Review, View — and each tab groups related commands together. This
course spends most of its time on the Formulas and Data tabs, not Home.

The **Name Box**, just left of the formula bar, does double duty: it
shows the currently selected cell's address, and typing a cell
reference into it (like `Z100`) and pressing Enter jumps there
instantly — faster than scrolling for any dataset bigger than a
screen.

## Keyboard shortcuts that actually matter for speed

```
Ctrl+Arrow      Jump to the edge of a data region
Ctrl+Shift+Arrow  Select to the edge of a data region
Ctrl+T          Convert a range into a real Excel Table (Lesson 3)
F4              Toggle absolute/relative references ($A$1 vs A1)
Ctrl+;          Insert today's date as a static value
Alt+=           AutoSum the selected range
```

`Ctrl+Arrow` and `Ctrl+Shift+Arrow` alone are worth more to daily speed
than almost anything else in this list — they replace scrolling
through thousands of rows with an instant jump to wherever the data
actually ends.

## Key terms

| Term | Meaning |
|---|---|
| Ribbon | The tabbed command area at the top of Excel, grouped by task |
| Name Box | The address field left of the formula bar — shows and jumps to cell references |
| Ctrl+Arrow | The keyboard shortcut that jumps to the edge of a contiguous data region |

## Lab

1. Open any workbook with more than 20 rows of data. Practice `Ctrl+Down` and `Ctrl+Up` to jump between the top and bottom of a column without scrolling.
2. Type a far-away cell reference (like `AA500`) into the Name Box and press Enter — confirm it jumps you there instantly.
3. Select a range and press `Alt+=` to AutoSum it in one keystroke.

## Check yourself

You're ready for Lesson 2 when `Ctrl+Arrow` and the Name Box both feel
faster to you than scrolling — if they don't yet, that's exactly what
the lab is for.
