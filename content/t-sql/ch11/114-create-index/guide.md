# Lesson 104 — CREATE INDEX (Clustered and Nonclustered)

**Chapter 12 · Database Design Fundamentals · Lesson 8 of 21**

## What you'll learn

- `CREATE CLUSTERED INDEX` — the actual syntax
- `CREATE NONCLUSTERED INDEX ... INCLUDE` — the actual syntax
- Why a table can have only **one** clustered index, but many nonclustered
- How this connects back to the conceptual lesson on clustered vs.
  nonclustered indexes

## A quick recap from the Performance Tuning chapter

Earlier in this course, you learned the **concepts**: a clustered index
defines a table's physical row order, while a nonclustered index is a
separate lookup structure with pointers back to the real rows. This
lesson is the syntax companion to that conceptual lesson — the actual
`CREATE INDEX` statements behind those ideas.

## Creating a clustered index

```sql
CREATE TABLE dbo.LessonDemo (
    DemoID INT          NOT NULL,
    Label  NVARCHAR(50) NOT NULL
);

CREATE CLUSTERED INDEX IX_LessonDemo_DemoID
ON dbo.LessonDemo (DemoID);
```

This physically sorts `dbo.LessonDemo`'s rows by `DemoID`. Remember: a
table can have **only one** clustered index, because the data can only
be physically stored in one order at a time. (If `LessonDemo` had been
created with a `PRIMARY KEY`, SQL Server would already have built a
clustered index for you automatically — this example builds one by hand
on a table that doesn't have one yet.)

## Creating a nonclustered index

```sql
CREATE NONCLUSTERED INDEX IX_LessonDemo_Label
ON dbo.LessonDemo (Label);
```

This builds a **separate** structure, sorted by `Label`, with pointers
back to the actual rows. Unlike the clustered index, a table can have
**many** nonclustered indexes — each one tuned for a different common
lookup pattern your queries actually use.

## INCLUDE — adding extra columns to a nonclustered index

```sql
CREATE NONCLUSTERED INDEX IX_LessonDemo_Label_Include
ON dbo.LessonDemo (Label)
INCLUDE (DemoID);
```

`INCLUDE` adds `DemoID` to the index's leaf pages **without** making it
part of the sort key. A query that filters on `Label` and only needs
`DemoID` back can now be satisfied entirely from the index itself —
without ever following the pointer back to the full table row. This is
called a **covering index**, and it's one of the most effective, common
real-world performance techniques.

## One clustered, many nonclustered

```sql
-- Only ONE of these is allowed per table:
CREATE CLUSTERED INDEX IX_LessonDemo_DemoID ON dbo.LessonDemo (DemoID);

-- Any number of these are allowed:
CREATE NONCLUSTERED INDEX IX_LessonDemo_Label ON dbo.LessonDemo (Label);
CREATE NONCLUSTERED INDEX IX_LessonDemo_Combo ON dbo.LessonDemo (Label, DemoID);
```

## Key terms

| Term | Meaning |
|---|---|
| `CREATE CLUSTERED INDEX` | Physically sorts the table's rows; only one per table |
| `CREATE NONCLUSTERED INDEX` | A separate lookup structure with pointers; many allowed |
| `INCLUDE` | Adds extra columns to a nonclustered index's leaf pages without sorting on them |
| Covering index | A nonclustered index (often with INCLUDE) that satisfies a query without touching the table |

## Lab

```sql
CREATE TABLE dbo.Lesson104Demo (
    DemoID INT          NOT NULL,
    Label  NVARCHAR(50) NOT NULL,
    Status NVARCHAR(20) NOT NULL
);

CREATE CLUSTERED INDEX IX_Lesson104Demo_DemoID ON dbo.Lesson104Demo (DemoID);
CREATE NONCLUSTERED INDEX IX_Lesson104Demo_Status
    ON dbo.Lesson104Demo (Status) INCLUDE (Label);

DROP TABLE dbo.Lesson104Demo;
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
how many clustered indexes can one table have, and what does `INCLUDE`
let you do that a plain nonclustered index can't?
