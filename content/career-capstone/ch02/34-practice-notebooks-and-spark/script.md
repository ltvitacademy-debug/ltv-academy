# Script — Practice Questions: Notebooks and Spark

## Segment 1 (title)

The last of this chapter's four practice lessons drills Fabric Notebooks and the Spark and Delta mechanics underneath them, at exam difficulty.

## Segment 2 (code: no cluster configuration)

A Fabric Notebook attaches to a Spark session backed by the workspace's capacity, not a Databricks-style cluster you configure yourself. Fabric abstracts cluster sizing behind the capacity and SKU system.

## Segment 3 (steps: Delta atomicity and portable testing)

A failed write partway through never becomes visible — Delta Lake's transaction log makes writes atomic, and readers only ever see the last successful commit. Unit testing PySpark transformation functions against small in-memory DataFrames works the same whether the notebook runs in Fabric or Databricks.

## Segment 4 (outro)

The underlying Spark and Delta mechanics are identical across both platforms — only the compute-management layer around them differs. That's the full four-lesson practice run for this chapter's first half.
