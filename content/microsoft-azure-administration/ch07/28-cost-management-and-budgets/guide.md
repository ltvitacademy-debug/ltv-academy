# Lesson 28 — Cost Management and Budgets

**Chapter 7 · Monitoring & Cost Management · Lesson 28 of 32**

## What you'll learn

- Where cost actually lives in the portal, and how to break it down by resource group or tag
- What a budget is, and the difference between an alert threshold and an actual spending cap
- How the tags from Chapter 1 pay off directly when it's time to analyze spend
- A concrete example of setting a monthly budget with alerts at 80% and 100%

## Cost Management + Billing

Every subscription has a **Cost Management + Billing** blade in the Azure portal.
It's where you go to answer "what am I actually spending, and on what?" The two
pieces that matter most day to day are **Cost analysis**, which shows spend broken
down different ways, and **Budgets**, which watch that spend against a threshold you
set. Both read from the same underlying billing data — Cost analysis is the view,
Budgets is the watchdog.

## Cost analysis: breaking spend down

**Cost analysis** lets you view spend filtered or grouped by several dimensions:
**resource group**, **service** (Compute, Storage, Networking), **location**, or —
this is where Chapter 1's tagging discipline pays off directly — **tag**. If every
resource in a project was tagged `project: website-migration` back when it was
created, Cost analysis can show you exactly what that project costs across every
resource group it touches, something a resource-group-only view could never do
cleanly once a project spans more than one group.

## Budgets: a threshold, not a spending cap

A **budget** is a spend threshold you set for a scope — a subscription or a resource
group — over a period, almost always monthly. Here's the detail that trips people up:
a budget does **not** stop spending on its own. It's an alerting mechanism. You set
one or more **alert thresholds** as a percentage of the budget — commonly **80%** and
**100%** — and when actual spend crosses one, Azure sends a notification to the email
addresses or Action Group (Lesson 27) you configured. Keeping a resource running past
100% of its budget is entirely possible; the budget just makes sure someone finds out.

## Example: a resource group budget with two thresholds

A resource group running a project's VMs, storage, and networking is expected to cost
about $500 a month. Set a budget scoped to that resource group: amount $500, period
monthly, with alert thresholds at 80% ($400) and 100% ($500). Hit $400 mid-month, and
an email goes out — plenty of warning to investigate before the bill closes out the
month, rather than finding out when the invoice already says $700.

## Key terms

| Term | Meaning |
|---|---|
| Cost Management + Billing | The portal blade for viewing and controlling Azure spend |
| Cost analysis | A view of spend broken down by resource group, service, location, or tag |
| Budget | A spend threshold set for a scope and period, with alert thresholds — not an automatic spending cap |
| Tag | A key-value label (Chapter 1) that lets Cost analysis group spend by project, department, or environment |

## Check yourself

You're ready for Chapter 8 when you can explain, without looking: why does a budget
hitting 100% not actually stop a VM from running, and what does crossing that
threshold actually trigger instead?
