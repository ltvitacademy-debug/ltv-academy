# Lesson 41 — CHAR vs. VARCHAR

**Chapter 5 · Data Types, Strings, and Dates · Lesson 1 of 11**

## What you'll learn

- `CHAR(n)` — fixed-length text storage
- `VARCHAR(n)` — variable-length text storage
- Why the wrong choice wastes space or causes silent truncation
- When to use each

## CHAR — fixed length

`CHAR(n)` always stores **exactly** `n` characters — SQL Server pads
shorter values with trailing spaces to fill the declared length:

```sql
-- Illustrative column definitions:
-- StatusCode CHAR(2)   -- always exactly 2 characters, e.g. 'OK', 'NA'
-- CountryCode CHAR(3)  -- always exactly 3 characters, e.g. 'USA', 'GBR'
```

If you store `'OK'` in a `CHAR(5)` column, it's actually stored as
`'OK   '` — `'OK'` plus three trailing spaces — to reach exactly 5
characters. `CHAR` allocates that full length on disk **regardless** of how
much text is actually stored.

## VARCHAR — variable length

`VARCHAR(n)` stores **only as many characters as you actually give it**,
up to a maximum of `n`, plus a small overhead to track the actual length:

```sql
-- FirstName VARCHAR(50)  -- stores anywhere from 0 to 50 characters,
--                           using only the space actually needed
```

A 3-character name in a `VARCHAR(50)` column uses roughly 3 characters of
storage, not 50 — unlike `CHAR`, which would pad it out.

## Why this matters

- Use **`CHAR`** for values that are genuinely **fixed-length** in the real
  world — country codes, fixed status codes, state abbreviations. Storage
  is predictable and slightly faster to scan.
- Use **`VARCHAR`** for anything that **varies in length** — names,
  addresses, descriptions, most real text. This is the overwhelmingly
  common choice.

Using `CHAR` for variable-length data wastes space (and can introduce
subtle bugs from trailing spaces when comparing values). Using `VARCHAR`
for genuinely fixed-length data adds a small, usually negligible amount of
overhead — the mistake in that direction is much less costly.

## Both share a length limit

Whichever you choose, exceeding the declared length **truncates** the
value (or raises an error, depending on server settings) rather than
silently growing the column — a common source of unexpected data loss when
a column is declared too short for real-world input.

## Key terms

| Term | Meaning |
|---|---|
| `CHAR(n)` | Fixed-length text, padded with spaces to exactly `n` characters |
| `VARCHAR(n)` | Variable-length text, up to `n` characters, using only the space needed |

## Lab

Look up the data type of `Person.Person.FirstName` and
`Person.Address.StateProvinceCode` in AdventureWorks2012 (via Object
Explorer → table → Columns), and explain in one sentence why each was
declared the way it was.

## Check yourself

You're ready for Lesson 42 when you can answer, without looking: what does
SQL Server do with a `'OK'` stored in a `CHAR(5)` column, and why is
`VARCHAR` the right default for most real-world text?
