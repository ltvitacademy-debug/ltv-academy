# Lesson 2 — Planning the Architecture

**Chapter 1 · Scoping the Quarterly Business Review Package · Lesson 2 of 26**

## What you'll learn

- The real, named architecture this capstone builds, end to end
- Why the warehouse gets built *first*, before any of the three
  front-end tools are touched at all
- Why an automated Python validation layer sits between the warehouse
  and the front-ends, not off to the side
- The exact shape of the fact table and dimensions you'll build in
  Chapter 2 — named now, built for real starting next lesson

## From "three tools" to a real pipeline

Lesson 1 established *what* Thornbury's leadership wants: three
deliverables, three audiences. This lesson turns that into an actual
build order — a named pipeline, where every stage's output is exactly
what the next stage needs as input.

| Stage | What gets built | Tool |
|---|---|---|
| 1. Source | Real OLTP order data, already sitting in AdventureWorks2012 | SQL Server (existing) |
| 2. Warehouse | A new `dw.*` schema: `dw.FactProductSales` + four dimension tables | T-SQL |
| 3. Validation | A script that checks the warehouse for row-count parity, nulls, duplicates, and orphaned keys, every time it refreshes | Python (pandas) |
| 4. Executive front-end | A data model + dashboard reading `dw.*` directly | Power BI |
| 5. Board front-end | A dashboard connecting to the *same* `dw.*` warehouse through SQL Server, not Tableau's bundled sample data | Tableau |
| 6. Finance front-end | A workbook built from a CSV export of `dw.FactProductSales`, reconciled against the other two | Excel |

Notice the order: the warehouse and its validation layer are stages 2
and 3 — built and proven correct *before* stage 4 even starts. None of
the three front-end tools gets touched until there's a trustworthy
`dw.*` schema underneath it to point at.

## Why build the warehouse first

It would be faster, in the short term, to open Power BI immediately and
build a model straight off `Sales.SalesOrderDetail` and
`Sales.SalesOrderHeader`. That shortcut has a real cost: Tableau and
Excel would then each need to reimplement the same joins and the same
business logic independently, and any small difference between those
three independent implementations — a join that includes cancelled
orders in one tool but not another, say — becomes a discrepancy no one
can explain later. Building the warehouse first means that logic gets
written exactly once, in one place, and every front-end simply reads
the result.

## The warehouse, named

Chapter 2 builds a star schema with one fact table at its center:

- **`dw.FactProductSales`** — the fact table, grain: **one row per
  order line** (one row per `Sales.SalesOrderDetail` record)
- **`dw.DimProduct`** — product, with category and subcategory
  **flattened directly onto it** (no separate category/subcategory
  dimension tables)
- **`dw.DimDate`** — a conformed calendar dimension
- **`dw.DimTerritory`** — sales territory, including its region group
- **`dw.DimCustomer`** — customer, tracing back to either an
  individual person or a store account

Every one of these tables is built with real `CREATE TABLE` and
`INSERT ... SELECT ... FROM` statements against AdventureWorks2012's
actual source tables — `Sales.SalesOrderDetail`,
`Sales.SalesOrderHeader`, `Production.Product`,
`Production.ProductSubcategory`, `Production.ProductCategory`,
`Sales.SalesTerritory`, and `Sales.Customer`. Lesson 3 designs this
schema in detail; Lessons 4 and 5 build it for real.

## Why validation sits underneath, not off to the side

The Python validation layer isn't a nice-to-have bolted on at the end —
it's drawn as its own stage, between the warehouse and every front-end,
because that's literally where it has to sit to do its job. The
warehouse refreshes on a schedule (Chapter 3 covers exactly how), and
nobody is going to manually re-check row counts and null rates every
single night. An automated script is the only way three front-ends can
all trust the same warehouse without re-verifying it themselves.

## What's explicitly out of scope

This capstone does not build a live, bidirectional sync between the
three front-ends, and it does not give Finance write-access back into
the warehouse. Each front-end is a **read-only consumer**. When Finance
finds a discrepancy later in this capstone (and they will — Chapter 7
is built around it), the fix happens in Finance's own workbook, not by
Finance editing the warehouse directly.

## Key terms

| Term | Meaning |
|---|---|
| Star schema | A fact table at the center, surrounded by dimension tables it joins to, each one level of detail removed from the fact |
| Grain | The level of detail one row in a fact table represents — here, one row per order line |
| Read-only consumer | A front-end tool that queries a shared warehouse but never writes back into it |

## Lab

1. Draw (on paper or in any tool) the six-stage pipeline table above,
   from memory, in order.
2. In AdventureWorks2012, run
   `SELECT TOP 5 SalesOrderID, ProductID, OrderQty, LineTotal FROM Sales.SalesOrderDetail;`
   and confirm for yourself these are exactly the columns `dw.FactProductSales`
   will be built from.
3. Write one sentence explaining why Power BI, Tableau, and Excel are
   not allowed to each build their own version of the join logic
   independently.

## Check yourself

You're ready for Lesson 3 when you can name all six stages of this
pipeline in order, name the fact table and all four dimensions by
their real `dw.*` names, and explain why the warehouse and its
validation layer are built before any front-end tool is touched.
