# Lesson 46 — Storage Engines and Why They Matter to a Developer

**Chapter 7 · MySQL Deep Dive for T-SQL Developers · Lesson 4 of 5**

## What you'll learn

- What a MySQL "storage engine" is, and why T-SQL has no equivalent concept to learn
- InnoDB vs. MyISAM: the two engines you'll actually encounter
- Why a table's storage engine is a real, code-breaking concern, not just a DBA detail
- How to check which engine a table uses before you trust `ROLLBACK`

## T-SQL doesn't have this concept at all

In SQL Server, every table uses the same underlying storage engine — there's no per-table choice
to make, and transactions, foreign keys, and row-level locking are always available. MySQL is
architected differently: it supports multiple, swappable **storage engines**, and a table's engine
is chosen (explicitly or by default) when the table is created. This isn't an obscure internal
detail — it changes what SQL features actually work against that table.

## InnoDB: the modern default, and what almost everyone should use

InnoDB is MySQL's default storage engine (since MySQL 5.5) and supports everything you'd expect
coming from T-SQL: transactions (`BEGIN`/`COMMIT`/`ROLLBACK`), foreign key constraints, and
row-level locking for concurrent access.

```sql
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
) ENGINE=InnoDB;
```

## MyISAM: older, and missing things you'd assume exist

MyISAM predates InnoDB as MySQL's original default engine. It has **no transaction support**, **no
foreign key enforcement**, and locks at the **table level** rather than per-row — meaning one
writer blocks every other reader and writer on that whole table, not just the rows it's touching.

```sql
CREATE TABLE legacy_log (
  log_id INT PRIMARY KEY,
  message VARCHAR(255)
) ENGINE=MyISAM;
```

## Why this is a real developer problem, not just a DBA one

Here's the scenario that actually bites application developers: you write code that assumes
`ROLLBACK` will undo a failed multi-step operation — exactly the pattern you'd use without a second
thought in T-SQL. If one of the tables involved is MyISAM, **the ROLLBACK silently does nothing**
for that table's changes, because MyISAM never participated in the transaction to begin with. Your
error-handling code runs, reports success, and the database is left in a partially-updated state.
This is exactly the kind of silent, hard-to-debug failure that justifies knowing a table's engine
*before* you write transactional code against it — not after something goes wrong in production.

```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;  -- InnoDB: rolls back fine
UPDATE legacy_log SET message = 'debit applied';                   -- MyISAM: NEVER rolls back
ROLLBACK;
```

## Checking a table's engine

```sql
-- Shows Engine, among other metadata, for every table matching the pattern
SHOW TABLE STATUS WHERE Name = 'legacy_log';

-- Shows the ENGINE=... clause directly in the generated CREATE statement
SHOW CREATE TABLE legacy_log;
```

Either command tells you, in seconds, whether the table you're about to write transactional code
against can actually support it.

## Key terms

| Term | Meaning |
|---|---|
| Storage engine | MySQL's pluggable mechanism for how a table actually stores and accesses its data |
| InnoDB | Modern default engine: transactions, foreign keys, row-level locking |
| MyISAM | Older engine: no transactions, no foreign keys, table-level locking |
| `SHOW TABLE STATUS` / `SHOW CREATE TABLE` | Commands that reveal a table's storage engine |

## Lab

Run `SHOW CREATE TABLE` against a few tables in a MySQL database you have access to (or a sandbox).
Identify each table's engine, and for any MyISAM table you find, write one sentence describing what
would silently fail if your application code assumed it could roll back changes to that table.

## Check yourself

You're ready for Lesson 47 when you can explain, without looking: what's the practical difference
between InnoDB and MyISAM that a developer (not just a DBA) needs to care about, and how do you
check which engine a given table uses?
