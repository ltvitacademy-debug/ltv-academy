# Lesson 20 — Budgets and Anomaly Alerts: Catching a Cost Spike Early

**Chapter 5 · Cost Management & FinOps Fundamentals · Lesson 20 of 32**

## What you'll learn

- How to set an **Azure Budget**, including its threshold-based
  action groups, and what it actually monitors
- How to set an **AWS Budget**, including cost, usage, and Savings
  Plans/RI coverage budget types
- What **Azure Cost Management anomaly detection** and **AWS Cost
  Anomaly Detection** do differently from a budget threshold, and why
  you want both
- How this chapter's whole Inform-phase toolchain — tagging, cost
  reports, budgets, and anomaly alerts — fits together as one working
  system

## A budget is a known threshold; an anomaly is an unexpected shape

Everything in this chapter so far has been about looking at spend on
demand: opening Cost Analysis or Cost Explorer and reading what
happened. A **budget** flips that around — it's a threshold you set
once, that watches spend continuously and notifies someone the moment
it's crossed, without anyone having to go looking. An **anomaly
alert** goes a step further: it doesn't need a threshold you set at
all, because it's built to catch an unusual *pattern* — a sudden
spike that's unusual for a specific resource or account, even if the
total spend is still well under whatever monthly budget was set.

Both matter, and they catch different kinds of problems. A budget
catches "we're going to blow past what we planned to spend this
month." An anomaly alert catches "something changed abruptly today,"
even on day 3 of the month when the running total is nowhere near any
budget's threshold yet.

## Setting an Azure Budget

Azure Budgets live in Cost Management + Billing, scoped the same way
Cost Analysis is — a subscription, resource group, or management
group. Creating one involves:

- A defined **amount** and **time period** (monthly, quarterly, or
  annual) — illustrative example: a monthly budget of $10,000 for a
  subscription
- One or more **alert thresholds**, each a percentage of that amount
  — for example, 80% and 100% (again, illustrative figures to adapt,
  not real company numbers)
- An **action group** attached to each threshold — an Azure action
  group can send email, trigger a webhook, call an Azure Function, or
  post to a Logic App, so a crossed threshold can do more than just
  notify a person

The budget can also be scoped by the same filters Cost Analysis uses
— a specific tag value, resource group, or service — so a team can
own a budget for exactly its own tagged spend rather than the whole
subscription's.

## Setting an AWS Budget

**AWS Budgets** cover more ground than a single number. The service
supports several budget types:

- **Cost budgets** — a dollar threshold over a time period, the direct
  equivalent of an Azure Budget
- **Usage budgets** — tracking a unit of usage (e.g., EC2 instance
  hours) rather than a dollar amount
- **Savings Plans / Reservation coverage budgets** — alerting when
  the percentage of usage covered by a commitment discount drops
  below a target, which is a signal that either usage changed or a
  commitment expired

Each AWS Budget supports alert thresholds tied to **actual** spend or
**forecasted** spend — forecasted thresholds can notify before the
month even ends, based on the same kind of trend projection Cost
Explorer's forecast uses. Notifications route through Amazon SNS,
which can fan out to email, a chat webhook, or a Lambda function.

## Anomaly detection: Azure and AWS

**Azure Cost Management anomaly detection** runs automatically once
enabled on a subscription — it uses the subscription's own historical
spend pattern to learn what's normal, and flags a day's spend that
deviates meaningfully from that learned pattern, without requiring a
manually set threshold at all.

**AWS Cost Anomaly Detection** works the same way conceptually:
define a **monitor** scoped to a service, a linked account, or a
cost allocation tag, and AWS applies machine-learning-based detection
against that scope's historical spend. When it flags an anomaly, the
alert includes the **top contributor** — which specific service or
resource drove the unexpected change — which is usually the fastest
path straight to the root cause, faster than starting from a Cost
Explorer report and working backward.

## Putting the chapter together

This chapter's four lessons form one working pipeline: the FinOps
framework (Lesson 17) explains *why* this matters and who's
responsible; Cost Analysis and Cost Explorer (Lesson 18) are *how*
you look at spend on demand; tagging (Lesson 19) is what makes that
look-up *attributable* to the right team; and budgets plus anomaly
detection (this lesson) are what make the whole system *proactive*
instead of reactive — catching a spike within days, tied to the team
that owns it, instead of discovering it as a surprise line item on
next month's invoice.

## Key terms

| Term | Meaning |
|---|---|
| Azure Budget | A threshold on spend, scoped like Cost Analysis, with action-group-driven alerts at defined percentage thresholds |
| AWS Budget | AWS's equivalent, supporting cost, usage, and Savings Plans/RI coverage budget types, with actual- or forecast-based thresholds |
| Anomaly detection | Pattern-based alerting (Azure Cost Management, AWS Cost Anomaly Detection) that flags an unusual spend shape without a manually set threshold |
| Top contributor | The specific service/resource AWS Cost Anomaly Detection identifies as the main driver of a flagged anomaly |

## Check yourself

You're ready to move to Chapter 6 when you can explain, without
looking: what's the real difference between what a budget threshold
catches and what an anomaly alert catches, and why would a team want
both rather than just one?
