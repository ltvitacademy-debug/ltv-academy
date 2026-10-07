# Capstone Kickoff: Run an Application on Kubernetes

This is the capstone: one project that pulls together everything from this course into a single, portfolio-ready piece of work. You're going to take Northbridge Retail's product-catalog and checkout services — the same fictional app used throughout this course — and run them on Kubernetes the way a real platform team would, end to end. This lesson defines exactly what you're building and why, before lesson 37 has you build it and lesson 38 has you present it.

## What you'll learn

- The exact scope of the capstone project and what's explicitly out of scope
- The architecture you're deploying, and which earlier chapter each piece came from
- The concrete list of artifacts you'll produce and commit to a Git repository
- What "done" looks like, and how this project should be described in an interview

## The scenario

Northbridge Retail has two containerized services, already built in earlier parts of this course's path:

- **product-catalog** — a read-heavy API serving product data
- **checkout** — the service handling cart and order submission, with higher and spikier load

Both already exist as container images. Your job in this capstone is everything *around* those images: getting them running reliably on Kubernetes, reachable from outside the cluster, configured correctly per environment, able to handle a traffic spike, and deployed through a repeatable, versioned process — not hand-run commands nobody can reproduce.

## What's in scope

This project draws on nearly every chapter in this course. You will need, at minimum:

- A **Deployment** for each service, with resource requests/limits set sensibly (Chapter 2)
- A **Service** exposing each Deployment inside the cluster, and an **Ingress** routing external traffic to both by path or host (Chapter 3)
- A **ConfigMap** for non-sensitive configuration and a **Secret** for the checkout service's database credentials (Chapter 4 or wherever secrets were covered)
- A **HorizontalPodAutoscaler** on checkout, since it's the service with spiky load
- The whole thing packaged as a **Helm chart** with environment-specific values files (Chapter 8)
- A short written runbook: what to do if a Pod is `CrashLoopBackOff`, drawing on the troubleshooting playbook from lesson 34

## What's explicitly out of scope

- Writing the application code for product-catalog or checkout — you're deploying existing images, not building the app
- Setting up a live GitOps controller (Argo CD/Flux) end to end — you'll write the Argo CD `Application` manifest as a deliverable, but wiring up a live cluster with a real Git webhook is optional, not required for "done"
- Multi-cluster or multi-region deployment — one cluster is the scope

## The artifacts you're producing

By the end of lesson 37, your Git repository should contain:

```
northbridge-k8s/
  charts/
    product-catalog/
      Chart.yaml
      values.yaml
      values-prod.yaml
      templates/
    checkout/
      Chart.yaml
      values.yaml
      values-prod.yaml
      templates/
  argocd/
    product-catalog-application.yaml
    checkout-application.yaml
  RUNBOOK.md
  README.md
```

## What "done" looks like

You can run `helm install` for both charts against a cluster (even a local one like Minikube or kind) and get:

1. Both Pods reach `Running` and pass their readiness checks
2. `kubectl get ingress` shows a working route to product-catalog and checkout
3. Checkout's HPA is visible with `kubectl get hpa` and has sane min/max replica bounds
4. `helm upgrade --set image.tag=...` followed by `helm rollback` both work without error
5. The RUNBOOK.md documents at least three realistic failure scenarios and the commands to diagnose them

## Framing this for an interview

This project, once built, is something you talk through in an interview, not a Kubernetes concept you recite. "I packaged a two-service e-commerce application as Helm charts, added autoscaling for the spikier service, and wrote an Argo CD manifest and runbook for operating it" is a concrete, defensible sentence backed by a real Git repository — that's the goal of lesson 38.

## Key terms

- **Capstone project** — a single integrated project combining prior lessons' individual skills into one deliverable
- **Runbook** — a short written document describing how to diagnose and respond to specific operational failures
- **Scope (in / out)** — the explicit boundary of what a project does and does not cover, stated up front to keep the work finishable
