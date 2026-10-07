# Service Accounts

RBAC so far has been about human users like Priya. But Northbridge also has a `catalog-sync` Pod that calls the Kubernetes API directly, to read a ConfigMap and republish it — and that Pod needs its own identity to authenticate with, separate from any person. That identity is a **ServiceAccount**.

## What you'll learn

- Why every Pod already has an identity, even if nobody configured one
- How to create a dedicated ServiceAccount for a Pod and bind permissions to it
- How a Pod authenticates to the API server using its ServiceAccount's token
- When to turn automatic token mounting off

## Every Pod already has one

Any Pod that doesn't specify a ServiceAccount is automatically assigned the `default` ServiceAccount of its namespace, which Kubernetes mounts a token for at `/var/run/secrets/kubernetes.io/serviceaccount/`. That default account typically has no RBAC permissions bound to it — harmless by default, but it's still an identity, and relying on it for a Pod that genuinely needs API access mixes that Pod's permissions in with everything else using `default`.

## Creating a dedicated ServiceAccount

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: catalog-sync
  namespace: catalog
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: configmap-reader
  namespace: catalog
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: catalog-sync-configmaps
  namespace: catalog
subjects:
  - kind: ServiceAccount
    name: catalog-sync
    namespace: catalog
roleRef:
  kind: Role
  name: configmap-reader
  apiGroup: rbac.authorization.k8s.io
```

Notice the RoleBinding's `subjects` entry has `kind: ServiceAccount` instead of `kind: User` — everything else about binding a Role works exactly the same as Lesson 25.

## Using it from a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: catalog-sync
  namespace: catalog
spec:
  serviceAccountName: catalog-sync
  containers:
    - name: catalog-sync
      image: northbridge/catalog-sync:1.3
```

With `serviceAccountName: catalog-sync` set, Kubernetes mounts that ServiceAccount's token into the container. The application inside reads the token and presents it to the API server, which checks it against the RBAC rules bound to `catalog-sync` — get and list on ConfigMaps, nothing more.

## Turning off automatic mounting

Most Pods never call the Kubernetes API at all — a checkout Pod serving HTTP traffic has no reason to hold an API token. Set `automountServiceAccountToken: false` on the Pod or ServiceAccount to stop that token from being mounted where it isn't needed, shrinking what an attacker could use if the Pod were ever compromised.

## Key terms

- **ServiceAccount** — a non-human identity Pods use to authenticate to the Kubernetes API
- **default ServiceAccount** — automatically assigned to any Pod that doesn't specify one, usually with no permissions bound
- **Token** — the credential mounted into a Pod's filesystem, tied to its ServiceAccount
- **automountServiceAccountToken** — a setting that disables automatic token mounting for Pods that don't call the API
