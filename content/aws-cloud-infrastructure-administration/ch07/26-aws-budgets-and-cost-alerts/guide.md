# Lesson 26 — AWS Budgets and Cost Alerts

**Chapter 7 · AWS Cost Management · Lesson 26 of 32**

## What you'll learn

- What AWS Budgets does, and why a budget is an alert, not an automatic spending cap
- The two most common budget types — cost budgets and usage budgets — and what each one tracks
- How alert thresholds work, including the difference between actual and forecasted spend
- A concrete example of a monthly cost budget with an 80% alert threshold

## AWS Budgets: a threshold you set, not a limit AWS enforces

**AWS Budgets** lets you set a custom spending or usage threshold for a scope
— the whole account, a linked account, or spend filtered by a specific
service or tag — and get notified when actual or forecasted activity crosses
it. The detail that trips people up: a budget does **not** stop anything on
its own. Nothing gets throttled, no instance gets stopped, no API call gets
blocked. A budget is a watchdog, not a brake — crossing 100% of a budget just
means the notification fires, while whatever is spending the money keeps
right on running.

## Cost budgets vs. usage budgets

The two most common budget types track different things. A **cost budget**
tracks spend in dollars against a target — "alert me if this month's bill is
on pace to exceed $800." A **usage budget** tracks a quantity of usage
instead of money — "alert me if EC2 usage exceeds 500 instance-hours this
month," which matters when the goal is catching runaway usage before it even
turns into a large bill. AWS Budgets also supports budgets for Reserved
Instance and Savings Plans utilization and coverage, covered from the
discount side in Lesson 28.

## Alert thresholds: actual spend vs. forecasted spend

A budget can carry one or more **alert thresholds**, each a percentage of
the budget amount — 80% and 100% are the common pair. Each threshold can
trigger on **actual spend** (what's already been billed) or **forecasted
spend** (what AWS Budgets projects the full period will reach, based on the
pace so far). A forecasted-spend alert is the more useful early warning: it
can fire in the first two weeks of the month if spending pace alone predicts
a budget-busting total, well before actual spend has crossed anything.

## Example: an $800 monthly cost budget with two thresholds

A team expects roughly $800 a month in AWS spend. Set a cost budget scoped to
the account: amount $800, period monthly, with an alert threshold at 80%
($640) on actual spend and a second threshold at 100% (forecasted) so a bad
pace trips a warning even before the month closes. Mid-month, actual spend
crosses $640 and an email goes out to the configured recipients — plenty of
time to investigate before the invoice closes out well past the target.

## Key terms

| Term | Meaning |
|---|---|
| AWS Budgets | A service for setting a spend or usage threshold and getting alerted when it's crossed |
| Cost budget | A budget type tracking spend in dollars against a target amount |
| Usage budget | A budget type tracking a quantity of usage (e.g., instance-hours) instead of dollars |
| Alert threshold | A percentage of the budget amount that, when crossed by actual or forecasted spend, triggers a notification |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why does a
budget crossing 100% not actually stop any AWS resource from running, and
what's the real difference between an actual-spend threshold and a
forecasted-spend threshold?
