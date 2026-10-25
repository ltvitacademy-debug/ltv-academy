# Lesson 59 — TRY_CAST and TRY_CONVERT

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 17 of 22**

## What you'll learn

- A reminder: what plain `CAST`/`CONVERT` do when a conversion fails
  (Lesson 61's `CAST`/`CONVERT`)
- `TRY_CAST` and `TRY_CONVERT`: returning `NULL` instead of raising an
  error
- Using them to validate or clean data instead of crashing a batch
- Spotting failed conversions with `IS NULL`

## A reminder: CAST and CONVERT can fail hard

```sql
USE AdventureWorks2012;
GO

-- This raises a conversion error and stops the batch:
SELECT CAST('not a number' AS INT);
-- Msg 245: Conversion failed when converting the varchar value
-- 'not a number' to data type int.
```

Plain `CAST` and `CONVERT` are all-or-nothing: either the conversion
succeeds, or SQL Server throws an error and the batch stops right there.

## TRY_CAST: NULL instead of an error

```sql
SELECT TRY_CAST('not a number' AS INT) AS Attempt1,
       TRY_CAST('123' AS INT) AS Attempt2;
-- Attempt1 is NULL (would have failed); Attempt2 is 123
```

`TRY_CAST` attempts the exact same conversion as `CAST`. If it would
succeed, you get the converted value, same as always. If it would fail,
you get `NULL` instead of an error — the query keeps running.

## TRY_CONVERT works the same way, with CONVERT's style argument

```sql
SELECT TRY_CONVERT(DATE, '2014-06-15') AS ValidDate,
       TRY_CONVERT(DATE, 'not a date') AS InvalidDate;
-- ValidDate: 2014-06-15; InvalidDate: NULL
```

`TRY_CONVERT` is to `CONVERT` exactly what `TRY_CAST` is to `CAST` —
same signature (including `CONVERT`'s optional style number), same
graceful `NULL`-on-failure behavior.

## A real use: finding values that don't survive a real conversion

`Person.PersonPhone.PhoneNumber` stores phone numbers with punctuation —
not pure digits. Stripping the common separators and trying `TRY_CAST`
reveals which stored numbers are purely numeric once cleaned, and which
still have something else mixed in (an extension, letters, unexpected
formatting):

```sql
SELECT PhoneNumber,
       TRY_CAST(REPLACE(REPLACE(REPLACE(PhoneNumber, '-', ''), '(', ''), ')', '') AS BIGINT)
           AS DigitsOnly
FROM Person.PersonPhone
WHERE TRY_CAST(REPLACE(REPLACE(REPLACE(PhoneNumber, '-', ''), '(', ''), ')', '') AS BIGINT) IS NULL;
```

Every row this query returns is a phone number that, even after
stripping dashes and parentheses, still couldn't convert cleanly to a
plain number — exactly the rows you'd want to flag before trusting that
column as numeric.

## Key terms

| Term | Meaning |
|---|---|
| `TRY_CAST(expr AS type)` | Like CAST, but returns NULL instead of raising an error on a failed conversion |
| `TRY_CONVERT(type, expr [, style])` | Like CONVERT, but returns NULL instead of raising an error on a failed conversion |

## Lab

Run the basic `TRY_CAST`/`TRY_CONVERT` literal examples above. Then run
the `PhoneNumber` query against `Person.PersonPhone` in AdventureWorks2012
and review whatever rows come back.

## Check yourself

You're ready for Lesson 60 when you can answer, without looking: what do
`TRY_CAST` and `TRY_CONVERT` return on a failed conversion, and what does
the exact same failing conversion do under plain `CAST`/`CONVERT` instead?
