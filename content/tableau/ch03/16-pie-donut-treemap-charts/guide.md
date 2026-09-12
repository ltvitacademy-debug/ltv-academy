# Lesson 16 — Pie, Donut & Tree Map Charts

**Chapter 3 · Visualization Fundamentals · Lesson 16 of 95**

## What you'll learn

- How to build a pie chart from a dimension and a measure, and why
  Tableau treats it as a special case (Angle instead of Y-axis position)
- How to build a treemap, and how it encodes two measures at once
  (size and color) in a single view
- Why Tableau has no built-in donut chart, and the standard workaround
  for building one anyway
- Why all three of these are "part-to-whole" charts, and where each one
  falls apart

## Building a pie chart

Drag a measure to Columns and a dimension to Rows, and Tableau's
default is a bar chart. Click **Show Me** and select the pie icon, and
three things happen at once: the dimension moves to **Color**, the
measure moves to **Angle** on the Marks card, and the mark type
switches to **Pie**. Angle is the pie-specific equivalent of an axis —
it's what turns a measure's value into a slice's size.

![A pie chart with four labeled slices — Technology (largest, in red), Office Supplies (orange), and a small Furniture slice (blue) — each labeled directly on the slice.](/courses/tableau/ch03/16-pie-donut-treemap-charts/pie-chart-labeled.png)
*A finished pie chart with direct labels added via the Marks card — Profit by Category, Sample Superstore.*
Source: [Tableau Help — Build a Pie Chart](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_pie.htm)

Tableau's own guidance here is blunt: keep pie charts to a small number
of slices, ideally no more than five unique values. Past that, slices
become too close in size to compare by eye, and the chart stops doing
its one job — a fast, at-a-glance sense of one segment's share of a
whole.

## Building a treemap

A treemap displays a dimension as a set of nested rectangles instead of
slices. Click Show Me and select the treemap icon, and Tableau produces
a bar-chart-like measure aggregated into rectangles sized by that
measure — the classic case is one measure controlling **both** size and
color at once, which is where a treemap earns its keep over a pie
chart:

![A treemap of product sub-categories — large dark-blue rectangles for Chairs and Phones, medium teal rectangles for Tables, Binders, Machines, and Accessories, and small pale rectangles for lower-selling sub-categories like Paper and Supplies.](/courses/tableau/ch03/16-pie-donut-treemap-charts/treemap.png)
*A finished treemap — rectangle size and color both driven by Sales, so the biggest, darkest boxes are instantly the biggest sellers.*
Source: [Tableau Help — Build a Treemap](https://help.tableau.com/current/pro/desktop/en-us/buildexamples_treemap.htm)

Drag a second measure — like Profit — onto Color instead, and the
rectangles keep their Sales-driven size but recolor by profitability.
That's the treemap's real advantage over a pie: it can encode **two**
measures in one glance (size and color), where a pie chart can only
really encode one (angle).

## Building a donut chart

Here's an honest gap: **Tableau has no built-in donut chart type.**
There's no icon for it in Show Me, and there's no dedicated "Build a
Donut Chart" page on Tableau's own help site — a donut chart is
something the Tableau community builds as a workaround, not a feature
Tableau ships. The standard technique:

1. Build your pie chart as above, then duplicate the same measure axis
   a second time (drag Angle onto the row a second time, effectively
   creating a dual-axis pie).
2. On the second (duplicate) pie layer, remove its dimension from Color
   so it renders as a single solid — usually white — circle, and shrink
   its size on the Marks card so it sits smaller than the first pie
   layer.
3. Right-click the second axis and select **Dual Axis**, then
   **Synchronize Axis** so both pies share the exact same center point —
   the smaller white circle now sits on top of the larger colored pie,
   punching a hole through its middle.

A donut chart communicates exactly what a pie chart does — it's a
part-to-whole view with the same slice-counting limitations — but frees
up the center of the circle for a label, like a grand total, that a
solid pie chart has nowhere to put.

## Choosing between the three

All three chart types in this lesson answer the same question — "how
does this whole break into parts?" — with different tradeoffs:

| Chart | Best for | Falls apart when |
|---|---|---|
| Pie | A handful of slices (≤ 5), simple share-of-whole | Too many categories, or slices close in size |
| Donut | Same as pie, plus a center label/total | Same limitations as pie, plus Tableau doesn't build it natively |
| Treemap | Many categories, and/or a second measure via color | Deeply nested hierarchies get visually noisy |

## Key terms

| Term | Meaning |
|---|---|
| Angle | The pie chart's equivalent of a Y-axis — the Marks card field that determines each slice's size |
| Treemap | A part-to-whole chart using nested, sized rectangles instead of slices — can encode a second measure via color |
| Dual axis (pie) | The technique behind a donut chart — layering two pie marks on the same axis so one masks the center of the other |

## Lab

1. Open Sample Superstore. Build a pie chart of Profit by Category
   using Show Me, then add Category as a label directly on the slices.
2. Build a treemap of Sales by Sub-Category, then drag Profit onto
   Color and describe in one sentence how the story changes.
3. Attempt the donut workaround above on your pie chart from step 1.

## Check yourself

You're ready for Lesson 17 when you can name the one Marks card field
that's unique to pie charts, explain why a treemap can show two
measures where a pie chart effectively shows one, and say why Tableau
has no native donut chart type.
