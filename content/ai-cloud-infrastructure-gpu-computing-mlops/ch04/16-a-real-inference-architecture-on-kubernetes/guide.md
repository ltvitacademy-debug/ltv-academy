# Lesson 16 — A Real Inference Architecture on Kubernetes

**Chapter 4 · Model Serving and Inference Infrastructure · Lesson 4 of 4**

## What you'll learn

- How to assemble everything this chapter covered — serving
  frameworks, autoscaling on the right metric — into one real,
  working architecture on Kubernetes
- How course 9's Deployment/Service/Ingress and course 10's
  Prometheus/DCGM observability stack are the actual building blocks,
  not new concepts
- The practical details that matter at the GPU layer specifically:
  readiness probe timing, PodDisruptionBudgets, and node affinity
- How to read this architecture end-to-end as a single picture,
  closing out the chapter

## The full picture

Every piece in this lesson is something you've already built
separately, either earlier in this course or in course 9 and course
10. What's new is wiring them together into one real inference
architecture: a **Deployment** running the model server, requesting
a GPU and scheduled onto a GPU node pool; a **Service** in front of
it for stable internal routing; an **Ingress** exposing it externally
with TLS; an **HPA** scaling it on a real GPU-utilization metric; and
the **DCGM exporter → Prometheus → Prometheus Adapter** chain from
course 10 supplying that metric, plus the dashboards to watch it.

## The Deployment: where the GPU constraints live

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: model-server
  labels: { app: model-server }
spec:
  replicas: 2
  selector:
    matchLabels: { app: model-server }
  template:
    metadata:
      labels: { app: model-server }
    spec:
      nodeSelector:
        workload-type: gpu-inference
      tolerations:
        - key: "nvidia.com/gpu"
          operator: "Exists"
          effect: "NoSchedule"
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchLabels: { app: model-server }
                topologyKey: "kubernetes.io/hostname"
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

Two details matter more here than in a typical web-app Deployment.
First, `initialDelaySeconds: 60` on the readiness probe — model
loading into VRAM genuinely takes time, and a probe tuned for a
stateless web app's few-second startup will mark the pod unready (or
kill it) before the model ever finishes loading. Second, the
`podAntiAffinity` — spreading replicas across different nodes so a
single GPU node failure or drain doesn't take out every replica at
once.

## Service and Ingress: the routing course 9 already taught you

```yaml
apiVersion: v1
kind: Service
metadata:
  name: model-server
spec:
  selector: { app: model-server }
  ports:
    - port: 80
      targetPort: 8000
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: model-server-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts: ["inference.internal.example.com"]
      secretName: model-server-tls
  rules:
    - host: inference.internal.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service: { name: model-server, port: { number: 80 } }
```

Nothing here is GPU-specific — it's the same Service/Ingress pattern
from course 9, pointed at a GPU-backed Deployment instead of a
stateless CPU one.

## HPA on the real signal, and protecting it from drains

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: model-server-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: model-server
  minReplicas: 2
  maxReplicas: 8
  metrics:
    - type: Pods
      pods:
        metric: { name: DCGM_FI_DEV_GPU_UTIL }
        target: { type: AverageValue, averageValue: "70" }
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: model-server-pdb
spec:
  minAvailable: 1
  selector:
    matchLabels: { app: model-server }
```

The HPA is Lesson 15's pattern applied for real: GPU utilization from
the DCGM exporter DaemonSet already running cluster-wide, surfaced to
HPA via the Prometheus Adapter. The **PodDisruptionBudget** is the
piece that keeps a node drain or cluster upgrade from accidentally
dropping every replica at once — directly protecting the availability
this whole architecture exists to provide.

## Reading the architecture end-to-end

A request arrives at the Ingress, is routed to the Service, lands on
one of the Deployment's warm, GPU-backed replicas, spread across
nodes for resilience. The DCGM exporter on each GPU node continuously
reports utilization to Prometheus; the HPA reads that signal and
adds or removes replicas within the `minReplicas`/`maxReplicas`
bounds; the PodDisruptionBudget guarantees at least one replica
survives a voluntary disruption. That's the architecture this whole
chapter has been building toward — batch vs. real-time infrastructure,
what a serving framework actually does, autoscaling on the right
metric, all expressed as one real set of Kubernetes manifests.

## Key terms

| Term | Meaning |
|---|---|
| Readiness probe `initialDelaySeconds` | Time Kubernetes waits before checking readiness at all — must exceed real model-loading time for GPU-backed pods |
| Pod anti-affinity | Scheduling rule spreading replicas across different nodes so one node failure doesn't take out every replica |
| PodDisruptionBudget | Guarantees a minimum number of available replicas survive voluntary disruptions like node drains or upgrades |
| DCGM exporter → Prometheus Adapter | The chain (from course 10) that turns raw per-GPU utilization into a custom metric the HPA can scale on |

## Check yourself

You're ready to move to Chapter 5 when you can explain, without
looking: why does a GPU-backed Deployment need a longer
`initialDelaySeconds` than a typical web app, and how do the
Deployment, Service, Ingress, HPA, and PodDisruptionBudget in this
lesson each map back to something you already built in course 9 or
course 10?
