# EMR Fundamentals

Everything so far — Glue jobs, Redshift, Athena — abstracts the cluster away from you. Amazon
EMR (Elastic MapReduce) is the opposite end of the spectrum: a **managed Hadoop and Spark
cluster service** where you provision, configure, and control the actual compute. It's the
tool to reach for when Glue's managed simplicity isn't enough control for a heavy, custom
big-data workload — this chapter covers when and how.

## What you'll learn

- What EMR actually is: managed clusters, not a managed job runner
- The three node roles: master, core, and task
- EMR vs. running the same open-source tools on raw EC2 yourself
- Where EMR fits next to Glue in this course's toolset

## What EMR is

EMR provisions and manages a cluster of EC2 instances pre-installed and pre-configured with
open-source big data frameworks — Spark, Hadoop (HDFS, YARN), Hive, Presto, and others — so
you don't hand-install and hand-tune a distributed cluster yourself. You submit jobs to run on
the cluster (Lesson 45 covers submitting a real Spark job), and EMR handles cluster
provisioning, the distributed filesystem, resource scheduling between jobs, and
scaling the cluster up or down.

## The three node roles

Every EMR cluster is built from three kinds of nodes:

- **Master node** — manages the cluster: runs YARN's ResourceManager, tracks the health and
  status of the other nodes, and hosts the cluster's web interfaces. Every cluster has exactly
  one master node (or, for high availability, a small odd number in newer configurations).
- **Core nodes** — run tasks *and* store data via HDFS. Core nodes are the durable-storage
  workers; removing one loses whatever HDFS data lived on it, so core node count is chosen
  based on both compute and storage needs.
- **Task nodes** — run tasks only, with no HDFS storage. Because they hold no data, task nodes
  can be added and removed freely to scale compute up and down (often using Spot Instances,
  covered in Lesson 47) without any data-loss risk.

## EMR vs. raw EC2

You could install Spark and Hadoop on a fleet of EC2 instances yourself. EMR's value is
everything around that: one API call provisions a correctly-configured cluster, integrates
with S3 (EMRFS) so Spark jobs read/write S3 directly instead of only HDFS, ties into IAM for
permissions, auto-terminates when idle if configured, and gives you a console for monitoring
cluster and job health — none of which raw EC2 gives you for free.

## Key terms

| Term | Meaning |
|---|---|
| EMR | Managed Hadoop/Spark cluster service |
| Master node | Manages the cluster; runs YARN ResourceManager; one per cluster |
| Core node | Runs tasks and stores HDFS data |
| Task node | Runs tasks only, no HDFS storage — freely scalable |
| EMRFS | EMR's connector letting Spark/Hadoop jobs read and write S3 directly |

## Check yourself

You need to scale an EMR cluster's compute up temporarily for a large job, then scale back
down afterward. Should you add more core nodes or more task nodes, and why does that choice
matter for data safety?
