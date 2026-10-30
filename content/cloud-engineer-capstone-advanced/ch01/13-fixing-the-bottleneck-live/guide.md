# Lesson 13 — Fixing the Bottleneck Live

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 13 of 26**

## What you'll learn

- The real `topologySpreadConstraints` block Theo adds to the
  `checkout-api` Deployment spec, and what each field actually means
- Why a topology spread constraint is the right fix here, instead of
  just scaling up replicas or restarting pods
- What happens mechanically when you `kubectl apply` a Pod-template
  change to a Deployment that's serving live traffic, mid-sale
- Why the existing PodDisruptionBudget matters just as much as the fix
  itself, during a change like this one

## Why scaling up or restarting would not fix this

The tempting shortcut during a live incident is to just add more
replicas, or delete the overloaded pods and let the ReplicaSet
recreate them. Neither one touches the actual root cause. More
replicas, scheduled with the same missing constraint, can just as
easily land unevenly again. Deleting and recreating pods with no
spread rule in place gives `kube-scheduler` zero new information — it's
free to re-create the exact same imbalance a few minutes later, this
time with a brief outage in between. The only fix that addresses the
root cause is telling the scheduler, explicitly, how pods are allowed
to be distributed.

## The fix: a topology spread constraint

Theo edits the `checkout-api` Deployment's Pod template to add a
`topologySpreadConstraints` block:

```yaml
spec:
  template:
    spec:
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: DoNotSchedule
          labelSelector:
            matchLabels:
              app: checkout-api
```

Each field is doing real work:

| Field | What it means here |
|---|---|
| `maxSkew: 1` | The pod count in the most-loaded zone can differ from the least-loaded zone by at most 1 |
| `topologyKey: topology.kubernetes.io/zone` | Spread evenly across this node label — Azure availability zones |
| `whenUnsatisfiable: DoNotSchedule` | If no zone can satisfy the skew, leave the pod **Pending** rather than violate the spread |
| `labelSelector.matchLabels.app: checkout-api` | Only counts other `checkout-api` pods when computing skew — not every pod in the cluster |

With `maxSkew: 1` and three zones holding twelve replicas, the only
distributions the scheduler will now accept put each zone within one
pod of the others — in practice, four pods per zone.

## Applying it live, safely

`kubectl apply` on a changed Pod template doesn't restart pods in
place — it creates a new ReplicaSet with the new template and performs
a rolling update, scaling the new ReplicaSet up and the old one down
gradually. That rolling behavior is exactly why this is safe to do
mid-sale: it's governed by the `checkout-api` Deployment's existing
`RollingUpdate` strategy and, just as importantly, by the
**PodDisruptionBudget** the team set during Lesson 8's load-testing
work, which guarantees a minimum number of `checkout-api` pods stay
available throughout. Theo confirms the PDB is in place before
applying anything — the fix for an availability problem should never
itself cause a worse availability problem.

```
kubectl apply -f checkout-api-deployment.yaml
kubectl rollout status deployment/checkout-api -n driftwood
```

As the rollout proceeds, new pods come up under the spread constraint
and old, unevenly-placed pods terminate one at a time, never dropping
below the PDB's minimum available count.

## Key terms

| Term | Meaning |
|---|---|
| `topologySpreadConstraints` | A Deployment-level rule that limits how unevenly pods can be spread across a topology key |
| `maxSkew` | The maximum allowed difference in matching-pod count between the most- and least-loaded topology domain |
| `whenUnsatisfiable: DoNotSchedule` | Tells the scheduler to leave a pod Pending rather than break the spread rule |
| PodDisruptionBudget (PDB) | A guarantee of minimum available replicas during voluntary disruptions like a rolling update |

## Lab

1. Rewrite the `topologySpreadConstraints` block from memory, and
   explain each of its four fields in one sentence each.
2. Explain why deleting the overloaded pods, without this change,
   would not have fixed the underlying problem.
3. Explain what role the PodDisruptionBudget plays while this fix is
   rolling out live.

## Check yourself

You're ready for Lesson 14 when you can explain, without looking, what
`maxSkew: 1` actually guarantees across three zones and twelve
replicas, and why applying this fix safely depends on the rolling
update strategy and the PodDisruptionBudget working together.
