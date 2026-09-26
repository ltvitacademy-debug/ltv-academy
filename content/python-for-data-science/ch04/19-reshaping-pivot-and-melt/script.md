The same information can be laid out two ways. Long format has one observation per row. Wide format spreads categories across columns, like a spreadsheet report. Databases and modeling tools prefer long; readable reports prefer wide. Reshaping moves you between them.

Here is the toolkit. Pivot table summarizes into a wide grid, like an Excel PivotTable. Pivot reshapes without summarizing. Melt goes back from wide to long. And crosstab gives quick counts of combinations.

Pivot table takes an index, a columns argument and values, plus an aggregation. Here cities run down the side, statuses run across, and each cell is a sum of our illustrative amounts. NaN means no orders for that combination. Options include fill value, and margins equals True, which adds an All row and column of totals.

Plain pivot does not aggregate, so every combination must be unique. Austin has three shipped orders, so which amount fills that one cell? pandas cannot decide, and raises a ValueError about duplicate entries. Pivot table resolves duplicates using aggfunc. When in doubt, use pivot table.

Melt is the reverse. Id vars names the columns to keep as identifiers, and every other column is stacked into two new ones: a variable name and a value. A wide table of quarterly sales becomes one row per customer per quarter. This is the fix for spreadsheet exports where each month or year is its own column.

Long for tools, wide for readers. Next up: rolling and window calculations, for moving averages and running totals.
