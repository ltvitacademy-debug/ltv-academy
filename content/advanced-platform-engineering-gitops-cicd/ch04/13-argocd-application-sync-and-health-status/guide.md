# Lesson 13 — ArgoCD: Application, Sync, and Health Status

**Chapter 4 · GitOps in Practice · Lesson 1 of 4**

## What you'll learn

- What the ArgoCD `Application` custom resource actually is, and the
  three fields (`source`, `destination`, `syncPolicy`) that define
  everything it does
- Why **Sync status** and **Health status** are two completely
  independent dimensions, and why an app can be `Synced` and
  `Degraded` at the same time — or `OutOfSync` and perfectly `Healthy`
- How manual sync differs from automated sync, and what `prune` and
  `selfHeal` each actually do
- How to read an `Application`'s status at a glance without guessing

## The `Application` CRD

Everything ArgoCD manages is represented as an `Application` — a
Kubernetes custom resource that lives in the `argocd` namespace and
describes exactly one deployable unit: where its desired state comes
from, and where that state should be applied.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payments-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/acme/gitops-config.git
    targetRevision: main
    path: apps/payments-api/overlays/prod
  destination:
    server: https://kubernetes.default.svc
    namespace: payments
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

Read it top to bottom: `source` says where the desired manifests live
— a Git repo, a revision (branch, tag, or commit), and a path inside
it, often a Kustomize overlay. `destination` says where to apply them
— which cluster API server and which namespace. `syncPolicy` says how
reconciliation behaves. That's the whole model: one CRD, three
questions answered — where from, where to, how.

## Sync status vs. Health status — two different questions

This is the single most important distinction in ArgoCD, and the one
newcomers conflate most often.

**Sync status** answers: *does the live state in the cluster match
the desired state in Git?* ArgoCD computes this by diffing the
manifests it would apply against what's actually running. The
possible values are `Synced` and `OutOfSync`. It says nothing about
whether anything is actually working.

**Health status** answers: *is what's running actually healthy?*
ArgoCD inspects each live resource — a `Deployment`'s replica counts,
a `Service`'s endpoints, an `Ingress`'s backend — and assigns one of
`Healthy`, `Progressing`, `Degraded`, `Suspended`, `Missing`, or
`Unknown`. Built-in health checks cover the common Kubernetes kinds;
custom resources can register their own via a Lua health check script.

Because these are independent axes, every combination is possible and
each one means something different:

- **Synced + Healthy** — the goal state. Git matches the cluster, and
  the cluster is running well.
- **Synced + Degraded** — the correct manifests were applied, but the
  workload itself is failing: a bad image, a crashing container, a
  failed probe. The config is right; the application is broken.
- **OutOfSync + Healthy** — someone (or something) changed a live
  resource outside Git — a `kubectl edit`, an autoscaler, an
  operator — and the old version is still running fine. Drift exists,
  but nothing is currently on fire.
- **OutOfSync + Degraded** — both problems at once: drift, and a
  failing workload.

Treating "Synced" as "working" is the mistake to avoid. A rollout can
sync cleanly and still crash-loop five seconds later.

## Manual sync vs. automated sync

By default, an `Application` with no `automated` block only computes
and displays `OutOfSync` — a human has to click "Sync" (or run
`argocd app sync`) to actually apply it. That's **manual sync**, and
it's the right default for production environments where you want a
deliberate gate before anything changes.

**Automated sync** (the `syncPolicy.automated` block above) makes
ArgoCD apply changes the moment it detects `OutOfSync`, no human
action required. Two flags control how aggressive that is:

- `prune: true` — resources removed from Git get deleted from the
  cluster too. Without it, deleting a manifest from Git leaves the
  orphaned resource running forever.
- `selfHeal: true` — if someone edits a live resource directly,
  ArgoCD reverts it back to match Git on the next reconciliation loop
  (every few minutes by default), rather than just flagging the drift
  and waiting.

Together, `prune` and `selfHeal` are what make Git a true single
source of truth rather than just a suggestion — any manual change to
the cluster gets overwritten, and any removal from Git actually takes
effect.

## Key terms

| Term | Meaning |
|---|---|
| `Application` | The ArgoCD CRD representing one deployable unit: a Git source, a cluster/namespace destination, and a sync policy |
| Sync status | `Synced`/`OutOfSync` — whether the live cluster state matches the desired Git state |
| Health status | `Healthy`/`Progressing`/`Degraded`/etc. — whether the running workload is actually functioning |
| `prune` | Automated-sync option: resources removed from Git are deleted from the cluster |
| `selfHeal` | Automated-sync option: manual drift from a live resource is reverted back to match Git |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
can an `Application` be `Synced` and `Degraded` at the same time, and
what does `selfHeal: true` actually change about how ArgoCD reacts to
a `kubectl edit` on a live resource?
