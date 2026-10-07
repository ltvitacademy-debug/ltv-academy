# Adding Monitoring & Alerting

Phase 3 finished with a pipeline that gets a commit all the way to production automatically. Phase 4 asks the question that matters the moment that pipeline works: once code is running in prod, how does anyone at Northbridge Retail actually know whether it's healthy? This lesson installs a real monitoring stack across both AKS clusters, builds a Grafana dashboard per service using the RED method, and gives `checkout` — the service that takes the brunt of flash-sale traffic — a formal service level objective instead of a gut feeling.

## What you'll learn

- How to install `kube-prometheus-stack` via Helm into `northbridge-aks-dev` and `northbridge-aks-prod`
- How Prometheus discovers `product-catalog` and `checkout` automatically via `ServiceMonitor` resources
- How to build a RED-method dashboard (rate, errors, duration) per service in Grafana
- How to define and alert on the checkout SLO: 99.5% of requests under 800ms p99, against a 30-day error budget
- How Alertmanager routes paging alerts to the shared on-call channel

## Installing kube-prometheus-stack

Northbridge installs the `kube-prometheus-stack` Helm chart twice — once per cluster, not once per namespace — because `northbridge-aks-dev` and `northbridge-aks-prod` are physically separate clusters:

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# northbridge-aks-dev hosts both northbridge-dev and northbridge-staging
helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace \
  --kube-context northbridge-aks-dev \
  -f infra/monitoring/values-dev.yaml

# northbridge-aks-prod is isolated and hosts only northbridge-prod
helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace \
  --kube-context northbridge-aks-prod \
  -f infra/monitoring/values-prod.yaml
```

One chart install brings Prometheus, Grafana, and Alertmanager together, plus the `ServiceMonitor` and `PrometheusRule` CRDs. `product-catalog` and `checkout` already expose a `/metrics` endpoint (both frameworks ship Prometheus client libraries), so a small `ServiceMonitor` per service is all Prometheus needs to start scraping:

```yaml
# charts/checkout/templates/servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: checkout
  namespace: northbridge-prod
  labels:
    release: kube-prometheus-stack
spec:
  selector:
    matchLabels:
      app: checkout
  endpoints:
    - port: http
      path: /metrics
      interval: 15s
```

## RED-method dashboards

Every service dashboard follows the same three panels — **R**ate, **E**rrors, **D**uration — so an on-call engineer can read any Northbridge service the same way at 2 a.m.:

```
# Request rate (checkout, requests/sec)
sum(rate(http_requests_total{service="checkout"}[5m]))

# Error rate (ratio of 5xx to total)
sum(rate(http_requests_total{service="checkout",status=~"5.."}[5m]))
  /
sum(rate(http_requests_total{service="checkout"}[5m]))

# p99 duration
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket{service="checkout"}[5m])) by (le)
)
```

The exact same three queries, with `service="product-catalog"` substituted in, produce that service's dashboard. Both dashboard JSON files are checked into `infra/monitoring/dashboards/` and provisioned into Grafana automatically via a `ConfigMap` the chart picks up — nobody clicks through the Grafana UI to rebuild a dashboard after a cluster rebuild.

## Defining the checkout SLO

`checkout` carries Northbridge's spikiest traffic, so it gets a formal SLO: **99.5% of requests under 800ms p99, measured against a rolling 30-day error budget**. That turns a vague "checkout feels slow" into a number Prometheus can alert on:

```yaml
# infra/monitoring/checkout-slo-rules.yaml
groups:
  - name: checkout-slo
    rules:
      - record: checkout:latency_slo:ratio_rate5m
        expr: |
          sum(rate(http_request_duration_seconds_bucket{service="checkout",le="0.8"}[5m]))
          /
          sum(rate(http_request_duration_seconds_count{service="checkout"}[5m]))
      - alert: CheckoutSLOBurnRateFast
        expr: checkout:latency_slo:ratio_rate5m < 0.995
        for: 10m
        labels:
          severity: page
        annotations:
          summary: "checkout p99 latency SLO burning fast — budget at risk"
```

## Alertmanager routing

Any alert labeled `severity: page` — including `CheckoutSLOBurnRateFast` — routes to the shared Northbridge on-call channel instead of sitting unread in a dashboard tab:

```yaml
# infra/monitoring/alertmanager-config.yaml
route:
  receiver: northbridge-on-call
  group_by: ["alertname", "service"]
  routes:
    - match:
        severity: page
      receiver: northbridge-on-call
      repeat_interval: 15m
receivers:
  - name: northbridge-on-call
    slack_configs:
      - channel: "#northbridge-on-call"
        send_resolved: true
```

With this in place, Northbridge can finally see `checkout` the way a customer experiences it — and the next lesson's incident drill leans directly on these dashboards and this SLO to diagnose a real production incident.

## Key terms

- **kube-prometheus-stack** — the Helm chart that packages Prometheus, Grafana, and Alertmanager together with the CRDs that wire them up
- **ServiceMonitor** — a CRD telling Prometheus where and how often to scrape a service's `/metrics` endpoint
- **RED method** — a dashboard convention of three panels per service: rate, errors, duration
- **SLO (service level objective)** — a target reliability number (here, 99.5% of checkout requests under 800ms p99) measured against an error budget
- **Alertmanager route** — the rule set that decides which receiver (here, a Slack channel) a firing alert gets sent to
