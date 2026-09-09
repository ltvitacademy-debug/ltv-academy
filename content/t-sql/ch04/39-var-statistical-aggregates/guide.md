# Lesson 39 — VAR and Statistical Aggregates

**Chapter 4 · Grouping and Aggregating · Lesson 8 of 9**

## What you'll learn

- `VAR()` — measuring how spread out values are
- `STDEV()` — the more commonly reported cousin of variance
- Why these are still just aggregate functions, nothing new structurally
- When you'd actually reach for them

## Beyond averages: how spread out is the data?

`AVG()` tells you the center of a set of numbers, but says nothing about
how **spread out** they are. Two products could both average `$100`, but
one set might range from `$95`–`$105` while another ranges from
`$10`–`$500`. `VAR()` and `STDEV()` measure that spread.

## VAR — variance

```sql
USE AdventureWorks2012;
GO

SELECT VAR(ListPrice) AS PriceVariance
FROM Production.Product;
```

**Variance** measures, on average, how far each value sits from the mean —
squared, so bigger deviations count disproportionately more. The number
itself is in "squared" units, which makes it hard to interpret directly
(if `ListPrice` is dollars, variance is in dollars²).

## STDEV — standard deviation

```sql
SELECT STDEV(ListPrice) AS PriceStdDev
FROM Production.Product;
```

**Standard deviation** is the square root of variance — bringing the units
back to the original scale (back to plain dollars). This is why `STDEV()`
is far more commonly reported in practice than raw `VAR()`: a standard
deviation of `$150` is directly interpretable; a variance of `22,500` isn't.

## Structurally, nothing new

`VAR()` and `STDEV()` behave exactly like every other aggregate function
in this chapter: they skip `NULL`, work with `GROUP BY`, and can be
filtered with `HAVING`:

```sql
SELECT Color, AVG(ListPrice) AS AvgPrice, STDEV(ListPrice) AS PriceStdDev
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
HAVING STDEV(ListPrice) > 200;
```

This finds colors where prices vary **widely** — not just colors that are
expensive on average.

## When you'd use these

Reach for `VAR`/`STDEV` when the **spread** of the data matters as much as
its center — for example, flagging product lines with wildly inconsistent
pricing, or identifying unusually volatile sales figures month to month.

## Key terms

| Term | Meaning |
|---|---|
| `VAR()` | Average squared deviation from the mean |
| `STDEV()` | Square root of variance — same units as the original data |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT Color, AVG(ListPrice) AS AvgPrice, STDEV(ListPrice) AS PriceStdDev
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
ORDER BY PriceStdDev DESC;
```

## Check yourself

You're ready for Lesson 40 when you can answer, without looking: what does
`STDEV()` tell you that `AVG()` alone doesn't, and why is `STDEV()`
generally more interpretable than raw `VAR()`?
