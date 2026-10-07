# Kubernetes RBAC

Northbridge Retail's checkout and inventory services run in Kubernetes. Inside a cluster, "who can do what" is governed by its own RBAC system — conceptually the same idea as Azure RBAC or AWS IAM, but with its own objects and its own YAML. This lesson covers the four building blocks: Roles, RoleBindings, ClusterRoles, and ClusterRoleBindings.

## What you'll learn

- How Kubernetes RBAC rules are structured: API groups, resources, and verbs
- The difference between a Role and a ClusterRole
- How a RoleBinding connects a subject (user, group, or service account) to a Role
- Why namespace-scoped Roles are usually the least-privilege choice for a team like Northbridge Retail's

## Rules: API groups, resources, verbs

Every Kubernetes RBAC rule answers the same question Azure RBAC and AWS IAM policies answer, just in cluster-native terms: what **resource** (pods, secrets, deployments), in what **API group**, can have what **verb** (get, list, watch, create, update, delete) performed on it. A Role is just a named bundle of these rules, scoped to one namespace:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: checkout
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```

This Role grants read-only access to pods, and only within the `checkout` namespace. It doesn't grant access to Secrets, Deployments, or anything in another namespace — the rule is as narrow as it looks.

## Role vs. ClusterRole

A **Role** is namespaced: its rules apply only inside the one namespace it's defined in. A **ClusterRole** is the same idea without that boundary — its rules can apply cluster-wide, across every namespace (or to cluster-scoped resources like nodes, which have no namespace at all). The same YAML shape, with cluster-wide reach:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: secret-reader
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list"]
```

Because a ClusterRole's reach is so much broader, least privilege pushes most day-to-day access toward namespaced Roles instead. At Northbridge Retail, a ClusterRole is reserved for genuinely cluster-wide needs — a monitoring agent that reads metrics from every namespace, for example — not for a single service's routine access to its own namespace.

## RoleBindings: connecting a subject to a role

A Role or ClusterRole by itself grants nothing — it's a definition, not an assignment. A **RoleBinding** (or **ClusterRoleBinding**, for ClusterRoles applied cluster-wide) is what actually connects a subject — a user, a group, or a service account — to a Role's permissions:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: checkout
subjects:
- kind: ServiceAccount
  name: checkout-monitor
roleRef: {apiGroup: rbac.authorization.k8s.io, kind: Role, name: pod-reader}
```

This binds the `checkout-monitor` service account to the `pod-reader` Role, inside the `checkout` namespace only. Note that a RoleBinding can reference a ClusterRole too — doing so grants that ClusterRole's permissions, but still only within the RoleBinding's own namespace, which is a common and useful pattern for reusing a single well-defined ClusterRole across many namespaces without duplicating the rule set.

## Why namespace scope is usually the right default

Northbridge Retail runs checkout, inventory, and several other services as separate namespaces in the same cluster. A service account in the `checkout` namespace almost never needs access to resources in `inventory` — and a namespaced Role, bound with a RoleBinding, enforces exactly that boundary. Reaching for a ClusterRole and ClusterRoleBinding by default would quietly erase the isolation between services sharing the cluster, which is precisely the over-privileging that least privilege warns against.

## Key terms

- **Role** — a namespace-scoped set of RBAC rules (resources + verbs)
- **ClusterRole** — the same rule structure, applicable cluster-wide or to cluster-scoped resources
- **RoleBinding** — connects a subject to a Role (or a ClusterRole, scoped to one namespace)
- **ClusterRoleBinding** — connects a subject to a ClusterRole, applied cluster-wide
- **Verb** — the specific action permitted (get, list, watch, create, update, delete, and others)

## Recap

Kubernetes RBAC separates the rule definition (Role/ClusterRole) from the grant (RoleBinding/ClusterRoleBinding) — the same security-principal-plus-permissions-plus-scope shape you've now seen in Azure and AWS, expressed as YAML instead of a portal wizard or a JSON policy. Next up: workload identity, which replaces long-lived credentials for workloads running inside and alongside the cluster.
