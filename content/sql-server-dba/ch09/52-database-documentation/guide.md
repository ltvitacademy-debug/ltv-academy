# Database Documentation

A schema in source control tells you *what* the objects are. It rarely tells you *why* they
look the way they do. Six months after a decision, the person who made it has moved on or
forgotten, and the next DBA is left guessing — this lesson is about closing that gap with
documentation that actually lives with the objects it describes.

## What you'll learn

- Why documenting non-obvious schema decisions has real, recurring payoff
- How to attach documentation directly to objects with extended properties
- What's worth documenting versus what's just noise

## Why "why" matters more than "what"

Column names, data types, and foreign keys are mostly self-documenting — anyone can read a
`CREATE TABLE` statement and see what a table contains. What a `CREATE TABLE` statement can't
tell you is *why* a column called `LegacyCustomerId` still exists and is still being written to
by a nightly job three years after the "new" customer ID was introduced, or why a particular
index looks redundant but is actually load-bearing for a report that runs once a quarter and
would time out without it. That kind of context lives in someone's head until it doesn't, and
then it's gone. Documenting the non-obvious decision — not the obvious structure — is what
actually saves the next person time.

## Extended properties: documentation that lives with the object

SQL Server has a built-in mechanism for exactly this: **extended properties**, added with
`sp_addextendedproperty` and read back with `sp_helptext` or by querying
`sys.extended_properties`. An extended property attaches an arbitrary name/value pair directly
to a database object — a table, a column, an index, even a whole database — so the
documentation travels with the schema instead of living in a separate wiki page that quietly
goes stale.

```sql
EXEC sp_addextendedproperty
    @name = N'MS_Description',
    @value = N'Deprecated in 2022 — still written by the nightly legacy sync job (JOB_LegacySync). Do not remove until that job is retired.',
    @level0type = N'Schema', @level0name = N'dbo',
    @level1type = N'Table',  @level1name = N'Customers',
    @level2type = N'Column', @level2name = N'LegacyCustomerId';
```

Using the well-known name `MS_Description` matters because SSMS's Object Explorer natively
displays it as the object's "Description" — so this documentation is visible to anyone browsing
the schema in the tool they're already using, not buried in a document they'd have to go find.

## What's worth documenting

Not everything needs a property. A column named `OrderDate` typed as `date` doesn't need an
extended property explaining that it holds the date of the order — that's obvious from the
name and type. What's worth the effort is the non-obvious: why a column that looks unused is
actually still required, why a table has a seemingly redundant index, why a stored procedure
does something unusual for a business reason that isn't visible in the code itself, or which
upstream job depends on a table that looks orphaned. The test is simple: if a competent DBA
looking at the object cold would have a reasonable question about it, that question is worth
answering in an extended property.

## Key terms

| Term | Meaning |
|---|---|
| Extended property | A name/value pair attached to a database object, stored with the schema itself |
| `sp_addextendedproperty` | Stored procedure used to add an extended property to an object |
| `MS_Description` | The well-known extended property name SSMS displays as an object's "Description" |
| `sys.extended_properties` | Catalog view for querying existing extended properties |

## Check yourself

A table has a column that looks completely unused, but dropping it broke a nightly job during a
past cleanup attempt. What would you document about that column, and where would you put it so
the next DBA sees it before making the same mistake?
