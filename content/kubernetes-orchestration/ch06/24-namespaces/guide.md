# Namespaces

Northbridge Retail's cluster started out running just catalog and checkout. Now the analytics team wants a place to run their own batch jobs on the same cluster, and nobody wants an analytics typo accidentally touching a checkout object named the same thing. A **Namespace** is how Kubernetes divides one physical cluster into multiple virtual ones, so separate teams and apps can share hardware without sharing a single flat pool of names.

## What you'll learn

- The problem Namespaces solve for a cluster shared by multiple teams
- How to create a Namespace and target it with `kubectl`
- Which resources are namespaced and which are cluster-scoped
- How a ResourceQuota caps what a namespace is allowed to consume

## One cluster, multiple teams

Without Namespaces, every Pod, Service, and ConfigMap in the cluster lives in one flat space named `default`. Two teams both naming something `worker` would collide. Worse, a `kubectl delete` run in the wrong context has no boundary to stop it from reaching another team's objects. Namespaces give each team (or each environment — `dev`, `staging`, `prod`) its own naming scope and a natural place to apply quotas and RBAC rules, which the next lesson builds on directly.

## Creating and using a Namespace

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: analytics
  labels:
    team: data-analytics
```

```bash
kubectl create namespace analytics
kubectl get pods -n analytics
kubectl get pods --all-namespaces
kubectl config set-context --current --namespace=analytics
```

That last command matters in daily practice — it changes your `kubectl` context's default namespace, so you stop having to type `-n analytics` on every command.

## What's namespaced and what isn't

Most everyday objects are namespaced: Pods, Deployments, Services, ConfigMaps, Secrets, ResourceQuotas, Roles. A smaller set of objects are cluster-scoped — they describe the cluster itself, not one team's slice of it: Nodes, PersistentVolumes, StorageClasses, Namespaces themselves, and ClusterRoles. `kubectl api-resources --namespaced=true` lists exactly which is which if you're ever unsure.

## Capping what a namespace can use

A ResourceQuota ties the requests and limits from Chapter 5 to a namespace boundary:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: analytics-quota
  namespace: analytics
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    pods: "20"
```

With this in place, the analytics namespace simply cannot schedule a Pod that would push it past 4 CPU or 20 Pods total, no matter who submits it — protecting checkout and catalog's share of the same cluster.

## Key terms

- **Namespace** — a virtual cluster-within-a-cluster that scopes names, quotas, and RBAC rules
- **Namespaced resource** — an object type that lives inside a specific Namespace (Pods, Services, Secrets)
- **Cluster-scoped resource** — an object type with no Namespace, describing the cluster itself (Nodes, PersistentVolumes)
- **ResourceQuota** — a per-namespace cap on total resource requests, limits, and object counts
