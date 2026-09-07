# Lesson 19 — Group By & Aggregations

**Chapter 3 · Power Query & Data Cleaning · Lesson 8 of 12**

## What you'll learn

- How Group By collapses many rows into one summary row per group
- Basic vs. Advanced mode, and grouping by more than one column
- The column-level operations (Sum, Average, Count, etc.)
- A glimpse of row-level operations, for more advanced summaries

## Starting point: detailed, row-per-transaction data

Here's a table with one row per country, product, and sales channel
combination:

![Screenshot of a table with columns Year, Country, Product, Sales Channel, and Units, with 12 detailed rows.](/courses/power-bi/ch03/19-group-by/initial-table.png)
*Every combination gets its own row — useful for detail, but you often want a summary instead.*

## Finding Group By

**Group By** lives on the Home ribbon (also on Transform, and via
right-click):

![Screenshot of the Power Query Home ribbon with the Group By button highlighted in the Transform group.](/courses/power-bi/ch03/19-group-by/home-icon.png)
*Same three-locations pattern you've seen for other transformations this chapter.*

## Grouping by more than one column

Switch to **Advanced** mode to group by multiple columns at once. Here,
grouping by both **Country** and **Sales Channel**, then summing **Units**
into a new **Total units** column:

![Screenshot of the Group By dialog in Advanced mode, grouping by Country and Sales Channel, with a Total units column set to Sum of Units.](/courses/power-bi/ch03/19-group-by/add-aggregated-column-window.png)
*Add grouping adds more columns to group by; Add aggregation adds more summary columns. Both, independently, as many as you need.*

The result collapses twelve detail rows into six summary rows:

![Screenshot of a table with columns Country, Sales Channel, and Total units, showing six summarized rows instead of twelve detail rows.](/courses/power-bi/ch03/19-group-by/add-aggregated-column-final.png)
*One row per unique Country + Sales Channel combination, with Units summed within each group.*

## The column-level operations

| Operation | What it does |
|---|---|
| Sum | Adds every value in the group |
| Average | The mean of the group's values |
| Median | The middle value of the group |
| Min / Max | The smallest / largest value in the group |
| Count Distinct Values | How many unique values appear in the group |

Pick whichever matches what the summary should actually represent — Sum
for totals, Average for typical values, Max for "the biggest one in this
group."

## A glimpse further: row-level operations

Beyond summarizing a single column, Group By can also keep **All Rows**
for a group — bundling every original row into a nested table you can
later dig back into. Combined with a formula that pulls out a specific row
(the highest-selling product in each group, say), you can produce results
like this:

![Screenshot of a summary table with Country, Sales Channel, Total units, and additionally Top performer product name and units columns.](/courses/power-bi/ch03/19-group-by/row-operation-final-table.png)
*Beyond the total, this table also names each group's best-selling product — built by combining Group By's "All Rows" option with a formula in a later step.*

This kind of row-level summary uses a bit of Power Query M directly, which
is beyond what this lesson covers — but it's worth knowing Group By can go
this far when you need it to.

## Key terms

| Term | Meaning |
|---|---|
| Group By | Collapses rows sharing the same value(s) into one summary row per group |
| Add grouping | Adds another column to group by, in Advanced mode |
| Add aggregation | Adds another summary column to compute per group |
| Column operation | A per-column summary like Sum, Average, Min, Max |
| Row operation | A per-group operation like "All Rows," bundling the original rows |

## Lab

1. Find a table with repeated combinations of category-like columns (like
   region and product), and **Group By** on one of those columns, summing
   a numeric column.
2. Switch to Advanced mode and group by two columns instead of one.
3. Add a second aggregation (like Average or Max) alongside your first.

## Check yourself

You're ready for Lesson 20 when you can explain what "Add grouping" and
"Add aggregation" each do differently in the Group By dialog.
