# Lesson 103 — Computed Columns

**Chapter 12 · Database Design Fundamentals · Lesson 7 of 21**

## What you'll learn

- `ColumnName AS (expression)` — a column calculated from other columns
- Why a computed column isn't stored on disk by default
- `PERSISTED` — making a computed column physically stored and indexable
- A real example: `TotalPrice AS (Quantity * UnitPrice)`

## Defining a computed column

```sql
CREATE TABLE dbo.LessonDemo (
    DemoID    INT           NOT NULL PRIMARY KEY,
    Quantity  INT           NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    TotalPrice AS (Quantity * UnitPrice)
);

INSERT INTO dbo.LessonDemo (DemoID, Quantity, UnitPrice) VALUES (1, 3, 9.99);

SELECT DemoID, Quantity, UnitPrice, TotalPrice FROM dbo.LessonDemo;
```

Notice `TotalPrice` is never written in the `INSERT` — you can't insert
into a computed column directly. Its value is worked out automatically
from `Quantity` and `UnitPrice` every time it's read, using the
expression you defined.

## Not stored by default

A plain computed column like the one above is **virtual**: SQL Server
doesn't physically store `TotalPrice` anywhere on disk. Instead, it
recalculates the expression on the fly whenever a query reads that
column. This keeps the value always perfectly in sync with `Quantity`
and `UnitPrice` — there's no way for it to go stale, because it's never
actually "saved" anywhere to go stale in the first place.

## PERSISTED — storing it physically

```sql
CREATE TABLE dbo.LessonDemo2 (
    DemoID    INT           NOT NULL PRIMARY KEY,
    Quantity  INT           NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    TotalPrice AS (Quantity * UnitPrice) PERSISTED
);
```

Adding `PERSISTED` tells SQL Server to physically compute and **store**
the value on disk, updating it automatically whenever `Quantity` or
`UnitPrice` changes. The upside: a `PERSISTED` computed column can be
**indexed**, just like a regular column — something a purely virtual
computed column generally cannot be. The tradeoff is the usual one for
denormalized, stored data: a little extra storage, and a small amount of
extra work on every `UPDATE` to the columns it depends on.

## Indexing a PERSISTED computed column

```sql
CREATE INDEX IX_LessonDemo2_TotalPrice
ON dbo.LessonDemo2 (TotalPrice);
```

This is only possible because `TotalPrice` is `PERSISTED` — a non-
persisted (virtual) computed column doesn't have an actual stored value
for an index to point at.

## Key terms

| Term | Meaning |
|---|---|
| Computed column | `ColumnName AS (expression)` — calculated from other columns in the row |
| Virtual (default) | Not stored on disk; recalculated on every read |
| `PERSISTED` | Physically stored and kept in sync automatically; can be indexed |

## Lab

```sql
CREATE TABLE dbo.Lesson103Demo (
    DemoID     INT           NOT NULL PRIMARY KEY,
    Quantity   INT           NOT NULL,
    UnitPrice  DECIMAL(10,2) NOT NULL,
    TotalPrice AS (Quantity * UnitPrice) PERSISTED
);

INSERT INTO dbo.Lesson103Demo (DemoID, Quantity, UnitPrice) VALUES (1, 4, 12.50);

SELECT * FROM dbo.Lesson103Demo;

CREATE INDEX IX_Lesson103Demo_TotalPrice ON dbo.Lesson103Demo (TotalPrice);

DROP TABLE dbo.Lesson103Demo;
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
is a plain computed column stored on disk by default, and what does
adding `PERSISTED` change?
