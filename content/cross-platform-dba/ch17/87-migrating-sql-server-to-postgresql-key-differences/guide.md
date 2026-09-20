# Migrating SQL Server to PostgreSQL: Key Differences

Chapters 13 through 16 taught PostgreSQL on its own terms — MVCC, VACUUM, roles, backup and
recovery, replication. This lesson applies that knowledge to a migration: the specific
differences a SQL Server-to-PostgreSQL project has to address, including one of PostgreSQL's
most-missed gotchas for SQL Server migrators.

## What you'll learn

- T-SQL vs. PL/pgSQL syntax differences that affect ported code
- IDENTITY vs. SERIAL vs. the modern GENERATED AS IDENTITY syntax
- PostgreSQL's lowercase identifier folding, and why it's the opposite of what SQL Server
  developers expect
- Common datatype mapping differences, including DATETIME2 vs. TIMESTAMP

## T-SQL vs. PL/pgSQL

PostgreSQL's procedural language, PL/pgSQL, is deliberately modeled on Oracle's PL/SQL more
than on T-SQL, which means porting from T-SQL involves real restructuring, not just syntax
swaps. A T-SQL stored procedure's implicit result set from a bare `SELECT` doesn't exist the
same way in a PL/pgSQL function — a function has to explicitly `RETURN` a value, a `SETOF`
record, or use `RETURN QUERY`. Variable declaration moves from T-SQL's inline
`DECLARE @Var INT` to PL/pgSQL's `DECLARE` block at the top of the function body, and error
handling uses `EXCEPTION WHEN ... THEN` blocks rather than `TRY/CATCH`. PostgreSQL also
distinguishes functions (which return a value and are used in the `SELECT`/`WHERE` clauses
of the 1990s SQL standard) from true stored procedures (introduced in PostgreSQL 11, callable
with `CALL` and able to manage their own transactions) — a distinction that matters when
deciding what a migrated T-SQL procedure should become.

## IDENTITY vs. SERIAL vs. GENERATED AS IDENTITY

PostgreSQL's traditional way to auto-generate a primary key value is the `SERIAL`
pseudo-type, which is really shorthand that creates a backing sequence and sets the column's
default to pull the next value from it. It works, but it's a PostgreSQL-specific convention
that doesn't follow the SQL standard, and it leaves the sequence as a separate object a
migration has to be aware of. PostgreSQL 10 introduced the SQL-standard
`GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY` syntax, which behaves much more like SQL
Server's `IDENTITY` and is the modern, recommended choice for new schema in a migration
rather than `SERIAL`.

## Case sensitivity: the opposite of what SQL Server developers expect

This is a genuinely important gotcha, and it runs in the opposite direction from the Oracle
one covered in the previous lesson. SQL Server, under its typical default collation, is
case-insensitive when comparing object names and generally preserves the case exactly as
typed. **PostgreSQL folds unquoted identifiers to lowercase.** `CREATE TABLE Orders` in
PostgreSQL actually creates a table named `orders`, and every unquoted reference to it —
`SELECT * FROM Orders`, `SELECT * FROM ORDERS`, `select * from orders` — resolves to the same
lowercase object without complaint. The trouble starts the moment a migration script quotes
an identifier to "preserve" the original SQL Server casing: `CREATE TABLE "Orders"` creates a
table that is genuinely named `Orders` with a capital O, and from then on **every single
reference** to it must use that exact quoted case, or PostgreSQL won't find it — including a
plain `SELECT * FROM Orders` without quotes, because unquoted `Orders` still folds to
`orders`, which doesn't exist. The safest practice for a migration is to let PostgreSQL fold
everything to lowercase and adopt lowercase, underscore-separated naming going forward,
rather than fighting the fold with quoted identifiers everywhere.

## Datatype mapping differences

Several SQL Server datatypes need a deliberate mapping decision rather than an assumed
one-to-one match:

- **`DATETIME2`** maps to PostgreSQL's **`TIMESTAMP`** (or `TIMESTAMPTZ` if time zone
  awareness is actually needed — SQL Server's `DATETIME2` itself carries no time zone, so a
  straight `TIMESTAMP` is usually the honest equivalent).
- **`NVARCHAR`** maps to PostgreSQL's **`VARCHAR`** or **`TEXT`**, since PostgreSQL's text
  types are UTF-8 by default at the database level and don't need a separate "Unicode"
  variant the way SQL Server's `NVARCHAR` does relative to `VARCHAR`.
- **`BIT`** maps to PostgreSQL's native **`BOOLEAN`** type for true/false columns — a genuine
  upgrade in expressiveness, since SQL Server's `BIT` is really a 0/1 integer flag.
- **`UNIQUEIDENTIFIER`** maps to PostgreSQL's native **`UUID`** type.

## Key terms

| Term | Meaning |
|---|---|
| PL/pgSQL | PostgreSQL's procedural language, modeled more on PL/SQL than T-SQL |
| SERIAL | PostgreSQL's legacy shorthand for an auto-incrementing column backed by a sequence |
| Identifier folding | PostgreSQL's default behavior of storing unquoted object names in lowercase |
| GENERATED AS IDENTITY | The SQL-standard, PostgreSQL 10+ way to auto-generate column values |

## Check yourself

A migration script runs `CREATE TABLE "Customers" (...)` to "preserve" the original SQL
Server casing. Why will a later, unquoted `SELECT * FROM Customers` fail to find this table?
