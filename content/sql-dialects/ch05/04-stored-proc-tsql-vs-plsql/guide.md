# Lesson 28 — Writing a Stored Procedure: T-SQL vs. PL/SQL Side by Side

**Chapter 5 · Procedural Code Compared · Lesson 4 of 10**

## What you'll learn

- A real, matched stored procedure written both in T-SQL and PL/SQL
- How each platform calls its procedure
- T-SQL's `OUTPUT` keyword vs. PL/SQL's `IN`/`OUT`/`IN OUT` parameter directions
- Why PL/SQL's parameter model is more explicit than T-SQL's

## The task: look up a product's price by ID

We'll write the same small, real procedure on both platforms: given a
product ID, return that product's list price.

## T-SQL version

```sql
CREATE PROCEDURE dbo.GetProductPrice
    @ProductID INT,
    @Price DECIMAL(10,2) OUTPUT
AS
BEGIN
    SELECT @Price = ListPrice
    FROM Production.Product
    WHERE ProductID = @ProductID;
END
```

```sql
-- Calling it
DECLARE @ResultPrice DECIMAL(10,2);
EXEC dbo.GetProductPrice @ProductID = 707, @Price = @ResultPrice OUTPUT;
SELECT @ResultPrice;
```

`CREATE PROCEDURE schema.Name @Param type AS BEGIN ... END` is the shape.
To get a value back out of a T-SQL procedure, you mark the parameter
`OUTPUT` in **both** the procedure definition and the call — forgetting the
`OUTPUT` keyword on the call site is a common, genuinely confusing T-SQL
mistake, because the statement still runs without erroring, it just
silently doesn't populate your variable.

## PL/SQL version

```sql
CREATE OR REPLACE PROCEDURE GetProductPrice (
  p_product_id IN  NUMBER,
  p_price      OUT NUMBER
) IS
BEGIN
  SELECT list_price INTO p_price
  FROM products
  WHERE product_id = p_product_id;
END;
/
```

```sql
-- Calling it from an anonymous block
DECLARE
  v_result_price NUMBER;
BEGIN
  GetProductPrice(707, v_result_price);
  DBMS_OUTPUT.PUT_LINE(v_result_price);
END;
/
```

`CREATE OR REPLACE PROCEDURE Name (Param IN/OUT/IN OUT type) IS BEGIN ...
END;` is the shape. PL/SQL parameters declare their **direction**
explicitly, right in the parameter list: `IN` (read-only, the default),
`OUT` (write-only — the caller's variable gets filled), or `IN OUT` (both).
There's no separate keyword needed at the call site the way T-SQL requires
`OUTPUT`; the direction was already settled when the procedure was created.

## The real difference: parameter direction model

T-SQL only has one directional concept built in: a parameter is normal
(`IN`-like, the default) or `OUTPUT` (closer to PL/SQL's `IN OUT`, since a
T-SQL `OUTPUT` parameter can also receive an input value — it's not
write-only the way PL/SQL's `OUT` is). PL/SQL gives you a genuine **three-way**
model — `IN`, `OUT`, `IN OUT` — with `OUT` being properly write-only. This
is one of the places where PL/SQL's parameter handling is more precise than
T-SQL's, even though both platforms accomplish the same practical goal.

## Side-by-side

| Aspect | T-SQL | PL/SQL |
|---|---|---|
| Create | `CREATE PROCEDURE schema.Name @P type AS BEGIN...END` | `CREATE OR REPLACE PROCEDURE Name (P dir type) IS BEGIN...END;` |
| Output parameter | `@Price DECIMAL(10,2) OUTPUT` | `p_price OUT NUMBER` |
| Call | `EXEC dbo.Proc @P = v, @Price = @v OUTPUT;` | `Proc(v, v_price);` or `BEGIN Proc(v, v_price); END;` |
| Parameter directions | Normal or `OUTPUT` (2 states) | `IN`, `OUT`, `IN OUT` (3 states) |

## Key terms

| Term | Meaning |
|---|---|
| `OUTPUT` | T-SQL keyword required on both the parameter definition AND the call to get a value back |
| `IN` / `OUT` / `IN OUT` | PL/SQL's explicit three-way parameter direction model |
| `EXEC` | T-SQL's keyword to call a stored procedure |
| Anonymous block call | PL/SQL procedures can be called directly, or wrapped in a `BEGIN...END;` block |

## Lab

Modify the T-SQL procedure above to also accept an `@Name` `OUTPUT`
parameter returning the product's name, and update the call accordingly.
Then modify the PL/SQL version the same way, adding a second `OUT`
parameter, and compare how each call site changes.

## Check yourself

You're ready for the next lesson when you can explain, without looking,
why forgetting the `OUTPUT` keyword at a T-SQL call site doesn't raise an
error, and what PL/SQL's three parameter directions are called.
