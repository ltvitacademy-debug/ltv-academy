# Lesson 16 — DELETE FROM

**Chapter 2 · Writing Data: INSERT, UPDATE, DELETE · Lesson 6 of 8**

## What you'll learn

- The basic `DELETE FROM ... WHERE` syntax for removing rows
- Why a `DELETE` with no `WHERE` clause removes every row
- Deleting rows based on a join to a second table
- A safety habit: preview with `SELECT` before you `DELETE`

## The basic DELETE statement

`DELETE FROM` removes entire rows from a table — it doesn't change
values the way `UPDATE` does, it removes the row completely:

```sql
DELETE FROM dbo.LessonDemo
WHERE Color = 'Discontinued';
```

Every row where `Color` equals `'Discontinued'` is removed from
`dbo.LessonDemo`; every other row is untouched. Notice `DELETE FROM`
never names which columns to remove — you can't delete part of a row,
only the whole row.

## No WHERE deletes every row

Just like `UPDATE`, omitting `WHERE` is legal and removes **every** row
in the table:

```sql
-- Removes EVERY row in the table -- table structure stays, data doesn't
DELETE FROM dbo.LessonDemo;
```

The table itself still exists afterward — its columns, constraints, and
`IDENTITY` definition are unchanged — but it now has zero rows. This is
exactly the kind of statement where you should run the equivalent
`SELECT` first to confirm which rows you're about to remove.

## Previewing before you delete

Before running a `DELETE`, run the same condition as a `SELECT` to see
exactly which rows will disappear:

```sql
-- Preview first
SELECT *
FROM dbo.LessonDemo
WHERE ListPrice < 500;

-- Then delete, once you've confirmed the row set
DELETE FROM dbo.LessonDemo
WHERE ListPrice < 500;
```

Because `DELETE` is permanent (there's no `SELECT`-style preview built
into the statement itself), this two-step habit — look, then act — is the
single best protection against deleting the wrong rows.

## Deleting based on a join

Like `UPDATE`, `DELETE` can use a `FROM ... JOIN` to decide which rows to
remove based on matching data in a second table:

```sql
DELETE d
FROM dbo.LessonDemo AS d
JOIN Production.Product AS p
    ON d.ProductName = p.Name
WHERE p.ProductLine <> 'R';
```

This deletes rows from `dbo.LessonDemo` wherever the matching real
product's `ProductLine` is **not** `'R'`. As with the joined `UPDATE`,
the alias (`d`) goes right after `DELETE`, and the real table and join
are defined in the `FROM` clause.

## Key terms

| Term | Meaning |
|---|---|
| `DELETE FROM` | Removes whole rows from a table; never removes individual columns |
| `WHERE` (in `DELETE`) | Decides which rows are removed; omit it and every row is removed |
| Preview-then-delete | Running the matching `SELECT` before the `DELETE` to confirm the row set |

## Lab

Run the preview `SELECT` above against `dbo.LessonDemo` for
`ListPrice < 500`, review the rows, then run the matching `DELETE`.
Confirm with a final `SELECT *` that only those rows are gone.

## Check yourself

You're ready for Lesson 17 when you can explain why running the
equivalent `SELECT` before a `DELETE` is good practice, and what remains
of a table after `DELETE FROM <table>;` with no `WHERE` clause.
