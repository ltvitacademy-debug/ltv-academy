# Lesson 5 — Cleaning the Data with Pandas

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 5 of 16**

## What you'll learn

- Loading both extracts into pandas DataFrames
- Removing the duplicate rows found in Lesson 4 with `.drop_duplicates()`
- Fixing the inconsistent `TerritoryName` values with string cleanup and `.fillna()`
- Dropping rows with missing critical values using `.dropna()`

## Load both extracts

```python
import pandas as pd

customer_df = pd.read_csv("customer_segment_extract.csv")
territory_df = pd.read_csv("territory_extract.csv")

print(customer_df.shape, territory_df.shape)
```

Printing `.shape` first is a habit worth keeping — it's the baseline row count you'll compare
against after each cleaning step, so you can see exactly how many rows each fix actually removed
or changed.

## Fix 1 — remove the duplicate customer rows

```python
before = len(customer_df)
customer_df = customer_df.drop_duplicates()
after = len(customer_df)
print(f"Removed {before - after} duplicate rows")
```

`.drop_duplicates()` compares every column across rows and removes exact repeats — which is
exactly the shape of the problem from Lesson 4: the same `(CustomerID, SalesOrderID, LineTotal, …)`
combination, repeated because the export ran twice.

## Fix 2 — a handful of missing segment values

A few rows arrived with a blank `CustomerSegment` — a known data-entry gap, not a mystery:

```python
customer_df["CustomerSegment"] = customer_df["CustomerSegment"].fillna("Individual")
```

`.fillna()` replaces missing (`NaN`) values with a stated default — here, `"Individual"`, because
that's Thornbury's documented fallback for any row where the segment didn't come through cleanly.

## Fix 3 — clean up the inconsistent territory names

```python
territory_df["TerritoryName"] = (
    territory_df["TerritoryName"]
    .str.strip()
    .str.title()
)
```

`.str.strip()` removes the leading/trailing whitespace from the spreadsheet review pass;
`.str.title()` normalizes casing so `"canada"` and `"Canada"` both become `"Canada"`. Both methods
run across every value in the column — no row-by-row loop required.

## Fix 4 — drop rows with no line total at all

```python
territory_df = territory_df.dropna(subset=["LineTotal"])
```

`.dropna(subset=["LineTotal"])` removes only rows missing that one specific column, rather than
dropping a row because *any* column is missing — the right level of caution, since a missing
`LineTotal` makes a row unusable for totals, but a missing value elsewhere might not.

## Key terms

| Term | Meaning |
|---|---|
| `.drop_duplicates()` | Removes rows that are exact repeats of another row |
| `.fillna(value)` | Replaces missing values in a column with a stated default |
| `.dropna(subset=[...])` | Removes rows missing a value in specific named columns |
| `.str.strip()` / `.str.title()` | Clean whitespace / normalize capitalization across a text column |

## Lab

Apply all four fixes to your own copies of the two extracts. Print `.shape` before and after each
fix, and confirm: zero duplicate rows remain in the customer extract, `CustomerSegment` only shows
`Individual` or `Store/Reseller`, and `TerritoryName` has no more than one spelling per real
territory.

## Check yourself

You're ready for Lesson 6 when you can answer, without looking: what's the difference between
`.dropna()` and `.fillna()`, and why does `.drop_duplicates()` correctly solve the specific
duplicate-row problem from Lesson 4?
