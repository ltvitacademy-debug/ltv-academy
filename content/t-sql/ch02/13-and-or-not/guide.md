# Lesson 13 — AND, OR, NOT

**Chapter 2 · Filtering and Sorting · Lesson 3 of 10**

## What you'll learn

- Combining multiple conditions with `AND` and `OR`
- Negating a condition with `NOT`
- Why parentheses matter once `AND` and `OR` mix
- Reading a compound condition correctly

## AND — every condition must be true

```sql
USE AdventureWorks2012;
GO

SELECT Name, Color, ListPrice
FROM Production.Product
WHERE Color = 'Red' AND ListPrice > 100;
```

A row only survives if **both** conditions are true. Chain as many `AND`s
together as you need — every single one must hold.

## OR — at least one condition must be true

```sql
SELECT Name, Color
FROM Production.Product
WHERE Color = 'Red' OR Color = 'Blue';
```

A row survives if **at least one** condition is true. This row doesn't need
to be both red and blue — just one or the other.

## NOT — flips a condition

```sql
SELECT Name, Color
FROM Production.Product
WHERE NOT Color = 'Red';
```

`NOT` inverts whatever follows it. `NOT Color = 'Red'` means "where color is
*not* red" — functionally the same as `Color <> 'Red'` here, but `NOT` is
especially useful in front of more complex conditions later in this course
(like `NOT EXISTS` in Chapter 6).

## Mixing AND and OR needs parentheses

This is the single biggest source of filtering bugs in real T-SQL code.
`AND` binds tighter than `OR`, so without parentheses, this doesn't mean what
it looks like it means:

```sql
-- Looks like: (Red or Blue) AND expensive
-- Actually means: Red, OR (Blue AND expensive)
SELECT Name, Color, ListPrice
FROM Production.Product
WHERE Color = 'Red' OR Color = 'Blue' AND ListPrice > 500;
```

Because `AND` evaluates first, every **red** product is included regardless
of price — only the **blue** ones are actually filtered by price. Add
parentheses to say exactly what you mean:

```sql
SELECT Name, Color, ListPrice
FROM Production.Product
WHERE (Color = 'Red' OR Color = 'Blue') AND ListPrice > 500;
```

Now both colors are subject to the price filter. **Rule of thumb: whenever
you mix `AND` and `OR` in the same condition, use parentheses — always.**

## Key terms

| Term | Meaning |
|---|---|
| `AND` | Both conditions must be true |
| `OR` | At least one condition must be true |
| `NOT` | Inverts the condition that follows it |
| Operator precedence | `AND` evaluates before `OR` unless parentheses say otherwise |

## Lab

Run this, then add parentheses and compare the row count that comes back:

```sql
SELECT Name, Color, ListPrice
FROM Production.Product
WHERE Color = 'Red' OR Color = 'Blue' AND ListPrice > 500;

SELECT Name, Color, ListPrice
FROM Production.Product
WHERE (Color = 'Red' OR Color = 'Blue') AND ListPrice > 500;
```

## Check yourself

You're ready for Lesson 14 when you can answer, without looking: which
evaluates first, `AND` or `OR`, and why should you always use parentheses
when mixing them?
