# Lesson 17 — Writing the Script

**Chapter 5 · Python Ingestion Layer · Lesson 17 of 26**

## What you'll learn

- A real, complete ingestion script: read, clean, connect, load
- How `pandas` and `snowflake-connector-python` combine in one real
  file, start to finish
- Why this script loads into `RAW`, using the `TRANSFORMER` role from
  Chapter 2 — not a new role invented just for this script
- What to check to confirm the load actually worked

## The full script

```python
# ingestion/load_campaign_exports.py
import pandas as pd
import snowflake.connector
import os

CSV_PATH = "campaign_export.csv"

def read_and_clean(csv_path):
    df = pd.read_csv(csv_path)
    df = df.dropna(subset=["campaign_id", "customer_email"])
    df["sent_at"] = pd.to_datetime(df["sent_at"])
    df["opened"] = df["opened"].fillna(False).astype(bool)
    return df

def load_to_snowflake(df):
    conn = snowflake.connector.connect(
        user=os.environ["SNOWFLAKE_USER"],
        password=os.environ["SNOWFLAKE_PASSWORD"],
        account=os.environ["SNOWFLAKE_ACCOUNT"],
        role="transformer",
        warehouse="transforming_wh",
        database="jaffle_shop_db",
        schema="raw",
    )
    cur = conn.cursor()
    try:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS raw_campaign_sends (
                campaign_id STRING,
                customer_email STRING,
                sent_at TIMESTAMP,
                opened BOOLEAN
            )
        """)
        rows = list(df.itertuples(index=False, name=None))
        cur.executemany(
            "INSERT INTO raw_campaign_sends "
            "(campaign_id, customer_email, sent_at, opened) "
            "VALUES (%s, %s, %s, %s)",
            rows,
        )
        conn.commit()
        print(f"Loaded {len(rows)} rows into raw_campaign_sends.")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    df = read_and_clean(CSV_PATH)
    load_to_snowflake(df)
```

## Walking through the two real halves

**Reading and cleaning (`pandas`):** `pd.read_csv()` loads the export;
`.dropna(subset=[...])` drops rows missing the two columns this
platform can't work without; `pd.to_datetime()` and `.astype(bool)`
fix types before anything is sent to Snowflake — exactly the same
cleaning vocabulary already used elsewhere in this path's Python work.

**Connecting and loading (`snowflake-connector-python`):**
`snowflake.connector.connect(...)` opens a real connection, using the
same `transformer` role and `transforming_wh` warehouse Chapter 2
already built — this script doesn't invent new Snowflake access, it
reuses what already exists. `cur.execute()` runs the `CREATE TABLE IF
NOT EXISTS`, and `cur.executemany()` loads every cleaned row in one
batch call.

## Why `role="transformer"`, not a new role

This script writes into `jaffle_shop_db.raw` — the exact same schema
and the exact same role dbt itself uses. Reusing `transformer` instead
of inventing a dedicated ingestion role keeps the RBAC story from
Chapter 2 simple: one role writes raw and transformed data across this
whole platform, not a sprawl of narrowly-scoped roles each
rubber-stamped once and forgotten.

## Confirming the load worked

```sql
SELECT COUNT(*) FROM jaffle_shop_db.raw.raw_campaign_sends;
SELECT * FROM jaffle_shop_db.raw.raw_campaign_sends LIMIT 10;
```

The same verification habit from Lesson 4's `COPY INTO` loads applies
here too — check the real row count and real sample rows in Snowflake,
never just trust the script's own `print` statement.

## Key terms

| Term | Meaning |
|---|---|
| `pd.read_csv()` / `.dropna()` | pandas functions reading and cleaning the raw export before loading |
| `snowflake.connector.connect(...)` | Opens a real connection to Snowflake from Python |
| `cur.executemany(...)` | Runs the same parameterized INSERT once per row, in a single batch call |
| Role reuse | This script uses the existing `transformer` role rather than a new, dedicated one |

## Lab

1. Write `load_campaign_exports.py` exactly as shown, adjusting column
   names to match a real sample CSV you create.
2. Run it against a Snowflake trial account and confirm
   `raw_campaign_sends` gets created and populated.
3. Explain, in one sentence, why this script connects using the
   `transformer` role instead of a dedicated new one.

## Check yourself

You're ready for Lesson 18 when you can explain both halves of this
script — cleaning and loading — and why it reuses Chapter 2's
existing role instead of creating a new one.
