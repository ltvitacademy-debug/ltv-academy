# GitOps With Argo CD or Flux

Every pipeline in this chapter so far has CI reach out and push changes into the cluster — `kubectl apply`, `helm upgrade`, run from a GitHub Actions job with a kubeconfig secret. GitOps inverts that. Northbridge Retail's platform team is moving its production deployments to Argo CD, where the cluster itself continuously pulls its desired state from Git, instead of CI pushing it in.

## What you'll learn

- The core idea of GitOps: Git as the single source of truth, the cluster as a puller, not a pushee
- What changes in the pipeline once a GitOps controller is in the loop — CI's job gets smaller
- What the Argo CD UI actually shows once an application is synced and healthy
- The real difference between Argo CD and Flux, and why either fits the same pattern

## Push vs. pull

In every earlier lesson in this chapter, CI holds credentials to the cluster and runs `kubectl` or `helm` directly against it — that's a **push** model. GitOps is a **pull** model: a controller (Argo CD or Flux) runs inside the cluster, watches a Git repository, and continuously reconciles the cluster's actual state to match whatever that repository says it should be. Nothing outside the cluster ever needs cluster credentials — the controller already has them, and it only ever pulls.

## What CI still does — and stops doing

GitOps doesn't remove CI from the picture; it shrinks its job. Northbridge Retail's pipeline still builds and pushes the container image exactly as covered in the last lesson. The difference is the last step: instead of running `kubectl set image` against the cluster, CI opens a pull request against a separate **manifest repository**, bumping the image tag in a YAML file:

```yaml
# .github/workflows/deploy.yml (GitOps version)
  update-manifest:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          repository: northbridge-retail/k8s-manifests
          token: ${{ secrets.MANIFEST_REPO_TOKEN }}

      - run: |
          yq -i '.image.tag = "${{ github.sha }}"' \
            apps/cart-service/values.yaml

      - run: |
          git config user.name "ci-bot"
          git commit -am "cart-service: bump to ${{ github.sha }}"
          git push
```

That commit is the entire deploy trigger. Argo CD is watching the `k8s-manifests` repo, notices the change within its polling interval (or instantly, via a webhook), and reconciles the cluster to match — pulling the new image tag in, not having it pushed to them.

## An Argo CD Application, declared in Git

Argo CD itself is configured the same GitOps way — an `Application` resource, committed to Git, telling Argo CD which repo path to watch and which cluster/namespace to sync it to:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: cart-service
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/northbridge-retail/k8s-manifests
    targetRevision: main
    path: apps/cart-service
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

`automated` with `selfHeal: true` is what makes this fully hands-off: if anyone (or anything) changes a resource directly in the cluster, Argo CD notices the drift from Git and reverts it automatically. The cluster can never silently diverge from what's committed.

## What the Argo CD UI actually shows

Once an application syncs successfully, Argo CD's web UI renders it as a resource tree — the Application itself, flowing down to every Kubernetes resource it manages, each annotated with its own health and sync status:

![Screenshot of the Argo CD web UI showing an application named "guestbook" with Healthy and Synced status badges, and a resource tree flowing from the application down to a Service, a Deployment, and a running Pod.](/courses/ci-cd-pipelines/ch06/28-gitops-with-argo-cd-or-flux/guestbook-tree.png)
*A synced, healthy Argo CD application: the green checkmarks mean the live cluster state matches Git exactly, resource by resource.*
Source: [Argo CD Documentation — Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/)

**Healthy** and **Synced** are two separate signals worth telling apart: Synced means the cluster's resources match what's in Git right now; Healthy means those resources are actually running correctly (pods ready, no crash loops). A deploy can be Synced but not yet Healthy for a few seconds while new pods start — and it's possible, though rarer, to be Healthy on stale, out-of-sync resources.

## Argo CD vs. Flux

Argo CD and Flux solve the identical problem and both ship as CNCF graduated projects; the practical differences are mostly about shape. Argo CD bundles a full web UI (what the screenshot above shows) and models each deployable unit as an explicit `Application` resource. Flux is UI-less by default (a separate add-on, Weave GitOps, can add one), leans more heavily on plain `Kustomization` and `HelmRelease` custom resources, and is often preferred by teams who want GitOps to feel like "just more Kubernetes YAML" with no separate dashboard to operate. Either one fits the same pull-based pattern this lesson describes.

## Key terms

- **GitOps** — a deployment pattern where Git is the source of truth and a controller inside the cluster pulls changes, rather than CI pushing them
- **Reconciliation** — the continuous process of comparing the cluster's actual state to Git and correcting any drift
- **Manifest repository** — a separate Git repo holding Kubernetes YAML/Helm values that a GitOps controller watches
- **selfHeal** — an Argo CD sync policy option that automatically reverts manual, out-of-band changes to match Git
- **Synced vs. Healthy** — two independent status signals: whether resources match Git, and whether they're actually running correctly
