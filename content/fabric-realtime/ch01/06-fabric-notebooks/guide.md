# Lesson 6 — Fabric Notebooks

**Chapter 1 · Microsoft Fabric · Lesson 6 of 70**

## What you'll learn

- Fabric notebooks: cells, kernels, and a default language — same shape as Databricks & Delta Lake Lesson 6
- Attaching a notebook to a lakehouse, not a cluster you configure
- `%%pyspark`, `%%sql` — Fabric's own magic commands
- Reading this course's own lakehouse table, in real PySpark

## Same shape, different attachment target

Recall Databricks & Delta Lake Lesson 6: a notebook is a sequence
of independently-runnable cells, with one default language and
magic commands overriding it per cell. Fabric notebooks work
exactly the same way. What's different is Lesson 7 of that course's
**attachment** step: instead of attaching to a cluster you
configured yourself (Databricks & Delta Lake Lesson 4), a Fabric
notebook attaches to a **lakehouse**, and Fabric provisions the
Spark session behind that attachment automatically — no cluster
form to fill in at all.

## Attaching to a lakehouse

1. Open a notebook, and in the **Explorer** pane, select **Add lakehouse**.
2. Choose `nyc_taxi_lakehouse` (Lesson 4).
3. That lakehouse's **Tables** and **Files** now appear directly in the notebook's sidebar — browsable, without writing a single line of code.

This attachment is what makes `spark.read.table("trips")` resolve
correctly (Lesson 4's table, reached the same way Databricks &
Delta Lake Lesson 16's `spark.table()` worked) — the notebook
already knows which lakehouse "trips" belongs to, from the
attachment, not from any path you typed.

## Fabric's own magic commands

```python
%%pyspark
df = spark.read.table("trips")
df.show(5)
```

```sql
%%sql
SELECT VendorID, COUNT(*) AS trip_count FROM trips GROUP BY VendorID
```

`%%pyspark` and `%%sql` are Fabric's versions of Databricks & Delta
Lake Lesson 6's `%python`/`%sql` — same idea, a double-percent
instead of a single one, and a cell-opening line instead of an
inline prefix. The underlying concept (override this cell's
language) is identical.

## Reading this course's own table

```python
%%pyspark
trips = spark.read.table("trips")
trips.filter(trips.fare_amount > 0).groupBy("VendorID").count().show()
```

Every PySpark method from Foundations' entire Chapter 4 — `filter`,
`groupBy`, joins, window functions — works completely unchanged in
a Fabric notebook. Nothing about the DataFrame API itself is
Fabric-specific; only the notebook's attachment step, and its magic
commands' exact syntax, differ from Databricks.

## Key terms

| Term | Meaning |
|---|---|
| Attach to a lakehouse | Fabric's version of attaching to a cluster — no cluster config involved |
| `%%pyspark` / `%%sql` | Fabric's magic commands — same idea as Databricks', different syntax |
| `spark.read.table()` | Resolves using the attached lakehouse, exactly like Databricks & Delta Lake Lesson 16 |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what
does attaching a notebook to a lakehouse do that attaching to a
Databricks cluster didn't need to?
