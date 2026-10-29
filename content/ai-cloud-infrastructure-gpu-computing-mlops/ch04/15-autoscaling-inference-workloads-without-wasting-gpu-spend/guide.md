# Lesson 15 — Autoscaling Inference Workloads Without Wasting GPU Spend

**Chapter 4 · Model Serving and Inference Infrastructure · Lesson 3 of 4**

## What you'll learn

- Why the CPU-utilization autoscaling you learned in course 9 is
  usually the wrong signal for GPU inference pods
- Why GPUs are both expensive *and* slow to provision, and why that
  combination is what makes naive autoscaling so costly
- Two real patterns that actually work: scale-to-zero for bursty
  workloads, and pre-warming for predictable traffic
- How pod-level autoscaling (HPA/KEDA) and node-level autoscaling
  (Cluster Autoscaler/Karpenter) have to be tuned together, not
  independently

## Why naive autoscaling is expensive here specifically

A Horizontal Pod Autoscaler scaling on CPU utilization, the pattern
from course 9, assumes two things that aren't true for GPU inference:
that the resource you care about is CPU, and that a new replica is
available almost immediately. Neither holds. The thing actually
constraining an inference pod is **GPU utilization**, not CPU — a
model server can sit at 5% CPU while its GPU is saturated. And
spinning up a new GPU-backed pod often means the cluster autoscaler
has to provision a brand-new GPU node first, pull a multi-gigabyte
container image, and load model weights into VRAM — a process that
can take several minutes, not seconds.

Put those two things together and naive autoscaling fails in both
directions: scale too late (reactive CPU-based scaling never
triggers because CPU looks fine) and you blow your latency budget
while new capacity is still booting; scale too eagerly on request
count without a floor and you're paying for GPU nodes that sit mostly
idle between bursts. A single idle A100 or H100 node is often the
single most expensive line item on an AI infrastructure bill, which
is exactly why this gets its own lesson before Chapter 6's FinOps
material.

## Pattern 1: scale on the right metric

Instead of CPU, scale on **GPU utilization** itself, sourced from the
DCGM exporter and Prometheus you set up in course 10, via the
Prometheus Adapter so HPA can read it as a custom metric:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: inference-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: realtime-inference
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Pods
      pods:
        metric:
          name: DCGM_FI_DEV_GPU_UTIL
        target:
          type: AverageValue
          averageValue: "70"
```

`minReplicas: 2` here is deliberate — it's the pre-warming pattern in
its simplest form.

## Pattern 2: scale-to-zero for bursty, infrequent traffic

Some inference workloads see real traffic for a few minutes an hour
and nothing in between. Paying for even one warm GPU replica the rest
of the time is pure waste. **KEDA** extends Kubernetes autoscaling
with event-driven scaling, including down to zero replicas, triggered
by a metric like queue depth or requests-per-second rather than a
resource utilization average:

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: bursty-inference-scaler
spec:
  scaleTargetRef:
    name: bursty-inference
  minReplicaCount: 0
  maxReplicaCount: 5
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://prometheus.monitoring.svc:9090
        metricName: inference_queue_depth
        query: sum(inference_pending_requests)
        threshold: "5"
```

The tradeoff is explicit: you accept the cold-start latency of the
first request after an idle period, in exchange for paying nothing
while truly idle. That's the right trade for bursty, low-frequency
traffic — and the wrong one for anything with a tight p99 SLO.

## Pattern 3: pre-warming for predictable traffic

If traffic follows a known daily shape — busy 9am–6pm, quiet
overnight — scale-to-zero's cold-start cost hits you right when
traffic resumes. Pre-warming keeps a baseline of replicas (via
`minReplicas` on the HPA, or a scheduled scaler that raises the floor
ahead of the known peak) so capacity is already warm before the
predictable surge arrives, rather than reacting to it after the fact.

## Pod-level and node-level autoscaling have to agree

HPA/KEDA decide how many *pods* you want. The **Cluster
Autoscaler** or **Karpenter** decide whether a *node* with a free GPU
exists to run them on. If HPA adds replicas faster than the node
autoscaler can provision GPU nodes, pods sit `Pending` for minutes —
which defeats the point of autoscaling for latency-sensitive traffic.
Tuning these together, and using GPU time-slicing or MIG (course 2)
so small inference pods don't each demand a whole new node, is what
makes the pod-level pattern actually deliver the capacity it promises.

## Key terms

| Term | Meaning |
|---|---|
| DCGM exporter | NVIDIA's Data Center GPU Manager exporter, exposing per-GPU utilization metrics to Prometheus |
| Scale-to-zero | Scaling replicas down to zero during idle periods, accepting cold-start latency on the next request, to avoid paying for idle GPU capacity |
| Pre-warming | Keeping a baseline of warm replicas ahead of known, predictable traffic so capacity isn't cold when it's needed |
| KEDA | Kubernetes Event-Driven Autoscaling — adds event/queue-based scaling, including to zero, on top of or instead of standard HPA metrics |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
does naive CPU-based HPA scaling fail for GPU inference pods, and
when would you choose scale-to-zero over pre-warming for a given
workload's traffic pattern?
