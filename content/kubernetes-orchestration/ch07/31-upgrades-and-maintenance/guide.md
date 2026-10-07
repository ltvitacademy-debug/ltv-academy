# Upgrades & Maintenance

Managed control planes don't mean "never think about upgrades." Kubernetes versions still age out, nodes still need patched OS images, and both AKS and EKS put Northbridge in the driver's seat for *when* an upgrade happens — because upgrading checkout's cluster badly is exactly how you take checkout offline.

## What you'll learn

- How to plan and run a control-plane and node-pool upgrade on AKS
- How the same two-step upgrade works on EKS
- Why node draining matters during any upgrade, on either platform
- How to keep an upgrade from becoming a checkout outage

## AKS: checking versions and upgrading

```bash
az aks get-upgrades --resource-group northbridge-rg --name northbridge-aks

az aks upgrade \
  --resource-group northbridge-rg \
  --name northbridge-aks \
  --kubernetes-version 1.29.2
```

`az aks upgrade` on the control plane first, then on each node pool, replaces nodes one at a time by default — cordoning and draining each old node, waiting for Pods to reschedule onto an already-upgraded node, before moving to the next. Node pools can also be set to **auto-upgrade** on a schedule, with a **planned maintenance window** so upgrades only happen, say, Saturday mornings when traffic is lowest:

```bash
az aks maintenanceconfiguration add \
  --resource-group northbridge-rg \
  --cluster-name northbridge-aks \
  --name default \
  --weekday Saturday --start-hour 3
```

## EKS: the same two steps

```bash
aws eks update-cluster-version \
  --name northbridge-eks \
  --kubernetes-version 1.29

aws eks update-nodegroup-version \
  --cluster-name northbridge-eks \
  --nodegroup-name standard-workers
```

Just like AKS, EKS upgrades the control plane first, independently of the node groups — the control plane can run one version ahead of its nodes for a while, which is exactly what makes a staged rollout possible instead of an all-at-once cutover. `update-nodegroup-version` then rolls new, patched nodes in while draining the old ones, following the same cordon-drain-reschedule pattern.

## Why node draining matters either way

A **drain** marks a node unschedulable and evicts its Pods gracefully, giving each one a chance to shut down cleanly and get rescheduled elsewhere *before* the node is actually removed. Skipping that step — just deleting nodes — means every Pod on that node dies at once, with no guarantee enough capacity exists elsewhere to absorb them immediately.

## Keeping an upgrade from becoming an outage

A **PodDisruptionBudget** (introduced briefly in Chapter 5) caps how many of checkout's replicas can be down at once during a voluntary disruption like a drain:

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: checkout-pdb
  namespace: checkout
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: checkout
```

With `minAvailable: 2` in place, the upgrade process itself respects it — it won't drain a node if doing so would drop checkout below two running replicas, slowing the rollout exactly where it needs to, rather than letting it move faster than checkout can tolerate.

## Key terms

- **Drain** — cordoning a node and gracefully evicting its Pods before removal, so they reschedule elsewhere first
- **Maintenance window** — a scheduled time range during which AKS is permitted to apply upgrades
- **Staged rollout** — upgrading the control plane before node pools/groups, so the cluster runs mixed versions briefly rather than all at once
- **PodDisruptionBudget** — a guardrail limiting how many replicas of a workload can be down simultaneously during a voluntary disruption like an upgrade
