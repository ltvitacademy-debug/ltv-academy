# Horizontal Pod Autoscaling

Northbridge's checkout Deployment runs 3 replicas most of the time, but Black Friday traffic needs far more, for a few hours, then back down. Manually editing the replica count — and remembering to scale back down afterward — isn't reliable at 2 a.m. during a traffic spike. The **HorizontalPodAutoscaler (HPA)** automates exactly this: watching a metric and adjusting replica count to match, continuously.

## What you'll learn

- What the HPA actually watches and how it decides to scale
- Why resource requests are a prerequisite for CPU-based autoscaling
- The structure of an HPA manifest, field by field
- What minReplicas and maxReplicas protect against

## The prerequisite: metrics-server

Before any HPA can use CPU or memory metrics, the cluster needs the **metrics-server** add-on running — it's what actually aggregates real-time resource usage per Pod and exposes it to the HPA controller. Without it, an HPA based on CPU/memory utilization has no data to act on.

## How HPA decides to scale

The HPA controller periodically compares the actual metric value against a target, and adjusts `replicas` on the target Deployment to try to close the gap:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: checkout-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: checkout
  minReplicas: 3
  maxReplicas: 30
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

`scaleTargetRef` names the Deployment being scaled. `metrics` describes what to watch — here, average CPU utilization across all Pods, targeted at 70% of their *requested* CPU. This is exactly why resource requests from the earlier lesson matter: "70% utilization" is meaningless without a request value to measure utilization against.

## minReplicas and maxReplicas

`minReplicas` sets a floor — checkout never drops below 3 Pods even at near-zero traffic, keeping some baseline redundancy. `maxReplicas` sets a ceiling, protecting the cluster (and Northbridge's cloud bill) from scaling without bound if a metric spikes unexpectedly or a bug causes runaway CPU usage.

## Beyond CPU: custom and multiple metrics

An HPA can target memory utilization the same way, or custom/external metrics (like queue depth from an external system) via the `Pods` or `External` metric types, which need a metrics adapter beyond plain metrics-server. An HPA can also list multiple `metrics` entries at once — Kubernetes scales to satisfy whichever metric demands the most replicas.

## Key terms

- **HorizontalPodAutoscaler (HPA)** — a controller that adjusts a Deployment's replica count based on observed metrics
- **metrics-server** — the cluster add-on providing real-time CPU/memory usage the HPA reads
- **scaleTargetRef** — the Deployment (or other scalable resource) the HPA controls
- **averageUtilization** — the target metric value as a percentage of requested resources
- **minReplicas / maxReplicas** — the floor and ceiling the HPA will never scale past
