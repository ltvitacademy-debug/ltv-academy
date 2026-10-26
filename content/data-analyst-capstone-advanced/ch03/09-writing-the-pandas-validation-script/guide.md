# Lesson 9 — Writing the Pandas Validation Script

**Chapter 3 · Python Data-Quality Automation · Lesson 9 of 26**

## What you'll learn

- How to connect Python to the `dw.*` warehouse with `pyodbc` and
  `sqlalchemy`, the same real connection pattern used elsewhere in
  this catalog
- The real pandas code for all four checks named in Lesson 8: row-count
  parity, nulls, duplicates, and orphaned keys
- Why the orphan check is written as a **set difference**, specifically
- How the script reports a clear pass/fail instead of just printing
  numbers and leaving someone to interpret them

## Connecting to the warehouse

```python
import pandas as pd
from sqlalchemy import create_engine

engine = create_engine(
    "mssql+pyodbc://@localhost/AdventureWorks2012"
    "?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes"
)

fact = pd.read_sql("SELECT * FROM dw.FactProductSales", engine)
dim_product = pd.read_sql("SELECT * FROM dw.DimProduct", engine)
dim_territory = pd.read_sql("SELECT * FROM dw.DimTerritory", engine)
source_count = pd.read_sql(
    "SELECT COUNT(*) AS n FROM Sales.SalesOrderDetail", engine
)["n"][0]
```

`create_engine` with `mssql+pyodbc` is the same real connection string
shape used to reach SQL Server from Python anywhere else in this
catalog — `sqlalchemy` wraps `pyodbc`'s driver underneath, and
`pd.read_sql` turns a query straight into a DataFrame, which is what
every check below actually operates on.

## Check 1: row-count parity

```python
def check_row_count_parity(fact_df, source_n):
    warehouse_n = len(fact_df)
    passed = warehouse_n == source_n
    return {
        "check": "row_count_parity",
        "passed": passed,
        "detail": f"source={source_n}, warehouse={warehouse_n}",
    }
```

This is the exact same comparison Lesson 6 ran by hand in SSMS —
`len(fact_df)` is pandas' equivalent of `SELECT COUNT(*)`, now
expressed in code that can run unattended.

## Check 2: unexpected nulls

```python
def check_nulls(fact_df, required_cols):
    null_counts = fact_df[required_cols].isna().sum()
    bad = null_counts[null_counts > 0]
    return {
        "check": "unexpected_nulls",
        "passed": bad.empty,
        "detail": bad.to_dict(),
    }

required_cols = ["ProductKey", "OrderDateKey", "TerritoryKey", "CustomerKey", "LineTotal"]
```

`.isna().sum()` counts nulls per column in one call. Every column
listed in `required_cols` is `NOT NULL` on the real warehouse table —
so any nonzero count here means something is wrong upstream, not a
column that's simply allowed to be empty.

## Check 3: duplicate rows

```python
def check_duplicates(fact_df):
    dupes = fact_df[fact_df.duplicated(subset=["SalesOrderDetailID"], keep=False)]
    return {
        "check": "duplicate_rows",
        "passed": dupes.empty,
        "detail": f"{len(dupes)} duplicate rows on SalesOrderDetailID",
    }
```

`.duplicated(subset=["SalesOrderDetailID"])` checks for the specific
failure mode a re-run load without a clean reload step would cause:
the same real order-line ID loaded into the warehouse more than once.
`keep=False` marks *every* copy of a duplicate, not just the second
one, so the detail output shows the full set.

## Check 4: orphaned keys, as a set difference

```python
def check_orphaned_keys(fact_df, dim_df, fact_col, dim_col, name):
    orphans = set(fact_df[fact_col]) - set(dim_df[dim_col])
    return {
        "check": f"orphaned_{name}_key",
        "passed": len(orphans) == 0,
        "detail": sorted(orphans),
    }

product_result = check_orphaned_keys(
    fact, dim_product, "ProductKey", "ProductKey", "product"
)
territory_result = check_orphaned_keys(
    fact, dim_territory, "TerritoryKey", "TerritoryKey", "territory"
)
```

`set(fact_df[fact_col]) - set(dim_df[dim_col])` is the whole check: it
takes every key the fact table actually uses, every key the dimension
actually has, and subtracts the second set from the first. Whatever's
left over is a key the fact table references that doesn't exist in
the dimension at all — exactly the failure mode the night-40 scenario
in Lesson 8 described. If the foreign-key constraints from Lesson 6
are in place, this should always come back empty; this check exists
for the moment something upstream bypasses that constraint, like a
bulk load that temporarily disables it.

## Reporting a clear pass/fail

```python
def run_all_checks():
    results = [
        check_row_count_parity(fact, source_count),
        check_nulls(fact, required_cols),
        check_duplicates(fact),
        product_result,
        territory_result,
    ]
    for r in results:
        status = "PASS" if r["passed"] else "FAIL"
        print(f"[{status}] {r['check']}: {r['detail']}")
    return all(r["passed"] for r in results)

if __name__ == "__main__":
    ok = run_all_checks()
    exit(0 if ok else 1)
```

The script exits with code `0` on a clean pass and `1` on any
failure. That exit code is what Lesson 10's scheduled task actually
watches — a human reading the warehouse never has to open this
script's output at all unless something already went wrong.

## Key terms

| Term | Meaning |
|---|---|
| `sqlalchemy.create_engine` | Builds a reusable database connection object from a connection string |
| Set difference | `set(A) - set(B)` — everything in A that isn't also in B, used here to find orphaned keys |
| Exit code | A number a script returns on completion; `0` conventionally means success, nonzero means failure |

## Lab

1. Install `pandas`, `sqlalchemy`, and `pyodbc`, then run the
   connection code above against your own warehouse.
2. Run all four check functions against your real `dw.FactProductSales`
   data and confirm every one reports `PASS`.
3. Temporarily insert one row into `dw.FactProductSales` with a
   `TerritoryKey` that doesn't exist in `dw.DimTerritory` (you'll need
   to drop the foreign key constraint first), re-run
   `check_orphaned_keys`, and confirm it reports the exact orphaned
   value. Clean the row back out afterward.

## Check yourself

You're ready for Lesson 10 when you can explain, from memory, what
each of the four check functions actually does, why the orphan check
specifically uses a set difference, and why the script communicates
its result as an exit code instead of only printed text.
