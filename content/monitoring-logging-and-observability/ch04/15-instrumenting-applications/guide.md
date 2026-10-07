# Instrumenting Applications

Prometheus can't scrape metrics that don't exist. Before a single dashboard or alert is possible, someone has to add a few lines of code to the application itself — a **client library** call that exposes a `/metrics` endpoint. This lesson covers the four metric types Prometheus's client libraries give you, and how Northbridge's engineers actually instrument the checkout service with them.

## What you'll learn

- The four Prometheus metric types: counter, gauge, histogram, and summary
- What a raw counter and a raw gauge actually look like on a graph, from real Prometheus screenshots
- How to add a counter to a Python Flask endpoint with the `prometheus_client` library
- Naming and labeling conventions that keep your metrics usable instead of a mess

## Counters: only ever go up

A **counter** is a cumulative value that only increases (or resets to zero on a restart) — total requests served, total errors, total bytes sent. You never decrement a counter. On its own, a counter's raw value isn't very useful ("12,402,118 requests since the process started" tells you nothing about *right now*); it becomes useful once you apply `rate()` to it, which Lesson 16 covers.

![A Prometheus expression browser graph of a raw counter metric (go_gc_duration_seconds_count): two series that only ever step upward over time, never decreasing, shown against a 50-minute time window.](/courses/monitoring-logging-and-observability/ch04/15-instrumenting-applications/counter-example.png)
*A raw counter's graph is a staircase that only climbs — this is exactly why you almost never graph a counter directly.*
Source: [Prometheus Documentation — Querying Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)

## Gauges: goes up and down

A **gauge** is a value that can go up or down — current memory usage, number of items in a queue, number of active checkout sessions. Unlike a counter, you graph a gauge's raw value directly; the shape of the line is the information.

![A Prometheus expression browser graph of a raw gauge metric (go_memstats_heap_alloc_bytes): two series that rise and fall repeatedly over an eleven-minute window.](/courses/monitoring-logging-and-observability/ch04/15-instrumenting-applications/gauge-example.png)
*A gauge's graph rises and falls — this is memory allocation, but Northbridge's "active checkout sessions" gauge would look just like this during a flash sale.*
Source: [Prometheus Documentation — Querying Basics](https://prometheus.io/docs/prometheus/latest/querying/basics/)

## Histograms and summaries: distributions

A **histogram** samples observations (most often request durations or response sizes) and counts them into configurable buckets — "how many requests finished in under 0.1s, under 0.5s, under 1s." This is what powers latency percentiles in Lesson 16's `histogram_quantile()` queries, which is exactly how Northbridge will diagnose the checkout-latency spike in Chapter 6. A **summary** is similar but calculates percentiles client-side instead of in buckets — cheaper to query, but you can't aggregate a summary's percentiles across multiple instances the way you can a histogram's.

## Instrumenting a checkout endpoint

Here's a minimal example of Northbridge adding a counter and a histogram to a Python Flask checkout endpoint using the official `prometheus_client` library:

```python
from prometheus_client import Counter, Histogram, start_http_server
from flask import Flask

app = Flask(__name__)

CHECKOUT_REQUESTS = Counter(
    "checkout_requests_total",
    "Total checkout requests",
    ["status"]
)
CHECKOUT_DURATION = Histogram(
    "checkout_duration_seconds",
    "Checkout request duration",
    buckets=[0.1, 0.25, 0.5, 1, 2, 5]
)

@app.route("/checkout", methods=["POST"])
@CHECKOUT_DURATION.time()
def checkout():
    result = process_checkout()
    CHECKOUT_REQUESTS.labels(status=result.status).inc()
    return result.response

start_http_server(9400)  # exposes /metrics on :9400
```

Every checkout request now increments `checkout_requests_total{status="success"}` or `{status="failed"}`, and every request's duration lands in a bucket on `checkout_duration_seconds`. Prometheus scrapes port 9400 and both metrics become queryable immediately — no restart of Prometheus required.

## Naming and labeling conventions

- Use a **base unit suffix**: `_seconds`, `_bytes`, `_total` (for counters) — never mix units within one metric name
- Keep **label cardinality bounded** — a label like `status` (a handful of values) is fine; a label like `user_id` (millions of values) will overwhelm the TSDB
- Prefix metrics with your application or domain where it helps avoid collisions, e.g. `checkout_requests_total` rather than a bare `requests_total`

## Key terms

- **Client library** — a language-specific package (Python, Go, Java, etc.) that exposes your application's metrics on a `/metrics` HTTP endpoint
- **Counter** — a cumulative metric that only increases; always paired with `rate()` when queried
- **Gauge** — a metric that can go up or down; graphed directly
- **Histogram** — samples observations into configurable buckets, enabling percentile calculations server-side
- **Summary** — similar to a histogram but calculates percentiles client-side; not aggregatable across instances
- **Label cardinality** — the number of distinct label-value combinations a metric can produce; keeping it bounded protects the TSDB
