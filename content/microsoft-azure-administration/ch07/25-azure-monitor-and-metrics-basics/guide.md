# Lesson 25 — Azure Monitor and Metrics Basics

**Chapter 7 · Monitoring & Cost Management · Lesson 25 of 32**

## What you'll learn

- What Azure Monitor actually is: the platform-wide monitoring service behind every resource you've deployed so far in this course
- Why most resources start emitting **platform metrics** automatically, with zero setup
- How to read a metric in the portal's Metrics Explorer — scope, metric, aggregation, time range
- A real example of pulling a metric from the command line with the Azure CLI

## Azure Monitor: one service watching everything

Every Azure resource you've created in this course — the VMs in Chapter 3, the storage
accounts in Chapter 4, the load balancer in Chapter 5 — is already being watched.
**Azure Monitor** is the platform-wide service that collects, stores, and surfaces
monitoring data for virtually everything running in Azure. You don't turn it on
resource by resource; it's part of the platform itself. Azure Monitor is really an
umbrella over several pieces — metrics, logs, alerts, dashboards — and this chapter
walks through them one at a time, starting with the simplest and most immediate: metrics.

## Platform metrics: collected automatically, no setup required

A **metric** is a numerical value measured at a point in time — CPU percentage, bytes
read, requests per second. **Platform metrics** are the specific set of metrics Azure
collects automatically for most resource types, the moment the resource exists, with
no agent to install and no configuration to turn on. A virtual machine, for example,
immediately starts reporting **Percentage CPU**, **Network In/Out**, and **Disk Read/Write
Bytes** without you doing anything. A storage account reports transaction counts and
latency the same way. This is why metrics are the first place to look when something
seems off — the data is already there, retained for 93 days by default.

## Reading a metric: Metrics Explorer

In the portal, **Metrics Explorer** (under Monitor, or directly on a resource's
Overview page) is where you chart a metric over time. Four choices shape what you see:
the **scope** (which resource or resources), the **metric** itself (e.g. Percentage CPU),
the **aggregation** (Average, Minimum, Maximum, Sum, or Count — the same CPU data looks
very different as an average vs. a maximum), and the **time range** (last hour, last
24 hours, last 30 days). Changing the aggregation on a spiky CPU chart is often the
difference between "looks fine" (on average) and "there's a real problem" (on maximum).

## Example: checking if a VM is undersized

Say a VM feels slow. Open its Overview page, find the Percentage CPU chart, and switch
the aggregation to **Maximum** over the last 24 hours. If it's pegged near 100% for
long stretches, that's a real signal the VM size from Chapter 3 is too small for the
workload — concrete evidence, not a guess, and the same metric Chapter 3's VM sizing
decision should be revisited against.

## The same thing from the command line

Everything Metrics Explorer shows in the portal is also reachable through the
Azure CLI from Chapter 6, which matters once you're scripting a health check instead
of clicking through the portal by hand:

```
az monitor metrics list --resource <vm-resource-id> --metric "Percentage CPU" --interval PT1H
```

This returns the same Percentage CPU data, broken into one-hour intervals, as plain
output you can pipe into a script.

## Key terms

| Term | Meaning |
|---|---|
| Azure Monitor | The platform-wide service that collects and surfaces monitoring data for Azure resources |
| Metric | A numerical measurement at a point in time, such as CPU percentage or bytes written |
| Platform metric | A metric collected automatically for most resources, with no setup required |
| Aggregation | How a metric's data points are summarized over a time range — Average, Min, Max, Sum, or Count |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why does switching a
CPU chart's aggregation from Average to Maximum sometimes reveal a problem the average
completely hides?
