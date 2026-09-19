# Script — EMR Cost Optimization

## Segment 1 (title)

Every team asks this eventually: how do you keep an EMR bill from becoming a surprise? The building blocks are Spot for task nodes, auto-scaling, shutting clusters down when idle, and for some workloads, EMR Serverless.

## Segment 2 (steps: Spot & right-sizing)

Task nodes hold no HDFS data, so they're safe to run on Spot at a substantial discount versus on-demand — the single biggest cost lever. Right-sizing means matching instance family and count to actual utilization from real runs, not an oversized guess made up front.

## Segment 3 (code: the transient cluster pattern)

A transient cluster is created for a specific job, runs its Steps, and terminates automatically once the work finishes — instead of a forgotten always-on cluster billing around the clock for capacity nobody's using.

## Segment 4 (steps: EMR Serverless)

EMR Serverless removes cluster management for workloads that fit its model — you submit a Spark or Hive job, AWS provisions and scales compute automatically, and you're billed for what the job actually consumes, not a fixed-size cluster sitting idle.

## Segment 5 (outro)

EMR chapter complete. Next up: Chapter 10 — Kinesis Data Streams, and real-time streaming on AWS.
