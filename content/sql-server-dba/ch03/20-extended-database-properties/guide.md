# Extended Database Properties

This closes out the chapter with the metadata layer: how to inspect the configuration
you've been setting across the last five lessons, and how to attach your own custom
metadata that SQL Server doesn't natively track — ownership, purpose, data classification —
directly onto the database.

## What you'll learn

- Where SQL Server exposes built-in database metadata
- The function that answers "what's this database's setting?" from T-SQL, one property
  at a time
- How to attach and query your own custom metadata

## sys.databases: the built-in metadata catalog

`sys.databases` is a system catalog view with one row per database on the instance, and
columns covering nearly everything you've configured so far: `recovery_model_desc`,
`compatibility_level`, `state_desc`, `is_read_only`, `create_date`, `collation_name`, and
many more. It's the first place to check when you need to audit configuration across every
database on an instance at once.

```sql
SELECT name, recovery_model_desc, state_desc, compatibility_level, is_read_only
FROM sys.databases;
```

## DATABASEPROPERTYEX: one property, one database

When you need a single property for a single, specific database — often from inside a
script or a conditional check — `DATABASEPROPERTYEX()` is the function for that:

```sql
SELECT DATABASEPROPERTYEX('Sales', 'Recovery Model');   -- e.g. 'FULL'
SELECT DATABASEPROPERTYEX('Sales', 'IsAutoShrink');       -- 0 or 1
SELECT DATABASEPROPERTYEX('Sales', 'Status');              -- e.g. 'ONLINE'
```

## sp_addextendedproperty: metadata SQL Server doesn't track natively

SQL Server has no built-in column for "which team owns this database" or "what
data-classification level does this database hold." `sp_addextendedproperty` lets you
attach arbitrary name/value pairs as metadata to the database itself, or to any object
inside it:

```sql
EXEC sp_addextendedproperty
    @name = N'Owner',
    @value = N'Finance Reporting Team';

EXEC sp_addextendedproperty
    @name = N'DataClassification',
    @value = N'Confidential';
```

Called with no `@level0type`/`@level1type` arguments, the property attaches at the
database level itself. Query what's been attached with the `sys.extended_properties`
catalog view or the `fn_listextendedproperty` function.

## Key terms

| Term | Meaning |
|---|---|
| sys.databases | Catalog view with one row per database, covering most built-in configuration |
| DATABASEPROPERTYEX() | Function returning one named property for one specific database |
| sp_addextendedproperty | Stored procedure attaching custom name/value metadata to a database or object |
| sys.extended_properties | Catalog view for querying metadata added with sp_addextendedproperty |

## Check yourself

You need to document, inside SQL Server itself, which business team owns each database on
a shared instance — with no dedicated column for that anywhere in `sys.databases`. What
tool would you use, and how would you query the result back later?
