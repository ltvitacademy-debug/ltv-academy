# Script — Alerting on AI Failures

## Segment 1 (title)

Logs, cost and latency dashboards, drift reports, hallucination scores — every one of those is pull-based. Someone has to open it and look. Alerting is what makes it push-based: the system notices and tells a person, instead of waiting for someone to notice.

## Segment 2 (screenshot: create alert)

An alert needs to be specific to actually work: a name, a metric — cost, error rate, token count — a numeric threshold that means something's actually wrong, and a time window that threshold applies over.

## Segment 3 (screenshot: slack notification)

A rule that fires into a void is no better than no rule. A real system routes it somewhere a human will see it, with enough detail to act without digging first — the exact metric, the threshold, which model violated it, a direct link back to the dashboard.

## Segment 4 (screenshot: alerts dashboard)

Once several alerts exist, the alerts list becomes its own thing worth watching — which ones are currently triggered, which are healthy, what each one is actually configured to check.

## Segment 5 (steps: alert fatigue)

It's tempting to alert on everything once the capability exists. But when every minor fluctuation triggers a notification, the team stops reading them — and the one alert that actually matters gets lost in the noise along with the rest.

## Segment 6 (outro)

Chapter 3 built the full observability picture — logs, cost, drift, hallucinations, alerts. Chapter 4 turns to governance — bias, privacy, and compliance.
