# Lesson 32 — Analytics Pane: Trend Lines, Forecasting & Reference Lines

**Chapter 5 · Filters, Sorting & Analytics · Lesson 32 of 95**

## What you'll learn

- Where Tableau's built-in statistical tools live, and what each one does
- How to add a trend line and read what it's actually telling you
- How Tableau's forecast feature extrapolates future values, and how
  much to trust the shaded confidence interval
- The difference between a reference line and a trend line

## The Analytics pane

Next to the Data pane sits a second tab most beginners never open:

![Tableau's Analytics pane, showing Summarize objects (Constant Line, Average Line, Median with Quartiles, Box Plot), Model objects (Average with 95% CI, Median with 95% CI, Trend Line, Forecast, Cluster), and Custom objects (Reference Line, Reference Band, Distribution Band, Box Plot).](/courses/tableau/ch05/32-analytics-pane-trend-lines-forecasting/analytics-pane.png)
*Everything here is drag-and-drop — pull an object straight onto the view, no calculated field required.*
Source: [Tableau Help — Add a Trend Line to a Visualization](https://help.tableau.com/current/pro/desktop/en-us/trendlines_add.htm)

Three groups, three different jobs: **Summarize** describes the data
you already have (averages, medians, box plots). **Model** fits
something to the data (a trend, a forecast, a cluster). **Custom**
lets you draw a fixed line or band yourself.

## Trend lines

Drag **Trend Line** onto a view, and Tableau fits a line (linear by
default) through your data automatically:

![A matrix of small line charts — Sales by Ship Date, faceted by Region (rows) and Category (columns) — each panel with its own dashed linear trend line overlaid on the actual monthly data.](/courses/tableau/ch05/32-analytics-pane-trend-lines-forecasting/trend-line.png)
*One trend line per panel — Tableau fits each Region/Category combination separately, not one line across everything.*
Source: [Tableau Help — Add a Trend Line to a Visualization](https://help.tableau.com/current/pro/desktop/en-us/trendlines_add.htm)

A trend line answers "is this generally going up, down, or flat" — it
doesn't predict the future by itself (that's what Forecasting is for),
it just fits the historical pattern. Right-click a trend line and
choose **Describe Trend Model** to see its actual R² value and
statistical significance instead of eyeballing it.

## Forecasting

Drag **Forecast** instead, and Tableau extends the view past your last
real data point:

![A Sales-by-month line chart from 2011-2014 in solid blue, with a projected 2015 forecast in orange and a shaded orange confidence band widening toward the end of the projection.](/courses/tableau/ch05/32-analytics-pane-trend-lines-forecasting/forecast.png)
*The orange line is Tableau's projection; the shaded band is the confidence interval — it widens the further out the forecast reaches.*
Source: [Tableau Help — How Forecasting Works in Tableau](https://help.tableau.com/current/pro/desktop/en-us/forecast_create.htm)

That widening shaded band is the most important part of the chart, not
a decoration: it's Tableau being honest that a forecast six months out
is far less certain than one month out. A forecast with a narrow band
close to the historical data and a wide one far from it is doing
exactly what it should — treat a forecast whose band doesn't widen
with suspicion.

## Reference lines and bands

Under **Custom**, a Reference Line draws a single fixed value (a goal,
a target, last year's total) directly onto the view — unlike a trend
line, it doesn't fit anything, it just marks a number you specify. A
Reference Band shades the area between two such values (a target range
rather than a single target).

## Key terms

| Term | Meaning |
|---|---|
| Trend line | A fitted line (linear by default) showing the general direction of historical data |
| Forecast | Tableau's projection of future values past the last real data point, with a confidence interval |
| Reference line | A fixed, user-specified value drawn directly onto the view — not fitted to the data |
| Describe Trend Model | The right-click option that shows a trend line's actual statistical fit (R², p-value) |

## Lab

1. In Sample Superstore, build Sales by Month of Order Date, then drag a Trend Line onto it. Right-click the line and choose Describe Trend Model — note the R² value.
2. Drag Forecast onto the same view instead. Note how the confidence band widens further into the projection.
3. Add a Reference Line at a fixed goal value (e.g., $50,000/month) and compare actual sales against it visually.

## Check yourself

You're ready for Lesson 33 when you can explain the difference between
a trend line and a forecast, and why a forecast's confidence band
should widen the further out it projects.
