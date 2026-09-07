# Lesson 85 — Import the Raw Data

**Chapter 12 · Capstone Project · Lesson 2 of 10**

## What you'll learn

- Exactly which tables to pull in for this capstone, and why only those
- Import mode vs. DirectQuery, decided for a real reason this time
- Why you import more columns than you think you'll need
- A quick sanity check before moving on to Power Query

## Connecting to the source

Open a new Power BI Desktop file and connect to your SQL Server
instance using the connector from Chapter 2, Lesson 9 — **Get Data →
SQL Server**, pointing at the `AdventureWorksDW2014` database.

## Selecting exactly the tables Lesson 84 scoped

From the Navigator, select only the tables your written scope
actually needs:

- `FactInternetSales`
- `FactResellerSales`
- `DimSalesTerritory`
- `DimProduct`
- `DimProductSubcategory`
- `DimProductCategory`
- `DimDate`
- `DimCustomer` (needed to relate `FactInternetSales` to territory —
  check this once you're in Power Query)
- `DimReseller` (same reason, for `FactResellerSales`)

Resist the urge to select every table in the database "just in case."
A smaller, deliberate model is easier to reason about at every later
step — this is the same discipline Chapter 4 taught about star
schemas generally.

## Import mode, decided deliberately

Recall the three storage modes from Lesson 71. For this project,
**Import mode** is the right call, for a specific reason: this
capstone doesn't need real-time data (Lesson 84's scope never asked
for it), and Import gives you the fastest report-building experience
while you're actively designing visuals in Lessons 87-90. Lesson 92
revisits this choice when scheduled refresh comes back into the
picture.

## Import more columns than the requirements literally mention

It's tempting to deselect every column you don't immediately see a
use for. Don't — a few columns you're not sure about yet (like
`DimProduct[Color]` or `DimSalesTerritory[Group]`) often turn out
useful once you're actually building visuals in Lesson 89. Removing
unused columns later, once you know for certain, is cheap (Lesson 86);
guessing wrong now and having to reconnect is not.

## A sanity check before moving on

Once loaded, open each table in Data view and confirm:

- Row counts look plausible (`DimDate` should span several years;
  `FactInternetSales` should have tens of thousands of rows).
- No table loaded completely empty — an empty table usually means a
  filter or a permission issue at the source, not a Power BI bug.

## Key terms

| Term | Meaning |
|---|---|
| Navigator | The dialog for selecting which tables to import from a data source |
| Import mode | The storage mode chosen here — copies data in, prioritizing build speed |

## Lab

1. Connect Power BI Desktop to your SQL Server instance and select
   the nine tables listed above from `AdventureWorksDW2014`.
2. Load them in Import mode.
3. Open each table in Data view and record its row count — you'll
   use these numbers again in Lesson 86 to confirm nothing was lost
   during cleanup.

## Check yourself

You're ready for Lesson 86 when every table from your list is loaded,
with plausible row counts, and you can explain in one sentence why
Import mode was the right choice for this specific project.
