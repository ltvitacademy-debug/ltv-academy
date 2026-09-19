# Script — Compute Overview: EC2 & Lambda

## Segment 1 (title)

EC2 gives you virtual servers called instances, sized and billed by the hour. Every instance type encodes a family and size, like m5.large — general purpose, fifth generation, large.

## Segment 2 (code: instance families and pricing)

Families are built for different workload shapes — c for compute-heavy, r for memory-heavy, t for bursty workloads. Pricing follows usage too: On-Demand with no commitment, Reserved or Savings Plans for a multi-year discount, and Spot for steep discounts on spare capacity AWS can reclaim.

## Segment 3 (steps: EC2 vs Lambda)

Lambda is a genuinely different model, not just "a server AWS manages for you." You upload a function, AWS runs it only when triggered, and you pay per invocation and duration — nothing while it's idle, versus an EC2 instance you pay for whether it's busy or not.

## Segment 4 (outro)

Most real pipelines use both — EC2 for steady-state compute, Lambda for short, event-triggered steps. Next up: storage — S3 versus EBS.
