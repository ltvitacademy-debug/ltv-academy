# Lesson 8 — Error Handling With IFERROR

**Chapter 2 · Lookup & Reference Functions · Lesson 8 of 25**

## What you'll learn

- How `IFERROR` wraps a formula to replace any error with a fallback
  value
- Why `IFNA` — which catches *only* `#N/A` — is often the more correct
  choice than `IFERROR` for a lookup
- The real analyst mistake: silently hiding every error type,
  including ones that mean the formula itself is broken

## Wrapping a lookup in IFERROR

```
=IFERROR(VLOOKUP(id,Table,3,FALSE), "Not found")
```

`IFERROR` evaluates the first argument, and if it returns *any* error
value — `#N/A`, `#REF!`, `#VALUE!`, `#DIV/0!`, `#NAME?` — it returns
the second argument instead. This is genuinely useful for a report
going to someone who shouldn't see raw error codes.

## The real mistake: catching every error, not just the expected one

Here's the problem `IFERROR` alone creates. `#N/A` from a lookup
means "no match found" — a legitimate, expected outcome for some rows.
But `#REF!`, `#VALUE!`, and `#NAME?` mean something is actually
**broken**: a deleted column, a text value where a number was
expected, a misspelled function name. `IFERROR` cannot tell these
apart — it silently replaces a genuine bug with the same friendly
"Not found" text it uses for a normal missing match, which means the
broken formula never gets fixed because it never visibly fails again.

## IFNA: catching only the expected error

```
=IFNA(VLOOKUP(id,Table,3,FALSE), "Not found")
```

`IFNA` catches `#N/A` specifically and lets every other error type
display normally. This is the more honest choice for a lookup: a
missing match is expected and should show a clean fallback, but a
`#REF!` from a column someone deleted should stay loud and visible so
it actually gets noticed and fixed — instead of quietly wearing the
same "Not found" label forever.

## The practical rule

Use `IFNA` by default on a lookup, specifically because "no match"
and "something is broken" are different problems that deserve
different treatment. Reach for `IFERROR` only when you genuinely want
*any* error type suppressed — which is a narrower, less common case
than it might first seem, and worth pausing on rather than reaching
for automatically.

## Key terms

| Term | Meaning |
|---|---|
| `IFERROR` | Replaces any error value (of any type) with a fallback |
| `IFNA` | Replaces only `#N/A` with a fallback, leaving other errors visible |
| `#N/A` | The error a lookup returns for "no match found" — usually expected |
| `#REF!` / `#VALUE!` / `#NAME?` | Errors that usually mean something is actually broken, not just missing |

## Lab

1. Build a VLOOKUP that fails with `#N/A` on a genuinely missing ID,
   and wrap it in `IFERROR`.
2. Now break the same formula a different way — delete a column it
   references so it returns `#REF!` — and confirm `IFERROR` hides that
   too, with the identical "Not found" message.
3. Replace `IFERROR` with `IFNA` and confirm the `#REF!` now displays
   normally instead of being hidden.

## Check yourself

You're ready to move to Chapter 3 when you can explain, in your own
words, why hiding every error type is a real analyst mistake — not
just a stylistic preference.
