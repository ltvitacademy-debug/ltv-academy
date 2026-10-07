# RBAC

The analytics namespace from the last lesson keeps names and quotas separate, but it doesn't stop anyone with cluster access from reading or deleting checkout's Secrets. **RBAC** — Role-Based Access Control — is how Northbridge decides *who* can do *what*, on *which* objects, in *which* namespace.

## What you'll learn

- The four RBAC objects: Role, RoleBinding, ClusterRole, ClusterRoleBinding
- How rules combine apiGroups, resources, and verbs to define a permission
- When to reach for a namespace-scoped Role versus a cluster-wide ClusterRole
- How to check what a user can actually do with `kubectl auth can-i`

## Role: permissions inside one namespace

A `Role` grants permissions scoped to a single namespace. Here, the analytics team gets read-only access to Pods and their logs — nothing else, and nowhere else:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: analytics
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
```

`apiGroups: [""]` means the core API group (Pods, Services, ConfigMaps, Secrets all live there). `resources` says *what*, `verbs` says *what kind of action* — `get`/`list`/`watch` is read-only; there's no `create`, `update`, or `delete` here.

## RoleBinding: attaching the Role to someone

A Role by itself grants nothing — it has to be bound to a user, group, or ServiceAccount:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: analytics-read-pods
  namespace: analytics
subjects:
  - kind: User
    name: priya@northbridgeretail.com
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

Priya can now `get`, `list`, and `watch` Pods — but only inside `analytics`. She has zero permissions in `checkout`, because the RoleBinding doesn't extend there.

## ClusterRole and ClusterRoleBinding: when it needs to span namespaces

A `ClusterRole` defines the same kind of rules but isn't tied to one namespace — it's used either for cluster-scoped resources (like Nodes) or when the same permission should apply across every namespace at once, via a `ClusterRoleBinding`. Northbridge's platform team, who needs to read Pods everywhere for on-call troubleshooting, gets a `ClusterRole` bound cluster-wide instead of one Role per namespace.

## Checking what a user can actually do

```bash
kubectl auth can-i list pods --namespace analytics --as priya@northbridgeretail.com
kubectl auth can-i delete secrets --namespace checkout --as priya@northbridgeretail.com
```

The first returns `yes`; the second returns `no` — exactly the least-privilege outcome the Role and RoleBinding above were written to produce.

## Key terms

- **Role** — a set of permission rules (apiGroups, resources, verbs) scoped to one namespace
- **RoleBinding** — attaches a Role to a user, group, or ServiceAccount within that namespace
- **ClusterRole** — the same kind of rules, usable cluster-wide or for cluster-scoped resources
- **ClusterRoleBinding** — attaches a ClusterRole across the whole cluster, not one namespace
