# Lesson 26 — Filter, Select & Derived Column

**Chapter 5 · Mapping Data Flows · Lesson 4 of 7**

## What you'll learn

- What the Filter transformation does — a real WHERE clause, visually
- What Select actually reshapes, versus what it doesn't touch
- How Derived Column creates and overwrites columns
- Column patterns, for reshaping many columns with one rule

## Filter: a WHERE clause, built visually

The **Filter** transformation works exactly like a SQL `WHERE`
clause: it evaluates a boolean expression per row, and only rows
where it's true continue downstream.

![Screenshot of the Filter transformation, showing a filter condition expression box.](/courses/data-factory/ch05/26-filter-select-derived-column/filter1.png)
*`year <= 1960` — a genuinely simple expression, the same expression language from Chapter 4, Lesson 22.*

## Select: renaming, dropping, and reordering — nothing else

The **Select** transformation reshapes a stream's *column list*,
without touching a single row's actual values:

- **Rename** a column.
- **Drop** a column entirely.
- **Reorder** columns in the output.

It's the tool you reach for after a Copy activity's default mapping,
or after a Join brings in duplicate-named columns from both sides,
and you need a clean, deliberate column list before the data reaches
a sink.

## Derived Column: creating and overwriting values

**Derived Column** generates new columns, or overwrites existing
ones, using an expression:

![Screenshot of the Derived Column settings, showing a column name field and an expression builder for its value.](/courses/data-factory/ch05/26-filter-select-derived-column/create-derive-column.png)

- To create a **new** column, type its name directly into the Column
  box.
- To **overwrite** an existing one, select it from the dropdown
  instead.
- Build the expression in the **Enter expression** box — the same
  functions and system variables Chapter 4, Lesson 22 already taught.

A real example from Microsoft's own documentation: a `Rating` column,
originally text, gets overwritten with `toInteger(Rating)` — the same
column name, a genuinely different, now-numeric type.

## Column patterns: one rule, many columns

When a schema isn't explicitly fixed, or you need to update a whole
*set* of columns at once, a **column pattern** matches columns by
metadata rules and applies the same derived-column logic to every
match. A real example: match every column whose name starts with
`"movies"`, and prefix each matched value with `"movie_"` — one rule,
applied automatically to however many columns actually match, now or
in the future as the schema drifts.

## Key terms

| Term | Meaning |
|---|---|
| Filter | Keeps only rows matching a boolean expression — a visual WHERE clause |
| Select | Renames, drops, or reorders columns, without changing row values |
| Derived Column | Creates new columns or overwrites existing ones via an expression |
| Column pattern | One expression rule applied to every column matching a metadata condition |

## Lab

1. Add a Filter transformation to a data flow, keeping only rows
   matching a real condition on your source data.
2. Add a Derived Column transformation that creates one new column
   and overwrites one existing column's type.
3. Add a Select transformation renaming one column and dropping
   another — confirm in Data Preview (Lesson 24) that row values
   themselves are untouched.

## Check yourself

You're ready for Lesson 27 when you can explain, in one sentence,
the real difference between what Select changes and what Derived
Column changes.
