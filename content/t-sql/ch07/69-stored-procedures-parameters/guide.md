# Lesson 69 — Stored Procedures: Parameters

**Chapter 7 · Programming with T-SQL · Lesson 8 of 10**

## What you'll learn

- Adding parameters to a stored procedure
- Passing values in when you call `EXEC`
- Default parameter values
- Multiple parameters and named vs. positional calling

## Adding a parameter

```sql
USE AdventureWorks2012;
GO

CREATE PROCEDURE usp_GetProductsByColor
    @Color NVARCHAR(15)
AS
BEGIN
    SELECT Name, ListPrice, Color
    FROM Production.Product
    WHERE Color = @Color;
END
```

A **parameter** is declared right after the procedure name, before `AS` —
notice it looks exactly like a variable declaration (Lesson 62), because
it functionally **is** one: `@Color` behaves as a normal variable
throughout the procedure's body, just pre-populated from whatever the
caller passes in.

## Calling with a parameter

```sql
EXEC usp_GetProductsByColor @Color = 'Red';
```

This runs the procedure with `@Color` set to `'Red'` for that call. Run it
again with a different value, and the same saved logic runs against a
different filter — this is the entire point of parameterizing a
procedure instead of hard-coding a value inside it.

## Default values

```sql
CREATE PROCEDURE usp_GetProductsByColor
    @Color NVARCHAR(15) = 'Black'
AS
BEGIN
    SELECT Name, ListPrice, Color
    FROM Production.Product
    WHERE Color = @Color;
END

EXEC usp_GetProductsByColor;              -- uses 'Black' automatically
EXEC usp_GetProductsByColor @Color = 'Red'; -- overrides with 'Red'
```

A default value makes a parameter **optional** — if the caller doesn't
supply one, the default is used instead.

## Multiple parameters

```sql
CREATE PROCEDURE usp_GetProductsByColorAndPrice
    @Color NVARCHAR(15),
    @MinPrice MONEY = 0
AS
BEGIN
    SELECT Name, ListPrice, Color
    FROM Production.Product
    WHERE Color = @Color AND ListPrice >= @MinPrice;
END

EXEC usp_GetProductsByColorAndPrice @Color = 'Red', @MinPrice = 500;
```

Naming each parameter at the call site (`@Color = 'Red'`) is called
**named** notation — this course always uses it, because it's unambiguous
and order-independent, unlike passing bare values **positionally**
(`EXEC usp_GetProductsByColorAndPrice 'Red', 500`), which is easy to get
wrong once a procedure has several parameters.

## Key terms

| Term | Meaning |
|---|---|
| Parameter | A variable declared in a procedure's signature, populated by the caller |
| Default value | Makes a parameter optional when the procedure is called |
| Named notation | `@Param = value` at the call site — this course's convention |

## Lab

Create and call this procedure against AdventureWorks2012:

```sql
CREATE PROCEDURE usp_GetProductsAbovePrice
    @MinPrice MONEY = 100
AS
BEGIN
    SELECT Name, ListPrice
    FROM Production.Product
    WHERE ListPrice >= @MinPrice
    ORDER BY ListPrice DESC;
END

EXEC usp_GetProductsAbovePrice @MinPrice = 500;
EXEC usp_GetProductsAbovePrice; -- uses the default, 100
```

## Check yourself

You're ready for Lesson 70 when you can answer, without looking: what
happens if you call a procedure without supplying a value for a parameter
that has a default, and why does this course prefer named notation over
positional?
