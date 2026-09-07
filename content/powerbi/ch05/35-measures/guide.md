# Lesson 35 — Measures

**Chapter 5 · DAX Fundamentals · Lesson 4 of 15**

## What you'll learn

- What a measure is, and how it's calculated differently from a calculated column
- How to create one, with a real worked example
- What a measure's "home table" is, and why organizing measures matters
- What quick measures are, and how they can teach you DAX by example

## A calculation with no fixed result

A **measure** is a DAX formula that calculates a result dynamically — its
value depends entirely on whatever's filtering it at the moment. Add a
measure to a report, and its number changes as a viewer selects
different slicers, drills into a different category, or expands a
different year. Nothing is stored; every view triggers a fresh
calculation.

Measures you create appear in the **Data** pane with a calculator icon,
right alongside implicit (automatically summarized) fields:

![Screenshot of the Power BI Data pane, with three sales-related measures highlighted among the list of fields.](/courses/power-bi/ch05/35-measures/data-pane-measures.png)
*Measures live in the Data pane like any other field — the calculator icon is what marks them as measures instead of plain columns.*

## A worked example

Janice, a sales manager, needs to project next year's sales — last
year's totals, increased by 6% to account for scheduled promotions. She
imports last year's sales, renames the field **Last Years Sales**, and
selects **Modeling → New measure**:

Projected Sales = SUM('Reseller Sales'[Last Years Sales])*1.06

This measure takes the sum of last year's sales and multiplies it by
1.06 — a straightforward calculation, but one that recalculates
correctly no matter how the report is filtered:

![Screenshot of a Power BI clustered column chart comparing Last Years Sales against Projected Sales, with both measures highlighted in the Data pane.](/courses/power-bi/ch05/35-measures/last-year-sales-projected-sales-chart.png)
*Filter this by reseller, region, or product, and Projected Sales recalculates correctly every time — because it's a formula, not a stored value.*

## Organizing your measures

As a model grows, so does the measures list. Two tools help keep it
readable:

- **Home table**: every measure belongs to a table (shown in the Data
  pane). You can reassign a measure's home table to wherever makes most
  sense for report authors to find it.
- **Display folders**: in **Model view**, select a field, then in the
  **Properties** pane enter a folder name under **Display folder**. Use a
  backslash for subfolders (`Finance\Currencies`), or a semicolon to make
  a field appear in more than one folder.

Some modelers go further and build a dedicated table that holds nothing
but measures — created with **Enter data**, given one hidden column, with
every measure moved into it. That table always appears at the top of the
Data pane, giving report authors one obvious place to look.

## Quick measures: a shortcut and a teacher

Power BI also offers **quick measures** — ready-made calculations you
select from a dialog instead of typing DAX by hand (running totals,
percent-of-total, and similar common patterns). They're useful on their
own, but they're also a genuinely good way to learn: after creating one,
you can open it and read the DAX formula Power BI generated, seeing a
correct, working example of a pattern you might not have written
yourself yet.

## Key terms

| Term | Meaning |
|---|---|
| Measure | A DAX formula calculated dynamically, based on the current filter context |
| Home table | The table a measure is filed under in the Data pane |
| Display folder | An organizational folder for fields within a table's Data pane listing |
| Quick measure | A ready-made calculation you configure through a dialog instead of writing DAX |

## Lab

1. Import **AdventureWorksDW2014**'s `FactResellerSales` table and
   create `Total Reseller Sales = SUM(FactResellerSales[SalesAmount])`,
   then add it to a visual.
2. Add a slicer on `DimSalesTerritory[SalesTerritoryRegion]` (import
   that table too) and confirm your measure's value updates as you
   change the selection — unlike a calculated column, nothing here was
   stored ahead of time.
3. Try a quick measure (right-click `FactResellerSales` → **New quick
   measure**), then open it afterward to read the DAX formula it
   generated.

## Check yourself

You're ready for Lesson 36 when you can explain, in one sentence, why a
measure's value can be different every time you look at it, while a
calculated column's value stays fixed until the next refresh.
