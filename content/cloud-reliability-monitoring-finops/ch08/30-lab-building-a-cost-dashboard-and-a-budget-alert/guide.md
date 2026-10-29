# Lesson 30 — Lab: Building a Cost Dashboard and a Budget Alert

**Chapter 8 · Capstone: Operating a Production Cloud Environment · Lesson 30 of 32**

## What you'll learn

- How to build a real cost view for Ridgeline Outfitters grouped by tag instead of by raw resource
  name, the practical payoff of Chapter 5's tagging lesson
- How to pin that view into a shared dashboard next to the reliability dashboards Chapter 4 already
  built, instead of leaving cost in a separate tool nobody checks
- How to define a budget with staged threshold actions, not just one alert at 100% spent
- How to add an anomaly alert on top of the budget, so a sudden spend spike gets caught days before
  the monthly budget threshold would ever fire

## The scenario, continued

`order-service` is instrumented now. The next real operational job isn't reliability — it's cost.
Ridgeline's cloud bill has been climbing, and nobody can currently say which team or which
environment is responsible, because resources were never tagged consistently. This lab fixes that:
a real tagging pass, a cost view grouped by those tags, a budget with staged alerts, and an anomaly
alert that would have caught last month's unexplained spike days earlier than it actually was.

## Step 1 — Tag consistently, or the dashboard is meaningless

```bash
az resource tag --tags team=checkout environment=prod cost-center=cc-4410 \
  --ids /subscriptions/<sub-id>/resourceGroups/rg-ridgeline-prod/providers/Microsoft.ContainerService/managedClusters/aks-ridgeline-prod
```

Chapter 5 covered the taxonomy — `team`, `environment`, `cost-center` — and the hard rule that
matters here: a resource grouping by tag is only as good as tagging coverage. One untagged resource
group shows up as an "Untagged" bucket on every chart that follows, which is exactly the blind spot
that let last month's spike go unnoticed in the first place.

## Step 2 — Build the cost view, grouped by tag

```
Cost Management + Billing → Cost analysis
  Scope: subscription "Ridgeline-Production"
  Group by: tag: team
  Granularity: daily
  Filter: tag: environment = prod
```

Grouped by `team` instead of by resource name, the view immediately answers "who is spending" —
`checkout` next to `catalog` next to `fulfillment` — rather than a flat list of VM and storage
account names nobody can attribute to a decision-maker. This is the same cost-analysis screen
Chapter 5 introduced, now actually configured around Ridgeline's real tags instead of the default,
ungrouped view.

## Step 3 — Pin it next to the reliability dashboard

```
Cost analysis view → Pin to dashboard → "Ridgeline Production Operations"
```

That dashboard already holds the Grafana panels Chapter 4 built on top of Azure Monitor and
CloudWatch. Pinning the cost view onto the same dashboard, instead of leaving it inside Cost
Management where only Finance looks, is a deliberate choice: the people who make a cost-cutting
change should see its cost *and* its reliability blast radius in the same place, every day — the
exact gap Lesson 31 shows what happens when that visibility doesn't exist.

## Step 4 — Define a budget with staged thresholds, not one alert

```json
{
  "name": "checkout-monthly-budget",
  "amount": 18000,
  "timeGrain": "Monthly",
  "category": "Cost",
  "notifications": {
    "Actual_80": { "enabled": true, "operator": "GreaterThan", "threshold": 80, "contactEmails": ["sre-oncall@ridgeline.example"] },
    "Forecasted_100": { "enabled": true, "operator": "GreaterThan", "threshold": 100, "thresholdType": "Forecasted", "contactEmails": ["finops@ridgeline.example"] }
  }
}
```

One threshold at 100% actual spend only tells you after the money is gone. Staging an alert at 80%
actual and a separate *forecasted* alert at 100% gives the checkout team and FinOps a warning days
before the month closes, while there's still time to act — the same "catch it early" principle
Chapter 5's FinOps framework lesson introduced as "Inform."

## Step 5 — Add an anomaly alert on top of the budget

```
Cost Management → Cost alerts → Anomaly detection
  Scope: resource group rg-ridgeline-prod
  Sensitivity: Medium
  Action group: ag-finops-oncall
```

A budget alert fires relative to a fixed monthly number; an anomaly alert fires relative to
Ridgeline's own recent spending pattern, days before a slow-building overage would ever cross a
budget threshold. That's the one-day-not-thirty-days difference between catching a cost spike while
it's still small and finding out about it on next month's invoice.

## Key terms

| Term | Meaning |
|---|---|
| Tag coverage | How completely resources carry the agreed tag taxonomy; incomplete coverage creates an "Untagged" blind spot on every grouped view |
| Cost analysis grouping | Viewing spend grouped by a tag dimension like `team`, instead of by raw resource name |
| Staged budget threshold | Multiple alert thresholds (e.g. 80% actual, 100% forecasted) instead of one alert that fires only after the month is over |
| Anomaly alert | Fires relative to a resource's own recent spending pattern, catching a spike days before a fixed budget threshold would |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does a forecasted-100%
threshold catch a problem earlier than an actual-100% threshold, and why does pinning the cost view
onto the same dashboard as the reliability panels matter more than keeping it in Cost Management
alone?
