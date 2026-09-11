# Lesson 34 — Warehouse Naming Conventions

**Chapter 7 · Building the Warehouse · Lesson 34 of 39**

## What you'll learn

- Why a warehouse needs stricter, more visible naming conventions
  than a typical OLTP schema
- The standard `Fact_` / `Dim_` table prefix convention and what it
  buys you
- Consistent column-naming patterns for surrogate keys, natural keys,
  and audit columns
- Why consistency matters more than which specific convention you pick

## Why this matters more in a warehouse

In an OLTP system, table names usually just describe entities:
`Customer`, `Order`, `OrderDetail`. In a warehouse, a schema can hold
dozens of fact and dimension tables side by side, often built by
different people over years, queried directly by analysts and BI tools
who didn't design the schema. A consistent naming convention is what
lets someone open the warehouse for the first time and immediately
know, from the name alone, what kind of table they're looking at and
how to join it — without opening a data dictionary first.

## Table prefixes: `Fact_` and `Dim_`

The single most valuable convention in a warehouse is prefixing every
table by its role in the model:

| Prefix | Meaning | Example |
|---|---|---|
| `Fact_` | A fact table — measures at a defined grain | `Fact_Sales`, `Fact_Inventory` |
| `Dim_` | A dimension table — descriptive attributes | `Dim_Product`, `Dim_Customer`, `Dim_Date` |
| `Bridge_` | A many-to-many bridge table (Chapter 6) | `Bridge_SalesRepTerritory` |
| `Stg_` | A staging table (Chapter 5) — not for direct reporting | `Stg_Sales_Raw` |

An analyst who has never seen `Fact_Sales` before still knows, just
from the prefix, that it's a fact table they'll aggregate and filter,
not a dimension they'll browse for descriptive attributes.

## Column-naming patterns

Consistency inside tables matters as much as the table prefix itself:

- **Surrogate keys end in `Key`.** `ProductKey`, `CustomerKey`,
  `DateKey` — always the same suffix, always an integer, always what
  fact tables join on.
- **Natural/business keys are named for their source, not `Key`.**
  `ProductAlternateKey` or `SourceSystemID` — visually distinct from a
  surrogate key so nobody joins on the wrong one by mistake.
- **Audit/lineage columns (Lesson 25) use a fixed, repeated set of
  names** across every table that has them: `LoadDateTime`,
  `SourceSystem`, `RowStartDate`, `RowEndDate`, `IsCurrent`. The same
  five names, spelled identically, on every table — not `LoadedOn` on
  one table and `Load_Date` on another.
- **Pick one casing style and never deviate.** `PascalCase` (as used
  throughout this course) or `snake_case` are both fine choices — the
  actual style matters far less than applying it with zero exceptions.

```sql
-- Consistent naming makes the DDL itself self-documenting:
CREATE TABLE dbo.Dim_Customer (
    CustomerKey          INT IDENTITY(1,1) NOT NULL,  -- surrogate: ends in "Key"
    CustomerAlternateKey VARCHAR(25)        NOT NULL,  -- natural key: named for source
    CustomerName          NVARCHAR(100)     NOT NULL,
    LoadDateTime          DATETIME2(0)      NOT NULL,  -- audit column, standard name
    RowStartDate           DATETIME2(0)      NOT NULL, -- SCD Type 2, standard name
    RowEndDate              DATETIME2(0)      NULL,
    IsCurrent               BIT               NOT NULL DEFAULT 1
);
```

## The rule that matters more than any specific rule

No single convention here is objectively "correct" — some real
warehouses use `Dim` and `Fact` as suffixes instead of prefixes, or
skip the `_` separator entirely. What actually matters is picking one
set of rules for a given warehouse and applying it with zero
exceptions. An inconsistent warehouse — where half the fact tables
have the prefix and half don't — is worse than one that consistently
uses a convention you personally wouldn't have chosen.

## Key terms

| Term | Meaning |
|---|---|
| `Fact_` / `Dim_` prefix | Table-name prefix signaling a table's role in the dimensional model at a glance |
| Surrogate key suffix | The `Key` suffix (e.g. `ProductKey`) marking a column as a warehouse-generated join key |
| Audit/lineage columns | A fixed, identically-named set of columns (e.g. `LoadDateTime`) repeated across every loaded table |

## Lab

1. Take the `Dim_Product` and `Fact_Sales` tables from Lesson 31 and
   rewrite any column names that don't yet follow this lesson's
   surrogate-key and natural-key suffix conventions.
2. Write out a one-page naming standard for a warehouse project of
   your own choosing — table prefixes, key suffixes, and the exact
   audit column names you'll reuse everywhere.

## Check yourself

You're ready for Lesson 35 when you can look at an unfamiliar table
name like `Dim_Territory` or a column like `SalesRepKey` and correctly
state its role in the model without seeing any other context.
