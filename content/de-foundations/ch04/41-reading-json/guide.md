# Lesson 41 — Reading JSON

**Chapter 4 · PySpark · Lesson 41 of 62**

## What you'll learn

- `spark.read.json()` — the same read API, a different format
- Line-delimited JSON vs. one giant JSON array — why it matters
- Nested JSON fields become nested Spark struct columns
- Flattening a nested field with dot notation

## The same API, a different format

```python
df = spark.read.json("/data/nyc_taxi/zone_lookup.json")
df.show(5)
df.printSchema()
```

Notice this looks almost exactly like Lesson 40's `spark.read.csv()`
call. That's the pattern across all of `spark.read` — csv, json,
parquet (Lesson 42) — same shape, different reader.

## Line-delimited JSON, not one giant array

Spark expects **one JSON object per line**, not a single array
wrapping everything:

```json
{"LocationID": 1, "Borough": "EWR", "Zone": "Newark Airport"}
{"LocationID": 2, "Borough": "Queens", "Zone": "Jamaica Bay"}
```

not:

```json
[
  {"LocationID": 1, "Borough": "EWR", "Zone": "Newark Airport"},
  {"LocationID": 2, "Borough": "Queens", "Zone": "Jamaica Bay"}
]
```

This matters because Spark distributes a file across many workers by
splitting it into chunks — one JSON object per line lets each worker
parse its chunk independently. A single giant array can't be split
that way. (Spark can read a multi-line array too, with
`multiLine=True`, but at the cost of that same distribution benefit.)

## Nested fields become struct columns

```python
# a record like {"pickup": {"lat": 40.7, "lon": -73.9}, "fare": 12.5}

df.printSchema()
# root
#  |-- pickup: struct (nullable = true)
#  |    |-- lat: double (nullable = true)
#  |    |-- lon: double (nullable = true)
#  |-- fare: double (nullable = true)

df.select("pickup.lat", "pickup.fare").show()
```

Dot notation reaches into a nested struct the same way you'd reach
into a nested Python dictionary — `pickup["lat"]` becomes
`"pickup.lat"` in Spark's column-selection syntax.

## Key terms

| Term | Meaning |
|---|---|
| `spark.read.json()` | Reads a JSON file into a Spark DataFrame |
| Line-delimited JSON | One JSON object per line — Spark's expected default format |
| struct column | A nested JSON object becomes a nested column, accessed with dot notation |

## Lab

```python
zones = spark.read.json("/data/nyc_taxi/zone_lookup.json")
zones.printSchema()
zones.select("Borough", "Zone").show(10)
```

Confirm you can select just `Borough` and `Zone` without pulling in
every field — the same selective-columns idea from Lesson 44's
`select()`, previewed early here.

## Check yourself

You're ready for Lesson 42 when you can explain, without looking: why
does Spark expect one JSON object per line, rather than one big
array?
