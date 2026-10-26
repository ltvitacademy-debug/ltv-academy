# Lesson 8 — Building the Star-Schema Data Model

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 8 of 16**

## What you'll learn

- Splitting `combined_df` into one fact table and dimension tables
- Why `CustomerSegment` and territory details belong on dimensions, not the fact table
- Building the relationships that make both stakeholder pages possible
- Why a single flat table would make this project's later DAX work much harder

## Why not just use `combined_df` as-is

`combined_df` is one flat table: every order line, with `CustomerSegment`, `TerritoryName`, and
`TerritoryGroup` repeated on every row. That works for a quick look, but it's the wrong shape for
a model two different pages need to slice two different ways. A star schema separates facts from
descriptive attributes, which is exactly what makes both pages possible from one model.

## The fact table

```text
Fact
  SalesOrderID
  CustomerID
  TerritoryName
  OrderDate
  LineTotal
```

`Fact` holds the numbers — `LineTotal` — at the grain the extract was built at: one row per order
line. Everything that describes *what kind of* customer or *which* territory moves out to its own
table.

## The dimension tables

```text
DimCustomer
  CustomerID
  CustomerSegment      (Individual / Store/Reseller)

DimTerritory
  TerritoryName
  TerritoryGroup
```

`DimCustomer` holds one row per customer with its segment label — this is what the Marketing
Manager's page filters and groups by. `DimTerritory` holds one row per territory with its group —
this is what the Sales Director's page filters and groups by.

## Building the relationships

In Power BI's Model view, drag from `Fact[CustomerID]` to `DimCustomer[CustomerID]`, and from
`Fact[TerritoryName]` to `DimTerritory[TerritoryName]`. Both relationships should be **one-to-many**,
filtering from the dimension side down to `Fact` — one customer or territory, many fact rows.

## Why this shape matters for what's coming

Every DAX measure in Lesson 9, and every slicer on both pages in Lessons 10–11, works by filtering
a dimension table and letting that filter flow down to `Fact` through these relationships. Keeping
`CustomerSegment` and `TerritoryGroup` on separate dimension tables — instead of leaving them
flattened onto `Fact` the way `combined_df` had them — is what lets a `CALCULATE ( … , ALL (
DimTerritory ) )` style measure work cleanly in the next lesson: `ALL` removes a filter from a
specific table, which only makes clean sense once that table actually exists as its own
dimension.

## Key terms

| Term | Meaning |
|---|---|
| Star schema | A model with a central fact table connected to surrounding dimension tables |
| Fact table | Holds the measurable numbers, at a defined grain |
| Dimension table | Holds descriptive attributes used to filter and group the fact table |

## Lab

In Power BI Desktop, build `DimCustomer` and `DimTerritory` from `combined_df` (using Power
Query's "Remove Duplicates" on the relevant columns, or a reference query), load `Fact` with just
the columns listed above, and build both relationships. Confirm the Model view shows a clean star
shape, not one flat table.

## Check yourself

You're ready for Lesson 9 when you can answer, without looking: why does `CustomerSegment` belong
on `DimCustomer` instead of staying on `Fact`, and what grain does the `Fact` table hold its rows
at?
