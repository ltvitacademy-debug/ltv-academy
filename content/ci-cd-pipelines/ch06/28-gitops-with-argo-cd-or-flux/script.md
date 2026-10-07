# Script — GitOps With Argo CD or Flux

## Segment 1 (title)

Every pipeline so far in this chapter has CI reach out and push changes into the cluster — a GitHub Actions job running kubectl or helm with a kubeconfig secret. GitOps inverts that entirely. Northbridge Retail is moving its production deployments to Argo CD, where the cluster itself continuously pulls its desired state from Git instead.

## Segment 2 (steps: push vs pull)

In the push model, CI holds credentials to the cluster and runs kubectl or helm directly against it. In the pull model, a controller running inside the cluster watches a Git repository and reconciles the cluster to match it. Nothing outside the cluster ever needs cluster credentials at all — the controller already has them.

## Segment 3 (code: CI's smaller job)

GitOps doesn't remove CI, it shrinks its job. The pipeline still builds and pushes the image exactly as before. The last step changes: instead of running kubectl against the cluster, CI just commits a new image tag to a separate manifest repository. That commit is the entire deploy trigger.

## Segment 4 (code: Application resource)

Argo CD itself is configured the same GitOps way, as an Application resource committed to Git, naming the repo path to watch and where to sync it. SelfHeal is what makes this fully hands-off — if anyone changes a resource directly in the cluster, Argo CD notices the drift from Git and reverts it automatically.

## Segment 5 (screenshot: Argo CD UI)

Once synced, Argo CD's web UI renders the application as a resource tree, each piece annotated with its own status. Synced means the cluster matches Git right now. Healthy means those resources are actually running correctly — two separate signals worth telling apart.

## Segment 6 (outro)

That closes out this chapter: Terraform provisioning the cluster, CI/CD building and deploying the app onto it, and GitOps keeping the whole thing continuously reconciled to exactly what's committed in Git — whether the controller is Argo CD or Flux.
