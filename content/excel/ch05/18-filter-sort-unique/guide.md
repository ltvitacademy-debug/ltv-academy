# Lesson 18 — FILTER, SORT & UNIQUE

**Chapter 5 · Dynamic Arrays & Modern Excel · Lesson 18 of 25**

## What you'll learn

- The real syntax for `FILTER`, `SORT`, and `UNIQUE`
- How to nest them inside each other — the pattern that makes them
  genuinely useful
- Where each one beats an AutoFilter or a helper-column approach

## FILTER — return only the rows that match

```
=FILTER(array, include, [if_empty])
```

`array` is the range to pull from, `include` is a boolean condition
built from a *different* range the same height as `array`, and the
optional `if_empty` is what to show if nothing matches (leave it out
and a no-match result throws `#CALC!`, since Excel can't spill an
empty array).

![The formula =FILTER(A5:D20,C5:C20=H2) returning every East/Apple-region row, spilled into F5:I8.](/courses/excel/ch05/18-filter-sort-unique/filter-apple-example.png)
*The condition range (C5:C20) doesn't have to be part of what you return — here it drives which rows of A5:D20 spill out.*
Source: [Microsoft Support — FILTER function](https://support.microsoft.com/en-us/office/filter-function-f4f7cb66-82eb-4767-8f7c-4877ad80c759)

Combine conditions with `*` for AND, `+` for OR — no need for a
helper column:

```
=FILTER(A5:D20,(C5:C20="Apple")*(A5:A20="East"))
=FILTER(A5:D20,(C5:C20="Apple")+(A5:A20="East"))
```

## SORT — reorder an array without touching the source

```
=SORT(array, [sort_index], [sort_order], [by_col])
```

`sort_index` is the column (or row, if `by_col` is TRUE) to sort by —
1 for the first column of `array`, not the sheet's column A.
`sort_order` is `1` for ascending (the default) or `-1` for descending.

```
=SORT(D2:D11,1,-1)
```

## UNIQUE — distinct values, not a helper report

```
=UNIQUE(array, [by_col], [exactly_once])
```

Set `exactly_once` to TRUE and `UNIQUE` returns only the values that
appear **exactly one time** — genuinely different from "distinct
values," and useful for finding one-off entries a normal dedupe would
keep alongside their duplicates.

## Nesting them together

This is where these three earn their place in the chapter — wrap one
inside another and you get in a single cell what used to take a
helper column plus a PivotTable:

![=SORT(UNIQUE(B2:B17)) — a distinct, alphabetized list of names spilled straight into column D.](/courses/excel/ch05/18-filter-sort-unique/unique-with-sort.jpg)
*Read it inside-out: UNIQUE runs first, producing a deduplicated array that SORT then reorders — no intermediate cell ever exists on the sheet.*
Source: [Microsoft Support — UNIQUE function](https://support.microsoft.com/en-us/office/unique-function-c5ab87fd-30a3-4ce9-9d1a-40204fb85e1e)

```
=SORT(UNIQUE(B2:B17))
=SORT(FILTER(A5:D20,C5:C20="Apple"),4,-1)
```

The second line filters to Apple rows, then sorts what's left by
column 4 (Units) descending — a filtered *and* ranked result, still
one formula.

## Key terms

| Term | Meaning |
|---|---|
| `include` argument | FILTER's boolean condition array — same height as the data, built from a separate range |
| `sort_index` | Which column/row of the array SORT sorts by (1 = the array's own first column, not sheet column A) |
| `exactly_once` | UNIQUE's optional argument that returns only values with no duplicates at all |
| Nesting | Passing one dynamic array function's spilled result directly as another's argument |

## Lab

1. Build `=FILTER(A5:D20,C5:C20=H2,"No matches")` against a small
   table with a product name typed into `H2`.
2. Wrap it in `SORT` to rank the filtered rows by a numeric column,
   descending.
3. In an empty column, run `=SORT(UNIQUE(<any text column>))` and
   confirm it spills an alphabetized, deduplicated list.

## Check yourself

You're ready for Lesson 19 when nesting `SORT(UNIQUE(...))` or
`SORT(FILTER(...))` reads naturally to you, inside-out, as one
formula rather than a chain of separate steps.
