# Lesson 6 — String Concatenation with +

**Chapter 1 · T-SQL Foundations · Lesson 6 of 10**

## What you'll learn

- Joining strings together with the `+` operator
- Mixing literal text with column values
- Why concatenating a `NULL` produces `NULL` — and the `CONCAT()` fix
- Combining concatenation with an alias

## Joining strings with +

T-SQL uses `+` to glue strings together — this is called **concatenation**:

```sql
USE AdventureWorks2012;
GO

SELECT FirstName + ' ' + LastName AS FullName
FROM Person.Person;
```

This builds one combined string per row: the first name, a literal space
(`' '`), then the last name — aliased as `FullName` so the result has a
readable header.

## Mixing literal text with columns

You can weave any literal text into the concatenation, not just a single
space:

```sql
SELECT 'Customer: ' + FirstName + ' ' + LastName AS Label
FROM Person.Person;
```

Every piece — the literal text and the column values — gets glued together
in the order you write it.

## The NULL trap

Here's a gotcha every T-SQL developer hits eventually: if **any** piece
being concatenated with `+` is `NULL`, the **entire result** becomes `NULL`.

```sql
SELECT FirstName + ' ' + MiddleName + ' ' + LastName AS FullName
FROM Person.Person;
```

If `MiddleName` is `NULL` for a row (most people don't have one on file),
the whole `FullName` comes back `NULL` — even though `FirstName` and
`LastName` both had real values.

The fix is the `CONCAT()` function, which treats `NULL` as an empty string
instead of poisoning the whole result:

```sql
SELECT CONCAT(FirstName, ' ', MiddleName, ' ', LastName) AS FullName
FROM Person.Person;
```

We'll cover `NULL` handling in depth in Chapter 2 — for now, just remember:
`+` propagates `NULL`; `CONCAT()` doesn't.

## Key terms

| Term | Meaning |
|---|---|
| Concatenation | Joining strings together into one |
| `+` | The string concatenation operator in T-SQL |
| `CONCAT()` | A function that concatenates and treats `NULL` as an empty string |

## Lab

Run both of these against AdventureWorks2012 and compare the results for
rows where `MiddleName` is `NULL`:

```sql
SELECT FirstName + ' ' + MiddleName + ' ' + LastName AS Version1
FROM Person.Person;

SELECT CONCAT(FirstName, ' ', MiddleName, ' ', LastName) AS Version2
FROM Person.Person;
```

## Check yourself

You're ready for Lesson 7 when you can answer, without looking: what happens
when you concatenate a `NULL` with `+`, and what function avoids that
problem?
