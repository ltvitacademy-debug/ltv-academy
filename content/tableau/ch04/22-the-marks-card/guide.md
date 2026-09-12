# Lesson 22 — The Marks Card: Color, Size, Detail & Shape

**Chapter 4 · Formatting & Visual Design · Lesson 22 of 95**

## What you'll learn

- What the Marks card actually controls, and why every chart-building lesson
  from here forward refers back to it
- How Color and Size behave differently for dimensions vs. measures
- What Detail does that Color and Size don't
- How Shape lets you swap the default mark for something else entirely

## The Marks card, in one sentence

Every lesson in Chapter 3 had you drag fields onto Columns and Rows to build
a chart's basic shape. The **Marks card** is what controls everything else:
how each mark in that chart actually *looks* — its color, its size, its
level of detail, its label, its tooltip, and (for some chart types) its
shape.

## Color

Drop a field onto Color and Tableau encodes it visually. What that encoding
looks like depends on the field's type:

![The Marks card with Profit dropped on Color — a green color legend runs from a low of $540 to a high of $43,901, and a table of profit by region and year is shaded accordingly.](/courses/tableau/ch04/22-the-marks-card/marks-card-color.png)
*Profit on Color produces a continuous gradient legend — every cell shades itself based on its own value.*
Source: [Tableau Help — Control the Appearance of Marks in the View](https://help.tableau.com/current/pro/desktop/en-us/viewparts_marks_markproperties.htm)

- **Continuous field (a measure)** → a gradient legend, like the Profit
  example above
- **Discrete field (a dimension)** → a categorical legend, one distinct
  color per member (Region gets one color for East, another for West, and
  so on)

## Size

Click **Size** on the Marks card and a slider appears — drag it and every
mark in the view resizes at once, uniformly.

![The Marks card with Size clicked open, showing a horizontal slider control, with Ship Mode on Detail and SUM(Quantity) on Size.](/courses/tableau/ch04/22-the-marks-card/marks-card-size.png)
*Click Size to get a manual slider — or drop a measure directly onto Size to scale marks by that field's value.*
Source: [Tableau Help — Control the Appearance of Marks in the View](https://help.tableau.com/current/pro/desktop/en-us/viewparts_marks_markproperties.htm)

Drop a measure onto Size instead of using the slider, and Tableau scales
each mark's size proportionally to that measure — bigger circles for
bigger sales, thicker lines for higher volume.

## Detail

Detail is the property people forget exists. It adds a field to the view's
**level of detail** — meaning marks get split apart by that field's
members — without adding any color, size, or shelf field of its own. Use it
when you want more granular marks (say, one mark per Customer instead of
one per Region) but don't want another color or shelf cluttering the view.

## Shape

Shape swaps the default mark (usually a circle, square, or bar) for a
custom shape, driven by a dimension — one shape per category. It only
applies to mark types that support it (Shape mark type, or Circle marks
you convert to Shape).

## Key terms

| Term | Meaning |
|---|---|
| Marks card | The panel controlling color, size, label, detail, shape, and tooltip for every mark in the view |
| Continuous encoding | A gradient (for Color) or proportional scaling (for Size), driven by a measure |
| Categorical encoding | Distinct values (one color or shape per member), driven by a dimension |
| Level of detail (mark-level) | How granular the marks in a view are — Detail adds granularity without a visual encoding |

## Lab

1. Open Tableau Desktop against Sample Superstore. Build a bar chart of
   Sales by Sub-Category, then drop Profit onto Color and watch the bars
   recolor.
2. Drop Sales onto Size instead, and observe how it behaves differently
   depending on the mark type (bar vs. circle).
3. Add Customer Name to Detail on a scatter plot of Sales vs. Profit by
   Region, and watch the mark count jump without any new color appearing.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking, the
difference between what Color does for a continuous field vs. a discrete
field, and why Detail is useful even though it adds no visible encoding.
