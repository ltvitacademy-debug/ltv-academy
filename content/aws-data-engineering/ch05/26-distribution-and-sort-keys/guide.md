# Distribution & Sort Keys

COPY gets data into Redshift. Distribution and sort keys decide **how that data is physically
arranged** once it's there — which node each row lands on, and what order rows sit in within
a slice. Get these two choices right and joins and filters run against exactly the data they
need. Get them wrong and you get **data skew**: some slices doing far more work than others,
throttling the whole query to the pace of the slowest one.

## What you'll learn

- The three distribution styles: EVEN, KEY, ALL
- How to choose a DISTKEY, and what data skew actually looks like
- SORTKEY, and how it lets Redshift skip data it doesn't need to read

## Distribution styles

Every table has a **distribution style**, set at creation with `DISTSTYLE`:

- **EVEN** — rows are distributed round-robin across all slices, regardless of content.
  Simple and skew-proof, but gives Redshift no locality to exploit for joins.
- **KEY** — rows are distributed by hashing a chosen column (the **DISTKEY**), so every row
  with the same key value lands on the same slice. When two tables share a DISTKEY on their
  join column, Redshift can join matching rows **locally on each slice**, without shuffling
  data across the network — this is the single biggest lever for join performance in Redshift.
- **ALL** — the entire table is copied in full onto every node. Reserved for small, frequently-
  joined dimension tables (a `date` or `region` lookup table, say), where the cost of storing
  a full copy everywhere is trivial and it guarantees every join against it is local.

## Choosing a DISTKEY, and data skew

A good DISTKEY has two properties: **high cardinality** (many distinct values, so rows spread
evenly across slices) and it's a **common join column** (so related tables colocate). Pick
badly — say, a `status` column with only three possible values — and most rows pile onto just
a few slices while others sit nearly empty. That's **data skew**: the overloaded slices become
a bottleneck, and because MPP queries only finish when their *slowest* slice finishes, the
whole cluster's query time is dragged down to match the most overloaded node, no matter how
many nodes you have.

## SORTKEY

`SORTKEY` controls the physical **order** rows are stored in on disk within each slice — for
example, sorting `orders` by `order_date`. Redshift maintains **zone maps**: a min/max value
range for each block of stored data. A query filtering `WHERE order_date > '2024-01-01'` can
skip every block whose zone map proves it can't contain a matching row, without reading it at
all. A **compound sort key** orders by multiple columns in sequence (most useful when queries
commonly filter on a prefix of those columns); an **interleaved sort key** gives equal weight
to several columns for workloads that filter on different columns unpredictably, at a higher
maintenance cost.

## Key terms

| Term | Meaning |
|---|---|
| DISTSTYLE | A table's distribution style: EVEN, KEY, or ALL |
| DISTKEY | The column used to hash-distribute rows under KEY distribution |
| Data skew | Uneven row distribution across slices, creating a bottleneck slice |
| SORTKEY | Column(s) controlling physical row order on disk, enabling zone-map skipping |
| Zone map | Per-block min/max value range Redshift uses to skip irrelevant blocks |

## Check yourself

A `status` column has only three possible values: `open`, `shipped`, `closed`. Would this make
a good DISTKEY? Walk through what happens to slice-level row counts if you chose it anyway.
