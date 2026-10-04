# Lesson 12 — Documenting Tables and Columns

**Chapter 3 · Data Dictionaries · Lesson 12 of 25**

## What you'll learn

- How to pull a table's structural metadata directly from SQL Server using `INFORMATION_SCHEMA`
- The difference between what the database already knows and what a human still has to add
- How to attach human-written descriptions to database objects using extended properties
- A worked example combining both into one dictionary entry

## What the database already knows

SQL Server already tracks most of a dictionary entry's structural fields automatically, queryable through the standard `INFORMATION_SCHEMA` views — no manual documentation effort required for this part:

```sql
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Customer';
```

This single query gives you name, data type, length, nullability, and default value for every column in the table — four of the structural fields Lesson 11 listed, generated automatically, with zero chance of being out of sync with reality since it's reading the live schema itself.

## What a human still has to add

`INFORMATION_SCHEMA` can tell you `IsActiveFlag` is a non-nullable `BIT` with a default of `0`. It cannot tell you what the column *means* — that a customer is "active" means they purchased in the last 90 days, or that this flag is recalculated nightly rather than updated in real time. That's business context, and it has to be written by a person, the same way Lesson 2 established that business metadata (unlike technical and operational metadata) doesn't generate itself.

## Attaching descriptions with extended properties

SQL Server lets you attach a human-written description directly to a column using `sp_addextendedproperty`, so the documentation lives *with* the object instead of in a separate spreadsheet that inevitably goes stale:

```sql
EXEC sp_addextendedproperty
    @name = N'MS_Description',
    @value = N'True when the customer has purchased in the trailing 90 days. Recalculated nightly.',
    @level0type = N'Schema', @level0name = 'dbo',
    @level1type = N'Table',  @level1name = 'Customer',
    @level2type = N'Column', @level2name = 'IsActiveFlag';
```

Once attached, this description shows up directly in SQL Server Management Studio's Object Explorer alongside the column, and can be queried back out with `sys.extended_properties` — the description travels with the database itself, not a separate document that can drift out of sync.

## A worked combined entry

| Field | Source | Value |
|---|---|---|
| Column name | `INFORMATION_SCHEMA` (automatic) | `IsActiveFlag` |
| Data type | `INFORMATION_SCHEMA` (automatic) | `BIT`, not nullable, default `0` |
| Description | Extended property (human-written) | "True when the customer has purchased in the trailing 90 days. Recalculated nightly." |
| Owner | Human-assigned, stored however your dictionary tool tracks it | Data Engineering team |

This is Lesson 11's "what a dictionary entry needs" made concrete: half the fields come free from the database, and the other half still require a person to write them once and keep them current.

## Key terms

| Term | Meaning |
|---|---|
| INFORMATION_SCHEMA | SQL Server's built-in, queryable view of a database's own structural metadata |
| Extended property | A human-attachable metadata field (like a description) stored directly on a database object |
| sp_addextendedproperty | The system stored procedure used to attach an extended property |

## Lab

If you have access to any SQL Server database (even a sample one like AdventureWorks), run the `INFORMATION_SCHEMA.COLUMNS` query above against one table. For one column whose purpose isn't obvious from its name alone, write a one-sentence description the way `sp_addextendedproperty` would store it.

## Check yourself

Can you explain which parts of a dictionary entry SQL Server generates automatically, which parts a person has to write, and how extended properties keep the human-written part attached to the object instead of living in a separate document?
