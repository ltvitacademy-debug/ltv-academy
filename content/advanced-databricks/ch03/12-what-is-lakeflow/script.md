# Script — What Is Lakeflow?

## Segment 1 (title)

Databricks & Delta Lake Lessons 48 through 57 already introduced Lakeflow and the Delta Live Tables rename in full. This course assumes that picture already. Here's what's changed since, and what this chapter actually adds.

## Segment 2 (code: naming evolution)

Lesson 48 named the DLT-to-Lakeflow rename. Since then, Lakeflow Declarative Pipelines has moved onto the open-source Apache Spark Declarative Pipelines engine, and the Python module itself changed from `dlt` to `pyspark.pipelines`, imported as `dp` — `dlt` still works, but it's now the legacy path.

## Segment 3 (code: declarative vs manual comparison)

Lesson 56 already compared Lakeflow to Azure Data Factory. The comparison that actually matters for this chapter is different: Lakeflow's declarative pipelines against the manual bronze-to-silver-to-gold pipeline this track built by hand — same destination, but the dependency order is inferred from the code itself, not wired together task by task.

## Segment 4 (code: what this chapter covers)

Lesson 13 covers the real SQL and Python syntax. Lesson 14 gives the honest trade-off against a traditional notebook. Lesson 15 adds the SQL side of Expectations. Lesson 16 covers deployment with Databricks Asset Bundles — genuinely new ground the earlier course never touched.

## Segment 5 (outro)

Same engine Lesson 48 named, one more rename further along. Next up: the real syntax behind a streaming table and a materialized view.
