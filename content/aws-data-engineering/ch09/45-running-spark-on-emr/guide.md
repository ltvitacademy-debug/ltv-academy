# Running Spark on EMR

With the cluster architecture and the "when to use EMR" question settled, this lesson gets
practical: how you actually get a PySpark job running against an EMR cluster, either as a
one-off submission or as part of a broader pipeline (naturally, orchestrated by the Step
Functions patterns from Chapter 7).

## What you'll learn

- Submitting a PySpark job with `spark-submit` against an EMR cluster
- EMR Steps: the unit of work EMR tracks and reports on
- EMR Notebooks for interactive, exploratory Spark work

## Submitting a job with spark-submit

Once a cluster is running, `spark-submit` is the standard way to launch a Spark job on it —
the same command you'd use on any Spark cluster, not something EMR-specific:

```bash
spark-submit \
  --deploy-mode cluster \
  --master yarn \
  --conf spark.executor.memory=4g \
  s3://my-data-lake/scripts/transform_orders.py \
  --input s3://my-data-lake/raw/orders/ \
  --output s3://my-data-lake/processed/orders/
```

`--master yarn` tells Spark to run on the cluster's YARN resource manager (the standard mode
on EMR); `--deploy-mode cluster` runs the driver on the cluster itself rather than on your
local machine. The script itself, and its input/output paths, can live directly in S3 —
EMRFS makes that transparent to the Spark job.

## EMR Steps

Rather than SSHing in and running `spark-submit` by hand every time, EMR lets you submit work
as a **Step** — a unit of work (a Spark application, a Hive query, a custom JAR) that EMR
queues, runs, and tracks. Steps show up in the console and CLI with their own status (pending,
running, completed, failed) and logs, which is what makes them the natural thing to call from
a Step Functions state machine or a scheduled job — you add a step to a running cluster (or a
transient one spun up just for the job) rather than managing a shell session yourself.

```bash
aws emr add-steps \
  --cluster-id j-XXXXXXXXXXXXX \
  --steps Type=Spark,Name="Orders Transform",\
ActionOnFailure=CONTINUE,\
Args=[--deploy-mode,cluster,s3://my-data-lake/scripts/transform_orders.py]
```

## EMR Notebooks

For exploratory, interactive work — profiling a new dataset, iterating on transformation logic
before committing it to a production Step — EMR supports **EMR Notebooks** (and EMR Studio, a
newer fuller-featured IDE), Jupyter-based notebooks that attach to a running EMR cluster so
you get Spark's distributed execution with an interactive, cell-by-cell interface, rather than
resubmitting a whole script for every change while developing.

## Key terms

| Term | Meaning |
|---|---|
| spark-submit | The standard command-line tool for launching a Spark application on a cluster |
| EMR Step | A trackable unit of work (Spark app, Hive query, JAR) submitted to run on an EMR cluster |
| EMR Notebooks | Jupyter-based notebooks attached to a running EMR cluster for interactive Spark work |

## Check yourself

Why would a production pipeline add work to an EMR cluster as a Step rather than SSHing into
the master node and running `spark-submit` interactively?
