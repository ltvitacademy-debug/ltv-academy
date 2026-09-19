# Script — Glue ETL Jobs: Python & Scala Spark

## Segment 1 (title)

Crawlers and the Catalog tell you what data exists. A Glue job is what actually reads it, transforms it, and writes the result somewhere new. It can be written in PySpark or Scala Spark — both run on the same underlying Spark engine.

## Segment 2 (code: the generated boilerplate)

Every new job in the console starts with a predictable shape. GlueContext wraps a regular SparkContext and adds Glue-specific methods, most importantly reading from and writing to the Data Catalog. That job.commit() call at the end matters — it's what finalizes bookmark state, so skipping it breaks incremental reruns.

## Segment 3 (steps: DynamicFrame vs. DataFrame)

Glue layers its own DynamicFrame on top of Spark's native DataFrame, built for semi-structured data where schema might vary row to row — useful for messy real-world JSON. In practice, you read into a DynamicFrame, convert to a DataFrame with toDF for your actual transform logic, then convert back with fromDF if you need Glue's write methods.

## Segment 4 (code: reading and writing via the Catalog)

A typical job reads with create_dynamic_frame.from_catalog by database and table name — not a hardcoded S3 path — transforms the data, then writes with write_dynamic_frame.from_options, often converting format along the way, like CSV into Parquet.

## Segment 5 (outro)

That's hand-written PySpark and Scala Spark jobs. Next up: Glue Studio — the visual way to build the same kind of job without writing the script yourself.
