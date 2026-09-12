# Lesson 19 — Spilled Ranges

**Chapter 5 · Dynamic Arrays & Modern Excel · Lesson 19 of 25**

## What you'll learn

- The `#` spilled range operator — referring to a whole spill from
  another formula
- What actually causes a `#SPILL!` error
- How to diagnose and fix one in seconds instead of guessing

## The spill reference operator: `#`

Once a formula spills, you can refer to its **entire result** from
another formula by typing the top-left cell's address followed by a
hash: `A2#`. This isn't a wildcard or a range shortcut — it specifically
means "whatever this spilled array currently contains, however big it
gets."

![=SUM(A2#) totaling every value in a SEQUENCE spill, without hardcoding A2:A11.](/courses/excel/ch05/19-spilled-ranges/spill-ref-sum.png)
*If the SEQUENCE in A2 grows or shrinks, `A2#` grows or shrinks with it — the SUM never needs editing.*
Source: [Microsoft Support — Spilled range operator](https://support.microsoft.com/en-us/office/spilled-range-operator-3dd5899f-bca2-4b9d-a172-3eae9ac22efd)

Compare that to hardcoding `=SUM(A2:A11)`: the moment the spill's size
changes, that hardcoded range is wrong — either missing new rows or
summing blank ones. `A2#` is never wrong, because it always means "the
current spill," not "these ten specific cells."

`#` also works nested inside another dynamic array function, e.g.
`=FILTER(C2#,LEN(C2#)>3)` — filtering an already-spilled array by a
condition built from that same spill.

## What causes a `#SPILL!` error

A `#SPILL!` error means Excel calculated a dynamic array's result but
**couldn't place it** — something is in the way. The most common cause
by far:

![#SPILL! with a dashed blue outline showing exactly which cells are blocking the spill — here, existing data sitting where the result needed to land.](/courses/excel/ch05/19-spilled-ranges/spill-error-blocked.png)
*Excel shows you the intended spill area with a dashed border — anything already occupying a cell inside it is the blockage.*
Source: [Microsoft Support — Dynamic array formulas and spilled array behavior](https://support.microsoft.com/en-us/office/dynamic-array-formulas-and-spilled-array-behavior-205c6b06-03ba-4151-89a1-87a7eb36e531)

Other causes worth knowing:

- **Merged cells** in the spill path — dynamic arrays can't spill
  through a merged cell at all.
- **The formula lives inside an Excel Table** — Tables don't support
  spilling; a dynamic array formula in a Table returns only its own
  cell's value (or errors).
- **Volatile, unpredictable size** — functions like `RANDARRAY` can
  occasionally report a size Excel can't pin down mid-recalculation.

## Fixing it

1. Click the error indicator (the small yellow triangle) on the cell
   and choose **Select Obstructing Cells** — Excel jumps straight to
   what's blocking it.
2. Delete or move whatever's sitting in the spill's path.
3. The formula recalculates and spills the instant the path is clear —
   no need to re-enter it.

## Key terms

| Term | Meaning |
|---|---|
| `#` (spill operator) | References an entire spilled range by its top-left cell, e.g. `A2#` |
| `#SPILL!` | The error shown when a dynamic array's result can't be placed |
| Obstructing cell | Existing content sitting inside a formula's intended spill area |
| Select Obstructing Cells | The error-indicator command that jumps to exactly what's blocking a spill |

## Lab

1. Enter `=SEQUENCE(10)` in `A2`, then in `C2` write `=SUM(A2#)` and
   confirm it totals all ten values.
2. Type any value into a cell a few rows below `A2`, inside where the
   sequence would spill — watch `A2` throw `#SPILL!`.
3. Use the error indicator's **Select Obstructing Cells** option to
   find it, delete it, and confirm the spill recovers immediately.

## Check yourself

You're ready for Lesson 20 when you can look at a `#SPILL!` error and
name the likely cause — blocked cell, merged cell, or a Table — before
you even open the error indicator menu.
