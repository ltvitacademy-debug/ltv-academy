# Lesson 19 — StatefulSets: When a Deployment Isn't the Right Object

**Chapter 5 · Kubernetes Storage & Stateful Workloads · Lesson 3 of 4**

## What you'll learn

- Why a Deployment's Pods are deliberately interchangeable, and which
  real workloads break under that assumption
- What a **StatefulSet** guarantees instead: stable, predictable
  network identity and a dedicated, persistent volume per replica
- How `volumeClaimTemplates` gives each replica its own PVC instead of
  sharing one
- What ordered, one-at-a-time startup, scaling, and rolling updates
  actually look like, and why that ordering exists

## What a Deployment deliberately throws away

A Deployment's Pods are, by design, interchangeable. Scale a
Deployment from 3 to 5 replicas and Kubernetes creates two Pods with
randomly generated name suffixes, no guaranteed identity, and (as you
saw two lessons ago) a problem if they all tried to share one
ReadWriteOnce PVC. Scale it back down and any of the five might be the
one removed — there's no concept of "the third one." That's exactly
right for a stateless API server behind a Service, where any replica
can answer any request. It's exactly wrong for a workload where each
replica needs to be *individually addressable* and needs *its own*
durable storage that follows it across restarts — the canonical
example being a clustered database like Cassandra, MongoDB, or
PostgreSQL with replicas, where node 0 and node 1 play genuinely
different roles and each must keep its own data directory.

## StatefulSet: stable identity plus a PVC per replica

A StatefulSet gives you two guarantees a Deployment does not:

1. **Stable, predictable Pod names and network identity** — a
   StatefulSet named `postgres` with 3 replicas creates Pods literally
   named `postgres-0`, `postgres-1`, `postgres-2`, and each keeps that
   exact name across restarts and rescheduling. Paired with a
   **headless Service**, each Pod also gets a stable DNS name:
   `postgres-0.postgres.default.svc.cluster.local`.
2. **A dedicated PersistentVolumeClaim per replica**, created from a
   template rather than shared — `postgres-0` always reattaches to the
   same PVC and the same data it had before, even after being deleted
   and recreated.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: pgdata
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: pgdata
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: managed-premium-retain
        resources:
          requests:
            storage: 20Gi
```

## `volumeClaimTemplates`: one PVC per replica, not one shared PVC

This is the field that actually solves last lesson's "every replica
tries to mount the same RWO PVC" problem. Instead of a single
`volumes` block shared by every Pod, `volumeClaimTemplates` tells
Kubernetes to stamp out one PVC *per replica*, each named by
convention `<volumeClaimTemplate name>-<pod name>`:

```bash
kubectl get pvc
# pgdata-postgres-0   Bound   20Gi
# pgdata-postgres-1   Bound   20Gi
# pgdata-postgres-2   Bound   20Gi
```

`postgres-1` never touches `pgdata-postgres-0`'s disk. If `postgres-1`
is deleted and recreated — a node failure, a manual restart — the new
`postgres-1` Pod binds back to the *same* `pgdata-postgres-1` PVC, and
therefore the same data, which is precisely the guarantee a clustered,
stateful workload needs and a Deployment cannot give it.

## Ordered startup, scaling, and the `serviceName` requirement

A StatefulSet also starts, scales, and updates its Pods **in order**,
one at a time, by default: `postgres-0` must be `Running` and `Ready`
before `postgres-1` is created, and `postgres-1` before `postgres-2`.
Scaling down reverses the order, removing the highest-numbered replica
first. This matters for workloads where replica 0 often bootstraps a
cluster that later replicas join — many database operators assume
exactly this ordering. The `serviceName` field is mandatory and must
point at a **headless Service** (`clusterIP: None`) — this is what
gives each Pod its own resolvable DNS name rather than load-balancing
across all of them, which is the opposite of what a client connecting
to a specific replica, like `postgres-0` for writes, needs.

## Key terms

| Term | Meaning |
|---|---|
| StatefulSet | A workload controller giving each replica a stable, predictable name/identity and its own dedicated PVC |
| `volumeClaimTemplates` | Stamps out one PVC per replica (e.g. `pgdata-postgres-0`) instead of sharing a single volume |
| Headless Service | A Service with `clusterIP: None`, required by `serviceName`, giving each Pod its own DNS name instead of load-balancing |
| Ordered Pod management | Default behavior: Pods start/scale up in index order (0, 1, 2…) and scale down in reverse |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
does `volumeClaimTemplates` solve the problem of multiple replicas
needing their own storage, and what does deleting and recreating
`postgres-1` actually reattach to that a Deployment's Pods couldn't
guarantee?
