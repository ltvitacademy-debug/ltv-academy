# Lesson 46 — STUFF vs. REPLACE

**Chapter 5 · Data Types, Strings, and Dates · Lesson 6 of 11**

## What you'll learn

- `REPLACE()` — swapping every occurrence of a substring
- `STUFF()` — replacing a piece by **position**, not by matching text
- Why they solve genuinely different problems

## REPLACE — swap by matching text

```sql
USE AdventureWorks2012;
GO

SELECT PhoneNumber, REPLACE(PhoneNumber, '-', '.') AS DottedPhone
FROM Person.PersonPhone;
```

`REPLACE(string, findThis, replaceWithThis)` finds **every** occurrence of
`findThis` inside `string` and swaps it for `replaceWithThis`. It has no
concept of position — it matches purely on the text itself, wherever it
appears, however many times.

## STUFF — replace by position

```sql
SELECT ProductNumber, STUFF(ProductNumber, 1, 2, 'XX') AS Masked
FROM Production.Product;
```

`STUFF(string, start, length, replaceWith)` deletes `length` characters
starting at position `start` (1-based, same as `SUBSTRING`), and inserts
`replaceWith` in their place. It has **no concept of matching text at
all** — it operates purely on **position**, regardless of what characters
happen to be there.

## The key difference

| | Matches on | Use it when... |
|---|---|---|
| `REPLACE` | The **text itself**, wherever it occurs | You know **what** to replace, not where |
| `STUFF` | A **position and length**, regardless of content | You know **where** to replace, not necessarily what's there |

A concrete example of why this matters: masking a phone number's middle
digits with `REPLACE` would require you to already know the digits to
replace them — impossible, since they're different every time. `STUFF`
solves this because it only needs a **position**:

```sql
SELECT PhoneNumber, STUFF(PhoneNumber, 5, 3, '***') AS MaskedPhone
FROM Person.PersonPhone;
```

This masks whatever three characters sit at position 5, regardless of
what digits they actually are.

## Key terms

| Term | Meaning |
|---|---|
| `REPLACE(string, find, replaceWith)` | Swaps every occurrence of matching text |
| `STUFF(string, start, length, replaceWith)` | Swaps a piece by position, regardless of content |

## Lab

Run both of these against AdventureWorks2012 and compare the results:

```sql
SELECT PhoneNumber, REPLACE(PhoneNumber, '555', '***') AS Attempt1
FROM Person.PersonPhone;

SELECT PhoneNumber, STUFF(PhoneNumber, 1, 3, '***') AS Attempt2
FROM Person.PersonPhone;
```

## Check yourself

You're ready for Lesson 47 when you can answer, without looking: does
`REPLACE` operate on position or matching text, and which function would
you use to mask characters whose content varies from row to row?
