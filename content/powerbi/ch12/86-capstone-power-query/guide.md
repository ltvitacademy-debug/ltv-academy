# Lesson 86 — Clean & Transform With Power Query

**Chapter 12 · Capstone Project · Lesson 3 of 10**

## What you'll learn

- The specific cleanup this project's tables actually need
- Trimming the extra columns Lesson 85 deliberately over-imported
- Renaming for report-readability, before anyone builds a visual
- Confirming row counts still match what you recorded in Lesson 85

## What actually needs cleaning here

`AdventureWorksDW2014` is a well-built data warehouse, so this
lesson is lighter than Chapter 3's general Power Query lessons — but
"lighter" doesn't mean "nothing." Three real things need doing:

1. **Trim unused columns.** Now that Lesson 85's over-import is
   sitting in front of you, decide for real: does the report need
   `DimProduct[EnglishDescription]`, or was that a guess that didn't
   pan out? Remove what you're now confident you won't use.
2. **Rename for readability.** Warehouse column names like
   `SalesTerritoryAlternateKey` or `EnglishProductSubcategoryName`
   are precise but ugly. Rename to `Territory Key` and `Subcategory`
   — anything that will end up on a report page or in a slicer should
   read cleanly in a visual's tooltip.
3. **Check data types.** Confirm `OrderDate`, `DueDate`, and
   `ShipDate` in `FactInternetSales` and `FactResellerSales` actually
   loaded as Date, not text — a common warehouse quirk worth
   double-checking rather than assuming.

## What you're deliberately *not* doing here

Chapter 3 covered unpivoting, splitting columns, and merging queries
in depth — none of that applies to this well-structured source data.
Resist the temptation to "improve" things that already work; every
extra transformation step is something that has to be maintained (and
re-verified) for the rest of this project.

## Confirming nothing broke

Reopen each table in Data view and compare its row count against what
you recorded in Lesson 85's lab. **Renaming and removing columns
should never change row counts.** If a count changed, something in
your query steps filtered rows unintentionally — check your Applied
Steps pane for a stray filter step.

## Close & Apply

Once satisfied, **Home → Close & Apply**. This is the same schema
refresh mechanic Lesson 75 described — Power BI re-reads the current
structure and applies every transformation step in order.

## Key terms

| Term | Meaning |
|---|---|
| Applied Steps | Power Query's ordered list of transformations for a table |
| Close & Apply | Committing Power Query changes back into the semantic model |

## Lab

1. In Power Query Editor, remove any column from your nine tables
   that you're now confident this project's requirements don't need.
2. Rename at least five columns across the model to clean,
   report-ready names.
3. Confirm every `Date`/`DueDate`/`ShipDate` column shows as Date
   type, then Close & Apply and re-check row counts against Lesson
   85's recorded numbers.

## Check yourself

You're ready for Lesson 87 when your row counts match Lesson 85's
exactly, and every column you'll actually use has a name a
non-technical viewer could read without translation.
