# Lesson 55 — ISNULL vs. COALESCE

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 13 of 22**

## What you'll learn

- `ISNULL`'s syntax: exactly two arguments, T-SQL only
- `COALESCE`'s syntax: any number of arguments, ANSI SQL standard
- The real gotcha: `ISNULL`'s result type comes from its **first**
  argument; `COALESCE` follows standard data type precedence
- A concrete example where that difference causes silent truncation

## Two ways to say "if NULL, use this instead"

On the surface, `ISNULL` and `COALESCE` look interchangeable:

```sql
USE AdventureWorks2012;
GO

SELECT
    BusinessEntityID,
    ISNULL(MiddleName, '') AS MiddleNameOrBlank
FROM Person.Person;
```

Compare that to `COALESCE(MiddleName, '')` from Lesson 54 — here, with a
simple two-value case, the output looks identical. The differences only
show up once you look closer.

## ISNULL: exactly two arguments, T-SQL only

`ISNULL` never takes more than two arguments. Where `COALESCE` can chain
any number of fallbacks in one call, `ISNULL` has to be nested to do the
same job:

```sql
-- ISNULL only ever takes two arguments.
-- To fall through THREE candidates, you have to nest it:
SELECT ISNULL(pp.PhoneNumber, ISNULL(ea.EmailAddress, 'No contact on file')) AS BestContact
FROM Person.Person AS p
LEFT JOIN Person.PersonPhone AS pp ON pp.BusinessEntityID = p.BusinessEntityID
LEFT JOIN Person.EmailAddress AS ea ON ea.BusinessEntityID = p.BusinessEntityID;
```

`COALESCE(pp.PhoneNumber, ea.EmailAddress, 'No contact on file')` does the
same thing in one flat call. `ISNULL` doesn't scale past two arguments.

## The real gotcha: return type

This is the detail that makes this a classic, genuinely tricky interview
topic: `ISNULL`'s result type is based on its **first** argument's
declared type, no matter what the second argument is. `COALESCE` instead
follows standard SQL **data type precedence** across all of its arguments
— the result type is wide enough to hold whichever argument has the
highest-precedence type.

```sql
DECLARE @ShortCode VARCHAR(5) = NULL;

-- ISNULL's result type is VARCHAR(5) -- the FIRST argument's declared
-- type -- so the replacement value gets silently truncated to fit it:
SELECT ISNULL(@ShortCode, 'This is a much longer fallback string') AS IsNullResult;
-- Result: 'This '

-- COALESCE follows data type precedence across ALL arguments, so the
-- result type is wide enough to hold the longer string untouched:
SELECT COALESCE(@ShortCode, 'This is a much longer fallback string') AS CoalesceResult;
-- Result: 'This is a much longer fallback string'
```

Nothing here raises an error or even a warning — `ISNULL` just quietly
cuts the string off at 5 characters because that's the type it inherited
from `@ShortCode`. This is exactly the kind of bug that slips through code
review and only gets noticed once real data is longer than whatever test
value someone happened to use.

## Standard vs. proprietary

`COALESCE` is part of the ANSI SQL standard, so the same expression works
(with the same behavior) in Oracle, PostgreSQL, and other ANSI-compliant
databases. `ISNULL` is T-SQL-specific — SQL Server only. Other platforms
have their own, differently-named equivalents (Oracle's `NVL`, MySQL's
`IFNULL`), which is one more reason `COALESCE` is the safer default when
portability matters.

## Key terms

| Term | Meaning |
|---|---|
| `ISNULL(expr1, expr2)` | T-SQL-only, exactly two arguments; result type comes from expr1's declared type |
| `COALESCE(expr1, ..., exprN)` | ANSI standard, any number of arguments; result type follows data type precedence across all arguments |
| Data type precedence | The ANSI rule for which type "wins" when combining mixed-type expressions |

## Lab

Run the `@ShortCode` example above exactly as written. Confirm `ISNULL`
truncates the fallback string to 5 characters while `COALESCE` returns it
in full.

## Check yourself

You're ready for Lesson 56 when you can answer, without looking: why can
`ISNULL(@ShortCode, 'a much longer string')` silently truncate its result
when `COALESCE` with the same two arguments doesn't, and which of the two
is the ANSI-standard function?
