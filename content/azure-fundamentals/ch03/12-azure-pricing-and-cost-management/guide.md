# Lesson 12 — Azure Pricing & Cost Management

**Chapter 3 · Security, Pricing & Governance · Lesson 12 of 18**

## What you'll learn

- Pay-as-you-go vs. reserved instances — two different ways to buy the same compute
- The Pricing Calculator — estimating cost before you deploy anything
- Cost Management + Billing — the tools that track what you're actually spending
- Budgets and alerts — catching a cost problem before the invoice arrives

## Pay-as-you-go vs. reserved instances

Lesson 1 introduced the CapEx-to-OpEx shift — paying for what you use instead
of buying hardware upfront. Inside that OpEx model, Azure still gives you two
different ways to pay for the same virtual machine:

| Option | How it works | Best for |
|---|---|---|
| Pay-as-you-go | Billed by the hour/second for actual usage, no commitment | Unpredictable or short-term workloads |
| Reserved instances | Commit to 1 or 3 years upfront, get a significant discount (often 40-60% off) | Steady, predictable workloads you know you'll run long-term |

Neither one is "correct" by default — it's a bet on how predictable your
usage will be. A dev/test VM that gets turned off most nights stays
pay-as-you-go. A production database server that runs 24/7 for the next two
years is exactly the kind of steady load a reservation is built for.

## Estimating cost before you deploy: the Pricing Calculator

The **Azure Pricing Calculator** (a free web tool at
azure.microsoft.com/pricing/calculator) lets you build an estimate before you
create a single resource. Pick a service — a VM size, a storage account tier,
a database — and it shows a monthly cost estimate based on your region and
usage pattern. This matters for the same reason a budget matters before a
purchase in any other part of life: you find out a VM size is going to cost
$400/month *before* you deploy it, not after the invoice shows up.

## Tracking what you're actually spending: Cost Management + Billing

Once resources exist, **Cost Management + Billing** is the built-in Azure
tool that tracks real spending — broken down by subscription, resource group,
service, or (as Lesson 13 covers) by tag. Microsoft's own Cost Management
documentation frames this around three principles: **visibility** (see what
you're spending and where), **accountability** (know who owns each cost), and
**optimization** (act on what you see to spend less without losing
capability).

![Cost Management's three key principles: visibility, accountability, and optimization, arranged around a central cost-management icon.](/courses/azure-fundamentals/ch03/12-azure-pricing-and-cost-management/principles.png)

Those three words aren't slogans — they map directly onto what the tool
actually does: cost analysis views (visibility), tags and resource-group
ownership (accountability), and recommendations plus budgets (optimization).

## Catching problems early: budgets and alerts

A **budget** in Cost Management is a spending threshold you set for a
subscription or resource group — say, $500/month. An **alert** fires when
spending crosses a percentage of that budget (50%, 90%, 100%), emailing
whoever's on the notification list. This is the difference between finding
out about a cost overrun from an invoice at the end of the month and finding
out about it while there's still time to act — someone left an expensive VM
running over a weekend, and a budget alert catches it on day two, not day
thirty.

## Key terms

| Term | Meaning |
|---|---|
| Pay-as-you-go | Billed by actual usage, no commitment, higher per-unit cost |
| Reserved instance | 1-3 year commitment for a steady workload, in exchange for a discount |
| Pricing Calculator | Free tool to estimate cost before deploying a resource |
| Cost Management + Billing | Built-in tool for tracking and analyzing real Azure spending |
| Budget / alert | A spending threshold, and a notification when spending nears it |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: when would
a reserved instance save money over pay-as-you-go, and when would it actually
cost more?
