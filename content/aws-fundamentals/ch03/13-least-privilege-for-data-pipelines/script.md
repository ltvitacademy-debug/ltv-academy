# Script — Least Privilege for Data Pipelines

## Segment 1 (title)

Least privilege means a role's policy grants exactly the actions, on exactly the resources, that the workload needs — nothing broader just in case. It's not a vague aspiration; it shows up as concrete differences in the JSON.

## Segment 2 (code: the most common violation)

This is the single most common violation: Action s3 star, Resource star. It technically works, and that's exactly the problem — it grants every S3 action on every bucket in the account to a role that probably only reads one prefix and writes to another.

## Segment 3 (code: scope by bucket, prefix, action)

Real pipelines need one bucket, often one prefix, and a small set of actions. An ingestion Lambda only needs PutObject on the raw prefix. A Glue job needs read and write across two specific prefixes. An analyst's role gets read-only on the curated bucket — nothing more.

## Segment 4 (steps: start narrow, widen with evidence)

The practical workflow: grant the smallest set of actions you're confident it needs, run the pipeline, and use CloudTrail — which logs every API call in the account — to see exactly what got denied. Add precisely that, and no more.

## Segment 5 (outro)

Starting from a wildcard and never narrowing it is the far more common failure than starting too narrow. Next up: cross-service access patterns — how Lambda, Glue, and EC2 actually assume the roles that grant them this scoped access.
