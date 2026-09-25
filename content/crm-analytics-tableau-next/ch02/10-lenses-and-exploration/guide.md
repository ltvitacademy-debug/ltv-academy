# Lenses & Exploration

A dashboard shows the answers someone already decided to build. A **lens** is how you ask a question nobody has built yet. In the last lesson you saw how dashboards are assembled from widgets on top of datasets. This lesson covers the other half of CRM Analytics: free-form exploration of a dataset, one question at a time, without writing a query by hand.

## What you'll learn

- What a lens is, and how it differs from a dashboard
- How to open a lens from a dashboard widget or from Analytics Studio
- How the lens editor is organized: measures, groupings, filters, and trellis
- How to drill into a chart to change its grouping on the fly
- Why exploring in a lens first makes better dashboards

## A lens is a saved exploration

A lens is a visualization of a dataset that you use to explore data graphically. Behind every lens is a query against a single dataset, and the chart is simply that query's result. Because the data has already been loaded into an optimized dataset, the query reruns almost instantly each time you change something, which is what makes exploration feel interactive instead of like waiting on a report.

Compare that with the native Reports tab you already know. A report is built once, run, and read. A lens is built by changing it repeatedly, and you keep the history of what you tried.

## Two ways to get to a lens

The first is from a dashboard. Every widget has a small menu in its corner. Alongside actions such as Set Notification, Annotate, Share, Download, and Show Details, there is an **Explore** action. Choosing it opens the widget's underlying query as a lens, so you continue exactly where the dashboard stopped instead of starting over.

The second is from Analytics Studio, using Create and choosing a lens, then picking the dataset you want to explore.

## Inside the lens editor

The editor has a left panel and a chart. At the top of the chart is a query bar that invites you to start typing what you want to see, and beside it a set of toggles for chart mode, table mode, and a query editor mode.

The left panel is organized by role, and the names depend on the chart type. For a bar chart you will see:

- **Bar Length**: the measure being aggregated, such as a sum of Amount or a count of rows
- **Bars**: the grouping, such as Product Family or Opportunity Owner
- **Trellis**: an optional field that splits the chart into small multiples
- **Filters**: conditions that narrow the rows before aggregation
- **Query Limit**: a cap on how many result rows come back

Each control is a click away from a different answer. Swap the grouping from Product Family to Account Owner, add a filter on Won equals true, or change the bars to a stacked or donut view. A History panel records each change, so you can step back to an earlier state.

## Drilling in

Click a bar and choose **Drill Into This By** to see a list of dimensions in the dataset, such as Account Name, Account Type, or Billing Country. Pick one and the lens regroups that slice by the new field. Options such as Focus narrow the chart to the bars you selected, and a data table view shows the underlying rows.

## Why this matters for developers

Exploration is where good dashboards come from. A lens can be saved, and the same query can be used to build a dashboard step. The habit to build is to prove a chart works in a lens before you commit it to a dashboard page. You find out early that a field is missing, a grouping is too granular, or a filter changes the story.

Screen labels shift between releases and chart types, so treat the names here as a guide to the ideas rather than exact button text.

## Recap

A lens is a saved, query-backed exploration of one dataset. Reach it through a widget's Explore action or through Analytics Studio, adjust measures, groupings, and filters in the left panel, and drill in to change the grouping instantly. Explore first, then build the dashboard.
