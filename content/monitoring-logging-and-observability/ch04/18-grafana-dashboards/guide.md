# Grafana Dashboards

Prometheus's own expression browser (the screens you've seen in Lessons 15–17) is built for writing and testing one query at a time — it was never meant to be a dashboard you stare at all shift. **Grafana** is the visualization layer most teams put in front of Prometheus: it turns the PromQL you already know into multi-panel dashboards, with history, alerting, and sharing built in.

## What you'll learn

- How to point Grafana at Prometheus as a data source
- How a dashboard panel wraps a PromQL query with visualization settings
- How Northbridge builds a checkout-health dashboard from the metrics instrumented in Lesson 15
- Why Grafana dashboards, not raw PromQL, are what gets reviewed during an incident

## Connecting Grafana to Prometheus

Before building any panel, Grafana needs a **data source** pointing at your Prometheus server's URL:

![A Grafana "Data Sources / Prometheus" settings page: the Settings tab is active, with a Name field set to "Prometheus" and a Default toggle enabled, and under an HTTP section a URL field set to http://localhost:9090 with Access set to "Browser".](/courses/monitoring-logging-and-observability/ch04/18-grafana-dashboards/grafana-datasource-config.png)
*A Prometheus data source needs just a name and the server's URL — Grafana queries that URL's HTTP API whenever a panel runs.*
Source: [Prometheus Documentation — Visualization: Grafana](https://prometheus.io/docs/visualization/grafana/)

Once that data source exists, every panel on every dashboard can query it — the same PromQL from Lesson 16 works here unchanged.

## A dashboard, panel by panel

A Grafana dashboard is a grid of **panels**, and each panel wraps one or more PromQL queries with a chosen visualization (time series graph, single stat, table, heatmap, and more):

![A dark-themed Grafana "Demo Dashboard" with four panels: a top panel titled "Prometheus QPS [rate-5m]" showing a stacked area graph of request rates per endpoint, a second panel "HTTP latency [s]" with two spiking lines, and two bottom panels, "Memory series count" (a slowly declining line) and "Prometheus chunk operations [rate-5m]" (a stacked area graph).](/courses/monitoring-logging-and-observability/ch04/18-grafana-dashboards/grafana-dashboard.png)
*A real multi-panel Grafana dashboard monitoring Prometheus itself — Northbridge's checkout dashboard follows the same layout: request rate, latency, and resource panels stacked together.*
Source: [Prometheus Documentation — Visualization: Grafana](https://prometheus.io/docs/visualization/grafana/)

For Northbridge's checkout service, a practical first dashboard mirrors exactly this shape, using the metrics from Lesson 15 and the queries from Lesson 16:

- **Request rate** — `sum(rate(checkout_requests_total[5m])) by (status)`
- **p95 latency** — `histogram_quantile(0.95, rate(checkout_duration_seconds_bucket[5m]))`
- **Error rate** — `sum(rate(checkout_requests_total{status="failed"}[5m])) / sum(rate(checkout_requests_total[5m]))`
- **Active pods** — `count(up{job="checkout"} == 1)`

Each of those becomes one panel. Stack the request-rate and latency panels at the top — they're the first two numbers anyone checks during an incident — with error rate and pod count beneath.

## Why Grafana, not just the expression browser

Prometheus's own UI is stateless by design: close the tab and your query is gone. Grafana dashboards persist, can be shared by URL with the whole on-call rotation, support variables (switch the dashboard from `checkout` to any other service without editing a query), and — as Lesson 19 covers — can themselves evaluate alert rules. When checkout latency spikes during a flash sale in Chapter 6, the incident starts with someone pulling up this exact dashboard, not typing a fresh PromQL query from scratch.

## Key terms

- **Data source** — the connection Grafana uses to query a backend like Prometheus, configured with a name and URL
- **Panel** — one visualization on a dashboard, wrapping one or more queries
- **Dashboard** — a grid of panels, typically one per service or team
- **Dashboard variable** — a reusable placeholder (like a service name) that lets one dashboard serve many targets
