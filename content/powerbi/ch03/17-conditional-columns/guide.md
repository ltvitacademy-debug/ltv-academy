# Lesson 17 — Conditional Columns & Columns From Examples

**Chapter 3 · Power Query & Data Cleaning · Lesson 6 of 12**

## What you'll learn

- How to build an if/then/else column without writing a formula
- Chaining multiple conditions with "Else if"
- How Column From Examples writes a transformation just from what you type
- Why the M formula bar matters, even if you never type M yourself

## Building an if/then/else column

Some new columns depend on a rule, not a direct calculation. Here's a
table with a **CustomerGroup** number and three different price tiers:

![Screenshot of a table with columns Customer, CustomerGroup, Tier 1 Price, Tier 2 Price, and Tier 3 Price.](/courses/power-bi/ch03/17-conditional-columns/add-conditional-column-sample-table-start.png)
*The goal: a Final Price column that picks the right tier price based on each customer's group.*

**Conditional Column**, on the Add Column ribbon, builds exactly this kind
of rule without writing a formula by hand:

![Screenshot of the Add Conditional Column dialog with New column name set to Final Price, and two clauses: If CustomerGroup equals 1 Then Tier 1 Price, Else if CustomerGroup equals 2 Then Tier 2 Price, with an Else output of Tier 3 Price.](/courses/power-bi/ch03/17-conditional-columns/add-conditional-column-multiple-clauses.png)
*Read it like a sentence: if CustomerGroup equals 1, output Tier 1 Price. Else if it equals 2, output Tier 2 Price. Otherwise (Else), output Tier 3 Price.*

Select **Add clause** to chain as many conditions as you need — each one
is tested top to bottom, and the first match wins. The result:

![Screenshot of the same table with a new Final Price column, correctly showing the tier price matching each row's CustomerGroup.](/courses/power-bi/ch03/17-conditional-columns/add-conditional-column-sample-table-final.png)
*Every row picked the correct tier automatically. Note: new conditional columns come in with the Any data type — set the correct type afterward (Lesson 13).*

## Column From Examples: describe it, don't build it

Sometimes you know exactly what result you want, but not which combination
of ribbon buttons gets you there. **Column From Examples** flips the
process: you type what the answer should look like, and Power Query
figures out the transformation.

Select a column (here, **Monthly Income**), choose **Column From Examples
> From Selection**, and type your first example:

![Screenshot of the Add Column From Examples interface, with a new Range column, the first row's example entered as "15000 to 20000," and Power Query's inferred M formula shown above the table.](/courses/power-bi/ch03/17-conditional-columns/add-column-from-example-from-selection-buckets.png)
*Type one example — "15000 to 20000" for a Monthly Income of 19,500 — and Power Query infers the bucketing pattern, filling in the rest automatically. The formula it wrote appears right above the table.*

Select **OK**, and the new column becomes a real, permanent step in your
query — inspectable and editable like any other:

![Screenshot of the final table with a new Range column added, applied as a step named "Inserted Range" in the Query Settings pane.](/courses/power-bi/ch03/17-conditional-columns/add-column-from-example-from-selection-buckets-final.png)
*Same result you'd get writing the formula by hand — Power Query just wrote it for you, based on one example.*

## Why the formula bar matters

Notice that formula displayed above the table in the screenshot — that's
Power Query M, the same language from Lesson 12's Advanced Editor. Column
From Examples is really just a friendlier way to generate M code without
knowing the syntax. You'll never *need* to write M for this, but reading
that generated formula is a good way to start recognizing the language.

## When to use which

- **Conditional Column** — when you already know the exact rule (if X
  equals this, output that).
- **Column From Examples** — when you know the *result* you want but
  aren't sure which transformation produces it, or the transformation
  needed isn't obviously one button on the ribbon.

## Key terms

| Term | Meaning |
|---|---|
| Conditional Column | Builds an if/then/else column via a dialog, no formula required |
| Clause | One if/then condition in a Conditional Column; chainable with "Add clause" |
| Column From Examples | Infers a transformation from typed example values |
| Formula bar | Shows the actual M code behind the current step |

## Lab

1. Find a table with a numeric or category column, and build a
   **Conditional Column** with at least two clauses plus an Else.
2. On any column, try **Column From Examples > From Selection** and type
   one example of a transformation (like extracting just the first word).
3. Look at the formula Power Query generated in the formula bar for that
   new column.

## Check yourself

You're ready for Lesson 18 when you can decide, for a given task, whether
Conditional Column or Column From Examples is the faster path to the
column you need.
