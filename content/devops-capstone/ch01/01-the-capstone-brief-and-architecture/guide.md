# The Capstone Brief & Architecture

Welcome to the DevOps Capstone — the course that ties together everything the DevOps Engineer path has taught you so far: containers, Kubernetes, infrastructure as code, CI/CD pipelines, monitoring, and security scanning. Instead of another isolated topic, you're going to build one real system end to end, the same way you'd be asked to on the job. This lesson hands you the brief, introduces the company and the two services you'll be shipping, and walks the full architecture you'll have running by the end of Phase 4.

## What you'll learn

- The capstone brief: what you're building and why it exists
- Northbridge Retail, the fictional e-commerce company you're building for, and its two services
- The end-to-end architecture — from a `git push` to a customer hitting the storefront in production
- How monitoring and security are layered across the whole system rather than bolted on at the end

## The brief

You are the newest DevOps engineer at **Northbridge Retail**, a mid-size e-commerce retailer (`northbridgeretail.com`, storefront at `shop.northbridgeretail.com`). Two services already exist in a monorepo on GitHub, `northbridgeretail/storefront`, but they only run on a developer's laptop — there is no cloud infrastructure, no pipeline, no monitoring, and no promotion process. Your job over the next four phases is to take those two services from "runs on my machine" to "a code change pushed to GitHub is automatically built, tested, packaged, and deployed" — safely, observably, and securely, all the way to production.

## The two services

```
storefront/                        (GitHub: northbridgeretail/storefront)
  services/product-catalog/        Node.js 20 + Express · port 8080
  services/checkout/                Python 3.12 + FastAPI · port 8080
```

- **`product-catalog`** — a read-heavy REST API that serves product data out of Postgres. Traffic is steady and predictable: browsing doesn't spike the way buying does.
- **`checkout`** — handles cart and order submission. For every order it calls out to **PaymentPro** (an external payment processor, authenticated with OAuth2 client-credentials) and to an existing **legacy inventory service** — already running elsewhere, not something you build in this capstone, just an upstream dependency checkout calls to confirm stock — then hands the completed order to a shipping carrier via webhook. Because of flash sales, checkout's load is much higher and spikier than product-catalog's, and that difference will matter a lot once you get to autoscaling and monitoring later in the course.

## The end-to-end architecture

This is the shape you're building toward across all four phases. Keep this picture in your head — every later lesson adds one piece of it.

```
 Engineer                GitHub                         Azure Container Registry
 ┌────────┐   git push   ┌─────────────────┐  image      ┌──────────────────────┐
 │ laptop │ ───────────► │ storefront repo │ ───────────►│ northbridgeacr.       │
 └────────┘   feature/*  │  (main branch)  │  tag=git SHA│ azurecr.io            │
                          └────────┬────────┘             └──────────┬───────────┘
                                   │ PR + CI:                        │
                                   │  lint/test → build → Trivy scan │ helm upgrade
                                   │  → gitleaks → push to ACR       ▼
                                   ▼                         ┌───────────────────────┐
                          merge to main (squash)             │ AKS: northbridge-aks-dev│
                                   │                         │  ns: northbridge-dev    │
                                   │ auto-deploy             └───────────────────────┘
                                   ▼
                          tag pushed (v1.4.0) ──────────► staging namespace (same AKS)
                                   │                        northbridge-staging
                                   │ manual approval gate
                                   │ (GitHub Environments,
                                   │  1 required reviewer)
                                   ▼
                          AKS: northbridge-aks-prod
                           ns: northbridge-prod  ──────► shop.northbridgeretail.com

 Layered across all of it:
   Monitoring  → kube-prometheus-stack (Prometheus + Grafana + Alertmanager) per cluster
   Security    → Trivy, gitleaks, Checkov, Azure Key Vault + External Secrets Operator, GitHub OIDC
```

Walking it left to right: an engineer pushes a feature branch and opens a PR against `main`. CI lints, tests, builds a container image, scans it with Trivy, scans the diff with gitleaks, and — once a reviewer approves and checks pass — the PR squash-merges to `main`. That merge automatically builds and pushes an image to the shared Azure Container Registry, `northbridgeacr.azurecr.io`, tagged with the git SHA, and deploys it with `helm upgrade --install` into the `northbridge-dev` namespace on the `northbridge-aks-dev` cluster. When a maintainer is ready to ship, they cut a semver tag — something like `v1.4.0` — which auto-deploys to the `northbridge-staging` namespace (on that same dev cluster, to save cost). Promotion from there to the isolated `northbridge-aks-prod` cluster requires a manual approval gate before the same Helm release goes to production and customers start hitting it at `shop.northbridgeretail.com`.

Monitoring and security aren't a separate phase bolted onto the end — they run alongside every environment from dev through prod: Prometheus/Grafana/Alertmanager watch all three namespaces, and Trivy, gitleaks, Checkov, Key Vault, and GitHub OIDC protect every stage of the pipeline that got the code there.

## Key terms

- **Northbridge Retail** — the fictional e-commerce company this capstone builds for; storefront at `shop.northbridgeretail.com`
- **`product-catalog`** — Node.js/Express service serving product data, steady read-heavy traffic
- **`checkout`** — Python/FastAPI service handling cart/order submission, spiky flash-sale traffic, depends on PaymentPro and the legacy inventory service
- **ACR (`northbridgeacr.azurecr.io`)** — the single shared Azure Container Registry both services push images to
- **AKS dev/prod split** — `northbridge-aks-dev` hosts both dev and staging namespaces; `northbridge-aks-prod` is isolated and hosts prod only
