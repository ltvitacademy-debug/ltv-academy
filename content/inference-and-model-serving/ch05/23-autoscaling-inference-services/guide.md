# Autoscaling Inference Services

Chapters 1 through 4 were about making one GPU serve requests efficiently — batching, the KV cache, paged attention, continuous batching. Chapter 5 zooms out: how do you run *enough* of that efficient serving to handle real, varying traffic, without paying for idle GPUs around the clock or falling over the moment traffic spikes? The first lever is autoscaling — automatically adding and removing serving replicas as load changes.

## What you'll learn

- Why ordinary CPU-based autoscaling doesn't fit GPU inference, and which metrics to scale on instead
- How a reactive autoscaling control loop actually works, step by step
- Why "cold start" is the hidden cost of scaling GPU inference from zero
- How pre-warming and scheduled scaling cover the gap reactive scaling can't

## Why CPU utilization is the wrong signal

Kubernetes' built-in Horizontal Pod Autoscaler (HPA) defaults to scaling on CPU utilization, because that's the right signal for a typical web service. It's close to useless for GPU inference: the CPU on an inference pod is mostly idle while the GPU does the real work, so CPU% barely moves even when the service is completely saturated and queuing requests.

The signals that actually track inference load are:

- **GPU utilization** — exposed by NVIDIA's DCGM exporter into Prometheus, showing how busy the GPU's compute actually is
- **Request queue depth** — how many requests are waiting to be picked up for a batch, often the earliest and clearest sign of overload
- **In-flight / concurrent requests** — how many requests a replica is actively serving at once
- **Latency percentiles** — p99 TTFT climbing is a lagging but very real overload signal

## The autoscaling control loop

Every autoscaler, regardless of the metric, runs the same loop on an interval (commonly every 15–30 seconds):

1. Observe the current value of the chosen metric
2. Compare it against a target (for example, "queue depth per replica should average 5")
3. Compute a desired replica count from the gap
4. Scale the deployment up or down toward that count
5. Wait for new pods to become ready, then repeat

**KEDA** (Kubernetes Event-Driven Autoscaling) extends the standard HPA with external metric sources — a Prometheus query, a message-queue length, a custom metrics API — which is exactly what inference workloads need, since "queue depth" and "GPU utilization" aren't metrics the stock HPA understands out of the box.

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: llm-server-scaler
spec:
  scaleTargetRef:
    name: llm-server
  minReplicaCount: 2
  maxReplicaCount: 12
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://prometheus:9090
        query: avg(inference_queue_depth{app="llm-server"})
        threshold: "5"
```

## The cold-start tax

Loading model weights onto a GPU — anywhere from a few gigabytes to well over a hundred — plus framework and CUDA initialization, can take anywhere from several seconds to a few minutes depending on model size and whether weights are already cached on the node. A replica spun up in reaction to a spike isn't actually serving traffic until that finishes, which means pure reactive autoscaling is always a step behind the demand that triggered it.

Three ways teams cover that gap:

- **Keep a warm minimum** — set `minReplicaCount` above zero so there's always spare, already-loaded capacity to absorb the first part of a spike
- **Pre-cache weights on nodes** — so a new replica's cold start is seconds, not minutes
- **Predictive / scheduled scaling** — scale up ahead of a known pattern (business-hours traffic, a product launch) instead of waiting for the metric to move

## Scaling down safely

Scaling down is not just killing pods. A replica being removed should stop receiving new requests, finish the ones it already has in flight, and only then terminate — which means a sensible termination grace period and a `minReplicas` floor that never goes below what you need to absorb the next few seconds of traffic while new capacity comes online.

## Key terms

| Term | Meaning |
|---|---|
| HPA (Horizontal Pod Autoscaler) | Kubernetes' built-in mechanism for adding/removing replicas based on a metric |
| KEDA | Extends HPA with external metrics (Prometheus, queues) suited to event-driven workloads |
| Queue depth | Requests waiting to be picked up for processing — an early overload signal |
| Cold start | The time a new replica needs to load weights and initialize before it can serve traffic |

## Recap

GPU inference needs to scale on GPU-aware signals like queue depth and utilization, not CPU%, and every autoscaler runs the same observe-compare-scale loop on an interval. Because loading a model is slow, pure reactive scaling always lags — warm minimums, cached weights, and scheduled scaling close that gap. Next up, Lesson 24: once you have several replicas, how do you actually split traffic across them?
