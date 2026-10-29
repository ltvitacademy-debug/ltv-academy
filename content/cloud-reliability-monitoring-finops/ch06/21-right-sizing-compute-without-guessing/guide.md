# Lesson 21 — Right-Sizing Compute Without Guessing

**Chapter 6 · Optimizing Cloud Spend Without Breaking Reliability · Lesson 1 of 4**

## What you'll learn

- Why picking a VM or instance size from a gut feeling is the single
  biggest source of wasted compute spend
- How to pull real CPU and memory **utilization percentiles** out of
  Azure Monitor metrics or CloudWatch metrics instead of guessing
- Why the average utilization number is the wrong number to right-size
  from, and which percentile actually matters
- A repeatable right-sizing workflow you can run on a schedule, not
  just once

## Why "it feels slow" and "it feels fine" are both wrong inputs

Right-sizing means matching the size of a VM, VM scale set instance,
or container request/limit to what the workload actually uses — not
to what seemed like a safe round number when someone first provisioned
it. Left alone, compute sizing drifts in exactly one direction: up.
Someone hits a slow afternoon, bumps the SKU, the incident passes, and
nobody ever revisits it. Multiply that across a few hundred VMs and a
few years, and a meaningful slice of the compute bill is paying for
headroom nobody is using.

The fix isn't to guess smaller instead of guessing bigger. It's to stop
guessing. You already have the data: the same metrics pipeline from
Chapters 1–4 (Azure Monitor metrics, CloudWatch metrics) has been
recording CPU and memory utilization for every resource this whole
time. Right-sizing is a query problem, not a redesign problem.

## Why averages lie and percentiles don't

If you pull average CPU utilization for a VM and see 12%, the obvious
conclusion is "this is wildly oversized." Sometimes that's true. But
average utilization hides the shape of the load. A VM that's idle at
2% CPU for 23 hours a day and pegged at 95% for one hour during a daily
batch job also averages out to roughly 12% — and downsizing it based
on the average would cause that batch job to start missing its window
or falling over.

This is why FinOps and SRE practice both lean on **percentile**
utilization instead of the mean:

- **p50 (median)** — what utilization looks like on a typical
  interval. Useful context, not the number you size on.
- **p95** — utilization is below this value 95% of the time. This is
  the standard right-sizing input: it captures real peaks without
  letting one freak outlier (a one-off migration job, a monitoring
  agent hiccup) dictate the whole SKU.
- **p99 / max** — useful for catching workloads with rare but severe
  spikes, where even p95 would still leave you under-provisioned for
  the worst minute of the month.

The workflow: pull p95 CPU and p95 memory over a representative window
— at least 2–4 full weeks, so you capture weekly batch cycles and
month-end spikes, not just a quiet Tuesday — and size against **that**,
with headroom, not against the average.

## Pulling the numbers

In Azure Monitor, a Log Analytics KQL query against the `Perf` table
(or the `InsightsMetrics` table if Container Insights / VM insights is
enabled) gives you percentile aggregation directly:

```kql
Perf
| where ObjectName == "Processor" and CounterName == "% Processor Time"
| where TimeGenerated > ago(28d)
| summarize p50 = percentile(CounterValue, 50),
            p95 = percentile(CounterValue, 95),
            p99 = percentile(CounterValue, 99)
          by Computer
| order by p95 desc
```

In CloudWatch, Metrics Insights or a GetMetricStatistics / GetMetricData
call with `ExtendedStatistics` set to `p95` does the equivalent:

```
aws cloudwatch get-metric-data \
  --metric-data-queries '[{
    "Id": "cpuP95",
    "MetricStat": {
      "Metric": {
        "Namespace": "AWS/EC2",
        "MetricName": "CPUUtilization",
        "Dimensions": [{"Name":"InstanceId","Value":"i-0abc123"}]
      },
      "Period": 2592000,
      "Stat": "p95"
    }
  }]' \
  --start-time 2026-10-01T00:00:00Z \
  --end-time 2026-10-28T00:00:00Z
```

Run the same shape of query for memory. On Linux VMs, memory isn't
collected by the hypervisor the way CPU is — you need the Azure Monitor
Agent or the CloudWatch agent actually installed and reporting a memory
counter, or you're right-sizing blind on half the picture.

## Turning percentiles into a decision

Once you have p95 CPU and p95 memory per resource, the right-sizing
call itself is mostly arithmetic, not judgment:

- **p95 well under 40% on both dimensions, consistently, for 4+
  weeks** → a strong downsizing candidate. Move down one or two SKU
  tiers, not to the smallest possible size — leave real headroom for
  variance you haven't observed yet.
- **p95 consistently above ~75–80%** → the workload is running hot.
  This is a right-sizing candidate too, just in the other direction:
  undersized compute causes latency and reliability problems before it
  shows up as an incident.
- **p95 CPU low but p95 memory high (or vice versa)** → don't resize
  the whole instance uniformly. Look for a SKU family with a different
  vCPU-to-memory ratio instead of either leaving one resource wasted or
  starving the other.
- **Bursty with rare, business-critical spikes** → right-sizing isn't
  the only lever here. This is exactly the case autoscaling (Lesson 23)
  and Spot/fault-tolerant design are built to handle — a fixed size
  chosen to cover the worst case wastes money every hour that isn't
  the worst case.

## Make it a cadence, not a one-time cleanup

A right-sizing pass done once and never repeated decays the same way
unmanaged sizing did in the first place — new workloads get provisioned
generously "to be safe," and six months later you're back where you
started. Treat right-sizing as a recurring review: re-run the p95 query
monthly or quarterly, flag resources that cross the downsizing or
undersizing thresholds, and route them through the same change process
as any other production change — a downsize still needs a maintenance
window and a rollback plan, because getting the number right doesn't
mean the resize itself is risk-free.

## Key terms

| Term | Meaning |
|---|---|
| Right-sizing | Matching a compute resource's provisioned size to its actual observed CPU/memory usage, rather than to an arbitrary or legacy choice |
| p95 utilization | The value below which utilization sits 95% of the time — the standard input for right-sizing because it reflects real peaks without one outlier skewing the result |
| Average utilization | The mean usage over a period; hides bursty load patterns and is an unreliable basis for a sizing decision on its own |
| VM insights / CloudWatch agent | The agent that must be installed and reporting for memory utilization (not just CPU) to be visible for right-sizing |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
does right-sizing off the average utilization number risk breaking a
workload that an on-call engineer would otherwise never have heard
about, and what would you pull instead?
