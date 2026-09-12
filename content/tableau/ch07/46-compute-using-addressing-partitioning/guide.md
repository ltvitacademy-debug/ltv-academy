# Lesson 46 — Compute Using: Addressing & Partitioning

**Chapter 7 · Time Series & Table Calculations · Lesson 46 of 95**

## What you'll learn

- What **addressing** and **partitioning** actually control underneath
  every table calculation you've built so far
- Why every dimension in the view has to be one or the other — there's
  no third option
- How **Table (Across)** and **Table (Down)** are really just presets
  for a specific addressing/partitioning split
- How this maps onto a SQL window function's `PARTITION BY` and
  `ORDER BY` clauses

## Every dimension is either addressing or partitioning

Every table calculation you've built in this chapter — Percent of
Total, Running Total, Rank, all of it — secretly asks the same
question about every dimension in your view: is this dimension part of
the calculation's **direction**, or part of its **scope**?

- **Addressing** dimensions determine the *direction* the calculation
  moves through — which cells count as "before" and "after" for
  things like Running Total or Percent Difference.
- **Partitioning** dimensions determine the *scope* — they break the
  view into separate sub-tables, and the calculation restarts fresh
  inside each one.

Tableau's **Compute Using: Specific Dimensions** option lets you check
exactly which dimensions belong to which group:

![Tableau's Compute Using section with Specific Dimensions selected — Quarter of Order Date and Month of Order Date checked, Year of Order Date left unchecked — plus Restarting Every set to Quarter of Order Date and Sort order set to Specific Dimensions.](/courses/tableau/ch07/46-compute-using-addressing-partitioning/compute-using-dialog.png)
*Checked = addressing (direction). Unchecked = partitioning (scope). Every dimension in the view has to land in one bucket or the other.*
Source: [Tableau Help — Table Calculation Types](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations_definebasic_runningtotal.htm)

Here, **Quarter** and **Month** are checked — they're addressing
dimensions, so the calculation moves across them in order. **Year**
is left unchecked — it's a partitioning dimension, so the calculation
restarts separately for each year rather than running continuously
across all of them.

## Table (Across) and Table (Down) are just presets

You've been using **Table (Across)** and **Table (Down)** all chapter
without necessarily thinking about which dimensions they address. They
are simply shorthand for a specific addressing/partitioning split:

![A Tableau text table with Table (Across) selected — an orange box and blue arrow highlighting the calculation moving left-to-right across the January row before restarting on February.](/courses/tableau/ch07/46-compute-using-addressing-partitioning/table-across.png)
*Table (Across) addresses whatever's on Columns — here, Year — and partitions by whatever's on Rows.*
Source: [Tableau Help — Transform Values with Table Calculations](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations.htm)

![The same text table with Table (Down) selected instead — the orange box and blue arrow now moving top-to-bottom down the 2011 column before restarting on 2012.](/courses/tableau/ch07/46-compute-using-addressing-partitioning/table-down.png)
*Table (Down) flips it: it addresses whatever's on Rows — here, Month — and partitions by whatever's on Columns.*
Source: [Tableau Help — Transform Values with Table Calculations](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations.htm)

Table (Across) addresses the Columns dimension and partitions by
Rows; Table (Down) does the reverse. That's it — every one of
Tableau's other Compute Using presets (Table Across Then Down, Pane
Down, Cell, and so on) is just a different, more specific combination
of the same two ideas.

## The SQL equivalent

This maps directly onto a SQL window function's two clauses:
`PARTITION BY` breaks the result set into groups, exactly like
Tableau's partitioning dimensions — the calculation restarts inside
each group. `ORDER BY` decides the sequence the calculation moves
through inside each partition, exactly like Tableau's addressing
dimensions. If you've ever written `SUM(Sales) OVER (PARTITION BY
Year ORDER BY Month)`, you've already used addressing and partitioning
— just under their SQL names.

## Key terms

| Term | Meaning |
|---|---|
| Addressing | The dimension(s) that determine the direction a table calculation moves through |
| Partitioning | The dimension(s) that break the view into separate scopes, restarting the calculation in each |
| Table (Across) | A preset: address Columns, partition by Rows |
| Table (Down) | A preset: address Rows, partition by Columns |
| `PARTITION BY` / `ORDER BY` (SQL) | The window-function clauses matching partitioning and addressing, respectively |

## Lab

1. Build the Year (Columns) by Quarter/Month (Rows) sales table from earlier lessons, and add a **Running Total**.
2. Switch Compute Using between **Table (Across)** and **Table (Down)** and watch where the running total restarts each time.
3. Switch to **Specific Dimensions**, check only **Month of Order Date** for addressing, and leave **Quarter** and **Year** unchecked (partitioning). Confirm the running total now restarts at the start of every quarter, for every year.

## Check yourself

You're ready for Lesson 47 when you can explain, in one sentence, what
happens to a dimension you leave unchecked under Specific Dimensions,
and which SQL window-function clause it corresponds to.
