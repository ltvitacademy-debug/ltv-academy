# Lesson 10 — IF & Nested IF

**Chapter 3 · Aggregation & Logic Functions · Lesson 10 of 25**

## What you'll learn

- The IF function's three arguments, and how to nest one IF inside
  another to handle more than two outcomes
- A readable way to format a nested IF so each branch is easy to scan
- The specific point where nested IF becomes unreadable — and what to
  reach for instead once it crosses that line

## IF: one condition, two outcomes

```
=IF(Score>=90, "A", "B or lower")
```

`IF(logical_test, value_if_true, value_if_false)` — three arguments,
always in that order. It's the building block for every branching
formula in Excel, but on its own it only ever produces two outcomes.

## Nesting IF for more than two outcomes

Real grading, tiering, and bucketing questions usually need more than
two outcomes. Nesting puts a second IF inside the "false" branch of the
first, and it can keep going as many levels as the question needs:

```
=IF(Score>=90, "A",
  IF(Score>=80, "B",
    IF(Score>=70, "C", "F")))
```

Read it top to bottom: if the first condition is true, stop and return
"A". If not, check the next condition. If none of them are true, fall
through to the final "F". The formatting above — one condition per
line, indented — isn't required by Excel, but it's the difference
between a formula you can debug in ten seconds and one you have to
untangle character by character. Excel's own formula bar will happily
accept it all on one line; that doesn't mean it should be typed that
way.

## Where nested IF stops being worth it

Nested IF works, but it degrades fast. Three levels is normal and
readable. Five or six levels — which happens quickly with pricing
tiers, grade bands, or commission brackets — becomes genuinely hard to
audit: one misplaced parenthesis and the whole chain breaks, and the
person fixing it six months from now (possibly you) has to re-derive
the logic from scratch. Two specific signs it's time to stop nesting:

1. **You've lost count of the closing parentheses.** If you can't tell
   at a glance whether you need three or four `)` at the end, the
   formula has outgrown IF.
2. **Every branch tests the same field against a new threshold.** That
   pattern — one field, several ordered cutoffs — is exactly what
   **IFS** was built to replace (Lesson 11), or what a small lookup
   table with `VLOOKUP`/`XLOOKUP` (Chapter 2) can replace even more
   cleanly, since adding a new tier then means editing a table instead
   of editing a formula.

Nested IF isn't wrong for two or three branches. It's the wrong tool
once the branch count and the parenthesis count both start climbing.

## Key terms

| Term | Meaning |
|---|---|
| Nested IF | An IF function placed inside another IF's true or false argument |
| Branch | One condition/result pair inside a nested IF chain |
| IFS | The function that replaces a long nested IF chain (Lesson 11) |

## Lab

1. Write a nested IF that assigns a letter grade (A/B/C/F) from a numeric score, formatted one condition per line.
2. Extend it to five tiers and time how long it takes to get the parentheses right — notice where it starts to feel fragile.
3. Identify one nested IF in a real workbook you own (or imagine one for pricing tiers) and decide, using the two signs above, whether it should be replaced by IFS or a lookup table.

## Check yourself

You're ready for Lesson 11 when you can explain, without re-reading the
guide, the exact point at which a nested IF has gotten too long to
keep.
