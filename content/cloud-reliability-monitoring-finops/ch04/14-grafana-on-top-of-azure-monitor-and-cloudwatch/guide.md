# Lesson 14 — Grafana on Top of Azure Monitor and CloudWatch

**Chapter 4 · Dashboards and Alerts That Matter · Lesson 2 of 4**

## What you'll learn

- Why teams running both Azure and AWS add **Grafana** as a
  visualization layer instead of living in two separate native
  consoles
- What a Grafana **data source** actually is, and how the built-in
  Azure Monitor and CloudWatch data source plugins each talk to their
  cloud's real metrics API
- How one dashboard's JSON model can mix panels from both data
  sources side by side
- How data sources get **provisioned** from a config file instead of
  clicked together by hand, so a dashboard setup is reproducible

## Why Grafana sits on top, not instead of

Chapters 2 and 3 covered Azure Monitor and CloudWatch in real depth —
their metrics, their log query languages, their own native dashboard
features (Azure Monitor Workbooks, CloudWatch Dashboards). Those
native tools are real and useful, and nothing here replaces them. The
problem they share is that each one only shows its own cloud. A team
running production workloads in both Azure and AWS — the exact
situation Chapters 2-3 assumed — ends up needing two separate
browser tabs, two separate query languages, and two separate places
to look during an incident that might involve either cloud, or both.

**Grafana** solves that by being cloud-agnostic at its core, the same
way Terraform's core doesn't know what Azure is — Grafana's engine
only knows how to render panels and dashboards from data a **data
source** plugin hands it. The data source is where the cloud-specific
logic lives, and Grafana ships official ones for both platforms: the
**Azure Monitor** data source and the **CloudWatch** data source.
Install both, and a single dashboard can show an Azure Monitor metric
panel next to a CloudWatch Logs Insights panel, both rendered by the
same engine, in the same browser tab.

## Data sources: one config, reused by every dashboard

A data source is configured once — connection details, credentials,
default region or subscription — and then every panel in every
dashboard that wants that cloud's data just references it. For
reproducible setups, Grafana supports **provisioning** data sources
from a YAML file instead of clicking through the UI:

```yaml
apiVersion: 1
datasources:
  - name: Azure Monitor - Prod
    type: grafana-azure-monitor-datasource
    jsonData:
      azureAuthType: msi
      subscriptionId: "00000000-0000-0000-0000-000000000000"
    isDefault: false

  - name: CloudWatch - Prod
    type: cloudwatch
    jsonData:
      authType: default
      defaultRegion: us-east-1
    isDefault: false
```

Drop that file in Grafana's `provisioning/datasources/` directory and
both data sources exist the moment the Grafana instance starts —
nobody has to remember to click "Add data source" on a freshly
rebuilt server, and the configuration itself can live in source
control next to the dashboards that use it.

## One dashboard, two clouds, side by side

Once both data sources exist, a dashboard's panels simply point at
whichever one they need. Here's a trimmed real panel array from a
dashboard JSON model — one panel pulling a CloudWatch metric, one
pulling an Azure Monitor metric, laid out next to each other:

```json
{
  "panels": [
    {
      "title": "AWS — ALB Target 5xx Rate",
      "type": "timeseries",
      "datasource": { "type": "cloudwatch", "uid": "cw-prod" },
      "targets": [
        {
          "namespace": "AWS/ApplicationELB",
          "metricName": "HTTPCode_Target_5XX_Count",
          "statistic": "Sum",
          "region": "us-east-1"
        }
      ]
    },
    {
      "title": "Azure — App Service Response Time",
      "type": "timeseries",
      "datasource": { "type": "grafana-azure-monitor-datasource", "uid": "az-prod" },
      "targets": [
        {
          "resourceUri": "/subscriptions/.../providers/Microsoft.Web/sites/checkout-api",
          "metricNamespace": "Microsoft.Web/sites",
          "metricName": "ResponseTime",
          "aggregation": "Average"
        }
      ]
    }
  ]
}
```

Each panel's `datasource` field is the whole trick — it's what tells
Grafana's generic rendering engine which plugin to ask for data, the
same role a provider's `source` field plays in a Terraform
`required_providers` block. The engine itself never needs to know
AWS or Azure exist; it just draws whatever time series each data
source plugin hands back.

## Variables make one dashboard cover many environments

Grafana **template variables** (written `$region`, `$environment`,
and so on) let one dashboard definition serve dev, staging, and prod,
or multiple AWS regions, without duplicating panels — a query like
`defaultRegion: $region` is re-evaluated every time the dropdown at
the top of the dashboard changes, the same reuse instinct Lesson 13
of the Terraform course applied to modules instead of dashboards.

## Key terms

| Term | Meaning |
|---|---|
| Data source | A Grafana plugin that knows how to query one specific system's real API (Azure Monitor, CloudWatch, Prometheus, etc.) |
| Provisioning | Defining data sources (or dashboards) in a config file that loads automatically on startup, instead of clicking them together by hand |
| Panel | One visualization inside a dashboard; its `datasource` field decides which plugin supplies its data |
| Template variable | A dashboard-level variable (e.g. `$region`) that lets one dashboard definition serve many environments |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: what
problem does a Grafana data source actually solve, and how can a
single dashboard show an Azure Monitor panel and a CloudWatch panel
next to each other without Grafana's core engine knowing anything
about either cloud?
