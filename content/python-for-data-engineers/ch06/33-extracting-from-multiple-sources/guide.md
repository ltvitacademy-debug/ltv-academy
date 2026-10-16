# Lesson 33 — Extracting From Multiple Sources

**Chapter 6 · Python for Data Engineers · Lesson 33 of 48**

## What you'll learn

- Writing one extract function per data source
- Combining a CSV extract with a real AdventureWorks2012 database extract
- Returning a dictionary of DataFrames from a multi-source extract stage
- Why isolating each source's extract logic matters even when sources are unrelated

## Real pipelines rarely have one source

Lesson 32's `extract()` read a single CSV. A real pipeline's Extract
stage is more often several independent extracts — a file here, a
database table there, sometimes an API (Chapter 3) — each with its own
format and its own failure modes. This lesson builds the pattern with
two genuinely different sources: `orders.csv`, and a live query against
AdventureWorks2012.

## Extract function 1: the CSV

```python
import pandas as pd

def extract_orders(path="orders.csv"):
    return pd.read_csv(path)
```

Nothing new here — this is Lesson 32's `extract()`, given a name
specific to what it extracts, since there's about to be a second
extract function alongside it.

## Extract function 2: a database query

```python
import pyodbc

def extract_product_categories():
    conn = pyodbc.connect(
        "DRIVER={ODBC Driver 18 for SQL Server};"
        "SERVER=localhost;DATABASE=AdventureWorks2012;Trusted_Connection=yes;"
    )
    try:
        query = "SELECT ProductCategoryID, Name FROM Production.ProductCategory;"
        return pd.read_sql(query, conn)
    finally:
        conn.close()
```

`Production.ProductCategory` has nothing to do with the outdoor-gear
`orders.csv` data — that's intentional. The point of this lesson isn't
that the two sources join together; it's the pattern itself: each
source gets its own extract function, written and tested
independently, using whichever Chapter 5 technique fits that source
(here, `pyodbc` plus `pd.read_sql()`).

## Running both extracts together

```python
def extract_all():
    return {
        "orders": extract_orders("orders.csv"),
        "product_categories": extract_product_categories(),
    }

sources = extract_all()
print(sources["orders"].shape)
print(sources["product_categories"].shape)
```

Returning a dictionary keyed by source name, rather than a single
DataFrame, is what makes `extract_all()` scale past two sources — the
Transform stage can pull out exactly the source it needs by name, and
adding a third source later means adding one more key, not
restructuring the function's return value.

## What happens when one source fails

```python
def extract_all():
    sources = {}
    sources["orders"] = extract_orders("orders.csv")
    try:
        sources["product_categories"] = extract_product_categories()
    except pyodbc.Error as err:
        print(f"Database source unavailable, continuing without it: {err}")
        sources["product_categories"] = None
    return sources
```

Whether a failed source should stop the whole pipeline or just be
skipped is a real design decision, not a default — in this version, a
database outage doesn't block loading the CSV data that's still
perfectly usable on its own.

## Key terms

| Term | Meaning |
|---|---|
| Multi-source extract | An Extract stage that pulls from more than one independent source |
| `extract_all()` | A function that runs every source's extract and returns them keyed by name |

## Lab

Add a third extract function, `extract_employees()`, that queries
`HumanResources.Employee` for `BusinessEntityID` and `JobTitle`, and
add it to `extract_all()`'s dictionary.

## Check yourself

You're ready for Lesson 34 when you can explain, without looking: why
each source gets its own extract function, and why `extract_all()`
returns a dictionary instead of a single combined DataFrame.
