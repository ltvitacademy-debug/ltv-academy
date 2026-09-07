# Lesson 87 — Build the Star Schema

**Chapter 12 · Capstone Project · Lesson 4 of 10**

## What you'll learn

- The exact fact/dimension shape this capstone's model needs
- Why two fact tables sharing dimensions is still one star schema
- Fixing the surrogate-key relationship type Chapter 4 warned about
- Handling `FactInternetSales`'s three date roles correctly

## This project's star schema

Two fact tables, sharing dimensions, is still a star schema — it's
sometimes called a **galaxy schema** when drawn out, but the modeling
rules are identical. Here's the shape:

```
DimSalesTerritory --\
DimProduct ----------\
DimProductSubcategory--> FactInternetSales
DimProductCategory---/         |
DimCustomer --------/          |
DimDate ------------(3 roles)-/

DimSalesTerritory --\
DimProduct ----------\
DimProductSubcategory--> FactResellerSales
DimProductCategory---/
DimReseller ---------/
DimDate -------------/
```

Both fact tables sit at the center of their own set of one-to-many
relationships from the surrounding dimension tables — exactly the
pattern Chapter 4 taught, just with two facts instead of one.

## Building the relationships

In Model view:

1. Drag `DimSalesTerritory[SalesTerritoryKey]` to
   `FactInternetSales[SalesTerritoryKey]` (via `DimCustomer`, since
   territory relates to sales through the customer).
2. Connect `DimProduct`, `DimProductSubcategory`, and
   `DimProductCategory` in their natural chain, then to both fact
   tables via `ProductKey`.
3. Connect `DimReseller` to `FactResellerSales`.
4. Confirm every relationship shows as **one-to-many**, with the "1"
   on the dimension side — if Power BI guessed wrong, fix it manually
   (Chapter 4, Lesson 27's cardinality lesson).

## The `FactInternetSales` three-date problem

`FactInternetSales` has `OrderDateKey`, `DueDateKey`, and
`ShipDateKey` — three whole-number surrogate keys, all wanting to
relate to `DimDate`. Only **one** relationship can be active at a
time; Power BI auto-activates the `OrderDateKey` relationship and
leaves `DueDateKey`/`ShipDateKey` inactive. Lesson 88's DAX measures
will need `USERELATIONSHIP()` to activate the other two when needed
— exactly the textbook scenario Chapter 6 used this table to teach.

## Marking the date table

Since `DimDate` relates to the fact tables via a whole-number
surrogate key (`FullDateAlternateKey`'s key, not the date column
itself), you must explicitly **Mark as date table** (Lesson 47) —
auto date/time won't cover this relationship correctly.

## Key terms

| Term | Meaning |
|---|---|
| Galaxy schema | Multiple fact tables sharing dimension tables — still governed by star-schema rules |
| Active/inactive relationship | Only one relationship between two tables can be active; others need `USERELATIONSHIP()` |

## Lab

1. In Model view, build every relationship described above for both
   fact tables.
2. Confirm `FactInternetSales` shows exactly one active relationship
   to `DimDate` (via `OrderDateKey`) and two inactive ones.
3. Mark `DimDate` as your date table, using its actual date column.

## Check yourself

You're ready for Lesson 88 when your model diagram shows two fact
tables cleanly surrounded by shared dimensions, with no warning icons
and no accidental many-to-many relationships.
