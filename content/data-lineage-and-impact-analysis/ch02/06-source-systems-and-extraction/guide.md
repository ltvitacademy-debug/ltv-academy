# Lesson 6 — Source Systems and Extraction

**Chapter 2 · Tracing Data · Lesson 6 of 25**

## What you'll learn

- Where lineage actually begins: the handful of source-system types nearly every pipeline pulls from
- The four common extraction methods, and what each one does (and doesn't) preserve about where a row came from
- Why extraction is lineage's "point zero" — a gap here can never be fixed downstream
- How this connects back to table-level lineage from Chapter 1

## Chapter 1 recap, in one sentence

Chapter 1 defined lineage and the table-level vs. column-level distinction (Lesson 4) in the abstract. Chapter 2 traces an actual record through an actual pipeline, hop by hop, starting here — at the moment data leaves a source system and enters yours.

## The source systems

Almost every pipeline you'll trace back to one of three categories:

- **OLTP databases** — the transactional systems of record: SQL Server, Oracle, PostgreSQL, MySQL. Rows here are written by an application (an order form, a POS terminal) the instant something happens.
- **SaaS and API sources** — platforms you don't run yourself: Salesforce, a payroll vendor, a shipping provider. You don't get direct database access — you get what their API chooses to expose, paginated and rate-limited.
- **Files and streams** — flat files (CSV, Parquet, fixed-width) dropped on a schedule by a partner or legacy system, and event streams (Kafka topics, IoT telemetry) that arrive continuously rather than in a batch.

Each category constrains what lineage metadata is even *available* at the source. An OLTP database usually has reliable timestamps and primary keys. A vendor's CSV drop might have neither — which means your extraction job has to manufacture that lineage metadata itself (a load timestamp, a batch ID) because the source never will.

## The extraction methods

- **Full extract** — pull every row, every time. Simplest to reason about, but it can't tell you *what changed* — only what exists right now. Lineage here is "this whole table, as of this run."
- **Incremental extract** — pull only rows new or changed since the last run, usually filtered on a `modified_date` or similar column. Lineage now includes *which run* a row arrived in, not just which table it came from.
- **Change Data Capture (CDC)** — reads the database's own transaction log, capturing every insert, update, and delete as a discrete event, in order. This is the richest lineage source: you get a row's full history of changes, not just its current state.
- **API pull** — paginated calls against a vendor's endpoint, usually bounded by a date range or a cursor token. Lineage depends entirely on what the API itself tracks — if the vendor doesn't expose a "last modified" field, your extraction job can't reconstruct one after the fact.

## Why extraction is lineage's point zero

Every later hop in this chapter — staging, transformation, the warehouse, the semantic model, the dashboard — can only be as trustworthy as what gets recorded *right here*. If an extraction job doesn't tag each landed row with its source system, the extraction method, and the run that pulled it, there's no way to answer "where did this number come from?" three hops later. You can't recover missing lineage after the fact; you can only capture it at the moment data first crosses into your environment, or lose it permanently.

```
CRM (Salesforce)   -> Nightly Full Extract -> raw.salesforce_accounts
SQL Server OLTP    -> CDC Log Reader       -> raw.orders_cdc
Vendor API         -> Paginated API Pull   -> raw.vendor_transactions
```

This is deliberately the simplest possible lineage diagram: three sources, three extraction methods, one landing zone each. Every lesson for the rest of this chapter adds another hop on top of it.

## Key terms

| Term | Meaning |
|---|---|
| OLTP source | A transactional system of record (SQL Server, Oracle, Postgres) written by an application in real time |
| CDC (Change Data Capture) | Reading a database's transaction log to capture every insert/update/delete as a discrete, ordered event |
| Incremental extract | Pulling only rows new or changed since the last run, instead of the whole table |
| Landing zone | The first place extracted data lands in your environment, before any transformation |

## Lab

Pick one real pipeline you know (at work, or a personal project). Identify its source system's category (OLTP / SaaS-API / file-or-stream) and its extraction method (full / incremental / CDC / API pull). Then write one sentence: what lineage metadata does that extraction job capture about each row today, and what's missing that you'd want if you had to explain a bad number six months from now?

## Check yourself

Without looking back, can you name the four extraction methods and explain, for each, what kind of lineage information it preserves that the others don't?
