# Lesson 6 — Configuring Basic Monitoring and Alerts

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 6 of 10**

## What you'll learn

- What's already being watched on `vm-catalog01` with zero setup, versus what needs to be
  turned on deliberately
- How to stand up a Log Analytics workspace and route the VM's activity into it
- How to build one real alert rule end to end: condition, Action Group, and severity
- Why "basic monitoring" doesn't mean "no monitoring" — it means picking the signals that
  actually matter for this app

## What Azure already watches, with no setup

The on-prem server never had real monitoring — if it slowed down or filled its disk, nobody
found out until a customer complained. The moment `vm-catalog01` existed, that changed: Azure
Monitor automatically collects **platform metrics** for it — Percentage CPU, Network In/Out, and
Disk Read/Write Bytes — with no agent installed and no configuration required, retained for 93
days by default. That's already more visibility than the on-prem server ever had, before Theo
configures anything at all.

## Reading the first signal: Metrics Explorer

Before building an alert, Theo checks what normal looks like. In the portal, Metrics Explorer on
`vm-catalog01`'s Overview page charts Percentage CPU over the last 24 hours, with the aggregation
switched from Average to Maximum — the same CPU data can look fine on average while spiking to
dangerous levels the average hides. The same check is scriptable from the CLI:

```
az monitor metrics list \
  --resource <vm-catalog01-resource-id> \
  --metric "Percentage CPU" \
  --interval PT1H
```

## Setting up a Log Analytics workspace

Platform metrics are numbers over time; logs are detailed records of events, and they need
somewhere to live before they can be queried. Theo creates one workspace for this project and
points the VM's diagnostic settings at it:

```
az monitor log-analytics workspace create \
  --resource-group rg-driftwood-eastus-catalog \
  --workspace-name law-driftwood-catalog \
  --location eastus
```

Once logs are flowing, a KQL query can answer questions a metric chart can't — like confirming
who made a change, using the Activity Log that's already recording every control-plane
operation against this resource group at no extra cost:

```
AzureActivity
| where ResourceGroup == "rg-driftwood-eastus-catalog"
| where TimeGenerated > ago(24h)
| project TimeGenerated, Caller, OperationNameValue, ActivityStatusValue
```

## Building one real alert: CPU over 80% for 5 minutes

An alert rule is a condition plus an action. For `vm-catalog01`, the signal that matters most
before launch is sustained high CPU — a real warning sign the VM is undersized for incoming
traffic, not a momentary blip:

```
az monitor metrics alert create \
  --name alert-catalog01-high-cpu \
  --resource-group rg-driftwood-eastus-catalog \
  --scopes <vm-catalog01-resource-id> \
  --condition "avg Percentage CPU > 80" \
  --window-size 5m \
  --evaluation-frequency 1m \
  --severity 2 \
  --action <action-group-resource-id>
```

In plain language: check average CPU every minute, and if it's been over 80% for the last 5
minutes, fire. That window matters — without it, a two-second spike that's completely normal
would trigger a noisy, useless alert.

## The Action Group: who actually gets told

An alert rule's action points at an **Action Group** — a separate, reusable object, so the same
notification setup can attach to this alert and to a disk-space alert later without rebuilding
it each time:

```
az monitor action-group create \
  --name ag-driftwood-ops \
  --resource-group rg-driftwood-eastus-catalog \
  --action email theo theo.bryant@driftwoodoutdoor.com \
  --action email priya priya.suresh@driftwoodoutdoor.com
```

Severity 2 on this alert reflects that high CPU on the catalog app's only VM is serious — not
the most critical thing that could happen to Driftwood, but serious enough to act on quickly,
especially this close to launch.

## Key terms

| Term | Meaning |
|---|---|
| Platform metric | A metric (like Percentage CPU) collected automatically for a resource, no setup required |
| Log Analytics workspace | A container that stores log data, queried with KQL, pointed to by a resource's diagnostic settings |
| Alert rule | A condition (signal, threshold, evaluation window) paired with an action that fires when it's true |
| Action Group | A reusable set of notification actions (here, two emails) attached to one or more alert rules |

## Lab

Create the Log Analytics workspace, build the CPU alert rule above with a real Action Group
emailing yourself, and trigger a test load on `vm-catalog01` (even a simple CPU-stress command)
to confirm the alert actually fires end to end.

## Check yourself

You're ready for Lesson 7 when you can explain, from memory, the difference between a platform
metric and a log, and why the alert rule's 5-minute evaluation window matters as much as the
80% threshold itself.
