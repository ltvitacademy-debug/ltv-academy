# Lesson 16 — Handling NULL (IS NULL / IS NOT NULL)

**Chapter 2 · Filtering and Sorting · Lesson 6 of 10**

## What you'll learn

- What `NULL` actually means
- Why `= NULL` never works
- `IS NULL` and `IS NOT NULL`
- `ISNULL()` and `COALESCE()` for substituting default values

## What is NULL?

`NULL` means **unknown** or **not applicable** — not zero, not an empty
string, not "nothing." It's the absence of a value entirely. A product with
no `Color` recorded has `NULL` in that column, not the text `'NULL'` or an
empty string `''`.

## Why = NULL doesn't work

This is one of the most common beginner mistakes in all of SQL:

```sql
-- This returns ZERO rows, even if MiddleName is NULL for many people
SELECT FirstName, MiddleName
FROM Person.Person
WHERE MiddleName = NULL;
```

`NULL` represents an unknown value — and an unknown value can't be said to
*equal* anything, not even another `NULL`. `= NULL` always evaluates to
unknown (treated as false), never true, so this query silently returns
nothing.

## The correct way: IS NULL

```sql
USE AdventureWorks2012;
GO

SELECT FirstName, MiddleName
FROM Person.Person
WHERE MiddleName IS NULL;
```

`IS NULL` is special syntax built specifically to test for `NULL` — it's
not a comparison operator, so it works correctly where `=` cannot.

## IS NOT NULL

```sql
SELECT FirstName, MiddleName
FROM Person.Person
WHERE MiddleName IS NOT NULL;
```

## Substituting a default value: ISNULL()

Sometimes you don't want to filter `NULL` out — you want to *replace* it
with something readable:

```sql
SELECT FirstName,
       ISNULL(MiddleName, '(none)') AS MiddleName
FROM Person.Person;
```

`ISNULL(column, replacement)` returns the column's value if it's not
`NULL`, or the replacement if it is.

## COALESCE() — ISNULL's more flexible cousin

`COALESCE()` does the same job but accepts **any number** of arguments,
returning the first one that isn't `NULL`:

```sql
SELECT FirstName,
       COALESCE(MiddleName, LastName, '(unknown)') AS DisplayName
FROM Person.Person;
```

This tries `MiddleName` first; if that's `NULL`, it falls back to
`LastName`; if *that's* somehow `NULL` too, it falls back to the literal
text. `COALESCE()` is also the ANSI-standard function, so it's preferred
when you need more than two fallback values.

## Key terms

| Term | Meaning |
|---|---|
| `NULL` | Unknown or not applicable — the absence of a value |
| `IS NULL` / `IS NOT NULL` | The only correct way to test for `NULL` |
| `ISNULL(col, replacement)` | Substitutes a default for `NULL`, two arguments |
| `COALESCE(a, b, c, ...)` | Returns the first non-`NULL` argument, any number of arguments |

## Lab

Run each of these against AdventureWorks2012:

```sql
SELECT FirstName, MiddleName FROM Person.Person WHERE MiddleName IS NULL;
SELECT FirstName, ISNULL(MiddleName, '(none)') AS MiddleName FROM Person.Person;
```

## Check yourself

You're ready for Lesson 17 when you can answer, without looking: why does
`WHERE MiddleName = NULL` never return any rows, and what's the difference
between `ISNULL()` and `COALESCE()`?
