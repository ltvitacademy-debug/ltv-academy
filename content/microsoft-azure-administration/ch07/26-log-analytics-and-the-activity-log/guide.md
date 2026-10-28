# Lesson 26 — Log Analytics and the Activity Log

**Chapter 7 · Monitoring & Cost Management · Lesson 26 of 32**

## What you'll learn

- What a Log Analytics workspace is, and why it's the central store logs actually get queried from
- KQL (Kusto Query Language) — the query language you write against that workspace, and where else it shows up
- What the Activity Log records, and how it's fundamentally different from a metric
- A real example of using both together to answer "who did this, and when?"

## Log Analytics: the central log store

Metrics (Lesson 25) are numbers over time. **Logs** are detailed records — structured
or unstructured — of events, and they need somewhere to live before you can search
them. That place is a **Log Analytics workspace**: a container in Azure that stores
log data collected from VMs, diagnostic settings on other resources, and services like
Microsoft Sentinel or Defender for Cloud, so it can all be queried in one place.
Nothing lands in a workspace automatically the way platform metrics do — you point a
resource's diagnostic settings at a workspace, or install the monitoring agent on a
VM, and from then on its logs flow there.

## KQL: the query language, and a real cross-path connection

Once log data is in a workspace, you search it with **KQL — Kusto Query Language**.
A basic query reads top to bottom, piped with `|`, filtering and summarizing as it
goes:

```
AzureActivity
| where TimeGenerated > ago(24h)
| where ActivityStatusValue == "Success"
| summarize count() by OperationNameValue
```

This is worth pausing on: KQL isn't specific to Log Analytics. It's the exact same
query language that powers **Microsoft Sentinel**, Azure's cloud SIEM, which you'll
meet again if you continue into the Cybersecurity path. Learning to read a KQL query
here pays off twice.

## The Activity Log: a different kind of record entirely

The **Activity Log** is not part of Log Analytics, and it's not a metric. It's
automatically enabled for every subscription at no extra cost, and it records
**control-plane operations** — administrative actions against the Azure Resource
Manager, the same Resource Manager from Chapter 1. Every time someone creates,
modifies, or deletes a resource through the portal, CLI, or an API call, the Activity
Log captures **who** did it (the caller's identity), **what** operation ran (e.g.
`Microsoft.Compute/virtualMachines/write`), **when** it happened, and whether it
**succeeded or failed**. By default it's retained 90 days, though you can route it to
a Log Analytics workspace or storage account for longer retention and richer querying.

## Example: tracking down an unexpected change

A VM is suddenly stopped and nobody on the team admits to it. Metrics won't help here
— they show the VM is off, not who turned it off. The Activity Log will: filter it by
resource and operation type, and it shows exactly which account ran the stop
operation and at what timestamp. If that Activity Log has been routed into a
workspace, the same question becomes a KQL query instead of a portal filter:

```
AzureActivity
| where OperationNameValue has "deallocate"
| project TimeGenerated, Caller, ResourceId
```

## Key terms

| Term | Meaning |
|---|---|
| Log Analytics workspace | A container that stores log data, queried with KQL, across resources and services |
| KQL | Kusto Query Language — the query language for a Log Analytics workspace, also used by Microsoft Sentinel |
| Activity Log | A per-subscription, always-on record of control-plane operations: who did what, when |
| Control-plane operation | An administrative action against Azure Resource Manager, like creating or deleting a resource |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why would a metric
chart never be able to tell you *who* stopped a VM, but the Activity Log can?
