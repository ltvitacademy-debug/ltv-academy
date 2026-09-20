# Migrating SQL Server to Oracle: Key Differences

Chapters 3 through 6 taught Oracle on its own terms — architecture, security, backup and
recovery, performance tuning. This lesson revisits that knowledge from a migration angle:
the specific, concrete differences a SQL Server-to-Oracle migration has to get right, not a
generic "they're both relational databases" overview.

## What you'll learn

- The real syntax differences between T-SQL and PL/SQL that break naive ports
- How SQL Server generates identity values versus how Oracle does it
- Oracle's empty-string-as-NULL behavior, and why it silently breaks migrated code
- How object-naming case sensitivity differs between the two platforms

## T-SQL vs. PL/SQL: syntax that doesn't port directly

T-SQL and PL/SQL are both procedural SQL dialects, but a direct copy-paste port fails in
predictable places. Two of the most common:

- **Row-limiting.** SQL Server's `SELECT TOP 10 * FROM Orders ORDER BY OrderDate DESC` has
  no `TOP` in Oracle. Older Oracle code uses `WHERE ROWNUM <= 10` (applied before the
  `ORDER BY` logically executes, which is a common source of bugs when someone expects it to
  behave like `TOP`). Oracle 12c and later support the ANSI-standard
  `FETCH FIRST 10 ROWS ONLY`, which behaves the way a SQL Server developer expects.
- **Error handling.** T-SQL's `BEGIN TRY ... END TRY BEGIN CATCH ... END CATCH` becomes
  PL/SQL's `BEGIN ... EXCEPTION WHEN OTHERS THEN ... END;`. The structure is similar in
  spirit, but exception handling in PL/SQL is scoped per block and named exceptions
  (`NO_DATA_FOUND`, `TOO_MANY_ROWS`) are idiomatic in ways T-SQL's generic `TRY/CATCH`
  isn't.

## IDENTITY columns vs. sequences (and triggers, in older Oracle)

SQL Server's `IDENTITY(1,1)` column attribute auto-generates a value on insert with no extra
object required. Oracle historically had no equivalent — a migration had to create a
`SEQUENCE` object and either reference `sequence_name.NEXTVAL` explicitly in every insert, or
create a `BEFORE INSERT` trigger on the table that populated the column from the sequence
automatically. Oracle 12c introduced `GENERATED [ALWAYS | BY DEFAULT] AS IDENTITY`, which is
syntactically much closer to SQL Server's `IDENTITY` and doesn't require a hand-built
trigger. A migration project has to know which Oracle version is the target, because the
older sequence-plus-trigger pattern and the newer identity-column syntax are meaningfully
different amounts of work.

## The empty-string-as-NULL gotcha

This is one of Oracle's most well-known and most dangerous surprises for anyone coming from
SQL Server: **Oracle treats an empty string (`''`) as `NULL` for `VARCHAR2` and `CHAR`
columns.** In SQL Server, `''` and `NULL` are distinct — a `NOT NULL` column happily accepts
`''`, and `WHERE Column = ''` matches those rows. In Oracle, inserting `''` into a
`VARCHAR2` column actually stores `NULL`, which means:

- A `NOT NULL` constraint on a `VARCHAR2` column will reject an attempt to insert `''`, even
  though the same code works fine against SQL Server.
- `WHERE Column = ''` never matches anything in Oracle, because the stored value is `NULL`
  and `NULL` never equals anything, including another `NULL`. Code has to use
  `WHERE Column IS NULL` instead.

Any migrated application logic that inserts `''` to mean "no value entered yet," or compares
against `''` to check for blank input, needs to be found and rewritten — this is exactly the
kind of bug that passes testing with small data and fails quietly in production.

## Case sensitivity in object naming

SQL Server, under its common default collations, is case-insensitive for object names and
generally preserves the case as typed. Oracle takes a different approach: an unquoted
identifier is automatically folded to **uppercase** and stored that way, so
`CREATE TABLE Orders` and `CREATE TABLE ORDERS` create the same object, and it's stored (and
must usually be referenced) as `ORDERS`. Wrapping an identifier in double quotes —
`CREATE TABLE "Orders"` — preserves the exact case, but then every reference to that object
must also use the exact quoted case, including matching quotes, or Oracle won't find it. A
migration that blindly carries over mixed-case SQL Server object names in quotes creates a
schema that's painful to query from any tool that doesn't quote consistently. The pragmatic
approach: let Oracle fold names to uppercase and adjust conventions, rather than fighting it
with quoted identifiers everywhere.

## Key terms

| Term | Meaning |
|---|---|
| PL/SQL | Oracle's procedural extension to SQL, the equivalent role T-SQL plays for SQL Server |
| Sequence | An Oracle object that generates sequential numeric values, used to emulate IDENTITY |
| Identifier folding | Oracle's default behavior of storing unquoted object names in uppercase |
| NULL-equivalent empty string | Oracle's storage of `''` as `NULL` for VARCHAR2/CHAR columns |

## Check yourself

A migrated stored procedure includes `WHERE MiddleName = ''` to find customers with no
middle name entered. Why will this silently return zero rows on Oracle even if such
customers exist, and what's the fix?
