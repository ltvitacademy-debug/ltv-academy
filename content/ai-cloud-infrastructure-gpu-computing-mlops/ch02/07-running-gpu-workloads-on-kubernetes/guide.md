# Lesson 7 — Running GPU Workloads on Kubernetes

**Chapter 2 · Provisioning GPU Infrastructure · Lesson 3 of 4**

## What you'll learn

- Why Kubernetes has no native concept of a GPU, and what the device
  plugin framework adds to fix that
- What the NVIDIA device plugin actually does, and how it makes
  `nvidia.com/gpu` a schedulable resource
- How to request a GPU in a pod spec, on top of the resource
  requests/limits model you already know from the Kubernetes course
- How to keep non-GPU pods off your (expensive) GPU nodes with node
  selectors and taints

## Kubernetes doesn't know what a GPU is

Recall from the Kubernetes course: the scheduler places pods onto
nodes based on declared resource requests — CPU and memory, expressed
in `resources.requests`/`resources.limits`. That model is built in.
GPUs are not. Out of the box, a node with 8 physical GPUs attached
looks to the scheduler exactly like a node with 0 GPUs — it has no
idea the hardware is even there, let alone how to hand it out safely
to competing pods.

## The device plugin framework

Kubernetes solves this generically with the **device plugin
framework**: a pluggable mechanism that lets vendor-specific code run
on each node, discover specialized hardware, and advertise it to the
kubelet as an **extended resource** — a named resource outside the
built-in CPU/memory model. NVIDIA's implementation is the **NVIDIA
device plugin**, which runs as a DaemonSet (one pod per GPU node),
discovers the physical GPUs on that node, and reports them to the
kubelet as `nvidia.com/gpu`.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nvidia-device-plugin-daemonset
  namespace: kube-system
spec:
  selector:
    matchLabels:
      name: nvidia-device-plugin-ds
  template:
    metadata:
      labels:
        name: nvidia-device-plugin-ds
    spec:
      tolerations:
        - key: nvidia.com/gpu
          operator: Exists
          effect: NoSchedule
      containers:
        - name: nvidia-device-plugin-ctr
          image: nvcr.io/nvidia/k8s-device-plugin:v0.16.2
          securityContext:
            allowPrivilegeEscalation: false
            capabilities:
              drop: ["ALL"]
          volumeMounts:
            - name: device-plugin
              mountPath: /var/lib/kubelet/device-plugins
      volumes:
        - name: device-plugin
          hostPath:
            path: /var/lib/kubelet/device-plugins
```

The device plugin assumes the node it's running on already has the
NVIDIA driver and Container Toolkit from the previous lesson installed
— it doesn't install those itself. In production, most teams install
all of this together with the **NVIDIA GPU Operator**, a Helm chart
that automates driver install, Container Toolkit configuration, and
device plugin deployment across a whole GPU node pool in one shot
rather than doing each node by hand.

Once the device plugin is running, confirm it worked with:

```
kubectl describe node gpu-node-01
```

and look for `nvidia.com/gpu` under both `Capacity` and `Allocatable`
— that's the extended resource now visible to the scheduler.

## Requesting a GPU in a pod spec

With the resource advertised, requesting it looks exactly like
requesting CPU or memory — same `resources` block you already know:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pytorch-training-job
spec:
  nodeSelector:
    accelerator: nvidia-a100
  containers:
    - name: trainer
      image: pytorch/pytorch:2.4.0-cuda12.1-cudnn9-runtime
      command: ["python", "train.py"]
      resources:
        limits:
          nvidia.com/gpu: 1
```

Two differences from ordinary resources are worth calling out
explicitly. First, `nvidia.com/gpu` is only meaningful as a `limits`
entry — Kubernetes doesn't allow a GPU request without a matching
limit, and the two must be equal; there's no such thing as "request
0.5, limit 1" the way there is for CPU. Second, GPUs are allocated as
**whole integers** by default — a pod asking for `1` gets exclusive
use of one entire physical GPU, never a fraction of one. The next
lesson covers how to change that.

## Keeping the wrong pods off GPU nodes

GPU nodes are the most expensive thing in the cluster, so you don't
want an ordinary web pod with no GPU request accidentally landing on
one just because it happened to have capacity. Two mechanisms, both
familiar from the Kubernetes course, handle this together: label GPU
nodes (for example `accelerator: nvidia-a100`) and use `nodeSelector`
to pull GPU pods onto them, and taint the GPU nodes (as the device
plugin DaemonSet's own toleration above assumes) so that only pods
with a matching toleration can be scheduled there at all. The pairing
matters — a selector alone pulls the right pods in, but a taint is
what actively keeps the wrong ones out.

## Key terms

| Term | Meaning |
|---|---|
| Device plugin framework | Kubernetes' pluggable mechanism for vendor code to discover specialized hardware and advertise it to the kubelet |
| Extended resource | A named, schedulable resource (like `nvidia.com/gpu`) outside the built-in CPU/memory model |
| NVIDIA device plugin | The DaemonSet that discovers GPUs on each node and reports them as `nvidia.com/gpu` |
| NVIDIA GPU Operator | A Helm chart that automates driver, Container Toolkit, and device plugin setup across a GPU node pool |
| Node taint + nodeSelector | The pairing that keeps non-GPU pods off GPU nodes while pulling GPU pods onto them |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
does `nvidia.com/gpu` have to be requested as `limits` rather than
`requests`, and what does "GPUs are allocated as whole integers by
default" actually mean for a pod that only needs a tenth of a GPU's
capacity?
