# Lesson 14 — Removing, Filtering & Editing Rows

**Chapter 3 · Power Query & Data Cleaning · Lesson 3 of 12**

## What you'll learn

- The Remove Rows menu: top, bottom, alternate, duplicate, blank, and error rows
- Three different ways to filter a column down to just the values you want
- How type-specific filters change based on whether a column is text, number, or date
- Basic vs. Advanced mode in the Filter Rows dialog

## Removing rows outright

The **Remove Rows** button on the Home ribbon handles the blunt cases —
rows you want gone entirely, not filtered conditionally:

![Screenshot of the Remove Rows dropdown menu on the Home ribbon, showing Remove top rows, Remove bottom rows, Remove alternate rows, Remove duplicates, Remove blank rows, and Remove errors.](/courses/power-bi/ch03/14-rows/remove-rows-empty.png)
*Six options. Remove blank rows and Remove errors are the two you'll reach for most — cleaning out rows Power Query can't meaningfully use.*

- **Top/Bottom rows** — trim a known number of rows from either end (a
  report footer, a title block above the real header row).
- **Alternate rows** — for oddly-formatted exports with a junk row between
  every real one.
- **Duplicates** — keeps only the first occurrence of each distinct row.
- **Blank rows** — removes rows that are entirely null or empty.
- **Errors** — removes any row containing an `[Error]` value, like the ones
  from Lesson 13's locale mismatch.

## Filtering: three paths to the same result

Filtering is different from removing — it's conditional, based on a
column's actual values. Power Query gives you three ways in:

**1. The sort and filter menu**, opened from the small arrow on any column
heading:

![Screenshot of the sort and filter menu open on the Account Code column, showing Sort ascending/descending, Remove empty, Text filters, and a checklist of every distinct value with checkboxes.](/courses/power-bi/ch03/14-rows/sort-filter-menu.png)
*The auto filter list at the bottom shows every distinct value in the column — uncheck any you want to exclude, exactly like an Excel AutoFilter.*

**2. The cell right-click menu** — right-click any value and use its
filter shortcut.

**3. Type-specific filters**, which change based on the column's data
type. A text column offers different filters than a number or date column:

![Screenshot of the Text filters submenu open, showing Equals, Does not equal, Begins with, Does not begin with, Ends with, Does not end with, Contains, Does not contain, In, and Not in.](/courses/power-bi/ch03/14-rows/text-column.png)
*Text columns get "begins with" and "contains." Number columns get "is greater than." Date columns get "is before" and relative options like "in the last." Power Query picks the right toolbox for the column's type automatically.*

## Filter Rows: Basic vs. Advanced

Selecting a type-specific filter (rather than just checking boxes) opens
the **Filter Rows** dialog:

![Screenshot of the Filter Rows dialog in Basic mode, showing "Keep rows where Account Code begins with PA" OR "begins with PTY."](/courses/power-bi/ch03/14-rows/filter-rows-window-basic-mode.png)
*Basic mode: up to two conditions on one column, joined by and/or. Here, keep rows where Account Code begins with "PA" OR "PTY."*

The result keeps exactly the rows matching either condition:

![Screenshot of a table showing only three rows, all with Account Codes beginning with PA or PTY.](/courses/power-bi/ch03/14-rows/filter-rows-window-basic-mode-output.png)
*Three rows survived — everything else is gone from this query, though never from your original source file.*

**Advanced mode** removes the two-condition, one-column limit: you can
stack as many conditions as you need, across any columns in the table —
"Account Code ends with 4 AND Sales is greater than 100," for example.
Reach for Advanced whenever Basic's two-condition limit isn't enough.

## Key terms

| Term | Meaning |
|---|---|
| Remove Rows | Ribbon menu for unconditionally dropping rows (top/bottom/duplicate/blank/error) |
| Auto filter list | The checklist of every distinct value in a column, in the sort and filter menu |
| Type-specific filter | Filter options that change based on a column's data type |
| Filter Rows (Basic) | Up to two conditions on a single column |
| Filter Rows (Advanced) | Any number of conditions across any columns |

## Lab

1. Open the sort and filter menu on any column and try **Remove empty**.
2. Right-click a cell and use its filter shortcut to filter to just that
   value.
3. Open a type-specific filter (Text, Number, or Date, depending on your
   column) and build a two-condition filter in Basic mode.
4. Switch to Advanced mode on the same dialog and add a second column to
   the filter.

## Check yourself

You're ready for Lesson 15 when you can explain the difference between
*removing* a row and *filtering* a row, and name at least three of the six
options under Remove Rows.
