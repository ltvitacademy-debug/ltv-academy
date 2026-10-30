# Lesson 11 — Tracing the Discrepancy Between Both Dashboards

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 11 of 26**

## What you'll learn

- The disciplined first step before trusting *or* distrusting either
  dashboard: ruling out instrumentation error
- How Theo confirms both dashboards are querying real, current data —
  not a stale cache, a broken exporter, or a misconfigured query
- Why "cluster-wide average" is a real, correctly-computed number that
  can still hide a real, correctly-computed p95 spike
- The specific question Theo lands on at the end of this lesson, which
  Lesson 12 goes and answers with data

## Rule out the boring explanation first

Every cloud engineer has been burned by chasing a "real" incident that
turned out to be a broken dashboard. Before Theo spends another minute
theorizing about *why* the FinOps and reliability dashboards disagree,
he does the unglamorous thing first: checks whether either one is
simply wrong.

- **Reliability dashboard** — queries Azure Monitor directly for
  `checkout-api`'s request duration histogram and 5xx count, refreshed
  every 30 seconds. Theo confirms the query window, confirms the
  service name filter, confirms the data points are new (timestamps
  match the last few minutes, not a stale cache). It's real.
- **FinOps dashboard** — queries the cluster's metrics-server/Prometheus
  data for CPU and memory, averaged across every running pod/node in
  the AKS cluster. Theo confirms this too: the 72% figure is being
  recomputed live, not frozen from an hour ago.

Both dashboards pass the sanity check. Neither is broken, stale, or
misconfigured. That rules out the easiest explanation and forces the
harder one: **the disagreement is real**, which means something about
*how* the FinOps number is computed is capable of hiding exactly the
kind of problem the reliability dashboard is built to catch.

## What "average" actually throws away

The FinOps dashboard's headline number is a single arithmetic mean
across every pod backing `checkout-api`, computed cluster-wide. An
average is a real, useful number for its original purpose — "are we
paying for more capacity than we're using" — but averaging, by
definition, throws away *where* in the cluster the load is sitting.
Twelve pods running at wildly different CPU levels can average out to
a number that looks perfectly fine, while a subset of those twelve are
actually saturated.

Theo writes the real question down, almost word for word: **if this
average is hiding something, it's hiding it across some dimension the
dashboard isn't currently broken out by.** The cluster has multiple
**availability zones** (AZs) — physically separate datacenters within
the same Azure region, each with its own power and networking, used
for fault tolerance. The FinOps dashboard has never had a reason to
split its number by zone, because nobody building a cost dashboard
expects uneven zone placement to be the kind of thing that needs
watching.

## Why "same cluster" doesn't mean "same conditions everywhere"

It's tempting to think of a Kubernetes cluster as one undifferentiated
pool of compute. It isn't. Pods get scheduled onto specific nodes, and
nodes live in specific zones. Nothing stops the Kubernetes scheduler
from making a decision that's technically valid — every pod has a node
with free capacity — while still producing an uneven real-world result.
Theo doesn't yet know that's what happened. He knows it's *possible*,
and that the FinOps dashboard, built around a single cluster-wide
average, would never have shown it even if it had.

## Key terms

| Term | Meaning |
|---|---|
| Instrumentation error | A dashboard reporting wrong data because of a stale cache, broken exporter, or misconfigured query — not a real system problem |
| Availability Zone (AZ) | A physically separate datacenter within an Azure region, with independent power/networking, used for fault tolerance |
| Arithmetic mean (average) | A single number computed by summing values and dividing by count — hides variance between the values that produced it |
| Dimension | A way of breaking a metric down further (by zone, by pod, by service) instead of collapsing it into one number |

## Lab

1. List the two checks Theo ran to confirm each dashboard was querying
   real, current data rather than something stale or misconfigured.
2. In your own words, explain why "the FinOps dashboard's 72% average
   is real" and "the FinOps dashboard is hiding a real problem" are
   not contradictory statements.
3. Write down the exact question Theo ends this lesson with — the one
   Lesson 12 is going to go answer with real per-zone data.

## Check yourself

You're ready for Lesson 12 when you can explain, without looking, why
ruling out instrumentation error came first, and why "average across
the whole cluster" is the specific design choice in the FinOps
dashboard that's capable of masking an uneven, zone-specific problem.
