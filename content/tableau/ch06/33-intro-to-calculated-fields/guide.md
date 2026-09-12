# Lesson 33 — Introduction to Calculated Fields

**Chapter 6 · Calculated Fields · Lesson 1 of 7**

## What you'll learn

- What a calculated field is, and why Tableau needs a whole language for it
- How to open the Calculation Editor and create your first calculated field
- What a calculated field looks like once it lands in the Data pane
- The three broad categories of calculations this chapter covers

## What a calculated field actually is

A **calculated field** is a new field you define yourself, using a
formula written in Tableau's own calculation language — a mix of
arithmetic, functions, and logic that reads a lot like a spreadsheet
formula, but operates on the fields already in your data source. Your
data source might have `Sales`, `Discount`, and `Cost` — but it almost
certainly doesn't have `Profit Ratio` or `Is Profitable`. Calculated
fields are how you build those yourself, without touching the
underlying data or writing a single line of SQL.

This matters because real analysis questions rarely map cleanly onto
raw columns. "Which orders lost money?" "What's the discount rate as a
percentage?" "How many days did this order take to ship?" None of
those exist in Sample Superstore as-is — you calculate them.

## Creating a calculated field

Every calculated field starts the same way: **Analysis > Create
Calculated Field**. That opens the **Calculation Editor** — a small
dialog with a name field at the top and a formula box beneath it.

![Tableau Calculation Editor dialog showing a calculated field named Discount Ratio with the formula IIF([Sales] !=0, [Discount]/[Sales],0), a function search panel on the right, and a green "The calculation is valid" status message at the bottom.](/courses/tableau/ch06/33-intro-to-calculated-fields/calc-field-dialog.png)
*The real Calculation Editor, from Tableau's own documentation — this exact dialog is what every lesson in this chapter builds inside.*
Source: [Tableau Help — Create a Calculated Field](https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_create.htm)

A few things worth noticing in that screenshot:

| Area | What it does |
|---|---|
| **Name field** | What this calculated field is called in the Data pane from now on (here, `Discount Ratio`) |
| **Formula box** | Where you type the calculation — Tableau checks syntax as you type |
| **Function panel** | Click the triangle to search and browse every available function, with syntax, a description, and an example |
| **Status message** | "The calculation is valid" (green) or a specific error (red) — Tableau won't let you save a broken formula |

```
Discount Ratio =
IIF([Sales] != 0, [Discount] / [Sales], 0)
```

That formula checks whether `Sales` is non-zero, and if so, divides
`Discount` by `Sales` to get a ratio — otherwise it returns `0` to
avoid dividing by zero. Click **OK**, and `Discount Ratio` appears in
the Data pane immediately, ready to drag onto a view exactly like any
other field.

## Where calculated fields live once you're done

A calculated field isn't a separate thing from your other fields —
it sits in the Data pane alongside everything else, with one visual
difference: an **equals sign (=)** next to its data-type icon. That's
Tableau's permanent visual flag that a field is calculated rather than
coming straight from the source. Whether it lands among Dimensions or
Measures depends on what it returns — a formula that returns a number
(like `Discount Ratio`) becomes a Measure; one that returns text or a
category becomes a Dimension.

## The three kinds of calculations this chapter covers

Tableau's calculation language is genuinely broad, but almost
everything you'll write in practice falls into one of these buckets,
which is exactly the order the rest of this chapter follows:

1. **Arithmetic and KPI calculations** (Lesson 34) — `+`, `-`, `*`,
   `/`, and the ratio/index formulas built from them.
2. **Type-specific functions** (Lessons 35-36) — string functions like
   `LEFT` and `CONTAINS`, date functions like `DATEDIFF` and
   `DATEADD`.
3. **Logic** (Lesson 37) — `IF`/`THEN`/`ELSE` and `CASE`, for
   formulas that return different results depending on a condition.

Lessons 38 and 39 then cover the two things that trip up almost every
new Tableau author at least once: NULLs and data-type mismatches, and
the aggregate-vs-non-aggregate rule that governs which formulas
Tableau will even let you save.

## Key terms

| Term | Meaning |
|---|---|
| Calculated field | A field you define with a formula, rather than one that comes directly from the data source |
| Calculation Editor | The dialog (Analysis > Create Calculated Field) where you name and write a calculated field |
| The `=` icon | The Data pane's permanent marker that a field is calculated, not raw |
| IIF | A shorthand conditional function: `IIF(test, then_value, else_value)` |

## Lab

1. Connect to **Sample Superstore** (from Lesson 3), open **Analysis >
   Create Calculated Field**, and rebuild the exact `Discount Ratio`
   formula from the screenshot above: `IIF([Sales] != 0,
   [Discount]/[Sales], 0)`.
2. Click **OK**, then scroll the Data pane and find `Discount Ratio` —
   confirm it has the `=` icon and landed under Measures.
3. Drag it onto **Color** on the Marks card next to `Category` on
   Rows, and note what changes on the view.

## Check yourself

You're ready for Lesson 34 when you can open the Calculation Editor
from memory, name a new calculated field, and explain what the `=`
icon next to a field means.
