# Lesson 15 — Alert Routing and On-Call Without Alert Fatigue

**Chapter 4 · Dashboards and Alerts That Matter · Lesson 3 of 4**

## What you'll learn

- How **severity-based escalation** keeps a Sev1 from getting buried
  in the same queue as a Sev3, and keeps a Sev3 from waking anyone up
- How alert **routing** uses labels to send an alert to the team that
  actually owns the failing service, instead of whoever's on call for
  everything
- The real anti-fatigue mechanics — **deduplication**, **grouping**,
  and **silencing** during planned maintenance — that keep an on-call
  rotation sustainable
- A real Prometheus Alertmanager routing config, read line by line

## Severity decides who gets paged, and how loudly

Not every alert deserves the same response, and treating them as if
they do is exactly what burns out an on-call rotation. A workable
severity model usually looks like three tiers: **Sev1** (customer-
facing outage, page immediately, any hour), **Sev2** (degraded but
not down, page during business hours or escalate if unacknowledged),
and **Sev3** (something worth knowing about, ticket or Slack message,
no page at all). The mistake teams make early on is routing
everything through one queue at one urgency — once a dashboard from
Lesson 13 starts firing alerts, a flood of Sev3-grade noise at Sev1
urgency teaches the on-call engineer to ignore pages, which is the
exact opposite of what alerting is for.

## Routing by ownership, not by "whoever's on call"

The second failure mode is routing every alert to one generic
on-call rotation regardless of which service actually broke. A
database alert paging a frontend team (or vice versa) wastes the time
of someone who can't act on it and delays the person who actually
can. The fix is **label-based routing**: every alert carries labels
identifying the service, team, and severity, and the alerting tool's
routing rules match on those labels to decide which on-call rotation
gets notified. This is exactly the same instinct as a resource tag in
Chapter 5's cost allocation — a small piece of metadata on the alert
that determines who's responsible for it.

Here's a real Prometheus **Alertmanager** routing tree that does
this:

```yaml
route:
  receiver: default-slack
  group_by: ["alertname", "service"]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - matchers:
        - severity="critical"
          team="payments"
      receiver: payments-oncall-page
      continue: false
    - matchers:
        - severity="critical"
          team="checkout"
      receiver: checkout-oncall-page
    - matchers:
        - severity="warning"
      receiver: default-slack

inhibit_rules:
  - source_matchers: [alertname="ServiceDown"]
    target_matchers: [alertname="HighLatency"]
    equal: ["service"]
```

Read top to bottom: the root `route` is the catch-all, falling back
to a Slack channel. Each nested `routes` entry matches on labels like
`severity` and `team` and sends a critical payments alert to the
payments team's pager, never the checkout team's. The `inhibit_rules`
block is the part worth slowing down on — it suppresses
`HighLatency` alerts for a service that's already firing a
`ServiceDown` alert, because once a service is fully down, a stream
of latency alerts for the same outage adds noise, not information.

## The anti-fatigue mechanics

Three concrete practices, all visible in that config, are what keep
an on-call rotation sustainable instead of exhausting:

- **Deduplication** — the same underlying problem shouldn't generate
  one page per affected instance. `group_by: ["alertname", "service"]`
  collapses many individual firing alerts for the same root cause
  into one notification instead of fifty.
- **Grouping** — `group_wait` and `group_interval` give Alertmanager
  a short window to batch alerts that fire close together into a
  single notification, instead of paging once per alert as each one
  crosses its threshold a few seconds apart.
- **Suppression during known maintenance** — a **silence** is a
  time-bounded rule ("mute everything matching `service="checkout"`
  for the next two hours") created before a planned deploy or
  maintenance window, so expected noise during known work doesn't
  page anyone. This is different from `inhibit_rules`, which suppress
  automatically based on another alert already firing, rather than a
  human-declared window.

## Key terms

| Term | Meaning |
|---|---|
| Severity tier | A classification (Sev1/Sev2/Sev3) that decides urgency of response — page now, page in hours, or just log it |
| Label-based routing | Matching an alert's labels (service, team, severity) against routing rules to reach the team that owns the failing component |
| Deduplication | Collapsing many alerts for the same root cause into one notification instead of one per affected instance |
| Silence | A time-bounded, human-declared rule that suppresses matching alerts during a planned maintenance window |
| Inhibition | Automatically suppressing one alert because another, related alert is already firing |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: what
two separate problems do label-based routing and deduplication each
solve, and how does a silence differ from an inhibit rule?
