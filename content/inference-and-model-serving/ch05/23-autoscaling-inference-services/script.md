# Script — Autoscaling Inference Services

## Segment 1 (title)

Chapters one through four made one GPU serve requests efficiently. Chapter five zooms out: how do you run enough of that efficient serving to handle real, varying traffic, without paying for idle GPUs around the clock or falling over during a spike? The first lever is autoscaling — automatically adding and removing replicas as load changes.

## Segment 2 (steps)

Kubernetes' built-in autoscaler defaults to CPU utilization, which is close to useless for GPU inference, since the CPU sits mostly idle while the GPU does the real work. The signals that actually track load are GPU utilization from an exporter like DCGM, request queue depth — often the earliest overload signal — and latency percentiles like p99 time-to-first-token.

## Segment 3 (steps)

Every autoscaler runs the same loop on an interval: observe the metric, compare it against a target, compute a desired replica count, scale toward it, and wait for new pods to become ready before repeating. KEDA extends Kubernetes' standard autoscaler with external metric sources like a Prometheus query, which is exactly what queue-depth-based scaling needs.

## Segment 4 (code)

Here's a KEDA ScaledObject scaling an inference deployment between two and twelve replicas, triggered on average queue depth crossing a threshold of five requests per replica — a real, runnable shape for GPU-aware autoscaling.

## Segment 5 (steps)

Loading model weights onto a GPU can take seconds to minutes, so a replica spun up in reaction to a spike isn't useful until that finishes — reactive autoscaling is always a step behind. Teams close that gap by keeping a warm minimum of replicas always running, caching weights on nodes, and scaling ahead of known traffic patterns on a schedule.

## Segment 6 (outro)

GPU inference scales on queue depth and utilization, not CPU percent, and because loading a model is slow, pure reactive scaling always lags behind demand. Up next, lesson twenty-four: once you have several replicas, how do you actually split traffic across them?
