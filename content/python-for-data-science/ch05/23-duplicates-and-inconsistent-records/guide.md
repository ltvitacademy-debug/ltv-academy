# Duplicates & Inconsistent Records

Missing values are easy to spot because they show up as `NaN`. Duplicates and inconsistent spellings are sneakier: the data looks complete, but totals are inflated and groups are split. If you've written `SELECT DISTINCT` or `GROUP BY ... HAVING COUNT(*) > 1` in T-SQL, you already know the goal. This lesson shows the pandas tools for it.

## What you'll learn

- How to detect and count duplicate rows with `duplicated()`
- How `drop_duplicates()` and its `subset` and `keep` arguments work
- How to tell an exact copy from a conflicting record
- How to standardize inconsistent text with the `.str` accessor
- Why the order of cleaning steps matters

## Finding duplicate rows

Here is a small illustrative orders table with six rows:

```python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [5001, 5002, 5002, 5003, 5004, 5004],
    "customer": ["Ana Ruiz", "Ben Cole", "Ben Cole",
                 "Ana Ruiz", "Cy Park", "Cy Park"],
    "amount": [120.0, 75.5, 75.5, 60.0, 200.0, 210.0],
})

orders.duplicated().sum()   # 1
```

`duplicated()` returns a True/False per row. By default it compares all columns and marks the second and later copies, so only row 2 is flagged. `orders.drop_duplicates()` removes it and keeps the first occurrence.

## Duplicates defined by a key

In practice, "duplicate" usually means "the same business key", not "identical in every column". Pass `subset`:

```python
orders.duplicated(subset=["order_id"]).sum()   # 2
```

Now two rows are flagged: the copy of order 5002 and the second row of order 5004. Order 5004 is the interesting one. Its amounts differ (200.0 vs 210.0), so it is a **conflict**, not a copy. Dropping it quietly means guessing which value is right. To see every row involved, not just the later ones, use `keep=False`:

```python
orders[orders.duplicated(subset=["order_id"], keep=False)]
```

If you must resolve automatically, `keep="first"` (the default) or `keep="last"` chooses a winner:

```python
orders.drop_duplicates(subset=["order_id"], keep="last")
```

Only do this when you know the later row is the corrected one, for example when rows are sorted by load time.

## Inconsistent records

Now a customer table where the same information is written several ways:

```python
cust = pd.DataFrame({
    "name": ["  Ana Ruiz", "ben cole ", "CY PARK", "Ana  Ruiz"],
    "state": ["GA", "Georgia", "ga", "GA "],
    "status": ["Active", "active", "ACTIVE", "Inactive"],
})

cust["state"].value_counts()
# GA         1
# Georgia    1
# ga         1
# GA         1     (the last has a trailing space)
```

One state, four values. A `groupby("state")` would give four groups, none complete. Use the `.str` methods from the previous chapter:

```python
cust["name"] = (cust["name"].str.strip()
                .str.replace(r"\s+", " ", regex=True)
                .str.title())
cust["state"] = (cust["state"].str.strip()
                 .str.upper()
                 .replace({"GEORGIA": "GA"}))
cust["status"] = cust["status"].str.lower()
```

After this, `cust["state"].value_counts()` shows `GA 4`, and both "Ana Ruiz" rows have the same spelling, so `drop_duplicates(subset=["name"])` correctly recognizes the repeat.

## Order of operations

1. **Strip and normalize case** so spelling differences vanish.
2. **Map variants** with a dictionary (`replace` or `map`) for values like "Georgia".
3. **Deduplicate**, now that identical records actually look identical.
4. **Verify** with `value_counts()` and a before/after row count.

Inspect conflicts before dropping anything, and keep a note of how many rows each step removed.

## Recap

- `duplicated()` flags repeats; `drop_duplicates()` removes them; `subset` defines the key; `keep` picks the survivor.
- Exact copies are safe to drop; conflicting duplicates need investigation.
- Inconsistent spellings split groups. Fix them with `.str.strip()`, `.str.upper()` or `.str.lower()`, and dictionary replacements.
- Standardize first, deduplicate second, verify last.
