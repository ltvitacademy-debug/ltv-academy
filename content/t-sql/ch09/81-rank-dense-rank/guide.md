# Lesson 81 — RANK and DENSE_RANK

**Chapter 9 · Window and Ranking Functions · Lesson 3 of 4**

## What you'll learn

- `RANK()` — tied rows share a rank, but leave a gap afterward
- `DENSE_RANK()` — tied rows share a rank, with no gap
- Comparing all three ranking functions side by side
- Choosing the right one for the question you're actually answering

## The problem ROW_NUMBER doesn't solve

Lesson 80's `ROW_NUMBER()` always produces unique numbers, even for
genuinely tied values — which misrepresents a real tie as if one row
beat the other. `RANK()` and `DENSE_RANK()` both fix this by giving tied
rows the **same** number.

## RANK — ties share a number, but leave a gap

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice,
       RANK() OVER (ORDER BY ListPrice DESC) AS PriceRank
FROM Production.Product;
```

If two products are tied for the **most** expensive, they **both** get
rank `1`. The **next** product after them gets rank `3` — not `2` — because
`RANK()` accounts for how many rows were tied at the previous rank,
leaving a gap exactly the size of the tie.

## DENSE_RANK — ties share a number, no gap

```sql
SELECT Name, ListPrice,
       DENSE_RANK() OVER (ORDER BY ListPrice DESC) AS PriceRank
FROM Production.Product;
```

Same tie, same shared rank `1` for both products — but the next distinct
price gets rank `2`, not `3`. `DENSE_RANK()` counts **distinct** values,
ignoring how many rows shared each one.

## All three, side by side

| Function | Ties | Gaps after a tie |
|---|---|---|
| `ROW_NUMBER()` | Never — always unique | Never |
| `RANK()` | Yes — same number for ties | Yes — skips ahead by the tie size |
| `DENSE_RANK()` | Yes — same number for ties | No — next distinct value gets the next number |

## Choosing the right one

Ask: **does the real-world question care about ties, and if so, should
they "cost" a rank or not?** A sales leaderboard where two people tied
for 2nd place genuinely skips 3rd place (`RANK`) reads differently from
a scale of distinct price tiers where you just want the **next** tier
number, gap-free (`DENSE_RANK`). If ties are impossible or irrelevant,
`ROW_NUMBER()` is the simplest choice.

## Key terms

| Term | Meaning |
|---|---|
| `RANK()` | Ties share a number; the next value skips ahead by the tie size |
| `DENSE_RANK()` | Ties share a number; the next distinct value has no gap |

## Lab

Run all three functions side by side against AdventureWorks2012 and
compare their output for tied prices:

```sql
SELECT Name, ListPrice,
       ROW_NUMBER() OVER (ORDER BY ListPrice DESC) AS RowNum,
       RANK() OVER (ORDER BY ListPrice DESC) AS Rank_,
       DENSE_RANK() OVER (ORDER BY ListPrice DESC) AS DenseRank_
FROM Production.Product
ORDER BY ListPrice DESC;
```

## Check yourself

You're ready for Lesson 82 when you can answer, without looking: what's
the difference in behavior between `RANK()` and `DENSE_RANK()` after a
tie, and when would `ROW_NUMBER()` be the better choice than either?
