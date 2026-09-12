# Script — Running Totals & Moving Averages

## Segment 1 (title)

A Running Total accumulates a measure as it moves across the view; a Moving Average smooths it out instead. Both are the table-calc equivalents of SQL window frames you already know.

## Segment 2 (screenshot: running total dialog)

Here, a Running Total is the primary calculation, with a Percent Difference From stacked on top as a secondary calculation — giving you the percent change of the running total itself, not the raw monthly value. Notice Restarting Every is set to Quarter of Order Date: that resets the total back to zero at the start of each new quarter, instead of letting it grow across the whole table.

## Segment 3 (code: the formulas)

Underneath, a Running Total is just RUNNING_SUM of SUM of Sales — the equivalent of an unbounded-preceding window frame in SQL. A Moving Average is WINDOW_AVG, with two offset arguments — minus two, zero averages the current value with the two before it, exactly like a SQL window frame's PRECEDING and FOLLOWING bounds.

## Segment 4 (outro)

Next lesson covers Rank and the rest of the quick table calculations you haven't seen yet.
