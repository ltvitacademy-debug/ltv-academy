# Lesson 43 — MySQL's SQL Mode and Why It Changes Behavior

**Chapter 7 · MySQL Deep Dive for T-SQL Developers · Lesson 1 of 5**

## What you'll learn

- What the `sql_mode` system variable is, and why it's the first thing to check on any unfamiliar MySQL server
- How `STRICT_TRANS_TABLES`/`STRICT_ALL_TABLES` make MySQL reject bad data instead of silently coercing it
- Why `ONLY_FULL_GROUP_BY` is MySQL catching up to a rule T-SQL has always enforced
- How to read and set `sql_mode`, and why "the same query" can misbehave on two different MySQL installs

## T-SQL doesn't have this problem — MySQL does

In SQL Server, inserting a string that's too long for a column, or a NULL into a `NOT NULL`
column, is always an error. There's no setting that changes that. MySQL is different: a system
variable called `sql_mode` controls how strictly the server enforces rules like this, and it
genuinely changes server behavior, not just a warning level.

```sql
-- See the current session's SQL mode
SELECT @@sql_mode;

-- See the server-wide default
SELECT @@GLOBAL.sql_mode;
```

## STRICT mode: the difference that bites hardest

Without a strict mode enabled, older MySQL defaults let invalid or missing data through with a
**warning**, not an error — truncating a string that's too long, or inserting `0` or `''` for a
missing value instead of rejecting the row.

```sql
-- Table with a VARCHAR(5) column
CREATE TABLE demo (code VARCHAR(5));

-- Without STRICT_TRANS_TABLES: this succeeds, silently truncating to 'ABCDE'
-- With STRICT_TRANS_TABLES or STRICT_ALL_TABLES: this is a hard error
INSERT INTO demo (code) VALUES ('ABCDEFGHIJ');
```

Turning on `STRICT_TRANS_TABLES` (for transactional engines like InnoDB) or `STRICT_ALL_TABLES`
(including non-transactional engines too) makes MySQL behave the way SQL Server, Oracle, and
PostgreSQL always do: bad data is rejected outright, not quietly reshaped. This is almost always
what you want in application code, and it's why strict mode should be one of the first things you
verify on any MySQL server you're handed.

## ONLY_FULL_GROUP_BY: a rule T-SQL always had

T-SQL has always required every non-aggregated column in `SELECT` to appear in `GROUP BY` — you
learned that rule back in Chapter 4 of your T-SQL coursework. Older MySQL versions, by default,
did **not** enforce this: they'd silently pick an arbitrary row's value for an ungrouped column.

```sql
-- This is a HARD ERROR in T-SQL, and in modern MySQL with ONLY_FULL_GROUP_BY
-- Older MySQL (pre-5.7 default, or ONLY_FULL_GROUP_BY disabled) let it run,
-- picking an arbitrary CustomerName per group — a real, silent data bug.
SELECT CustomerId, CustomerName, COUNT(*) AS OrderCount
FROM Orders
GROUP BY CustomerId;
```

Since MySQL 5.7, `ONLY_FULL_GROUP_BY` ships **on by default**, so modern MySQL now matches the
rule you already know from T-SQL. But plenty of production systems and tutorials were written
against the old lenient default — if you ever read MySQL code that groups loosely like the example
above and it "just works," that code was written (or the server configured) before this mode was
the default.

## Why "the same bad query" behaves differently on different servers

Because `sql_mode` is a configurable variable — settable globally, per-session, or even per
connection string — the exact same SQL text can be perfectly valid on one MySQL server and throw a
hard error on another. There's no universal "MySQL behavior"; there's only "MySQL behavior under
this server's current `sql_mode`."

```sql
-- Setting sql_mode for the current session only
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,ONLY_FULL_GROUP_BY';

-- Setting it permanently (requires editing my.cnf / my.ini, not just SQL)
-- [mysqld]
-- sql_mode = "STRICT_TRANS_TABLES,ONLY_FULL_GROUP_BY,NO_ZERO_DATE"
```

## Key terms

| Term | Meaning |
|---|---|
| `sql_mode` | A MySQL system variable controlling how strictly the server validates data and SQL syntax |
| `STRICT_TRANS_TABLES` / `STRICT_ALL_TABLES` | Modes that turn data-validation warnings into hard errors |
| `ONLY_FULL_GROUP_BY` | Mode enforcing the same GROUP BY rule T-SQL has always had; default since MySQL 5.7 |

## Lab

Connect to a MySQL instance (or MySQL-compatible sandbox) and run `SELECT @@sql_mode;`. Compare
the result against a colleague's server or a different environment, and identify at least one mode
in the list that would change how a query you write today behaves.

## Check yourself

You're ready for Lesson 44 when you can explain, without looking: what does `STRICT_TRANS_TABLES`
actually change about MySQL's behavior, and why can the exact same SQL text behave differently on
two MySQL servers?
