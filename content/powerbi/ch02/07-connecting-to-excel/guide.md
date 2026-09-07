# Lesson 7 — Connecting to Excel

**Chapter 2 · Connecting to Data · Lesson 2 of 6**

## What you'll learn

- The full Excel connection flow, one level deeper than Lesson 4's first pass
- Why one worksheet can produce more than one table in Navigator
- The difference between loading a whole sheet and loading a suggested table
- One common surprise (numbers that look "off") and why it happens

## Connecting to a workbook

Select **Excel Workbook** from Get Data, browse to the file, and select
**Open**.

![Screenshot of the Windows file picker with an Excel workbook selected.](/courses/power-bi/ch02/07-connecting-to-excel/connect-desktop.png)
*Local file, cloud-synced folder, network drive — if Windows can browse to it, this dialog can too.*

Power BI reads the file and lands you in the same Navigator every connector
uses.

![Screenshot of the Navigator dialog showing a loaded Excel table with Load and Transform Data buttons.](/courses/power-bi/ch02/07-connecting-to-excel/desktop-navigator-view.png)
*Same Navigator, same two choices as every other connector: Load, or Transform Data first.*

## When one sheet holds more than one table

Here's where Excel gets interesting. Spreadsheets don't have to contain one
tidy table per sheet — people often stack several small tables on one sheet,
separated by blank rows and columns:

![Screenshot of an Excel worksheet containing three separate blocks of data: fruit sales, city dates, and store addresses.](/courses/power-bi/ch02/07-connecting-to-excel/workbook-data.png)
*One sheet, three unrelated tables: fruit sales, a couple of city/date pairs, and a store list.*

Power BI Desktop notices this and gives you two ways to load it. **Option
one: the whole sheet, as-is.** Every cell Excel sees, including the gaps
between your separate tables, which show up as blank (**null**) values:

![Screenshot of the Navigator showing the entire worksheet loaded, with null values filling the gaps between the three data blocks.](/courses/power-bi/ch02/07-connecting-to-excel/entire-workbook-sheet.png)
*The whole-sheet option — technically complete, but full of nulls and mismatched columns. Rarely what you actually want.*

**Option two: a suggested table.** Power BI notices the layout and offers
each separate block as its own clean table:

![Screenshot of the Navigator with one of three suggested tables selected, showing a clean table of store addresses with no null values.](/courses/power-bi/ch02/07-connecting-to-excel/table-three-only.png)
*Power BI spotted all three blocks and offers each one, pre-separated, under "Suggested Tables." This is almost always the better choice.*

For any sheet like this, prefer the suggested table that matches the data
you actually want over loading the whole sheet — you'll get clean columns
without null-filled gaps, and without extra clean-up work in Power Query.

## A common surprise: "why did my number change?"

Occasionally a number that reads cleanly in Excel — say, 0.049 — shows up in
Power BI's preview as something like 0.049000000000000002. This isn't a bug.
Excel itself can't store every decimal with perfect precision, and Power
Query is showing you the exact value that was already sitting in the file.
It's cosmetic and doesn't affect calculations — just don't be alarmed by it
the first time you see it.

## Key terms

| Term | Meaning |
|---|---|
| Suggested Tables | Power BI's automatic detection of multiple distinct tables on one sheet |
| Whole sheet | Loading every cell on a sheet as one table, gaps included |
| Null | A blank/missing value — what gaps between tables become when you load a whole sheet |
| Legacy workbook | Older `.xls`/`.xlsb` files, which need an extra driver (ACE) to read |

## Lab

1. Open our [Financial Sample workbook](/downloads/power-bi/financial-sample.xlsx)
   (or any Excel file you have) in Power BI Desktop via **Get data > Excel**.
2. In Navigator, note whether Power BI offers any Suggested Tables. If your
   file has one clean table per sheet, it won't — that's expected.
3. If you have (or can create) a spreadsheet with two separate small tables
   on one sheet, connect to it and compare loading the whole sheet versus a
   suggested table. Notice the null values in the whole-sheet version.

## Check yourself

You're ready for Lesson 8 when you can explain, to someone who's never seen
it, why a single Excel sheet might produce three different tables in
Navigator instead of one.
