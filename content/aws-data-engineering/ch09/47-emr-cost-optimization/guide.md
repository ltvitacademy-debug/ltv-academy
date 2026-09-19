# EMR Cost Optimization

Chapter 9 closes on the question every team asks eventually: how do you keep an EMR bill from
becoming a surprise? The building blocks are ones you've already seen — Spot for task nodes,
auto-scaling — plus two more: shutting clusters down when nothing's running, and, for some
workloads, skipping cluster management entirely with EMR Serverless.

## What you'll learn

- Spot Instances for task nodes as the biggest lever
- Right-sizing a cluster to the workload, not "bigger to be safe"
- Auto-termination on idle
- EMR Serverless as a no-cluster-management alternative

## Spot instances for task nodes

This is the single biggest cost lever available, and it was covered in Lesson 46: task nodes
hold no HDFS data, so they're safe to run on Spot, where the discount versus on-demand pricing
is substantial. A workload with a large, elastic task node fleet running mostly on Spot, with
only master and core nodes on stable on-demand pricing, is a standard cost-optimized EMR
shape.

## Right-sizing

The instinct to oversize "to be safe" is expensive at scale. Right-sizing means matching
instance family and count to what the workload actually needs — checked against real
utilization metrics (CPU, memory, YARN container usage) from actual runs, not guessed
up-front. A cluster that's consistently under 40% utilized on its core nodes is a candidate
for a smaller instance type or fewer core nodes; one that's constantly queuing work on task
nodes needs a higher auto-scaling maximum, not necessarily bigger core nodes.

## Auto-termination on idle

A **transient cluster** — spun up for a specific job or batch of jobs, then terminated
automatically once the work finishes — avoids paying for idle cluster time entirely. EMR
supports **auto-termination**, where a cluster shuts down automatically once its steps
complete (or after a configured idle period with no steps running), instead of a
forgotten always-on cluster billing around the clock for capacity nobody is using.

```text
Transient pattern:
  Step Functions -> creates cluster -> adds Steps -> waits for completion
  -> cluster auto-terminates -> next stage of the pipeline runs
```

## EMR Serverless

**EMR Serverless** removes cluster management from the equation for workloads that fit its
model: you submit a Spark or Hive job, and AWS provisions and scales the underlying compute
automatically, billing for the resources the job actually consumes rather than for a
provisioned cluster sitting at a fixed size. It's newer than managing your own EMR clusters
and doesn't replace every EMR use case (workloads needing tight cluster-level tuning or
co-located non-Spark/Hive tools still want a managed cluster), but for straightforward
Spark/Hive jobs it removes the sizing and idle-cost questions this lesson otherwise walks
through by hand.

## Key terms

| Term | Meaning |
|---|---|
| Right-sizing | Matching instance type/count to actual workload utilization, not an oversized guess |
| Transient cluster | A cluster created for specific work and terminated automatically once it finishes |
| Auto-termination | EMR shutting a cluster down once its steps complete or after an idle period |
| EMR Serverless | A no-cluster-management alternative that auto-scales compute and bills per job |

## Check yourself

A nightly batch job runs for about 40 minutes on an EMR cluster and the cluster otherwise
sits idle the rest of the day. What two changes from this lesson would cut its cost the most,
and why?
