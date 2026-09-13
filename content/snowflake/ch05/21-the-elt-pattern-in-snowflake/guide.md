# Lesson 21 — Raw → Cleaned → Business-Ready: The ELT Pattern in Snowflake

**Chapter 5 · Data Transformation / ELT · Lesson 21 of 60**

## What you'll learn

- Why Snowflake pipelines are built as ELT (extract, load, transform) rather than the ETL you may have used with on-prem SQL Server
- How storage/compute separation — already covered in Chapter 1 — is exactly what makes ELT the natural fit
- The three-layer naming convention (raw, staging/cleaned, business-ready) this whole chapter and the next one build on
- Where transient tables fit into that layering, versus the permanent tables you already know

## ETL vs. ELT: the order swaps

Traditional ETL — the model behind a lot of SSIS work — transforms
data in a separate engine (the SSIS pipeline itself) *before* it ever
lands in the warehouse. The warehouse only ever sees finished, shaped
data.

ELT flips the last two steps:

1. **Extract** — pull data from the source system, same as always.
2. **Load** — land it in the warehouse *as-is*, untransformed.
3. **Transform** — reshape it with SQL, running as a query inside the
   warehouse itself.

Chapters 3 and 4 already covered the "load" half — `COPY INTO` and
Snowpipe both land raw data with no transformation applied. This
chapter is entirely about the "T": turning that raw, loaded data into
something a report can trust.

## Why Snowflake makes ELT the obvious choice

ETL exists partly because, historically, the data warehouse was the
scarce, expensive resource — you transformed data elsewhere so the
warehouse only had to store and serve clean results. Snowflake removes
that constraint. Storage and compute are billed and scaled
independently (Chapter 1), so:

- Loading raw data costs almost nothing — it's storage, not compute.
- Transformation runs as ordinary SQL against a virtual warehouse you
  size for the job and suspend when it's done.
- There's no separate transformation engine to install, license, or
  keep in sync with the warehouse's schema — it's the same SQL
  dialect, the same worksheet, the same object browser you already use
  for everything else.

In other words: Snowflake's architecture doesn't just *tolerate*
ELT — it's the reason ELT is the default pattern for the entire rest
of this course.

## The three layers this chapter builds on

Every lesson from here through Chapter 6 assumes data moves through
three logical layers, usually implemented as three schemas in the same
database (Lesson 30 formalizes the exact naming convention):

- **Raw** — an unmodified landing zone. Whatever `COPY INTO` or
  Snowpipe loaded, column-for-column, no casts, no filtering. If the
  source sent a bad row, raw has the bad row too — that's the point.
- **Staging / Cleaned** — typed, deduplicated, validated. This is
  where Lessons 22-25 live: `CREATE TABLE AS SELECT`, incremental
  loads, deduplication, and data quality checks all produce or guard
  this layer.
- **Business-ready** — modeled for consumption: star schemas, fact and
  dimension tables (Chapter 6), ready for a BI tool to query directly.

```sql
CREATE SCHEMA IF NOT EXISTS raw;
CREATE SCHEMA IF NOT EXISTS staging;
CREATE SCHEMA IF NOT EXISTS analytics;   -- business-ready
```

## Transient tables fit the raw and staging layers

You already know the difference between permanent and temporary
tables from Chapter 2. Snowflake adds a third option, **transient**
tables, that fits this pipeline especially well: no fail-safe period
(the extra 7-day recovery window permanent tables carry), which lowers
storage cost for data that's disposable and fully reproducible by
re-running the load and the transform.

```sql
CREATE TRANSIENT TABLE staging.orders_cleaned (
    order_id       NUMBER,
    customer_id    NUMBER,
    order_total    NUMBER(12,2),
    order_ts       TIMESTAMP_NTZ
);
```

Raw and staging data can always be rebuilt from the source system or
the layer before it — there's rarely a reason to pay for fail-safe
protection on either. Business-ready tables, by contrast, are usually
worth making permanent: they're what reports depend on directly, and
rebuilding them may be expensive or slow.

## Key terms

| Term | Meaning |
|---|---|
| ELT | Extract, **load** raw data first, **transform** it after, inside the warehouse |
| ETL | Extract, **transform** in a separate engine, **load** the finished result |
| Raw layer | Unmodified landing zone for loaded data — no casts, no filtering |
| Staging / cleaned layer | Typed, deduplicated, validated data — Lessons 22-25 |
| Business-ready layer | Modeled for consumption — star schemas, Chapter 6 |
| Transient table | No fail-safe period; a good fit for disposable, reproducible raw/staging data |

## Lab

1. In your Snowflake trial account, create three schemas in one
   database: `raw`, `staging`, and `analytics`.
2. Create one transient table in `staging` with a shape loosely
   matching a raw table you loaded in Chapter 3 or 4's lab.
3. Write one sentence for yourself explaining why that staging table
   should (or shouldn't) be transient rather than permanent.

## Check yourself

You're ready for Lesson 22 when you can explain, without looking it
up, why Snowflake's storage/compute separation makes ELT the natural
pattern rather than ETL — and name the three layers this chapter and
the next one build through.
