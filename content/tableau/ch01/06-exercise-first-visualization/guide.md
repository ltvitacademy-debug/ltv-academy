# Lesson 6 — Exercise: Build Your First Tableau Visualization

**Chapter 1 · Getting Started · Lesson 6 of 95**

## What you'll learn

- How to build a real chart from scratch, start to finish, using
  everything Lessons 1-5 covered
- How Tableau's **Show Me** panel recommends chart types based on the
  fields you've selected
- How to read the finished view using the vocabulary from Lesson 4
  (headers, axis, legend)
- What "done" looks like for a first exercise, so you know when to move
  on

## The exercise

Using Sample Superstore, build this exact view:

1. Open Sample Superstore in Tableau Desktop.
2. Drag **Order Date** onto Columns. Right-click its pill and set it to show **Year** (this is a discrete or continuous choice, per Lesson 5 — try continuous first).
3. Drag **Profit** onto Rows, then **Sales** onto Rows as well, next to it (Tableau will stack them as two separate rows).
4. Drag **Region** onto **Color** in the Marks card.
5. Select both rows (click the first, then Ctrl/Cmd-click the second) and, in the **Show Me** panel (top-right), choose the stacked bar chart option.

You should land on something close to this:

![Real screenshot of a finished Tableau view: two stacked bar charts (Profit and Sales) by year from 2011-2014, colored by Region (Central, East, South, West), with the Marks card and color legend visible.](/courses/tableau/ch01/06-exercise-first-visualization/show-me-result.png)
*What a completed Show-Me-assisted stacked bar view looks like.*
Source: [Tableau Help — Use Show Me to Start a View](https://help.tableau.com/current/pro/desktop/en-us/buildauto_showme.htm)

## What Show Me actually did

**Show Me** looks at which fields you have selected and highlights the
chart types that are actually possible with that combination —
grayed-out options mean "not enough of the right field types selected
yet." It's a recommendation panel, not magic: it rearranges the same
Columns/Rows/Marks mechanics you already know onto the shelves for you,
which is exactly why Lessons 1-5 spent time on that mechanics first.
You can always keep building manually and ignore Show Me entirely —
plenty of experienced Tableau users do, once the shelf mechanics are
second nature.

## Reading what you built

Walk through it with Lesson 4's vocabulary:

- **Columns** hold the continuous YEAR(Order Date) — that's your axis running left to right.
- **Rows** hold two continuous Measures (Profit, Sales) — two separate axes, stacked vertically.
- **Color** on the Marks card holds discrete Region — that's your legend, and it's what splits each bar into four colored segments.

If any of that doesn't match what's on your screen, that's fine —
undo (Ctrl/Cmd+Z) and try again. Getting comfortable with trial and
error here is exactly the point of a hands-on exercise this early.

## Key terms

| Term | Meaning |
|---|---|
| Show Me | The panel that recommends chart types from your selected fields |
| Stacked bar | A bar chart where a Color field splits each bar into segments |
| Ctrl/Cmd-click | Selecting multiple fields at once before choosing a Show Me chart |

## Lab

1. Complete the build steps above from scratch, without looking at the screenshot until you're done.
2. Once built, try swapping Region for Category on Color and see how the chart changes.
3. Try unchecking Show Me's suggestion and manually rebuild the same view using only Columns, Rows, and the Marks card, to prove to yourself you don't need Show Me to get there.

## Check yourself

You're ready for Chapter 2 when you've built this view yourself at
least once without following the steps, and can explain what would
happen if you swapped Profit and Sales for a different pair of
Measures.
