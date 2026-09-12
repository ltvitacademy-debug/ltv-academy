# Lesson 35 — String Calculations

**Chapter 6 · Calculated Fields · Lesson 3 of 7**

## What you'll learn

- How to concatenate text fields together with `+`
- Tableau's core string functions: `LEFT`, `RIGHT`, `MID`, `LEN`
- How to search and replace inside a string with `CONTAINS` and
  `REPLACE`
- How `UPPER`, `LOWER`, and `TRIM` clean up messy text fields

## Concatenating strings

Tableau treats `+` as string concatenation whenever both sides are
text, not numbers:

```
Full Name =
[First Name] + " " + [Last Name]
```

That builds one combined text field out of two others, with a literal
space in between. Any text in double quotes — like `" "` — is a
literal string you're inserting directly into the result.

## Extracting pieces of a string

Three functions cover most "give me part of this text" needs:

| Function | What it does |
|---|---|
| `LEFT(string, num_chars)` | The first `num_chars` characters |
| `RIGHT(string, num_chars)` | The last `num_chars` characters |
| `MID(string, start, [length])` | Characters starting at position `start`, optionally limited to `length` |
| `LEN(string)` | The total number of characters in `string` |

```
Order Year =
LEFT([Order ID], 4)
```

Sample Superstore's `Order ID` field looks like `CA-2017-152156` — the
region code, a year, and a sequence number, all in one string. `LEFT`
pulls the region code with `LEFT([Order ID], 2)`; a `MID` starting
just past the first dash pulls the year.

## Searching and replacing

`CONTAINS` answers a yes/no question about whether a substring
appears anywhere inside a string — genuinely useful inside an `IF`
(covered fully in Lesson 37):

```
Is Furniture Order =
CONTAINS([Category], "Furniture")
```

`REPLACE` swaps one substring for another wherever it appears:

```
Clean Region =
REPLACE([Region], "Central", "Midwest")
```

## Cleaning up text with UPPER, LOWER, and TRIM

Real-world text data is rarely consistent — the same category might
show up as `"Furniture"`, `"furniture"`, and `"FURNITURE "` (with a
trailing space) across different rows from different sources. Three
functions normalize that:

```
Clean Category =
TRIM(UPPER([Category]))
```

`UPPER` forces everything to capitals, `LOWER` forces everything to
lowercase, and `TRIM` strips leading and trailing whitespace. Wrapping
one inside another — as above — is completely normal and often
necessary together.

## Key terms

| Term | Meaning |
|---|---|
| Concatenation | Joining two or more strings together with `+` |
| `LEFT` / `RIGHT` / `MID` | Functions that extract a substring from the start, end, or middle of a string |
| `CONTAINS` | Returns `TRUE`/`FALSE` based on whether a substring appears anywhere in a string |
| `TRIM` | Removes leading and trailing whitespace from a string |

## Lab

1. On **Sample Superstore**, create `Full Name = [First Name] + " " +
   [Last Name]` — if that field doesn't exist, use `Customer Name`
   split with `LEFT`/`RIGHT`/`SPLIT` instead to extract a first name.
2. Create `Order Year = LEFT([Order ID], ...)` matching the actual
   position of the year inside your `Order ID` values — inspect a few
   real values first with `LEN([Order ID])` to confirm positions.
3. Create `Is Furniture Order = CONTAINS([Category], "Furniture")`
   and drop it on a filter shelf to confirm it returns `TRUE`/`FALSE`
   correctly.

## Check yourself

You're ready for Lesson 36 when you can write a `LEFT` or `RIGHT`
formula from memory to pull a fixed-length substring, and explain the
difference between `CONTAINS` and `REPLACE`.
