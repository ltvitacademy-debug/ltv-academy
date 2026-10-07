# ReplicaSets & Deployments

Lesson 6 ended with a warning: a bare Pod has nothing watching over it. This lesson introduces the two objects that fix that — ReplicaSet and Deployment — and explains why Northbridge's platform team will write Deployment YAML constantly, and ReplicaSet YAML almost never.

## What you'll learn

- What a ReplicaSet actually does, using labels to find and count its Pods
- Why Deployment exists as a layer on top of ReplicaSet, and what it adds
- How to scale a running Deployment, two different ways
- Why you create Deployments directly and let them manage ReplicaSets for you

## ReplicaSet: keep N identical Pods running

A ReplicaSet's entire job is simple: watch for Pods matching a label selector, and make sure exactly `replicas` of them exist at all times — creating new ones if there are too few, deleting extras if there are too many.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: checkout-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: checkout
  template:
    metadata:
      labels:
        app: checkout
    spec:
      containers:
        - name: checkout
          image: northbridgeretail/checkout:1.4.0
```

Notice the `selector` and the `template.metadata.labels` match — that's how the ReplicaSet recognizes which Pods belong to it, including Pods it didn't create itself.

## What a ReplicaSet does NOT do: updates

Here's the gap: if you change the `image` in a ReplicaSet's `template`, nothing happens to the Pods already running. A ReplicaSet counts and replaces failed Pods — it has no concept of rolling out a new version gradually. That gap is exactly what Deployment was built to close.

## Deployment: a ReplicaSet manager with rollout logic

A Deployment's YAML looks almost identical to a ReplicaSet's — same `selector`, same `template` — but a Deployment doesn't manage Pods directly. It manages ReplicaSets, and lets you change the Pod template safely:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout
spec:
  replicas: 3
  selector:
    matchLabels:
      app: checkout
  template:
    metadata:
      labels:
        app: checkout
    spec:
      containers:
        - name: checkout
          image: northbridgeretail/checkout:1.4.0
```

When you change `image: checkout:1.4.0` to `image: checkout:1.5.0` and reapply, the Deployment creates a *new* ReplicaSet with the new template, scales it up, and scales the old ReplicaSet down — the rolling update mechanics covered fully in Lesson 8. Run `kubectl get rs` on a healthy Deployment and you'll typically see the current ReplicaSet at full strength and old ones scaled to zero, kept around for rollback history.

## Scaling a Deployment

```bash
kubectl scale deployment checkout --replicas=10        # imperative — fine for a quick experiment
```

```yaml
spec:
  replicas: 10   # declarative — change the file, reapply, keep history in Git
```

The declarative route (edit the YAML, `kubectl apply -f`) is what Northbridge's platform team actually uses day to day, for the same reason Lesson 5 gave: it's reviewable and reproducible. `kubectl scale` is useful for an immediate, temporary adjustment, but it leaves no trace in version control.

## Why you create Deployments, not ReplicaSets

You will write Deployment YAML constantly throughout this course and almost never write ReplicaSet YAML directly. A Deployment creates and owns its ReplicaSets automatically — deleting a Deployment's ReplicaSet manually just causes the Deployment to create a new one. The lesson here isn't "avoid ReplicaSets," it's that ReplicaSet is the mechanism and Deployment is the interface you actually use.

## Key terms

- **ReplicaSet** — keeps a specified number of Pods matching a label selector running at all times; no rollout logic
- **Deployment** — manages ReplicaSets on your behalf and handles rolling out template changes safely
- **selector** — the label query a ReplicaSet/Deployment uses to identify which Pods belong to it
- **Rollout** — the process of replacing an old ReplicaSet's Pods with a new ReplicaSet's Pods, covered in Lesson 8
