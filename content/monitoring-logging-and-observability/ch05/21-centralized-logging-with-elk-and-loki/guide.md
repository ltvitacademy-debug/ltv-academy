# Centralized Logging With ELK & Loki

Structured logs are only useful if you can actually search them, and at Northbridge Retail's scale — dozens of autoscaled pods, each writing its own log file that disappears the moment the pod is rescheduled — there's no realistic way to SSH into every box and grep. **Centralized logging** ships every log line off the originating host into one searchable system, so "find every error from the checkout service in the last ten minutes" is a query, not an expedition. The two dominant open-source stacks for this are **ELK** (Elasticsearch, Logstash, Kibana) and **Grafana Loki** — different philosophies, same job.

## What you'll learn

- The role each piece of the ELK stack plays, end to end
- How Loki's "index the labels, not the text" approach differs from Elasticsearch
- What a log query actually looks like in each system
- When teams reach for ELK vs. Loki in practice

## The ELK stack: index everything

**ELK** is three components working together:

- **Elasticsearch** — a distributed search and analytics engine that indexes the full content of every log line, making every field (and often every word) searchable
- **Logstash** (or its lighter sibling, **Filebeat**) — collects logs from each host, parses and enriches them, and ships them into Elasticsearch
- **Kibana** — the web UI for searching, filtering, and building dashboards over what Elasticsearch has indexed

Kibana's **Discover** view is where most day-to-day log investigation happens: a time-range histogram up top, a KQL (Kibana Query Language) filter bar, and a scrolling list of matching documents below.

![Kibana's Discover view: a KQL filter bar and date-range picker above a histogram of document counts over time, with a scrollable table of matching log documents below — each row showing timestamp and a summary field.](/courses/monitoring-logging-and-observability/ch05/21-centralized-logging-with-elk-and-loki/kibana-discover.png)
*The histogram shows volume over time at a glance — a sudden spike is often the first visual clue something broke.*
Source: [Elastic Documentation — Discover](https://www.elastic.co/docs/explore-analyze/images/kibana-hello-field.png)

A query against an index like Northbridge's checkout logs might look like:

```
level: "error" and service: "checkout" and event: "payment_timeout"
```

Because Elasticsearch indexes full field values (and typically tokenizes text fields), this kind of query stays fast even across weeks of high-volume logs — the cost is that indexing everything is relatively expensive in storage and compute.

## Loki: index the labels, not the text

**Grafana Loki** takes a deliberately different approach, often summarized as "like Prometheus, but for logs." Instead of indexing the full content of every log line, Loki only indexes a small set of **labels** — `service`, `environment`, `pod` — and stores the raw log text in cheap, compressed chunks. You query it with **LogQL**, which looks like PromQL:

```logql
{service="checkout", environment="production"} |= "payment_timeout"
```

That query first narrows down to the `checkout` service's production logs using the indexed labels (fast, cheap), then does a text search (`|= "payment_timeout"`) only within that already-narrow set of log lines. The tradeoff is the mirror image of Elasticsearch's: Loki is dramatically cheaper to run at scale because it isn't building a full-text index of every log line, but a broad, unfiltered text search across many label combinations is slower than the equivalent in Elasticsearch.

LogQL also supports metric-style queries directly over logs — useful for turning "how often does this error appear" into a graph without a separate metrics pipeline:

```logql
sum(rate({service="checkout"} |= "error" [5m]))
```

## Choosing between them

| | ELK (Elasticsearch) | Loki |
|---|---|---|
| Indexes | Full content of every log line | Only a small set of labels |
| Query language | KQL / Lucene query syntax | LogQL (PromQL-like) |
| Storage cost at scale | Higher | Lower |
| Best at | Deep, unstructured text search across huge volumes | Teams already running Prometheus + Grafana, cost-sensitive at scale |
| UI | Kibana | Grafana (Explore view) |

In practice, a lot of teams running Prometheus and Grafana already (Chapter 4) add Loki because it plugs into the same Grafana UI they already live in — metrics and logs side by side without context-switching to a separate tool. Teams with heavier text-search needs, or who need Elasticsearch for other workloads anyway, lean ELK.

## Key terms

- **Centralized logging** — shipping logs from every host into one searchable system instead of leaving them on disk per-machine
- **Elasticsearch** — the distributed, full-text search engine at the core of the ELK stack
- **Logstash / Filebeat** — the collection and shipping layer that gets logs from hosts into Elasticsearch
- **Kibana** — the web UI for searching and visualizing data indexed in Elasticsearch; its log-browsing screen is called Discover
- **Grafana Loki** — a log aggregation system that indexes only labels, not full text, keeping storage costs low
- **LogQL** — Loki's query language, modeled on PromQL, combining label selectors with text filters
