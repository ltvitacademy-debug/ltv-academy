# GitOps Introduction

Every manual `kubectl apply` and `helm upgrade` run against Northbridge Retail's production cluster is a change nobody can fully account for later — who ran it, what it changed, whether it matches what's in Git. This lesson introduces GitOps, the practice of making Git itself the single source of truth for what should be running, with an automated controller responsible for making the cluster match it.

## What you'll learn

- The core GitOps idea: Git as the single source of truth, reconciled continuously
- The pull-based model and why it differs from a traditional CI/CD push pipeline
- How a GitOps controller like Argo CD or Flux actually works
- What an Argo CD `Application` resource looks like and what "drift" means in this context

## The core idea: Git as the source of truth

In GitOps, the desired state of a cluster — every Deployment, Service, Ingress, and Helm release Northbridge runs — is described declaratively in a Git repository. A controller running inside the cluster continuously compares that declared state against what's actually running, and automatically applies any difference. Nobody runs `kubectl apply` by hand against production; they open a pull request against the Git repo instead.

## Pull-based vs. push-based deployment

A traditional CI/CD pipeline is **push-based**: a build server (Jenkins, GitHub Actions) finishes a pipeline run and pushes changes directly into the cluster using credentials the pipeline holds.

GitOps flips this around and is **pull-based**: a controller running *inside* the cluster watches the Git repository and pulls changes when it detects them. The cluster's credentials never leave the cluster, and nothing outside it needs direct write access to the cluster's API server.

| | Push-based CI/CD | Pull-based GitOps |
|---|---|---|
| Who initiates the change | External pipeline, on every merge | In-cluster controller, continuously |
| Where cluster credentials live | In the CI/CD system | Only inside the cluster |
| Source of truth | The last pipeline run (not always the repo) | The Git repository, always |
| Detecting manual drift | Not automatic | Controller notices and can auto-correct |

## How the reconciliation loop works

1. An engineer opens a pull request changing `values-prod.yaml` for the checkout Helm chart (for example, bumping `replicaCount`).
2. The PR is reviewed and merged to the Git repo's main branch — this is the approval step; nothing has touched the cluster yet.
3. The GitOps controller (Argo CD or Flux) notices the repo changed, on its normal polling interval or via a webhook.
4. The controller compares the repo's declared state to the cluster's live state and finds a difference.
5. The controller applies the difference automatically, and the live cluster now matches Git.

If someone manually edits a Deployment with `kubectl edit` outside this flow, the next reconciliation pass detects that **drift** and — depending on configuration — either flags it or reverts it back to match Git.

## A real Argo CD Application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: checkout
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/northbridgeretail/k8s-manifests.git
    targetRevision: main
    path: charts/checkout
    helm:
      valueFiles:
        - values-prod.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: northbridge-retail
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

`source` tells Argo CD what to watch and where (a Git repo, a path, which Helm values file). `destination` tells it where to apply that. `syncPolicy.automated.selfHeal: true` is what makes drift correction automatic rather than just a warning in a dashboard.

## Key terms

- **GitOps** — operating a cluster by declaring desired state in Git and having a controller continuously reconcile the cluster to match it
- **Pull-based deployment** — a controller inside the cluster pulls and applies changes, rather than an external pipeline pushing them in
- **Reconciliation loop** — the continuous compare-and-correct cycle between Git's declared state and the cluster's live state
- **Drift** — any difference between what's declared in Git and what's actually running in the cluster
- **Argo CD / Flux** — the two most widely used GitOps controllers for Kubernetes
