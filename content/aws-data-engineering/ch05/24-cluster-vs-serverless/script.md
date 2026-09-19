# Script — Cluster vs. Serverless

## Segment 1 (title)

There are two ways to run a Redshift warehouse. A provisioned cluster is fixed capacity you choose and manage. Redshift Serverless is capacity that scales itself automatically based on demand.

## Segment 2 (code: two ways to run Redshift)

With a provisioned cluster, you pick a node type — RA3 or DC2 — and a node count, and you pay for that capacity by the hour whether you're querying or not. Redshift Serverless skips node selection entirely: capacity is measured in RPUs, and it scales up and down automatically, billed only for what you actually use.

## Segment 3 (steps: month-end close, three loud days, silence otherwise)

Think about a finance team's month-end close — three days of heavy reporting, then near silence the rest of the month. A cluster sized for that peak sits idle and expensive most days. Sized for the quiet days, it chokes during close. Serverless scales its RPUs up automatically for close week and back down the rest of the month, so you're not stuck guessing a fixed size.

## Segment 4 (outro)

Cluster versus Serverless down. Next up: actually getting data from S3 into Redshift, in bulk, with the COPY command.
