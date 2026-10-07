# Exporters & Kubernetes Monitoring

Not everything can be instrumented with a client library the way Northbridge's checkout service was in Lesson 15. You don't control the source code of the Linux kernel, Kubernetes itself, or most off-the-shelf databases. That's what **exporters** are for — and since Northbridge runs checkout on Kubernetes, this lesson also covers how Prometheus discovers and monitors a dynamic cluster rather than a fixed set of servers.

## What you'll learn

- What an exporter is and why `node_exporter` is the one nearly every team runs
- How Kubernetes service discovery and relabeling decide what Prometheus actually scrapes
- What `kube-state-metrics` adds that `node_exporter` can't see
- The shape of a real target's discovered labels versus its final scrape labels

## Exporters: metrics for things you didn't write

An **exporter** is a small HTTP server that translates a system's native metrics into Prometheus's text exposition format. It sits in front of something that can't speak Prometheus natively and exposes a `/metrics` endpoint on its behalf.

`node_exporter` is the most widely deployed exporter in the entire Prometheus ecosystem — it runs on (or as a container alongside) every machine and exposes host-level metrics: CPU, memory, disk I/O, network, filesystem usage.

![A terminal window showing node_exporter starting up: log lines listing the enabled collectors (boottime, cpu, diskstats, filesystem, loadavg, meminfo, netdev, textfile, time, uname) and finishing with "Listening on address=:9100".](/courses/monitoring-logging-and-observability/ch04/17-exporters-and-kubernetes-monitoring/node-exporter.png)
*node_exporter starting up and listing its enabled collectors before it starts listening on port 9100 — Prometheus scrapes that port directly.*
Source: [Prometheus Documentation — First Steps With Node Exporter](https://prometheus.io/docs/guides/node-exporter/)

Other common exporters follow the same pattern: `mysqld_exporter` for MySQL, `postgres_exporter` for PostgreSQL, `blackbox_exporter` for probing HTTP/TCP/DNS endpoints from the outside, and `kube-state-metrics`, covered below.

## Kubernetes service discovery, in practice

Lesson 14 introduced the idea that Prometheus asks the Kubernetes API what to scrape instead of using a static list. In practice, that discovery produces a set of **discovered labels** — things like the pod's IP, namespace, and any Kubernetes annotations — and then **relabeling** rules decide what happens next: keep this target or drop it, and which discovered labels survive (possibly renamed) as the target's final labels.

![The Prometheus Service Discovery status page, showing a scrape pool named "demo" with three discovered targets, each listing its discovered labels on the left (__address__, __metrics_path__, __scheme__, job, etc.) next to its resulting target labels on the right; two targets show a "show relabeling" link and one is marked "dropped".](/courses/monitoring-logging-and-observability/ch04/17-exporters-and-kubernetes-monitoring/service-discovery-relabeling.png)
*Discovered labels on the left, final target labels on the right — one target here was dropped entirely by a relabeling rule.*
Source: [Prometheus Blog — Service Discovery Page Improvements](https://prometheus.io/blog/)

This is exactly how Northbridge scrapes only the checkout service's pods and not every pod in the cluster: a relabeling rule keeps only targets where a `prometheus.io/scrape: "true"` annotation is present, and rewrites the pod's namespace into a clean `namespace` label on every metric it produces.

## kube-state-metrics: the cluster's own state

`node_exporter` tells you about the machine. It has no idea whether a Kubernetes Deployment has the right number of replicas, or whether a Pod is stuck in `Pending`. That's `kube-state-metrics`: it watches the Kubernetes API and exposes the *state* of Kubernetes objects as Prometheus metrics — `kube_deployment_status_replicas_available`, `kube_pod_status_phase`, and similar. Together, `node_exporter` (machine health) and `kube-state-metrics` (cluster object state) cover the two halves of "is Kubernetes itself healthy," separate from whether Northbridge's checkout application code is healthy.

## Key terms

- **Exporter** — an HTTP server that translates a system's native metrics into Prometheus's exposition format
- **`node_exporter`** — the standard exporter for host/OS-level metrics (CPU, memory, disk, network)
- **`kube-state-metrics`** — exposes the state of Kubernetes objects (Deployments, Pods, etc.) as Prometheus metrics
- **Discovered labels** — labels service discovery finds about a potential target, before relabeling
- **Relabeling** — rules that keep, drop, or rewrite labels between discovery and the actual scrape
- **Scrape pool** — a named group of targets sharing the same job configuration
