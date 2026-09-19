# Script — EMR vs. Glue vs. Databricks

## Segment 1 (title)

Which one do you reach for — Glue, EMR, or Databricks? There's no single right answer here; it's a genuine tradeoff between managed simplicity and control.

## Segment 2 (steps: Glue optimizes for simplicity)

Glue is serverless — no cluster to size, patch, or shut down, billed per job run. It's the right fit for well-understood, standard ETL on a schedule or trigger. The tradeoff is control: you don't tune cluster-level Spark configuration or install arbitrary tools alongside your job.

## Segment 3 (steps: EMR optimizes for control)

EMR is the choice when a workload needs fine-grained cluster tuning, specific instance types, or open-source tools beyond Spark running alongside each other on one cluster. The cost is real — your team owns cluster sizing and patching, more operational surface area than a serverless job.

## Segment 4 (steps: Databricks optimizes for experience)

Databricks is a separate company's platform, available across AWS, Azure, and GCP, built around a notebook-first collaborative environment and the Delta Lake table format. Teams pick it for that developer experience and multi-cloud portability, not because Glue or EMR are technically incapable.

## Segment 5 (outro)

An honest three-way comparison, done. Next up: actually running Spark on EMR — submitting a real PySpark job to a cluster.
