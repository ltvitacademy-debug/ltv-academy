# Lesson 31 — Cursors Compared Across Platforms

**Chapter 5 · Procedural Code Compared · Lesson 7 of 10**

## What you'll learn

- The same conceptual shape every platform's cursor shares: DECLARE, OPEN, FETCH loop, CLOSE
- T-SQL's manual `@@FETCH_STATUS` loop
- PL/SQL's explicit cursor AND its much nicer cursor-FOR-loop idiom
- MySQL's cursor + CONTINUE HANDLER pattern
- PostgreSQL's FOR-loop idiom, similar to Oracle's

## The shared concept

Every platform here needs a way to walk through a result set one row at a
time inside procedural code. All four share the same conceptual shape —
declare the cursor, open it, fetch rows in a loop, close it when done — but
the actual syntax for each step is genuinely different.

## T-SQL: manual @@FETCH_STATUS loop

```sql
DECLARE @ProductID INT, @Name NVARCHAR(50);
DECLARE cur CURSOR FOR
    SELECT ProductID, Name FROM Production.Product WHERE ProductLine = 'R';

OPEN cur;
FETCH NEXT FROM cur INTO @ProductID, @Name;
WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT @Name;
    FETCH NEXT FROM cur INTO @ProductID, @Name;
END
CLOSE cur;
DEALLOCATE cur;
```

T-SQL's cursor loop needs a `FETCH NEXT` **before** the loop starts (to
prime `@@FETCH_STATUS`) and **again** at the bottom of the loop body — miss
either one and the loop either never runs or never ends. `DEALLOCATE`, not
just `CLOSE`, is required to fully release the cursor.

## PL/SQL: explicit cursor, AND a much nicer cursor-FOR-loop

```sql
-- PL/SQL: explicit cursor, manual OPEN/FETCH/EXIT WHEN/CLOSE
DECLARE
  CURSOR cur IS
    SELECT product_id, name FROM products WHERE product_line = 'R';
  v_product_id products.product_id%TYPE;
  v_name       products.name%TYPE;
BEGIN
  OPEN cur;
  LOOP
    FETCH cur INTO v_product_id, v_name;
    EXIT WHEN cur%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(v_name);
  END LOOP;
  CLOSE cur;
END;
/
```

```sql
-- PL/SQL: the idiomatic cursor-FOR-loop — handles open/fetch/close for you
BEGIN
  FOR rec IN (SELECT product_id, name FROM products WHERE product_line = 'R') LOOP
    DBMS_OUTPUT.PUT_LINE(rec.name);
  END LOOP;
END;
/
```

PL/SQL supports both styles. The explicit cursor (`CURSOR...IS`, `OPEN`,
`FETCH`, `EXIT WHEN cur%NOTFOUND`, `CLOSE`) gives you full manual control.
But the cursor-FOR-loop is genuinely nicer ergonomics worth highlighting:
it opens the cursor, fetches every row, exposes each one as `rec`, and
closes the cursor automatically when the loop ends — no manual
`OPEN`/`FETCH`/`CLOSE` bookkeeping at all. Most real PL/SQL code uses the
FOR-loop form unless it specifically needs manual control.

## MySQL: cursor + a declared CONTINUE HANDLER

```sql
DELIMITER //
CREATE PROCEDURE ListProductsByLine()
BEGIN
  DECLARE v_name VARCHAR(50);
  DECLARE done INT DEFAULT FALSE;
  DECLARE cur CURSOR FOR
    SELECT name FROM products WHERE product_line = 'R';
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur;
  read_loop: LOOP
    FETCH cur INTO v_name;
    IF done THEN
      LEAVE read_loop;
    END IF;
    SELECT v_name;
  END LOOP;
  CLOSE cur;
END //
DELIMITER ;
```

MySQL cursors exist only inside stored programs. There's no `%NOTFOUND` or
`@@FETCH_STATUS` check — instead, you declare a `CONTINUE HANDLER FOR NOT
FOUND` that sets a flag variable when `FETCH` runs out of rows, and you
check that flag yourself inside the loop with `LEAVE` to exit it.

## PostgreSQL: the same FOR-loop idiom as Oracle

```sql
DO $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN SELECT name FROM products WHERE product_line = 'R' LOOP
    RAISE NOTICE '%', rec.name;
  END LOOP;
END $$;
```

PL/pgSQL also supports a `FOR rec IN SELECT...LOOP...END LOOP;` idiom
almost identical to Oracle's cursor-FOR-loop, and it's the idiomatic way to
iterate on PostgreSQL too, rather than manually managing a cursor with
`OPEN`/`FETCH`/`CLOSE` (which PL/pgSQL also supports, for cases needing
manual control).

## Side-by-side: the loop-exit mechanism

| Platform | How you detect "no more rows" |
|---|---|
| T-SQL | `@@FETCH_STATUS = 0` checked in the `WHILE` condition |
| PL/SQL (explicit) | `EXIT WHEN cur%NOTFOUND;` |
| PL/SQL (FOR-loop) | Automatic — no manual check needed |
| MySQL | A declared `CONTINUE HANDLER FOR NOT FOUND` sets a flag you check |
| PostgreSQL (FOR-loop) | Automatic — no manual check needed |

## Key terms

| Term | Meaning |
|---|---|
| `@@FETCH_STATUS` | T-SQL's global value indicating whether the last `FETCH` succeeded |
| `%NOTFOUND` | PL/SQL cursor attribute, true when the last `FETCH` found no row |
| Cursor-FOR-loop | PL/SQL/PL-pgSQL idiom that handles open/fetch/close automatically |
| `CONTINUE HANDLER` | MySQL's declared handler that reacts to the "no more rows" condition |

## Lab

Write the PL/SQL cursor-FOR-loop version of "list every product name where
`product_line = 'R'`", then write the equivalent T-SQL version using
`DECLARE CURSOR`/`OPEN`/`FETCH NEXT`/`@@FETCH_STATUS`. Count how many lines
of bookkeeping the T-SQL version needs that the PL/SQL FOR-loop doesn't.

## Check yourself

You're ready for the next lesson when you can explain, without looking,
why PL/SQL's cursor-FOR-loop needs no manual `OPEN`/`FETCH`/`CLOSE`, and
how MySQL detects that a cursor has run out of rows.
