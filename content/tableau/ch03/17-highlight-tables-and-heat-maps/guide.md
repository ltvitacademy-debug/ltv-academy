# Lesson 17 — Highlight Tables & Heat Maps

**Chapter 3 · Visualization Fundamentals · Lesson 17 of 95**

## What you'll learn

- How to build a highlight table — a text table that uses color instead
  of (or in addition to) numbers to make a pattern jump out
- How a heat map is a highlight table with a second measure encoded via
  the size of each cell, not just its color
- Why the choice of color palette (sequential vs. diverging) changes
  what a highlight table communicates
- When color-coded tables beat a chart, and when they don't

## Building a highlight table

Start with a nested text table: drag **Segment** to Columns, then
**Region** and **Sub-Category** to Rows (dropping Sub-Category to the
right of Region so it nests inside it). Now drag a measure — **Profit**
— onto **Color** on the Marks card. Tableau aggregates it as a sum and
recolors every cell in the grid, from the most negative value to the
most positive:

![A highlight table showing Profit across Segment, Region, and Sub-Category, with each cell colored from dark orange (least profitable) through pale blue to dark blue (most profitable).](/courses/tableau/ch03/17-highlight-tables-and-heat-maps/highlight-table.png)
*A finished highlight table — same layout as a plain text table, but color makes the most and least profitable sub-categories visible at a glance instead of requiring you to scan every number.*
Source: [Tableau Help — Build a Highlight Table or Heat Map](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_highlight.htm)

That's the whole idea of a highlight table: it's a text table first,
and a chart second. The grid structure (rows and columns of categories)
stays exactly as readable as a spreadsheet, but color does the work a
human eye would otherwise have to do — hunting row by row for the
biggest or smallest number.

## From highlight table to heat map

A heat map is what you get when you add a **second** measure to
**Size** on top of the color encoding — instead of every cell being the
same square, cell size now varies too:

![The same table now rendered as a heat map — cells vary in both color (Profit, using a Red-Black Diverging palette) and size (Sales), so the biggest, most visually prominent cells are the highest-revenue sub-categories.](/courses/tableau/ch03/17-highlight-tables-and-heat-maps/heat-map.png)
*A finished heat map — Sales drives the size of each square, Profit drives its color, encoding two measures in one grid.*
Source: [Tableau Help — Build a Highlight Table or Heat Map](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_highlight.htm)

Two of Tableau's own building choices are worth calling out because
they change what the view communicates:

- **Cell borders.** Adding a medium-gray border around each cell makes
  individual cells easier to distinguish from their neighbors — without
  it, similarly colored adjacent cells can blur together.
- **Color palette: sequential vs. diverging.** A measure like Profit
  that can be negative or positive calls for a **diverging** palette —
  one color ramping toward one extreme, a different color ramping
  toward the other, meeting at a neutral midpoint (zero). A measure
  that's always positive, like Sales or Quantity, is usually better
  served by a **sequential** palette — one color, increasing in
  intensity. Tableau also lets you toggle "Use Full Color Range," which
  changes whether the color scale is centered on the data's actual
  min/max or symmetric around zero — worth testing both ways on any
  measure that can go negative.

## When to use a highlight table or heat map

These are the right call when you have a genuinely tabular structure —
multiple dimensions crossed against each other — and you want a pattern
to be scannable without giving up the ability to still read exact
values off the grid. They start to break down when there are too many
rows or columns to fit on screen at once, or when the measure you're
coloring by doesn't have a meaningful "high vs. low," where color
becomes decoration instead of information.

## Key terms

| Term | Meaning |
|---|---|
| Highlight table | A text table with a measure mapped to Color, so cell color (not just cell value) shows the pattern |
| Heat map | A highlight table with a second measure also mapped to Size, encoding two measures in one grid |
| Diverging palette | A two-color color scale meeting at a neutral midpoint — the right choice for measures that can be negative or positive |

## Lab

1. Open Sample Superstore. Build a highlight table of Profit by Region
   and Sub-Category, then apply a diverging palette and describe which
   sub-category stands out as least profitable.
2. Add Sales to Size to turn your highlight table into a heat map.
   Note how adding size changes which cells draw your eye first.
3. Toggle "Use Full Color Range" on and off in Edit Colors, and
   describe in one sentence what changed.

## Check yourself

You're ready for Lesson 18 when you can explain the one field that
separates a highlight table from a heat map, and say why a diverging
palette suits Profit better than a sequential one.
