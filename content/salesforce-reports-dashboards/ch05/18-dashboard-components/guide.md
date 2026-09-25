# Dashboard Components

A report answers one question in detail. A dashboard puts several of those answers side
by side so a person can take in the state of the business at a glance. Every dashboard
is built from **components**, which the Lightning Dashboard Builder calls **widgets**.
This lesson covers what they are, what feeds them, and how to choose between them.

You already understand the data underneath: objects, fields, and relationships. What is
new is how those show up here. A dashboard stores no data of its own. It is a layout of
widgets, and each widget is drawn from a **source report**.

## What you'll learn

- What a dashboard widget is and how it connects to a source report
- The widget types available in the Lightning Dashboard Builder
- How to add a widget and choose how it displays
- Why the report design decides what the dashboard can show

## Every widget starts with a report

In the Dashboard Builder, the toolbar has a **+ Widget** button. Choosing it offers a
chart or table widget, a text widget, and an image widget. For a chart or table, the
builder asks you to pick a **source report**, then how to display it. Change the report
and you change the numbers; change the report's filters and every widget built on it
changes with them.

That is the most important idea in this chapter: **the dashboard is only as good as the
reports beneath it.** A widget cannot show a field that its source report does not
contain, and a chart widget needs a report with a grouping to slice by. Build the
reports first, keep them focused, and name them so you can find them later.

## The widget types

The Lightning Dashboard Builder offers a set of display types when you configure a
chart widget:

- **Bar charts**: horizontal, vertical, and stacked, for comparing groups
- **Line chart**: for trends over time
- **Donut**: for a few parts of a whole
- **Funnel**: for stage-by-stage drop-off, such as pipeline
- **Scatter**: for the relationship between two measures
- **Gauge**: for progress toward a target value
- **Metric**: one big number, such as total pipeline
- **Table**: a Lightning table, which in current documentation shows up to 10 columns
  and 200 rows, with its columns drawn from the report type

Beyond chart widgets there are **text** and **image** widgets, which are useful for
titles, notes, and links to context.

## Configuring a widget

After you pick a report, the Add Widget dialog shows a live preview. You choose the
display type, the **value** to measure (record count or a summary field), and the field
to slice by. You can also set display units such as shortened numbers, show values and
percentages, and combine small groups into "Others". A checkbox lets you reuse the
chart settings saved on the report itself, which is handy when you already formatted the
chart in the last chapter.

Each widget also carries a **View Report** link, so a viewer can drill from the summary
straight into the detail behind it.

## Layout basics

Widgets snap to a grid. You drag them to move them and drag their edges to resize. Lightning
dashboards let you build with more columns than the older three-column layout, and widgets
can span columns. Save often, and use **Done** to leave the editor.

## Recap

A dashboard is a layout of widgets, and every chart, metric, gauge, or table widget is a
view of one source report. Pick the widget type by the question: bars to compare, lines
for trends, funnels for stages, metrics for a single headline number. Get the reports
right first. Next lesson adds dashboard filters, so one control can steer many widgets.
