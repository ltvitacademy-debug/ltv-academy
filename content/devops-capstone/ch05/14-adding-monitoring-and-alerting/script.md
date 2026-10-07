# Script — Adding Monitoring & Alerting

## Segment 1 (title)

Phase 3 wired a commit all the way to production. Phase 4 asks the harder question: once code is running in prod, how does anyone at Northbridge Retail actually know it's healthy? This lesson installs a real monitoring stack and gives checkout a concrete service level objective instead of a gut feeling.

## Segment 2 (steps)

Northbridge installs kube-prometheus-stack with Helm twice, once per cluster — into northbridge-aks-dev, which hosts both the dev and staging namespaces, and separately into the isolated northbridge-aks-prod. One chart install brings Prometheus, Grafana, and Alertmanager together along with the CRDs that wire them up, and a small ServiceMonitor resource per service points Prometheus at the metrics endpoint product-catalog and checkout already expose, so nothing has to be scraped by hand.

## Segment 3 (code)

Every service gets the same three-panel dashboard, built on the RED method: rate, errors, and duration. For checkout, that's request rate from a counter, the ratio of five-hundred-level responses to total requests, and p99 duration from a histogram quantile query — the exact same PromQL shapes, with the service label swapped, produce product-catalog's dashboard too.

## Segment 4 (steps)

Checkout gets a formal SLO: ninety-nine point five percent of requests under eight hundred milliseconds p99, measured against a rolling thirty-day error budget, because it carries Northbridge's spikiest, most flash-sale-prone traffic. A PrometheusRule turns that threshold into a burn-rate alert, and Alertmanager routes anything labeled severity page straight into the shared Northbridge on-call Slack channel, instead of leaving it for someone to notice on a dashboard.

## Segment 5 (outro)

With dashboards and alerting live, Northbridge can finally see checkout the way its customers experience it. Next lesson layers security scanning and secrets management onto the same pipeline — and the lesson after that puts this exact monitoring stack to work diagnosing a real incident.
