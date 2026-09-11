# Script — Drillthrough Reports

## Segment 1 (title)

This lesson is drillthrough reports — where clicking a value doesn't expand anything in place, it opens an entirely separate report. Think a sales summary listing order numbers: click one, and a full detail report opens for that specific order.

## Segment 2 (steps: wiring the action)

You always design the target report first — the drillthrough report — usually parameterized so it can filter down to the right data. Then, on the main report, you right-click the item you want to link — a text box, image, or chart point — open its Properties, and go to the Action tab. Select "Go to report," then specify the target report: Browse is the safer choice since it fills in the correct path automatically. If the target report needs parameters, you add them one row at a time — a Name and a Value. And here's the part that trips people up most: the Name has to match the target report's parameter exactly, case included. Get that wrong, or leave an expected parameter off the list, and the drillthrough fails the moment someone clicks it.

## Segment 3 (steps: lazy loading)

Here's what makes drillthrough reports worth reaching for instead of a subreport, which we're covering next lesson: the drillthrough report's data is never touched until the user actually clicks the link. The main report runs and renders immediately — link included — without paying the cost of running the detail report for every single row. Only once someone clicks does that second report actually query anything. That's a meaningfully different cost profile than a subreport, which queries at the same time as the main report no matter what.

## Segment 4 (outro)

Next lesson: subreports — embedding one report inside another, where the embedded report's data loads right alongside the main report's, not on demand.
