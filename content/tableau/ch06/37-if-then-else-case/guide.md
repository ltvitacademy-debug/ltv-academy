# Lesson 37 — IF, THEN, ELSE & CASE

**Chapter 6 · Calculated Fields · Lesson 5 of 7**

## What you'll learn

- The full `IF`/`THEN`/`ELSEIF`/`ELSE`/`END` syntax
- Why every `IF` calculation must end with `END`
- The `CASE`/`WHEN`/`END` syntax, and when it's the better choice
- How to decide between `IF` and `CASE` for a given formula

## The IF / THEN / ELSE structure

Tableau's conditional logic reads close to plain English, with one
rule that trips up almost everyone the first time: **every `IF` block
must end with the keyword `END`.**

```
Profitability =
IF [Profit] > 0 THEN "Profitable"
ELSEIF [Profit] = 0 THEN "Break Even"
ELSE "Loss"
END
```

Reading it top to bottom: if `Profit` is greater than zero, return
`"Profitable"`. Otherwise, check the next condition — if `Profit`
equals exactly zero, return `"Break Even"`. If neither condition
matched, `ELSE` catches everything else and returns `"Loss"`. `END`
closes the whole statement. Forget the `END`, and Tableau's status
message turns red with a syntax error before you can even save.

You can chain as many `ELSEIF` clauses as the logic needs, and `ELSE`
is technically optional — but leaving it off means any row that
matches none of your conditions returns `NULL`, which is rarely what
you want.

## The CASE / WHEN structure

`CASE` is built for a different shape of problem: testing one field
against a list of specific values, rather than a series of different
conditions:

```
Region Code =
CASE [Region]
WHEN "East" THEN "E"
WHEN "West" THEN "W"
WHEN "Central" THEN "C"
ELSE "?"
END
```

`CASE` names the field once at the top (`[Region]`), then lists exact
values it might match, each with its own `WHEN ... THEN`. `ELSE` still
works the same way — a catch-all for anything that didn't match — and
the statement still needs its own `END`.

## Choosing between IF and CASE

Both structures can technically solve the same problems, but one is
almost always cleaner:

| Situation | Better choice |
|---|---|
| Testing the *same field* against several exact values | `CASE` |
| Testing *different conditions* (ranges, comparisons, multiple fields) | `IF` |
| A single field compared to a short, specific list (regions, categories, statuses) | `CASE` |
| Anything involving `>`, `<`, `AND`, `OR`, or multiple different fields | `IF` |

`Profitability` above needed `IF` because it tests a numeric range
(`> 0`, `= 0`), not exact matches. `Region Code` is cleanly a `CASE`
because it's the same field (`[Region]`) matched against a short list
of known values.

## A quick note on AND / OR

`IF` conditions can combine multiple tests with `AND` and `OR`:

```
High Value Loss =
IF [Profit] < 0 AND [Sales] > 1000 THEN "Investigate"
ELSE "OK"
END
```

That reads naturally: both conditions have to be true for the row to
be flagged `"Investigate"`.

## Key terms

| Term | Meaning |
|---|---|
| `IF`/`THEN`/`ELSEIF`/`ELSE`/`END` | Tableau's conditional structure — every `IF` block must close with `END` |
| `CASE`/`WHEN`/`END` | An alternative structure for testing one field against a list of exact values |
| `ELSE` | The catch-all branch — without it, unmatched rows return `NULL` |

## Lab

1. On **Sample Superstore**, create `Profitability` using the exact
   `IF`/`ELSEIF`/`ELSE`/`END` formula above, and drop it on Color next
   to `SUM(Profit)` on a bar chart.
2. Create `Region Code` using the `CASE` formula above (adjust the
   region names to match your data exactly), and confirm every region
   in your dataset gets a code — including any you didn't explicitly
   list, via `ELSE`.
3. Delete the `END` from one of your formulas on purpose and see what
   the Calculation Editor's status message says.

## Check yourself

You're ready for Lesson 38 when you can write an `IF`/`ELSEIF`/`ELSE`/
`END` formula from memory without forgetting the `END`, and explain
when `CASE` is the cleaner choice over `IF`.
