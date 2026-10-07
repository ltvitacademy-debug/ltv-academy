# Script — GPU Utilization Monitoring

## Segment 1 (title)

Chapter 5 covered keeping data flowing fast enough to feed five hundred twelve GPUs. This chapter asks how the Solara ML Platform team actually knows whether that's working. As the training program grew, the team split the single shared training namespace into training-lm for the language-modeling team and training-mm for the multimodal team — same cluster, separate namespaces, which is what makes monitoring, and in the next lesson cost, a per-team question instead of a cluster-wide guess.

## Segment 2 (steps)

NVIDIA DCGM runs as a daemon on every GPU node, reading hardware counters directly off each H100. DCGM Exporter turns those counters into a standard Prometheus metrics endpoint, carrying labels like hostname, GPU index, and namespace — which is exactly what lets utilization be broken down by training-lm versus training-mm instead of just a cluster-wide average.

## Segment 3 (screenshot)

This is the community NVIDIA DCGM Exporter dashboard in Grafana — GPU temperature, power usage, and clock speed panels, fed directly by those Prometheus metrics. It's the same panel layout the Solara ML Platform team adapts for solara-train, with hostname and namespace labels added so each panel can be filtered down to one team's GPUs.

## Segment 4 (code)

The key distinction is between two metrics. DCGM_FI_DEV_GPU_UTIL answers whether a kernel was running at all on the GPU — busy or not. DCGM_FI_PROF_PIPE_TENSOR_ACTIVE answers something sharper: whether the Tensor Cores specifically were doing work. High GPU utilization with low tensor-core activity is a real, actionable signal — the GPU looks busy, but something upstream, data loading, communication, or an inefficient kernel, is leaving real compute capacity on the table.

## Segment 5 (outro)

DCGM Exporter turns raw hardware counters into Prometheus metrics, and GPU_UTIL versus PIPE_TENSOR_ACTIVE tells busy apart from useful — now broken down per team. Next, Lesson 30 uses that same namespace split for cost attribution.
