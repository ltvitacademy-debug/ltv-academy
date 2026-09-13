# Lesson 25 — Data Quality Checks in Snowflake SQL

**Chapter 5 · Data Transformation / ELT · Lesson 25 of 60**

## What you'll learn

- Writing null/completeness checks directly in SQL
- Referential checks — catching foreign keys that point nowhere, using an anti-join
- Row-count sanity checks between layers, to catch silent data loss
- Why this chapter closes here: these checks are what "cleaned" actually means

## Why this lesson closes out the ELT chapter

Lessons 21-24 built the mechanics of moving and reshaping data: the
ELT pattern, CTAS, incremental loads, deduplication. None of that
guarantees the *result* is trustworthy. A staging table can be
perfectly incremental, perfectly deduplicated, and still be wrong —
missing rows, broken relationships, unexpected nulls. Data quality
checks are plain SQL queries that catch that before it reaches
Chapter 6's dimensional models or a report.

## Null / completeness checks

The simplest check: does a column that should never be null actually
have any nulls?

```sql
SELECT COUNT(*) AS null_customer_ids
FROM staging.orders_cleaned
WHERE customer_id IS NULL;
```

A non-zero result means either the source system sent bad data, or an
earlier transformation step has a bug — either way, this needs to be
zero before the table is trusted downstream.

## Referential checks: an anti-join for orphans

You already know anti-joins from T-SQL. The same pattern catches
foreign keys that point to nothing — an order referencing a
`customer_id` that doesn't exist in the customer table:

```sql
SELECT o.order_id, o.customer_id
FROM staging.orders_cleaned AS o
LEFT JOIN staging.customers_cleaned AS c
    ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;
```

Any row returned here is an "orphan" — a real referential integrity
problem, not just a style issue. In a star schema (Chapter 6), an
orphaned foreign key means a fact row won't match any dimension row,
silently disappearing from reports that inner-join fact to dimension.

## Row-count sanity checks between layers

A load or transformation that silently drops rows is one of the
hardest bugs to notice, because nothing errors — the pipeline just
"succeeds" with fewer rows than it should have. Compare counts across
layers to catch it:

```sql
SELECT
    (SELECT COUNT(*) FROM raw.orders)             AS raw_count,
    (SELECT COUNT(*) FROM staging.orders_cleaned)  AS staging_count;
```

An unexplained gap between the two — beyond what deduplication or a
documented filter accounts for — is a signal something upstream broke.

## Where this is headed: dbt

Writing and rerunning these checks by hand works, but it doesn't
scale past a handful of tables — nobody remembers to rerun twelve
ad-hoc queries before trusting a table. **dbt**, a later course in
this catalog, formalizes exactly this idea: null checks, referential
checks (`relationships` tests), and row-count expectations become
declarative YAML config that runs automatically on every build. Here,
in plain Snowflake SQL, you're learning what those tests are actually
checking under the hood — dbt doesn't invent a new kind of check, it
automates running the ones you just wrote by hand.

## Key terms

| Term | Meaning |
|---|---|
| Completeness check | Confirms a column that shouldn't be null actually isn't |
| Referential check | Confirms every foreign key value exists in the table it references, via anti-join |
| Orphan row | A row whose foreign key points to nothing — found by a `LEFT JOIN ... WHERE ... IS NULL` |
| Row-count sanity check | Compares counts across layers to catch silent data loss |

## Lab

1. Write a null check against a "should never be null" column in a
   staging table from an earlier lab.
2. Write an anti-join referential check between two related staging
   tables and confirm it returns zero rows (or investigate if it
   doesn't).
3. Compare row counts between a raw table and its staging counterpart,
   and account for any difference in one sentence.

## Check yourself

You're ready for Lesson 26 when you can write an anti-join referential
check from memory, and explain why a row-count check alone wouldn't
have caught an orphaned foreign key.
