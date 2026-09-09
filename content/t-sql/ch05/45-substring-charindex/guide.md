# Lesson 45 — SUBSTRING and CHARINDEX

**Chapter 5 · Data Types, Strings, and Dates · Lesson 5 of 11**

## What you'll learn

- `SUBSTRING()` — extracting part of a string
- `CHARINDEX()` — finding where a character or substring appears
- Combining both to extract a piece of dynamic length

## SUBSTRING — extracting a fixed piece

```sql
USE AdventureWorks2012;
GO

SELECT ProductNumber, SUBSTRING(ProductNumber, 1, 2) AS Prefix
FROM Production.Product;
```

`SUBSTRING(string, start, length)` takes three arguments: the string
itself, the **1-based** starting position (the first character is position
`1`, not `0`), and how many characters to pull. This extracts the first 2
characters of `ProductNumber`.

## CHARINDEX — finding a position

```sql
SELECT FirstName, CHARINDEX('a', FirstName) AS FirstAPosition
FROM Person.Person;
```

`CHARINDEX(searchFor, searchIn)` returns the **1-based position** of the
first occurrence of `searchFor` inside `searchIn` — or `0` if it isn't
found at all. Note: `0`, not `NULL` — this is a genuinely different signal
than the `NULL` "unknown" you learned in Chapter 2, so don't confuse "not
found" (`0`) with "value unknown" (`NULL`).

## Combining them: dynamic-length extraction

The real power shows up when you combine the two — using `CHARINDEX` to
**find** a position, then feeding that into `SUBSTRING` to extract
everything up to it:

```sql
SELECT EmailAddress,
       SUBSTRING(EmailAddress, 1, CHARINDEX('@', EmailAddress) - 1) AS Username
FROM Person.EmailAddress;
```

`CHARINDEX('@', EmailAddress)` finds where `@` sits; subtracting `1` gives
the length of everything **before** it; `SUBSTRING` then extracts exactly
that — the username portion of an email address, regardless of how long it
is.

## Key terms

| Term | Meaning |
|---|---|
| `SUBSTRING(string, start, length)` | Extracts `length` characters starting at position `start` (1-based) |
| `CHARINDEX(searchFor, searchIn)` | Returns the 1-based position of the first match, or `0` if not found |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT EmailAddress,
       SUBSTRING(EmailAddress, 1, CHARINDEX('@', EmailAddress) - 1) AS Username,
       SUBSTRING(EmailAddress, CHARINDEX('@', EmailAddress) + 1, LEN(EmailAddress)) AS Domain
FROM Person.EmailAddress;
```

## Check yourself

You're ready for Lesson 46 when you can answer, without looking: is
`SUBSTRING`'s starting position 0-based or 1-based, and what does
`CHARINDEX` return when it doesn't find a match?
