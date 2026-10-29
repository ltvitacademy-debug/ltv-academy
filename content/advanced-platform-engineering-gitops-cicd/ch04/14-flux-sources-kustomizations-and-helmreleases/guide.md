# Lesson 14 — Flux: Sources, Kustomizations, and HelmReleases

**Chapter 4 · GitOps in Practice · Lesson 2 of 4**

## What you'll learn

- How Flux splits GitOps into small, composable custom resources
  instead of one all-in-one object
- What a `GitRepository` source actually does, and why Flux treats
  "where the config lives" as a separate concern from "what to do
  with it"
- How a `Kustomization` resource reconciles one Kustomize-built path
  into the cluster
- How `HelmRepository` and `HelmRelease` let Flux manage Helm charts
  declaratively from Git — the GitOps equivalent of running `helm
  install`/`helm upgrade` by hand, which you saw in the Helm Basics
  course

## Flux's composable model

Where ArgoCD bundles "where from, where to, how" into one
`Application` CRD, Flux splits the same job into separate, smaller
resources that each do one thing and reference each other. The two
you'll use constantly are a **Source** (where config comes from) and
a **Kustomization** (what to do with it once it's there). A third,
`HelmRelease`, extends the same pattern to Helm charts.

## `GitRepository` — the source

A `GitRepository` tells Flux's source-controller to clone a repo and
keep a local copy fresh:

```yaml
apiVersion: source.toolkit.fluxcd.io/v1
kind: GitRepository
metadata:
  name: gitops-config
  namespace: flux-system
spec:
  interval: 1m
  url: https://github.com/acme/gitops-config.git
  ref:
    branch: main
```

`interval` controls how often Flux polls for new commits — here,
every minute. The controller fetches the repo, verifies it, and
exposes the result as an **artifact** that other resources can
reference by name. Notice that a `GitRepository` doesn't deploy
anything by itself — it only makes the content available. That
separation is deliberate: one source can feed multiple
`Kustomization`s or `HelmRelease`s without re-cloning for each.

## `Kustomization` — reconciling a path

A Flux `Kustomization` (not to be confused with a plain `kustomize`
`kustomization.yaml` file — this is a CRD that *uses* one) tells
Flux's kustomize-controller which path inside a source to build and
apply:

```yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: payments-api-prod
  namespace: flux-system
spec:
  interval: 5m
  sourceRef:
    kind: GitRepository
    name: gitops-config
  path: ./apps/payments-api/overlays/prod
  prune: true
  targetNamespace: payments
```

`sourceRef` points back at the `GitRepository` by name — this is how
the two resources connect. `path` is the directory Flux runs
`kustomize build` against (typically a Kustomize overlay for one
environment, same idea you'll use in the next lesson). `prune: true`
is Flux's equivalent of ArgoCD's prune flag: resources removed from
that path get deleted from the cluster on the next reconciliation.
Because the source and the reconciler are separate objects, you can
point several `Kustomization`s at different paths in the same
`GitRepository` — one per environment, or one per application — all
polling independently.

## `HelmRelease` — Helm charts via GitOps

Course 9 covered running `helm install` and `helm upgrade` by hand
from the CLI. Flux's `HelmRelease` CRD gives you the declarative,
Git-driven version of the exact same operation. It needs a chart
source — usually a `HelmRepository` — and a `HelmRelease` that points
at it:

```yaml
apiVersion: source.toolkit.fluxcd.io/v1
kind: HelmRepository
metadata:
  name: bitnami
  namespace: flux-system
spec:
  interval: 1h
  url: https://charts.bitnami.com/bitnami
---
apiVersion: helm.toolkit.fluxcd.io/v2
kind: HelmRelease
metadata:
  name: redis
  namespace: flux-system
spec:
  interval: 10m
  chart:
    spec:
      chart: redis
      version: "19.x"
      sourceRef:
        kind: HelmRepository
        name: bitnami
  values:
    architecture: standalone
```

Flux's helm-controller watches this `HelmRelease`, fetches the
specified chart and version from the `HelmRepository`, renders it
with the `values` block, and installs or upgrades it in the cluster —
no one ever runs `helm` from a laptop. The chart version and the
values are both committed to Git, so a chart upgrade is a pull
request and a code review, not an ad hoc command someone ran once and
forgot about.

## Why the split matters

Separating Source, Kustomization, and HelmRelease means each
reconciliation loop is independent and individually observable —
`flux get sources git`, `flux get kustomizations`, and `flux get
helmreleases` each give you a focused status view, instead of one
monolithic object trying to represent plain manifests and Helm charts
with the same fields. The tradeoff is more YAML to read for a given
app, in exchange for pieces that compose cleanly.

## Key terms

| Term | Meaning |
|---|---|
| `GitRepository` | Flux source resource: clones and polls a Git repo, exposes it as an artifact other resources reference |
| `Kustomization` (Flux CRD) | Reconciler resource: builds a Kustomize path from a source and applies/prunes it in the cluster |
| `HelmRepository` | Source resource for a Helm chart repository (the chart index), analogous to `GitRepository` |
| `HelmRelease` | Declarative, Git-driven equivalent of `helm install`/`helm upgrade`, managed by Flux's helm-controller |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
does Flux separate a `GitRepository` from a `Kustomization` instead
of combining them into one resource, and what does a `HelmRelease`
let you do that running `helm upgrade` from a laptop does not?
