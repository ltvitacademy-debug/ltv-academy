# Lesson 26 — Variables and Declarations Across Dialects

**Chapter 5 · Procedural Code Compared · Lesson 2 of 10**

## What you'll learn

- T-SQL's `@`-prefixed variables and `DECLARE @Name type = value;`
- PL/SQL's sigil-free `name type := value;` declarations
- MySQL's two genuinely different variable mechanisms
- PostgreSQL/PL-pgSQL's Oracle-like `:=` assignment

## T-SQL: the @ sigil, declared anywhere in a batch

```sql
-- T-SQL: every local variable is prefixed with @
DECLARE @ProductName NVARCHAR(50) = 'Road Bike';
DECLARE @Price DECIMAL(10,2) = 599.99;

SET @Price = @Price * 1.1;
SELECT @ProductName, @Price;
```

T-SQL variable names always carry the `@` sigil, which is also how you tell
a local variable apart from a column or table name at a glance. `DECLARE`
can appear anywhere in a batch — there's no separate "declarations section"
the way Oracle requires.

## PL/SQL: a DECLARE section, no sigil, `:=` assignment

```sql
-- PL/SQL: variables live in a DECLARE section before BEGIN, no sigil
DECLARE
  product_name VARCHAR2(50) := 'Road Bike';
  price        NUMBER(10,2) := 599.99;
BEGIN
  price := price * 1.1;
  DBMS_OUTPUT.PUT_LINE(product_name || ': ' || price);
END;
/
```

PL/SQL variables have no `@` or any other sigil — they're just bare
identifiers, which means you need distinct naming conventions to avoid
colliding with column names in the same scope. Assignment uses `:=`, not
`=` (PL/SQL reserves `=` for comparison, same as most procedural
languages). All variables must be declared in the `DECLARE` section before
`BEGIN` — you can't introduce a new variable mid-block the way T-SQL allows
mid-batch.

## MySQL: two different variable mechanisms

```sql
-- MySQL, inside a stored program's BEGIN/END: DECLARE ... DEFAULT ...
DELIMITER //
CREATE PROCEDURE ShowPrice()
BEGIN
  DECLARE product_name VARCHAR(50) DEFAULT 'Road Bike';
  DECLARE price DECIMAL(10,2) DEFAULT 599.99;

  SET price = price * 1.1;
  SELECT product_name, price;
END //
DELIMITER ;

-- MySQL, OUTSIDE a BEGIN/END block: session (user-defined) variables
SET @price := 599.99;
SELECT @price * 1.1;
```

This is the genuine surprise worth flagging: MySQL has **two** different
kinds of variables, not one. Inside a `BEGIN...END` block, you `DECLARE`
local variables with `DEFAULT` for the initial value, scoped to that block —
this is the MySQL equivalent of T-SQL's `DECLARE`. Outside any block, you
can still assign ad-hoc **session (user-defined) variables** with an `@`
prefix and `:=` or `=`, which persist for the whole client session, not
just one statement. These two mechanisms are not interchangeable: you
cannot `DECLARE` a plain local variable outside a routine body, and a
session `@variable` is not block-scoped the way a `DECLARE`d one is.

## PostgreSQL/PL-pgSQL: DECLARE block, `:=` like Oracle

```sql
-- PostgreSQL: DECLARE block inside a DO block or function, Oracle-style :=
DO $$
DECLARE
  product_name VARCHAR(50) := 'Road Bike';
  price        NUMERIC(10,2) := 599.99;
BEGIN
  price := price * 1.1;
  RAISE NOTICE '%: %', product_name, price;
END $$;
```

PL/pgSQL's declarations look almost identical to PL/SQL's: a `DECLARE`
section, no sigil, `:=` for both initialization and assignment. This is one
of the clearest places where PL/pgSQL's Oracle-inspired design shows
through directly.

## Side-by-side: declare and assign a price variable

| Dialect | Declare | Assign |
|---|---|---|
| T-SQL | `DECLARE @Price DECIMAL(10,2) = 599.99;` | `SET @Price = @Price * 1.1;` |
| PL/SQL | `price NUMBER(10,2) := 599.99;` (in `DECLARE`) | `price := price * 1.1;` |
| MySQL (in a routine) | `DECLARE price DECIMAL(10,2) DEFAULT 599.99;` | `SET price = price * 1.1;` |
| MySQL (session var) | `SET @price := 599.99;` | `SET @price := @price * 1.1;` |
| PostgreSQL | `price NUMERIC(10,2) := 599.99;` (in `DECLARE`) | `price := price * 1.1;` |

## Key terms

| Term | Meaning |
|---|---|
| `@` sigil | T-SQL's required prefix for local variables; also MySQL's session-variable prefix |
| `:=` | Assignment operator in PL/SQL, PL/pgSQL, and MySQL session variables (MySQL routine variables can also use `=`) |
| MySQL session variable | An `@`-prefixed variable that persists for the whole connection, not block-scoped |
| `DEFAULT` | MySQL's keyword for a declared variable's initial value, parallel to T-SQL's `= value` |

## Lab

Write a MySQL stored procedure that declares a local `DECLARE ... DEFAULT`
variable for a discount percentage, and separately write a one-line MySQL
session-variable assignment (`SET @discount := ...`) for the same value
outside any procedure. Note which one survives after the procedure returns
and which one doesn't.

## Check yourself

You're ready for the next lesson when you can explain, without looking, the
difference between MySQL's `DECLARE ... DEFAULT` variables and its
`@`-prefixed session variables, and which platforms use `:=` for
assignment.
