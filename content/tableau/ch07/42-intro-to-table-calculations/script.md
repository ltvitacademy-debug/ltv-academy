# Script — Introduction to Table Calculations

## Segment 1 (title)

You've already built calculated fields — formulas evaluated against the raw data source before it hits the view. A table calculation is different: it runs after Tableau has already aggregated your data into the rows and columns on screen, recomputing from what's already there.

## Segment 2 (screenshot: table calc indicator)

Any field carrying a table calculation gets a small triangle badge on its pill. That triangle is the only visual sign that a field's numbers are being recomputed after aggregation — if a number doesn't match what a plain SUM of the raw data would give you, check for that triangle first.

## Segment 3 (code: table calc syntax)

Table calculations use their own function vocabulary: RUNNING_SUM, WINDOW_AVG, RANK, TOTAL. Notice the pattern — every one of these wraps an already-aggregated value, like SUM of Sales, not a raw column. That's the closest match to a SQL window function: an aggregate computed over rows that are already grouped and ordered.

## Segment 4 (outro)

Next lesson takes the first specific table calculation types head-on: percent of total, difference, and percent difference.
