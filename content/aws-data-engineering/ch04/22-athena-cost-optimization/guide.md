# Athena Cost Optimization

This lesson closes the chapter by pulling together everything that reduces what an Athena
query actually costs. Since Lesson 18 established that billing is based on bytes scanned,
every optimization here reduces to the same underlying goal: make each query touch as few
bytes as possible without changing what it returns.

## What you'll learn

- Why converting CSV/JSON to columnar Parquet reduces bytes scanned
- How compression compounds with columnar format
- Partitioning's role in the same cost equation
- Putting all three together on one real dataset

## Columnar format: read only the columns you need

CSV and JSON are **row-oriented** — every column of every row sits together, so a query
that only needs 3 of a table's 20 columns still has to read all 20 off disk to get at the
rows it wants. **Parquet** (and ORC) are **columnar** — each column's data is stored
together, separately from other columns. A query selecting 3 columns out of 20 in a
Parquet table only reads the storage blocks for those 3 columns; the other 17 are never
touched. For wide tables and narrow queries — which describes most analytical SQL — this
alone can cut bytes scanned dramatically, independent of partitioning.

## Compression compounds the savings

Parquet files are typically compressed (commonly with Snappy or gzip), and columnar
storage makes compression more effective than it would be on row-oriented data, because
values within a single column tend to be far more similar to each other than values across
a mixed row — repeated customer IDs, repeated status strings, and so on compress well when
they're stored contiguously. Less compressed data on disk means less data physically read
to satisfy a scan, which means fewer bytes billed, on top of whatever columnar pruning
already saved.

## Partitioning stacks on top

Lesson 21 covered partition pruning as its own technique, but it isn't a competing
approach to Parquet and compression — it's a third, independent lever on the same bill.
Partitioning determines *which files* get opened at all; columnar format and compression
determine *how much of each opened file* actually gets read. A well-partitioned,
Parquet-formatted, compressed table applies all three simultaneously: prune to the
relevant partitions, read only needed columns within those files, and read less physical
data per column because it's compressed.

## Putting it together

Converting a CSV data lake to partitioned, compressed Parquet is one of the highest-return
changes a data engineering team can make to their Athena bill, precisely because these
three levers compound rather than substitute for each other — a table that's both well
partitioned and stored as compressed Parquet can see order-of-magnitude reductions in
bytes scanned (and therefore cost) for the same queries, compared to unpartitioned CSV.
This is also a natural fit for the Glue jobs from Lesson 14: a job that reads raw CSV,
partitions it by a sensible key, and writes it out as Parquet is a standard, recurring
pattern in real AWS data pipelines.

## Key terms

| Term | Meaning |
|---|---|
| Row-oriented format | Storage where each row's columns are kept together (CSV, JSON) |
| Columnar format | Storage where each column's values are kept together (Parquet, ORC) |
| Compression | Reducing physical data size on disk, more effective on columnar data |
| Bytes scanned | What Athena bills on — reduced by format, compression, and partitioning together |

## Check yourself

A table is already partitioned well but still stored as uncompressed CSV. A teammate says
"partitioning is done, so we've captured all the cost savings available." Is that true?
What's still on the table?
