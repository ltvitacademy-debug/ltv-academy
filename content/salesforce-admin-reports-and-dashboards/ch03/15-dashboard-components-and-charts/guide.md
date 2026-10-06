# Dashboard Components and Charts

**Chapter 3 · Dashboards · Lesson 15 of 22**

Every widget on a dashboard starts the same way: a real report, turned into something glanceable. This lesson walks that path end to end — from the report that holds the raw numbers, through the Add Widget dialog where you pick a chart type, to the finished component sitting on the dashboard.

## What you'll learn

- The widget types available: Chart, Metric, Gauge, Table, Text, Image
- How a source report becomes a chart, step by step
- Which chart type fits which kind of question
- Why "Use chart settings from report" matters

## Every widget starts as a report

Before you can add a chart widget, a report has to exist with the right grouping already built in — a pie or donut chart needs a grouped field to slice by, a bar or line chart needs a grouping plus a value to measure. The widget doesn't do any new calculation; it visualizes exactly what the source report already produces.

## The Add Widget dialog

Click **+ Widget → Chart**, pick the source **Report**, then choose **Display As**: bar, column, line, donut, funnel, number, gauge, or table icons across the top of the dialog. Set the **Value** (what's being measured) and **Sliced By** (what it's grouped by), and a **live Preview** updates on the right before you commit — so you see the actual chart, not a guess, before it's added to the dashboard.

## Matching chart type to question

- **Donut / Pie** — parts of a whole (leads by source, cases by priority).
- **Bar / Column** — comparing a handful of categories side by side.
- **Line** — a trend over time (deals by close date, cases opened per week).
- **Funnel** — a sequence with expected drop-off (pipeline by stage).
- **Metric / Gauge** — a single number, optionally against a target range.
- **Table** — when the raw rows themselves are the point, not a visual summary.

## "Use chart settings from report"

If the source report already has a chart configured, the widget can simply inherit that chart's settings instead of being reconfigured from scratch. This keeps a report and its dashboard component visually consistent and saves re-picking the same options twice — useful when several dashboards all surface the same report.

## Recap

- A chart widget visualizes a report; it adds no calculation of its own.
- The Add Widget dialog's live preview shows the real chart before you commit.
- Chart type should match the question: parts-of-a-whole, comparison, trend, sequence, or single number.
- "Use chart settings from report" keeps a widget and its source report visually in sync.

## Check yourself

A dashboard needs to show how many open cases are in each priority tier, as a share of all open cases. Which chart type fits best, and why would a line chart be the wrong choice here?
