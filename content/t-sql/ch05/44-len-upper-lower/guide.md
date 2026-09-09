# Lesson 44 — LEN, UPPER, LOWER

**Chapter 5 · Data Types, Strings, and Dates · Lesson 4 of 11**

## What you'll learn

- `LEN()` — the length of a string
- `UPPER()` / `LOWER()` — changing case
- A common gotcha: `LEN()` and trailing spaces
- Combining these with `WHERE` and `CASE`

## LEN — string length

```sql
USE AdventureWorks2012;
GO

SELECT FirstName, LEN(FirstName) AS NameLength
FROM Person.Person;
```

`LEN()` returns the number of characters in a string — straightforward for
most use cases, useful for finding unusually short or long values, or
validating data.

## The trailing-space gotcha

`LEN()` **ignores trailing spaces** when counting — this can be surprising:

```sql
SELECT LEN('Hello   ') AS Length; -- returns 5, not 8
```

Leading spaces **do** count; trailing ones don't. This rarely matters with
`VARCHAR` data (which doesn't naturally have trailing spaces), but it's a
real trap if you're working with `CHAR` columns from Lesson 41 — remember,
`CHAR` pads with trailing spaces, and `LEN()` will not count that padding.

## UPPER and LOWER — changing case

```sql
SELECT UPPER(FirstName) AS UpperName, LOWER(FirstName) AS LowerName
FROM Person.Person;
```

`UPPER()` converts every letter to uppercase; `LOWER()` converts every
letter to lowercase. Neither changes the underlying data — like every
function you've used, they only affect the query's **output**.

## A practical use: case-insensitive comparison

Most SQL Server setups already compare text case-insensitively by default
(Lesson 11), but when you need to **guarantee** it regardless of server
settings, `UPPER()`/`LOWER()` make the comparison explicit:

```sql
SELECT FirstName, LastName
FROM Person.Person
WHERE UPPER(LastName) = UPPER('smith');
```

## Key terms

| Term | Meaning |
|---|---|
| `LEN()` | Character count, ignoring trailing spaces |
| `UPPER()` | Converts text to uppercase |
| `LOWER()` | Converts text to lowercase |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT FirstName, LEN(FirstName) AS NameLength, UPPER(FirstName) AS Shout
FROM Person.Person
ORDER BY NameLength DESC;
```

## Check yourself

You're ready for Lesson 45 when you can answer, without looking: does
`LEN()` count trailing spaces, and why does that matter more for `CHAR`
columns than `VARCHAR`?
