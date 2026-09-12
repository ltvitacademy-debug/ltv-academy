# Lesson 69 — FIXED LOD

**Chapter 12 · Level of Detail Expressions · Lesson 69 of 95**

## What you'll learn

- Exactly what `FIXED` computes, and why it's the LOD keyword you'll use
  most
- How to write `FIXED` with one dimension, multiple dimensions, and zero
  dimensions
- How `FIXED` behaves around filters — the single most common source of
  "why isn't my FIXED calculation updating?" confusion
- Real examples: customer lifetime sales, a customer's first purchase date

## What FIXED actually computes

```
{ FIXED [Customer Name] : SUM([Sales]) }
```

`FIXED` computes the aggregation at **exactly** the dimension(s) you list
inside the braces — nothing more, nothing less. It doesn't care what's on
Rows, Columns, or the Marks card. Drop this calculation into a view grained
by `Order ID`, `Region`, or nothing at all, and every row for a given
customer shows the same number: that customer's total sales across the
*entire* data source (subject to the filter rules below).

That's the whole idea: `FIXED` gives you a number that's stable no matter
how you slice the view around it — perfect for "this customer's lifetime
total" sitting next to "this specific order's total," so you can compare
one order against the whole relationship.

## FIXED with multiple dimensions, or none

You can list more than one dimension — the calculation is fixed to the
*combination*:

```
{ FIXED [Region], [Category] : SUM([Sales]) }
```

This computes total sales per Region-and-Category pair, regardless of the
view.

You can also fix to **nothing**:

```
{ FIXED : AVG([Sales]) }
```

An empty scope means "the whole table" — this returns one number, the
overall average sale amount, repeated on every single row of the view.
It's the LOD equivalent of a grand total that stays a grand total no
matter how the view is sliced.

## FIXED and filters — the part that trips people up

This is the single most important thing to know about `FIXED`:

| Filter type | Does it affect FIXED? |
|---|---|
| **Context filter** | Yes — applied *before* FIXED calculates |
| **Data source filter** | Yes — applied before FIXED calculates |
| **Dimension filter (regular)** | **No** — FIXED still sees the unfiltered data |
| **Measure filter** | No — applies *after* FIXED has already computed |

Set a regular filter on `Region = West` and a `FIXED [Customer Name] :
SUM([Sales])` calculation keeps returning each customer's *entire* sales
total, including sales from every other region — because that filter runs
after FIXED, not before it. If you actually want the filter to apply
first, you have to explicitly promote it to a **context filter** (right-click
the filter pill → Add to Context). Lesson 71 walks through this ordering
in full, with a worked example.

## Two real examples

**Customer lifetime sales**, usable on any view without changing per row:

```
{ FIXED [Customer Name] : SUM([Sales]) }
```

**A customer's first purchase date** — useful for cohort and "new vs.
returning customer" analysis:

```
{ FIXED [Customer Name] : MIN([Order Date]) }
```

Both are things a regular aggregation simply cannot produce once you've
put `Order ID` or `Order Date` on the view — the moment you do, a plain
`SUM([Sales])` or `MIN([Order Date])` starts computing per-order instead
of per-customer. `FIXED` is what keeps the customer-level number stable.

## Key terms

| Term | Meaning |
|---|---|
| FIXED | The LOD keyword that computes at exactly the listed dimension(s), independent of the view |
| Empty FIXED | `{ FIXED : AGG(...) }` — computes one value across the entire table |
| Context filter | A filter promoted to run *before* FIXED calculations, unlike regular dimension filters |
| Cohort analysis | Grouping customers by a shared trait (like first purchase date) — a common use for FIXED LOD |

## Lab

1. On Sample Superstore, create `Customer First Order Date` as
   `{ FIXED [Customer Name] : MIN([Order Date]) }`.
2. Build a view with `Order ID` on Rows, and add both `Order Date` and
   `Customer First Order Date`. Confirm the fixed column repeats the same
   date for every order from the same customer.
3. Add a regular dimension filter on `Region`. Confirm the FIXED value
   does *not* change. Then move that same filter to context (right-click
   → Add to Context) and confirm it now does.

## Check yourself

You're ready for Lesson 70 when you can explain why a regular dimension
filter doesn't change a `FIXED` calculation's result, and what you'd do to
make it.
