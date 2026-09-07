# Lesson 21 — Appending Queries

**Chapter 3 · Power Query & Data Cleaning · Lesson 10 of 12**

## What you'll learn

- How Append stacks tables into more rows, the opposite of Merge
- Why mismatched columns become null instead of causing an error
- Append vs. Append As New
- Combining three or more tables at once

## The concept: stacking tables, not joining them

Where Merge (Lesson 20) reaches sideways to add columns, **Append**
reaches downward — stacking one table's rows underneath another's:

![Diagram showing two tables, one with columns A/B/C and one with columns A/B/D, appended into one table with columns A/B/C/D, where C is null for the second table's rows and D is null for the first table's rows.](/courses/power-bi/ch03/21-appending-queries/append-queries-diagram.png)
*Every column from every table survives in the result. Where a table didn't have a given column, those rows simply get null.*

This is the mirror image of Merge: Merge combines *columns* from tables
that share a key. Append combines *rows* from tables that share (most of)
their columns.

## Finding Append Queries

Also in the Combine group on the Home ribbon, right next to Merge:

![Screenshot of the Power Query Home ribbon with the Append queries dropdown highlighted next to Merge queries in the Combine group.](/courses/power-bi/ch03/21-appending-queries/append-queries-icons.png)
*Append queries adds rows into your current query. Append queries as new creates a brand-new query instead, leaving both originals untouched.*

## Appending two tables

Select your primary table, choose **Append Queries**, and pick the table
to stack underneath it:

![Screenshot of the Append dialog in Two Tables mode, with "Store Sales" selected as the table to append.](/courses/power-bi/ch03/21-appending-queries/append-queries-sample-two-tables-window.png)
*Two Tables mode is the default — just pick the one table to add.*

Power Query matches columns **by name**, not by position, and stacks
everything into one table:

![Screenshot of the combined table with Channel Name, Date, CustomerID, Units, and Referrer columns, where the Online Sales rows show null in the Referrer column.](/courses/power-bi/ch03/21-appending-queries/append-queries-sample-two-tables-output.png)
*Online Sales never had a Referrer column, so those rows show null there — exactly like the diagram predicted. No error, no data lost.*

## Appending three or more tables at once

Need to combine more than two? Switch to **Three or more tables** mode and
build a list:

![Screenshot of the Append dialog in Three or More Tables mode, with Online Sales, Store Sales, and Wholesale Sales all added to the "Tables to append" list.](/courses/power-bi/ch03/21-appending-queries/append-queries-sample-three-more-tables-window.png)
*Move tables from Available table(s) to Tables to append with the Add button — order here determines the stacking order in the result.*

This is the natural choice whenever you're combining several similarly-shaped
tables at once — several regional exports, a handful of monthly files,
department-by-department data — rather than appending them two at a time.

## Key terms

| Term | Meaning |
|---|---|
| Append | Stacks rows from two or more tables into one, matching columns by name |
| Append queries | Adds rows into your current query |
| Append queries as new | Creates a new query, leaving the originals unchanged |
| Two tables / Three or more tables | The two modes of the Append dialog |

## Lab

1. Find (or create) two tables with mostly-overlapping column names, and
   **Append Queries** them together.
2. Check whether any columns show null — and confirm that's because one
   source table simply didn't have that column.
3. If you have a third similarly-shaped table, try **Append Queries as
   New** in **Three or more tables** mode to combine all three at once.

## Check yourself

You're ready for Lesson 22 when you can explain, in one sentence, how
Append is the opposite of Merge — and why a null after appending isn't a
sign something went wrong.
