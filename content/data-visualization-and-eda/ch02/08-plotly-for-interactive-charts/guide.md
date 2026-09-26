# Plotly for Interactive Charts

matplotlib and seaborn produce static images. **Plotly** produces interactive charts: hover to see exact values, drag to zoom, click a legend entry to hide a group. That makes it a great fit for exploration and for dashboards people will poke at. Because a Plotly chart is just a web page, you can share it as a single HTML file.

## What you'll learn

- Why and when to choose an interactive chart
- How to draw scatter, line, histogram, box and bar charts with Plotly Express
- How to adjust the look with `update_traces` and `update_layout`
- How to display, save and share the result

## Plotly Express: the easy way in

Plotly has a low-level API and a high-level one called **Plotly Express**, imported as `px`. It feels like seaborn: you pass a DataFrame and name columns. One function call gives you a complete interactive chart. Install with `pip install plotly` (the examples here were checked against Plotly 5.x; check the current docs if your version differs).

Using the seeded 300-row retail table from Lesson 2 (`customers`, illustrative):

```python
import plotly.express as px

fig = px.scatter(customers, x="orders", y="spend", color="segment",
                 hover_data=["age", "region"],
                 category_orders={"segment": ["Basic", "Plus", "Premium"]},
                 title="Spend vs orders by segment")
fig.update_traces(marker={"size": 7, "opacity": 0.8})
fig.update_layout(template="plotly_white", legend_title_text="Segment")
fig.show()
fig.write_html("spend.html")
```

Line by line:

- `px.scatter(...)` takes the DataFrame, then `x`, `y` and `color` as column names. `hover_data` adds extra columns to the tooltip. `category_orders` fixes the order of the legend and colors.
- `update_traces(...)` changes the *marks* (here the marker size and opacity).
- `update_layout(...)` changes the *chart as a whole*: template, legend title, axis titles, size, margins.
- `fig.show()` displays the chart inline in a Jupyter notebook, or opens it in your browser from a script.
- `fig.write_html("spend.html")` saves a self-contained web page anyone can open. It works offline because the Plotly JavaScript library is embedded in the file, which makes the file large (over a megabyte), so it is not ideal for dozens of charts on one page.

To save a **static image** instead (for a slide or PDF), `fig.write_image("spend.png")` works once the `kaleido` package is installed; its requirements have changed between versions, so check the current Plotly documentation. That is how we produced the image for this lesson's video. In the interactive version, hovering over any point shows its orders, spend, age and region, and you can drag to zoom into the dense cluster of customers with three to seven orders.

## The same pattern for other charts

```python
fig = px.line(x=revenue.index, y=revenue.values, markers=True,
              labels={"x": "Month", "y": "Revenue ($k)"})

fig = px.histogram(customers, x="spend", color="segment", nbins=20)

fig = px.box(customers, x="segment", y="spend")

regional = customers.groupby("region", as_index=False)["spend"].mean()
fig = px.bar(regional, x="region", y="spend")
```

`revenue` is the illustrative monthly series from Lesson 5. Each function has the same call shape: a DataFrame (or arrays), column names for `x`, `y`, `color`, and a few options. Learning one gives you all of them.

## Interactive or static?

| Choose interactive when... | Choose static when... |
| --- | --- |
| You are exploring and want exact values on hover | The chart goes into a printed report, slide or PDF |
| Stakeholders will slice and zoom themselves (dashboards, notebooks) | You need to control exactly what the reader sees |
| The chart contains many points or series | The message is one simple takeaway |

Interactivity is not a substitute for good design. Everything from Chapter 1 still applies: honest axes, a title that states the finding, sensible color. A cluttered chart that you can zoom into is still cluttered.

## Recap

- Plotly Express (`px`) draws interactive charts from a DataFrame with one call.
- `update_traces` styles the marks; `update_layout` styles the whole chart.
- `fig.show()` displays the chart; `write_html` saves a shareable web page.
- Use interactive charts for exploration and dashboards, static ones for reports and slides.
- Next lesson: arranging several charts together, with subplots and dashboards.
