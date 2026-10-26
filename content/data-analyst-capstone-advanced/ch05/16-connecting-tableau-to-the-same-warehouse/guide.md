# Lesson 16 — Connecting Tableau to the Same Warehouse

**Chapter 5 · The Tableau Board Deck · Lesson 16 of 26**

## What you'll learn

- How to connect Tableau Desktop to the exact same `dw.*` SQL Server
  warehouse Power BI already reads from — not Tableau's bundled
  sample data
- Why Tableau's "Microsoft SQL Server" connector matters specifically
  here, as opposed to any generic file-based connection
- How to bring in the fact table and its dimensions with real joins,
  mirroring the star schema instead of flattening it into one query
- Why this lesson is the one place this capstone's whole architecture
  could quietly fail, if skipped carelessly

## The decision this lesson is actually about

Every Tableau tutorial anyone has ever seen starts with **Sample -
Superstore**, the sample dataset bundled with Tableau. This capstone
deliberately does not use it. Thornbury's Board doesn't want a deck
about a fictional office-supply retailer — they want the real Q3
numbers for Thornbury Cycle Supply Co., built from the exact same
warehouse Executives are already looking at in Power BI. If this
Tableau deck were built on Superstore instead, nothing in it would
ever be checkable against the Power BI dashboard or Finance's
spreadsheet — which defeats the entire "one source of truth" premise
this capstone is built around.

## Connecting with the real SQL Server connector

In Tableau Desktop: **Connect → To a Server → Microsoft SQL Server**.
Enter the same server and database Power BI and the Python validation
script already connect to, authenticate, and Tableau opens a live
connection to the database — not a copy, not an export, the actual
`dw.*` schema.

## Bringing in the star schema as real joins

On the **Data Source** tab, drag `dw.FactProductSales` onto the
canvas, then join it to each dimension exactly the way the warehouse
itself defines the relationship:

| Join | On |
|---|---|
| `dw.FactProductSales` → `dw.DimProduct` | `ProductKey` |
| `dw.FactProductSales` → `dw.DimDate` | `OrderDateKey` = `DateKey` |
| `dw.FactProductSales` → `dw.DimTerritory` | `TerritoryKey` |
| `dw.FactProductSales` → `dw.DimCustomer` | `CustomerKey` |

Each should be an **inner join**, matching the same join logic the
warehouse's own load used back in Chapter 2 — this is the same star
schema, now expressed as Tableau joins instead of T-SQL `JOIN`
clauses. Tableau's **Live** connection mode (the default for this
connector, as opposed to an **Extract**) means every workbook
interaction queries the warehouse directly, keeping this deck current
with every refresh rather than a stale snapshot taken once.

## Why this lesson matters more than it looks like it does

It would be entirely possible to build a visually convincing Tableau
dashboard from Superstore, or from a one-off CSV export someone
emailed around, and nobody in the room would necessarily notice the
difference at a glance. The entire value of this capstone's
architecture — three front-ends that provably agree, because they
read the same source — depends on every single one of them actually
doing that. Skipping this lesson's real connection step, even
"just this once," silently breaks that guarantee for the rest of the
chapter.

## Key terms

| Term | Meaning |
|---|---|
| Live connection | Tableau queries the data source directly on every interaction, rather than working from a saved extract |
| Extract | A compressed, saved copy of query results, used when a live connection is too slow or unavailable |
| Microsoft SQL Server connector | Tableau's native connector for SQL Server, used here to reach the warehouse exactly as Power BI and Python do |

## Lab

1. In Tableau Desktop, connect to your warehouse with the Microsoft
   SQL Server connector.
2. Build all four joins on the Data Source tab, confirming each one
   matches the column pairing above.
3. On a new worksheet, drag `SUM(LineTotal)` onto Text and confirm
   the number matches `[Total Sales]` from your Power BI model for the
   same (unfiltered) period — the first real cross-tool check in this
   capstone.

## Check yourself

You're ready for Lesson 17 when you can explain why this deck is
built on the real warehouse instead of Sample - Superstore, name all
four joins from memory, and explain what a Live connection actually
means versus an Extract.
