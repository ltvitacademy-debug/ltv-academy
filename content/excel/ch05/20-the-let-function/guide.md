# Lesson 20 — The LET Function

**Chapter 5 · Dynamic Arrays & Modern Excel · Lesson 20 of 25**

## What you'll learn

- What `LET` actually does — and why it's a readability *and*
  performance win, not just a style preference
- The real syntax, including the up-to-126 name/value pairs it supports
- A concrete before/after formula rewrite

## The problem LET solves

Any time you write the same sub-expression more than once inside a
single formula, Excel calculates it **every single time it appears** —
not once and reused. A formula that references `SUM(B2:B10)` three
times recalculates that sum three times, and every future reader has
to mentally confirm all three copies actually say the same thing.

```
=IF(SUM(B2:B10)>1000, SUM(B2:B10)*0.9, SUM(B2:B10))
```

That formula is correct, but it's also three calculations of the same
range, and three places a future edit could accidentally desync.

## LET's syntax

```
=LET(name1, value1, [name2, value2, ...], calculation)
```

![The LET syntax broken down: name, name_value, and the final calculation, with a worked mini-example.](/courses/excel/ch05/20-the-let-function/let-diagram.png)
*Every name/value pair is defined once; the final argument is always the actual calculation using those names.*
Source: [Microsoft Support — LET function](https://support.microsoft.com/en-us/office/let-function-34842dd8-b92b-4d3f-b325-b8b8f9908999)

You define pairs — a name, then the value or expression that name
stands for — and finish with one calculation that uses those names
like variables. `LET` supports up to 126 name/value pairs, and each
name only exists inside that one formula; it isn't a workbook-wide
defined name.

## Before and after

```
Before (SUM calculated three separate times):
=IF(SUM(B2:B10)>1000, SUM(B2:B10)*0.9, SUM(B2:B10))

After (SUM calculated once, referenced by name):
=LET(total, SUM(B2:B10), IF(total>1000, total*0.9, total))
```

Both formulas return the same result. The `LET` version calculates
`SUM(B2:B10)` exactly once and reuses the name `total` everywhere
else — genuinely faster on a large or volatile range, and unambiguous
to read: there's only one place `total` could be wrong.

## A real-data example

`LET` is just as useful for naming an intermediate *filtered* result
so a longer formula built on top of it doesn't repeat the filter logic
itself:

![A sample sales dataset by rep, region, and product before any filtering is applied.](/courses/excel/ch05/20-the-let-function/let-unfiltered.png)
*The full data — every rep, every region.*
Source: [Microsoft Support — LET function](https://support.microsoft.com/en-us/office/let-function-34842dd8-b92b-4d3f-b325-b8b8f9908999)

![The same dataset narrowed to one rep's rows — the kind of intermediate result LET is built to name.](/courses/excel/ch05/20-the-let-function/let-filtered.png)
*Whatever produced this narrowed view — a FILTER call, in practice — is exactly the sort of expression worth naming once with LET instead of repeating.*
Source: [Microsoft Support — LET function](https://support.microsoft.com/en-us/office/let-function-34842dd8-b92b-4d3f-b325-b8b8f9908999)

## Key terms

| Term | Meaning |
|---|---|
| `LET` | Assigns a name to an intermediate value/expression inside a single formula |
| Name/value pair | One `LET` argument pair — a name, followed by the expression it stands for |
| Scope | A `LET` name only exists inside that formula, unlike a workbook-wide defined name |

## Lab

1. Take any formula in your own workbook that repeats the same
   sub-expression two or more times.
2. Rewrite it with `LET`, naming that sub-expression once.
3. Confirm both versions return the identical result — then delete
   the old one.

## Check yourself

You're ready for Chapter 6 when you instinctively reach for `LET` the
moment you catch yourself typing the same sub-expression twice in one
formula.
