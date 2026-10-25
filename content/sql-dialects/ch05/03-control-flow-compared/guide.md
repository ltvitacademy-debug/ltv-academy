# Lesson 27 — Control Flow: IF/CASE/Loops Compared

**Chapter 5 · Procedural Code Compared · Lesson 3 of 10**

## What you'll learn

- `IF`/`ELSE` shape differences across all four platforms
- Each platform's loop keywords — `WHILE`, `LOOP`, `REPEAT`
- Why T-SQL has no native `FOR` loop, and the `WHILE` idiom that replaces it
- Why PL/SQL and PL/pgSQL both have a real `FOR` loop

## IF/ELSE across dialects

```sql
-- T-SQL: BEGIN/END blocks around each branch, no closing END IF
IF @Price > 500
BEGIN
    PRINT 'Premium';
END
ELSE
BEGIN
    PRINT 'Standard';
END
```

```sql
-- PL/SQL: ELSIF (one word), closes with END IF
IF price > 500 THEN
  DBMS_OUTPUT.PUT_LINE('Premium');
ELSIF price > 100 THEN
  DBMS_OUTPUT.PUT_LINE('Mid-range');
ELSE
  DBMS_OUTPUT.PUT_LINE('Standard');
END IF;
```

```sql
-- MySQL: ELSEIF (one word, no space), closes with END IF
IF price > 500 THEN
  SELECT 'Premium';
ELSEIF price > 100 THEN
  SELECT 'Mid-range';
ELSE
  SELECT 'Standard';
END IF;
```

```sql
-- PostgreSQL/PL-pgSQL: ELSIF, closes with END IF — matches PL/SQL's shape
IF price > 500 THEN
  RAISE NOTICE 'Premium';
ELSIF price > 100 THEN
  RAISE NOTICE 'Mid-range';
ELSE
  RAISE NOTICE 'Standard';
END IF;
```

T-SQL is the one that stands apart here: it has no `END IF` at all, and
multi-statement branches need their own `BEGIN...END` wrapper. The other
three all use a one-word `ELSIF`/`ELSEIF` and close the whole statement
with `END IF`.

## WHILE loops: present on all four

```sql
-- T-SQL
DECLARE @i INT = 1;
WHILE @i <= 5
BEGIN
    PRINT @i;
    SET @i = @i + 1;
END
```

```sql
-- PL/SQL
i := 1;
WHILE i <= 5 LOOP
  DBMS_OUTPUT.PUT_LINE(i);
  i := i + 1;
END LOOP;
```

```sql
-- MySQL
SET i = 1;
WHILE i <= 5 DO
  SELECT i;
  SET i = i + 1;
END WHILE;
```

```sql
-- PostgreSQL/PL-pgSQL
i := 1;
WHILE i <= 5 LOOP
  RAISE NOTICE '%', i;
  i := i + 1;
END LOOP;
```

## The real surprise: T-SQL has no native FOR loop

This is the single biggest control-flow gap between T-SQL and almost every
other language a developer has used, including the other three dialects
here. T-SQL's idiom for "repeat N times, counting" is `WHILE` plus a
manually incremented counter variable — there is no `FOR i = 1 TO 10`
construct in T-SQL at all:

```sql
-- T-SQL: the WHILE-plus-counter idiom is the only option
DECLARE @i INT = 1;
WHILE @i <= 10
BEGIN
    PRINT @i;
    SET @i = @i + 1;
END
```

PL/SQL and PL/pgSQL, by contrast, both have a genuine `FOR` loop that
handles the counter automatically:

```sql
-- PL/SQL: a real FOR loop, no manual counter needed
FOR i IN 1..10 LOOP
  DBMS_OUTPUT.PUT_LINE(i);
END LOOP;

-- PostgreSQL/PL-pgSQL: identical shape
FOR i IN 1..10 LOOP
  RAISE NOTICE '%', i;
END LOOP;
```

MySQL has no `FOR i IN range` loop either, but it does have one loop
construct the others don't: `REPEAT...UNTIL`, which checks its condition
**after** the body runs (so the body always executes at least once):

```sql
-- MySQL: REPEAT...UNTIL, condition checked after the body
SET i = 1;
REPEAT
  SELECT i;
  SET i = i + 1;
UNTIL i > 10
END REPEAT;
```

## Side-by-side: loop keywords by platform

| Platform | WHILE loop | Real counting FOR loop | Other loop |
|---|---|---|---|
| T-SQL | `WHILE...BEGIN...END` | None — use `WHILE` + manual counter | — |
| PL/SQL | `WHILE...LOOP...END LOOP` | `FOR i IN 1..10 LOOP...END LOOP` | — |
| MySQL | `WHILE...DO...END WHILE` | None | `REPEAT...UNTIL...END REPEAT` |
| PostgreSQL | `WHILE...LOOP...END LOOP` | `FOR i IN 1..10 LOOP...END LOOP` | — |

## Key terms

| Term | Meaning |
|---|---|
| `ELSIF` / `ELSEIF` | One-word "else if" keyword in PL/SQL, PL/pgSQL (`ELSIF`) and MySQL (`ELSEIF`) — T-SQL has neither |
| `END IF` | Closes a multi-branch IF in PL/SQL, MySQL, and PL/pgSQL; T-SQL has no equivalent |
| `FOR i IN 1..10 LOOP` | PL/SQL and PL/pgSQL's native counting loop; T-SQL and MySQL have nothing like it |
| `REPEAT...UNTIL` | MySQL's post-condition loop, guaranteed to run its body at least once |

## Lab

Write a T-SQL `WHILE` loop that prints the numbers 1 through 5, then write
the equivalent PL/SQL `FOR i IN 1..5 LOOP` version. Notice how much shorter
the PL/SQL version is because it doesn't need a manually declared and
incremented counter variable.

## Check yourself

You're ready for the next lesson when you can explain, without looking, why
T-SQL developers reach for `WHILE` plus a counter instead of a `FOR` loop,
and which two platforms in this comparison DO have a real counting `FOR`
loop.
