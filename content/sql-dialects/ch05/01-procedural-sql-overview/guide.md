# Lesson 25 — Procedural SQL Overview: T-SQL vs. PL/SQL vs. Stored Programs Elsewhere

**Chapter 5 · Procedural Code Compared · Lesson 1 of 10**

## What you'll learn

- Why "SQL" and "procedural SQL" are really two different languages glued together
- T-SQL as SQL Server's built-in procedural extension
- PL/SQL as Oracle's own, richer procedural language
- Why MySQL's stored-program language is the most limited of the four
- Why PostgreSQL doesn't have ONE procedural language, but several pluggable ones

## SQL is declarative; procedural SQL is not

Plain `SELECT`/`INSERT`/`UPDATE`/`DELETE` statements are **declarative** — you
describe the result you want, and the engine figures out how to get it. But
real applications also need **procedural** logic: variables, loops,
conditionals, error handling, reusable named routines. Every major platform
bolts a procedural layer onto standard SQL to make that possible. This
chapter is about comparing those four procedural layers directly, dialect by
dialect, the same way earlier chapters compared plain `SELECT` syntax.

## T-SQL: baked into the engine

```sql
-- T-SQL: procedural logic lives right alongside the SQL, in the same batch
DECLARE @Total DECIMAL(10,2) = 0;

SELECT @Total = SUM(ListPrice)
FROM Production.Product
WHERE ProductLine = 'R';

IF @Total > 100000
    PRINT 'High-value product line';
ELSE
    PRINT 'Standard product line';
```

T-SQL ("Transact-SQL") is Microsoft's procedural extension to SQL Server. It
is not a separate language you call out to — variables, branching, and
loops are legal directly inside a batch of T-SQL, which is why this course's
earlier T-SQL material never needed to introduce a "second language" before
using `DECLARE` or `IF`.

## PL/SQL: Oracle's own, more ambitious language

```sql
-- PL/SQL: a DECLARE section, then BEGIN/END, closer in spirit to Ada
DECLARE
  v_total NUMBER(10,2);
BEGIN
  SELECT SUM(list_price) INTO v_total
  FROM products
  WHERE product_line = 'R';

  IF v_total > 100000 THEN
    DBMS_OUTPUT.PUT_LINE('High-value product line');
  ELSE
    DBMS_OUTPUT.PUT_LINE('Standard product line');
  END IF;
END;
/
```

PL/SQL ("Procedural Language/SQL") is Oracle's procedural language, and it
is genuinely more feature-rich than T-SQL — packages, collections, strongly
typed records, and exception handling that goes well beyond what T-SQL
offers. Developers who have used Ada will recognize PL/SQL's shape faster
than T-SQL developers will: PL/SQL's `BEGIN`/`EXCEPTION`/`END` block
structure and strict `DECLARE`-before-`BEGIN` layout are closer in spirit to
Ada than to T-SQL's looser, declare-anywhere-in-a-batch style.

## MySQL: simpler, historically limited

```sql
-- MySQL: procedural logic only exists inside a stored program's BEGIN/END
DELIMITER //
CREATE PROCEDURE CheckProductLine()
BEGIN
  DECLARE total DECIMAL(10,2);
  SELECT SUM(list_price) INTO total
  FROM products
  WHERE product_line = 'R';

  IF total > 100000 THEN
    SELECT 'High-value product line' AS message;
  ELSE
    SELECT 'Standard product line' AS message;
  END IF;
END //
DELIMITER ;
```

MySQL's stored-program language is noticeably simpler than T-SQL or PL/SQL —
you cannot run a loose `IF`/`DECLARE` outside of a stored program body the
way T-SQL lets you run `DECLARE`/`IF` in any batch. Historically MySQL's
procedural feature set lagged well behind the other three (fewer built-in
functions, no packages, limited error handling), though it has genuinely
improved across versions. We'll flag real, still-current limitations as they
come up rather than relying on reputation alone.

## PostgreSQL: no single language — a pluggable family

```sql
-- PostgreSQL: PL/pgSQL is the default, Oracle-PL/SQL-inspired procedural language
DO $$
DECLARE
  total NUMERIC(10,2);
BEGIN
  SELECT SUM(list_price) INTO total
  FROM products
  WHERE product_line = 'R';

  IF total > 100000 THEN
    RAISE NOTICE 'High-value product line';
  ELSE
    RAISE NOTICE 'Standard product line';
  END IF;
END $$;
```

PostgreSQL is the odd one out in this comparison: it doesn't ship with one
fixed procedural language. It supports multiple pluggable "PL" languages
(PL/pgSQL, PL/Python, PL/Perl, and others) that you install and `CREATE
LANGUAGE` as extensions. In practice, almost everyone uses **PL/pgSQL**,
PostgreSQL's own default, which deliberately borrows its
`DECLARE`/`BEGIN`/`EXCEPTION`/`END` shape from Oracle's PL/SQL. For the rest
of this chapter, "PostgreSQL" means PL/pgSQL unless noted otherwise.

## Key terms

| Term | Meaning |
|---|---|
| T-SQL | SQL Server's procedural extension, usable directly in any batch |
| PL/SQL | Oracle's procedural language — richer than T-SQL, Ada-like structure |
| MySQL stored programs | Procedural logic confined to stored routine bodies; historically limited |
| PL/pgSQL | PostgreSQL's default pluggable procedural language, PL/SQL-inspired |

## Lab

Write the same three-line idea — "sum `ListPrice` for product line R, then
branch on whether it's over 100000" — as a loose T-SQL batch (no `CREATE
PROCEDURE` needed) using `DECLARE`/`IF`/`PRINT`. Then look at the PL/SQL
version above and note every place a semicolon, `:=`, or keyword appears
where T-SQL would use something different.

## Check yourself

You're ready for the next lesson when you can name, without looking, which
one of these four platforms lets you run `DECLARE`/`IF` as a loose batch
with no enclosing procedure or block, and which one has no single fixed
procedural language at all.
