# Power Query Cleaning Steps Checklist

Compiled from Chapter 6 (Power Query in Excel). A repeatable order of operations for turning a
messy export into a clean, refreshable query — built around the Applied Steps model, not a list of
one-off fixes.

## The order that avoids the most rework

```
1. Connect   -- Get Data > From File/Web/Sheet
2. Fix types FIRST -- everything downstream (sorts, filters, date math,
                       merges) depends on Power Query knowing what kind
                       of value it's actually looking at
3. Split columns  -- break combined fields (e.g., "Smith, John",
                       "2024-Q3-West") into their real parts
4. Remove duplicates -- AFTER splitting, so "duplicate" is judged on
                       the real, separated columns, not a combined one
5. Filter out blanks/unwanted rows
6. Combine (Merge/Append) with other queries, once each source is clean
7. Load into the worksheet or the Data Model
```

Types before splits before filters, generally — fixing a column's type after you've already split
or filtered on it risks basing an earlier step on a wrong guess.

## Remove Duplicates — pick columns deliberately

Select the column(s) that actually define a "duplicate" for your data before running **Home >
Remove Rows > Remove Duplicates**. Selecting just a customer ID column removes every repeat visit
from that customer; selecting ID + date only removes same-day repeats. The columns you select
change the definition of duplicate entirely — don't default to "select all."

## Split Column by Delimiter

**Home > Split Column > By Delimiter**, pick the separator character, and Power Query creates one
new column per piece, named with `.1`, `.2`, etc. — rename them immediately, before they get used
in a downstream formula under their auto-generated names.

## Data types — check the header icon, don't assume

Power Query's first guess at a column's type is sometimes wrong (a ZIP code column loading as a
number and silently dropping a leading zero is the classic case). Click the small type icon in
each column header to confirm or fix it before building anything on top of that column.

## Merge vs. Append — the one question that decides it

Do these two tables share a key column I want to match on, or do they share the same columns and I
just want more rows?

- **Shared key, different columns to bring in → Merge** (a VLOOKUP for whole tables; pick a join
  kind — Left Outer keeps everything, Inner keeps only what matched).
- **Same columns, more rows → Append** (a UNION — stacks rows; column names must match exactly or
  Append creates a separate column per name variant instead of combining them).

## Why a query beats cleaning the same export by hand every week

Every step above gets recorded in Applied Steps as a named, ordered, re-runnable action. Next
week's fresh export gets the identical treatment with one click — **Refresh** — instead of
re-doing identical manual cleanup and risking a different result each time.

## Related course material

- Lesson 21 — Power Query Basics
- Lesson 22 — Cleaning Data With Power Query
- Lesson 23 — Combining & Appending Queries
