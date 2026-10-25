# Lesson 17 — The DUAL Table and Equivalent Patterns

**Chapter 3 · Querying Basics Compared · Lesson 6 of 8**

## What you'll learn

- Why Oracle requires a FROM clause on every SELECT
- What DUAL actually is, and why `SELECT ... FROM DUAL` is the classic idiom
- How SQL Server, MySQL, and PostgreSQL let you skip FROM entirely
- MySQL's optional Oracle-compatibility support for DUAL

## Oracle: every SELECT needs a FROM clause

```sql
-- This is a SYNTAX ERROR on Oracle — no FROM clause
SELECT 1 + 1;

-- The fix: select FROM the DUAL table
SELECT 1 + 1 FROM DUAL;
```

Oracle's SQL grammar requires `FROM` on every `SELECT` statement — there's
no such thing as a `SELECT` with no table at all. `DUAL` is a real,
built-in system table Oracle ships specifically to satisfy this rule when
you don't actually need any real table: it has exactly one row and one
column, which is all a `SELECT` needs to evaluate an expression once.

```sql
-- DUAL is genuinely useful for evaluating any one-off expression
SELECT SYSDATE FROM DUAL;
SELECT UPPER('hello') FROM DUAL;
SELECT 2 * 3 FROM DUAL;
```

## SQL Server, MySQL, and PostgreSQL: no FROM required

```sql
-- SQL Server: no FROM clause needed
SELECT 1 + 1;
SELECT GETDATE();

-- MySQL: same — no FROM needed
SELECT 1 + 1;
SELECT NOW();

-- PostgreSQL: same — no FROM needed
SELECT 1 + 1;
SELECT NOW();
```

None of these three platforms require a `FROM` clause at all. `SELECT
<expression>` is perfectly valid syntax on its own, with no DUAL-style
workaround needed.

## MySQL's compatibility nod to Oracle

```sql
-- MySQL doesn't need this, but supports it anyway, for Oracle-style code
SELECT 1 + 1 FROM DUAL;
```

Interestingly, MySQL goes out of its way to also accept `FROM DUAL` as
valid syntax, purely as a compatibility courtesy for developers and
migration scripts coming from Oracle — even though MySQL's own grammar
never required a `FROM` clause in the first place.

## Side-by-side

| Dialect | FROM clause required for a bare expression? | DUAL support |
|---|---|---|
| Oracle | Yes — mandatory | DUAL is the real mechanism that satisfies the rule |
| SQL Server | No | No DUAL table exists or is needed |
| MySQL | No | Supports `FROM DUAL` anyway, for Oracle compatibility |
| PostgreSQL | No | No DUAL table exists or is needed |

## Key terms

| Term | Meaning |
|---|---|
| `DUAL` | Oracle's built-in one-row, one-column system table, used to satisfy the mandatory FROM clause |
| Mandatory FROM | Oracle's grammar rule that every SELECT must reference a table |
| FROM-less SELECT | The style SQL Server, MySQL, and PostgreSQL all allow, evaluating an expression with no table |

## Lab

Write a query that evaluates `UPPER('ltv academy')` as a one-off
expression on all four platforms: Oracle (using `DUAL`), SQL Server,
MySQL, and PostgreSQL (all three without any `FROM`).

## Check yourself

You're ready for the next lesson when you can explain, without looking,
why `SELECT 1+1;` is a syntax error on Oracle but valid everywhere else —
and what `DUAL` actually is under the hood.
