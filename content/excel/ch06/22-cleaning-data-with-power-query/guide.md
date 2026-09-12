# Lesson 22 — Cleaning Data With Power Query

**Chapter 6 · Power Query in Excel · Lesson 22 of 25**

## What you'll learn

- Removing duplicate rows as a recorded, repeatable step
- Splitting one text column into several using a delimiter
- Changing a column's data type, and reading the type icon in its header
- Filtering out blank rows without deleting anything from the source

## Four operations, one shared idea

Every operation in this lesson works the same way: select something in
the preview, click a command on the Home or Transform tab, and a new
step lands in Applied Steps. None of these touch your original file —
they only touch the query's in-memory copy of the data, which is exactly
why they're safe to experiment with.

## Removing duplicate rows

Select the column (or columns) that define a "duplicate" for your data —
often an ID or a combination of columns — then go to **Home > Remove
Rows > Remove Duplicates**. Power Query keeps the first occurrence of
each unique combination and drops the rest.

This matters more than it sounds: which columns you select changes the
definition of "duplicate" entirely. Selecting just a customer ID column
removes every repeat visit from that customer; selecting ID + date only
removes same-day repeats. Pick the columns to match what actually counts
as a duplicate in your data, not just "select all and remove."

## Splitting a column by delimiter

A column like `Smith, John` or `2024-Q3-West` is really several pieces
of information crammed into one text field. Select the column, then
**Home > Split Column > By Delimiter**, pick the character that
separates the pieces (comma, hyphen, space, or a custom character), and
Power Query creates one new column per piece — named after the original
column with `.1`, `.2`, and so on.

## Changing data types

Power Query guesses each column's type when it first loads data, but
guesses are sometimes wrong — a column of ZIP codes might load as a
number and silently drop a leading zero. Every column header carries a
small type icon you can click to change it directly:

![Screenshot of three Power Query column headers — CustomerID marked with an ABC text icon, EmployeeID marked with a 123 whole-number icon, and OrderDate marked with a calendar date/time icon.](/courses/excel/ch06/22-cleaning-data-with-power-query/excelpqdatatypes.png)
*The icon to the left of each column name is both a label and a button — click it to change that column's type.*
Source: [Microsoft Support — Add or change data types (Power Query)](https://support.microsoft.com/en-us/excel/add-or-change-data-types-power-query-b8618bb6-dec6-4fe6-8974-5f799856f218)

Getting types right early matters because everything downstream — sorts,
filters, date math, merges — depends on Power Query knowing what kind of
value it's actually looking at.

## Filtering out blank rows

The same dropdown arrow you'd use to filter any column also filters out
blanks — just uncheck **(blank)** from the value list, the same way
you'd uncheck any other unwanted value:

![Screenshot of a Power Query column filter dropdown showing a searchable checkbox list of values including Alberta, California, England, and others, with an OK/Cancel button pair at the bottom.](/courses/excel/ch06/22-cleaning-data-with-power-query/filtersinglecolumn.png)
*A blank/null value appears in this same list as (blank) — uncheck it like any other unwanted value to drop those rows.*
Source: [Microsoft Support — Filter data (Power Query)](https://support.microsoft.com/en-us/excel/filter-data-power-query)

Because this is a query step and not a manual row-delete, it survives a
refresh — new blank rows in next week's export get filtered out
automatically too.

## Key terms

| Term | Meaning |
|---|---|
| Remove Duplicates | Keeps the first row of each unique combination of selected columns, drops the rest |
| Split Column by Delimiter | Breaks one text column into several, using a chosen separator character |
| Data type icon | The clickable icon in a column header showing (and letting you change) that column's type |
| Filter dropdown | The same per-column filter used elsewhere in Excel — includes an explicit (blank) entry |

## Lab

1. Load a table with at least one column that has genuine duplicate
   values (or duplicate whole rows). Use **Remove Duplicates** on the
   column(s) that actually define uniqueness for your data.
2. Find a text column combining two pieces of information (a full name,
   or a "Category-Subcategory" style code) and split it by delimiter.
3. Pick a column that loaded with the wrong type — most often a
   number-looking column that loaded as text — and fix it using the
   type icon.
4. Filter a column to remove its blank rows, then check Applied Steps to
   confirm the filter recorded as its own step.

## Check yourself

You're ready for Lesson 23 when you've built at least one query with
three or more of these steps stacked in Applied Steps, in a sensible
order (types before splits before filters, generally).
