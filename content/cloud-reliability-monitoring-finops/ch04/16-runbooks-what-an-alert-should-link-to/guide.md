# Lesson 16 — Runbooks: What an Alert Should Link To

**Chapter 4 · Dashboards and Alerts That Matter · Lesson 4 of 4**

## What you'll learn

- Why a page that just says "service is down" wastes the first,
  most valuable minutes of an incident
- What actually belongs in a **runbook**: diagnosis steps, known
  fixes, and an escalation path — not a wall of unstructured prose
- The real convention for attaching a runbook to an alert: a
  `runbook_url` **annotation** on the alert rule itself
- How a runbook differs from a **postmortem**, and why confusing the
  two leaves a team with neither

## The page that doesn't help

Lesson 15 got the right alert to the right team at the right urgency.
That's necessary, but it isn't sufficient — a page that says
`HighErrorRate firing for checkout-api` tells the on-call engineer
*that* something is wrong and almost nothing about *what to do next*.
If this is the fourth time this exact alert has fired this quarter,
someone on the team already knows the likely cause and the fix. The
problem is that knowledge usually lives in one person's memory, or in
a Slack thread from three months ago that nobody can find at 2 a.m.
A **runbook** is how that knowledge gets attached directly to the
alert, so the person responding doesn't have to already know the
history to act on it.

## What a good runbook actually contains

A runbook isn't a general wiki page about the service — it's a
focused, scannable document built to be read in the first two minutes
of an incident, under pressure. The real structure that works:

- **What this alert means** — one or two sentences translating the
  alert name into plain language ("checkout-api is returning 5xx
  responses to more than 5% of requests over the last 5 minutes").
- **First diagnosis steps** — the specific dashboards, queries, or
  commands to check first, in order, not a general "investigate the
  issue." For example: check the Lesson 13-style p99 latency panel
  for this service, check whether a deploy happened in the last 30
  minutes, check the downstream dependency's error rate.
- **Known fixes** — mitigations that have actually resolved this
  alert before: rolling back the most recent deploy, restarting a
  specific stuck pod, failing over to a secondary region, manually
  scaling a resource. If the real fix requires a deeper investigation
  every time, that's worth saying explicitly rather than implying
  there's always a quick fix.
- **Escalation path** — exactly who to contact, and how, if the
  first responder can't resolve it within some bounded time — a
  named secondary on-call, a team lead, or the service's actual owner
  if it's a shared dependency nobody on the paged team controls.

## Attaching the runbook to the alert itself

The best runbook in the world doesn't help if the on-call engineer
has to go hunt for it by alert name during an incident. The real
convention, directly continuing Lesson 15's Alertmanager config, is a
`runbook_url` annotation set on the alert rule, so it travels with
every notification:

```yaml
groups:
  - name: checkout-api-alerts
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{service="checkout-api",status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total{service="checkout-api"}[5m]))
          > 0.05
        for: 5m
        labels:
          severity: critical
          team: checkout
        annotations:
          summary: "checkout-api 5xx rate above 5% for 5 minutes"
          runbook_url: "https://runbooks.internal/checkout-api/high-error-rate"
```

That `runbook_url` value is carried through Alertmanager into
whatever notification channel fires — Slack, PagerDuty, email — so
the link sits right next to the page itself, not in a separate system
the responder has to remember exists.

## Runbook vs. postmortem: not the same document

It's worth being precise about this, because the two get conflated
constantly. A **runbook** is written *before* an incident, as a
prepared how-to-respond for a known failure mode, and it stays mostly
static between incidents except for updates when a new fix is
discovered. A **postmortem** — covered in Chapter 7 — is written
*after* an incident, is specific to that one occurrence, and exists to
analyze what happened and drive follow-up work. A team that only
writes postmortems and never turns a recurring one into a runbook
re-learns the same lesson from scratch every time the alert fires
again; a team that only has runbooks and never writes postmortems
never improves the underlying system, just the response to it.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | A prepared, scannable document linked from an alert: what it means, how to diagnose it, known fixes, and who to escalate to |
| `runbook_url` annotation | The convention of attaching a runbook link directly to an alert rule so it travels with every notification |
| Known fix | A mitigation documented in a runbook because it has actually resolved this specific alert before |
| Escalation path | Who to contact, and how, if the first responder can't resolve the issue within a bounded time |
| Postmortem | A retrospective document written after an incident to analyze root cause and drive follow-up work — not the same as a runbook |

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: what
four things belong in a real runbook, how does a `runbook_url`
annotation get it in front of the right person automatically, and why
is a runbook not the same document as a postmortem?
