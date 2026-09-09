# Lesson 101 — Table Relationships: Many-to-Many

**Chapter 11 · Database Design Fundamentals · Lesson 7 of 12**

## What you'll learn

- What **many-to-many** means, and why a foreign key alone can't express it
- The **junction table** (also called a bridge or linking table) that
  makes it possible
- AdventureWorks2012's real many-to-many: orders and their sales reasons
- How the junction table's own primary key is usually a composite of both
  foreign keys

## Why a plain foreign key can't do this

Lesson 100's one-to-many works because the "many" side has a single
foreign key column pointing at one "one" side row. But what if **both**
sides need to point at many of the other? One sales order can have
multiple reasons ("Price", "On Promotion", "Manufacturer"), and one reason
can apply to thousands of different orders. Neither table can hold a
simple foreign key to the other — you need a third table in between.

## The real AdventureWorks2012 example

`Sales.SalesOrderHeaderSalesReason` sits between `Sales.SalesOrderHeader`
and `Sales.SalesReason`. It has no purpose of its own beyond connecting the
two — every row is just one order paired with one reason that applied to it:

```sql
SELECT h.SalesOrderID, r.Name AS Reason
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderHeaderSalesReason AS hr ON hr.SalesOrderID = h.SalesOrderID
JOIN Sales.SalesReason AS r ON r.SalesReasonID = hr.SalesReasonID
WHERE h.SalesOrderID = 43697
ORDER BY r.Name;
```

## The junction table's structure

```sql
CREATE TABLE dbo.SalesOrderHeaderSalesReason (
    SalesOrderID INT NOT NULL REFERENCES dbo.SalesOrderHeader (SalesOrderID),
    SalesReasonID INT NOT NULL REFERENCES dbo.SalesReason (SalesReasonID),
    CONSTRAINT PK_SalesOrderHeaderSalesReason
        PRIMARY KEY (SalesOrderID, SalesReasonID)
);
```

Notice the pattern from Lesson 95: the junction table's primary key is a
**composite** of both foreign keys together. That composite key does two
jobs at once — it enforces referential integrity in both directions *and*
it prevents the exact same order/reason pair from being recorded twice.

## Querying "the other direction"

Because the junction table sits in the middle, you can travel either way
through it — orders that have a given reason, or reasons that apply to a
given order:

```sql
-- Every order that cited "On Promotion" as a reason
SELECT h.SalesOrderID, h.OrderDate
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderHeaderSalesReason AS hr ON hr.SalesOrderID = h.SalesOrderID
JOIN Sales.SalesReason AS r ON r.SalesReasonID = hr.SalesReasonID
WHERE r.Name = 'On Promotion';
```

## Key terms

| Term | Meaning |
|---|---|
| Many-to-many | Both sides can be referenced by many rows on the other side |
| Junction table | A table in between two others, holding a foreign key to each |
| Composite key on a junction table | The two foreign keys together, enforcing integrity and preventing duplicate pairs |

## Lab

Run against AdventureWorks2012:

```sql
-- Count how many distinct reasons were cited across all orders
SELECT r.Name AS Reason, COUNT(*) AS TimesCited
FROM Sales.SalesOrderHeaderSalesReason AS hr
JOIN Sales.SalesReason AS r ON r.SalesReasonID = hr.SalesReasonID
GROUP BY r.Name
ORDER BY TimesCited DESC;
```

## Check yourself

You're finished with the relationship trilogy when you can explain, without
looking: why can't a plain foreign key express a many-to-many relationship,
and what does the junction table's primary key usually consist of?
