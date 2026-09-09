# Lesson 21 — Table Relationships & Keys Review

**Chapter 3 · Joining Tables · Lesson 1 of 11**

## What you'll learn

- Why real databases split data across multiple tables
- Primary keys and foreign keys, previewed
- How AdventureWorks2012's tables actually relate to each other
- Why this preview matters before you write your first JOIN

## Why split data across tables?

So far, every query in this course has used exactly one table. Real
databases almost never store everything in one giant table — instead, data
is split into focused tables, each representing one kind of "thing":
`Person.Person` holds people, `Production.Product` holds products,
`Sales.SalesOrderHeader` holds orders. This is called **normalization**,
and we'll cover the formal rules behind it in Chapter 11. For now, just
know: **splitting data this way is deliberate, not messy.**

The tradeoff is that answering a real question — "what did this customer
buy?" — now requires **combining** rows from more than one table. That's
exactly what `JOIN` does, and it's this entire chapter's subject.

## A quick preview: primary and foreign keys

A **primary key** uniquely identifies each row in a table — no two rows
can share one, and it can't be `NULL`. `Production.Product` has a primary
key column called `ProductID`.

A **foreign key** is a column in one table that references a primary key
in another table, creating a link between them. `Sales.SalesOrderDetail`
has a `ProductID` column that isn't its own primary key — it's a foreign
key **pointing at** `Production.Product.ProductID`, saying "this order line
refers to that specific product."

We cover keys formally, with their own dedicated lessons, in Chapter 11 —
this is just enough to understand what a `JOIN` condition is actually
doing.

## Seeing the relationship without joining (yet)

You can already query each table separately and see the shared column:

```sql
USE AdventureWorks2012;
GO

SELECT ProductID, Name
FROM Production.Product;

SELECT SalesOrderDetailID, ProductID, OrderQty
FROM Sales.SalesOrderDetail;
```

Notice `ProductID` appears in **both** result sets. That shared column is
the link a `JOIN` uses to combine rows from the two tables into one result
— which is exactly what Lesson 22 covers.

## Key terms

| Term | Meaning |
|---|---|
| Primary key | Uniquely identifies each row in a table |
| Foreign key | A column referencing another table's primary key |
| Normalization | Splitting data into focused, related tables (Chapter 11) |

## Lab

Run both queries above against AdventureWorks2012 and manually find a
`ProductID` that appears in both result sets — that's the connection a
`JOIN` will make automatic in the next lesson.

## Check yourself

You're ready for Lesson 22 when you can answer, without looking: what's
the difference between a primary key and a foreign key, and why do real
databases split data across multiple tables at all?
