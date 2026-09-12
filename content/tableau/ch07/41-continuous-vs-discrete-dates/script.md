# Script — Continuous vs. Discrete Dates & Time-Series Analysis

## Segment 1 (title)

Every field in Tableau is colored one of two ways: blue or green. That color isn't decoration — it tells you exactly what kind of chart the field is capable of producing, and getting it wrong is why so many first attempts at a time-series chart come out looking broken.

## Segment 2 (screenshot: discrete pill)

Blue means discrete. A discrete field produces separate, individually-labeled headers — one box per distinct value, with gaps between them and no continuous flow implied.

## Segment 3 (screenshot: continuous pill)

Green means continuous. A continuous field produces a measurable axis instead — an unbroken line of values where position actually means something numerically. This example is a date field, and that's the twist: dates default to discrete when you first drag them in, no matter which level you picked in the last lesson. Date level and date type are two separate settings on the same field.

## Segment 4 (steps: effect on the view)

Put a discrete month on Columns and you get separate header columns — clean for comparing month to month, but disconnected. Convert it to continuous and those headers collapse into a single axis. Build a line chart on top of each: the discrete version draws broken segments, the continuous version draws one smooth trend line. That's the single switch that makes real time-series analysis possible.

## Segment 5 (outro)

Next lesson moves from dates specifically into table calculations generally — the engine behind running totals, percent of total, and rank.
