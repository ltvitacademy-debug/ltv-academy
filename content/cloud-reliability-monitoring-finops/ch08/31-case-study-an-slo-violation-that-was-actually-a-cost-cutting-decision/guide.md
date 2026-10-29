# Lesson 31 — Case Study: An SLO Violation That Was Actually a Cost-Cutting Decision

**Chapter 8 · Capstone: Operating a Production Cloud Environment · Lesson 31 of 32**

## What you'll learn

- A realistic, illustrative scenario — not a real reported incident — showing how a cost-cutting
  change made without an SRE review can quietly remove the headroom an SLO depends on
- Why the error that appears during the resulting incident can look purely technical, when the real
  root cause is a decision made weeks earlier, in a different team's sprint
- How the error-budget and alerting tools from Chapters 5 through 7 are what actually surfaces the
  connection between the cost change and the reliability breach
- Why FinOps and SRE need to sit in the same review, not two separate ones, and what that review
  gate looks like in practice

## The setup

This is a scenario, built to illustrate a real and common tension — not an account of an actual
company or incident. Ridgeline Outfitters' checkout SLO, set in Chapter 7, is 99.9% of checkout
requests completing successfully within 800ms, measured monthly, with a 43-minute error budget for
the month. `order-service` runs on an AKS node pool sized for Ridgeline's historical traffic plus
roughly 35% headroom, to absorb the daily lunch-hour peak without autoscaling lag causing timeouts.

## The change

Three weeks before the incident, a cost-optimization pass — the kind Chapter 6 teaches directly —
flags that node pool as over-provisioned. Average CPU utilization across the month is only 52%, and
the right-sizing exercise from Lesson 21 recommends dropping from six nodes to four. The change goes
through a standard infrastructure pull request, gets a clean `terraform plan`, and merges:

```hcl
# Before
resource "azurerm_kubernetes_cluster_node_pool" "checkout" {
  name       = "checkout"
  node_count = 6
  vm_size    = "Standard_D4s_v5"
}

# After -- merged without an SRE reviewer on the PR
resource "azurerm_kubernetes_cluster_node_pool" "checkout" {
  name       = "checkout"
  node_count = 4
  vm_size    = "Standard_D4s_v5"
}
```

The pull request's description reads "Right-sizing checkout node pool per average utilization —
saves ~$1,100/month." It is reviewed and approved by two platform engineers. Neither is on the SRE
rotation for `order-service`, and the SLO and its headroom assumption are never mentioned in the
PR. The cost dashboard from Lesson 30 shows the expected drop in spend the following week — exactly
the signal it was built to show, working correctly.

## The incident

A marketing campaign drives a flash-sale traffic spike at 11:40 on a Tuesday — not an unusual event
for Ridgeline, and one the six-node pool had absorbed comfortably every time before. At four nodes,
the cluster autoscaler starts provisioning a fifth and sixth node, but pod scheduling and new-node
bootstrap take roughly four minutes. During that window, `order-service` pods are CPU-throttled,
checkout p99 latency crosses 800ms, and a meaningful share of requests start timing out.

```text
11:41:02  Alert: order-service p99 latency > 800ms (checkout SLO breach)
11:41:15  Alert: AKS cluster autoscaler scaling node pool "checkout" 4 -> 6
11:44:50  Autoscale complete; p99 latency returns below 800ms
11:45:00  Error budget burn: 19 of 43 minutes consumed in a single event
```

The on-call engineer's first read of the alert — exactly the "confusing error" pattern Lesson 31 of
the Terraform course showed for a different kind of incident — looks like a routine autoscaling-lag
problem. Nothing in the paging alert says "a node pool was downsized three weeks ago."

## Finding the real root cause

The postmortem, run with the blameless process from Lesson 28, pulls the trace data from Lesson 29's
instrumentation and the cost dashboard from Lesson 30 side by side. The traces show pod scheduling
delay, not application code, as the dominant span during the breach — a capacity problem, not a bug.
Checking the AKS node pool's own change history against that timestamp surfaces the three-week-old
`node_count` change immediately once someone thinks to look there, because the cost dashboard had
already logged exactly when the spend drop took effect.

## The actual finding, and the fix

The root cause isn't the autoscaler, and it isn't a code defect — it's that a legitimate,
well-reasoned cost optimization removed the specific headroom the SLO's error budget was implicitly
relying on, and nobody who understood that dependency was in the approval loop. The postmortem's
corrective actions, in the blameless format Lesson 28 established:

- Any node pool or instance-size change on a service with an active SLO requires an SRE reviewer on
  the pull request, not just a platform-team approval
- The right-sizing checklist from Lesson 21 gets a new line item: state the current error budget and
  autoscaler warm-up time next to the proposed capacity change
- The cost dashboard and the SLO dashboard, already pinned side by side since Lesson 30, get a
  shared annotation layer, so a capacity change shows up as a marker on the latency graph too

## Key terms

| Term | Meaning |
|---|---|
| Headroom | Capacity provisioned above measured average load, specifically to absorb spikes without autoscaling lag causing errors |
| Root cause vs. trigger | The traffic spike triggered the incident; the node-pool downsizing three weeks earlier was the actual root cause |
| FinOps/SRE review gate | A review step requiring both cost and reliability sign-off on any change that touches provisioned capacity for an SLO-bound service |
| Blameless postmortem | Chapter 7's process, used here to trace the breach back through traces and cost history instead of stopping at "autoscaling was slow" |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why did the on-call engineer's
first read of the alert look like a pure autoscaling problem, and what two artifacts from earlier in
this chapter — pinned together since Lesson 30 — are what actually let the postmortem connect the
breach back to a three-week-old cost decision?
