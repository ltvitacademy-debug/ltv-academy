# EMR Cluster Configuration

Knowing that a cluster has master, core, and task nodes (Lesson 43) is only half the picture.
Sizing a cluster correctly — the right instance types, the right mix of pricing models, and
whether it scales automatically — is what separates a cluster that's fast and affordable from
one that's either too slow or quietly burning budget. This lesson is about making those
choices deliberately.

## What you'll learn

- Instance types and instance fleets/groups
- On-demand vs. Spot pricing for task nodes specifically
- Auto-scaling a cluster based on workload
- A framework for sizing a cluster to a workload

## Instance types and fleets

EMR clusters are built from standard EC2 instance types — memory-optimized instances (the
`r` family) for Spark jobs that shuffle large amounts of data in memory, compute-optimized
(`c` family) for CPU-bound transformations, or general-purpose (`m` family) as a reasonable
default when a workload's profile isn't yet well understood. EMR lets you configure this
either as **instance groups** (one instance type per node role) or **instance fleets** (a mix
of instance types and purchase options within a role, with EMR choosing what's actually
available at launch time — useful for Spot availability, covered next).

## On-demand vs. Spot for task nodes

**Spot Instances** offer spare EC2 capacity at a discount, with the tradeoff that AWS can
reclaim them with short notice if capacity is needed elsewhere. Because task nodes hold no
HDFS data (Lesson 43), losing one to a Spot reclamation costs you recomputation of whatever
that node was working on, not data. That makes task nodes the natural place to use Spot —
**master and core nodes are typically kept on-demand** (or Reserved) for stability, while task
nodes run on Spot to cut compute cost, with EMR automatically replacing reclaimed Spot task
nodes.

## Auto-scaling

EMR clusters can scale the task node count up and down automatically based on a metric — most
commonly YARN's memory or container-pending metrics, which reflect actual queued work rather
than a fixed schedule. A managed scaling policy defines a minimum and maximum instance count,
and EMR adds or removes task nodes within those bounds as the workload's actual demand
changes, rather than a human resizing the cluster by hand for each job.

## Sizing a cluster to a workload

There's no universal formula, but the questions that matter are consistent: how much data
does a typical job shuffle (drives memory needs), is the workload CPU-bound or I/O-bound
(drives instance family), does load vary a lot between jobs (argues for auto-scaling task
nodes rather than a fixed large cluster), and how price-sensitive is the workload (argues for
more aggressive Spot use on task nodes).

## Key terms

| Term | Meaning |
|---|---|
| Instance fleet | A mix of instance types/purchase options EMR chooses from at launch, per node role |
| Spot Instance | Discounted spare EC2 capacity AWS can reclaim with short notice |
| Managed scaling | EMR automatically adjusting task node count within a min/max based on workload demand |

## Check yourself

Why does it make sense to run task nodes on Spot Instances but keep core nodes on-demand,
given what you know about how core and task nodes differ?
