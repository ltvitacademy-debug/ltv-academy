# Script — Glue Architecture

## Segment 1 (title)

AWS Glue is what turns a bucket full of files into something queryable. Under that one name, AWS actually bundles three separate components — crawlers, a metadata catalog, and Spark-based ETL jobs. This lesson is the big picture before we go deep on each one.

## Segment 2 (code: serverless Spark under the hood)

A Glue ETL job is, mechanically, an Apache Spark application. You submit a PySpark or Scala script, and AWS provisions the cluster, runs it, and tears the cluster down when the job finishes. You never see an EC2 instance or manage a YARN queue — but it's still real Spark code underneath.

## Segment 3 (steps: three components, one service name)

Keep these three pieces separate in your head. Crawlers scan data and write schema into the Data Catalog — they don't move or transform anything. The Data Catalog is the persistent metadata store: databases, tables, partitions. And ETL jobs are the actual Spark code that reads, transforms, and writes data, usually using schema the crawler already registered.

## Segment 4 (code: DPUs, Glue's unit of compute)

Glue measures compute in DPUs — Data Processing Units — each a fixed bundle of vCPU and memory. You're billed in DPU-hours for what the job actually consumes while it runs, not for a cluster sitting idle between runs. That's the same pay-for-what-you-use model as the rest of the serverless AWS data stack.

## Segment 5 (outro)

That's the shape of Glue: crawlers, catalog, and jobs, running on serverless Spark billed by the DPU. Next up: crawlers in depth — how they actually infer schema from raw S3 data.
