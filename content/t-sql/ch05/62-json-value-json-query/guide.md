# Lesson 64 — JSON_VALUE and JSON_QUERY

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 22 of 22**

## What you'll learn

- `JSON_VALUE`: pulling one scalar value out of a JSON string by path
- `JSON_QUERY`: pulling out a JSON fragment (an object or array) instead
- Why `JSON_VALUE` returns `NULL` on a non-scalar path
- Wrapping up Chapter 6

## JSON_VALUE: one scalar value, by path

```sql
DECLARE @Json NVARCHAR(MAX) = N'{
  "ProductID": 1,
  "Name": "Adjustable Race",
  "Tags": ["bike", "component"],
  "Vendor": {"Name": "Contoso", "City": "Redmond"}
}';

SELECT
    JSON_VALUE(@Json, '$.Name') AS ProductName,
    JSON_VALUE(@Json, '$.Vendor.City') AS VendorCity;
```

`$.Name` and `$.Vendor.City` are JSON path expressions — `$` is the root
of the document, and dots walk down into nested objects. `JSON_VALUE`
digs through that path and returns a single scalar value: text, a
number, or a boolean.

## JSON_VALUE on a non-scalar path: NULL, not an error

```sql
SELECT JSON_VALUE(@Json, '$.Tags') AS AttemptOnArray;
-- Returns NULL -- $.Tags points to an array, not a scalar, and
-- JSON_VALUE only ever returns a single scalar value.
```

`$.Tags` points at an array, not a plain value — so `JSON_VALUE` can't
represent it as a scalar and quietly returns `NULL` instead.

## JSON_QUERY: pull out the fragment instead

```sql
SELECT
    JSON_QUERY(@Json, '$.Tags') AS TagsArray,
    JSON_QUERY(@Json, '$.Vendor') AS VendorObject;
```

`JSON_QUERY` is built for exactly the case `JSON_VALUE` can't handle: it
returns the object or array at the given path as a JSON fragment — still
JSON text, not a plain scalar. Use `JSON_VALUE` for a single value, and
`JSON_QUERY` any time the path points at an object or array you need
intact.

## Using both together against real query output

```sql
USE AdventureWorks2012;
GO

DECLARE @ProductJson NVARCHAR(MAX) =
    (SELECT TOP 1 ProductID, Name, Color, ListPrice
     FROM Production.Product
     ORDER BY ProductID
     FOR JSON PATH, WITHOUT_ARRAY_WRAPPER);

SELECT
    JSON_VALUE(@ProductJson, '$.Name') AS ProductName,
    JSON_VALUE(@ProductJson, '$.ListPrice') AS ListPriceAsText;
```

This ties the chapter's `FOR JSON` and `JSON_VALUE` together: a real
query's output, turned into a single JSON object, then read back out one
value at a time.

## Chapter 6 recap

You now have the full modern T-SQL toolkit for `NULL`s, conditional
values, safe type conversion, and JSON. `COALESCE` and `NULLIF` handle
defaults and divide-by-zero-style guards; `IIF` and `CHOOSE` give you
compact conditionals; `TRY_CAST`/`TRY_CONVERT` convert data without
crashing a batch; `STRING_AGG`/`STRING_SPLIT` join and split text; and
`FOR JSON`/`OPENJSON`/`JSON_VALUE`/`JSON_QUERY` move data in and out of
JSON. Chapter 7 moves into subqueries, CTEs, and views — building queries
out of other queries, starting with single-value subqueries.

## Key terms

| Term | Meaning |
|---|---|
| `JSON_VALUE(jsonExpr, path)` | Returns one scalar value at the given JSON path; NULL on a non-scalar path |
| `JSON_QUERY(jsonExpr, path)` | Returns a JSON object or array fragment at the given path |

## Lab

Run the `JSON_VALUE`/`JSON_QUERY` pair against the sample `@Json` above,
then run the real-query version against AdventureWorks2012, and confirm
which function you'd need for the nested `Vendor` object versus a plain
string value like `Name`.

## Check yourself

You're ready for Chapter 7 when you can answer, without looking: why does
`JSON_VALUE(@Json, '$.Tags')` return `NULL` here, and which function —
`JSON_VALUE` or `JSON_QUERY` — would you use to pull out the `Vendor`
object intact?
