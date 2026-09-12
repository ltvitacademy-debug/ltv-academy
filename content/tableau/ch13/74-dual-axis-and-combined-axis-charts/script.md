# Script — Dual-Axis & Combined-Axis Charts

## Segment 1 (title)

Sometimes two measures matter together but live on very different scales — Sales in the tens of thousands, Profit as a much smaller number. A dual-axis chart gives each one its own axis while sharing the same category labels.

## Segment 2 (screenshot: dual axis menu)

Here's the real Tableau interface. With Sales and Profit both on Rows, right-click the second measure and choose Dual-Axis. The view updates immediately, and Measure Names gets added to Color automatically so the two lines are visually distinguished.

## Segment 3 (screenshot: the finished combo chart)

Change the mark type on just one axis — Profit becomes bars instead of a line — and you've got a true combination chart: bars for the total, a line for the trend, sharing one set of month labels. This bars-plus-line pairing is one of the most common patterns in real dashboards.

## Segment 4 (code: synchronize axis)

By default each axis scales independently. Synchronize Axis forces both onto the same numeric scale — useful when the two measures share a unit and you want a direct size comparison, misleading if you force it on measures that are genuinely different scales.

## Segment 5 (outro)

Next lesson covers three more advanced view types built for at-a-glance monitoring: KPI cards, bullet charts, and sparklines.
