# Lesson 34 — Dynamic SQL Across Platforms

**Chapter 5 · Procedural Code Compared · Lesson 10 of 10**

## What you'll learn

- T-SQL's `sp_executesql`/`EXEC()` (covered elsewhere in this catalog)
- PL/SQL's `EXECUTE IMMEDIATE`
- MySQL's distinct `PREPARE`/`EXECUTE`/`DEALLOCATE PREPARE` cycle
- PostgreSQL/PL-pgSQL's `EXECUTE`
- The universal rule: always use bind variables for dynamic SQL, on every platform

## What dynamic SQL is, and why every platform needs a security rule here

Dynamic SQL means building a SQL statement as a string at runtime and
executing it — useful when the table name, column list, or structure of a
query isn't known until the code runs. The real danger: if you build that
string by concatenating raw user input directly into it, you've opened the
door to **SQL injection**. Every platform's dynamic SQL feature supports
**bind variables/parameters** specifically to avoid that, and the rule is
the same everywhere: never string-concatenate untrusted input into the SQL
text itself.

## T-SQL: sp_executesql / EXEC()

```sql
-- Covered in depth elsewhere in this catalog's T-SQL course
DECLARE @sql NVARCHAR(MAX) = N'SELECT * FROM Production.Product WHERE ProductID = @id';
EXEC sp_executesql @sql, N'@id INT', @id = 707;
```

`sp_executesql` is T-SQL's safe dynamic SQL path, supporting parameters
the same way a stored procedure does. `EXEC()` also runs a dynamic string
but has no parameter support — it's the less safe option. This chapter's
T-SQL coverage goes further; the point here is just to anchor the
comparison.

## PL/SQL: EXECUTE IMMEDIATE

```sql
DECLARE
  v_price   NUMBER;
  v_id      NUMBER := 707;
  v_sql     VARCHAR2(200) := 'SELECT list_price FROM products WHERE product_id = :id';
BEGIN
  EXECUTE IMMEDIATE v_sql INTO v_price USING v_id;
  DBMS_OUTPUT.PUT_LINE(v_price);
END;
/
```

`EXECUTE IMMEDIATE 'sql string' [INTO variable] [USING bind_vars];` is
PL/SQL's single statement for building and running dynamic SQL. `:id`
inside the string is a bind variable placeholder, filled in by the
`USING` clause — the value never gets pasted into the string itself.

## MySQL: a distinct PREPARE/EXECUTE/DEALLOCATE cycle

```sql
SET @product_id = 707;
PREPARE stmt FROM 'SELECT list_price FROM products WHERE product_id = ?';
EXECUTE stmt USING @product_id;
DEALLOCATE PREPARE stmt;
```

MySQL's model is structurally different from the other three: it's a
three-statement cycle, not one. `PREPARE stmt FROM 'sql with ? placeholders'`
compiles the statement and names it; `EXECUTE stmt USING @var, ...` runs it,
binding each `?` placeholder in order to a session variable; `DEALLOCATE
PREPARE stmt` releases it. Each step is its own statement — there's no
single `EXECUTE IMMEDIATE`-style call that does all three at once.

## PostgreSQL/PL-pgSQL: EXECUTE

```sql
DO $$
DECLARE
  v_price NUMERIC;
  v_id    INT := 707;
BEGIN
  EXECUTE 'SELECT list_price FROM products WHERE product_id = $1'
    INTO v_price USING v_id;
  RAISE NOTICE '%', v_price;
END $$;
```

PL/pgSQL's `EXECUTE 'sql string' INTO variable USING bind_vars;` is close
in shape to Oracle's `EXECUTE IMMEDIATE` — one statement, with `$1`-style
positional placeholders filled by `USING`, rather than MySQL's separate
`PREPARE`/`EXECUTE`/`DEALLOCATE` cycle.

## Side-by-side

| Platform | Statement(s) | Placeholder style |
|---|---|---|
| T-SQL | `EXEC sp_executesql @sql, @paramdefs, @params` | Named (`@id`) |
| PL/SQL | `EXECUTE IMMEDIATE 'sql' INTO var USING val;` | Named (`:id`) |
| MySQL | `PREPARE` / `EXECUTE ... USING` / `DEALLOCATE PREPARE` (3 statements) | Positional (`?`) |
| PostgreSQL | `EXECUTE 'sql' INTO var USING val;` | Positional (`$1`) |

## The universal rule

**Always use bind variables/parameters for any dynamic SQL incorporating
user input — on every platform here.** Never string-concatenate untrusted
input directly into the SQL text itself; that's exactly how SQL injection
happens, regardless of which of these four dialects you're writing.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic SQL | A SQL statement built and executed as a string at runtime |
| `EXECUTE IMMEDIATE` | PL/SQL's and (as `EXECUTE`) PL/pgSQL's single dynamic-SQL statement |
| `PREPARE`/`EXECUTE`/`DEALLOCATE PREPARE` | MySQL's distinct three-statement dynamic SQL cycle |
| Bind variable | A placeholder filled with a value separately from the SQL text, preventing injection |

## Lab

Write the MySQL `PREPARE`/`EXECUTE`/`DEALLOCATE PREPARE` cycle for looking
up a product by ID using a `?` placeholder, then write the PL/SQL
`EXECUTE IMMEDIATE` version using a `:id` placeholder for the same lookup.
Identify the bind variable in each.

## Check yourself

You're ready to move to Chapter Six when you can state, without looking,
the universal security rule for dynamic SQL on every platform, and name
the one platform here whose dynamic SQL is a three-statement cycle instead
of one.
