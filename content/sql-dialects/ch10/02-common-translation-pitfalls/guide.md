# Lesson 59 — Common Translation Pitfalls (and How to Catch Them Before Production)

**Chapter 10 · Migration, Translation & Capstone · Lesson 2 of 5**

## What you'll learn

- A practical, five-item checklist pulling together this course's recurring translation gotchas
- Why NULL and empty string aren't the same thing everywhere
- Why MySQL's historical leniency on type coercion is still worth checking, even on modern versions
- Why quoted identifiers fold case differently on Oracle/PostgreSQL than on SQL Server/MySQL
- Why automated migration tools stop short at procedural code, every time

## The checklist

Nine chapters of this course have each surfaced one real divergence between dialects. This lesson
collects the five that cause the most real production bugs when a query crosses platforms, so you
have one list to run before anything ships.

## 1. NULL vs. empty string isn't the same everywhere

```sql
-- Oracle: this INSERT stores NULL, not an empty string
INSERT INTO customers (customer_name, notes) VALUES ('Acme Corp', '');

-- On T-SQL, MySQL, and PostgreSQL, the same statement stores
-- a real empty string -- a value that is NOT NULL
```

Oracle treats an empty `VARCHAR2` as `NULL` at the storage level — there is no way to store a true
empty string in Oracle the way the other three platforms can. A `WHERE notes = ''` check that works
correctly on T-SQL silently returns nothing on Oracle, because `notes` is `NULL`, and `NULL = ''`
is never true on any platform. The fix is always `WHERE notes IS NULL` on Oracle for anything that
was written as empty string on the source system.

## 2. MySQL's historical leniency on type coercion

```sql
-- Historically permitted on MySQL in non-strict SQL mode:
INSERT INTO orders (order_date) VALUES ('0000-00-00');
SELECT * FROM products WHERE product_code = 123;  -- compares a string column to a number
```

MySQL has genuinely tightened this over recent versions — `STRICT_TRANS_TABLES` is part of the
default `sql_mode` since MySQL 5.7 — but plenty of production databases still run with a looser
`sql_mode` inherited from an older install, or were seeded with data written under one. Check the
actual `sql_mode` in play, on the actual version in use, rather than assuming current defaults
apply everywhere.

## 3. Quoted identifiers fold case differently

```sql
-- Oracle / PostgreSQL: unquoted identifiers fold to a fixed case automatically
CREATE TABLE Customers (CustomerName VARCHAR2(100));
-- Oracle stores this as CUSTOMERS / CUSTOMERNAME (uppercase)
-- PostgreSQL stores this as customers / customername (lowercase)

-- Quote it, and the exact case is preserved -- and then required every time:
SELECT "CustomerName" FROM "Customers";   -- works
SELECT CustomerName FROM Customers;       -- error: folds to wrong case
```

T-SQL and MySQL don't fold case this way by default — `CustomerName` and `customername` typically
resolve to the same object either way (collation-dependent on SQL Server; filesystem-dependent for
table names on MySQL). This is Lesson 15's material directly: if a migrated script quotes
identifiers to "preserve" the exact mixed case from a SQL Server script, it now has to match that
exact case on every reference, forever, on Oracle or PostgreSQL.

## 4. Date/time range and precision differences

A date comparison that works fine in testing can fail quietly in production because the platforms
don't agree on range or precision — `DATETIME2`'s up-to-100-nanosecond precision, MySQL's historic
`DATETIME` range starting at year 1000, PostgreSQL's microsecond-precision `TIMESTAMP`. Chapter 2
covered the full comparison; the pitfall here is specifically re-checking it at migration time,
because a value that was valid on the source platform is not guaranteed to be valid, or to round
the same way, on the target.

## 5. Tools translate syntax; they don't translate procedural logic

This is the direct continuation of the last lesson: an automated migration tool will get basic
`SELECT`/`JOIN`/`GROUP BY` syntax right the overwhelming majority of the time. It will not
reliably translate a stored procedure, trigger, or package — `TRY/CATCH`, `EXCEPTION` blocks,
cursors, and dynamic SQL are different enough across platforms (Chapters 5–8) that no tool can
safely guess the right rewrite every time. Budget real human review time for every procedural
object, every migration, no exceptions.

## Key terms

| Term | Meaning |
|---|---|
| Empty-string-as-NULL | Oracle's behavior of storing an empty VARCHAR2 as NULL at the storage level |
| `sql_mode` | MySQL's session/server setting controlling how strictly it enforces type and value rules |
| `STRICT_TRANS_TABLES` | The MySQL sql_mode flag (default since 5.7) that rejects invalid values instead of coercing them |
| Case folding | Automatically converting an unquoted identifier to a fixed case (Oracle/PostgreSQL), unlike SQL Server/MySQL |

## Lab

Take this T-SQL check: `WHERE Notes = ''`. Rewrite it as the correct Oracle equivalent, and write
one sentence explaining why the literal translation (`WHERE notes = ''`) would silently return the
wrong rows on Oracle instead of erroring.

## Check yourself

You're ready for the capstone when you can list all five checklist items from memory, and explain,
for each one, which specific earlier chapter in this course first introduced it.
