# Lesson 4 — Tags, Azure Policy, and Cost Governance Basics

**Chapter 1 · Azure Fundamentals & Governance · Lesson 4 of 4**

## What you'll learn

- What Azure tags are, and how they power cost allocation and resource organization
- How to apply tags to a resource or resource group with Azure CLI
- What Azure Policy actually enforces, and the difference between Deny, Audit, Append, and DeployIfNotExists effects
- The basics of Azure Cost Management: budgets and cost alerts

## Tags: metadata that does real work

A **tag** is a key-value pair you attach to a resource or resource group — `Environment=Production`,
`CostCenter=1000`, `Owner=web-team`. Tags don't change how a resource behaves; they're pure metadata.
But that metadata is exactly what Cost Management, automation scripts, and resource searches rely on
to group, filter, and report on resources that would otherwise just be a flat list of names.

```
az group create --name rg-prod-eastus-web01 --location eastus \
  --tags Environment=Production CostCenter=1000 Owner=web-team
```

The same `--tags` syntax works on `az resource update` for anything that's already deployed. Once
tags are applied consistently, Cost Management can break down a bill by `CostCenter` so finance sees
exactly what each department spent, and you can filter out every `Environment=Test` resource before
reacting to a cost spike that turns out to be a forgotten sandbox VM.

## Azure Policy: enforcing rules tags can't

Tags only work if someone remembers to apply them. **Azure Policy** removes that dependency by
evaluating resources against rules at deployment time and enforcing them automatically:

```
az policy assignment create \
  --name "require-costcenter-tag" \
  --policy "<built-in-policy-definition-id>" \
  --scope "/subscriptions/<subscription-id>"
```

This assigns a built-in policy that blocks any resource created without a `CostCenter` tag — the
deployment fails at the ARM layer before the resource is ever created, not after someone notices it
missing in a report. Other built-in policies cover things like **"Allowed virtual machine SKUs"**,
which stops anyone from deploying an oversized, expensive VM size the organization hasn't approved.

A policy's **effect** decides exactly what happens when a resource doesn't comply:

| Effect | What it does |
|---|---|
| Deny | Blocks the deployment outright |
| Audit | Lets the deployment through, but flags the resource as non-compliant in reports |
| Append | Adds a missing property or setting automatically before deployment |
| DeployIfNotExists | Deploys an additional related resource, like a missing diagnostic setting |

## Cost Management: budgets and alerts

Tags and policy keep resources organized and compliant; **Cost Management** keeps spending visible
before it becomes a surprise. A **budget** tracks spend against a threshold over a time period and
can notify the right people once spending crosses it:

```
az consumption budget create \
  --budget-name "monthly-prod-budget" \
  --amount 5000 \
  --category cost \
  --time-grain monthly \
  --start-date 2026-11-01 \
  --end-date 2027-10-31
```

Pair a budget with a **cost alert**, and the people who need to know get notified automatically once
spending crosses, say, 80% of the monthly threshold — rather than everyone finding out when the
invoice arrives.

## Key terms

| Term | Meaning |
|---|---|
| Tag | A key-value pair attached to a resource or resource group for metadata like cost center or environment |
| Azure Policy | A service that evaluates resources against defined rules and enforces an effect — Deny, Audit, Append, or DeployIfNotExists |
| Policy effect | What happens when a resource doesn't comply with an assigned policy |
| Budget | A Cost Management setting that tracks spending against a threshold and can trigger a cost alert |

## Check yourself

A VM deployment keeps failing with a policy-related error instead of an access-denied error. What's
the first thing you'd check, and how is diagnosing a policy failure different from diagnosing an
RBAC permission error?
