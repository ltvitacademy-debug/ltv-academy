# Lesson 23 — Combining & Appending Queries

**Chapter 6 · Power Query in Excel · Lesson 23 of 25**

## What you'll learn

- The real difference between Merge and Append — a distinction analysts
  get wrong constantly
- Merge as a join by key — like a VLOOKUP, but for entire tables at once
- Append as a stack — like a UNION, combining rows instead of columns
- Which one to reach for, based on one question about your two tables

## Two directions, not two flavors of the same thing

Both commands live in the same **Combine** group on the Home ribbon, and
both take two (or more) queries and produce one result — which is
exactly why they get confused. But they combine data in opposite
directions:

| | Merge | Append |
|---|---|---|
| Direction | Sideways — adds columns | Downward — adds rows |
| Requires | A shared key column | The same (or similar) columns in each table |
| Like... | A VLOOKUP or a database join | A UNION — stacking one table under another |
| Use it when | You want to enrich one table with columns from another | You want one table's worth of rows out of several files |

## Merge: a VLOOKUP for whole tables

If you've ever used VLOOKUP or XLOOKUP to pull a matching value from
another table based on a shared ID, **Merge** is the same idea scaled up
— instead of pulling back one value, you bring back an entire matched
row's worth of columns at once.

![Screenshot of the Merge dialog box, with a Products table (ProductID, ProductName, CategoryID, QuantityPerUnit) above and a Total Sales table (Year, Order_Details.ProductID, Total Sales) below, both with their ProductID columns highlighted, and a message confirming 77 of 77 rows matched.](/courses/excel/ch06/23-combining-and-appending-queries/mergedialogbox.png)
*Pick the two tables, click the matching column in each (ProductID here, in both), and Power Query confirms how many rows matched before you even click OK.*
Source: [Microsoft Support — Merge queries (Power Query)](https://support.microsoft.com/en-us/excel/merge-queries-power-query-fd157620-5470-4c0f-b132-7ca2616d17f9)

After merging, the result gains one new column holding the matched
table's data, which you then expand to choose exactly which fields to
pull in as real columns — the same "pick your join type" decision (Left
Outer keeps everything, Inner keeps only what matched) applies here just
as it does in a database join.

## Append: a UNION for stacking tables

**Append**, by contrast, assumes your tables already have the same shape
— the same columns, just different rows, like a January sales file and
a February sales file. Append doesn't match anything up; it just stacks
one table's rows underneath another's:

![Screenshot of the Append dialog box, with "Three or more tables" selected, an Available tables list showing Grades1 (Current), Grades2, and Grades3, and a Tables to append list on the right containing all three in order.](/courses/excel/ch06/23-combining-and-appending-queries/pbi-gsg-vga-pq-19.png)
*Two tables appends one query directly into your current one; Three or more lets you build an ordered list — useful for combining a whole folder's worth of monthly files.*
Source: [Microsoft Support — Append queries (Power Query)](https://support.microsoft.com/en-us/excel/append-queries-power-query-e42ca582-4f62-4a43-b37f-99e2b2a4813a)

If the column names don't match exactly between tables, Append still
runs — but it creates a separate column for each name variant instead of
combining them, which usually means you need to rename columns to match
*before* appending, not after.

## The one question that decides it

Before reaching for either command, ask: **do these two tables share a
key column I want to match on, or do they share the same columns and I
just want more rows?** Shared key, different columns to bring in →
Merge. Same columns, more rows → Append. Getting this backward — trying
to Append tables that don't share columns, or trying to Merge tables
that don't share a key — is the single most common Power Query mistake
analysts make.

## Key terms

| Term | Meaning |
|---|---|
| Merge | Joins two queries sideways, based on a shared key column — like a VLOOKUP for whole tables |
| Append | Stacks two or more queries' rows into one, assuming matching columns — like a UNION |
| Join kind | In a Merge, which rows survive (Left Outer, Inner, etc.) |
| Expand | After a Merge, pulling specific fields out of the new nested column it creates |

## Lab

1. Find (or create) two tables that share a key column but have
   different other columns — merge them and expand just the fields you
   need.
2. Find (or create) two tables with the same column layout but different
   rows (like two months of the same report) — append them into one.
3. For each, write one sentence explaining why you chose Merge over
   Append, or vice versa.

## Check yourself

You're ready for Lesson 24 when you can explain, without looking back at
this guide, why Append would fail to do what Merge does — and why Merge
would fail to do what Append does.
