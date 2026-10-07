# Objects, YAML & the Declarative Model

Every lesson so far has used YAML files without fully explaining what's inside them. This lesson closes that gap: what a Kubernetes object actually is, the four fields every manifest shares, and why writing YAML and applying it is a fundamentally different habit than running imperative commands one at a time.

## What you'll learn

- The four top-level fields every Kubernetes object's YAML has in common
- What `apiVersion` and `kind` actually select, and why both have to be correct
- The difference between `spec` (what you want) and `status` (what's actually happening)
- Why Northbridge's platform team keeps manifests in version control instead of running one-off commands

## Every object, four fields

Open almost any Kubernetes YAML file and you'll find the same four top-level keys:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout-deployment
  namespace: checkout
  labels:
    app: checkout
spec:
  replicas: 3
  selector:
    matchLabels:
      app: checkout
  template:
    metadata:
      labels:
        app: checkout
    spec:
      containers:
        - name: checkout
          image: northbridgeretail/checkout:1.4.0
          ports:
            - containerPort: 8080
```

| Field | What it means |
|---|---|
| `apiVersion` | Which version of the Kubernetes API defines this kind of object (`apps/v1`, `v1`, `networking.k8s.io/v1`, etc.) |
| `kind` | What type of object this is — Deployment, Service, ConfigMap, and dozens more |
| `metadata` | Identifying information: name, namespace, labels, annotations |
| `spec` | The desired state you're declaring — what you want to be true |

A Deployment's YAML also comes back with a fifth field, `status`, once it's actually running in the cluster — but you never write `status` yourself. It's Kubernetes reporting back what's actually happening, for the controller manager (and you) to compare against `spec`.

## apiVersion and kind have to match exactly

`kind: Deployment` only exists under `apiVersion: apps/v1`. Get either one wrong — say, `apiVersion: v1` for a Deployment — and the API server rejects the manifest outright, because `v1` doesn't define a `Deployment` kind. This isn't a style preference; it's how the API server knows which schema to validate your YAML against and which controller should handle it.

```bash
kubectl explain deployment.spec          # ask the cluster itself what fields are valid
kubectl api-resources                    # list every kind and its apiVersion
```

## spec vs. status: the whole declarative model in two fields

This is the same reconciliation loop from Lesson 1, visible directly in an object's data:

- **spec** — what you declared you want (3 replicas of checkout running image `1.4.0`)
- **status** — what the cluster currently observes (2 replicas ready, 1 still starting)

The controller manager's entire job, for every object type, is narrowing the gap between those two fields until `status` matches `spec`. When it doesn't match for a while, that's your signal something is wrong — a bad image tag, a failing health check, insufficient cluster resources.

## Why YAML in version control, not one-off commands

Northbridge's platform team stores every manifest as `.yaml` files in a Git repository, applies changes through `kubectl apply -f`, and treats a manual `kubectl edit` or `kubectl scale` run directly against production as a last resort, not a habit. A file in Git is reviewable, diffable, and reproducible — rerun the same `apply` against a fresh cluster and you get the identical result. An imperative command run once leaves no record of what changed or why. Chapter 8's GitOps lesson takes this idea all the way, automating the `apply` step itself from the Git repository.

## Key terms

- **apiVersion** — the version of the Kubernetes API that defines a given object's schema
- **kind** — the type of object (Deployment, Service, ConfigMap, etc.)
- **metadata** — an object's name, namespace, labels, and annotations
- **spec** — the desired state you declare for an object
- **status** — the actual, observed state the cluster reports back; never written by hand
- **Declarative model** — describing `spec` once and letting controllers continuously reconcile `status` to match it
