# Lesson 25 — Kubernetes RBAC: Roles, RoleBindings, and Service Accounts

**Chapter 7 · Kubernetes Security & RBAC · Lesson 1 of 4**

## What you'll learn

- How Kubernetes decides whether a request is **allowed**, and why RBAC is
  the authorization layer almost every cluster uses to make that decision
- The difference between a `Role` and a `ClusterRole`, and between a
  `RoleBinding` and a `ClusterRoleBinding`
- How to write a least-privilege `Role` from scratch instead of reaching
  for a built-in `admin` or `cluster-admin` binding
- What a `ServiceAccount` actually is, and why it's the identity a Pod
  uses to talk to the API server — not a Linux user, not your kubeconfig
- How to check "can this identity actually do that?" with
  `kubectl auth can-i` before you find out the hard way

## Authentication vs. authorization

Every request that hits the Kubernetes API server goes through two
separate questions. **Authentication** asks "who are you?" — answered by
a client certificate, a bearer token, or an OIDC identity (Lesson 27
covers this side in depth). **Authorization** asks "is that identity
allowed to do *this*?" — and that's RBAC's job. A request can authenticate
perfectly and still get a `403 Forbidden` because RBAC never granted it
permission. RBAC is additive-only: there's no "deny" rule, only rules that
grant. If no rule matches, the request is denied by default.

## Role: namespaced permissions

A `Role` grants permissions scoped to a single namespace. It's built from
three things: which API groups, which resources, and which verbs.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: payments
  name: pod-reader
rules:
  - apiGroups: [""]
    resources: ["pods", "pods/log"]
    verbs: ["get", "list", "watch"]
```

`apiGroups: [""]` is the core API group (Pods, Services, ConfigMaps all
live there). Verbs map to HTTP-level operations: `get`/`list`/`watch` are
read-only, `create`/`update`/`patch`/`delete` are write. This `Role` can
only ever act inside the `payments` namespace — it has no reach anywhere
else, even if someone binds it incorrectly.

## ClusterRole: cluster-scoped, or reusable everywhere

A `ClusterRole` has no namespace. It's used two ways: granting permission
on cluster-scoped resources (nodes, PersistentVolumes, namespaces
themselves — none of which belong to a namespace), or defining a reusable
set of rules that gets bound per-namespace later via a `RoleBinding`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: node-viewer
rules:
  - apiGroups: [""]
    resources: ["nodes"]
    verbs: ["get", "list", "watch"]
```

Kubernetes ships built-in ClusterRoles worth knowing by name: `view`
(read-only, no Secrets), `edit` (read/write, no RBAC objects), `admin`
(read/write including RBAC within a namespace), and `cluster-admin`
(unrestricted, every verb, every resource, every namespace). `kubectl get
clusterrole cluster-admin -o yaml` shows it's just `resources: ["*"]`,
`verbs: ["*"]`, `apiGroups: ["*"]` — there's no magic, just a rule that
matches everything.

## Binding a Role or ClusterRole to a subject

A `Role` or `ClusterRole` grants nothing by itself — it has to be bound to
a **subject**: a `User`, a `Group`, or a `ServiceAccount`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: payments
subjects:
  - kind: ServiceAccount
    name: billing-reader
    namespace: payments
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

A `RoleBinding` grants a `Role` (or a `ClusterRole`, scoped down to that
one namespace) inside its own namespace only. A `ClusterRoleBinding`
grants a `ClusterRole` across the whole cluster — that's the one to be
careful with, since it's how someone accidentally hands out
`cluster-admin` everywhere. Quick CLI equivalents for the same objects:

```
kubectl create role pod-reader --verb=get,list,watch --resource=pods -n payments
kubectl create rolebinding read-pods --role=pod-reader --serviceaccount=payments:billing-reader -n payments
```

## ServiceAccounts: identity for workloads, not people

A `ServiceAccount` is the identity a **Pod** uses when it calls the API
server — for example, a controller that watches for ConfigMap changes, or
a CI job that creates Deployments. Every namespace gets a `default`
ServiceAccount automatically, and every Pod that doesn't name one uses it
— which is exactly the problem: a cluster full of workloads sharing one
identity named `default` makes it impossible to tell which app did what,
and impossible to scope permissions per-workload. Create a dedicated one
instead:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: billing-reader
  namespace: payments
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: billing-job
  namespace: payments
spec:
  serviceAccountName: billing-reader
  automountServiceAccountToken: true
  containers:
    - name: app
      image: billing-reader:1.4
```

Since Kubernetes 1.22, mounted ServiceAccount tokens come from the
**TokenRequest API** by default: they're short-lived, audience-bound (only
valid for the API server, not replayable against some other service), and
auto-rotated — a real improvement over the old long-lived tokens that sat
in a Secret forever. If a Pod never calls the API server, set
`automountServiceAccountToken: false` so it isn't handed a token it has
no use for.

## Checking what an identity can actually do

Don't guess — ask the API server directly:

```
kubectl auth can-i delete pods --as=system:serviceaccount:payments:billing-reader -n payments
no

kubectl auth can-i get pods --as=system:serviceaccount:payments:billing-reader -n payments
yes
```

`kubectl auth can-i --list --as=...` dumps every verb/resource pair that
identity is granted — the fastest way to audit a binding you didn't write
yourself, or to double-check a Role before it ships.

## Key terms

| Term | Meaning |
|---|---|
| Role | Namespaced RBAC object listing allowed apiGroups/resources/verbs |
| ClusterRole | The same rule set, but cluster-scoped or reusable across namespaces |
| RoleBinding | Grants a Role (or a ClusterRole, scoped to one namespace) to a subject |
| ClusterRoleBinding | Grants a ClusterRole to a subject cluster-wide |
| ServiceAccount | The identity a Pod presents to the API server; not a human user |
| `kubectl auth can-i` | Queries the API server's own authorizer for what an identity can do |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
does binding a `ClusterRole` with a `RoleBinding` behave differently than
binding it with a `ClusterRoleBinding`, and why does every workload
deserve its own `ServiceAccount` instead of running as `default`?
