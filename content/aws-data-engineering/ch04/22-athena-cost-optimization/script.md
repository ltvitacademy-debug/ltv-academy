# Script — Athena Cost Optimization

## Segment 1 (title)

This lesson pulls together everything that reduces what an Athena query actually costs. Since billing is based on bytes scanned, every technique here reduces to the same goal: touch as few bytes as possible without changing what the query returns.

## Segment 2 (code: row-oriented vs. columnar)

CSV and JSON are row-oriented — every column of every row sits together, so a query that only needs 3 of 20 columns still has to read all 20. Parquet is columnar — each column is stored separately, so that same query only reads the 3 columns it actually needs. For wide tables and narrow queries, that alone can cut bytes scanned dramatically.

## Segment 3 (steps: three levers, same bill)

These three things stack, they don't compete. Partitioning controls which files get opened at all. Columnar format controls how much of each opened file gets read. And compression shrinks the physical bytes read per column, on top of both. A table that does all three at once compounds the savings.

## Segment 4 (code: the standard fix, as a Glue job)

In practice, this is a standard Glue job: read raw CSV, partition it by a sensible key, write it out as compressed Parquet. That single pattern — raw to optimized — can produce order-of-magnitude reductions in bytes scanned, and therefore cost, for the exact same queries.

## Segment 5 (outro)

That closes out Athena and this chapter — serverless SQL, billed by bytes scanned, optimized with format, compression, and partitioning together. Next up: Chapter Five begins with Redshift architecture — cloud data warehousing.
