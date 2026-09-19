# EMR vs. Glue vs. Databricks

By now you've built Glue jobs (Chapter 3) and you know EMR's architecture (Lesson 43). A
question that comes up constantly in real teams — and in interviews — is which one to reach
for, and how Databricks (a separate, non-AWS-native platform covered elsewhere in this
catalog) fits into that decision. There isn't a single right answer; this is a genuine
tradeoff between managed simplicity and control.

## What you'll learn

- What Glue optimizes for, and where that becomes a limitation
- What EMR optimizes for, and what it costs you in exchange
- Where Databricks fits as a third option, honestly
- A framework for choosing, not a recommendation to always pick one

## Glue: serverless, managed, simple

Glue (Chapter 3) is serverless — no cluster to size, patch, or shut down. You write a Spark
or Python script, choose a worker count, and Glue handles provisioning transparently, billing
per job run. This is the right fit for well-understood, standard ETL: crawl, transform, load,
on a schedule or trigger. The tradeoff is control — you don't tune cluster-level Spark
configuration, choose exact instance types, or install arbitrary non-Spark tools alongside
your job. For workloads within what Glue's managed environment supports, that lack of control
is a non-issue; for genuinely unusual requirements, it becomes a wall.

## EMR: cluster control for heavy, custom workloads

EMR is the choice when a workload needs something Glue's managed environment doesn't offer:
fine-grained cluster tuning, specific instance types for specialized hardware needs (GPU
instances for ML preprocessing, for example), long-running clusters shared across many jobs
instead of one job per Glue run, or open-source tools beyond Spark — Hive, Presto, HBase —
running alongside each other on the same cluster. The cost is real: you (or your team) own
cluster sizing, patching cadence, and more operational surface area than a fully serverless
job.

## Databricks: a polished, collaborative layer

Databricks is a separate company's platform (available on AWS, Azure, and GCP, covered in
this catalog's dedicated Databricks courses) built around Spark, with a strongly opinionated
notebook environment, collaborative real-time editing, the Delta Lake table format, and a job
scheduler with more built-in developer ergonomics than either Glue or raw EMR provides out of
the box. Teams pick Databricks for that developer experience and multi-cloud portability —
not because Glue or EMR are technically incapable, but because the collaborative,
notebook-first workflow is worth the extra platform cost for some teams and not others.

## Choosing honestly

None of the three is "best" — they optimize for different things:

- Standard ETL, minimal ops overhead → **Glue**
- Full cluster control, specialized tools/hardware → **EMR**
- Collaborative notebooks, multi-cloud, Delta Lake → **Databricks**

## Key terms

| Term | Meaning |
|---|---|
| Serverless (Glue) | No cluster to size or manage; billed per job run |
| Cluster control (EMR) | Full control over instance types, tuning, and co-located tools |
| Databricks | A separate, non-AWS-native Spark platform emphasizing notebooks and Delta Lake |

## Check yourself

A team needs to run Hive and Presto side by side on the same long-lived cluster, with custom
instance types for one specific nightly job. Which of the three tools fits that requirement,
and why do the other two fall short here specifically?
