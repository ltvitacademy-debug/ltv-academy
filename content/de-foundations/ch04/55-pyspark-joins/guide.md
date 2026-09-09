# Lesson 55 — PySpark Joins

**Chapter 4 · PySpark · Lesson 55 of 62**

## What you'll learn

- `df.join()` — combining two DataFrames on a shared key
- `inner`, `left`, `right`, `full` — the four core join types
- What a `left` join does with a key that has no match
- Avoiding an ambiguous-column error when both sides share a name

## The basic join

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
zones = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True)

joined = trips.join(zones, trips.PULocationID == zones.LocationID, "inner")
joined.select("VendorID", "fare_amount", "Zone", "Borough").show(5)
```

This is the real-world payoff of this whole dataset having a
separate zone lookup table at all — trip records only store a
numeric `PULocationID`; this join is what turns that into an actual
readable `Zone` and `Borough`.

## The four core join types

```python
trips.join(zones, trips.PULocationID == zones.LocationID, "inner")  # only matching keys on both sides
trips.join(zones, trips.PULocationID == zones.LocationID, "left")   # every trip, matched zone or null
trips.join(zones, trips.PULocationID == zones.LocationID, "right")  # every zone, matched trip or null
trips.join(zones, trips.PULocationID == zones.LocationID, "full")   # everything from both sides
```

`"inner"` is the default if you omit the type entirely. For this
specific dataset, `"left"` is usually the right choice: you want
every trip record kept, even if (rarely) its `PULocationID` doesn't
match any row in the zone lookup.

## What left join does with no match

```python
trips.join(zones, trips.PULocationID == zones.LocationID, "left").filter(
    col("Zone").isNull()
).show()
```

A `left` join keeps every row from the left side no matter what —
if a trip's `PULocationID` has no matching zone, the joined `Zone`
and `Borough` columns come back `null` for that row, rather than the
row disappearing. This connects straight back to Lesson 51: after a
join, checking for these new nulls is exactly the same
`.isNull()` pattern.

## Avoiding ambiguous column errors

```python
# Both DataFrames have a column that could be named the same thing --
# reference which DataFrame it came from explicitly:
joined.select(trips.VendorID, zones.Zone).show()
```

If both sides of a join have a column with the same name, referring
to it by a plain string afterward is ambiguous — Spark won't know
which side you mean. Referencing it through the original DataFrame
variable (`trips.VendorID` vs. `zones.VendorID`) resolves it.

## Key terms

| Term | Meaning |
|---|---|
| `df.join()` | Combines two DataFrames on a matching condition |
| `inner` / `left` / `right` / `full` | The four core join types |
| Left join unmatched row | Kept, with `null` in the columns from the right side |

## Lab

```python
result = trips.join(zones, trips.PULocationID == zones.LocationID, "left")
result.select("VendorID", "Zone", "Borough").show(5)
print("Unmatched pickups:", result.filter(col("Zone").isNull()).count())
```

Confirm the join adds real `Zone`/`Borough` values for most rows,
and check whether any pickups have no match at all.

## Check yourself

You're ready for Lesson 56 when you can explain, without looking: what
happens to the columns from the right-hand DataFrame when a `left`
join finds no matching row?
