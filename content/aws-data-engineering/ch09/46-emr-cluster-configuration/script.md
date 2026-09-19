# Script — EMR Cluster Configuration

## Segment 1 (title)

Knowing a cluster has master, core, and task nodes is only half the picture. Sizing it correctly is what separates a cluster that's fast and affordable from one that's slow or quietly burning budget.

## Segment 2 (steps: types and fleets)

EMR clusters are built from standard EC2 instance types — memory-optimized for jobs that shuffle a lot of data in memory, compute-optimized for CPU-bound transformations. Instance fleets let you configure a mix of types and purchase options per node role, with EMR choosing what's actually available at launch.

## Segment 3 (steps: on-demand vs. Spot)

Spot Instances offer spare capacity at a discount, but AWS can reclaim them with short notice. Since task nodes hold no HDFS data, losing one just costs recomputation, not data — so master and core nodes typically stay on-demand for stability, while task nodes run on Spot to cut cost.

## Segment 4 (code: a managed scaling policy)

A managed scaling policy defines a minimum and maximum task node count, tied to a metric like YARN's available memory percentage. EMR adds or removes task nodes within those bounds as actual queued work changes, instead of a human resizing the cluster by hand.

## Segment 5 (outro)

Cluster configuration down. Next up: EMR cost optimization — Spot, right-sizing, auto-termination, and EMR Serverless.
