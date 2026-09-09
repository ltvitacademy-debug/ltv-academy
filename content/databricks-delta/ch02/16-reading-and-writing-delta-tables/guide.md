# Lesson 16 — Reading and Writing Delta Tables

**Chapter 2 · Delta Lake · Lesson 16 of 57**

## What you'll learn

- Reading a Delta table: by path, or by name
- The write modes that matter: overwrite, append, and (new) merge-friendly
- `saveAsTable()` — writing straight to a named table, no separate `CREATE TABLE` step
- Why every Foundations DataFrame method still applies once it's loaded

## Reading — path or name

```python
# By path
df = spark.read.format("delta").load("/data/nyc_taxi/delta/trips")

# By name (once registered, Lesson 15)
df = spark.table("trips")
# or, equivalently:
df = spark.sql("SELECT * FROM trips")
```

`spark.table()` is the DataFrame-API way to read a registered
table by name — no `.format("delta")` needed, since Spark already
knows what it is from the metastore. All three return an ordinary
DataFrame; everything from Foundations' Chapter 4 works on it
immediately.

## Write modes — the ones that matter here

```python
trips.write.format("delta").mode("overwrite").save(path)   # replace entirely
trips.write.format("delta").mode("append").save(path)      # add new rows
```

This is exactly Foundations Lesson 60's `mode()` pattern, unchanged.
`overwrite` and `append` behave the same way they did for plain
Parquet — Delta's real advantages show up in Lesson 22's
`MERGE`, which does something neither mode alone can: update
existing rows and insert new ones, in a single atomic operation.

## saveAsTable() — skip the separate CREATE TABLE step

```python
trips.write.format("delta").saveAsTable("trips")
```

`saveAsTable()` does what Lesson 15's DataFrame write + SQL
`CREATE TABLE` did in two steps, in one: writes the data as Delta,
**and** registers it under that name in the metastore immediately.
For a brand-new table, this is usually the shortest real path from
"I have a DataFrame" to "I have a named table."

## Everything you already know still applies

```python
trips = spark.table("trips")

trips.filter(col("trip_distance") > 10).groupBy("VendorID").agg(
    avg("fare_amount").alias("avg_fare")
).show()
```

Once a Delta table is loaded as a DataFrame, it is a DataFrame —
every method from Foundations' Chapter 4 (`select`, `filter`,
`groupBy`, joins, window functions) applies exactly as before. Delta
changes how the data got there and what safety it has at rest; it
doesn't add or change any of the DataFrame API itself.

## Key terms

| Term | Meaning |
|---|---|
| `spark.table(name)` | Reads a registered Delta table by name, no path needed |
| `saveAsTable(name)` | Writes and registers a named table in one call |
| `mode("append")` / `mode("overwrite")` | The same modes from Foundations Lesson 60, unchanged |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: what
does `saveAsTable()` do that a plain `.save(path)` write doesn't?
