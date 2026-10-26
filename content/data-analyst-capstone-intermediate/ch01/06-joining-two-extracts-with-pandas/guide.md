# Lesson 6 — Joining Two Extracts with Pandas

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 6 of 16**

## What you'll learn

- Using `pd.merge()` to join the cleaned customer and territory DataFrames on `SalesOrderID`
- Why `how="left"` is the right join type for this specific combination
- Handling the rows that don't find a match on either side
- Confirming the combined DataFrame's row count makes sense before moving on

## Why SalesOrderID is the shared key

Both cleaned extracts share one real, reliable column: `SalesOrderID`. The customer extract
already knows which customer and segment each order line belongs to; the territory extract knows
which territory and territory group. Joining on `SalesOrderID` brings territory information onto
every customer-extract row, without needing to touch `CustomerID` or `TerritoryID` directly.

## The real join

```python
combined_df = pd.merge(
    customer_df,
    territory_df[["SalesOrderID", "TerritoryName", "TerritoryGroup"]],
    on="SalesOrderID",
    how="left"
)

print(combined_df.shape)
print(combined_df["TerritoryName"].isna().sum())
```

`pd.merge()` is pandas' real join function — this is the exact pattern this path's own Python
course teaches for combining two DataFrames: specify the two DataFrames, the shared key with `on`,
and the join type with `how`.

## Why `how="left"`

`how="left"` keeps **every row from `customer_df`** (the left side) and brings in matching columns
from `territory_df` wherever `SalesOrderID` matches. Any customer-extract row with no match in the
territory extract still survives the join — it just gets `NaN` for `TerritoryName` and
`TerritoryGroup` instead of disappearing. That matters here specifically: the Marketing Manager's
segment analysis shouldn't silently lose customer rows just because a handful of orders are
missing from the territory extract.

## Handling the few rows that don't match

```python
combined_df["TerritoryName"] = combined_df["TerritoryName"].fillna("Unknown")
combined_df["TerritoryGroup"] = combined_df["TerritoryGroup"].fillna("Unknown")
```

A small number of orders exist in the customer extract but not the territory extract — orders
pulled in the time gap between the two extracts being run. Rather than drop those rows, which
would quietly shrink the Marketing Manager's numbers, they're labeled `"Unknown"` so they still
count toward segment totals while being clearly flagged in the territory dimension.

## A sanity check worth doing every time

Before moving on, confirm `combined_df` has the same number of rows as the cleaned `customer_df` —
a left join should never add or remove rows from the left side, only add columns. If the row count
changed, something about the join key isn't as unique as assumed, and that's worth catching here,
not three lessons later in a Power BI visual.

## Key terms

| Term | Meaning |
|---|---|
| `pd.merge()` | pandas' function for joining two DataFrames on a shared key |
| `how="left"` | Keeps every row from the left DataFrame, filling unmatched columns with `NaN` |
| Join key | The shared column (`SalesOrderID`) used to match rows between two DataFrames |

## Lab

Run the merge on your own cleaned DataFrames. Confirm `combined_df`'s row count matches
`customer_df`'s row count exactly, then apply the `fillna("Unknown")` fix and confirm zero `NaN`
values remain in `TerritoryName`.

## Check yourself

You're ready for Lesson 7 when you can answer, without looking: why does `how="left"` keep every
customer-extract row even when a `SalesOrderID` has no match in the territory extract, and what
should the combined DataFrame's row count equal if the merge went correctly?
