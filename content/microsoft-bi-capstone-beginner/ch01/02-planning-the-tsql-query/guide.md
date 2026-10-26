# Lesson 2 — Planning the T-SQL Query

**Chapter 1 · Beginner Capstone: Regional Sales Snapshot · Lesson 2 of 10**

## What you'll learn

- Why sketching a query in plain English before writing SQL saves rework
- Which AdventureWorks2012 tables this report actually needs, and why
- How those tables join together, and in what order to think about it

## From requirement to table list

Lesson 1 landed on a specific requirement: total sales amount and order count for the
current quarter, by sales territory and product line, for one stakeholder. Before opening
SSMS, it's worth translating that requirement into a plain-English plan — what data do you
need, and where does it live?

Carraway Supply Co. runs on AdventureWorks2012, so the real tables are:

- **`Sales.SalesOrderHeader`** — one row per sales order. Has the order date (`OrderDate`)
  and which territory the order belongs to (`TerritoryID`).
- **`Sales.SalesOrderDetail`** — one row per line item on an order. Has the quantity and the
  line total (`LineTotal`), and which product was sold (`ProductID`).
- **`Production.Product`** — one row per product. Has the product's name and its product
  line/category information.
- **`Sales.SalesTerritory`** — one row per sales territory. Has the human-readable territory
  name (`Name`) that `TerritoryID` points to.

Four tables, each answering one part of the question: **when** (header), **how much and
what** (detail), **which product line** (product), **which region** (territory).

## Sketching the joins in plain English

Before writing a single `JOIN`, write the plan as a sentence:

> Start at the order detail, since that's where the dollar amounts live. Walk up to the
> order header to get the order date and territory. Walk sideways to the product table to
> get the product line. Walk from the territory ID to the territory table to get a readable
> region name.

Turned into pseudocode, that's:

```
SalesOrderDetail
  JOIN SalesOrderHeader ON SalesOrderDetail.SalesOrderID = SalesOrderHeader.SalesOrderID
  JOIN Product           ON SalesOrderDetail.ProductID    = Product.ProductID
  JOIN SalesTerritory     ON SalesOrderHeader.TerritoryID  = SalesTerritory.TerritoryID
WHERE OrderDate falls in the current quarter
GROUP BY territory name, product line
```

Notice the plan names **every join key** before a line of real SQL exists: `SalesOrderID`
connects detail to header, `ProductID` connects detail to product, `TerritoryID` connects
header to territory. If you can't name the join key in plain English, you're not ready to
write the `JOIN` yet — go back and check the table.

## Why detail, not header, is the starting point

It's tempting to start from `SalesOrderHeader` since it feels like the "main" sales table.
But the dollar amount the stakeholder actually wants — sales amount — lives on
`SalesOrderDetail.LineTotal`, one row per line item. An order with three products on it
produces three detail rows and one header row. Starting the plan from the table that holds
the number you're aggregating, and joining outward from there, avoids a common mistake:
double-counting the order-level total once per line item.

## Deciding the filter and the grouping, in plain English

Two more plain-English decisions, before SQL:

- **Filter**: "current quarter" becomes a date range check against `OrderDate` — the first
  day of this calendar quarter through today (or through quarter-end, depending on what
  Lesson 1's conversation settled on).
- **Grouping**: the report needs one row per territory **and** product line combination, so
  the grouping is on both columns together, the same way multi-column `GROUP BY` always
  works — a group is the unique pairing, not either column alone.

## Key terms

| Term | Meaning |
|---|---|
| Join key | The column(s) that connect two tables together in a query |
| Grain (query) | What one output row represents — here, one territory + product line pair |
| Plain-English plan | A sketch of tables, joins, filters, and grouping written in sentences, before SQL |

## Lab

Without opening SSMS, write out your own plain-English join plan for this report, naming
every table and every join key. Then check it against the plan above — did you also start
from `SalesOrderDetail`, or did you start from the header table? If you started from the
header, explain why that risks double-counting.

## Check yourself

You're ready for Lesson 3 when you can name, from memory, all four tables this report needs,
the column that joins each pair of them, and why the query should start from
`SalesOrderDetail` rather than `SalesOrderHeader`.
