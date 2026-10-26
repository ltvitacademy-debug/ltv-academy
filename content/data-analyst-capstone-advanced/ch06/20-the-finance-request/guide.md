# Lesson 20 — The Finance Request: Why Excel, Not a BI Tool

**Chapter 6 · The Finance Reconciliation Workbook · Lesson 20 of 26**

## What you'll learn

- Why Finance's request is genuinely different from the Executive's
  or the Board's, not just "the same dashboard in a different tool"
- What a CSV export of the warehouse actually looks like, and why
  it's flattened differently than either Power BI's or Tableau's model
- Why Finance deliberately gets a static extract instead of a live
  connection to anything
- What this chapter is really building toward: a workbook built
  independently enough to genuinely test whether the other two
  deliverables are right

## What Finance actually asked for

Lesson 1 named the request plainly: Finance wants a workbook they can
**manipulate themselves** — not a dashboard they view, a spreadsheet
they can open, re-sum with their own formulas, and sign off on before
numbers go into a QBR package. That's not a lesser version of the
Power BI or Tableau deliverable; it's a genuinely different
job-to-be-done, the same distinction Lesson 1 drew between all three
audiences.

## Why a CSV export, not a live connection

Power BI and Tableau both connect straight to `dw.*` — Finance's
workbook does not. Finance works in Excel, against a flat file, by
design:

```sql
SELECT
    f.SalesOrderID,
    d.FullDate      AS OrderDate,
    p.ProductName,
    p.CategoryName,
    t.TerritoryName,
    f.OrderQty,
    f.LineTotal
FROM dw.FactProductSales f
JOIN dw.DimDate d      ON f.OrderDateKey = d.DateKey
JOIN dw.DimProduct p   ON f.ProductKey   = p.ProductKey
JOIN dw.DimTerritory t ON f.TerritoryKey = t.TerritoryKey;
```

This export flattens the fact table and three dimensions into one
human-readable table — real column names (`OrderDate`, not
`OrderDateKey`), real dates (`FullDate`, not a `yyyyMMdd` surrogate
key), and no surrogate keys exposed at all. Power BI's and Tableau's
models kept the star schema's separate tables and relationships
intact; this export deliberately collapses them into the single flat
sheet a spreadsheet actually works with.

## Why static, on purpose

This CSV is a point-in-time export — Finance's workbook does not
auto-refresh against the warehouse the way Power BI's scheduled
refresh does. That's deliberate, not a missing feature: Finance's
whole job here is to manually sign off on a specific, frozen set of
numbers for one specific quarter, at one specific moment — a live,
constantly-changing connection would actually work against that goal,
not for it.

## Why this chapter matters more than it looks like it should

It would be easy to treat Finance's Excel workbook as the least
technically interesting of the three deliverables — no DAX, no LOD
expressions, "just" a spreadsheet. That's backwards. Finance's
workbook is about to become the one deliverable in this capstone
genuinely built independently enough to catch a real mistake the
other two don't have. Chapter 7 is built entirely around what that
independence reveals.

## Key terms

| Term | Meaning |
|---|---|
| Flattened extract | A single, denormalized table combining a fact table and its dimensions into one flat result, built for tools that don't model relationships directly |
| Point-in-time export | Data captured once, as of a specific moment, with no automatic refresh |

## Lab

1. Run the export query above against your warehouse and save the
   result as a CSV.
2. Open the CSV in a text editor (not Excel yet) and confirm it has
   no surrogate keys at all — only real, readable column values.
3. Write one sentence on why Finance's workbook deliberately doesn't
   auto-refresh the way Power BI's does.

## Check yourself

You're ready for Lesson 21 when you can explain what Finance actually
asked for, why their export is flattened differently than Power BI's
or Tableau's model, and why a static extract fits Finance's job
better than a live connection would.
