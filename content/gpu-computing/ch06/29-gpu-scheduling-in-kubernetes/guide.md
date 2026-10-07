# GPU Scheduling in Kubernetes

Chapter 5 ended with "something has to decide which nodes a job runs on." In most production ML infrastructure today, that something is Kubernetes. This lesson covers how Kubernetes, which wasn't originally built with GPUs in mind, learned to schedule them — and the real YAML you write to request one.

## What you'll learn

- Why GPUs need a device plugin, unlike CPU and memory
- The NVIDIA device plugin and what it actually does
- How to request a GPU in a pod spec
- What happens when you request more GPUs than a node has

## Why GPUs aren't "just another resource"

Kubernetes natively understands CPU and memory as schedulable resources — every node reports how much it has, and the scheduler packs pods accordingly. GPUs are not built in; Kubernetes has no native concept of "this node has an NVIDIA GPU" without help. That help comes from the **NVIDIA device plugin**, a component that runs on every GPU node, discovers the GPUs present, and advertises them to Kubernetes as a schedulable **extended resource**, under the name `nvidia.com/gpu`.

## Requesting a GPU in a pod spec

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: training-job
spec:
  containers:
    - name: trainer
      image: pytorch/pytorch:2.3.0-cuda12.1-cudnn8-runtime
      resources:
        limits:
          nvidia.com/gpu: 1
```

Note that `nvidia.com/gpu` is only set under `limits`, not `requests` — this is a deliberate Kubernetes convention for extended resources like GPUs: the limit IS the request, since you cannot subdivide a whole GPU like you can subdivide a CPU core's time (MIG, in the next lesson, is the exception).

## What happens if there aren't enough GPUs

```
$ kubectl get pods
NAME            READY   STATUS    RESTARTS   AGE
training-job    0/1     Pending   0          2m

$ kubectl describe pod training-job
...
Events:
  Warning  FailedScheduling  2m  default-scheduler
  0/4 nodes are available: 4 Insufficient nvidia.com/gpu.
```

A pod requesting a GPU that no node can currently satisfy stays `Pending` indefinitely rather than running degraded or without one — Kubernetes treats `nvidia.com/gpu: 1` as a hard requirement, exactly like it would treat an unsatisfiable CPU or memory request.

## Checking what the cluster actually has

```
$ kubectl describe node gpu-node-1 | grep -A5 "Capacity\|Allocatable"
Capacity:
  nvidia.com/gpu:  8
Allocatable:
  nvidia.com/gpu:  8
```

This confirms the device plugin successfully registered 8 GPUs on this node, and none are currently allocated to other pods.

## Key terms

- **NVIDIA device plugin** — a Kubernetes component that discovers GPUs on a node and advertises them as a schedulable resource
- **Extended resource** — Kubernetes's mechanism for schedulable resources beyond built-in CPU/memory, like `nvidia.com/gpu`
- **`resources.limits.nvidia.com/gpu`** — the pod spec field requesting whole GPUs; limit equals request for this resource type
- **`Pending` status** — a pod's state when no node currently satisfies its resource request
- **`kubectl describe node`** — the command showing a node's GPU capacity and current allocation
