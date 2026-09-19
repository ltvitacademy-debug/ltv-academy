# Glue Architecture

AWS Glue is the piece that turns a bucket full of files into something queryable. It's a
managed ETL service, but under the name "Glue" AWS actually bundles three separate
components — crawlers, a metadata catalog, and Spark-based ETL jobs — that this chapter
covers one at a time. Before going deep on any one of them, you need the big picture: what
runs where, and what each piece is actually responsible for.

## What you'll learn

- What "serverless Spark" means for Glue ETL jobs
- DPUs: how Glue measures and bills compute capacity
- The three components that make up Glue: crawlers, the Data Catalog, and jobs
- How the Data Catalog relates to the Hive Metastore format other tools already understand

## Serverless Spark under the hood

A Glue ETL job is, mechanically, an Apache Spark application. AWS provisions the cluster,
runs your script across it, and tears the cluster down when the job finishes — you never
see an EC2 instance, install Spark, or manage a YARN queue. That's what "serverless" means
here: the Spark runtime is real, but the infrastructure underneath it is fully managed. You
submit a script (PySpark or Scala), Glue handles provisioning, execution, and scale-down.

This matters because it changes the mental model from "I manage a cluster that runs jobs"
to "I submit a job and AWS finds it compute." You still write real Spark code — DataFrame
transformations, joins, aggregations — but capacity planning becomes a matter of choosing
how much compute to hand the job, not how many nodes to keep running.

## DPUs: Glue's unit of compute

Glue measures compute capacity in **DPUs (Data Processing Units)**. Each DPU provides a
fixed amount of vCPU and memory, and you specify how many DPUs a job can use (or let Glue
auto-scale within a range for supported job types). Billing is based on DPU-hours consumed
— you pay for what the job actually uses while it runs, not for a cluster sitting idle
between runs. This is the same "pay for what you use" model as the rest of the serverless
AWS data stack, and it's the reason Glue jobs are cost-effective for scheduled, bursty ETL
work rather than something that needs to run continuously.

## Three components, one name

"Glue" is really three things working together, and keeping them separate mentally makes
the rest of this chapter click faster:

1. **Crawlers** — scan data in S3 (or a JDBC source) and infer schema, writing table
   definitions into the Data Catalog. Covered in Lesson 12.
2. **The Data Catalog** — the persistent metadata store: databases, tables, columns,
   partitions. Covered in Lesson 13.
3. **ETL jobs** — the actual Spark code that reads, transforms, and writes data, usually
   using the Data Catalog to know what to read. Covered in Lesson 14.

A crawler doesn't move or transform data — it only writes metadata. A job doesn't discover
schema on its own — it typically reads the schema a crawler already registered. They're
independent components that compose, which is also why Lesson 17 covers **triggers and
workflows**: something has to chain "crawler finishes, then job starts" together.

## Catalog compatibility with Hive Metastore

The Glue Data Catalog isn't a proprietary format invented for Glue — it's compatible with
the **Hive Metastore** API that the broader Hadoop and Spark ecosystem already uses to
track table metadata. That compatibility is what lets Athena, Redshift Spectrum, and EMR
all point at the same Glue Catalog and see the same tables, instead of each tool needing
its own separate metadata store. One catalog entry, defined once, becomes queryable from
multiple engines.

## Key terms

| Term | Meaning |
|---|---|
| DPU | Data Processing Unit — Glue's billed unit of compute (fixed vCPU + memory) |
| Serverless Spark | A managed Spark runtime where AWS provisions/tears down compute per job |
| Crawler | Component that scans data and writes schema into the Data Catalog |
| Data Catalog | Glue's persistent, Hive Metastore-compatible metadata store |
| ETL job | The Spark script that reads, transforms, and writes data |

## Check yourself

A colleague says "I ran a Glue crawler and my data got transformed and loaded into a new
S3 location." What's wrong with that statement, given what a crawler actually does versus
what a job does?
