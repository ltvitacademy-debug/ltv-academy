# Power Query Transformation Steps Reference

An ordered checklist of the Power Query operations this course teaches
in Chapter 3, in the order you'll typically apply them to a messy,
real-world file. Not every step applies to every dataset — use it as a
sequence to check against, not a mandatory recipe.

## 1. Set data types first

Before anything else, confirm every column has the right type (Whole
Number, Decimal, Text, Date, and so on). A wrong type here causes
confusing errors several steps later that look unrelated to the real
cause. Fix types early, not as an afterthought.

## 2. Remove, filter, and edit rows

Strip out rows you don't need before transforming columns you don't
need either — it's wasted work to clean a column on rows you're about
to delete. Covers: removing the top/bottom N rows (common for export
files with a title block), removing duplicates, and filtering by a
column's values.

## 3. Replace known bad values

If you already know a value is wrong and what it should be instead
(a placeholder like `-1` standing in for a real number, for example),
fix it directly with **Replace Values**. Number columns replace the
entire cell; text columns replace matching substrings wherever they
appear — check the Advanced options if you need the opposite behavior.

```text
Replace Values: Value to find = -1, Replace with = 250000
```

## 4. Handle cell-level errors

A **cell-level error** (e.g., trying to convert the text `"NA"` to a
number) marks one cell without stopping the whole query — different
from a **step-level error**, which stops everything and needs fixing
before you can continue. Three options, same ribbon group:

| Approach | When to use it |
|---|---|
| Replace Errors | A conversion failed and a sensible placeholder value is acceptable |
| Remove Errors | The row is otherwise unusable |
| Keep Errors | You need to investigate the problem rows before deciding |

## 5. Split, merge, or extract columns

- **Split Column (By delimiter)** — breaks one column into several,
  *replacing* the original. Pick Left-most / Right-most / Each
  occurrence deliberately — the wrong "split at" choice produces a mess.
- **Merge Columns** — the opposite: combines several columns into one
  with a separator you choose.
- **Extract** — pulls part of a column's text into a *new* column,
  leaving the original intact. Use this instead of Split when you want
  to keep the source column around.

## 6. Build conditional / rule-based columns

- **Conditional Column** — an if/then/else column built from a dialog,
  no formula required. Chain multiple clauses with "Add clause"; the
  first matching clause wins. New conditional columns default to the
  `Any` type — set the real type afterward (back to step 1's habit).
- **Column From Examples** — type what the result should look like for
  one or two rows, and Power Query infers the transformation and writes
  the underlying M for you. Use this when you know the *result* you
  want but not which ribbon button produces it.

## 7. Pivot / unpivot, if the shape is wrong

If categories are spread across columns instead of down rows (or vice
versa), fix the shape before aggregating — most Group By and reporting
steps downstream expect one row per observation (a "long" / unpivoted
shape).

## 8. Group By & aggregations

Collapse detail rows into one summary row per group. Switch to
**Advanced** mode to group by more than one column, and to add more
than one aggregation (Sum, Average, Median, Min/Max, Count Distinct)
in the same step. "Add grouping" adds another column to group by;
"Add aggregation" adds another summary column — independent controls,
as many of each as needed.

## 9. Merge queries (sideways joins)

Combine two queries based on a shared column — exactly like a database
join. Two join kinds cover most real work:

| Join kind | Keeps |
|---|---|
| Left outer | Every row from the left table, matched data where it exists |
| Inner | Only rows that matched in both tables |

After merging, **expand** the new nested-table column to pick exactly
which fields from the right table to pull in. A null in an expanded
column after a Left outer merge is informative — it means the lookup
table is missing a row, not that something broke.

## 10. Append queries (stacking, not joining)

Different from Merge: **Append** stacks two queries with the *same*
columns on top of each other (e.g., combining monthly export files into
one table), rather than reaching sideways for new columns.

## 11. Parameters, for anything that will change later

If a value in your query (a file path, a date cutoff, a server name)
is likely to change between refreshes or environments, make it a
**Parameter** instead of hardcoding it into a step — one place to
update instead of hunting through every query that uses it.

## 12. Best-practice pass before loading

- Disable load on any intermediate/staging queries you don't need in
  the model directly.
- Rename steps and queries to something a future reader (including
  future you) understands without opening each one.
- Check Applied Steps for anything left over from exploration that
  isn't actually needed in the final query.

*Compiled from this course's Chapter 3 (Power Query & Data Cleaning)
lessons — every operation above is one this course actually teaches,
in the order a real cleanup pass tends to need them.*
