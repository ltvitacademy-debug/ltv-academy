# PromQL Basics

**PromQL** (Prometheus Query Language) is how you turn the raw counters, gauges, and histograms from Lesson 15 into actual answers — "what's our error rate right now," "what's the 95th-percentile checkout latency," "how many pods are running." It's the single skill that makes every dashboard panel and alert rule in this chapter possible.

## What you'll learn

- How to select raw time series with instant and range vector selectors
- Why you apply `rate()` to a counter before doing anything else with it
- How `histogram_quantile()` turns bucketed observations into a latency percentile
- The aggregation operators (`sum`, `avg`, `by`) that roll many time series into one

## Selecting data: instant and range vectors

The simplest PromQL query is just a metric name:

```promql
checkout_requests_total
```

This returns an **instant vector** — the latest value of every time series matching that name, each with its full label set, e.g. `checkout_requests_total{status="success",instance="10.1.4.12:9400"}`. Add a label matcher with curly braces to narrow it down:

```promql
checkout_requests_total{status="failed"}
```

Add a time range in square brackets and you get a **range vector** instead — every sample over that window, not just the latest:

```promql
checkout_requests_total{status="failed"}[5m]
```

A range vector on its own isn't graphable — it's raw material for a function like `rate()`.

## rate(): the first function you'll actually use

Because a counter only ever climbs (Lesson 15), its raw value is nearly meaningless. `rate()` calculates the per-second average rate of increase over a range vector, which is what you actually want to see or alert on:

```promql
rate(checkout_requests_total{status="failed"}[5m])
```

![A real Prometheus expression browser running the query rate(go_gc_duration_seconds_count[5m]), showing two colored line graphs oscillating between roughly 0.01 and 0.03, with a legend listing the two label sets below the graph.](/courses/monitoring-logging-and-observability/ch04/16-promql-basics/rate-example.png)
*rate() turns a climbing counter into a smooth per-second rate — this is what you'd graph or alert on, never the raw counter.*
Source: [Prometheus Documentation — Query Examples](https://prometheus.io/docs/prometheus/latest/querying/examples/)

`irate()` is a close cousin: instead of averaging over the whole window, it uses only the last two data points, making it more responsive to sudden spikes but noisier — a reasonable choice for a live dashboard panel, a poor choice for an alert threshold, which should favor `rate()`'s smoothing.

## histogram_quantile(): turning buckets into a percentile

Recall from Lesson 15 that a histogram counts observations into buckets. `histogram_quantile()` estimates a percentile from those bucket counts — commonly used for latency:

```promql
histogram_quantile(0.95, rate(checkout_duration_seconds_bucket[5m]))
```

![A real Prometheus expression browser running the query histogram_quantile(0.9, prometheus_http_request_duration_seconds_bucket{handler="/graph"}), with a single flat red line around 0.09 plotted on the graph and the exact query visible in the input box.](/courses/monitoring-logging-and-observability/ch04/16-promql-basics/histogram-quantile-example.png)
*The 90th-percentile duration for one HTTP handler — the same pattern Northbridge uses to track checkout latency.*
Source: [Prometheus Documentation — Query Examples](https://prometheus.io/docs/prometheus/latest/querying/examples/)

That query reads as: "the duration under which 95% of checkout requests completed, over the last 5 minutes." This is exactly the query Northbridge's on-call engineer runs first when checkout latency alerts fire in Chapter 6 — it immediately shows whether the whole service slowed down or just a tail of outliers.

## Aggregation: rolling many series into one

A query like `rate(checkout_requests_total[5m])` returns one line per pod, per status — useful for debugging a single instance, noisy for a dashboard. Aggregation operators collapse that down:

```promql
sum(rate(checkout_requests_total{status="failed"}[5m])) by (status)
```

`sum by (status)` adds up every matching series but keeps them grouped by the `status` label, so you still see success vs. failed separately — just not split further by pod. Other common aggregators include `avg`, `max`, `min`, and `count`.

## Key terms

- **Instant vector** — the latest value of every matching time series
- **Range vector** — every sample over a given time window, written with `[5m]`-style duration syntax
- **`rate()`** — the per-second average rate of increase of a counter over a range vector
- **`irate()`** — like `rate()` but uses only the last two points; more responsive, noisier
- **`histogram_quantile()`** — estimates a percentile from a histogram metric's bucket counts
- **Aggregation operators** — `sum`, `avg`, `max`, `min`, `count`, optionally grouped `by (label)`, to roll many series into fewer
