# Script — Partitioning for Athena Performance

## Segment 1 (title)

Athena bills by bytes scanned, and partitioning is the single highest-leverage way to reduce that number. It lets Athena skip entire sections of S3 it doesn't need to touch, a technique called partition pruning.

## Segment 2 (code: partition pruning)

Filter on year equals 2024 and month equals 01 against a table partitioned by year and month, and Athena only reads the objects under that specific prefix — not the table's entire history. Athena figures out what's relevant before it scans anything. Skipped bytes are bytes never billed.

## Segment 3 (code: S3 key layout as partition structure)

The standard layout uses key equals value pairs directly in the S3 prefix — year=2024/month=01/day=15, and so on. Athena, and Glue crawlers too, recognize that pattern and map each distinct combination to a partition. It's the same "keys, not real folders" idea from S3 fundamentals, just applied deliberately.

## Segment 4 (steps: two ways Athena learns partitions exist)

Athena needs to know which partitions actually exist before it can prune on them. MSCK REPAIR TABLE scans S3 to discover and register partitions — it works, but it gets slower as partition counts grow into the thousands. Partition projection instead computes valid partition values from a defined pattern, no scan required, and it scales much further without that slowdown.

## Segment 5 (outro)

Pick a partition key that matches how queries actually filter, and pruning does the rest. Next up: Athena cost optimization — Parquet, compression, and partitioning working together to cut what you're billed.
