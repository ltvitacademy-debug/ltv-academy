# Lesson 47 — TRIM, LTRIM, RTRIM

**Chapter 5 · Data Types, Strings, and Dates · Lesson 7 of 11**

## What you'll learn

- `LTRIM()` and `RTRIM()` — removing leading/trailing spaces
- `TRIM()` — both at once
- Where messy whitespace actually comes from
- Why trimming matters for comparisons and `LEN()`

## LTRIM and RTRIM

```sql
SELECT LTRIM('   Hello') AS LeftTrimmed;   -- 'Hello'
SELECT RTRIM('Hello   ') AS RightTrimmed;  -- 'Hello'
```

`LTRIM()` removes spaces from the **left** (leading) side of a string.
`RTRIM()` removes spaces from the **right** (trailing) side. Neither
touches spaces in the middle of the string.

## TRIM — both at once

```sql
USE AdventureWorks2012;
GO

SELECT TRIM('   Hello   ') AS BothTrimmed; -- 'Hello'
```

`TRIM()` is shorthand for doing `LTRIM(RTRIM(...))` — removing leading
**and** trailing whitespace in a single call. Before `TRIM()` was added to
T-SQL, developers had to nest `LTRIM` and `RTRIM` together to get the same
result; `TRIM()` is simply the cleaner, modern way to write it.

## Where messy whitespace comes from

Real-world data is rarely as clean as a hand-written example. Whitespace
typically creeps in from:
- Copy-pasted data from spreadsheets or web forms
- User-entered form fields (someone accidentally hits spacebar)
- Data imported from external systems with different formatting habits

## Why it matters

Untrimmed whitespace causes two real problems:

```sql
-- These look identical but WON'T match without trimming
SELECT * FROM Person.Person WHERE FirstName = 'John ';  -- trailing space
```

A trailing space makes `'John '` and `'John'` **different** strings for
exact-match comparison, even though they look identical on screen.
Trimming before comparing (or before storing) avoids this entire class of
bug.

## Key terms

| Term | Meaning |
|---|---|
| `LTRIM()` | Removes leading (left-side) spaces |
| `RTRIM()` | Removes trailing (right-side) spaces |
| `TRIM()` | Removes both leading and trailing spaces |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT FirstName, LEN(FirstName) AS RawLength, LEN(TRIM(FirstName)) AS TrimmedLength
FROM Person.Person
WHERE LEN(FirstName) <> LEN(TRIM(FirstName));
```

(If this returns zero rows, that's good news — it means AdventureWorks2012
has no stray whitespace in `FirstName`.)

## Check yourself

You're ready for Lesson 48 when you can answer, without looking: what's
the difference between `LTRIM`, `RTRIM`, and `TRIM`, and why can a trailing
space break an exact-match comparison?
