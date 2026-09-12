# Lesson 5 — VLOOKUP vs. XLOOKUP

**Chapter 2 · Lookup & Reference Functions · Lesson 5 of 25**

## What you'll learn

- VLOOKUP's syntax and the two mistakes that cause most of its
  real-world failures
- XLOOKUP's syntax, and the specific problems it was built to fix
- Why XLOOKUP isn't just "VLOOKUP with a nicer name" — it can look
  left, which VLOOKUP structurally cannot do

## VLOOKUP: the classic, and its two real gotchas

```
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

VLOOKUP searches the **first column** of `table_array` and returns a
value from `col_index_num` columns to the right. Two specific
behaviors cause the majority of VLOOKUP problems in real workbooks:

1. **`col_index_num` is a hardcoded position, not a column name.**
   Insert a new column anywhere inside the table array and every
   VLOOKUP referencing it now pulls from the wrong column — silently,
   with no error, because 4 is still a valid column number, just the
   wrong one now.
2. **`range_lookup` defaults to approximate match (`TRUE`) if you
   omit it.** For anything that needs an exact match — an ID, a SKU, a
   name — you must explicitly pass `FALSE` (or `0`). Forgetting this
   is the single most common cause of a VLOOKUP that returns a
   plausible-looking but wrong answer instead of an error.

And VLOOKUP can only look **right**: the lookup column must be the
leftmost column of `table_array`. If the value you want to search by
sits to the right of the value you want to return, VLOOKUP cannot do
it at all without rearranging the source data first.

## XLOOKUP: what it actually fixes

```
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])
```

XLOOKUP replaces the column-index-number problem entirely:
`return_array` is its own column reference, so inserting a column
elsewhere in the sheet can't silently shift which column comes back.
It also defaults to **exact match** — no `FALSE` to remember — and
`lookup_array` and `return_array` are independent references, which
means XLOOKUP can look **left** just as easily as right: the value you
search by doesn't have to be left of the value you want back.

The optional `if_not_found` argument replaces wrapping the whole thing
in `IFERROR` (Lesson 8) for the specific case of a missing value —
`=XLOOKUP(A2,ID,Name,"Not found")` returns that string directly
instead of `#N/A`.

## The real comparison

| | VLOOKUP | XLOOKUP |
|---|---|---|
| Can look left? | No — lookup column must be leftmost | Yes — lookup and return columns are independent |
| Exact match default | No — defaults to approximate; must pass `FALSE` | Yes — exact match by default |
| Survives inserted columns? | No — `col_index_num` shifts silently | Yes — `return_array` is its own reference |
| Available in older Excel? | Yes — every version | No — Excel 365 / 2021+ only |

That last row is why VLOOKUP isn't obsolete: if a workbook has to open
correctly in an older Excel install, XLOOKUP simply isn't there yet.

## Key terms

| Term | Meaning |
|---|---|
| `col_index_num` | VLOOKUP's hardcoded column-position argument — breaks silently when columns are inserted |
| `range_lookup` | VLOOKUP's 4th argument; must be `FALSE`/`0` for an exact match |
| Look left | Returning a value from a column to the left of the lookup column — impossible in VLOOKUP, native in XLOOKUP |
| `if_not_found` | XLOOKUP's built-in replacement value for a failed match |

## Lab

1. Build a small ID/Name table and write a VLOOKUP against it with no
   4th argument. Confirm it can return a wrong-but-plausible value for
   an ID that isn't an exact match.
2. Fix it by adding `FALSE` as the 4th argument.
3. Rewrite the same lookup as an XLOOKUP, then try making it look
   left — search by Name, return the ID — and confirm VLOOKUP cannot
   do this without rearranging columns first.

## Check yourself

You're ready for Lesson 6 when you can state, without checking, the
two questions to ask about any VLOOKUP you inherit: does the 4th
argument exist, and has a column ever been inserted into its range.
