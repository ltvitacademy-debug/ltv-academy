# Script — Waterfall, Funnel & Pareto Charts

## Segment 1 (title)

Three chart types, but only one of them has a dedicated Show Me option. The other two are real, working techniques you build by hand — worth knowing exactly how they're constructed, not just what they look like.

## Segment 2 (screenshot: Pareto chart)

Tableau documents this one end to end: a bar chart sorted largest to smallest, with a second axis showing the cumulative percentage of total as a rising line. It's the dual-axis technique from two lessons ago, combined with running total and percent-of-total table calculations.

## Segment 3 (code: waterfall)

A waterfall chart has no menu option at all. It's built from Gantt bars — bar length is the measure itself, made negative for a decrease — and the bar's starting position is a running total of everything that came before it, minus its own value.

## Segment 4 (code: funnel)

A funnel is the same story: no native chart type. You center a bar chart and shrink its width stage over stage, using a calculated padding measure based on the gap between the current stage and the largest one, so the bars visually taper toward the middle.

## Segment 5 (outro)

Next lesson goes further with reference lines — bands, distributions, and dynamic targets driven by parameters instead of fixed numbers.
