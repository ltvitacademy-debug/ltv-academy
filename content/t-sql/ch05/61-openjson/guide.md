# Lesson 63 — OPENJSON

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 21 of 22**

## What you'll learn

- `OPENJSON`: parsing a JSON string back into a rowset
- The default output schema (`key`, `value`, `type`) vs. an explicit
  `WITH` clause
- Why `OPENJSON` and `FOR JSON` are exact reverses of each other
- A realistic use: accepting a JSON array as a parameter

## Default OPENJSON output: key, value, type

```sql
DECLARE @Json NVARCHAR(MAX) = N'["Red", "Blue", "Black"]';

SELECT *
FROM OPENJSON(@Json);
```

Without a `WITH` clause, `OPENJSON` always returns three columns: `key`,
`value`, and `type`. For a JSON array like this one, `key` is the
0-based index of each element, and `value` is the element itself.

## Parsing a JSON array of objects, with an explicit schema

```sql
DECLARE @Json NVARCHAR(MAX) = N'[
  {"ProductID": 1, "Name": "Adjustable Race"},
  {"ProductID": 2, "Name": "Bearing Ball"}
]';

SELECT ProductID, Name
FROM OPENJSON(@Json)
WITH (
    ProductID INT           '$.ProductID',
    Name      NVARCHAR(50)  '$.Name'
);
```

A `WITH` clause gives you real, typed column names instead of the generic
`key`/`value`/`type` shape — each line pairs a column name and type with
a JSON path describing where to find that value inside each array
element.

## The reverse operation, side by side

```sql
-- FOR JSON turns rows INTO a JSON string:
SELECT TOP 2 ProductID, Name FROM Production.Product FOR JSON PATH;

-- OPENJSON turns a JSON string BACK INTO rows:
DECLARE @Json NVARCHAR(MAX) =
    (SELECT TOP 2 ProductID, Name FROM Production.Product FOR JSON PATH);

SELECT ProductID, Name
FROM OPENJSON(@Json)
WITH (ProductID INT '$.ProductID', Name NVARCHAR(50) '$.Name');
```

## A realistic use: a JSON array as a parameter

```sql
DECLARE @ProductIdsJson NVARCHAR(MAX) = N'[1, 2, 3, 316]';

SELECT p.ProductID, p.Name, p.ListPrice
FROM Production.Product AS p
JOIN OPENJSON(@ProductIdsJson) WITH (ProductID INT '$') AS j
    ON j.ProductID = p.ProductID;
```

This is a common, modern pattern for passing a list into a stored
procedure as a single JSON string parameter — an alternative to
Lesson 61's `STRING_SPLIT` on a comma-separated string, or a full
table-valued parameter.

## Key terms

| Term | Meaning |
|---|---|
| `OPENJSON(jsonExpression)` | Table-valued function that parses a JSON string into a rowset |
| `WITH` clause (JSON path) | Gives OPENJSON typed, named columns instead of the default key/value/type shape |

## Lab

Run the default `OPENJSON` array example above, then the explicit-schema
object example, and compare the columns each one produces.

## Check yourself

You're ready for Lesson 64 when you can answer, without looking: what
are the three default columns `OPENJSON` returns without a `WITH` clause,
and what does adding `WITH` let you do instead?
