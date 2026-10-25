# Lesson 13 — String Concatenation: +, ||, and CONCAT

**Chapter 3 · Querying Basics Compared · Lesson 2 of 8**

## What you'll learn

- T-SQL's `+` operator for concatenation, and its NULL gotcha
- Oracle and PostgreSQL's ANSI-standard `||` operator
- Why MySQL's `+` is addition, not concatenation — a real trap
- The `CONCAT()` function every platform offers as a safer alternative

## SQL Server: + concatenates, but NULL poisons it

```sql
-- T-SQL: + concatenates strings
SELECT FirstName + ' ' + LastName AS FullName
FROM Person.Person;

-- The gotcha: if ANY operand is NULL, the whole result is NULL
SELECT FirstName + ' ' + MiddleName + ' ' + LastName AS FullName
FROM Person.Person;
-- Rows with no MiddleName return a NULL FullName, not a FullName missing
-- the middle part.
```

`CONCAT()` avoids this — it treats NULL as an empty string instead of
poisoning the whole expression:

```sql
SELECT CONCAT(FirstName, ' ', MiddleName, ' ', LastName) AS FullName
FROM Person.Person;
-- A NULL MiddleName just contributes nothing, instead of nulling everything.
```

## Oracle and PostgreSQL: || is the ANSI-standard operator

```sql
-- Oracle
SELECT first_name || ' ' || last_name AS full_name
FROM employees;

-- PostgreSQL — identical syntax
SELECT first_name || ' ' || last_name AS full_name
FROM employees;
```

`||` is the SQL standard's concatenation operator. Both Oracle and
PostgreSQL also offer `CONCAT()` as an alternative with more forgiving NULL
behavior, same idea as SQL Server's.

## MySQL: + is addition — CONCAT() is required

```sql
-- WRONG on MySQL: + is arithmetic addition here, NOT concatenation
SELECT first_name + ' ' + last_name AS full_name
FROM employees;
-- This either errors or silently coerces strings to 0, producing garbage.

-- RIGHT: MySQL requires the CONCAT() function
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;
```

This is one of the most common traps for a T-SQL developer moving to
MySQL: the `+` operator that glues strings together everywhere else in
your muscle memory is pure arithmetic addition in MySQL. There is no `+`
string concatenation on MySQL at all — you must use `CONCAT()`.

## Side-by-side

| Dialect | Native operator | Function alternative | NULL behavior (native op) |
|---|---|---|---|
| SQL Server | `+` | `CONCAT()` | Any NULL operand makes the whole result NULL |
| Oracle | `\|\|` | `CONCAT()` | NULL is treated as empty string (ANSI behavior) |
| PostgreSQL | `\|\|` | `CONCAT()` | Any NULL operand makes the whole result NULL with `\|\|` |
| MySQL | none (`+` is addition) | `CONCAT()` (required) | `CONCAT()` returns NULL if any argument is NULL, unless using `CONCAT_WS()` |

## Key terms

| Term | Meaning |
|---|---|
| `+` (T-SQL) | Concatenates strings, but any NULL operand nulls the entire result |
| `\|\|` | ANSI-standard concatenation operator, used by Oracle and PostgreSQL |
| `CONCAT()` | Function available on all four platforms; the only option on MySQL |
| NULL propagation | The behavior where one NULL operand turns an entire expression NULL |

## Lab

Take a table with a nullable `MiddleName` column. Write the T-SQL `+`
version that silently loses the whole name whenever `MiddleName` is NULL,
then rewrite it with `CONCAT()` so it degrades gracefully. Then write the
MySQL version using `CONCAT()`, and note what would happen if you
mistakenly used `+` instead.

## Check yourself

You're ready for the next lesson when you can say, without looking, what
`first_name + ' ' + last_name` actually computes on MySQL — and why.
