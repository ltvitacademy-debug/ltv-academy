# Lesson 101 — SEQUENCE Objects

**Chapter 12 · Database Design Fundamentals · Lesson 5 of 21**

## What you'll learn

- `CREATE SEQUENCE` — a standalone number generator
- `NEXT VALUE FOR` — getting the next number from a sequence
- How a `SEQUENCE` differs from an `IDENTITY` column
- Why you might want the next key value *before* you insert anything

## Creating a SEQUENCE

```sql
CREATE SEQUENCE dbo.LessonSeq
    START WITH 1
    INCREMENT BY 1;
```

A `SEQUENCE` is its own database object — it isn't attached to any
particular table or column. `START WITH 1` sets the first value it will
hand out; `INCREMENT BY 1` sets how much it goes up by each time.

## Getting the next value

```sql
SELECT NEXT VALUE FOR dbo.LessonSeq AS NextID;
SELECT NEXT VALUE FOR dbo.LessonSeq AS NextID;
SELECT NEXT VALUE FOR dbo.LessonSeq AS NextID;
```

Each call to `NEXT VALUE FOR` hands out the next number in the sequence —
`1`, then `2`, then `3` — and that number is now "used," never handed out
again by this sequence. You can call it on its own, or inline inside an
`INSERT`:

```sql
CREATE TABLE dbo.LessonDemo (
    DemoID INT NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50) NOT NULL
);

INSERT INTO dbo.LessonDemo (DemoID, Label)
VALUES (NEXT VALUE FOR dbo.LessonSeq, 'First row');
```

## How this differs from IDENTITY

An `IDENTITY` column (Lesson 100) is tied permanently to **one specific
column on one specific table** — it only generates values when that exact
table is inserted into. A `SEQUENCE` is **standalone**: the same sequence
can be shared across **multiple tables**, if you want several tables to
draw from one common pool of numbers.

```sql
CREATE TABLE dbo.LessonOrders (
    OrderID INT NOT NULL PRIMARY KEY DEFAULT (NEXT VALUE FOR dbo.LessonSeq)
);

CREATE TABLE dbo.LessonInvoices (
    InvoiceID INT NOT NULL PRIMARY KEY DEFAULT (NEXT VALUE FOR dbo.LessonSeq)
);
```

Here, `LessonOrders` and `LessonInvoices` both pull their key values from
the **same** `dbo.LessonSeq` — something an `IDENTITY` column could never
do, since it's locked to a single table.

## Getting the value BEFORE you insert

This is the other real advantage over `IDENTITY`: you can call
`NEXT VALUE FOR` and get a number **before** you've inserted anything —
useful when you need that key value to build related rows first.

```sql
DECLARE @NewOrderID INT = NEXT VALUE FOR dbo.LessonSeq;

-- Now you already have the ID, and can use it for related inserts
-- before the order row itself is ever written
INSERT INTO dbo.LessonOrders (OrderID) VALUES (@NewOrderID);
```

With `IDENTITY`, you must insert first, then read the value back with
`SCOPE_IDENTITY()`. With a `SEQUENCE`, you can get the number first,
in whatever order your logic needs.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE SEQUENCE` | Defines a standalone, auto-incrementing number generator |
| `NEXT VALUE FOR` | Requests the next number from a sequence |
| Shared sequence | One sequence used by multiple tables, unlike IDENTITY |

## Lab

```sql
CREATE SEQUENCE dbo.Lesson101Seq START WITH 100 INCREMENT BY 10;

SELECT NEXT VALUE FOR dbo.Lesson101Seq AS FirstValue;   -- 100
SELECT NEXT VALUE FOR dbo.Lesson101Seq AS SecondValue;  -- 110
SELECT NEXT VALUE FOR dbo.Lesson101Seq AS ThirdValue;   -- 120

DROP SEQUENCE dbo.Lesson101Seq;
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
how is a `SEQUENCE` different from an `IDENTITY` column, and name one
real advantage a `SEQUENCE` has that `IDENTITY` doesn't.
