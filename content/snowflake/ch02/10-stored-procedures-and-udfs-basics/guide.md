# Lesson 10 — Stored Procedures & User-Defined Functions, Basics

**Chapter 2 · Snowflake SQL — What's Different From T-SQL · Lesson 10 of 60**

## What you'll learn

- Snowflake Scripting — the SQL-based procedural language behind stored procedures
- The syntax differences from T-SQL: `CALL` instead of `EXEC`, `:=` instead of `SET`, no `@` variable prefix
- That the function-vs-procedure distinction you already know from T-SQL still applies
- That JavaScript and Python UDFs exist, without going deep on either yet

## The distinction you already know still holds

T-SQL separates functions (return a value, usable inline in a `SELECT`,
can't run DML) from stored procedures (can run DML/DDL, invoked with
`EXEC`, not usable inline). Snowflake keeps exactly this split — **UDFs**
for computed values, **stored procedures** for procedural logic and side
effects. Nothing to relearn about *why* each exists, just how each is
written.

## Stored procedures — Snowflake Scripting

Snowflake's procedural SQL is called **Snowflake Scripting**. The shape
is familiar — `DECLARE`, `BEGIN`/`END`, `IF`, loops — but the details
differ from T-SQL in a few specific spots:

```sql
CREATE OR REPLACE PROCEDURE apply_discount(customer_id NUMBER, pct FLOAT)
RETURNS VARCHAR
LANGUAGE SQL
AS
$$
DECLARE
  order_count NUMBER;
BEGIN
  SELECT COUNT(*) INTO order_count FROM orders WHERE customer_id = :customer_id;

  IF (order_count > 10) THEN
    UPDATE customers SET discount_pct = :pct WHERE customer_id = :customer_id;
    RETURN 'Discount applied';
  ELSE
    RETURN 'Not eligible';
  END IF;
END;
$$;

CALL apply_discount(1001, 0.10);
```

The syntax differences worth flagging explicitly:

| T-SQL | Snowflake Scripting | Notes |
|---|---|---|
| `EXEC proc_name` | `CALL proc_name(...)` | Snowflake never uses `EXEC` |
| `DECLARE @x INT` | `DECLARE x NUMBER;` inside the body | No `@` prefix on variable names |
| `SET @x = 5` | `x := 5;` | Assignment uses `:=`, not `SET`/`=` |
| Body is just T-SQL | Body wrapped in `$$ ... $$` | Dollar-quoting delimits the procedure body |
| Implicit language | `LANGUAGE SQL` required | Snowflake procedures always declare a language |

Referencing a parameter inside the body uses a leading colon
(`:customer_id`), which reads unusually at first if you're used to bare
T-SQL variable names inside a proc body — but the logic itself (branching,
looping, variables) works the same way conceptually.

## User-defined functions (UDFs)

A SQL UDF is a single expression, not a procedural block — no `BEGIN`,
no side effects, just a computed return value usable inline in a query:

```sql
CREATE OR REPLACE FUNCTION full_name(first_name VARCHAR, last_name VARCHAR)
RETURNS VARCHAR
LANGUAGE SQL
AS
$$
  first_name || ' ' || last_name
$$;

SELECT full_name(first_name, last_name) FROM customers;
```

This maps directly onto a T-SQL scalar function used the same way inline
in a `SELECT` — same purpose, same restriction against running DML.

## JavaScript and Python UDFs exist — a preview, not a deep dive

Beyond SQL UDFs, Snowflake also supports **JavaScript** and **Python**
UDFs for logic that's awkward to express in pure SQL:

```sql
-- JavaScript UDF, briefly
CREATE OR REPLACE FUNCTION js_upper(s VARCHAR)
RETURNS VARCHAR
LANGUAGE JAVASCRIPT
AS
$$
  return S.toUpperCase();
$$;

-- Python UDF, briefly
CREATE OR REPLACE FUNCTION py_upper(s VARCHAR)
RETURNS VARCHAR
LANGUAGE PYTHON
RUNTIME_VERSION = '3.11'
HANDLER = 'upper_it'
AS
$$
def upper_it(s):
    return s.upper()
$$;
```

Both are called exactly like a SQL UDF once created — `SELECT
py_upper(name) FROM customers;`. This course doesn't go deep on either
language here; the point for now is knowing they exist as an escape
hatch when SQL alone gets awkward, not mastering them.

## Key terms

| Term | Meaning |
|---|---|
| Snowflake Scripting | Snowflake's SQL-based procedural language for stored procedures |
| `CALL` | Invokes a stored procedure — Snowflake's equivalent of T-SQL's `EXEC` |
| `:=` | Assignment operator inside Snowflake Scripting, not `SET`/`=` |
| `$$ ... $$` | Dollar-quoting used to delimit a procedure/function body |
| UDF | A function returning a computed value, usable inline in `SELECT`, no DML |

## Lab

Write a stored procedure that takes an order ID, checks whether its total
exceeds a threshold, and returns a text message accordingly — mirroring a
T-SQL proc you may have written before, but using `CALL`, `:=`, and
`$$ ... $$` correctly.

## Check yourself

You're ready for Lesson 11 when you can write a simple Snowflake Scripting
procedure with a `DECLARE`, an `IF`, and a `RETURN`, and explain why a UDF
couldn't do the same job if it needed to run an `UPDATE`.
