# Lesson 32 — Error Handling: TRY/CATCH vs. EXCEPTION Blocks

**Chapter 5 · Procedural Code Compared · Lesson 8 of 10**

## What you'll learn

- T-SQL's `TRY`/`CATCH` (covered in depth elsewhere in this catalog)
- PL/SQL's named exceptions, `WHEN OTHERS`, and `SQLERRM`/`SQLCODE`
- MySQL's `DECLARE ... HANDLER` model — a real, more awkward ergonomics gap
- PostgreSQL/PL-pgSQL's `EXCEPTION WHEN` block, close to Oracle's

## T-SQL: BEGIN TRY / BEGIN CATCH

```sql
BEGIN TRY
    SELECT 1 / 0;
END TRY
BEGIN CATCH
    PRINT ERROR_MESSAGE();
END CATCH
```

T-SQL's `BEGIN TRY...END TRY BEGIN CATCH...END CATCH` is covered in depth
in this catalog's T-SQL course. It's worth noting here only as the
baseline this chapter compares the other three platforms against — a
single generic catch block, with `ERROR_MESSAGE()`/`ERROR_NUMBER()` giving
you details inside `CATCH`.

## PL/SQL: named exceptions, WHEN OTHERS, SQLERRM/SQLCODE

```sql
DECLARE
  v_price NUMBER;
BEGIN
  SELECT list_price INTO v_price
  FROM products
  WHERE product_id = 99999;

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('No product with that ID.');
  WHEN TOO_MANY_ROWS THEN
    DBMS_OUTPUT.PUT_LINE('More than one row matched.');
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Unexpected error: ' || SQLERRM || ' (code ' || SQLCODE || ')');
END;
/
```

PL/SQL's `EXCEPTION` section lets you catch **specific named exceptions**
— `NO_DATA_FOUND` and `TOO_MANY_ROWS` are two of Oracle's built-in ones,
each tied to a specific real failure condition — before falling back to a
catch-all `WHEN OTHERS`. Inside any handler, `SQLERRM` gives you the error
message text and `SQLCODE` the numeric error code. This is more granular
than T-SQL's single generic `CATCH` block, which catches everything the
same way unless you add your own conditional logic inside it.

## MySQL: DECLARE ... HANDLER — a real ergonomics gap

```sql
DELIMITER //
CREATE PROCEDURE GetProductPrice(IN p_id INT)
BEGIN
  DECLARE v_price DECIMAL(10,2);
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    SELECT 'An error occurred' AS message;
  END;

  SELECT list_price INTO v_price
  FROM products
  WHERE product_id = p_id;

  SELECT v_price;
END //
DELIMITER ;
```

MySQL's model is worth naming honestly as more awkward than TRY/CATCH or
an `EXCEPTION` block: you `DECLARE` a **handler** ahead of time, tied to a
condition type (`SQLEXCEPTION`, `SQLWARNING`, `NOT FOUND`, or a specific
error code), and specify whether it's an `EXIT HANDLER` (stops the current
block on firing) or a `CONTINUE HANDLER` (resumes after the triggering
statement — this is also what we used for cursor "no more rows" detection
in Lesson 31). There's no single block you wrap risky code in the way
`TRY` or a PL/SQL block body works — the handler is declared separately
from the code it protects, which many developers find less intuitive.

## PostgreSQL: EXCEPTION WHEN, close to Oracle's model

```sql
DO $$
DECLARE
  v_price NUMERIC;
BEGIN
  SELECT list_price INTO v_price
  FROM products
  WHERE product_id = 99999;

EXCEPTION
  WHEN NO_DATA_FOUND THEN
    RAISE NOTICE 'No product with that ID.';
  WHEN OTHERS THEN
    RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;
```

PL/pgSQL's `EXCEPTION WHEN condition THEN...END;` is syntactically close
to Oracle's model — named conditions, a catch-all `WHEN OTHERS`, and
`SQLERRM` for the error message — another place where PL/pgSQL's
Oracle-inspired design shows clearly.

## Side-by-side

| Platform | Mechanism | Error detail |
|---|---|---|
| T-SQL | `BEGIN TRY...END TRY BEGIN CATCH...END CATCH` | `ERROR_MESSAGE()`, `ERROR_NUMBER()` |
| PL/SQL | `EXCEPTION WHEN name THEN...WHEN OTHERS THEN...` | `SQLERRM`, `SQLCODE` |
| MySQL | `DECLARE EXIT/CONTINUE HANDLER FOR condition` | Declared separately from the protected code |
| PostgreSQL | `EXCEPTION WHEN condition THEN...WHEN OTHERS THEN...` | `SQLERRM` |

## Key terms

| Term | Meaning |
|---|---|
| `WHEN OTHERS` | PL/SQL's and PL/pgSQL's catch-all exception handler |
| `SQLERRM` / `SQLCODE` | PL/SQL functions returning the current error's message and numeric code |
| `DECLARE ... HANDLER` | MySQL's handler-declared-separately-from-the-code model |
| `EXIT HANDLER` / `CONTINUE HANDLER` | MySQL's two handler behaviors — stop the block, or resume after the error |

## Lab

Write a MySQL `DECLARE EXIT HANDLER FOR SQLEXCEPTION` around a query that
might fail, then write the PL/SQL `EXCEPTION WHEN OTHERS` equivalent for
the same query. Note which one reads more naturally as "the code that
might fail, followed immediately by what happens if it does."

## Check yourself

You're ready for the next lesson when you can name, without looking, two
of PL/SQL's named exceptions, and explain the real ergonomics difference
between MySQL's handler model and a `TRY`/`CATCH` or `EXCEPTION` block.
