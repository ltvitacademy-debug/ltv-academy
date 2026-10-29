# Lesson 13 — Designing a Dashboard Around a Real Incident, Not a Vanity Metric

**Chapter 4 · Dashboards and Alerts That Matter · Lesson 1 of 4**

## What you'll learn

- Why "uptime %" and raw request count are **vanity metrics** — they
  almost always look fine, right up until the moment they don't help
  you at all
- The **four golden signals** (latency, traffic, errors, saturation)
  and the **RED** and **USE** methods as the real, well-established
  starting points for a dashboard panel list
- How to design a dashboard backward from an actual past incident
  instead of forward from "what data do we happen to have"
- A concrete worked example: a p99 latency spike that a dashboard
  built only around averages completely missed

## The vanity-metric trap

Every team that's ever stood up a monitoring tool has, at some point,
built a dashboard with a big green "Uptime: 99.98%" tile at the top.
It feels reassuring, and it is almost always useless during an actual
incident, for a simple reason: uptime as "the process is running and
answering health checks" and uptime as "the thing users actually
experience" are not the same number. A service can be "up" by every
health-check definition while every real request to it times out
because a downstream dependency is saturated. Raw request count has
the same problem in the other direction — a traffic graph that's
flat and healthy-looking tells you nothing about whether those
requests are succeeding, how long they're taking, or whether they're
concentrated on one failing backend behind a load balancer.

These aren't bad numbers to track. They're bad numbers to lead with,
because they answer "is something happening" instead of "is a user
being hurt right now, and by what." A dashboard built mostly out of
metrics like these is optimized for looking calm in a status meeting,
not for being useful at 2 a.m. when something is actually on fire.

## Start from the signals that correlate with user pain

Google's SRE book names four signals worth building almost every
service dashboard around, usually called the **golden signals**:

- **Latency** — how long requests take, specifically at the tail
  (p95/p99), not just the average
- **Traffic** — how much demand the service is under, broken down
  by endpoint or operation, not one flat total
- **Errors** — the rate of requests failing, by error type/status
  code, not just a global error count
- **Saturation** — how full the service's limiting resource is
  (CPU, memory, connection pool, queue depth, thread pool)

Two shorthand methods built on the same idea show up constantly in
real monitoring setups. The **RED method** (Rate, Errors, Duration)
is the request-centric version — built for anything that serves
requests, like an API or a web service. The **USE method**
(Utilization, Saturation, Errors) is the resource-centric version —
built for infrastructure like a database, a message queue, or a VM.
Neither is exotic tooling; they're just a disciplined checklist for
what to put on a panel before you reach for whatever metric happens
to already exist.

## Design backward from a real incident

The most reliable way to find out whether a dashboard is actually
useful is to take a real incident your team already lived through and
ask: would this dashboard have shown us the problem, and how fast?

Here's a realistic example. A checkout API's dashboard showed average
response time, and average response time looked completely normal
during an incident where a subset of users couldn't check out at all.
What was actually happening: one backend instance behind the load
balancer had a slow disk and was serving every third request in 8
seconds instead of 80 milliseconds. Averaged across all instances,
that barely moved the mean — a few slow requests get diluted by many
fast ones. The p99 latency line, though, would have jumped
immediately, because the 99th percentile is exactly the metric that
exposes a problem affecting a minority of requests badly rather than
all requests slightly.

That's the concrete lesson: **percentiles, not averages, for
latency**, and panels broken down by dimension (per endpoint, per
backend instance, per region) instead of one aggregated line, because
an aggregate is precisely what hides a localized failure.

## A PromQL example of the right shape

This is the kind of query that belongs on a dashboard built around
the golden signals rather than a vanity metric — p99 latency per
endpoint, so a localized problem is visible instead of averaged away:

```
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route)
)
```

Next lesson builds dashboards like this one for real, in Grafana, on
top of both Azure Monitor and CloudWatch data.

## Key terms

| Term | Meaning |
|---|---|
| Vanity metric | A metric that looks reassuring (uptime %, raw request count) but doesn't correlate with whether users are currently being hurt |
| Golden signals | Latency, traffic, errors, saturation — Google SRE's four starting signals for any service dashboard |
| RED method | Rate, Errors, Duration — the request-centric version of the golden signals, for APIs and web services |
| USE method | Utilization, Saturation, Errors — the resource-centric version, for infrastructure like databases and queues |
| p99 latency | The response time below which 99% of requests complete; exposes tail problems an average hides |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
can a dashboard built around average latency and total uptime look
completely healthy during a real incident, and what two changes (which
metric, and which breakdown) would have caught it?
