# Lesson 17 — TRUNCATE TABLE vs. DELETE

**Chapter 2 · Writing Data: INSERT, UPDATE, DELETE · Lesson 7 of 8**

## What you'll learn

- The `TRUNCATE TABLE` statement and how it differs from `DELETE`
- Why `TRUNCATE TABLE` can't use a `WHERE` clause
- How `TRUNCATE TABLE` resets an `IDENTITY` column, and `DELETE` doesn't
- Why this chapter practices on a scratch table instead of real tables

## TRUNCATE TABLE empties a table completely

`TRUNCATE TABLE` removes every row from a table in one step — there's no
`WHERE` clause, and there can't be one:

```sql
TRUNCATE TABLE dbo.LessonDemo;
```

Compare that to the equivalent `DELETE`, which produces the same end
result — zero rows — but works differently under the hood:

```sql
DELETE FROM dbo.LessonDemo;
```

Both statements leave `dbo.LessonDemo` empty, with its columns,
constraints, and definition intact. The difference is in how they get
there and in a few side effects that matter.

## No WHERE clause, ever

`TRUNCATE TABLE` only ever removes **every** row — it has no `WHERE`
clause option at all:

```sql
-- Valid: empties the whole table
TRUNCATE TABLE dbo.LessonDemo;

-- INVALID -- TRUNCATE TABLE cannot filter rows
-- TRUNCATE TABLE dbo.LessonDemo WHERE Color = 'Red';
```

If you need to remove only some rows, `DELETE FROM ... WHERE` is the only
option — `TRUNCATE TABLE` is strictly an all-or-nothing operation on the
whole table.

## TRUNCATE TABLE resets IDENTITY; DELETE doesn't

This is the difference that trips people up most. Insert a few rows,
delete them all, and insert again:

```sql
DELETE FROM dbo.LessonDemo;

INSERT INTO dbo.LessonDemo (ProductName, ListPrice)
VALUES ('New Row', 10.00);
-- ProductID continues from where it left off, e.g. 7, not 1
```

Now compare with `TRUNCATE TABLE`:

```sql
TRUNCATE TABLE dbo.LessonDemo;

INSERT INTO dbo.LessonDemo (ProductName, ListPrice)
VALUES ('New Row', 10.00);
-- ProductID restarts at 1
```

`DELETE` removes rows but leaves the `IDENTITY` counter exactly where it
was. `TRUNCATE TABLE` resets that counter back to the seed value, so the
next inserted row starts numbering over from the beginning.

## Why this matters for choosing between them

Neither statement is "better" — they solve different problems:

- Use `DELETE FROM ... WHERE` when you need to remove a **subset** of
  rows, or when you need the `IDENTITY` sequence to keep climbing.
- Use `TRUNCATE TABLE` when you genuinely want to **empty the whole
  table** and don't care about (or specifically want) the `IDENTITY`
  counter resetting.

## Why you've been using a scratch table all chapter

This is also exactly why this chapter has had you practicing `INSERT`,
`UPDATE`, and `DELETE` against `dbo.LessonDemo` instead of a real
AdventureWorks2012 table like `Production.Product`. A mistaken
`DELETE FROM Production.Product;` or `TRUNCATE TABLE Production.Product;`
with no safety net would wipe out real shared sample data that other
students — and other lessons in this course — depend on. Practicing
destructive statements on a table you created yourself, and can simply
re-create if something goes wrong, is the safe habit to keep.

## Key terms

| Term | Meaning |
|---|---|
| `TRUNCATE TABLE` | Removes all rows from a table; cannot take a `WHERE` clause |
| `IDENTITY` reset | `TRUNCATE TABLE` resets the identity seed; `DELETE` does not |
| Scratch table | A table you create yourself to safely practice destructive statements |

## Lab

Re-create `dbo.LessonDemo`, insert three rows, note the `ProductID`
values, then run `DELETE FROM dbo.LessonDemo;` and insert one more row —
observe the `ProductID`. Repeat the whole thing but use
`TRUNCATE TABLE dbo.LessonDemo;` instead of `DELETE`, and compare the new
`ProductID`.

## Check yourself

You're ready for Lesson 18 when you can explain the two concrete
differences between `TRUNCATE TABLE` and `DELETE FROM` covered in this
lesson.
