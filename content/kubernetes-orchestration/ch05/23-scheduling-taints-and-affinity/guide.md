# Scheduling, Taints & Affinity

The default scheduler already picks a reasonable node for every Pod based on requests and available capacity, but "reasonable" isn't always "correct." Northbridge's GPU-backed recommendation service should only land on GPU nodes; its checkout replicas should spread across different nodes so one node failure doesn't take down the whole service. **Taints, tolerations, and affinity** give Northbridge direct control over exactly where Pods are, and aren't, allowed to go.

## What you'll learn

- The simplest placement control, `nodeSelector`, and its limits
- Node affinity, and how it's a more expressive version of the same idea
- How taints repel Pods, and how tolerations let specific Pods back in
- Pod affinity and anti-affinity for controlling Pods relative to *other* Pods

## nodeSelector: the simple case

The simplest way to constrain placement is `nodeSelector` — a Pod only schedules onto nodes matching every listed label:

```yaml
spec:
  nodeSelector:
    gpu: "true"
```

It works, but it's rigid: exact match only, no "prefer but don't require," no way to express "any of these labels."

## Node affinity: the same idea, more expressive

**Node affinity** replaces `nodeSelector` for anything beyond the simplest case, with two strengths: `requiredDuringSchedulingIgnoredDuringExecution` (a hard rule — behaves like `nodeSelector`) and `preferredDuringSchedulingIgnoredDuringExecution` (a soft preference — the scheduler tries, but still places the Pod elsewhere if no match exists):

```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: gpu
                operator: In
                values: ["true"]
```

"IgnoredDuringExecution" means a label change on a running node doesn't evict Pods already placed there — affinity is only checked at scheduling time.

## Taints and tolerations: repelling, not attracting

Where affinity *pulls* Pods toward certain nodes, a **taint** *repels* them. A node tainted this way rejects any Pod that doesn't explicitly tolerate it:

```bash
kubectl taint nodes gpu-node-1 gpu=true:NoSchedule
```

Only a Pod with a matching **toleration** can still be scheduled there:

```yaml
spec:
  tolerations:
    - key: "gpu"
      operator: "Equal"
      value: "true"
      effect: "NoSchedule"
```

Taint effects: `NoSchedule` (won't place new Pods without a toleration), `PreferNoSchedule` (tries to avoid it, a soft version), and `NoExecute` (evicts existing Pods that don't tolerate it, not just blocking new ones). Taints and tolerations are commonly combined with node affinity: affinity says "GPU Pods should want this node," while the taint says "and nothing else is welcome here."

## Pod affinity and anti-affinity: relative to other Pods

Node affinity places a Pod relative to node labels; **Pod affinity/anti-affinity** places it relative to *other Pods*. Spreading checkout replicas across nodes for resilience is **Pod anti-affinity**:

```yaml
spec:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        - labelSelector:
            matchLabels:
              app: checkout
          topologyKey: "kubernetes.io/hostname"
```

This tells the scheduler: don't place this Pod on a node that already has another Pod labeled `app: checkout`. The opposite, Pod affinity, co-locates Pods instead — useful for a cache sidecar that should run near its consuming app.

## Key terms

- **nodeSelector** — the simplest placement rule; exact label match required
- **Node affinity** — a more expressive version of nodeSelector, with required and preferred strengths
- **Taint** — applied to a node; repels Pods unless they have a matching toleration
- **Toleration** — applied to a Pod; allows it onto a node with a matching taint
- **Pod affinity/anti-affinity** — places a Pod relative to other Pods' labels, not node labels
