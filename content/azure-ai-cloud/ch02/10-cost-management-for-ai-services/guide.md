# Lesson 10 — Cost Management for AI Services

**Chapter 2 · Working With Azure AI Services · Lesson 10 of 24**

## What you'll learn

- Why AI service costs behave differently from typical Azure resources
- How to drill from subscription-level cost down to a single resource
- How to set a budget and alert before a cost problem becomes a surprise
- Three day-to-day habits that actually keep AI spend under control

## Why AI costs need special attention

AI services bill through the same Azure Cost Management tooling as everything else, but three things make them worth extra attention:

- **Price per token varies enormously by model** — a frontier reasoning model can cost 10-50x a smaller, faster model per token, so a casual model swap can quietly multiply your bill.
- **Usage is bursty** — a retry loop, a leaked API key, or a bug in a prompt-chaining application can spike spend within minutes, not months.
- **It's still the same tool** — Azure Cost Management covers AI resources exactly like storage accounts or VMs, so the skills in this lesson aren't AI-specific; they're just especially worth applying here.

## Finding what's actually spending

**Cost analysis** lets you drill from your whole subscription down to the resource actually generating the charge:

![The Cost analysis Subscriptions view, drilling from a management group down through subscriptions to individual resources and their costs.](/courses/azure-ai-cloud/ch02/10-cost-management-for-ai-services/table-show-cost-contributors.png)
*Cost analysis drills from subscription down to resource group to the individual resource — exactly where an AI deployment's spend shows up.*

Expand a row to see the next level of detail, or select a name to drill all the way down to a specific resource's product meters — useful for confirming exactly which deployment or model is driving a cost spike.

## Set a ceiling before you need one

A **budget** with an alert is the single highest-leverage action you can take:

![Creating a budget with an advanced settings link for quarterly or yearly configuration in Azure Cost Management.](/courses/azure-ai-cloud/ch02/10-cost-management-for-ai-services/create-budget.png)
*A budget with an alert catches a runaway deployment long before the monthly invoice does.*

Set it on every resource group that holds an AI deployment, with an alert threshold well below your actual tolerance — the point is to get notified while there's still time to react, not after the fact.

## Watch the trend, not just the total

The **accumulated costs** view shows the shape of your spending over time, not just a single number:

![An accumulated costs chart showing cost climbing over time, used to distinguish gradual growth from a sudden spike.](/courses/azure-ai-cloud/ch02/10-cost-management-for-ai-services/accumulated-costs-view.png)
*The accumulated costs view shows whether spend is climbing steadily or spiking — the shape of the line matters as much as the number.*

A steadily climbing line usually means normal growth. A sudden step-change is almost always worth investigating immediately — it's rarely a coincidence.

## Three habits that actually control cost

1. **Budgets + alerts on every AI resource group.** Not just the subscription level — a budget scoped too broadly won't tell you *which* deployment is the problem.
2. **Watch token usage, not just dollars.** A model swap changes your cost per call even if your call volume doesn't change at all.
3. **Match deployment type to real traffic.** Standard (pay-per-token) deployments suit variable traffic; provisioned throughput units suit high, steady, predictable volume. Mismatching either direction wastes money.

## Key terms

| Term | Meaning |
|---|---|
| Cost analysis | The Azure Cost Management tool for exploring and drilling into spend |
| Budget | A spending ceiling with configurable alert thresholds |
| Accumulated costs view | A chart showing cumulative spend over a selected time period |
| Provisioned throughput (PTU) | A reserved-capacity billing model, suited to high, steady traffic |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: what are the three habits that actually keep AI service costs under control, beyond just looking at a dashboard?
