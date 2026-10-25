# Lesson 62 — FOR JSON (AUTO and PATH)

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 20 of 22**

## What you'll learn

- Turning query results into a JSON string with `FOR JSON`
- `FOR JSON AUTO`: nesting inferred automatically from the table/join
  shape
- `FOR JSON PATH`: explicit control via dotted column aliases
- `WITHOUT_ARRAY_WRAPPER`, for a single JSON object instead of an array

## FOR JSON AUTO: let SQL Server infer the shape

```sql
USE AdventureWorks2012;
GO

SELECT TOP 3 ProductID, Name, Color, ListPrice
FROM Production.Product
FOR JSON AUTO;
```

`FOR JSON AUTO` turns the whole result set into a single JSON array, one
JSON object per row, using the column names (or aliases) as the keys.

## AUTO infers nesting from a join

```sql
SELECT TOP 3
    p.Name AS ProductName,
    psc.Name AS SubcategoryName
FROM Production.Product AS p
JOIN Production.ProductSubcategory AS psc
    ON psc.ProductSubcategoryID = p.ProductSubcategoryID
FOR JSON AUTO;
```

With a join involved, `AUTO` nests the second table's columns as a
sub-object automatically, based on the order the tables appear in
`FROM`/`JOIN` — no explicit instruction needed, but also no control over
the exact shape beyond rearranging the query itself.

## FOR JSON PATH: explicit control with dotted aliases

```sql
SELECT TOP 3
    p.ProductID,
    p.Name AS [Product.Name],
    p.ListPrice AS [Product.Price],
    psc.Name AS [Product.Subcategory]
FROM Production.Product AS p
JOIN Production.ProductSubcategory AS psc
    ON psc.ProductSubcategoryID = p.ProductSubcategoryID
FOR JSON PATH;
```

With `PATH`, a dotted alias like `[Product.Name]` becomes a nested JSON
object — `{"Product": {"Name": ..., "Price": ..., "Subcategory": ...}}` —
regardless of how the join is written. You control the exact output
structure directly through the aliases, instead of relying on SQL
Server's inference.

## Dropping the array wrapper for a single row

```sql
SELECT TOP 1 ProductID, Name, ListPrice
FROM Production.Product
ORDER BY ProductID
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER;
```

By default, `FOR JSON` always wraps its output in a `[ ]` array, even for
a single row. `WITHOUT_ARRAY_WRAPPER` strips that wrapper, returning a
plain JSON object — useful when you know the result is exactly one row
and the array brackets would just get in the way.

## Key terms

| Term | Meaning |
|---|---|
| `FOR JSON AUTO` | Converts results to JSON, inferring nesting from the table/join shape |
| `FOR JSON PATH` | Converts results to JSON, with nesting controlled explicitly by dotted column aliases |
| `WITHOUT_ARRAY_WRAPPER` | Removes the default `[ ]` array wrapper, for a single JSON object |

## Lab

Run the `AUTO` and `PATH` join examples above against AdventureWorks2012
and compare the nested JSON shape each one produces.

## Check yourself

You're ready for Lesson 63 when you can answer, without looking: what's
the core difference in how `AUTO` and `PATH` decide the JSON structure,
and what does `WITHOUT_ARRAY_WRAPPER` do?
