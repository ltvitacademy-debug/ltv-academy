# Lesson 54 — COALESCE

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 12 of 22**

## What you'll learn

- What `COALESCE` does: returns the first non-`NULL` value from a list
- `COALESCE` accepts any number of arguments
- Using it to supply fallback/default values
- Using it to protect arithmetic from `NULL`

## The problem: NULLs showing up where you want a real value

Plenty of real columns are legitimately `NULL` sometimes — a missing
middle name, a customer with no phone on file. Displaying a raw `NULL` is
rarely what a report should do.

```sql
USE AdventureWorks2012;
GO

SELECT BusinessEntityID, FirstName, MiddleName, LastName
FROM Person.Person
WHERE MiddleName IS NULL;
```

## COALESCE: the first non-NULL value wins

```sql
SELECT
    BusinessEntityID,
    FirstName,
    COALESCE(MiddleName, '') AS MiddleNameOrBlank,
    LastName
FROM Person.Person;
```

`COALESCE` checks its arguments left to right and returns the first one
that isn't `NULL`. Here, if `MiddleName` has a real value, that's what you
get; if it's `NULL`, you get the empty string instead.

## COALESCE takes any number of arguments

This is where `COALESCE` goes beyond a simple two-way fallback — you can
chain as many candidate values as you need, in priority order:

```sql
SELECT
    p.BusinessEntityID,
    COALESCE(pp.PhoneNumber, ea.EmailAddress, 'No contact on file') AS BestContact
FROM Person.Person AS p
LEFT JOIN Person.PersonPhone AS pp ON pp.BusinessEntityID = p.BusinessEntityID
LEFT JOIN Person.EmailAddress AS ea ON ea.BusinessEntityID = p.BusinessEntityID;
```

SQL Server checks `PhoneNumber` first. If that's `NULL` (no phone row),
it checks `EmailAddress`. If that's also `NULL`, it falls all the way back
to the literal string. Only when every single argument is `NULL` does
`COALESCE` itself return `NULL`.

## COALESCE in calculations

`NULL` propagates through arithmetic — `NULL + anything` is `NULL`. Wrap a
possibly-`NULL` operand in `COALESCE` to keep a calculation from silently
turning into `NULL`:

```sql
SELECT
    SalesOrderID,
    TotalDue,
    COALESCE(Freight, 0) AS FreightOrZero
FROM Sales.SalesOrderHeader;
```

## Key terms

| Term | Meaning |
|---|---|
| `COALESCE(expr1, expr2, ...)` | Returns the first non-NULL expression from the list; NULL only if every argument is NULL |

## Lab

Run the `BestContact` query above against AdventureWorks2012. Find a
`BusinessEntityID` with no row in `Person.PersonPhone` and confirm
`COALESCE` falls through to the email address (or the literal fallback
string if neither exists).

## Check yourself

You're ready for Lesson 55 when you can answer, without looking: in what
order does `COALESCE` check its arguments, and when is the only time it
returns `NULL` itself?
