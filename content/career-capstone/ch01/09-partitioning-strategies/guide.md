# Lesson 9 — Partitioning Strategies

**Chapter 1 · System Design for Data Engineers · Lesson 9 of 81**

## What you'll learn

- Why the fact table from Lesson 8 needs to be *split up*, not just modeled
- Partitioning by date — the classic default, and why it usually wins
- Partition pruning, recapped as a system design payoff, not just a Spark trick
- The real trade-off: too many small partitions vs. too few large ones

## Splitting up the fact table Lesson 8 modeled

Lesson 8 fixed `FactOrders`'s grain and shape — one fact table,
conformed dimensions, star schema. At 10 billion rows, that same
table still needs to physically live somewhere as more than one
giant file. **Partitioning** is how: splitting one logical table
into smaller physical chunks a query engine can read selectively,
instead of one unmanageable block it has to scan end to end.

This isn't new — DE Foundations Lesson 9 already covered
Hive-style, `key=value` directory partitioning for exactly this
reason, and Lesson 61 showed writing it directly with
`.partitionBy()`. This lesson is that same mechanism, applied
specifically to the fact table Lesson 8 just designed.

## Partitioning by date — the classic default

```text
FactOrders/
  order_date=2024-01-01/
    part-0000.parquet
  order_date=2024-01-02/
    part-0000.parquet
  order_date=2024-01-03/
    part-0000.parquet
```

A fact table's grain almost always includes a date (Lesson 8's
`FactOrders` has an order date on every row), and most real queries
against it filter by a date range — "last quarter's revenue," "this
week's orders." Partitioning by date lines the physical layout up
with the actual query pattern, which is precisely DE Foundations
Lesson 9's rule for choosing a partition column: pick one you
actually filter on often, with a manageable number of distinct
values.

## Partition pruning, as a system design payoff

```sql
-- Only the January 2024 partitions get opened at all
SELECT SUM(total_amount)
FROM FactOrders
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31';
```

**Partition pruning** — DE Foundations Lessons 9 and 61 both showed
this — means the query engine can see from the partition boundaries
alone which folders can't possibly match, and skip them entirely
without opening a single file inside. At Lesson 8's 10-billion-row
scale, this is the difference between a query that touches the
whole table and one that touches a single month's worth of it —
this is *the* reason partitioning matters for a system design
answer, not an implementation detail to mention in passing.

## The real trade-off: too many small vs. too few large

```text
Partition by second:  billions of tiny partitions -- pruning barely
                       helps (nobody queries at that grain), and
                       Databricks Lesson 23's "small files problem"
                       hits hard: thousands of files to open per query
Partition by year:    a handful of enormous partitions -- a query
                       for "last week" still has to scan a whole
                       year's worth of data, gaining nothing
Partition by date:    matches how FactOrders is actually queried --
                       small enough to prune usefully, large enough
                       that each partition holds a real batch of data
```

DE Foundations Lesson 9 called over-partitioning a genuine mistake,
not a harmless excess — and Databricks & Delta Lake Lesson 23's
`OPTIMIZE`/`ZORDER BY` maintenance exists specifically because
frequent small writes accumulate exactly this kind of too-many-tiny-
files problem over time, whether or not the partition column itself
was chosen well. Getting the partition column and grain right up
front (as Lesson 8 stressed for grain generally) avoids needing that
cleanup as often.

## Key terms

| Term | Meaning |
|---|---|
| Partitioning | Splitting one logical table into smaller physical chunks by column value |
| Partition pruning | Skipping entire partitions a query's filter can't match, before reading anything |
| Over-partitioning | Too many tiny partitions — pruning barely helps, and small-file overhead dominates |
| Under-partitioning | Too few, oversized partitions — pruning can't narrow a query down enough |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
does partitioning `FactOrders` by date usually beat partitioning it by
year or by second, specifically for this table's actual query pattern?
