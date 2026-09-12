# Lesson 6 — INDEX/MATCH

**Chapter 2 · Lookup & Reference Functions · Lesson 6 of 25**

## What you'll learn

- INDEX and MATCH individually, and how combining them replicates
  (and exceeds) what VLOOKUP does
- Why INDEX/MATCH predates XLOOKUP by decades and still shows up in
  real workbooks
- The specific situations where INDEX/MATCH still beats XLOOKUP today

## INDEX and MATCH, separately

`INDEX` returns the value at a given row/column position inside a
range:

```
=INDEX(array, row_num, [col_num])
```

`MATCH` returns the **position** of a value inside a range — not the
value itself:

```
=MATCH(lookup_value, lookup_array, [match_type])
```

Neither is useful alone for a lookup, but together they do the whole
job: `MATCH` finds *where* the value lives, and `INDEX` fetches
*what's actually stored* at that position.

## Combining them

```
=INDEX(ReturnColumn, MATCH(id, IDColumn, 0))
```

This finds `id`'s position in `IDColumn` using `MATCH` (the `0` means
exact match, the same idea as VLOOKUP's `FALSE`), then hands that
position straight to `INDEX` to fetch the matching value out of
`ReturnColumn`. The lookup column and the return column are two
completely independent ranges — which means, like XLOOKUP, this can
look left, right, or anywhere else, because nothing requires them to
be adjacent or in any particular order.

## Why this still matters after XLOOKUP exists

Three concrete reasons this isn't a fossil:

1. **Version compatibility.** INDEX/MATCH works in every Excel version
   back to the 1990s. XLOOKUP requires Excel 365 or 2021+. A workbook
   that has to run correctly on an older install has no XLOOKUP
   option at all.
2. **Two-way lookups.** `MATCH` can find a position in a row just as
   easily as a column, which means nesting a second `MATCH` inside
   `INDEX` finds a value at the intersection of a row *and* a column —
   covered fully in Lesson 7.
3. **It's everywhere in inherited workbooks.** Any analyst working with
   files built before 2019 will run into INDEX/MATCH constantly — you
   need to be able to read it fluently even in a shop that's fully
   switched to XLOOKUP for new work.

## Key terms

| Term | Meaning |
|---|---|
| `INDEX` | Returns the value at a given position inside a range |
| `MATCH` | Returns the position of a value inside a range, not the value itself |
| `match_type` `0` | MATCH's exact-match mode — the equivalent of VLOOKUP's `FALSE` |
| Two-way lookup | Finding a value at the intersection of a specific row and column — MATCH nested inside INDEX for each axis |

## Lab

1. Write a `MATCH` formula alone and confirm it returns a position
   number, not the actual value.
2. Wrap it in `INDEX` against a different column and confirm it now
   returns the real value.
3. Rebuild the same lookup you wrote for VLOOKUP in Lesson 5 as
   INDEX/MATCH, and confirm both return identical results.

## Check yourself

You're ready for Lesson 7 when you can explain, in one sentence, what
job `MATCH` does and what job `INDEX` does — separately, before they're
combined.
