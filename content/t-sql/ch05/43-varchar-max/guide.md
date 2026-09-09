# Lesson 43 — VARCHAR(MAX)

**Chapter 5 · Data Types, Strings, and Dates · Lesson 3 of 11**

## What you'll learn

- `VARCHAR(MAX)` — for text without a practical length limit
- The old `TEXT` type, and why `VARCHAR(MAX)` replaced it
- Why you shouldn't default to `MAX` for everything
- `NVARCHAR(MAX)` — the Unicode equivalent

## The limit of a declared length

`VARCHAR(n)` caps out at `n` characters — and the hard ceiling for a
specific numeric length is 8,000. That's plenty for names and addresses,
but nowhere near enough for something like a product description, a blog
post body, or a customer support ticket's full text.

## VARCHAR(MAX) — practically unlimited

```sql
-- Illustrative column definition:
-- ProductDescription VARCHAR(MAX)
```

`VARCHAR(MAX)` can store up to **2 GB** of text — for practical purposes,
unlimited. It behaves like `VARCHAR` in every other respect: variable
length, storing only what's actually used.

## Why not just use MAX everywhere?

If `MAX` can hold anything, why declare a specific length at all? Two
reasons:

- **A declared length is documentation.** `VARCHAR(50)` for a `FirstName`
  column tells the next developer "this is genuinely bounded" — `MAX`
  tells them nothing about the expected size.
- **Storage engines handle large values differently.** `VARCHAR(MAX)`
  values can be stored off-row once they exceed a certain size, which has
  real (if usually minor) performance implications compared to smaller,
  in-row `VARCHAR(n)` columns.

**Use `MAX` when the content is genuinely unbounded** (descriptions,
comments, article bodies). **Use a specific length** when the content has
a real-world maximum (names, codes, short labels).

## NVARCHAR(MAX)

Just like `VARCHAR` has a Unicode counterpart in `NVARCHAR`,
`VARCHAR(MAX)` has `NVARCHAR(MAX)` — unlimited-length text with full
Unicode support, for genuinely large international text content.

## A brief note on TEXT

Older SQL Server code sometimes uses a type called `TEXT` for large text.
`TEXT` is **deprecated** — `VARCHAR(MAX)` replaced it years ago and should
always be used in new code instead.

## Key terms

| Term | Meaning |
|---|---|
| `VARCHAR(MAX)` | Variable-length text up to ~2 GB |
| `NVARCHAR(MAX)` | Variable-length Unicode text up to ~2 GB |
| `TEXT` | Deprecated predecessor to `VARCHAR(MAX)` — avoid in new code |

## Lab

In AdventureWorks2012, find a column declared as a large text type — check
`Production.ProductDescription.Description` in Object Explorer — and note
its exact data type.

## Check yourself

You're ready for Lesson 44 when you can answer, without looking: what's
the practical size limit of `VARCHAR(MAX)`, and why shouldn't you just use
`MAX` for every text column?
