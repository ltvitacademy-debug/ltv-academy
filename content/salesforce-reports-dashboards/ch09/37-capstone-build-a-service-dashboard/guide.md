# Capstone: Build a Service Dashboard

Same method, different object. In this lesson you'll build Harborline's service dashboard
for Thursday's support review, from the five service questions in the kickoff. Every figure
is an illustrative example, and your own org's field values (priorities, origins, queues)
may differ, so use the pickers in your org rather than assuming names. The discipline is
the one you used for sales: one report per question, a chart that fits the comparison, and
a reconciliation before you share.

## What you'll learn

- How to build volume, backlog, aging, origin, and workload reports on the Cases report type
- How to apply a bucket and a row-level formula to measure service quality
- How to handle queue ownership when reporting workload per agent
- How to be honest about what a native dashboard can and can't show over time

## Step 1: six reports on one report type

All six use the standard **Cases** report type, in a folder named "Harborline Service."

| Report | Answers | Component |
|---|---|---|
| Opened This Month | How many cases opened? | Metric |
| Closed This Month | How many closed? | Metric |
| Open Backlog by Priority | Is the backlog growing? | Metric + stacked bar |
| High-Priority Aging | High-priority: old or escalated? | Table |
| Cases by Origin | Where do cases come from? | Donut |
| Workload by Owner | Spread across 12 agents? | Bar chart |

## Step 2: volume and backlog

**Opened This Month:** filter Date/Time Opened to *This Month* and count records. Example:
**1,840**. **Closed This Month:** filter to closed cases with Date/Time Closed *This Month*.
Example: **1,725**.

Opened minus closed is **115**, so the open backlog grew by 115 this month.

**Open Backlog by Priority:** filter to open cases (not closed), group by Priority. Example
total: **412**, made up of 96 High, 205 Medium, and 111 Low. A stacked bar shows the mix.
On the backlog metric, use color ranges so a number above your team's comfort level stands
out.

## Step 3: aging and quality

**High-Priority Aging** is the action list. Filter to open cases with Priority High and an
age over five days (use the Case Age field your org exposes). Example: **38 cases, 9 of them
escalated**. Add a **bucket** on Age so rows fall into 0-2, 3-5, and 6+ days, sort oldest
first, and show case number, owner, age, and the escalated flag. The reader will work from
this table, so it must show names and numbers.

For quality, use a **row-level formula** on closed cases that compares age to a two-day
target and returns "Within target" or "Over target." A **summary formula** or the report's
grouping counts each and gives a percentage. Example: **68% within target**, with an
average closed-case age of **2.8 days**. Exact formula syntax varies, so build it with the
formula editor's field picker.

## Step 4: origin and workload

**Cases by Origin:** cases opened this month, grouped by Case Origin, as a donut. Example:
46% email, 31% phone, 18% web, 5% chat. Origin values are picklist values your org may
have customized.

**Workload by Owner:** open cases grouped by Case Owner. There is a catch: cases waiting in
a queue show the **queue** as the owner, not an agent. Expect "Tier 1" and "Tier 2" queue
bars beside the agents, and note them in the chart title. With 412 open cases and 12
agents, the average is about 34 per agent, which gives you a sanity check on the bars.

## Step 5: assemble and check

Layout, top to bottom: three metrics (opened, closed, backlog); backlog by priority and
origin in the middle; workload and the aging table at the bottom. Title each component with
its point. Add two dashboard filters, **Priority** and **Case Origin**, and choose the
running user as you did for sales.

Reconcile: 1,840 minus 1,725 is 115; the three priority groups sum to 412; the aging
table's total matches the 38 figure. Open each source report from its component to confirm.

## Be honest about time

This dashboard shows the backlog *change* this month easily, because opened minus closed
covers it. A daily backlog trend, however, needs history. If Historical Trend Reporting
supports Cases in your org, or if you set up a reporting snapshot, plan it now. This is the
native limit from Chapter 8 in practice: you can't recreate a trend you didn't capture.

## Recap

Six reports on Cases answer five questions. A bucket and a row-level formula added quality
measures, queue ownership was handled explicitly, and reconciliation caught mismatches
before the meeting.

## Check yourself

Your workload chart shows a bar named "Tier 1" that is larger than any agent's bar. What is
it, and how should you present it so the VP doesn't mistake it for one overloaded person?
