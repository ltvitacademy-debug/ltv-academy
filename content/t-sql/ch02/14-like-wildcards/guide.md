# Lesson 14 — LIKE and Wildcards

**Chapter 2 · Filtering and Sorting · Lesson 4 of 10**

## What you'll learn

- Pattern matching with `LIKE`
- The four wildcard characters: `%`, `_`, `[ ]`, `[^ ]`
- Combining wildcards for real-world searches
- `NOT LIKE`

## Why LIKE?

`=` only matches an exact value. `LIKE` matches a **pattern**, using
wildcard characters to stand in for unknown parts of a string.

## The % wildcard — any number of characters

```sql
USE AdventureWorks2012;
GO

SELECT FirstName, LastName
FROM Person.Person
WHERE LastName LIKE 'Sm%';
```

`%` matches zero or more of *any* character. `'Sm%'` matches `Smith`,
`Smart`, `Sm`, and anything else starting with `Sm`. Put `%` on both sides
to match anywhere in the string:

```sql
SELECT FirstName, LastName
FROM Person.Person
WHERE LastName LIKE '%son%';
```

This finds `Johnson`, `Sondheim`, `Wilson` — anything containing `son`
anywhere at all.

## The _ wildcard — exactly one character

```sql
SELECT Name, ProductNumber
FROM Production.Product
WHERE ProductNumber LIKE 'BK-_ _ _ _';
```

Each underscore stands for **exactly one** character — no more, no fewer.
`'BK-____' `matches a `BK-` prefix followed by exactly four more
characters.

## [ ] — a character from a set

```sql
SELECT FirstName, LastName
FROM Person.Person
WHERE LastName LIKE '[CK]ing';
```

`[CK]` matches a single character that is *either* `C` or `K`. This matches
`Cing` or `King`, but nothing else.

You can also specify a range: `[A-M]` matches any single letter from `A`
through `M`.

## [^ ] — NOT a character from a set

```sql
SELECT FirstName, LastName
FROM Person.Person
WHERE LastName LIKE '[^A-M]%';
```

The `^` inside the brackets negates the set — this matches any last name
that does **not** start with a letter from A through M.

## NOT LIKE

Just like any condition, `LIKE` can be negated:

```sql
SELECT FirstName, LastName
FROM Person.Person
WHERE LastName NOT LIKE 'Sm%';
```

## Key terms

| Wildcard | Meaning |
|---|---|
| `%` | Zero or more of any character |
| `_` | Exactly one of any character |
| `[ ]` | One character from the listed set (or range) |
| `[^ ]` | One character NOT in the listed set |

## Lab

Run each of these against AdventureWorks2012 and describe in one sentence
what each pattern actually matches:

```sql
SELECT LastName FROM Person.Person WHERE LastName LIKE 'Mc%';
SELECT LastName FROM Person.Person WHERE LastName LIKE '%ll%';
SELECT LastName FROM Person.Person WHERE LastName LIKE '[AEIOU]%';
```

## Check yourself

You're ready for Lesson 15 when you can answer, without looking: what's the
difference between `%` and `_`, and what does `[^A-M]` mean?
