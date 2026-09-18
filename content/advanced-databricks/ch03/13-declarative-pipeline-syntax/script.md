# Script — Declarative Pipeline Syntax

## Segment 1 (title)

Lesson 12 named streaming tables and materialized views. Here's what they actually look like in real SQL and Python syntax, and how their dependencies get inferred without anyone declaring them.

## Segment 2 (code: CREATE STREAMING TABLE)

A streaming table processes each row exactly once, incrementally, as it arrives — the SQL analog of Auto Loader. CREATE OR REFRESH STREAMING TABLE, reading from a cloud_files source, is the real syntax for it.

## Segment 3 (code: CREATE MATERIALIZED VIEW + dependency)

A materialized view recomputes its full result on refresh. Look at "FROM bronze_trips" in its definition — that plain table reference is the entire dependency declaration. Lakeflow builds the execution graph from exactly that.

## Segment 4 (code: Python equivalent)

pyspark.pipelines mirrors this exactly — spark.read.table and spark.readStream.table are all it takes to reference another pipeline table. The older dlt module needed a special dlt.read() call; the current dp module just uses ordinary Spark reads.

## Segment 5 (outro)

Same engine, two authoring surfaces — SQL and Python, both inferring the same dependency graph. Next up: the honest trade-off against a traditional notebook pipeline.
