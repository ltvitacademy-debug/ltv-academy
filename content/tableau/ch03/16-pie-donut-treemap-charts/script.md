# Script — Pie, Donut & Tree Map Charts

## Segment 1 (title)

Click Show Me and select the pie icon, and three things happen at once: your dimension moves to Color, your measure moves to Angle on the Marks card, and the mark type switches to Pie. Angle is the pie-specific equivalent of an axis.

## Segment 2 (screenshot: pie chart)

Here's a finished pie chart with direct labels — Profit by Category. Tableau's own guidance is blunt: keep pie charts to about five slices or fewer. Past that, slices get too close in size to compare by eye, and the chart stops doing its one job.

## Segment 3 (screenshot: treemap)

A treemap swaps slices for nested rectangles, and it earns its keep by encoding two measures at once — size from one measure, color from another. Here, rectangle size and color are both driven by Sales, so the biggest, darkest boxes are instantly the biggest sellers. Drag a different measure onto Color and the same rectangles recolor by profitability instead.

## Segment 4 (steps: building a donut chart)

Here's an honest gap: Tableau has no built-in donut chart. There's no icon for it in Show Me. The community workaround is to layer a second pie on the same axis, strip its color to a solid white circle, shrink it, then synchronize the dual axis so it masks the center of the first pie — punching a hole through the middle.

## Segment 5 (outro)

Next lesson, you'll build highlight tables and heat maps — using color intensity, not shape, to compare values across a grid.
