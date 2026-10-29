# Lesson 30 — Lab: Deploying an Autoscaling Model-Serving Endpoint

**Chapter 8 · Capstone: Building Production AI Infrastructure · Lesson 30 of 32**

## What you'll learn

- How to deploy a real inference Deployment for the model Lesson 29's cluster just trained,
  combining the architecture from Chapter 4, Lesson 16 with the autoscaling patterns from Lesson
  15
- How to configure KEDA so the same endpoint scales all the way to zero replicas during genuinely
  idle periods, and back up from zero on the first new request
- How to layer GPU-utilization-based scaling on top of that zero floor, so traffic beyond a single
  warm replica is handled by the real signal from Lesson 15, not request count
- Why scale-to-zero and PodDisruptionBudgets are in real tension, and the deliberate call this lab
  makes about it

## The scenario, continued

Lesson 29 left Solari Vision Labs with a working GPU training cluster and a freshly trained defect-
detection model. Manufacturing customers upload inspection images in short, unpredictable bursts —
a few minutes of real traffic around each shift change, then nothing for hours. Paying for even one
warm A100-backed replica around the clock, for a model that serves real traffic maybe four hours a
day, is exactly the waste Chapter 4, Lesson 15 warned about. This lab builds the serving endpoint
with that traffic shape in mind from the start.

## Step 1 — The inference Deployment, same GPU constraints as Lesson 16

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: defect-model-server
spec:
  replicas: 1
  selector:
    matchLabels: { app: defect-model-server }
  template:
    metadata:
      labels: { app: defect-model-server }
    spec:
      nodeSelector:
        workload-type: gpu-inference
      tolerations:
        - key: "nvidia.com/gpu"
          operator: "Exists"
          effect: "NoSchedule"
      containers:
        - name: triton
          image: nvcr.io/nvidia/tritonserver:23.10-py3
          args: ["tritonserver", "--model-repository=/models"]
          readinessProbe:
            httpGet: { path: /v2/health/ready, port: 8000 }
            initialDelaySeconds: 60
            periodSeconds: 10
          resources:
            limits:
              nvidia.com/gpu: 1
```

`replicas: 1` here is deliberate and temporary — KEDA, not this Deployment spec, will own the
actual replica count once Step 3 is wired in, including taking it down to zero.

## Step 2 — Service and Ingress, unchanged from Chapter 4

```yaml
apiVersion: v1
kind: Service
metadata:
  name: defect-model-server
spec:
  selector: { app: defect-model-server }
  ports:
    - port: 80
      targetPort: 8000
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: defect-model-server-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts: ["inspect.solarivision.ai"]
      secretName: defect-model-server-tls
  rules:
    - host: inspect.solarivision.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service: { name: defect-model-server, port: { number: 80 } }
```

## Step 3 — KEDA: zero to one on queue depth, one to many on GPU utilization

This is the real combination this lab is built around — a single `ScaledObject` with two triggers,
each one answering a different question:

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: defect-model-scaler
spec:
  scaleTargetRef:
    name: defect-model-server
  minReplicaCount: 0
  maxReplicaCount: 8
  cooldownPeriod: 300
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://prometheus.monitoring.svc:9090
        metricName: inference_queue_depth
        query: sum(inference_pending_requests{app="defect-model-server"})
        threshold: "1"
    - type: prometheus
      metadata:
        serverAddress: http://prometheus.monitoring.svc:9090
        metricName: DCGM_FI_DEV_GPU_UTIL
        query: avg(DCGM_FI_DEV_GPU_UTIL{app="defect-model-server"})
        threshold: "70"
```

The first trigger answers "should there be any replica at all?" — any pending request pushes
replicas from 0 to 1. The second trigger answers "is the one warm replica actually saturated?" —
once GPU utilization on that replica crosses 70%, KEDA (via the HPA it manages internally) adds
more. `cooldownPeriod: 300` is the deliberate buffer before scaling back to zero, so a five-minute
lull between uploads doesn't trigger a cold start on the very next one.

## Step 4 — The tension with PodDisruptionBudgets, and the call this lab makes

Chapter 4, Lesson 16 used a `PodDisruptionBudget` with `minAvailable: 1` to protect availability
during node drains. That guarantee is incompatible with a scaler whose whole point is legitimately
running zero replicas — a PDB can't guarantee one available replica out of zero. Solari's platform
team makes the explicit tradeoff: no PDB on this scale-to-zero endpoint, accepting that a node
drain during a genuinely idle window has no replica to protect anyway, and leaning on the shorter
cold-start cost instead for the rare case a drain happens mid-burst.

## Step 5 — Proving both ends of the scaler work

```
kubectl get deployment defect-model-server    # watch replicas: 0 during an idle window
curl https://inspect.solarivision.ai/v2/health/ready   # the first request after idle
kubectl get deployment defect-model-server -w  # watch 0 -> 1 as KEDA reacts

# then, during a load test simulating a shift-change burst:
kubectl get hpa -w                              # watch replicas climb past 1 on GPU_UTIL
```

A clean test shows three distinct states: zero replicas while idle, exactly one replica after the
first request clears its cold start, and more than one replica once GPU utilization actually
crosses 70% under sustained load — the zero-to-one and one-to-many halves of the same scaler, both
verified against real traffic instead of assumed from the YAML alone.

## Key terms

| Term | Meaning |
|---|---|
| Scale-to-zero trigger | A KEDA trigger (here, queue depth) that governs whether any replica should exist at all |
| GPU-utilization trigger | A second KEDA/HPA trigger that governs scaling beyond the zero floor, based on real GPU saturation |
| `cooldownPeriod` | The idle time KEDA waits before scaling back to zero, trading a small cost-of-idle for fewer cold starts |
| PDB/scale-to-zero tension | A PodDisruptionBudget's minimum-available guarantee cannot coexist with a scaler that legitimately runs zero replicas |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does this lab's
`ScaledObject` need two separate triggers instead of one, and why can't a `PodDisruptionBudget`
with `minAvailable: 1` be added to an endpoint that's deliberately allowed to scale to zero?
