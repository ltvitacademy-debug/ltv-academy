# Lesson 35 — Documenting the Model

**Chapter 7 · Building the Warehouse · Lesson 35 of 39**

## What you'll learn

- Why a warehouse needs documentation beyond the naming conventions
  from Lesson 34 — and what specifically it should capture
- How to use SSMS's built-in Database Diagram tool to produce a real,
  visual ER diagram of your star schema
- How to attach real, queryable metadata to tables and columns in SQL
  Server using `sp_addextendedproperty` — a data dictionary that lives
  in the database itself
- What a warehouse data dictionary needs to record that a naming
  convention alone can't communicate

## Why naming conventions aren't enough

Lesson 34's naming conventions tell you a column's *role* —
`ProductKey` is obviously a surrogate key. They don't tell you a
column's *meaning*: is `StandardCost` in US dollars or the source
system's local currency? Does `IsCurrent` on a Type 2 dimension get
set the moment a new row is inserted, or only after the ETL job's
final commit? A star schema this large needs documentation that
answers questions a name alone can't.

## Visualizing the model: SSMS Database Diagrams

SQL Server Management Studio has a built-in visual database designer
that draws real entity-relationship diagrams directly from your live
schema — no separate modeling tool required. In Object Explorer,
right-click **Database Diagrams** under a database and choose
**New Database Diagram**, then add your fact and dimension tables.
SSMS lays out each table with its columns, primary-key markers, and
the foreign-key relationship lines connecting them automatically:

![SSMS Database Diagram designer showing tables, primary keys, and relationship lines](/courses/data-warehousing/ch07/35-documenting-the-model/table-relationships.png)
*The SSMS Database Diagram tool draws tables, keys, and relationships straight from a live schema.*

For a star schema, this produces exactly the diagram you'd expect: one
fact table in the middle, dimension tables radiating out around it,
connected by one-to-many relationship lines from each dimension's
primary key to the fact table's matching foreign key. Saving the
diagram stores it in the database itself, so the next person to open
the database sees the same picture.

## Attaching real metadata: extended properties

A diagram shows structure, not meaning. For business definitions and
column-level notes, SQL Server lets you attach **extended
properties** — arbitrary name/value metadata pinned directly to a
table, column, or other object — using `sp_addextendedproperty`.
Many BI and documentation tools read the well-known `MS_Description`
property automatically and display it as a tooltip or data-dictionary
entry:

```sql
-- Document the table itself
EXEC sp_addextendedproperty
    @name = N'MS_Description',
    @value = N'Sales transaction facts at the order-line grain, one row per SalesOrderDetail.',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE',  @level1name = N'Fact_Sales';

-- Document one column's business meaning
EXEC sp_addextendedproperty
    @name = N'MS_Description',
    @value = N'Standard cost in US dollars at the time of sale, not the current cost.',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE',  @level1name = N'Dim_Product',
    @level2type = N'COLUMN', @level2name = N'StandardCost';
```

Because this metadata lives inside the database, it travels with the
schema — it survives a restore, and it's queryable with
`sys.fn_listextendedproperty` or visible directly in SSMS's column
properties pane, unlike a description that only lives in a separate
Word document or wiki page that quietly goes stale.

## What a warehouse data dictionary should capture

Putting Lessons 31-35 together, a complete data dictionary entry for
a fact or dimension table should record:

- The table's grain (Lesson 4) — one sentence, unambiguous
- Each column's business meaning, unit, and source system
- The SCD type (Chapter 4) for any dimension attribute that changes
  over time
- Load frequency and the ETL job or pipeline that populates it

## Key terms

| Term | Meaning |
|---|---|
| ER diagram | A visual entity-relationship diagram of tables and their relationships — SSMS's Database Diagram tool draws these live |
| Extended property | Arbitrary name/value metadata attached to a SQL Server object, e.g. via `sp_addextendedproperty` |
| `MS_Description` | The conventional extended-property name many tools read automatically to show column/table descriptions |
| Data dictionary | The documented record of every table's grain, column meanings, SCD types, and load frequency |

## Lab

1. In SSMS, connect to a database containing the `Dim_Product` and
   `Fact_Sales` tables from Lesson 31, create a new Database Diagram,
   and add both tables to it. Confirm the foreign-key relationship
   line appears automatically.
2. Run the `sp_addextendedproperty` examples above against your own
   copy of those tables, then confirm the description appears by
   right-clicking the table in Object Explorer → Properties →
   Extended Properties.
3. Query `sys.fn_listextendedproperty` (or `sys.extended_properties`)
   to retrieve every extended property you've added, in one result set.

## Check yourself

You're ready for the Capstone (Chapter 8) when you can produce, for
any table you've built in this course, both a visual ER diagram via
SSMS and at least one queryable `MS_Description` extended property —
without treating either as optional busywork.
