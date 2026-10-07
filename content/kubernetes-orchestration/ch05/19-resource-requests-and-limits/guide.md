# Resource Requests & Limits

If every one of Northbridge's Pods could use unlimited CPU and memory, a single misbehaving checkout Pod could starve every other workload on its node. **Requests** and **limits** are how Kubernetes keeps that from happening — requests tell the scheduler how much a Pod needs to even get placed, and limits cap how much it's allowed to use once running.

## What you'll learn

- The difference between a request and a limit, and what each one actually controls
- How CPU and memory are measured and specified
- What happens when a Pod exceeds its memory limit versus its CPU limit
- The three Quality of Service (QoS) classes these settings create

## Requests: what the scheduler guarantees

A **request** is the amount of CPU/memory the scheduler reserves for a Pod before it will place it on a node. The scheduler only places a Pod on a node that has enough *unreserved* capacity to cover the request — it's a placement guarantee, not a usage cap.

```yaml
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```

CPU is measured in **millicores** — `250m` is a quarter of one CPU core. Memory is measured in bytes, usually written with binary suffixes like `Mi` (mebibytes) or `Gi` (gibibytes).

## Limits: the hard ceiling

A **limit** caps how much of a resource a running container can actually use. The two resources behave very differently when a container hits its limit:

- **Memory** is incompressible — a container can't be throttled back from using memory it's already allocated. Exceeding the memory limit gets the container **OOMKilled** (out-of-memory killed) and restarted.
- **CPU** is compressible — a container exceeding its CPU limit is simply **throttled**, slowed down, not killed. It keeps running, just slower.

This asymmetry matters: Northbridge should size memory limits generously enough to avoid OOMKills under normal load, while CPU limits can be tuned tighter since overshooting just means temporary slowdown.

## Quality of Service classes

Kubernetes assigns every Pod one of three QoS classes based on how requests and limits compare, and uses that class to decide eviction order under node pressure:

| QoS Class | Condition | Behavior under pressure |
|---|---|---|
| **Guaranteed** | requests == limits for every container, both CPU and memory | Evicted last |
| **Burstable** | At least one request is set, but requests != limits | Evicted before Guaranteed |
| **BestEffort** | No requests or limits set at all | Evicted first |

Northbridge's checkout service, being critical, is a good candidate for `Guaranteed` — setting requests equal to limits so it's the last thing evicted if a node runs low on resources.

## Key terms

- **Request** — the resource amount the scheduler reserves when placing a Pod
- **Limit** — the hard cap on resource usage once the Pod is running
- **Millicore** — 1/1000th of a CPU core; `250m` = 0.25 cores
- **OOMKilled** — a container terminated for exceeding its memory limit
- **QoS class** — Guaranteed, Burstable, or BestEffort; determines eviction priority under node resource pressure
