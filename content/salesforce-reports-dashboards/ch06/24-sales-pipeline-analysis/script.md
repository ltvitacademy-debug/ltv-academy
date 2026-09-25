# Script — Sales Pipeline Analysis

## Segment 1 (title)

Chapter six is sales analytics, and pipeline is the first question every sales leader asks: how much is in play, where is it sitting, and is it moving?

## Segment 2 (screenshot: sales dashboard)

This real Lightning sales dashboard shows the pattern. Amount by stage is a funnel widget, so drop-off between stages is visible. Top accounts sits beside it as a bar chart, and open opportunities as a table. Each widget is one report, and each report answers a single pipeline question.

## Segment 3 (code: SOQL equivalent)

You already know the Opportunity object, so think of a pipeline report as this query. Open opportunities, grouped by stage, summing Amount. In the report builder that is a filter for not closed, a grouping on Stage, and a summary of Amount. Agree the definition with sales leaders first. Some teams weight by probability.

## Segment 4 (steps: three core views)

Build three core views. Pipeline by stage, shown as a funnel. Pipeline by close date, grouped by month or fiscal quarter, so you can see when it should convert. And pipeline by owner, sorted by amount, to see who carries it and who is thin.

## Segment 5 (steps: metrics)

Put a few metrics on the dashboard. Total open pipeline as a metric widget. Weighted pipeline, using Expected Amount. Average deal size. New pipeline created this period. And pipeline age, to spot deals that have sat too long. Add a filter for owner or region.

## Segment 6 (outro)

Know the limits. Native reports show pipeline as it is now, so a snapshot from the start of the quarter needs history features that depend on your setup. Coverage against quota is awkward too, because quota lives elsewhere. Next: forecast analysis.
