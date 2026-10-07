# Script — Kubernetes RBAC

## Segment 1 (title)

Northbridge Retail's checkout and inventory services run in Kubernetes, where "who can do what" is governed by its own RBAC system — the same idea as Azure RBAC or AWS IAM, expressed in cluster-native YAML. This lesson covers the four building blocks: Roles, RoleBindings, ClusterRoles, and ClusterRoleBindings.

## Segment 2 (steps)

Every rule answers the same question in cluster terms: what resource, in what API group, can have what verb performed on it — get, list, watch, create, update, delete. A Role bundles those rules and scopes them to one namespace. A ClusterRole is the same shape without that boundary.

## Segment 3 (code)

This Role grants read-only access to pods, and only inside the checkout namespace. It doesn't touch Secrets, Deployments, or anything in another namespace — the rule is exactly as narrow as it looks.

## Segment 4 (code)

A Role by itself grants nothing — it's a definition, not an assignment. A RoleBinding is what actually connects a subject, here a service account, to that Role's permissions, and still only within the RoleBinding's own namespace.

## Segment 5 (code)

A ClusterRole uses the identical shape but applies cluster-wide, so it's reserved for genuinely cluster-wide needs — a monitoring agent reading metrics everywhere, not a single service's routine access to its own namespace.

## Segment 6 (outro)

Northbridge Retail keeps checkout, inventory, and its other services isolated by binding namespaced Roles instead of reaching for ClusterRoles by default. Next up: workload identity, which removes long-lived credentials from the picture entirely.
