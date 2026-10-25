# Lesson 29 — Writing a Stored Procedure: MySQL and PostgreSQL

**Chapter 5 · Procedural Code Compared · Lesson 5 of 10**

## What you'll learn

- MySQL's `CREATE PROCEDURE` and why it needs the `DELIMITER` trick
- PostgreSQL's historical functions-only era, and real `CREATE PROCEDURE` since version 11
- How to call a procedure on each platform
- Continuing the same "look up a product's price" example from Lesson 28

## MySQL: CREATE PROCEDURE and the DELIMITER trick

```sql
DELIMITER //
CREATE PROCEDURE GetProductPrice(
  IN  p_product_id INT,
  OUT p_price DECIMAL(10,2)
)
BEGIN
  SELECT list_price INTO p_price
  FROM products
  WHERE product_id = p_product_id;
END //
DELIMITER ;
```

```sql
-- Calling it
CALL GetProductPrice(707, @result_price);
SELECT @result_price;
```

MySQL's shape is `CREATE PROCEDURE Name(IN/OUT param type) BEGIN...END`,
with `IN`/`OUT` parameter directions similar to PL/SQL's. The `DELIMITER //`
trick is required because the procedure **body** itself contains ordinary
semicolons — without redefining the statement terminator temporarily, the
MySQL client would treat the first semicolon inside the body as the end of
the whole `CREATE PROCEDURE` statement. This course's MySQL deep-dive
chapter covers `DELIMITER` in depth; here we're just naming it as the
reason this pattern looks the way it does. Note the call uses `CALL`, not
`EXEC`, and the output lands in a MySQL session variable (`@result_price`)
rather than a locally declared one.

## PostgreSQL: functions-only until version 11, then real procedures

For most of PostgreSQL's history, there was no `CREATE PROCEDURE` at all —
only `CREATE FUNCTION`, which developers used for everything, including
operations that were conceptually side-effecting (like updating a table and
returning nothing meaningful). PostgreSQL 11 (released 2018) finally added
a genuine `CREATE PROCEDURE`, which is worth remembering as a **relatively
recent** addition — code and tutorials written before that still show
everything built as functions:

```sql
-- PostgreSQL 11+: a real stored procedure
CREATE OR REPLACE PROCEDURE GetProductPrice(
  p_product_id INT,
  INOUT p_price NUMERIC(10,2)
)
AS $$
BEGIN
  SELECT list_price INTO p_price
  FROM products
  WHERE product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;
```

```sql
-- Calling it with CALL
DO $$
DECLARE
  v_result_price NUMERIC(10,2);
BEGIN
  CALL GetProductPrice(707, v_result_price);
  RAISE NOTICE '%', v_result_price;
END $$;
```

PostgreSQL's procedure parameters use `INOUT` (one word, no space) rather
than PL/SQL's `IN OUT` (two words) — a small but real spelling difference.
Procedures are invoked with `CALL`, matching MySQL's keyword, while
PostgreSQL **functions** are invoked just by calling them in a `SELECT` or
expression context, with no `CALL` needed.

## Side-by-side

| Aspect | MySQL | PostgreSQL (11+) |
|---|---|---|
| Create | `CREATE PROCEDURE Name(IN/OUT p type) BEGIN...END` | `CREATE OR REPLACE PROCEDURE Name(p type, INOUT p2 type) AS $$...$$ LANGUAGE plpgsql;` |
| Body wrapper needed because of semicolons | `DELIMITER //` ... `DELIMITER ;` | `$$ ... $$` dollar-quoting (no DELIMITER trick needed) |
| Call | `CALL Name(707, @result);` | `CALL Name(707, v_result);` |
| Before this feature existed | Always had procedures | Everything was a `FUNCTION` before version 11 |

## Key terms

| Term | Meaning |
|---|---|
| `DELIMITER` | MySQL client trick to temporarily redefine the statement terminator while defining a routine body |
| `CALL` | The keyword both MySQL and PostgreSQL use to invoke a stored procedure |
| PostgreSQL 11 | The version that added real `CREATE PROCEDURE`; before it, everything was a function |
| `INOUT` | PostgreSQL's one-word spelling of PL/SQL's two-word `IN OUT` |

## Lab

Write the MySQL `CALL` statement for the procedure above with a product ID
of 712, then write the equivalent PostgreSQL `CALL` inside a `DO` block.
Note which platform's output parameter lands in a session variable
(`@result_price`) and which lands in a locally declared one.

## Check yourself

You're ready for the next lesson when you can explain, without looking,
why MySQL needs the `DELIMITER` trick to define a procedure body, and what
PostgreSQL used instead of real procedures before version 11.
