# Lesson 17 — Autoscaling AI Workloads

**Chapter 4 · Scaling & Reliability · Lesson 17 of 25**

## What you'll learn

- The two common autoscaling signals, and why the usual default (CPU) is
  often the wrong one for an AI workload
- What min/max instance counts actually protect you from, in each direction
- Why GPU-backed inference scales slower and in coarser steps than a
  typical stateless web service
- How this connects forward to cold starts (Lesson 18) and cost (Lesson 21)

## The signal that triggers scaling

Autoscaling watches a metric and adds or removes instances when it crosses
a threshold. The metric you pick matters more than it first seems:

```
CPU-based scaling (the common default):
  scale out when average CPU > 70%
  works well for request-handling web servers

AI inference workload:
  CPU can sit near-idle while a GPU is pegged at 100%
  doing the actual model computation
  -> CPU-based scaling never triggers, even though
     the service is genuinely saturated
```

An inference container's bottleneck is usually the GPU (or request queue
depth), not CPU — scaling on CPU for a workload like that means the
autoscaler is watching the wrong gauge entirely. GPU utilization or
in-flight-request count are the metrics that actually reflect load for
this kind of service.

## Min and max: two different protections

```
Min instances: the floor -- never scale below this,
  even with zero traffic
  (protects against cold starts, Lesson 18)

Max instances: the ceiling -- never scale above this,
  no matter how much traffic arrives
  (protects your budget and your GPU quota)
```

Min isn't just about responsiveness — a GPU instance type is often
quota-limited and expensive per hour, so "scale to zero when idle" (fine
for a cheap stateless API) can mean every single request pays a slow
cold-start penalty for an AI service, which is why min is usually set
above zero for anything latency-sensitive. Max exists because
unconstrained autoscaling against a runaway traffic spike (or a bug) is
an unconstrained bill, not just an engineering inconvenience.

## Why GPU-backed scaling is slower and coarser

```
Typical web service instance:  starts in seconds
GPU-backed inference instance: starts in MINUTES
  (larger image, model weights load into GPU memory,
   GPU driver initialization, GPU availability itself
   can be constrained in the region)
```

A CPU-based web service can add instances in small increments, quickly,
because starting one is cheap and fast. A GPU-backed instance is slower to
start and often pricier per unit, so autoscaling policies for AI workloads
usually scale in bigger, less frequent steps, and lean more on the min
floor to absorb short traffic bursts rather than reacting to every
fluctuation with a new instance.

## Key terms

| Term | Meaning |
|---|---|
| Scaling signal | The metric autoscaling watches — CPU, GPU utilization, queue depth |
| Min instances | The floor; protects against cold starts and total unavailability |
| Max instances | The ceiling; protects budget and GPU quota from runaway scaling |
| Cold start | The startup delay a new instance pays before serving its first request |

## Check yourself

You're ready for Lesson 18 when you can explain: why would CPU-based
autoscaling fail to trigger even while a GPU inference service is
genuinely overloaded and falling behind on requests?
