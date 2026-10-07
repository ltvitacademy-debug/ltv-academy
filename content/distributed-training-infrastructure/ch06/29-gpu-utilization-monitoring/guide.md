# GPU Utilization Monitoring

Chapter 5 covered how to keep data flowing fast enough to feed 512 GPUs. This chapter asks the next question: how does the Solara ML Platform team actually *know* whether that's working, in real time, across a cluster running jobs for two different research teams at once? As Solara AI's training program grew, the platform team split the single shared `training` namespace from earlier chapters into **`training-lm`** for the language-modeling team and **`training-mm`** for the multimodal team — separate namespaces on the same `solara-train` cluster, which is what makes monitoring (and, in Lesson 30, cost) a per-team question instead of a cluster-wide guess. This lesson starts with the most fundamental signal: is a GPU actually doing useful work?

## What you'll learn

- How NVIDIA DCGM Exporter turns GPU hardware counters into Prometheus metrics
- The specific metrics that matter: `DCGM_FI_DEV_GPU_UTIL`, `DCGM_FI_DEV_FB_USED`, and tensor-core activity
- Why "GPU busy" and "GPU doing useful math" are two different numbers
- How to write a PromQL query for average GPU utilization per node

## DCGM Exporter: hardware counters to Prometheus metrics

**NVIDIA DCGM** (Data Center GPU Manager) runs as a DaemonSet on every GPU node in `solara-train`, reading hardware counters directly off each H100. **DCGM Exporter** exposes those counters as a standard Prometheus metrics endpoint, which Prometheus scrapes on an interval like any other target:

```yaml
scrape_configs:
  - job_name: "dcgm-exporter"
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        regex: dcgm-exporter
        action: keep
```

Once scraped, these metrics carry labels like `Hostname`, `gpu`, and `namespace`, which is exactly what lets the platform team break utilization down by `training-lm` versus `training-mm` rather than just by cluster-wide average.

## The metrics that matter

- **`DCGM_FI_DEV_GPU_UTIL`** — the percentage of time at least one kernel was executing on the GPU's streaming multiprocessors. High and steady is the headline "is this GPU busy" number.
- **`DCGM_FI_DEV_FB_USED`** — frame buffer (GPU memory) used, in MiB. Tracking this across a PyTorchJob's pods catches memory creeping toward an out-of-memory failure before it happens.
- **`DCGM_FI_DEV_POWER_USAGE`** and **`DCGM_FI_DEV_GPU_TEMP`** — power draw and temperature, useful for catching throttling.
- **`DCGM_FI_PROF_PIPE_TENSOR_ACTIVE`** — the fraction of cycles the Tensor Cores specifically were active, as opposed to the SMs in general.

## Why "busy" isn't the same as "doing useful math"

`DCGM_FI_DEV_GPU_UTIL` answers "was *a* kernel running," not "was the GPU's actual compute capacity being used." A GPU can show high `GPU_UTIL` while being memory-bound, communication-bound, or stuck on small, inefficient kernels — busy, but not doing much useful FLOPs. `DCGM_FI_PROF_PIPE_TENSOR_ACTIVE` is the closer proxy for real compute efficiency on tensor-core-bound work like transformer training: high `GPU_UTIL` paired with low `PIPE_TENSOR_ACTIVE` is a specific, actionable signal that something upstream — data loading (Chapter 5), communication (Chapter 2), or kernel inefficiency — is leaving H100 compute capacity on the table even though the GPU "looks" busy.

## A PromQL query, and the dashboard it feeds

A simple average utilization query, broken down per node:

```
avg(DCGM_FI_DEV_GPU_UTIL) by (Hostname)
```

Grafana is where the Solara ML Platform team visualizes this continuously, using the community NVIDIA DCGM Exporter dashboard as a starting point:

![A Grafana dashboard built on DCGM Exporter metrics, showing GPU temperature, power usage, and SM/memory clock panels over time, with per-GPU breakdowns and gauge summaries](/courses/distributed-training-infrastructure/ch06/29-gpu-utilization-monitoring/dcgm-grafana-dashboard.png)
*The community NVIDIA DCGM Exporter Grafana dashboard — the same panel layout (GPU temperature, power, SM clocks, memory clocks) the Solara ML Platform team adapts for solara-train, with Hostname and namespace labels added for per-team breakdowns.*

## Key terms

- **DCGM (Data Center GPU Manager)** — NVIDIA's tool for reading hardware counters off each GPU
- **DCGM Exporter** — exposes DCGM counters as a Prometheus metrics endpoint
- **`DCGM_FI_DEV_GPU_UTIL`** — percentage of time at least one kernel was executing on the GPU
- **`DCGM_FI_PROF_PIPE_TENSOR_ACTIVE`** — fraction of cycles the Tensor Cores specifically were active

## Recap

DCGM Exporter turns raw GPU hardware counters into Prometheus metrics, and the key distinction is between `GPU_UTIL` (is something running) and `PIPE_TENSOR_ACTIVE` (is useful compute happening) — now broken down per team thanks to the `training-lm` / `training-mm` namespace split. Next, Lesson 30 uses that same split for a different purpose: attributing cluster cost across the two teams.
