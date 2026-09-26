matplotlib and seaborn make static images. Plotly makes interactive charts: hover for exact values, drag to zoom, click a legend entry to hide a group. It's ideal when you or a stakeholder want to explore. And the chart is just a web page, so you can share it as a single HTML file.

The easy way in is Plotly Express, imported as px. Like seaborn, you pass a DataFrame and name columns. Here's px dot scatter: orders on x, spend on y, color by segment, and hover data adds age and region to the tooltip. We also add a title, and category orders to keep the segments in a sensible sequence.

Update traces adjusts the marks, here marker size and opacity. Update layout adjusts the chart as a whole, such as the template and the legend title. Fig dot show displays the chart in a notebook, and write html saves a self-contained file you can send to anyone.

Here's a static export of the result. In the browser, hovering over any point shows its orders, spend, age and region, and you can zoom into that dense band of customers with three to seven orders.

The same pattern gives you other charts: px dot line, histogram, box and bar. Same call shape, different function.

When should you choose interactive? During exploration, and in dashboards and notebooks that people will explore themselves. For a printed report, a slide or a PDF, use a static chart, where you control exactly what the reader sees. And the earlier lessons still apply: honest axes, clear titles, sensible color. Interactivity doesn't fix a poor chart.

Next up: subplots and dashboards.
