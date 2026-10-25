# Lesson 105 — Synonyms

**Chapter 12 · Database Design Fundamentals · Lesson 9 of 21**

## What you'll learn

- `CREATE SYNONYM` — an alias for another database object
- Why synonyms are useful across databases and servers
- Letting code reference a stable name while the underlying object moves
- This closes out the DDL cluster — Primary Keys picks up right after

## Creating a synonym

```sql
CREATE SYNONYM dbo.ShortName
FOR SomeServer.SomeDatabase.SomeSchema.LongObjectName;
```

A **synonym** is simply an alias — a short, stable name that points at
another object, which can live in the same database, a different
database on the same server, or even a different server entirely (via a
linked server). Once created, you query the synonym exactly as if it
were the real table:

```sql
SELECT * FROM dbo.ShortName;

-- Behaves exactly like:
SELECT * FROM SomeServer.SomeDatabase.SomeSchema.LongObjectName;
```

## A concrete example

```sql
-- Imagine a reporting database that needs AdventureWorks2012's
-- Production.Product table, but the real name is long to type
-- every time and lives in a different database:
CREATE SYNONYM dbo.Products
FOR AdventureWorks2012.Production.Product;

SELECT TOP 5 Name, ListPrice FROM dbo.Products;
```

Every query in the reporting database can now reference `dbo.Products` —
short, memorable, and local — instead of repeating the fully qualified
cross-database name everywhere.

## Why this matters: a stable name over a moving target

The real value of a synonym shows up when the underlying object
**changes**. Suppose the real table gets migrated to a new database, or
renamed, or moved to a different server. Without a synonym, every piece
of code that referenced the old name would need to be found and
rewritten. With a synonym, you make **one** change:

```sql
DROP SYNONYM dbo.Products;
CREATE SYNONYM dbo.Products
FOR AdventureWorks2012NewServer.Production.Product;
```

Every query that referenced `dbo.Products` keeps working, completely
unaware that the real object moved — because the stable name never
changed, only what it points to.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE SYNONYM` | Creates a short, stable alias for another database object |
| Linked server | Lets a synonym point at an object on an entirely different server |
| Stable name | The synonym itself, which doesn't change even if the real object does |

## Lab

```sql
CREATE SYNONYM dbo.Lesson105Products
FOR AdventureWorks2012.Production.Product;

SELECT TOP 5 Name, ListPrice FROM dbo.Lesson105Products;

-- Clean up
DROP SYNONYM dbo.Lesson105Products;
```

## Check yourself

You're ready for the next lesson when you can answer, without looking:
what problem does a synonym solve when the object it points to is
renamed or moved, and can a synonym point to an object on a different
server?
