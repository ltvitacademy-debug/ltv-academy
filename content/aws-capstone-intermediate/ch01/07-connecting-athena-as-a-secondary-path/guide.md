# Lesson 7 — Connecting Athena as a Secondary Query Path

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 7 of 16**

## What you'll learn

- Why Redshift becomes the primary path without making Athena useless
- Redshift Spectrum: querying the Glue Catalog's curated table directly from Redshift, no load required
- The exact `CREATE EXTERNAL SCHEMA` statement that wires it up
- When to reach for this secondary path instead of a full `COPY` into `fact_orders`

## Redshift is primary now. That doesn't retire Athena.

With a validated load behind you, `analytics.fact_orders` is now the trustworthy, repeatable
source Finance's recurring report will be built on. But "primary path" doesn't mean "only path."
Every row that lands in `fact_orders` first had to go through a full `COPY` — worth it for a
report that runs every month, but overkill for a one-off question like "what did September look
like by region?" that nobody's going to ask again. For that kind of occasional lookup, loading an
entire month into the warehouse just to answer it once is wasted work.

## Redshift Spectrum: querying S3 without loading it

Redshift Spectrum lets Redshift query data sitting in S3 directly — through the same Glue Data
Catalog the ETL job already registers its curated table in — without loading a single row into a
Redshift table first. It's the same curated Parquet data `COPY` reads from in Lesson 5, just
queried in place instead of copied in.

```sql
CREATE EXTERNAL SCHEMA spectrum
FROM DATA CATALOG
DATABASE 'northfield_catalog'
IAM_ROLE 'arn:aws:iam::111122223333:role/northfield-redshift-copy-role'
CREATE EXTERNAL DATABASE IF NOT EXISTS;
```

This creates an external schema named `spectrum` inside the `northfield-dw` namespace, pointed at
the existing `northfield_catalog` Glue database — the same catalog the raw crawler and the ETL
job's sink both already populate. It reuses `northfield-redshift-copy-role`, the same role
`COPY` assumes, since Spectrum needs the same kind of read access into S3 that a load does. Once
this schema exists, every table already registered in `northfield_catalog` — including
`northfield_orders_curated` — becomes queryable through it as `spectrum.northfield_orders_curated`.

## Querying it

```sql
SELECT region, SUM(order_total) AS revenue
FROM spectrum.northfield_orders_curated
WHERE dt BETWEEN DATE '2026-09-01' AND DATE '2026-09-30'
GROUP BY region
ORDER BY revenue DESC;
```

This runs from a Redshift session, but it never touches `fact_orders` — it reads the curated
Parquet files in S3 directly, scoped to a date range with a plain `WHERE` clause on the `dt`
partition. The same query also works unchanged from Athena directly against
`northfield_catalog.northfield_orders_curated`, since both paths point at the same underlying
catalog table. Spectrum's advantage here is just convenience: whoever's already working in a
Redshift session, maybe mid-way through a join against `analytics.dim_product`, can reach the
curated data without switching tools.

## Choosing the right path for the question

| Situation | Right path |
|---|---|
| A recurring, trusted monthly report | Load into `analytics.fact_orders` via `COPY`, query the warehouse |
| A one-off question, asked once, not worth a schedule | Query `spectrum.northfield_orders_curated` (or Athena) directly |
| A question that needs heavy joins against the dimension tables, repeated often | The warehouse — that's exactly the join-heavy, repeat-access workload it's built for |
| A quick sanity check against raw, uncleaned data | `northfield_catalog.northfield_orders_raw`, the Beginner-tier path, still available |

## Key terms

| Term | Meaning |
|---|---|
| Redshift Spectrum | Redshift's feature for querying data in S3 via the Glue Catalog, without loading it into a table |
| External schema | A Redshift schema backed by an external catalog (here, Glue) instead of native Redshift storage |
| Secondary path | A query route kept available for occasional use, alongside (not replacing) the primary warehouse path |

## Check yourself

You're ready for Lesson 8 when you can answer, without looking: what does `CREATE EXTERNAL
SCHEMA` actually do, and what kind of question is Spectrum the right tool for, versus loading data
into `analytics.fact_orders`?
