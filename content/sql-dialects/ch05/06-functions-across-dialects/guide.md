# Lesson 30 — Functions Across Dialects: Scalar and Table-Returning

**Chapter 5 · Procedural Code Compared · Lesson 6 of 10**

## What you'll learn

- The difference between a scalar function and a table-returning function
- T-SQL's scalar UDFs and table-valued functions (covered in depth elsewhere in this catalog)
- PL/SQL functions, including returning a `REF CURSOR` to simulate a table result
- Why MySQL has no true table-valued function concept — a genuine platform limitation
- PostgreSQL's `RETURNS TABLE(...)` and `RETURNS SETOF`

## Two kinds of functions

A **scalar** function returns a single value (a number, a string, a date).
A **table-returning** function returns a result set — something you can
put in a `FROM` clause and query like a table. Not every platform here
supports both kinds equally, and that gap is the real teaching point of
this lesson.

## T-SQL: both kinds, covered in depth in this catalog's T-SQL course

```sql
-- T-SQL scalar function
CREATE FUNCTION dbo.DiscountedPrice(@Price DECIMAL(10,2), @Pct DECIMAL(5,2))
RETURNS DECIMAL(10,2)
AS
BEGIN
    RETURN @Price - (@Price * @Pct / 100);
END

-- T-SQL table-valued function
CREATE FUNCTION dbo.ProductsByLine(@Line NCHAR(2))
RETURNS TABLE
AS
RETURN (
    SELECT ProductID, Name, ListPrice
    FROM Production.Product
    WHERE ProductLine = @Line
);
```

T-SQL has genuine scalar user-defined functions (UDFs) and table-valued
functions (TVFs), both usable directly in a `SELECT`'s expression list or
`FROM` clause respectively. This course's T-SQL course covers both in
depth — here we're just establishing the baseline for comparison.

## PL/SQL: functions can return anything, including a REF CURSOR

```sql
-- PL/SQL scalar function
CREATE OR REPLACE FUNCTION DiscountedPrice(p_price NUMBER, p_pct NUMBER)
RETURN NUMBER
IS
BEGIN
  RETURN p_price - (p_price * p_pct / 100);
END;
/

-- PL/SQL simulating a table-returning function with a REF CURSOR
CREATE OR REPLACE FUNCTION ProductsByLine(p_line VARCHAR2)
RETURN SYS_REFCURSOR
IS
  v_cursor SYS_REFCURSOR;
BEGIN
  OPEN v_cursor FOR
    SELECT product_id, name, list_price
    FROM products
    WHERE product_line = p_line;
  RETURN v_cursor;
END;
/
```

PL/SQL functions can return any type, including a `REF CURSOR` (a pointer
to a result set the caller can fetch from) or a PL/SQL collection type.
This simulates table-returning behavior, but it's a different mechanism
from T-SQL's TVFs — a `REF CURSOR` isn't directly queryable in a `FROM`
clause the way a T-SQL TVF is; the caller has to fetch from it explicitly.

## MySQL: scalar-only, a genuine limitation

```sql
-- MySQL: scalar function only
DELIMITER //
CREATE FUNCTION DiscountedPrice(p_price DECIMAL(10,2), p_pct DECIMAL(5,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
  RETURN p_price - (p_price * p_pct / 100);
END //
DELIMITER ;
```

This is a real, genuine platform limitation worth naming directly: MySQL
has **no true table-valued function concept**. MySQL functions can only
return a single scalar value — there is no `RETURNS TABLE` or equivalent.
When a MySQL developer needs reusable, parameterized "table-like" logic,
they reach for a stored procedure with a result set, or a view, instead of
a function — a workaround, not an equivalent feature.

## PostgreSQL: genuine table-returning functions

```sql
-- PostgreSQL scalar function
CREATE OR REPLACE FUNCTION DiscountedPrice(p_price NUMERIC, p_pct NUMERIC)
RETURNS NUMERIC
AS $$
BEGIN
  RETURN p_price - (p_price * p_pct / 100);
END;
$$ LANGUAGE plpgsql;

-- PostgreSQL table-returning function, RETURNS TABLE
CREATE OR REPLACE FUNCTION ProductsByLine(p_line TEXT)
RETURNS TABLE(product_id INT, name TEXT, list_price NUMERIC)
AS $$
BEGIN
  RETURN QUERY
    SELECT p.product_id, p.name, p.list_price
    FROM products p
    WHERE p.product_line = p_line;
END;
$$ LANGUAGE plpgsql;

-- Calling it, directly in a FROM clause — like a T-SQL TVF
SELECT * FROM ProductsByLine('R');
```

PostgreSQL functions can declare `RETURNS TABLE(...)` or `RETURNS
SETOF sometype`, producing a genuine table-returning function you can
query directly in a `FROM` clause — a lot like T-SQL's TVFs, and a real
capability MySQL simply doesn't have.

## Side-by-side: table-returning capability

| Platform | Scalar functions | Table-returning functions |
|---|---|---|
| T-SQL | Yes | Yes — TVFs, queryable in `FROM` |
| PL/SQL | Yes | Simulated via `REF CURSOR` (not directly queryable in `FROM`) |
| MySQL | Yes | **No** — genuine limitation; use a procedure or view instead |
| PostgreSQL | Yes | Yes — `RETURNS TABLE`/`RETURNS SETOF`, queryable in `FROM` |

## Key terms

| Term | Meaning |
|---|---|
| Scalar function | Returns a single value |
| Table-valued function (TVF) | T-SQL/PostgreSQL function returning a queryable result set |
| `REF CURSOR` | PL/SQL type simulating a table result; must be fetched explicitly, not queried in `FROM` |
| `RETURNS TABLE` / `RETURNS SETOF` | PostgreSQL's syntax for a genuine table-returning function |

## Lab

Write the PostgreSQL `ProductsByLine` function above, then write the
`SELECT * FROM ProductsByLine('M')` call. Compare that to how you'd have to
call the PL/SQL version (`OPEN`/`FETCH` from the returned `REF CURSOR`)
to see why PostgreSQL's version is more directly "table-like."

## Check yourself

You're ready for the next lesson when you can name, without looking, which
platform has no table-valued function concept at all, and what two
mechanisms PL/SQL and PostgreSQL each use to simulate or genuinely provide
table-returning functions.
