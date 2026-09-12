# Lesson 4 — Named Ranges

**Chapter 1 · Excel Fundamentals Refresher · Lesson 4 of 25**

## What you'll learn

- How to define a name for a cell or range, and use it directly in a
  formula in place of a cell reference
- The Name Manager — where every name in a workbook lives, and how to
  audit or clean them up
- Why named ranges make formulas self-documenting, which matters most
  in a workbook other people will open

## Defining a name

Select a cell or range, then either type a name directly into the
Name Box (the same field from Lesson 1 that shows the current cell
address) and press Enter, or use **Formulas → Define Name** for more
control — including restricting the name's scope to a single
worksheet instead of the whole workbook. A name must start with a
letter or underscore and can't contain spaces or match a real cell
reference like `Q1`.

## Using a name in a formula

Once `TaxRate` is defined as a name for cell `$B$1`, it can be typed
directly into any formula:

```
=B2*TaxRate
=SUMIFS(Sales,Region,"West")
```

`=B2*TaxRate` reads as plain English at a glance — compare that to
`=B2*$B$1`, which tells the reader nothing about what `$B$1` actually
holds without clicking over to check. `Sales` and `Region` above are
named ranges standing in for full columns, which reads closer to a
database query than a spreadsheet formula.

## The Name Manager

![The Name Manager dialog listing several defined names — Amount, Extract, Profit, Quantity, and a Table5 — each with its value, what it refers to, and its scope (Workbook or a specific sheet).](/courses/excel/ch01/04-named-ranges/name-manager.png)
*Every name in the workbook lives here — including the ones Excel creates automatically when you build a Table (Lesson 3), which is why `Table5` shows up in this same list.*
Source: [Microsoft Support — Use the Name Manager in Excel](https://support.microsoft.com/en-us/office/use-the-name-manager-in-excel-4d8c4c2b-9f7d-44e3-a3b4-9f61bd5c64e4)

Open it from **Formulas → Name Manager** (or `Ctrl+F3`). It's where
you go to rename, edit what a name refers to, delete unused names, or
diagnose a `#REF!` value shown next to a name — which means whatever
that name used to point at was deleted, and every formula using that
name is now broken until it's redefined.

## Why this matters in a shared workbook

A named range's real value isn't convenience for the person who built
it — it's clarity for whoever opens it next. `=Revenue-COGS` tells a
new reader what a formula computes without opening a second window to
check what columns `D` and `E` hold. In a workbook that gets handed
off, reviewed, or audited, that difference is the entire argument for
using named ranges over raw cell references in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Named range | A word-based name assigned to a cell or range, usable directly inside formulas |
| Name Box | Where a name can be typed to create it (also used in Lesson 1 to jump to cells) |
| Name Manager | The dialog (Formulas → Name Manager, or Ctrl+F3) listing every name in the workbook |
| Scope | Whether a name is usable workbook-wide or restricted to one worksheet |

## Lab

1. Select a single cell holding a constant (like a tax rate) and name
   it using the Name Box.
2. Build a formula elsewhere in the sheet that uses the name instead
   of the cell reference.
3. Open the Name Manager (`Ctrl+F3`) and confirm your new name appears
   alongside any names Excel auto-created for Tables.

## Check yourself

You're ready for Lesson 5 when you can explain why `=B2*TaxRate` is a
better formula for a shared workbook than `=B2*$B$1`, even though both
compute the exact same result.
