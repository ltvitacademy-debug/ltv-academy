# Script — Running Spark on EMR

## Segment 1 (title)

With the cluster architecture settled, let's get practical: how do you actually get a PySpark job running against an EMR cluster?

## Segment 2 (code: launching a job with spark-submit)

spark-submit is the standard way to launch a Spark job — the same command you'd use on any Spark cluster. Master yarn tells Spark to run on the cluster's resource manager, and the script plus its input and output paths can live directly in S3, since EMRFS makes that transparent.

## Segment 3 (code: submitting as a trackable Step)

Rather than SSHing in and running spark-submit by hand, EMR lets you submit work as a Step — a unit of work EMR queues, runs, and tracks with its own status and logs. That's what makes Steps the natural thing to call from a Step Functions state machine.

## Segment 4 (steps: EMR Notebooks)

For exploratory work — profiling a new dataset, iterating on transformation logic — EMR Notebooks are Jupyter-based and attach to a running cluster, giving you Spark's distributed execution with an interactive, cell-by-cell interface instead of resubmitting a whole script for every change.

## Segment 5 (outro)

Running Spark on EMR, covered. Next up: cluster configuration — instance types, Spot instances, and auto-scaling.
