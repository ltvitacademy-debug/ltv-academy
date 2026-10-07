# Script — RBAC

## Segment 1 (title)

Namespaces keep names and quotas separate, but they don't stop anyone with cluster access from reading or deleting another team's Secrets. RBAC — role-based access control — is how Northbridge decides who can do what, on which objects, in which namespace.

## Segment 2 (code)

A Role grants permissions inside one namespace. Here, the analytics team gets get, list, and watch on Pods and their logs — read-only, nothing else. apiGroups covers what kind of resource, resources says which ones, verbs says what action is allowed.

## Segment 3 (steps)

A Role by itself grants nothing until a RoleBinding attaches it to a subject — a user, a group, or a ServiceAccount. Priya's RoleBinding only exists in the analytics namespace, so she can read Pods there and has zero permissions anywhere else, like checkout.

## Segment 4 (steps)

Sometimes one namespace isn't the right boundary. A ClusterRole defines the same kind of rules without being tied to a namespace, and a ClusterRoleBinding applies it across the whole cluster at once — useful for Northbridge's platform team, which needs read access everywhere for on-call troubleshooting.

## Segment 5 (code)

You don't have to guess whether a permission is working. kubectl auth can-i, with --as to impersonate a user, answers directly: can Priya list Pods in analytics? Yes. Can she delete Secrets in checkout? No — exactly the least-privilege result the Role and RoleBinding were written to produce.

## Segment 6 (outro)

RBAC isn't only for human users. Next up, lesson twenty-six: Service Accounts, the identity Pods themselves use to talk to the Kubernetes API.
