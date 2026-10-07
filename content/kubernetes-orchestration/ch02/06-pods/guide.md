# Pods

Every lesson in Chapter 1 mentioned Pods without fully defining one. This lesson fixes that: the Pod is the smallest thing you can actually deploy in Kubernetes — not the container itself. Understanding why Kubernetes adds this extra layer, instead of scheduling containers directly, explains a lot of what comes later in this course.

## What you'll learn

- Why Kubernetes schedules Pods, not containers, as its smallest deployable unit
- What a Pod actually gives its containers: shared network and shared storage
- When Northbridge would legitimately put more than one container in a single Pod
- A Pod's lifecycle phases, and why Pods are meant to be disposable

## A Pod is one or more containers that share a network and storage

A Pod wraps one or more containers that always get scheduled together, onto the same node, and share two things:

- **Network** — every container in a Pod shares one IP address and one port space. They talk to each other over `localhost`, not through the cluster network.
- **Storage** — a Pod can define volumes that every container inside it can mount, for sharing files between containers in the same Pod.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: checkout-pod
  labels:
    app: checkout
spec:
  containers:
    - name: checkout
      image: northbridgeretail/checkout:1.4.0
      ports:
        - containerPort: 8080
```

## Why not just schedule containers directly?

Some of Northbridge's services need a helper process running tightly alongside the main one — a log shipper reading the checkout container's logs, or a proxy handling TLS before traffic reaches it. That helper needs to start and stop with the main container, share its network namespace, and live on the same node. The Pod is Kubernetes's answer: a unit of co-scheduling, not just a wrapper around one container.

```yaml
spec:
  containers:
    - name: checkout
      image: northbridgeretail/checkout:1.4.0
    - name: log-shipper
      image: northbridgeretail/log-shipper:2.1.0
```

Most Pods, including most of Northbridge's, still run exactly one container — multi-container Pods are the exception, reserved for genuinely tight coupling, not a general-purpose way to group unrelated services.

## You almost never create a Pod directly

Running `kubectl apply -f checkout-pod.yaml` creates exactly one Pod — and if that Pod's node dies, nothing replaces it. In practice, you'll create Pods through a higher-level controller (a Deployment, in Lesson 7) that manages a whole set of identical Pods and recreates them on failure. Learning the Pod spec here matters because every one of those higher-level objects embeds a Pod template inside it — it's the same `spec.containers` block, just nested one level deeper.

## Pod lifecycle and why Pods are disposable

A Pod moves through phases: `Pending` (scheduled but not yet running), `Running` (at least one container started), `Succeeded` or `Failed` (for Pods that run to completion), and eventually gone. Critically, a Pod that fails is never "restarted in place" and given a new identity — a replacement Pod gets scheduled, with a new name and often a new IP. Nothing in a well-built system should assume a specific Pod will survive; Chapter 3's Services exist precisely to give a stable address to a set of Pods that keep coming and going underneath it.

```bash
kubectl get pods -o wide            # see Pod name, phase, node, and IP
kubectl describe pod checkout-pod   # phase history and Events
```

## Key terms

- **Pod** — the smallest deployable unit in Kubernetes; one or more containers sharing network and storage, always scheduled together
- **Multi-container Pod** — a Pod running more than one tightly coupled container, such as a main process plus a log-shipping sidecar
- **Pod phase** — a Pod's lifecycle stage: Pending, Running, Succeeded, Failed
- **Disposable Pod** — the principle that a failed Pod is replaced by a new Pod, not restarted in place, so nothing should depend on a specific Pod's identity surviving
