# Report Charts

With grouping, subtotals, and formulas in place, the report holds real answers. A **report chart** turns those grouped numbers into a picture that sits directly on the report. It is the fastest way to communicate one insight, and it is also the building block dashboards reuse in Chapter 5.

## What you'll learn

- What a report chart is and why it needs grouped data
- How to add a chart with **Add Chart** and set its properties
- What the chart's axes and groups map to in the report
- How report charts connect to dashboards
- The honest limits of native report charts

## Charts need grouped data

Look at the two screenshots. The first is a **tabular** report, Direct Customer Accounts. In the header, the **Add Chart** button is greyed out. A plain list of rows has nothing to aggregate, so there is nothing to plot. (Salesforce does allow a chart on a tabular report in some situations, such as when a row limit is set, but the everyday rule is: no groupings, no chart.)

The second screenshot is a grouped **summary** report, Leads by Lead Source. There, **Add Chart** is enabled. The groupings you built in Lesson 10 supply the categories, and the summarized values supply the measures. This is why analysts build the grouped report first and the chart second.

## Adding a chart

In the Lightning Report Builder, the steps are:

1. Build or open a summary or matrix report with at least one grouping and a summarized value, even just Record Count.
2. Click **Add Chart** in the report header.
3. Choose a chart type. The next lesson goes through the types in detail.
4. Open the chart's properties, typically a gear or a **Chart Properties** panel, and set the details.
5. Save the report. The chart is stored as part of the report definition.

When someone runs the report, the chart appears above the table, and it can usually be shown or hidden.

## What the properties map to

Chart properties are not new data; they are choices among things the report already contains:

- **X-axis** (or the slices of a donut) comes from a **grouping**, such as Lead Source or Close Month
- **Y-axis** (or the size of a slice) comes from a **summarized value**, such as Record Count or Sum of Amount
- **Groups** or a second grouping produces stacked or grouped series, and needs a report with two groupings, for example a matrix
- Display options cover things like showing values, showing percentages, sort order, and the axis titles

Because the chart can only use what the report groups and summarizes, changing the report changes the chart. If the chart you want needs a measure that is not on the report, add it to the report first, often via a summary formula from Chapter 3.

## One chart per report

A report holds a single chart. If you need several visuals of the same data, that is exactly what a dashboard is for: each dashboard component can point at a report and show its own chart type. In dashboard component settings you may see an option such as **Use chart settings from report**, which tells the component to reuse the chart you saved here instead of its own choices.

## Honest limits

- The chart shows what the report groups, and a report can only display a limited number of groups. With very many categories a chart becomes unreadable, so filter or sort to the top values.
- Native charts have limited customization compared with Tableau or CRM Analytics: chart types are a fixed set and styling options are modest, which Chapter 4's later lessons and the rest of the path address.
- A chart reflects the data at the moment the report runs. It is not a live streaming display; dashboards can be refreshed or scheduled.
- Because the chart is tied to the report's groupings, a chart on a matrix report is more flexible than one on a simple summary report.

## Mapping to SQL

The grouping is your `GROUP BY` column, the summarized value is your aggregate, and the chart is a rendering of that result set:

```sql
SELECT LeadSource, COUNT(*)
FROM Lead
GROUP BY LeadSource
```

## Recap

A report chart plots the grouped, summarized data already in a report. Build the grouped report first, click Add Chart, choose a type, and map the axes to a grouping and a measure. One chart lives on each report, dashboards reuse it, and native charts have real limits on categories and customization.

## Check yourself

Why is Add Chart greyed out on a tabular report, and what change to the report would enable it?
