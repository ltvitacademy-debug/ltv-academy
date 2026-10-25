# Lesson 48 — PostgreSQL's PL/pgSQL vs. T-SQL

**Chapter 8 · PostgreSQL Deep Dive for T-SQL Developers · Lesson 1 of 5**

## What you'll learn

- How PL/pgSQL function syntax compares structurally to T-SQL stored procedures
- What `$$` dollar-quoting is for, and why it's genuinely useful
- Why PL/pgSQL's block structure resembles Oracle's PL/SQL more than it resembles T-SQL
- How to write and call a basic PL/pgSQL function

## PostgreSQL uses functions where T-SQL uses procedures (mostly)

Where T-SQL's primary unit is `CREATE PROCEDURE` (with `CREATE FUNCTION` reserved mostly for
scalar/table-valued functions), PostgreSQL's PL/pgSQL leans on `CREATE FUNCTION` for almost
everything, including logic you'd write as a stored procedure in T-SQL. (PostgreSQL does have
`CREATE PROCEDURE` too, for cases needing transaction control inside the body — but `FUNCTION` is
what you'll see constantly.)

```sql
CREATE FUNCTION get_customer_total(cust_id INT)
RETURNS NUMERIC AS $$
DECLARE
  total NUMERIC;
BEGIN
  SELECT SUM(amount) INTO total
  FROM orders
  WHERE customer_id = cust_id;

  RETURN total;
END;
$$ LANGUAGE plpgsql;
```

## Dollar-quoting: genuinely distinctive syntax

The `$$ ... $$` surrounding the function body is PostgreSQL-specific **dollar-quoting** — a way
of delimiting a string (here, the function's code body) without needing to escape single quotes
used inside it. Without dollar-quoting, every literal `'...'` string inside the function body
would need doubled or escaped quotes, which gets unreadable fast in anything beyond a trivial
function. T-SQL has no equivalent construct — a T-SQL procedure body isn't a quoted string
literal at all, so this problem never arises there in the first place.

```sql
-- Without dollar-quoting, a literal string inside the body needs escaping
-- With it, write the body naturally, including single quotes, unescaped:
CREATE FUNCTION greet(name TEXT) RETURNS TEXT AS $$
BEGIN
  RETURN 'Hello, ' || name || '!';
END;
$$ LANGUAGE plpgsql;
```

You can also label the delimiter, e.g. `$func$ ... $func$`, which matters when a function's body
needs to contain a literal `$$` itself (rare, but it happens with nested dynamic SQL).

## Block structure: closer to Oracle's PL/SQL than to T-SQL

T-SQL's batch-based style is comparatively loose: statements run in sequence inside a batch, with
`BEGIN...END` mostly used for grouping within control-flow blocks rather than wrapping the entire
procedure. PL/pgSQL, by contrast, requires the same formal block structure you'll meet properly in
PL/SQL back in Chapter 6: `DECLARE` (optional, for local variables) → `BEGIN` → the executable
statements → optionally `EXCEPTION` → `END`. This is worth naming explicitly: PL/pgSQL and PL/SQL
genuinely resemble each other more than either resembles T-SQL, because PostgreSQL's procedural
language was deliberately modeled on Oracle's.

```sql
CREATE FUNCTION safe_divide(a NUMERIC, b NUMERIC)
RETURNS NUMERIC AS $$
DECLARE
  result NUMERIC;
BEGIN
  result := a / b;
  RETURN result;
EXCEPTION
  WHEN division_by_zero THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

## Calling it

```sql
SELECT get_customer_total(42);
SELECT safe_divide(10, 0);
```

Functions are called like any other expression-producing object — inside a `SELECT`, directly —
rather than with T-SQL's `EXEC`.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE FUNCTION ... LANGUAGE plpgsql` | PostgreSQL's primary way to define procedural logic |
| Dollar-quoting (`$$...$$`) | PostgreSQL syntax for delimiting a code/string body without escaping internal quotes |
| `DECLARE`/`BEGIN`/`EXCEPTION`/`END` | PL/pgSQL's formal block structure, modeled on Oracle's PL/SQL |

## Lab

Write a PL/pgSQL function that accepts two numbers and returns their average, using `DECLARE` for
a local variable and dollar-quoting for the body. Call it with `SELECT`.

## Check yourself

You're ready for Lesson 49 when you can explain, without looking: what problem does dollar-quoting
solve, and why does PL/pgSQL's block structure resemble PL/SQL more than it resembles T-SQL?
