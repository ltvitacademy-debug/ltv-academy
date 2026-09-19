# Querying S3 Data With Athena

Lesson 18 covered what Athena is; this lesson gets hands-on with the actual SQL. Every
Athena query ultimately runs against a table the Catalog knows about, so the starting point
is defining that table — either by letting a Glue crawler do it (Chapter 3) or by writing
`CREATE EXTERNAL TABLE` yourself. Both paths lead to the same place: a table you can query
with ordinary `SELECT` statements.

## What you'll learn

- The `CREATE EXTERNAL TABLE` syntax and what each clause does
- Querying Parquet, CSV, and JSON data with the same SQL
- A real, complete example query against an external table
- Where Athena writes query results, and why that matters

## CREATE EXTERNAL TABLE

An **external table** in Athena doesn't store data — it's metadata pointing at an S3
location, exactly like the Catalog tables a crawler creates (they're the same underlying
Catalog entries; `CREATE EXTERNAL TABLE` is just the manual, SQL-based way to create one
instead of running a crawler):

```sql
CREATE EXTERNAL TABLE raw.orders (
  order_id     string,
  customer_id  string,
  order_total  double,
  order_date   date
)
STORED AS PARQUET
LOCATION 's3://my-data-lake/raw/orders/';
```

`STORED AS` tells Athena the file format to expect at that location, and `LOCATION` is the
S3 prefix it reads from. Once this runs, `raw.orders` is queryable like any table — and it
shows up in the Glue Data Catalog, visible to any other Catalog-aware service, exactly like
a crawler-created table would.

## Format-specific syntax differences

The `SELECT` queries you write afterward look identical regardless of format — the
differences live entirely in how the table is declared:

- **Parquet**: `STORED AS PARQUET` — schema is embedded in the files, so column types just
  need to match what's actually there.
- **CSV**: typically uses `ROW FORMAT DELIMITED FIELDS TERMINATED BY ','` with
  `STORED AS TEXTFILE`, and every column must be explicitly typed since CSV carries no
  schema of its own.
- **JSON**: uses a JSON SerDe (serializer/deserializer) declared in `ROW FORMAT SERDE`,
  mapping JSON keys to column names.

## A real query example

```sql
SELECT
  customer_id,
  COUNT(*)      AS order_count,
  SUM(order_total) AS lifetime_value
FROM raw.orders
WHERE order_date >= DATE '2024-01-01'
GROUP BY customer_id
ORDER BY lifetime_value DESC
LIMIT 10;
```

This is ordinary ANSI SQL — nothing Athena-specific about the `SELECT` itself. What's
Athena-specific is what happens underneath: this query scans exactly the S3 objects
`raw.orders` points at, and you're billed for the bytes it reads to answer it.

## Where results go

Every Athena query writes its output to an S3 location you configure once (the **query
result location**) as CSV, in addition to displaying results in the console or returning
them via API/JDBC. That's worth knowing operationally — a busy Athena workgroup can
accumulate a large number of small result files in that bucket over time if nothing cleans
them up.

## Key terms

| Term | Meaning |
|---|---|
| External table | A Catalog table pointing at an S3 location; stores no data itself |
| CREATE EXTERNAL TABLE | SQL statement to manually define a table Athena can query |
| SerDe | Serializer/deserializer — logic mapping a file format's structure to table columns |
| Query result location | The S3 path Athena writes every query's output to |

## Check yourself

If a Glue crawler and a manually written `CREATE EXTERNAL TABLE` statement can both produce
a queryable Athena table pointing at the same S3 data, what's actually different between
the two approaches — and when would you reach for the manual SQL instead of a crawler?
