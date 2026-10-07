# Script — Alertmanager

## Segment 1 (title)

A query and a dashboard panel are only useful if someone actually looks at them. Alertmanager closes that gap: Prometheus evaluates alerting rules continuously, and when one matches, pushes it to a separate process dedicated entirely to deciding who gets notified, how, and when.

## Segment 2 (code)

An alerting rule lives on the Prometheus server itself — a PromQL condition plus a duration. Here, checkout's error rate has to stay above five percent for five straight minutes before this actually fires. That "for" clause is what keeps one brief blip from paging anyone unnecessarily.

## Segment 3 (screenshot)

Once a rule fires, Prometheus shows it on its own Alerts page first — every firing instance, with its full label set and a silence link right there. Each of those firing alerts, with its labels intact, gets pushed on to Alertmanager next for everything that happens after.

## Segment 4 (steps)

Forwarding every alert straight to a human doesn't scale — one bad deploy could fire the same underlying alert across a dozen checkout pods at once. Alertmanager groups related alerts into a single notification, deduplicates the same alert if multiple Prometheus servers fire it, and routes by label: critical checkout alerts page on-call through PagerDuty, everything else lands in a Slack channel for business hours.

## Segment 5 (steps)

One more tool worth knowing: silences. A silence mutes matching alerts for a set window without touching the underlying rule at all — exactly what Northbridge uses when checkout goes down on purpose for a planned deploy. It expires automatically, so nobody has to remember to turn it back on afterward.

## Segment 6 (outro)

Rule, Alerts page, Alertmanager, silence — that's the full path from a bad metric to a page in someone's pocket. That closes chapter four. Chapter five moves to logging and tracing: structured logs, ELK, Loki, and OpenTelemetry.
