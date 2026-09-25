# Chart Types in Salesforce

Salesforce gives you a fixed set of chart types. That is a strength and a limit: you cannot invent a new visual, but you also cannot pick a wildly wrong one by accident if you know what each does. This lesson walks through the types you will meet in Lightning reports and dashboards, when to use each, and where the native toolkit runs out.

## What you'll learn

- The main chart types and the question each one answers
- How to recognize the chart picker and why some options are greyed out
- How to match a business question to a chart type
- Where dashboard-only visuals like gauges and metrics fit
- Honest limits, and when a different tool is a better choice

## The chart picker

The screenshot shows the **Display As** grid in a real Lightning chart dialog (it comes from adding a component to a dashboard, and the same choices appear when you add a chart to a report). Each icon is a chart type. Notice that a few icons are greyed out. In this example the report, Opportunities by Stage, has only one grouping, and the stacked variants need a second grouping, so they are unavailable. If a type you want is greyed out, the report's groupings are usually the reason, not a bug.

Exactly which icons appear can depend on the context (report versus dashboard) and on your org's release, so treat the list below as the common set rather than a promise.

## The common types

**Bar and column charts (horizontal and vertical)** compare values across categories: Sum of Amount by Stage, Cases by Priority. Horizontal bars suit long category names. Vertical columns suit a natural order such as stages or months. This is your default choice.

**Stacked bar and column charts** split each bar into segments by a second grouping, such as Amount by Stage with a segment for each Lead Source. They need two groupings. They show composition, but only the bottom segment is easy to compare across bars, so use them sparingly.

**Line charts** show change over time. Group by a date at a sensible granularity, such as month, and plot the summarized value. Some versions also offer a cumulative line for running totals.

**Donut charts** show parts of a whole. Lightning uses donuts where Classic had pies. The screenshot of the Leads dashboard shows Lead Source slices with the total record count in the center. Use a donut only with a few slices, and note the option to combine small groups into "Others."

**Funnel charts** show how records narrow through ordered stages, such as the opportunity pipeline from Prospecting to Closed Won. The order comes from the picklist's order, so it works best on stage-like fields.

**Scatter charts** plot two numeric measures per group, for example average deal size against record count per rep, to spot clusters and outliers.

**Dashboard-oriented visuals** include a **Metric** (a single big number, shown as 123 in the picker), a **Gauge** (one number against a range, useful against a target), and a **Table** component. These appear in the dashboard's Add Component dialog. You will use them heavily in Chapter 5.

## Matching question to chart

| Question | Good starting point |
|---|---|
| Which category is biggest? | Horizontal or vertical bar |
| How has it changed over time? | Line, or vertical bar by month |
| What share does each part have? | Donut, if only a few slices |
| Where do records drop off? | Funnel |
| Is a number on target? | Gauge or Metric |
| How do two measures relate? | Scatter |

## Honest limits

- The set is fixed. There are no maps, heat maps, or custom shapes in native report charts, and you cannot layer arbitrary series.
- Styling is limited to options such as showing values, percentages, colors from a palette, and axis titles.
- Donuts with many slices are unreadable. Filter, sort, or combine small groups first.
- A chart is only as good as the report behind it. The best type on badly grouped data is still a poor answer.

If you need richer visuals, dynamic interactivity, or blending several data sources, that is what CRM Analytics and Tableau are for later in this path.

## Recap

Pick the chart type from the question: bars compare, lines trend, donuts show a few parts of a whole, funnels show stages, scatters relate two measures, and dashboards add metrics and gauges. Greyed-out options usually mean the report lacks a needed grouping. Native charts are a small, fixed toolkit, and knowing that saves you from fighting them.

## Check yourself

A manager asks, "Which lead source brings in the most leads, and what share of the total does each represent?" Which chart type would you choose, and what would make you switch to a bar chart?
