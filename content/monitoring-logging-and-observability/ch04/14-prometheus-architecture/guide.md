# Prometheus Architecture

Chapter 4 moves from cloud-native dashboards to the open-source stack most engineering teams actually run day to day: **Prometheus** for metrics collection and storage, and **Grafana** for visualization. Before you write a single query, you need the mental model of how Prometheus actually works — because it's built differently than Azure Monitor or CloudWatch, and that difference shapes everything else in this chapter.

Northbridge Retail runs Prometheus against its checkout service on Kubernetes. When checkout latency spikes during a flash sale later in this chapter, the pieces you learn here — the server, the TSDB, exporters, and Alertmanager — are exactly what Northbridge's on-call engineer reaches for.

## What you'll learn

- Why Prometheus **pulls** metrics instead of having applications push them
- The four core pieces: the Prometheus server, its time-series database (TSDB), exporters, and Alertmanager
- How service discovery finds scrape targets automatically in a dynamic environment like Kubernetes
- Where the Pushgateway fits in — and why it's the exception, not the rule

## The pull model

Most of the monitoring tools earlier in this course — Azure Monitor, CloudWatch — are push-based: your application or agent sends metrics out to the platform. Prometheus flips that around. The Prometheus server **scrapes** (pulls) metrics from your applications on a schedule, typically every 15–30 seconds, by making an HTTP GET request to a `/metrics` endpoint that each application exposes.

![A simple architecture diagram: a box labeled "Instrumented Application or Exporter" connected by a "Scrape metrics" arrow to a box labeled "Prometheus Server" containing "TSDB (Time Series Database)", which is connected by a "Push Alerts" arrow to a box labeled "Alert Manager".](/courses/monitoring-logging-and-observability/ch04/14-prometheus-architecture/architecture.png)
*The core loop: Prometheus pulls metrics from instrumented applications and exporters, stores them in its own time-series database, and pushes firing alerts to Alertmanager.*
Source: [Prometheus Documentation — Getting Started](https://prometheus.io/docs/prometheus/latest/getting_started/)

The pull model has a practical payoff for Northbridge: Prometheus itself can tell you when a target stops responding, because a scrape simply fails. With a push model, a silent application just... goes quiet, and you have to notice the absence of data instead of getting an explicit "this target is down" signal.

## The four pieces

- **Prometheus server** — scrapes and stores time-series data, runs your alerting rules, and evaluates PromQL queries. This is the piece most people mean when they say "Prometheus."
- **TSDB (time-series database)** — Prometheus's built-in, purpose-built storage engine. Every metric is stored as a stream of timestamped values, indexed by its name and **labels** (key-value pairs like `job="checkout"` or `instance="10.1.2.3:9090"`).
- **Exporters** — small HTTP servers that expose metrics in Prometheus's text format for things that can't be instrumented directly, like a database, an operating system, or a load balancer. Lesson 17 covers these in depth.
- **Alertmanager** — a separate process that receives firing alerts from the Prometheus server and handles grouping, deduplication, silencing, and routing those alerts to email, Slack, PagerDuty, and similar destinations. Lesson 19 is dedicated to it.

## Finding targets: service discovery

Hard-coding a list of IP addresses to scrape doesn't work once you're on Kubernetes — pods get rescheduled, IPs change, and new replicas of Northbridge's checkout service come and go constantly during a flash sale's autoscaling. Prometheus solves this with **service discovery (SD)**: instead of a static list, you point it at Kubernetes' API (or Consul, EC2, Azure, and others), and Prometheus continuously asks "what should I be scraping right now?"

Each discovered target carries a set of labels, and **relabeling** rules let you keep, drop, or rewrite those labels before Prometheus scrapes the target — for example, scraping only pods with a specific annotation, or turning a Kubernetes namespace into a `namespace` label on every metric from that pod.

## The exception: Pushgateway

The pull model breaks down for short-lived jobs — a nightly batch process that runs for 90 seconds and exits before Prometheus's next scheduled scrape would ever catch it. For that narrow case, Prometheus offers the **Pushgateway**: the batch job pushes its final metric values to the Pushgateway once, and the Pushgateway holds them until Prometheus scrapes *it* on its normal schedule. It's a deliberate exception — for anything long-running, like Northbridge's checkout service, you always instrument it for Prometheus to pull directly.

## Key terms

- **Pull model** — Prometheus scrapes (HTTP GETs) a `/metrics` endpoint on a schedule, rather than receiving pushed data
- **TSDB** — Prometheus's built-in time-series database, indexing data by metric name and labels
- **Exporter** — an HTTP server that translates a system's native metrics into Prometheus's text format
- **Service discovery (SD)** — automatically finding scrape targets from a source like the Kubernetes API, instead of a static list
- **Relabeling** — rules that keep, drop, or rewrite a discovered target's labels before scraping
- **Alertmanager** — the separate process that groups, deduplicates, silences, and routes firing alerts
- **Pushgateway** — a gateway that lets short-lived batch jobs push final metric values for Prometheus to scrape later
