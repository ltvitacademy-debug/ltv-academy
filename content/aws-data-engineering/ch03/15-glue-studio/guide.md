# Glue Studio

Not every ETL job needs a hand-written PySpark script. Glue Studio is AWS's visual job
authoring interface — a drag-and-drop canvas for building the same kind of source-transform
-target pipeline Lesson 14 covered by hand, generating the underlying script for you. This
lesson covers what it actually does, and — just as importantly — when reaching for it is
the right call versus writing the script yourself.

## What you'll learn

- What Glue Studio's visual canvas actually builds
- The source, transform, target node model
- When a visual approach fits, and when it doesn't
- How Glue Studio jobs relate to the hand-written jobs from Lesson 14

## The visual canvas

Glue Studio presents ETL as a directed graph of nodes: one or more **source** nodes (often
a Catalog table), one or more **transform** nodes (filter, join, map fields, change schema,
custom SQL, and more, chained together), and one or more **target** nodes (writing to S3,
the Catalog, or another destination). You connect them visually, configure each node
through a form rather than code, and Glue Studio generates the PySpark script underneath —
you can view and even edit that generated script directly if you need to drop into code for
something the visual nodes don't cover.

Because it's still producing a real Glue job under the hood, everything from Lesson 14
still applies: it runs as serverless Spark, billed in DPUs, and can use job bookmarks
(Lesson 16) and be scheduled by triggers or workflows (Lesson 17) exactly like a
hand-written job.

## Common transform nodes

Glue Studio ships built-in transforms for the operations that show up constantly in ETL:
joining two sources, filtering rows on a condition, applying a mapping to rename or
retype columns, dropping fields, and running a **custom SQL query** against the in-flight
data when a transform doesn't have a dedicated visual node. Chaining several of these nodes
together builds a full pipeline without writing a line of PySpark by hand.

## When visual fits, and when it doesn't

Glue Studio is a strong fit for straightforward pipelines — read a table, filter or join
it, write it out in a different format or location — especially when the person building
it is less comfortable in Spark directly, or when a pipeline needs to be quickly
understandable at a glance by someone other than its author. It's a weaker fit once logic
gets genuinely complex: intricate conditional branching, custom Python libraries, or
performance tuning that requires hand-controlling partitioning and caching are all easier
to express directly in code than to wire up as a chain of visual nodes. Many real teams use
both: Glue Studio for the routine 80% of jobs, hand-written PySpark for the harder 20%.

## Key terms

| Term | Meaning |
|---|---|
| Glue Studio | AWS's visual, drag-and-drop interface for authoring Glue ETL jobs |
| Source node | A visual node representing where a job reads data from |
| Transform node | A visual node representing one processing step (filter, join, map, etc.) |
| Target node | A visual node representing where a job writes its output |
| Generated script | The PySpark code Glue Studio produces from the visual graph, viewable/editable |

## Check yourself

A teammate builds a simple filter-and-write job entirely in Glue Studio. Is the resulting
job fundamentally different from one you'd write by hand in Lesson 14's style — in terms of
how it runs, what it's billed as, or what features (like bookmarks) it can use?
