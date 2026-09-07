# Lesson 15 — Replacing Values and Handling Errors

**Chapter 3 · Power Query & Data Cleaning · Lesson 4 of 12**

## What you'll learn

- How to replace a specific value wherever it appears in a column
- The difference between "entire cell contents" and "instances of text"
- What causes a cell-level error, using a real conversion example
- Three ways to handle errors: remove, replace, or deliberately keep them

## Replacing a known bad value

Sometimes you know exactly what's wrong and what it should say instead.
Imagine a Sales Goal column where one row has **-1**, an obvious
placeholder, instead of the real number:

![Screenshot of the Replace values dialog with "Value to find" set to -1 and "Replace with" set to 250000.](/courses/power-bi/ch03/15-replacing-values-errors/replace-values-numeric.png)
*Right-click the value (or use Replace Values on the Home ribbon), enter what to find and what to replace it with.*

Every occurrence updates:

![Screenshot of a table with Account ID, Category Name, and Sales Goal columns, all Sales Goal values now showing real numbers instead of -1.](/courses/power-bi/ch03/15-replacing-values-errors/original-after-numeric-replace.png)
*Same operation works for text too — replacing "Category Name: Prime" with just "Prime," for example, by leaving Replace With empty and matching part of the text.*

By default, number columns replace the **entire cell's contents**; text
columns replace **instances of a matching string** wherever it appears
inside the value. The Advanced options in the same dialog let you switch
either behavior — match a whole text cell exactly, for instance.

## Where errors actually come from

Errors aren't random — they have a specific cause you can read directly.
Here's a Sales column where one row holds the text "NA" instead of a
number:

![Screenshot of a data table with an Error cell in the Sales column, and an error details panel reading "DataFormat.Error: We couldn't convert to Number. Details: NA."](/courses/power-bi/ch03/15-replacing-values-errors/could-not-convert-details.png)
*Click the whitespace in an error cell to see exactly why it failed — here, Power Query tried to convert the text "NA" to a number and couldn't.*

This is a **cell-level error** — it doesn't stop your query from loading,
it just marks that one cell. (A **step-level error**, by contrast, stops
the whole query and shows a full-page yellow warning — usually caused by a
missing column or an inaccessible data source.)

## Three ways to handle a cell-level error

**Remove** the offending rows entirely, from the same Remove Rows menu you
saw in Lesson 14:

![Screenshot of the Home ribbon's Remove Rows menu open with Remove Errors highlighted.](/courses/power-bi/ch03/15-replacing-values-errors/remove-errors.png)
*Removes every row where the selected column shows an error — simple, but you lose the rest of that row's data too.*

**Replace** the error with a specific value instead — often the better
choice when the row itself still has useful data:

![Screenshot of the Replace Errors dialog with Value set to 10.](/courses/power-bi/ch03/15-replacing-values-errors/replace-errors-window.png)
*Transform tab → Replace Values → Replace Errors. Every error in the column becomes whatever value you specify — here, 10.*

**Keep** only the error rows — not a fix, but a genuinely useful auditing
move: filter down to just the problem rows so you can inspect them
separately (Home → Keep Rows → Keep Errors) before deciding what to do.

## Choosing which approach fits

- Know the correct value? **Replace values** directly (the -1 → 250,000
  example above).
- A conversion failed and a placeholder is acceptable? **Replace errors**
  with a sensible default.
- The row is otherwise unusable? **Remove errors**.
- Need to investigate first? **Keep errors**, look at just those rows,
  then decide.

## Key terms

| Term | Meaning |
|---|---|
| Replace values | Finds and replaces a specific value across a column |
| Cell-level error | An error in one cell that doesn't stop the query from loading |
| Step-level error | An error that stops the entire query, shown full-page |
| Remove/Replace/Keep errors | The three ribbon options for handling cell-level errors |

## Lab

1. Find (or create) a column with an obviously wrong value, and use
   **Replace Values** to fix it.
2. Convert a text column containing a non-numeric value (like "NA" or
   "N/A") to Whole Number, and click into the resulting error cell to read
   its details.
3. Try all three error-handling options on that same error — Remove,
   Replace, and Keep — undoing each with the X on Applied Steps before
   trying the next.

## Check yourself

You're ready for Lesson 16 when you can explain the difference between a
cell-level error and a step-level error, and describe a scenario where
each of Remove, Replace, and Keep Errors would be the right call.
