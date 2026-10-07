# StatefulSets

Everything so far in this chapter assumed Pods are interchangeable — any checkout Pod can replace any other, with no memory of which one it was. That assumption breaks for a database. If Northbridge runs a clustered database inside Kubernetes (its primary read replica, say), Pod identity and storage have to persist across restarts. That's what StatefulSet is for.

## What you'll learn

- The three guarantees a Deployment doesn't give you, that StatefulSet does
- How StatefulSet Pod names and network identity work
- How a StatefulSet pairs with persistent storage through `volumeClaimTemplates`
- When to actually reach for StatefulSet instead of Deployment

## What Deployment Pods don't give you

A Deployment's Pods are deliberately interchangeable: `checkout-7d9f8c6b5d-x2n4p` today might be replaced tomorrow by `checkout-7d9f8c6b5d-m8k1q` — different name, different IP, same role. That's fine for a stateless web service. It's not fine for, say, a replicated database where each replica needs:

- **A stable, predictable name** — not a random suffix
- **Stable storage** — the exact same volume, reattached, even after the Pod is recreated
- **Ordered startup/shutdown** — replica 0 (often the primary) should come up before replica 1, and shut down last

## StatefulSet gives Pods a stable identity

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: catalog-db
spec:
  serviceName: catalog-db
  replicas: 3
  selector:
    matchLabels:
      app: catalog-db
  template:
    metadata:
      labels:
        app: catalog-db
    spec:
      containers:
        - name: catalog-db
          image: postgres:16
          ports:
            - containerPort: 5432
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 20Gi
```

Instead of random suffixes, Pods are named predictably: `catalog-db-0`, `catalog-db-1`, `catalog-db-2`. Combined with a **headless Service** (`clusterIP: None`, covered further in Chapter 3), each Pod also gets a stable DNS name — `catalog-db-0.catalog-db` — that resolves to that specific Pod, not a random one from the set.

## Stable storage via volumeClaimTemplates

This is the part Deployments can't replicate. `volumeClaimTemplates` tells Kubernetes to create a separate PersistentVolumeClaim for each replica — `data-catalog-db-0`, `data-catalog-db-1`, and so on — and when `catalog-db-1` is recreated after a crash, it reattaches to the *same* claim, `data-catalog-db-1`, not a fresh empty volume. The data survives the Pod. PersistentVolumeClaims get their own full treatment in Chapter 4.

## Ordered, one-at-a-time rollout

By default, StatefulSet starts Pods in order — 0, then 1, then 2 — waiting for each to be Running and Ready before starting the next, and scales down or rolls out updates in reverse order, highest ordinal first. This matters for databases where a replica needs its primary already up before it can safely join.

## When to reach for StatefulSet

Northbridge's checkout and product-catalog application servers stay on Deployment — they're stateless, interchangeable, and don't need any of this. StatefulSet is for the pieces underneath them that genuinely hold state and care about identity: a self-managed database cluster, a message queue cluster like Kafka, anything where "which specific replica" matters. In practice, many teams run managed services (Azure Database, Amazon RDS) instead of self-hosting a stateful workload in Kubernetes at all — StatefulSet exists for when that's not an option.

## Key terms

- **StatefulSet** — manages Pods with stable, predictable names, stable per-Pod storage, and ordered startup/shutdown
- **Headless Service** — a Service with no cluster IP, used to give StatefulSet Pods individually addressable DNS names
- **volumeClaimTemplates** — a per-replica PersistentVolumeClaim template, ensuring each Pod keeps the same storage across restarts
- **Ordinal** — the stable numeric suffix (0, 1, 2…) identifying each Pod in a StatefulSet
