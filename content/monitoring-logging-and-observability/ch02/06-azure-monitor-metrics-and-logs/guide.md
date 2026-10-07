# Azure Monitor Metrics & Logs

Azure Monitor is the umbrella platform behind everything Azure collects about your resources — it is not one tool but the pipeline that every metric, log, and trace in Azure eventually flows through. Before you can use Log Analytics, Application Insights, or Azure alerts, you need to understand the two very different kinds of data Azure Monitor collects and why it keeps them in separate stores.

## What you'll learn

- The difference between Azure Monitor **Metrics** and Azure Monitor **Logs**, and why the platform keeps them separate
- How to chart a platform metric in Metrics Explorer, Azure's built-in charting tool
- Where custom metrics and multi-resource/multi-dimension charts fit in
- How Northbridge Retail would wire up its checkout service's first metrics

## Two stores, two jobs

Every Azure resource emits **platform metrics** automatically, with no configuration: CPU percentage, request count, response time, queue length. These are lightweight numerical time series, collected at a fixed interval (often one minute), stored in a time-series database optimized for fast charting and near-real-time alerting. If Northbridge's checkout service runs on Azure App Service, it's already emitting `CpuPercentage`, `HttpQueueLength`, and `AverageResponseTime` before anyone writes a line of monitoring code.

**Logs** are different: structured or free-text records — a line in a web server log, an exception with its full stack trace, a custom event your application emits — stored in a Log Analytics workspace and queried with Kusto Query Language (KQL), the subject of the next lesson. Logs carry far more detail than metrics but cost more to store and take longer to query.

## Metrics Explorer: charting a platform metric

Metrics Explorer is the Azure portal's built-in charting tool for metrics. You pick a resource (or several), pick a metric, pick an aggregation (Average, Max, Count, Sum), and Azure draws the time series:

![Metrics explorer showing a line chart of a resource's metric values over time in the Azure portal, with the resource scope, metric, and aggregation selectors above the chart.](/courses/monitoring-logging-and-observability/ch02/06-azure-monitor-metrics-and-logs/metrics-explorer.png)
*Metrics Explorer: pick a resource, pick a metric, pick an aggregation — no query language required.*
Source: [Analyze metrics with Azure Monitor metrics explorer — Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/analyze-metrics)

This is the fastest way to answer "what did CPU do during the flash sale?" — no KQL needed. You can plot multiple metrics on one chart to compare them directly, which is exactly how Northbridge would correlate `AverageResponseTime` against `Requests` while chasing a latency spike:

![Metrics explorer chart with two metrics plotted on the same chart, each on its own color-coded line, with a legend below the chart.](/courses/monitoring-logging-and-observability/ch02/06-azure-monitor-metrics-and-logs/multiple-metrics-chart.png)
*Plotting response time next to request count on the same chart makes it obvious whether latency is tracking load.*
Source: [Analyze metrics with Azure Monitor metrics explorer — Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/analyze-metrics)

## Custom metrics and dimensions

Platform metrics only get you so far — they don't know about your checkout service's business logic. Azure Monitor also accepts **custom metrics** that your application emits (for example, `CartAbandonmentCount` or `PaymentGatewayLatency`), and many platform metrics support **dimensions** — extra properties you can split a chart by, like splitting `Requests` by HTTP status code to isolate the share that are 5xx errors during the flash sale.

## Why the split matters for your toolkit

Metrics answer "how much, how fast, right now" cheaply and in near real time — that's what you wire alerts to. Logs answer "exactly what happened, in detail, to this one request" — that's what you query after an alert fires to find the cause. Azure Monitor keeps both in the same platform specifically so you can pivot from a metric spike straight into the logs behind it, which is exactly the workflow Application Insights builds on in Lesson 8.

## Key terms

- **Azure Monitor** — the umbrella platform collecting metrics, logs, and traces across Azure
- **Platform metric** — a numerical time series collected automatically from a resource, no setup required
- **Metrics Explorer** — the Azure portal's charting tool for metrics, no query language needed
- **Log Analytics workspace** — the store for Azure Monitor Logs, queried with KQL
- **Custom metric** — an application-emitted metric beyond what the platform collects automatically
- **Dimension** — a property you can split a metric chart by (e.g., status code, region)
