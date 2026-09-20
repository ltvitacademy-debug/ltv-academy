# Collations

## What you'll learn

- What a collation actually governs, precisely
- `SQL_Latin1_General_CP1_CI_AS` decoded, letter by letter
- Why mismatched collations between databases cause real, breaking query errors — not just
  different sort order

## What a collation actually is

A **collation** is the rule set SQL Server uses to compare and sort character data: what order
letters fall in, whether uppercase and lowercase are treated as equal, and whether accented
characters are treated as equal to their unaccented counterparts. Every level of the hierarchy
can have its own collation — the instance has a default, each database has a default (usually
inherited from the instance, but overridable at creation), and even individual columns can
specify their own.

## Decoding a collation name

`SQL_Latin1_General_CP1_CI_AS` — the most common default for English-language SQL Server
installs — breaks down into parts:

- `Latin1_General` — the base alphabet/language rules (general Latin-alphabet rules, suited to
  English and most Western European languages).
- `CP1` — code page 1252, the character encoding used for non-Unicode (`char`/`varchar`) data.
- `CI` — **case-insensitive**: `'Smith'` and `'smith'` compare as equal.
- `AS` — **accent-sensitive**: `'café'` and `'cafe'` compare as *different*.

You'll also see `CS` (case-sensitive) and `AI` (accent-insensitive) as the flipped versions of
those same two flags, and other suffixes like `KS` (kana-sensitive) or `WS` (width-sensitive)
for specific Asian-language scenarios. Check what's actually in effect with:

```sql
SELECT SERVERPROPERTY('Collation');       -- instance default
SELECT DATABASEPROPERTYEX('YourDb', 'Collation');  -- a specific database
```

## Why a mismatch causes real errors, not just sorting differences

This is the part that surprises people: collation isn't purely cosmetic. SQL Server needs a
single, unambiguous collation to compare two character values — so when a query compares
`varchar`/`nvarchar` columns from **two different collations** directly (most commonly:
comparing a column in a user database against a column in `tempdb`, or joining across two
databases with different collations), SQL Server raises an actual error:

```
Cannot resolve the collation conflict between "..." and "..." in the equal to operation.
```

This happens most often with temp tables: if the instance's default collation differs from a
specific database's collation, and a stored procedure in that database creates a `#temp` table
and joins it back against a database-collation column, the comparison is ambiguous — `tempdb`
always uses the instance's default collation for object definitions, regardless of any
individual user database's collation. The standard fix is an explicit `COLLATE` clause forcing
one side to match:

```sql
WHERE t.Name = p.Name COLLATE SQL_Latin1_General_CP1_CI_AS
```

## Practical guidance

Match a new database's collation to the instance default unless you have a specific, documented
reason not to (a multi-tenant platform with data from multiple locales is the usual legitimate
reason for intentional divergence). When you do need to compare across a mismatch, `COLLATE`
inline is the tool — but treat every occurrence of it in a codebase as a flag that something
upstream (probably a temp-table pattern, or a poorly planned migration) should be revisited, not
as a permanent pattern to keep writing.

## Key terms

| Term | Meaning |
|---|---|
| Collation | Rule set governing sort order and character comparison: case, accent, and width sensitivity |
| `CI`/`CS` | Case-insensitive / case-sensitive comparison flag |
| `AS`/`AI` | Accent-sensitive / accent-insensitive comparison flag |
| Collation conflict | The runtime error when comparing character columns from two incompatible collations |

## Check yourself

A stored procedure creates a `#temp` table and joins it against a user database table, and the
query fails with a collation conflict error even though nobody explicitly set an unusual
collation anywhere. What's the most likely cause?
