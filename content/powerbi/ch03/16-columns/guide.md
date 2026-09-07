# Lesson 16 — Splitting, Merging & Extracting Columns

**Chapter 3 · Power Query & Data Cleaning · Lesson 5 of 12**

## What you'll learn

- How to split one column into several, using a delimiter
- The three "split at" choices, and when each one matters
- Splitting into new columns vs. new rows
- Where Merge Columns and Extract live, and what each is for

## Splitting a column by delimiter

Real data often crams two pieces of information into one column. Here, an
**Accounts** column holds both an account number and a name, separated by
a space:

![Screenshot of a single-column table named Accounts, with values like "101 Bank/Cash at Bank" and "102 Cash."](/courses/power-bi/ch03/16-columns/into-columns-original.png)
*Number and name, jammed together. Split Column pulls them apart.*

Find **Split Column** on the Home ribbon (also on Transform, and via
right-click):

![Screenshot of the Home ribbon with the Split Column dropdown open, showing By delimiter, By number of characters, By positions, and more, with By delimiter highlighted.](/courses/power-bi/ch03/16-columns/icon-home.png)
*By delimiter is what you'll use most — splitting wherever a character like a space, comma, or colon appears.*

Choose **By delimiter**, and configure exactly how:

![Screenshot of the Split Column by Delimiter dialog, with delimiter set to Space, Split at set to Left-most delimiter, and Split into set to Columns.](/courses/power-bi/ch03/16-columns/into-columns-split-column-window-desktop.png)
*Space as the delimiter, split at the left-most occurrence, into columns.*

## The "Split at" choice matters

Three options, and picking the wrong one gives you a mess:

- **Left-most delimiter** — splits only at the *first* occurrence. Use this
  when only the first separator actually matters (like our account
  number/name example — there's only one space that counts).
- **Right-most delimiter** — splits only at the *last* occurrence. Useful
  for things like file paths, where you want everything before the final
  slash.
- **Each occurrence of the delimiter** — splits at *every* instance,
  producing one new column per split. Use this when a value has a
  consistent, repeating structure (like a date written as
  `2026-09-07`, split on every hyphen).

The result, with our example:

![Screenshot of a table now showing two columns, Accounts.1 with account numbers and Accounts.2 with account names.](/courses/power-bi/ch03/16-columns/into-columns-final.png)
*Power Query names the new columns Accounts.1 and Accounts.2 automatically — rename them to something meaningful afterward.*

## Splitting into rows instead of columns

The same dialog has a second mode, easy to miss: under Advanced options,
**Split into** can be **Rows** instead of Columns. Use this when a single
cell holds a *list* of values (like "Cash, Receivables, Inventory" in one
cell) that should really be one row each, rather than one column each.

## Merging and extracting: the other direction

Splitting takes one column apart. **Merge Columns** does the opposite —
combining two or more columns into one, with a separator of your choosing.
**Extract** pulls out just *part* of a column's text — the first N
characters, everything before a delimiter, everything between two
delimiters — without splitting the rest away. Both live on the **Add
Column** ribbon, in the **From Text** group:

![Screenshot of the Add Column ribbon, with the From Text group showing Format, Merge Columns, Extract, and Parse buttons.](/courses/power-bi/ch03/16-columns/query-overview-add-column-ribbon.png)
*Merge Columns and Extract, side by side. Extract's own submenu offers Length, First/Last Characters, Range, and Text Before/After/Between Delimiter.*

The distinction that matters: **Split Column replaces the original column**
with the pieces. **Extract creates a new column** alongside the original,
leaving it untouched. Reach for Extract when you want the source column to
stick around.

## Key terms

| Term | Meaning |
|---|---|
| Split Column | Breaks one column into several, replacing the original |
| Delimiter | The character Power Query splits on (space, comma, etc.) |
| Split at | Left-most, right-most, or every occurrence of the delimiter |
| Merge Columns | Combines two or more columns into one, with a chosen separator |
| Extract | Pulls part of a column's text into a new column, leaving the original intact |

## Lab

1. Find a text column that holds two pieces of information (a full name,
   an address, anything with a consistent separator) and split it **By
   delimiter**, choosing the correct "Split at" option.
2. Rename the resulting `.1` / `.2` columns to something meaningful.
3. On the **Add Column** ribbon, try **Extract > First Characters** on any
   text column, and notice the original column is still there afterward.

## Check yourself

You're ready for Lesson 17 when you can explain, in one sentence, the
difference between what Split Column does to a column and what Extract
does to it.
