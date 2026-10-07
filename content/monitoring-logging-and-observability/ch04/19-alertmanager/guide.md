# Alertmanager

A PromQL query and a Grafana panel are only useful if someone looks at them. **Alertmanager** is the piece that closes that gap: the Prometheus server evaluates alerting rules continuously and, when one matches, pushes it to Alertmanager — a separate process dedicated entirely to deciding who gets notified, how, and when.

## What you'll learn

- How an alerting rule in Prometheus differs from a recording rule
- What the Prometheus Alerts page shows you before Alertmanager ever gets involved
- How Alertmanager groups, deduplicates, and routes alerts instead of just forwarding every one individually
- What a silence is, and why it matters during planned maintenance

## Writing an alerting rule

An alerting rule lives in the Prometheus server's configuration, not in Alertmanager. It's a PromQL expression plus a condition:

```yaml
groups:
  - name: checkout-alerts
    rules:
      - alert: CheckoutHighErrorRate
        expr: |
          sum(rate(checkout_requests_total{status="failed"}[5m]))
          / sum(rate(checkout_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
          team: checkout
        annotations:
          summary: "Checkout error rate above 5%"
          description: "{{ $value | humanizePercentage }} of checkout requests are failing"
```

`for: 5m` matters: the condition has to stay true for five straight minutes before the alert actually fires, which keeps a brief blip from paging anyone. Once it does fire, Prometheus shows it on its own Alerts page:

![A Prometheus "Alerts" page listing several alert rules as colored bars: "BadUplinkOnAccessSwitch (4 active)" and "DhcpScopeAlmostFull (1 active)" shown in red/pink with a table of each firing instance's labels, state, and a Silence link; several other rules below shown in green with "(0 active)".](/courses/monitoring-logging-and-observability/ch04/19-alertmanager/prometheus-alerts-page.png)
*Prometheus's own Alerts page lists every rule and, for firing ones, every instance currently matching — each with its labels and a Silence link. From here, each firing alert is pushed on to Alertmanager.*
Source: [Prometheus Blog](https://prometheus.io/blog/)

Notice each firing alert carries its own label set — exactly like a metric does — which is what Alertmanager uses next to decide how to handle it.

## What Alertmanager adds

Forwarding every firing alert straight to a human would be unusable: a single bad deploy to Northbridge's checkout service could fire the same underlying alert across a dozen pods simultaneously. Alertmanager sits between Prometheus and your notification channels and handles three things the Prometheus server itself doesn't:

- **Grouping** — bundles alerts with similar labels (e.g. all `CheckoutHighErrorRate` alerts for `team: checkout`) into a single notification instead of a dozen separate pages
- **Deduplication** — if multiple Prometheus servers (common in a highly-available setup) fire the same alert, Alertmanager sends one notification, not several
- **Routing** — sends different alerts to different destinations based on their labels, using a tree of routes

A minimal Alertmanager routing config for Northbridge:

```yaml
route:
  receiver: default-slack
  group_by: [alertname, team]
  routes:
    - match:
        team: checkout
        severity: critical
      receiver: checkout-pagerduty

receivers:
  - name: default-slack
    slack_configs:
      - channel: "#alerts"
  - name: checkout-pagerduty
    pagerduty_configs:
      - service_key: "<key>"
```

Critical checkout alerts page the on-call engineer through PagerDuty; everything else lands in a Slack channel for the next person to triage during business hours.

## Silences: planned, temporary suppression

A **silence** mutes matching alerts for a set window of time without changing the underlying alert rule — the standard move when Northbridge takes checkout down intentionally for a deploy, so the on-call engineer isn't paged for a condition they already know about and caused on purpose. Silences expire automatically, which is the whole point: nobody has to remember to turn the alert back on.

## Key terms

- **Alerting rule** — a PromQL condition plus a `for` duration, defined on the Prometheus server, that creates a firing alert when true
- **Alertmanager** — the separate process that groups, deduplicates, routes, and silences alerts before they reach a human
- **Grouping** — bundling related alerts (matching labels) into one notification
- **Deduplication** — collapsing the same alert fired by multiple Prometheus servers into a single notification
- **Route** — a rule in Alertmanager's config that sends matching alerts to a specific receiver based on their labels
- **Silence** — a temporary, time-bounded suppression of matching alerts, typically used during planned maintenance
