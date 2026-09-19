# Cataloging With Glue

Raw CSV files sitting in S3 aren't queryable by anything yet — no SQL engine knows their schema
or where partitions start and stop. A Glue crawler fixes that without moving or copying a single
byte: it scans `northfield-raw-zone`, infers schema, and registers tables in the Glue Data
Catalog so Athena, Redshift Spectrum, and the ETL job can all read the same catalog entry.

## What you'll learn

- What a Glue crawler actually does, and what it leaves alone
- Setting up `northfield-raw-crawler` against the two raw prefixes
- The real table names it produces in `northfield_catalog`

## Crawler configuration

The crawler is pointed at both raw prefixes so a single run catalogs orders and inventory
together:

```
Crawler name:      northfield-raw-crawler
Data source:        s3://northfield-raw-zone/orders/
                     s3://northfield-raw-zone/inventory/
IAM role:            northfield-glue-role
Database:            northfield_catalog
Schedule:            on demand (triggered by Step Functions, Lesson 8)
```

On its first run, the crawler samples files in each prefix, infers column names and types from
the CSV headers, detects the `dt=` partition key, and creates one table per prefix:

```
northfield_catalog.northfield_orders_raw
  order_id        string
  customer_id     string
  product_sku     string
  quantity        bigint
  unit_price      double
  order_date      string
  region          string
  dt              string   (partition)

northfield_catalog.northfield_inventory_raw
  product_sku     string
  warehouse_id    string
  qty_on_hand     bigint
  snapshot_date   string
  dt              string   (partition)
```

Every column comes back as a string or number inferred from the CSV — nothing is cleaned or
retyped here. That's deliberate: the crawler's job is to make raw data *visible*, not correct.
Fixing `order_date` into a real date type and correcting inconsistent `region` values happens in
the Glue ETL job (Lesson 5), not the crawler.

## Why the crawler runs on demand, not on a schedule

Glue crawlers can run on a cron schedule, but this pipeline already has an orchestrator —
Step Functions — deciding when new data has landed (via the `_SUCCESS` marker from Lesson 3). A
crawler on its own schedule risks running *before* the night's upload finishes, or running
redundantly when nothing changed. So `northfield-raw-crawler` is configured with no schedule and
is invoked as a state inside `northfield-pipeline-orchestrator` instead — one clear place decides
when the whole chain runs.

## Adding new partitions cheaply

After the very first crawl, most nights don't need a full re-crawl — they just add one new `dt=`
partition to each table. Glue supports this via **partition indexing**, which keeps repeated
crawls fast even as the raw zone accumulates a year or more of daily partitions. This is a real
cost lever too: Lesson 12 revisits crawler frequency and DPU cost once the raw zone has months of
history.

## Key terms

| Term | Meaning |
|---|---|
| Glue crawler | Scans a data source and registers/updates tables in the Data Catalog |
| Glue Data Catalog | Central metadata store — table schemas, locations, partitions — shared by Athena, Redshift Spectrum, and Glue jobs |
| Schema inference | The crawler's guess at column names/types from sampled files; not a data-quality step |
| Partition indexing | Keeps re-crawls fast as a table accumulates many `dt=` partitions |

## Check yourself

Why does `northfield-raw-crawler` leave every column as an inferred string or number instead of
correcting types and values itself?
