# Lesson 11 — Logical Functions: AND, OR & IFS

**Chapter 3 · Aggregation & Logic Functions · Lesson 11 of 25**

## What you'll learn

- How AND and OR combine multiple conditions into a single TRUE/FALSE
  that IF can test
- The difference in outcome between AND (every condition must be true)
  and OR (any one condition is enough)
- IFS as a flatter, more readable replacement for a long IF/ELSEIF-style
  nested chain

## AND: every condition must be true

```
=IF(AND(Score>=70, Attendance>=0.9), "Pass", "Fail")
```

`AND` takes any number of conditions and returns TRUE only if **all**
of them are true. Here, a result of "Pass" requires both a passing
score *and* sufficient attendance — if either one fails, AND returns
FALSE and the whole IF falls through to "Fail". This is the natural
replacement for a nested IF that checks the same two conditions in
sequence just to arrive at one combined answer.

## OR: any one condition is enough

```
=IF(OR(Region="West", Region="Northwest"), "West Zone", "Other Zone")
```

`OR` returns TRUE if **any** of its conditions are true — it only takes
one match. Mixing up AND and OR is one of the most common logic bugs in
Excel: swapping them silently changes "both must be true" into "either
is enough," and the formula still calculates without any error, it
just quietly returns the wrong answer for edge cases. Always read an
AND/OR condition back in plain English before trusting it.

## IFS: flattening a long IF/ELSEIF chain

Lesson 10 covered the two warning signs that a nested IF has gone too
far — losing count of parentheses, and testing the same field against a
new threshold every branch. **IFS** is the direct answer to that
second pattern:

```
=IFS(
  Score>=90, "A",
  Score>=80, "B",
  Score>=70, "C",
  TRUE, "F"
)
```

IFS takes condition/result pairs, evaluated in order, with no nested
parentheses at all — each pair stands on its own line, and there's
nothing to lose count of. The final `TRUE, "F"` pair is the catch-all:
since `TRUE` is always true, it only gets reached if every condition
above it failed, functioning exactly like nested IF's final `else`.
Skip that catch-all and IFS returns a `#N/A` error if nothing matches,
so it's worth including deliberately rather than leaving it out.

## Key terms

| Term | Meaning |
|---|---|
| AND | Returns TRUE only when every condition passed to it is true |
| OR | Returns TRUE when at least one condition passed to it is true |
| IFS | Evaluates condition/result pairs in order with no nesting; needs a final `TRUE, result` catch-all |

## Lab

1. Write an IF/AND formula requiring two conditions to both be true for a "Pass" result.
2. Write an IF/OR formula that returns "West Zone" for either of two region names.
3. Rewrite the five-tier nested IF from Lesson 10's lab as an IFS formula, including the `TRUE` catch-all, and confirm it returns identical results.

## Check yourself

You're ready for Lesson 12 when you can explain, without guessing, what
happens if an IFS formula is missing its final `TRUE` catch-all pair.
