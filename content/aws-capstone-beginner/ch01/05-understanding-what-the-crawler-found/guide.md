# Understanding What the Crawler Found

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 5 of 10**

## What you'll learn

- The real inferred schema the crawler produced for `orders_raw`
- Where schema inference gets something wrong, and why
- Two real ways to fix an inferred column, and when to use each

## Reading the inferred schema

After the crawler run in Lesson 4, check what it actually registered:

```
aws glue get-table --database-name northfield_raw_db --name orders_raw
```

The inferred schema:

| Column | Inferred type | Correct? |
|---|---|---|
| `order_id` | `bigint` | Yes |
| `order_date` | `string` | Not quite |
| `product_category` | `string` | Yes |
| `product_name` | `string` | Yes |
| `quantity` | `bigint` | Yes |
| `unit_price` | `double` | Yes |
| `customer_region` | `string` | Yes |

Five of seven columns are exactly right. `order_date` is the one worth stopping on.

## Why `order_date` came back as a string

CSV files carry no type information — every value is just text until something decides
otherwise. The crawler's classifier samples values like `2026-08-01` and has to guess a
type. Here, it played it safe and classified the whole column as `string` rather than a
proper `date` type. That's a common, reasonable default: the crawler would rather under-commit
on type than guess wrong and make date values unreadable.

This isn't a bug to panic over — it just means date-based filtering or grouping in Athena
needs an explicit date function instead of relying on native date comparisons.

## Two ways to fix it

**Option 1 — cast at query time in Athena**, no schema change needed:

```sql
SELECT date_parse(order_date, '%Y-%m-%d') AS order_date_parsed
FROM northfield_raw_db.orders_raw
LIMIT 5;
```

This is the lowest-effort fix, and it's exactly what this project uses — there's no
repeated job depending on this table, so fixing it at query time is enough.

**Option 2 — edit the Catalog's column type by hand**, for a table other people and jobs
will depend on repeatedly:

```
aws glue update-table \
  --database-name northfield_raw_db \
  --table-input '{"Name": "orders_raw", "StorageDescriptor": {"Columns": [
    {"Name": "order_date", "Type": "date"}, ...
  ]}}'
```

Editing the Catalog directly is the right call once a table is load-bearing for multiple
downstream jobs — which is exactly the situation the Intermediate project's curated
dataset will be in, and why that project edits the schema instead of casting at query
time.

## Why this matters beyond this one column

Crawler schema inference is a real, recurring thing to check, not a one-time curiosity.
Every time source files change shape — a new column added upstream, a format change in an
existing one — rerunning the crawler can quietly shift a column's inferred type. Checking
`get-table` after every crawler run is a habit worth keeping, here and on every future AWS
data project.

## Key terms

| Term | Meaning |
|---|---|
| Classifier | The crawler component that inspects sampled values and infers a column's type |
| Schema drift | A column's inferred type or structure changing between crawler runs |
| Cast | Converting a value from one type to another at query time, without changing stored data |
| Load-bearing table | A table other recurring jobs or dashboards depend on, where schema accuracy matters more |

## Check yourself

Why did the crawler infer `order_date` as a `string` instead of a `date`, and why is
casting it at query time in Athena the right fix here instead of editing the Catalog
schema directly?
