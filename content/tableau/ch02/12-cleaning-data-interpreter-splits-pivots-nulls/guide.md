# Lesson 12 — Cleaning Data: Data Interpreter, Splits, Pivots & NULLs

**Chapter 2 · Connecting & Preparing Data · Lesson 12 of 95**

## What you'll learn

- What Data Interpreter detects and fixes automatically in messy
  spreadsheet-style sources
- How to split one field into several, and when Tableau can do it
  automatically vs. manually
- How to pivot columns into rows — turning wide data into the long
  format Tableau generally prefers
- The different ways NULL values show up and how to handle each one

## Data Interpreter: cleaning messy spreadsheets automatically

Real-world Excel files are often built for humans to read, not for
software to parse — merged title cells, multiple small tables stacked
on one sheet, blank spacer rows. When Tableau detects this kind of
layout, it offers **Data Interpreter** right on the Data Source page.

![Real screenshot of a messy Excel spreadsheet titled 'Violent Crimes in 2016 in the United States by City and State', with a merged title row, a multi-month crimes table, and two smaller side tables (state totals, state population) on the same sheet.](/courses/tableau/ch02/12-cleaning-data-interpreter-splits-pivots-nulls/data-interpreter.png)
*Exactly the kind of layout that trips up naive parsing — multiple tables, a title row, on one sheet.*
Source: [Tableau Help — Clean Data with Data Interpreter](https://help.tableau.com/current/pro/desktop/en-us/data_interpreter.htm)

Turning on Data Interpreter (a checkbox on the Data Source page) has
Tableau attempt to find the actual sub-tables, strip out title/spacer
rows, and even flag which cells it excluded so you can review its
work — it's a starting point, not a guarantee, and always worth a
quick sanity check afterward.

## Splitting one field into several

Sometimes a single column actually holds multiple pieces of
information — a "Customer Name" field that's really "First Last," for
example. Right-click the field and choose **Split** (or **Custom
Split** if you need to control the delimiter or which piece to keep):

![Real screenshot showing a before/after: a single 'Customer Name' column with values like 'Claire Gute' and 'Darrin Van Huff', split automatically into two new columns, 'Customer Name - 1' and 'Customer Name - 2'.](/courses/tableau/ch02/12-cleaning-data-interpreter-splits-pivots-nulls/split-transform.png)
*Split detects the separator (a space, here) and creates new fields automatically.*
Source: [Tableau Help — Split a Field into Multiple Fields](https://help.tableau.com/current/pro/desktop/en-us/split.htm)

Tableau's automatic Split guesses the delimiter (space, comma, etc.)
for you; **Custom Split** lets you specify it exactly, and choose
whether to split on the first, last, or all occurrences of it.

## Pivoting: wide columns into long rows

A source is sometimes organized with what should be *values* spread
across separate *columns* — a quarterly sales sheet with one column
per brand, for instance. Tableau strongly prefers the opposite
(long/tall) shape, covered fully in Lesson 13. Select the columns to
combine, right-click, and choose **Pivot**:

![Real screenshot showing a before/after: quarterly sales data with separate Samsung, Nokia, and Apple columns, pivoted into two new columns, 'Pivot Field Names' (the brand) and 'Pivot Field Values' (the sales figure).](/courses/tableau/ch02/12-cleaning-data-interpreter-splits-pivots-nulls/pivot-transform.png)
*Three brand columns become two: one naming the brand, one holding its value — long format.*
Source: [Tableau Help — Pivot Data from Columns to Rows](https://help.tableau.com/current/pro/desktop/en-us/pivot.htm)

This turns "one row per quarter, one column per brand" into "one row
per quarter-brand combination" — exactly the shape Lesson 13 explains
Tableau works best with.

## Handling NULLs

NULL means "no value recorded" — not zero, not blank text, genuinely
absent. Tableau shows NULLs distinctly depending on where they appear:

| Where | What you see | What you can do |
|---|---|---|
| On an axis (a continuous Measure) | A small indicator icon at the edge of the view noting hidden NULL marks | Click the indicator to show/filter them explicitly |
| As a Dimension header | A "Null" label as its own header/group | Filter it out, or investigate why the source has gaps |
| Inside a calculation | Can silently break arithmetic (`NULL + 5` is `NULL`, not `5`) | Wrap with `IFNULL()`/`ZN()` (covered in Chapter 6) to substitute a default |

The important habit here is noticing NULLs exist at all — a chart that
silently drops rows with NULL values can quietly understate totals if
you don't check for that indicator.

## Key terms

| Term | Meaning |
|---|---|
| Data Interpreter | Automatic detection/cleanup of messy spreadsheet layouts |
| Split | Breaking one field into multiple fields based on a delimiter |
| Pivot | Turning columns into rows (or vice versa) to reshape data |
| NULL | A genuinely missing value, distinct from zero or blank text |

## Lab

1. Find or create a messy spreadsheet (merged header, multiple tables on one sheet) and connect Tableau to it — see whether Data Interpreter's checkbox appears and what it fixes.
2. On any Name-style field, try both automatic Split and Custom Split, and compare the results.
3. Take a small wide-format table (one column per category) and Pivot it into long format — count the rows before and after.

## Check yourself

You're ready for Lesson 13 when you can explain what Data Interpreter,
Split, and Pivot each do differently, and describe one place a NULL
value could silently affect a total if you didn't check for it.
