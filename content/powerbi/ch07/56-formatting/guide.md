# Lesson 56 — Formatting & Conditional Formatting

**Chapter 7 · Building Reports & Visualizations · Lesson 5 of 10**

## What you'll learn

- The three format styles behind conditional formatting: gradient, rules, and field value
- How to color a table column by rules you define
- How to add data bars and icons instead of, or alongside, color
- Where conditional formatting is available beyond tables

## Reaching conditional formatting

Select a **Table** or **Matrix**, then in the field's dropdown menu
choose **Conditional formatting**, and pick a formatting type:
background color, font color, data bars, icons, or web URL. You can
combine more than one on a single column.

## Color by rules

**Rules** let you assign a color to specific value ranges you define —
green above a target, yellow near it, red below it:

![Screenshot of a table with an Affordability column colored by rules — green, yellow, and red bands based on value ranges.](/courses/power-bi/ch07/56-formatting/table-formatting-1-color-by-rules-table.png)
*Each rule sets an "if value" range and a color — here, based on percent-of-range rather than fixed numbers.*

Rules can be set as a **Percent** (of the overall min-to-max range) or
as a **Number** (the field's literal value). Choosing Percent when your
rule boundaries were meant as literal numbers — or vice versa — is the
single most common conditional formatting mistake; double-check which
one your rule actually needs.

## Data bars: a bar chart inside the cell

**Data bars** show a proportional bar directly inside each table cell,
letting viewers compare values at a glance without leaving the table:

![Screenshot of a table with data bars showing proportional bar lengths inside the Affordability column's cells.](/courses/power-bi/ch07/56-formatting/table-formatting-3-default-table-bars.png)
*Bar length scales to the cell's value — longer bars, higher numbers. Turn on "Show bar only" to hide the number and let the bar speak for itself.*

## Icons: a visual status indicator

**Icons** attach a small graphic — arrows, traffic lights, flags,
stars — to each value, based on rules or a field value:

![Screenshot of a table with icons (diamonds, triangles, circles) applied to the Affordability column based on value rules.](/courses/power-bi/ch07/56-formatting/table-formatting-1-default-dialog.png)
*Red diamonds, yellow triangles, green circles — a status read at a glance, no legend required.*

Power BI groups built-in icon sets by category — Directional (arrows,
trend indicators), Shapes (traffic lights, circles), Indicators (flags,
checkmarks), and Ratings (stars, signal bars). You can also point at a
column of image URLs instead of a built-in set, for fully custom icons.

## Where else conditional formatting applies

Tables and matrices aren't the only visuals that support it —
conditional formatting also works on column and bar chart colors,
button slicers, cards, and several other visual types. The same three
format styles apply everywhere it's available: **Gradient** (a smooth
color scale), **Rules** (value ranges you define), and **Field value**
(colors pulled directly from a column or a measure you build for the
purpose).

## A practical habit: color by calculation

Rather than building several rules by hand in the dialog, you can write
a measure that returns the color you want directly — a hex code, an RGB
value, or a named color — then apply it with **Field value**. This is
often faster than maintaining rules once your logic gets even slightly
complex, and it keeps the coloring logic visible and testable as a
formula instead of buried in a dialog.

## Key terms

| Term | Meaning |
|---|---|
| Format style | Gradient, Rules, or Field value — the three ways conditional formatting can be driven |
| Data bar | A proportional bar rendered inside a table cell |
| Icon set | A built-in or custom collection of small graphics applied by rule or field value |

## Lab

1. On a table built from **AdventureWorksDW2014**, apply **Rules**-based
   background color to a sales measure — one color for above-average
   values, another for below.
2. Add **Data bars** to the same or a different numeric column, and
   toggle **Show bar only** to compare the two looks.
3. Write a simple measure using `SWITCH` or `IF` that returns a hex
   color based on a condition, and apply it with **Field value**
   formatting.

## Check yourself

You're ready for Lesson 57 when you can name all three conditional
formatting format styles and give one scenario where each fits best.
