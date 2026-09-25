# Script — Summary Formulas

## Segment 1 (title)

Grouping gave you sums, counts, and averages. A summary formula lets you calculate on top of those totals: win rate, average deal size, share of a whole. It's the same as dividing one aggregate by another in T-SQL.

## Segment 2 (screenshot: menu)

Summary formulas need grouped data, so they live in summary and matrix reports, not tabular ones. To add one, open the dropdown next to Columns in the Outline panel. Beside Add Bucket Column, from lesson eight, you'll find Add Summary Formula.

## Segment 3 (code: formulas)

The editor has a Fields tab and a Functions tab. Search for a field, choose how to summarize it, and click Insert. Tokens look like the field name, a colon, and the summary type. There's also a built-in row count. So win rate is the summed Won field divided by row count, and average deal is summed amount divided by row count. Insert the tokens from the editor rather than typing them, since names vary by object.

## Segment 4 (screenshot: win rate)

Here's a real Sales Rep Win Rates report. The fx icon marks the Win Rate column, calculated per owner and again on the grand total. Because a summary formula divides summed values, the total row is a true weighted rate, not an average of averages.

## Segment 5 (steps)

Three things to control. Pick the format, such as percent, and the decimal places. Choose where the formula appears, all summary levels or only specific ones. And watch for division by zero, so guard your ratios with an IF on row count. Also remember there's a cap on how many summary formulas one report can hold.

## Segment 6 (outro)

Summary formulas work on totals. For a calculation on every single record, you need a different tool. Next up: row-level formulas.
