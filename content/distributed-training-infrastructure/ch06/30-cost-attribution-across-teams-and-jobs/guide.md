# Cost Attribution Across Teams & Jobs

Lesson 29 used the `training-lm` / `training-mm` namespace split to break GPU utilization down per team. This lesson uses the exact same split to answer a harder question: **who actually spent what, on a 512-GPU cluster that costs real money whether or not those GPUs are doing useful work?** Without an answer, every billing cycle turns into a dispute between the language-modeling and multimodal teams about whose job ran up the bill — and the Solara ML Platform team has no data to settle it.

## What you'll learn

- Why a single shared cluster makes cost attribution genuinely hard, not just a reporting afterthought
- How Kubecost allocates cost using Kubernetes-native concepts like namespace and resource requests
- How GPU cost specifically gets attributed to the pods that requested GPU resources
- What shared cluster overhead is, and how it gets split fairly between teams

## Why shared infrastructure makes this hard

On a single-tenant setup, the bill and the team are the same thing. On `solara-train`, 64 nodes serve two teams at once, and a given moment in time might have `training-lm` jobs on 40 nodes and `training-mm` jobs on 24 — a ratio that shifts hour to hour as jobs start, finish, and queue. There's no invoice line item that says "multimodal team: $14,200 this week." That number has to be *reconstructed* from what each team's pods actually consumed.

## Kubecost: allocating cost by Kubernetes-native concepts

**Kubecost** is the tool the Solara ML Platform team runs for this. It watches the cluster's resource requests and actual usage — CPU, memory, GPU, persistent volumes, network — and multiplies them by the infrastructure's real cost (cloud list price, or custom pricing for on-prem GPU nodes) to produce a cost breakdown by namespace, label, deployment, or any other Kubernetes-native grouping:

```bash
# Namespace-level view: what did each team's jobs cost this week?
kubectl get pytorchjobs -n training-lm
kubectl get pytorchjobs -n training-mm

# Kubecost aggregates cost against each namespace automatically,
# using the resource requests set in each PyTorchJob's pod spec
```

Because `training-lm` and `training-mm` are separate namespaces, this is close to free to set up correctly — Kubecost's default namespace-based allocation view already answers "what did each team spend" without any custom instrumentation, as long as every PyTorchJob's pods carry accurate resource requests.

## Attributing the expensive part: GPU cost

GPUs are by far the most expensive resource on `solara-train`, so getting GPU cost allocation right matters more than CPU or memory. Kubecost attributes a node's GPU cost to whichever pods actually request GPU resources on that node, proportional to how many GPUs each pod requested:

```yaml
resources:
  limits:
    nvidia.com/gpu: 8   # this pod's share of the node's GPU cost
```

A `training-lm` PyTorchJob pod requesting all 8 GPUs on a node is charged that node's full GPU cost; a job sharing a node (uncommon at Solara AI's scale, but possible on smaller jobs) is charged proportionally. This is also why Lesson 29's `DCGM_FI_DEV_GPU_UTIL` matters for cost conversations, not just performance ones: a team that's paying for 64 GPUs but only keeping them at 40% utilization is a cost problem as much as a throughput one.

## Shared overhead: the part that isn't obviously anyone's

Not every cost maps cleanly to one team — the Kubernetes control plane, shared monitoring infrastructure (Prometheus, Grafana, DCGM Exporter itself), and idle nodes waiting to be scheduled are real costs neither `training-lm` nor `training-mm` requested directly. Kubecost handles this as **shared cost**, allocated across tenant namespaces using a configurable method — most commonly proportional to each namespace's share of total resource consumption, so a team running twice as many jobs absorbs twice the shared overhead rather than splitting it evenly regardless of use.

## Key terms

- **Kubecost** — a tool that allocates Kubernetes cluster cost by namespace, label, or other Kubernetes-native grouping
- **Cost allocation** — reconstructing which team or job incurred which share of infrastructure cost
- **GPU cost attribution** — assigning a node's GPU cost to the pods that requested those GPUs
- **Shared cost** — infrastructure cost (control plane, shared monitoring) not attributable to one tenant, split proportionally

## Recap

Because `training-lm` and `training-mm` share one physical cluster, cost has to be reconstructed from resource requests and usage rather than read off a bill — which is exactly what Kubecost's namespace-based allocation does, with GPU cost attributed by request and shared overhead split proportionally. Next, Lesson 31 looks at observability one level up from raw metrics: watching the training jobs themselves.
