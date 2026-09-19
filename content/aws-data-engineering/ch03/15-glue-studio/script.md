# Script — Glue Studio

## Segment 1 (title)

Not every ETL job needs a hand-written PySpark script. Glue Studio is AWS's visual job authoring interface — a drag-and-drop canvas that generates the underlying script for you.

## Segment 2 (steps: the visual node model)

Glue Studio presents ETL as a graph of nodes. Source nodes, usually a Data Catalog table. Transform nodes — filter, join, map fields, or drop into custom SQL when there's no dedicated visual node for what you need. And target nodes, writing to S3, the Catalog, or another destination. You connect them visually and configure each through a form.

## Segment 3 (code: still a real Glue job underneath)

Here's the important part: it's still producing a real Glue job. The visual graph generates a PySpark script you can view and even edit directly. It runs as serverless Spark, billed in DPU-hours, and it supports job bookmarks and can be scheduled by triggers or workflows — exactly like a hand-written job.

## Segment 4 (steps: when visual fits, and when it doesn't)

Glue Studio is a strong fit for straightforward pipelines — read, filter or join, write. It's a weaker fit once logic gets genuinely complex: intricate branching, custom Python libraries, or fine performance tuning. Plenty of real teams use both — Studio for the routine jobs, hand-written PySpark for the harder ones.

## Segment 5 (outro)

Visual or hand-written, both produce the same kind of Glue job. Next up: job bookmarks — how a rerun knows not to reprocess data it already handled.
