# Data Type Mapping & Schema Conversion Across Platforms

The last two lessons covered Oracle and PostgreSQL individually, and the one before that
covered MySQL. This lesson pulls the datatype side of all three together into one reference
alongside SQL Server, because schema conversion is where a migration's data-type decisions
get made once and then live with the schema forever. Getting these mappings right the first
time matters more than almost any other conversion step.

## What you'll learn

- A working data-type mapping reference across SQL Server, Oracle, MySQL, and PostgreSQL
- Why "boolean" isn't a universal, native concept across these four platforms
- Why some mappings are exact and others require a real judgment call

## Integer types

All four platforms have straightforward integer support, though Oracle's approach is
structurally different from the other three. SQL Server, MySQL, and PostgreSQL each offer
distinct sized integer types (`INT`/`BIGINT`/`SMALLINT` in SQL Server and PostgreSQL,
`INT`/`BIGINT`/`SMALLINT` in MySQL). Oracle instead has one general-purpose numeric type,
`NUMBER`, and its `INTEGER` keyword is simply an alias for `NUMBER(38)` — Oracle doesn't
distinguish sized integer types at the storage-declaration level the way the others do,
which means an Oracle target usually just uses `NUMBER` with an appropriate precision rather
than hunting for a matching sized integer type.

## Decimal / numeric types

This one maps cleanly across all four: SQL Server's `DECIMAL(p,s)` / `NUMERIC(p,s)`, Oracle's
`NUMBER(p,s)`, MySQL's `DECIMAL(p,s)`, and PostgreSQL's `NUMERIC(p,s)` are all
fixed-precision exact numeric types that behave the same way conceptually — precision and
scale specified explicitly, no floating-point rounding surprises. This is one of the few
mappings a migration can treat as close to mechanical.

## String / varchar types

SQL Server's `VARCHAR` and `NVARCHAR` map to Oracle's `VARCHAR2`, MySQL's `VARCHAR`, and
PostgreSQL's `VARCHAR` (or `TEXT` for unbounded-length columns). The real judgment call is
Unicode: SQL Server's split between `VARCHAR` (non-Unicode) and `NVARCHAR` (Unicode) doesn't
have a direct equivalent in MySQL or PostgreSQL, where character-set-aware string types
(commonly UTF-8) don't require a separate "national character" variant. Oracle keeps a
similar split to SQL Server, with `VARCHAR2` (using the database's character set) versus
`NVARCHAR2` (a defined national character set), so an Oracle target actually preserves that
distinction if it matters for the data.

## Date / datetime types

This is the category with the most real variation. SQL Server's `DATETIME2` maps most
honestly to PostgreSQL's `TIMESTAMP` and MySQL's `DATETIME`. Oracle is the outlier worth
knowing well: Oracle's plain `DATE` type actually includes a time component down to the
second (unlike SQL Server's `DATE`, which is date-only) — so an Oracle `DATE` column is
often the right target for a SQL Server `DATETIME2` column that doesn't need fractional
seconds, while Oracle's `TIMESTAMP` type is needed if fractional-second precision has to
survive the migration. MySQL additionally distinguishes `DATETIME` (a fixed value, no time
zone conversion) from `TIMESTAMP` (which MySQL automatically converts to/from UTC based on
session time zone) — a distinction worth getting right deliberately, not by default.

## Boolean types: not universal at all

This is the category most likely to surprise someone assuming "every database has a
boolean." PostgreSQL is the only one of the four with a genuine native `BOOLEAN` type.
SQL Server has no true boolean either — it uses `BIT`, a 0/1 integer flag, for the same
purpose. MySQL's `BOOLEAN`/`BOOL` keywords exist but are literally aliases for
`TINYINT(1)` under the hood — convenient syntax, not a distinct type. Oracle traditionally
has no native boolean column type at all (Oracle 23c added a real `BOOLEAN` type, but a huge
amount of Oracle in production predates it); the long-standing convention is `NUMBER(1)`
(storing 0/1) or `CHAR(1)` (storing `'Y'`/`'N'`), and a migration targeting anything but the
newest Oracle has to pick one of those conventions and apply it consistently.

## Key terms

| Term | Meaning |
|---|---|
| Fixed-precision numeric | A decimal type with explicit precision and scale, consistent across all four platforms |
| National character type | A Unicode-specific string type distinct from a non-Unicode one (SQL Server's NVARCHAR, Oracle's NVARCHAR2) |
| Native boolean | A true boolean column type — only PostgreSQL has one natively among these four, pre-Oracle 23c |
| Schema conversion | Translating table and column definitions from source to target platform datatypes |

## Check yourself

A SQL Server `BIT` column needs a home on a pre-23c Oracle target. Name the two realistic
conventions for representing it, and explain why Oracle has no cleaner native option.
