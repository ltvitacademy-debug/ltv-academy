# Lookup Function Decision Cheat Sheet

Compiled from Chapter 2 (Lookup & Reference Functions). Keep this next to you the first few times
you inherit a workbook full of someone else's lookups.

## The three real options, side by side

| | VLOOKUP | INDEX/MATCH | XLOOKUP |
|---|---|---|---|
| Can look left? | No — lookup column must be leftmost | Yes — lookup and return ranges are independent | Yes — `lookup_array`/`return_array` are independent |
| Exact match default | No — defaults to approximate; must pass `FALSE` | `MATCH`'s `0` is the exact-match equivalent | Yes — exact match by default |
| Survives inserted columns? | No — `col_index_num` shifts silently | Yes — ranges are explicit, not positional | Yes — `return_array` is its own reference |
| Two-way lookup (row + column) | Not natively | Yes — nest a second `MATCH` for the other axis | Only by nesting one XLOOKUP inside another |
| Available in older Excel | Yes — every version | Yes — back to the 1990s | No — Excel 365 / 2021+ only |

## VLOOKUP's two real gotchas

```
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

1. `col_index_num` is a hardcoded position. Insert a column anywhere inside the table array and
   every VLOOKUP referencing it silently pulls from the wrong column — no error, just a wrong
   answer that still looks plausible.
2. `range_lookup` defaults to approximate match (`TRUE`) when omitted. For anything needing an
   exact match — an ID, a SKU, a name — pass `FALSE` explicitly. Forgetting this is the single
   most common cause of a VLOOKUP returning a wrong-but-plausible value instead of an error.

## INDEX/MATCH, when you need it over XLOOKUP

```
=INDEX(ReturnColumn, MATCH(id, IDColumn, 0))
```

Still the right call when: the workbook must open correctly in an Excel version older than 365/2021,
or you need a true two-way lookup (nest a second `MATCH`, one per axis):

```
=INDEX(DataGrid, MATCH(region, RegionCol, 0), MATCH(month, MonthRow, 0))
```

## XLOOKUP, the current default for everything else

```
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])
```

Fixes VLOOKUP's two gotchas directly (`return_array` is its own reference; exact match by default)
and adds a built-in fallback value with `if_not_found`, replacing a separate `IFERROR`/`IFNA` wrap
for the "no match" case specifically.

## Error handling on any lookup

```
=IFNA(VLOOKUP(id, Table, 3, FALSE), "Not found")
```

Use `IFNA`, not `IFERROR`, by default. `#N/A` ("no match") is expected and should show a clean
fallback; `#REF!`/`#VALUE!`/`#NAME?` mean something is actually broken and should stay visible so
it gets fixed — `IFERROR` hides both under the identical message, which is how a broken formula
stops getting noticed.

## The two questions to ask about any inherited lookup

1. Does the 4th argument (VLOOKUP) or the match-type argument (MATCH) exist, and is it set for an
   exact match?
2. Has a column ever been inserted into the range this formula points at?

## Related course material

- Lesson 5 — VLOOKUP vs. XLOOKUP
- Lesson 6 — INDEX/MATCH
- Lesson 7 — Combining Lookups
- Lesson 8 — Error Handling With IFERROR
