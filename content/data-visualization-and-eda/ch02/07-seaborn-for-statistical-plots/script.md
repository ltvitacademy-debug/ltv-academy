seaborn is a statistical plotting library built on top of matplotlib. It reads pandas DataFrames directly, computes summaries for you, and its defaults look better out of the box. You still use matplotlib for the figure; seaborn draws onto the axes.

The pattern is always the same. Pass the DataFrame with data equals, then name columns for x, y and hue. Hue splits the chart by a category, colors each group, and adds the legend automatically.

Here are three plots on our illustrative customer table. A histplot of spend, split by segment. A boxplot of spend for each segment. Each is one call, pointed at an axes with ax equals, and we call set theme once for a clean whitegrid look.

The third is a scatterplot of orders against spend, colored by segment. Same pattern again: the DataFrame, two column names, and hue for the category.

The result shows what raw matplotlib would need many lines for. Premium customers sit further right in the histogram and higher in the boxplot, with median spend of about two twenty-three for Basic, two ninety-three for Plus and three eighty-two for Premium. And the scatter shows the orders-to-spend relationship holds within every segment.

seaborn's functions fall into families. Histplot and kdeplot for distributions. Boxplot, violinplot and barplot for comparing groups. Scatterplot, lineplot and lmplot for relationships. And heatmap and pairplot for overviews of a whole table.

A correlation heatmap and a pair plot are two calls each, and they're often the first things you draw on a new dataset. You'll use them heavily in the EDA chapter.

Next up: Plotly for interactive charts.
