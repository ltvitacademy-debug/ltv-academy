# Lesson 44 — ALL & ALLEXCEPT

**Chapter 5 · DAX Fundamentals · Lesson 13 of 15**

## What you'll learn

- What ALL does, in its three different forms
- A worked "ratio to total" example using ALL
- What ALLEXCEPT does differently, and when it's the more convenient choice
- A caution about a subtle behavior called auto-exist

## Removing filters on purpose

`ALL` clears filters — ignoring whatever's currently active — so an
expression can see rows a filtered view would otherwise hide. It's not
used by itself; it's a filter argument, almost always passed into
`CALCULATE`.

`ALL` comes in three forms:

| Form | Effect |
|---|---|
| `ALL()` | Removes every filter, everywhere |
| `ALL(Table)` | Removes all filters from the specified table |
| `ALL(Column, ...)` | Removes filters from just the specified column(s), leaving the rest of the table's filters in place |

## Worked example: ratio to grand total

Here's the classic use case — a measure showing each category's share of
overall sales:

All Reseller Sales Ratio =
SUMX(ResellerSales, ResellerSales[SalesAmount])
/ SUMX(ALL(ResellerSales), ResellerSales[SalesAmount])

The numerator sums sales under whatever filter context the report
currently has — say, one product category, one year. The denominator
uses `ALL(ResellerSales)` to ignore every filter on that table entirely,
always producing the full grand total. Divide one by the other, and
every cell in the report shows its correct percentage of the whole.

This is the same shape as `REMOVEFILTERS` from Lesson 42 — both clear
filters for a denominator. The difference: `ALL` can also *return a
table* (useful as an argument to other functions), while `REMOVEFILTERS`
is purpose-built only for clearing filters, nothing else.

## ALLEXCEPT: the inverse approach

`ALLEXCEPT(Table, Column1, [Column2], ...)` removes every filter on a
table **except** the columns you name — the opposite instinct from
`ALL(Column)`, which removes filters from *only* the columns you name.

You met this already in Lesson 40's context transition example:

CALCULATE(
    SUM(Sales[SalesAmount]),
    ALLEXCEPT(Customer, Customer[CustomerKey])
)

`ALLEXCEPT` clears every filter on the `Customer` table *except* the one
on `CustomerKey` — a convenient shortcut when a table has many columns
and you only want to preserve one or two of them, rather than listing
every other column to remove individually with `ALL`.

## Choosing between them

- Use **`ALL(Column1, Column2, ...)`** when you want to name the *few*
  columns to clear.
- Use **`ALLEXCEPT(Table, Column1, ...)`** when you want to name the
  *few* columns to keep, and clear everything else.

Pick whichever list is shorter — that's usually the more readable
formula.

## A caution: auto-exist

Power BI has an optimization called *auto-exist* that can produce
surprising results when you filter on two or more columns of the same
table (like from multiple slicers) alongside a measure using `ALL()`. In
some cases, auto-exist merges those filters together in a way that
means `ALL()` doesn't fully ignore them as you'd expect. This is an edge
case, not something you'll hit constantly — but if an `ALL()`-based
ratio measure ever produces numbers that don't quite make sense, this is
one thing worth checking.

## Key terms

| Term | Meaning |
|---|---|
| ALL | Removes filters — from everywhere, one table, or specific columns |
| ALLEXCEPT | Removes every filter on a table except the columns named |
| Auto-exist | A Power BI optimization that can affect how ALL() behaves with multiple same-table filters |

## Lab

1. On **AdventureWorksDW2014**'s `FactResellerSales`, build
   `Ratio To Total = SUMX(FactResellerSales, FactResellerSales[SalesAmount]) / SUMX(ALL(FactResellerSales), FactResellerSales[SalesAmount])`,
   following the pattern in this lesson.
2. Import `DimCustomer` and rewrite the Customer Segment measure from
   Lesson 40 using `ALLEXCEPT(DimCustomer, DimCustomer[CustomerKey])` —
   confirm it still classifies each customer correctly.
3. Compare your `Ratio To Total` measure against a
   `REMOVEFILTERS`-based one from Lesson 42 doing the same job — confirm
   they produce identical results here.

## Check yourself

You're ready for Lesson 45 when you can decide, for any table, whether
`ALL` or `ALLEXCEPT` produces a shorter, more readable formula for
clearing the filters you don't want.
