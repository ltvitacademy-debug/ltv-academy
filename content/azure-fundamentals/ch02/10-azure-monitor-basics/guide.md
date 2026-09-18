# Lesson 10 — Azure Monitor Basics

**Chapter 2 · Core Azure Services · Lesson 10 of 18**

## What you'll learn

- What **Azure Monitor** is, and why it's collected automatically, not opted into
- **Metrics**, **logs**, and **alerts** — the three things Azure Monitor is built around
- Where the data actually comes from
- Why observability matters even before anything has gone wrong

## The platform-wide observability service

**Azure Monitor** is Azure's platform-wide observability service — it
collects data from almost every resource you deploy: VMs, App
Service, storage accounts, VNets, and more, automatically, without
you having to install or configure a separate monitoring agent for
basic data. If a resource exists in Azure, Azure Monitor is very
likely already collecting something about it.

![A diagram from Microsoft's own Azure Monitor documentation showing data sources — applications, operating systems, Azure resources, subscriptions, and tenants — flowing into Azure Monitor, which then feeds visualizations, analysis, and alerting/automation.](/courses/azure-fundamentals/ch02/10-azure-monitor-basics/overview.png)

## Metrics, logs, and alerts

Azure Monitor is built around three core ideas:

- **Metrics** — numerical values collected at regular intervals, like
  CPU percentage on a VM or requests-per-second on a web app. Good
  for watching a number change over time.
- **Logs** — detailed, timestamped records of events, richer than a
  single number — an error message, a request's full details, an
  audit trail entry. Good for investigating *what actually happened*.
- **Alerts** — rules that watch metrics or logs and notify you (or
  trigger an automated action) when a defined condition is met, like
  CPU staying above 90% for five minutes.

Metrics tell you *that* something changed; logs tell you *what*
happened; alerts tell you *the moment* it's worth paying attention.

```
Data sources                Azure Monitor              What you get
Applications  ─┐                                       ┌─ Metrics (numbers over time)
Operating systems ─┤──────▶  collects & centralizes ───┼─ Logs (detailed event records)
Azure resources  ─┤                                    └─ Alerts (notify on a condition)
Subscriptions/tenants ─┘
```

## Why this matters before anything breaks

The value of Azure Monitor isn't just responding to an outage — it's
having the data already there when you need to ask a question, like
"did this get slower after last week's deployment?" or "how close
was this VM to running out of memory yesterday?" Because collection
starts automatically, you're not stuck retroactively wishing you'd
turned on monitoring before the incident that made you want to check.

## Chapter 2 complete

That closes Chapter 2, Core Azure Services — compute (VMs and App
Service), storage (Blob and Files), networking (VNets), identity
(Entra ID), and now observability (Azure Monitor). Chapter 3,
**Security, Pricing & Governance**, picks up from here: identity and
access management in more depth, how Azure billing actually works,
and how organizations keep large numbers of resources consistent and
compliant.

## Key terms

| Term | Meaning |
|---|---|
| Azure Monitor | Azure's platform-wide observability service, collecting data automatically |
| Metric | A numerical value collected at regular intervals (e.g., CPU percentage) |
| Log | A detailed, timestamped record of an event |
| Alert | A rule that notifies you or triggers an action when a condition is met |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking:
what's the difference between what a metric tells you and what a log
tells you, and why would you need both instead of just one?
