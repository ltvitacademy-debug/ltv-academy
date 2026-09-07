# Lesson 61 — Analytics, Forecasting & Advanced Visuals

**Chapter 7 · Building Reports & Visualizations · Lesson 10 of 10**

## What you'll learn

- What the Analytics pane adds on top of a normal chart
- How to add a dynamic reference line, like an average
- Forecasting and anomaly detection for time-series data
- A tour of the AI-powered visuals this chapter hasn't covered yet

## The Analytics pane

Select a visual, then select the **Analytics** icon in the
Visualizations pane to add dynamic reference lines, error bars,
forecasts, and anomaly detection — features layered on top of a chart
you've already built, not a separate visual type.

## Adding a reference line

The most common use: an **average line**, showing how each data point
compares to the mean:

![Screenshot of a line chart with a dashed average line overlaid, and the Analytics pane showing an Average line named "Average sales."](/courses/power-bi/ch07/61-analytics-forecasting/analytics-pane_4.png)
*Select the line type, Add, name it, and pick which measure it's based on — here, sales, labeled "Average sales."*

Power BI supports several line types beyond average: **min**, **max**,
**median**, **percentile**, and constant lines fixed to a specific
X-axis or Y-axis value. Add more than one of the same type — say, a
25th and 75th percentile line together — and each gets its own name,
color, and formatting.

## Forecasting

With time-series data on a line chart, the **Forecast** section
predicts future values based on historical trend:

![Screenshot of a line chart with a forecasted trend line extending past the historical data, and forecast length and confidence interval settings in the Analytics pane.](/courses/power-bi/ch07/61-analytics-forecasting/analytics-pane_8.png)
*The shaded band is the confidence interval — how certain the forecast is, widening the further out it predicts.*

Forecasting is available only on line charts, and needs real time data
to work from — it has nothing to project without a genuine date axis.

## Anomaly detection

Also line-chart-only: **Anomaly detection** automatically flags
unexpected spikes or dips in your data, with an adjustable
**Sensitivity** setting controlling how aggressively it flags outliers.
An **Explain by** option lets you point at other fields that might
account for a flagged anomaly, surfacing a possible explanation when a
viewer selects it.

## Error bars

For measurements with inherent uncertainty, **error bars** display a
range around each point — either as an exact upper/lower bound from
your model, or as a percentage of the measure's value. Line charts can
additionally show this range as a continuous **error band** around the
whole line, rather than bar by bar.

## Beyond the Analytics pane: a few advanced visuals worth knowing

- **Decomposition tree**: lets viewers drill across multiple dimensions
  in any order, with AI suggesting which dimension to explore next.
- **Key influencers**: surfaces which factors most affect a selected
  result — useful when you want the model to point out relationships
  you might not have thought to look for.
- **Smart narrative**: automatically writes plain-language text calling
  out trends and key takeaways from the data behind a visual.

These live outside this lesson's scope for a deep dive, but knowing
they exist — and what each is for — means you'll recognize when a
report calls for one.

## Key terms

| Term | Meaning |
|---|---|
| Analytics pane | Adds reference lines, error bars, forecasting, and anomaly detection to a supported visual |
| Confidence interval | The forecast's shaded uncertainty band, widening further into the future |
| Sensitivity | The anomaly detection setting controlling how aggressively outliers are flagged |

## Lab

1. On a line chart built from **AdventureWorksDW2014**'s
   `FactInternetSales` over time, add an **Average line** from the
   Analytics pane and name it clearly.
2. Add a **Forecast**, adjusting the forecast length and confidence
   interval, and observe how the shaded band changes.
3. If your data has enough history, try **Anomaly detection** and
   adjust the Sensitivity setting to see how it changes which points
   get flagged.

## Check yourself

Chapter 7 is complete when you can build a report page combining at
least four different visual types from this chapter, with working
filters, one interaction configured deliberately, and one Analytics
pane feature applied.
