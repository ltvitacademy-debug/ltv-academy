# Lesson 16 — Updating the FinOps Dashboard with the Real Numbers

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 16 of 26**

## What you'll learn

- Why the fix to the incident isn't finished until the FinOps
  dashboard itself changes, not just the Deployment spec
- How Theo adds a per-availability-zone breakdown panel alongside the
  existing cluster-wide average, instead of replacing it
- The real query change needed to go from "one number" to "one number
  per zone," and why it's a small change with a large payoff
- Why a single new panel is the right scope here — not a rebuild of
  the whole dashboard

## The average isn't wrong — it's incomplete

It would be a mistake to read this incident as "the FinOps dashboard's
average metric is bad and should be removed." The cluster-wide average
still answers a real question Finance and leadership care about: is
the cluster, overall, sized correctly for its cost. Deleting it would
throw away something useful. The actual gap is narrower and more
specific: there was no way, from this dashboard alone, to see that the
average could be hiding an uneven, zone-level problem. The fix is
additive — keep the average, and add the breakdown that would have
caught this incident sooner.

## The query change

The dashboard already queries CPU/memory utilization per pod from the
cluster's metrics-server/Prometheus data and averages it. Theo adds a
second panel using the same underlying data, grouped by the
`topology.kubernetes.io/zone` node label instead of collapsed across
the whole cluster:

```
avg(node_cpu_utilization) by (zone)
```

instead of

```
avg(node_cpu_utilization)
```

That one change — adding a `by (zone)` grouping to a query that was
already running — is the entire technical lift. The underlying metrics
were always there; the dashboard just never asked for them broken out
this way.

## What the new panel actually shows

The new panel renders as three bars (or a small multiple) next to the
existing single-number tile: one bar per availability zone, each
showing that zone's own average utilization. During the incident, this
panel would have shown `eastus2-2` at ~96% sitting right next to
`eastus2-1` and `eastus2-3` at ~24% — the exact imbalance that took a
manual `kubectl` investigation to uncover, now visible at a glance,
next to the cluster-wide number it's always been quietly averaging
away.

## Where the alert threshold goes next

Theo doesn't stop at a visual panel. He flags, as a direct input to
the follow-up action already logged in Lesson 15, that the alerting
rule needs to move from "cluster-wide average above 80%" to **also**
include "any single zone's average more than some skew threshold above
the others" — so the next time a scheduling gap like this produces an
imbalance, the dashboard pages someone before a customer notices,
instead of after.

## Key terms

| Term | Meaning |
|---|---|
| Breakdown panel | A dashboard panel that groups an existing metric by a dimension (like zone) instead of collapsing it to one number |
| Additive fix | A change that keeps an existing, still-useful metric and adds what was missing, rather than replacing it |
| `by (zone)` grouping | The query change that turns one aggregate number into one number per group |

## Lab

1. Explain why removing the cluster-wide average entirely would have
   been the wrong fix, even though it's the metric that masked the
   incident.
2. Write the one-line conceptual difference between
   `avg(node_cpu_utilization)` and `avg(node_cpu_utilization) by (zone)`.
3. Describe what the new per-zone panel would have shown, in real
   numbers, if it had existed during this incident.

## Check yourself

You're ready for Lesson 17 when you can explain, without looking, why
this fix adds a panel instead of replacing the existing one, and why
Theo also pushes to change the alerting threshold, not just the
dashboard's visuals.
