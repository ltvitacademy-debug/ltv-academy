# Lesson 77 — Table-Valued Parameters

**Chapter 7 · Programming with T-SQL · Lesson 16 of 16**

## What you'll learn

- Creating a user-defined table type with `CREATE TYPE ... AS TABLE`
- Declaring a stored procedure parameter of that type, always `READONLY`
- Passing a whole table of rows into a procedure in a single call
- Why this beats a giant comma-separated string or many round-trips

## The problem: passing a batch of rows in one call

Everything so far passes scalar parameters — one value at a time. But
what if you need to hand a stored procedure a whole **batch** of rows —
say, fifty new order line items — in a single call, instead of calling
the procedure fifty times or building a giant delimited string to parse
apart on the server? That's exactly what a **table-valued parameter
(TVP)** is for.

## Step 1: create a user-defined table type

A TVP needs a table **type** defined first, with `CREATE TYPE`:

```sql
USE AdventureWorks2012;
GO

CREATE TYPE dbo.OrderLineItemList AS TABLE
(
    ProductID   int,
    OrderQty    smallint,
    UnitPrice   money
);
```

This looks like a table definition because it is one — it's a reusable
shape you can now use as a parameter type.

## Step 2: a procedure parameter of that type — always READONLY

A procedure declares a parameter using the type you just created, and
it **must** be marked `READONLY` — TVPs cannot be modified inside the
procedure body, only read from:

```sql
CREATE PROCEDURE dbo.InsertOrderLineItems
    @SalesOrderID int,
    @Items dbo.OrderLineItemList READONLY
AS
BEGIN
    INSERT INTO Sales.SalesOrderDetail
        (SalesOrderID, ProductID, OrderQty, UnitPrice)
    SELECT @SalesOrderID, ProductID, OrderQty, UnitPrice
    FROM @Items;
END;
```

Inside the body, `@Items` behaves like any other table — you `SELECT`
from it, `JOIN` it, filter it — you just can't `INSERT`, `UPDATE`, or
`DELETE` against it.

## Step 3: calling it from T-SQL

To call the procedure, declare a variable of the table type, fill it
with rows, then pass the variable in:

```sql
DECLARE @NewItems dbo.OrderLineItemList;

INSERT INTO @NewItems (ProductID, OrderQty, UnitPrice)
VALUES (776, 1, 2024.99), (777, 2, 2024.99);

EXEC dbo.InsertOrderLineItems @SalesOrderID = 71774, @Items = @NewItems;
```

All the rows travel to the server in **one call** — one round-trip, one
execution, no loop and no string to build or parse.

## Why this matters

Before TVPs, a batch insert like this meant either calling the procedure
once per row (slow — one round-trip per row) or packing everything into
a single comma- or XML-delimited string parameter and parsing it apart
inside the procedure (fragile, and a real pain with embedded delimiters
or special characters). A TVP replaces both of those with a genuinely
relational parameter: a real, typed table, passed as a single argument,
read with ordinary `SELECT`/`JOIN` syntax once inside the procedure.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE TYPE ... AS TABLE` | Defines a reusable table shape usable as a parameter type |
| TVP | A stored procedure parameter declared with a table type; always `READONLY` |
| `READONLY` | Required modifier — a TVP's contents cannot be changed inside the procedure |

## Lab

Create `dbo.OrderLineItemList` and `dbo.InsertOrderLineItems` above.
Declare a table variable of that type, insert two or three rows into it,
and call the procedure once to insert them all into
`Sales.SalesOrderDetail` for an existing `SalesOrderID`.

## Check yourself

You're ready to move on when you can answer, without looking: why must
a TVP be declared `READONLY`, and what two clumsier alternatives does a
TVP replace for passing a batch of rows into a stored procedure?
