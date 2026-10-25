# Lesson 33 — Triggers Across Dialects

**Chapter 5 · Procedural Code Compared · Lesson 9 of 10**

## What you'll learn

- T-SQL's `inserted`/`deleted` virtual tables (covered elsewhere in this catalog)
- Oracle's `:NEW`/`:OLD`, colon-prefixed, row-level by default
- The real conceptual difference: set-based vs. row-level trigger execution
- MySQL's `NEW`/`OLD` (no colon), always row-level
- PostgreSQL's two-piece trigger function + `CREATE TRIGGER` model

## The shared concept, with one major conceptual fork

All four platforms let you fire code `BEFORE` or `AFTER` an `INSERT`,
`UPDATE`, or `DELETE`. But how each platform exposes "the row(s) that
changed" splits into two genuinely different execution models, and that
split matters more than any syntax detail in this lesson.

## T-SQL: inserted/deleted, set-based

```sql
CREATE TRIGGER trg_LogPriceChange
ON Production.Product
AFTER UPDATE
AS
BEGIN
    INSERT INTO PriceChangeLog (ProductID, OldPrice, NewPrice)
    SELECT i.ProductID, d.ListPrice, i.ListPrice
    FROM inserted i
    JOIN deleted d ON i.ProductID = d.ProductID;
END
```

T-SQL triggers are covered in depth in this catalog's T-SQL course. The
key fact for this comparison: `inserted` and `deleted` are **virtual
tables** that can hold **many rows at once** — a single `UPDATE` affecting
500 rows fires the trigger exactly once, with all 500 old/new row pairs
available in `deleted`/`inserted` together. This is a genuinely important,
set-based design.

## Oracle: :NEW/:OLD, row-level by default

```sql
CREATE OR REPLACE TRIGGER trg_log_price_change
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
  INSERT INTO price_change_log (product_id, old_price, new_price)
  VALUES (:OLD.product_id, :OLD.list_price, :NEW.list_price);
END;
/
```

Oracle's `:NEW` and `:OLD` are colon-prefixed **record references**, each
holding exactly **one row's** worth of columns. Oracle triggers are
row-level by default via `FOR EACH ROW` — the same 500-row `UPDATE` that
fires a T-SQL trigger once fires an Oracle `FOR EACH ROW` trigger **500
separate times**, once per row, each time with a fresh `:NEW`/`:OLD`
holding just that one row. This is the real conceptual difference worth
remembering: T-SQL thinks in sets, Oracle thinks in rows, by default.

## MySQL: NEW/OLD (no colon), always row-level

```sql
CREATE TRIGGER trg_log_price_change
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
  INSERT INTO price_change_log (product_id, old_price, new_price)
  VALUES (OLD.product_id, OLD.list_price, NEW.list_price);
END;
```

MySQL follows Oracle's row-level model — triggers are always `FOR EACH
ROW`, firing once per affected row — but drops the colon: `NEW` and `OLD`
(no `:` prefix), referenced as plain record fields.

## PostgreSQL: a two-piece model — trigger + trigger function

```sql
-- Step 1: the trigger FUNCTION, written in PL/pgSQL
CREATE OR REPLACE FUNCTION log_price_change()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO price_change_log (product_id, old_price, new_price)
  VALUES (OLD.product_id, OLD.list_price, NEW.list_price);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: the TRIGGER itself, which just calls the function
CREATE TRIGGER trg_log_price_change
AFTER UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION log_price_change();
```

PostgreSQL is structurally different from all three other platforms here:
a trigger is always **two pieces** — a separate trigger **function**
(written in PL/pgSQL, referencing `NEW`/`OLD` with no colon, like MySQL)
that contains the actual logic, and the `CREATE TRIGGER` statement itself,
which just names when to fire and which function to call. T-SQL, Oracle,
and MySQL all define the trigger's logic directly inside `CREATE TRIGGER`;
PostgreSQL never does.

## Side-by-side

| Platform | Row reference | Colon prefix? | Execution model | Logic location |
|---|---|---|---|---|
| T-SQL | `inserted`/`deleted` | No | Set-based — one firing per statement | Inside `CREATE TRIGGER` |
| Oracle | `:NEW`/`:OLD` | Yes | Row-level — one firing per row (`FOR EACH ROW`) | Inside `CREATE TRIGGER` |
| MySQL | `NEW`/`OLD` | No | Row-level — always `FOR EACH ROW` | Inside `CREATE TRIGGER` |
| PostgreSQL | `NEW`/`OLD` | No | Row-level — always `FOR EACH ROW` | Separate trigger function |

## Key terms

| Term | Meaning |
|---|---|
| `inserted` / `deleted` | T-SQL's set-based virtual tables, can hold many rows per firing |
| `:NEW` / `:OLD` | Oracle's colon-prefixed, single-row record references |
| `FOR EACH ROW` | Declares row-level firing — default behavior in Oracle, MySQL, and PostgreSQL |
| Trigger function | PostgreSQL's separate PL/pgSQL routine that a `CREATE TRIGGER` statement calls |

## Lab

Write the T-SQL trigger above, then imagine a single `UPDATE` that changes
10 rows. State how many times the T-SQL trigger fires, and how many times
the equivalent Oracle `FOR EACH ROW` trigger fires for the same 10-row
`UPDATE`.

## Check yourself

You're ready for the next lesson when you can explain, without looking,
why a 500-row T-SQL `UPDATE` fires its trigger once while the same update
fires an Oracle row-level trigger 500 times, and what makes PostgreSQL's
trigger model structurally different from the other three.
