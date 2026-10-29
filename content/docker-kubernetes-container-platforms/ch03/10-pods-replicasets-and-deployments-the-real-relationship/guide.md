# Lesson 10 — Pods, ReplicaSets, and Deployments: The Real Relationship

**Chapter 3 · Kubernetes Architecture & Core Objects · Lesson 2 of 4**

## What you'll learn

- What a **Pod** actually is, and why it's the smallest deployable unit
  in Kubernetes rather than a single container
- Why a **ReplicaSet** exists on top of a Pod, and exactly what its
  reconciliation loop does
- Why a **Deployment** exists on top of a ReplicaSet, and what it adds
  that a ReplicaSet alone cannot do
- How to read the real parent/child relationship between these three
  objects with `kubectl get` and `kubectl describe`

## A Pod is not a container

A **Pod** is the smallest unit Kubernetes schedules and runs — but a Pod
isn't a container, it's a wrapper around one or more containers that always
get scheduled together, onto the same node, sharing the same network
namespace (so they can reach each other on `localhost`) and optionally the
same storage volumes. Most Pods wrap exactly one container; multi-container
Pods exist for tightly coupled helper patterns like a sidecar that ships
logs for the main application container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  containers:
    - name: web-app
      image: myregistry.azurecr.io/web-app:1.4.2
      ports:
        - containerPort: 8080
```

Apply that and you get exactly one Pod — no self-healing, no scaling. If
the node it's on dies, the Pod dies with it and nothing brings it back.
That's the gap the next layer fills.

## A ReplicaSet exists to keep N copies running

A **ReplicaSet** wraps a Pod template and a replica count, and runs one
reconciliation loop: "how many Pods matching this template currently
exist, versus how many should?" If a Pod disappears — the node fails, the
Pod is deleted, anything — the ReplicaSet's controller notices on its next
reconcile pass and creates a replacement. It never *edits* a running Pod;
it only ever creates or deletes whole Pods to match the count.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: web-app-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web-app
          image: myregistry.azurecr.io/web-app:1.4.2
          ports:
            - containerPort: 8080
```

Notice the `selector` — it's how the ReplicaSet decides which Pods belong
to it, by label, not by name. That matters: Kubernetes objects are linked
by label matching almost everywhere, not by any hierarchical pointer.

Prove the self-healing behavior yourself:

```
kubectl apply -f replicaset.yaml
kubectl get pods -l app=web-app
kubectl delete pod web-app-rs-k2j9m
kubectl get pods -l app=web-app
```

The deleted Pod's replacement appears within seconds, with a new random
suffix — the ReplicaSet never noticed *which* Pod was removed, only that
the count dropped from 3 to 2, and acted to fix it.

## A Deployment exists to manage ReplicaSets, not Pods

So why does almost nobody write a bare ReplicaSet? Because a ReplicaSet
has no idea how to change its own Pod template safely. If you edit the
image in a ReplicaSet's spec, existing Pods keep running the old image
forever — a ReplicaSet only reconciles *count*, never *content*. Rolling
out a new version with a bare ReplicaSet means manually deleting Pods one
at a time and hoping you don't take the whole app down mid-rollout.

A **Deployment** sits one layer above the ReplicaSet and manages the part
a ReplicaSet can't: controlled change over time. When you update a
Deployment's Pod template — a new image tag, new env vars, anything — the
Deployment creates a *brand-new* ReplicaSet with that template, scales it
up gradually while scaling the old ReplicaSet down, and deletes the old
ReplicaSet once the new one is fully healthy. That's a rolling update,
covered in full in Lesson 12 — but the mechanism only exists because a
Deployment owns ReplicaSets, and a ReplicaSet owns Pods.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web-app
          image: myregistry.azurecr.io/web-app:1.4.2
          ports:
            - containerPort: 8080
```

That YAML is almost identical to the ReplicaSet above — `kind: Deployment`
is the only structural difference, because a Deployment's spec *is*
mostly a ReplicaSet template plus rollout settings.

## Seeing the real parent/child chain

```
kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get replicasets
kubectl get pods --show-labels
```

```
NAME             READY   UP-TO-DATE   AVAILABLE
web-app          3/3     3            3

NAME                        DESIRED   CURRENT   READY
web-app-7d9f8c6b5d          3         3         3

NAME                        READY   STATUS
web-app-7d9f8c6b5d-x2k9p    1/1     Running
web-app-7d9f8c6b5d-j4m2q    1/1     Running
web-app-7d9f8c6b5d-p9k1z    1/1     Running
```

The naming tells the story: the Deployment `web-app` created a ReplicaSet
named `web-app-7d9f8c6b5d` (a hash of its Pod template), which created
three Pods each named `<replicaset-name>-<random-suffix>`. Run
`kubectl describe pod web-app-7d9f8c6b5d-x2k9p` and the `Controlled By`
field under `Metadata` names the ReplicaSet directly — the chain is
explicit, visible, and nothing is hidden from you.

## Key terms

| Term | Meaning |
|---|---|
| Pod | The smallest deployable unit — one or more containers sharing a network namespace, scheduled together |
| ReplicaSet | Ensures a fixed number of Pods matching a label selector exist; reconciles count, never content |
| Deployment | Manages ReplicaSets over time; creates a new ReplicaSet per template change to drive rolling updates |
| Label selector | How a ReplicaSet/Deployment identifies "its" Pods — by label match, not by name or pointer |
| `Controlled By` | The field in `kubectl describe pod` output showing which object owns a given Pod |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: what
does a ReplicaSet's reconciliation loop actually check and fix, what can a
Deployment do that a bare ReplicaSet cannot, and why editing a running
Deployment creates an entirely new ReplicaSet instead of modifying Pods
in place.
