# Lesson 26 — Professional Visualization Design & Avoiding Clutter

**Chapter 4 · Formatting & Visual Design · Lesson 26 of 95**

## What you'll learn

- Why professional chart design is mostly a subtraction skill
- A concrete, real-world before/after example of removing clutter
- The removal sequence: backgrounds, redundant labels, color, then
  bolding and gridlines
- How to apply this same sequence to your own Tableau views

## Addition vs. subtraction

Every other lesson in this chapter has been about adding something to a
chart: color, size, labels, tooltips, titles, reference lines,
annotations. All useful — and all things a chart can have *too much* of.
Professional design is knowing when to stop, and what to cut when you've
gone too far.

## A real before-and-after

The data visualization studio **Darkhorse Analytics** built a widely
used teaching example called *Data Looks Better Naked* — a bar chart of
five foods' calorie counts, first shown fully decorated, then stripped
down step by step:

![A bar chart titled "Calories per 100g" showing French Fries, Potato Chips, Bacon, Pizza, and Chili Dog, rendered with a wood-grain background, a gray plot area, a full color legend, and heavy borders around every element.](/courses/tableau/ch04/26-professional-design-avoiding-clutter/chartjunk-before.png)
*Nothing here is wrong, exactly — but none of it changes the data, and all of it competes with the data for attention.*
Source: [Darkhorse Analytics — Clear Off the Table](https://www.darkhorseanalytics.com/blog/clear-off-the-table)

![The same bar chart after cleanup — no background, no legend, no gridlines, muted gray bars except for Bacon, which is highlighted in red as the point of interest.](/courses/tableau/ch04/26-professional-design-avoiding-clutter/chartjunk-after.png)
*Same five numbers. Everything that wasn't data is gone, and the one bar that matters is the only one still in color.*
Source: [Darkhorse Analytics — Data Looks Better Naked](https://www.darkhorseanalytics.com/portfolio/2016/1/7/data-looks-better-naked-clear-off-the-table)

## The removal sequence

Darkhorse Analytics' actual step order, which maps directly onto how you
should approach cleanup in Tableau:

1. **Remove backgrounds** — gradients, textures, shaded plot areas.
   In Tableau: Format → Shading, set to None.
2. **Remove redundant labels** — if the axis already shows category
   names, a duplicate color legend adds nothing. In Tableau: hide the
   legend once its information is already on a header.
3. **Reduce colors** — one accent color for the mark that matters, gray
   or a neutral for the rest. In Tableau: this is a manual Color edit,
   not an automatic palette.
4. **Remove bolding and gridlines** — anything drawn that isn't the data
   itself. In Tableau: Format → Lines, turn off gridlines you don't need.

## Applying this in Tableau specifically

- Turn off gridlines and zero lines you don't need (**Format → Lines**)
- Hide a legend once its information is redundant with a header
  (right-click the legend → uncheck, or drag it off the view)
- Default to gray, and reserve color for the one or two series that
  actually need the reader's attention
- Question every border, shadow, and background fill — Tableau's
  defaults are usually cleaner than what a spreadsheet tool starts you
  with, but they're not the finish line

## Key terms

| Term | Meaning |
|---|---|
| Data-ink ratio | The proportion of a chart's visual ink devoted to actual data, vs. decoration |
| Chart junk | Any visual element that doesn't help — and often hurts — a reader's understanding |
| Redundant encoding | Showing the same information twice (like a legend duplicating axis labels) |

## Lab

1. Take any chart you've built so far in this course and list every
   visual element on it that isn't the data itself (background, legend,
   gridlines, borders, bolding).
2. Apply the four-step removal sequence to that chart in Tableau, one
   step at a time, and note what changed after each step.
3. Compare the before and after — did you lose any information, or only
   decoration?

## Check yourself

You're ready for Chapter 5 when you can look at any chart — yours or
someone else's — and name at least three specific elements you'd remove
first, in the right order, without changing what the data actually says.
