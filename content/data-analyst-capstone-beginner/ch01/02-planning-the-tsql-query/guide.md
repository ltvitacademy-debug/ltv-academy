# Lesson 2 — Planning the T-SQL Query

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 2 of 10**

## What you'll learn

- Why sketching a query in plain English before writing SQL saves rework
- Which AdventureWorks2012 tables this report actually needs, and why there are five of them,
  not four
- How those tables join together, in what order, and one real nuance a category-level report
  has to account for

## From requirement to table list

Lesson 1 landed on a specific requirement: total sales amount and order count for the current
quarter, by product **category**, for one stakeholder ahead of a pricing review. Before opening
SSMS, it's worth translating that requirement into a plain-English plan — what data do you need,
and where does it live?

Thornbury Cycle Supply Co. runs on AdventureWorks2012, so the real tables are:

- **`Sales.SalesOrderDetail`** — one row per line item on an order. Has the quantity and the
  line total (`LineTotal`), and which product was sold (`ProductID`).
- **`Sales.SalesOrderHeader`** — one row per sales order. Has the order date (`OrderDate`).
- **`Production.Product`** — one row per product. Has the product name and a
  `ProductSubcategoryID` pointing at its subcategory — but no category name directly.
- **`Production.ProductSubcategory`** — one row per subcategory. Has the subcategory name and a
  `ProductCategoryID` pointing at its parent category.
- **`Production.ProductCategory`** — one row per top-level category (`Bikes`, `Components`,
  `Clothing`, `Accessories`). Has the category name this report actually needs to group by.

Five tables, not four, because "category" isn't a column sitting directly on `Product` — it's
two hops up a hierarchy: product → subcategory → category. This is the one real structural
difference from a report that only needed to group by something stored directly on the product
row.

## Sketching the joins in plain English

Before writing a single `JOIN`, write the plan as a sentence:

> Start at the order detail, since that's where the dollar amounts live. Walk up to the order
> header to get the order date. Walk sideways to the product table. From there, walk up to
> subcategory, then up again to category, to get a readable category name.

Turned into pseudocode, that's:

```
SalesOrderDetail
  JOIN SalesOrderHeader     ON SalesOrderDetail.SalesOrderID         = SalesOrderHeader.SalesOrderID
  JOIN Product               ON SalesOrderDetail.ProductID            = Product.ProductID
  JOIN ProductSubcategory     ON Product.ProductSubcategoryID          = ProductSubcategory.ProductSubcategoryID
  JOIN ProductCategory         ON ProductSubcategory.ProductCategoryID  = ProductCategory.ProductCategoryID
WHERE OrderDate falls in the current quarter
GROUP BY category name
```

Notice the plan names **every join key** before a line of real SQL exists: `SalesOrderID`
connects detail to header, `ProductID` connects detail to product, `ProductSubcategoryID`
connects product to subcategory, and `ProductCategoryID` connects subcategory to category. If
you can't name the join key in plain English, you're not ready to write the `JOIN` yet — go
back and check the table.

## Why detail, not header, is the starting point

It's tempting to start from `SalesOrderHeader` since it feels like the "main" sales table. But
the dollar amount the stakeholder actually wants — sales amount — lives on
`SalesOrderDetail.LineTotal`, one row per line item. An order with three products on it produces
three detail rows and one header row. Starting the plan from the table that holds the number
you're aggregating, and joining outward from there, avoids a common mistake: double-counting
the order-level total once per line item.

## A real nuance: not every product has a subcategory

Four joins, each an `INNER JOIN`, means a product with no `ProductSubcategoryID` assigned (a
small number of rows in AdventureWorks2012 — things like non-stocked miscellaneous parts) drops
out of the result entirely, because it can never reach a category name. For this report, that's
the correct behavior, not a bug: a category performance snapshot can only show rows that actually
have a category, and the Merchandising Manager's pricing conversation is about categorized
products anyway. It's still worth knowing *why* a few rows disappear, rather than being surprised
by it later.

## Deciding the filter and the grouping, in plain English

Two more plain-English decisions, before SQL:

- **Filter**: "current quarter" becomes a date range check against `OrderDate` — the first day
  of this calendar quarter through today (or through quarter-end, depending on what Lesson 1's
  conversation settled on).
- **Grouping**: the report needs one row per category, so the grouping is on the category name
  alone — a single-column `GROUP BY`, simpler than a report that also split by region or
  territory.

## Key terms

| Term | Meaning |
|---|---|
| Join key | The column(s) that connect two tables together in a query |
| Hierarchy hop | Following a parent-key relationship (product → subcategory → category) across more than one join to reach the level you need |
| Grain (query) | What one output row represents — here, one product category |
| Plain-English plan | A sketch of tables, joins, filters, and grouping written in sentences, before SQL |

## Lab

Without opening SSMS, write out your own plain-English join plan for this report, naming all
five tables and all four join keys. Then check it against the plan above — did you also notice
that "category" requires two hops up from `Product`, or did you assume it was a column directly
on the product row?

## Check yourself

You're ready for Lesson 3 when you can name, from memory, all five tables this report needs, the
column that joins each pair of them, and why a product with no subcategory assigned won't appear
in the result.
