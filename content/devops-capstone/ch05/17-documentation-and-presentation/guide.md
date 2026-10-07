# Documentation & Presentation

The technical build is done: a containerized monorepo, Terraform-provisioned Azure infrastructure, a Kubernetes deployment with promotion gates, a monitoring stack with a real SLO, and a security pipeline that caught a real near-miss. None of that matters to an interviewer — or a teammate joining the project — if it only lives in your head. This lesson closes out the technical portion of the capstone by making `storefront`'s documentation good enough to hand to a stranger, and building the demo script you'll actually give.

## What you'll learn

- What makes a README good enough that a new engineer can get `storefront` running without asking you anything
- What belongs in `docs/` — the architecture diagram, the runbooks, and the postmortem from Lesson 16
- How to structure a live demo that covers the full commit-to-prod flow, the incident drill, and the security posture
- How this lesson hands off to Chapter 6, Career Preparation

## A README that answers questions before they're asked

The root `README.md` in `storefront` needs four things, in order: what this is, how to run it locally, how it's deployed, and where to look next.

```markdown
# storefront — Northbridge Retail

Two services (product-catalog, checkout) deployed to AKS via
Terraform + Helm + GitHub Actions, with monitoring, security
scanning, and secrets management built in.

## Run locally
docker compose up    # see services/*/README.md for per-service detail

## Deploy
main -> northbridge-dev (automatic)
git tag vX.Y.Z -> staging (automatic), then prod (manual approval)

## Documentation
- docs/architecture.png        — system diagram
- docs/runbooks/                — on-call playbooks per alert
- docs/postmortems/             — incident write-ups
- infra/terraform/README.md     — infra module details
- charts/*/README.md            — Helm chart values per environment
```

## What lives in `docs/`

```
docs/
  architecture.png                          # services, AKS, Postgres, PaymentPro, inventory
  runbooks/
    checkout-slo-burn-rate.md               # what to check when CheckoutSLOBurnRateFast fires
    inventory-pool-saturation.md            # written AFTER the Lesson 16 drill
  postmortems/
    2026-flash-sale-checkout-latency.md     # the Lesson 16 postmortem, checked in
```

The `inventory-pool-saturation.md` runbook is the single most important artifact from this whole chapter — it's the concrete fix that turns a 12-minute trace-discovery incident into a two-minute "check this dashboard first" lookup next time.

## The demo script: commit to prod, end to end

A strong capstone demo doesn't describe the system — it drives it, live, in order:

```
1. Open a PR against storefront with a small checkout change.
   -> show CI: lint, test, Trivy, Checkov, gitleaks, all green.
2. Merge to main.
   -> show the auto-deploy to northbridge-dev in GitHub Actions.
3. Cut a tag (vX.Y.Z).
   -> show the automatic staging deploy, then the GitHub
      Environments manual approval gate for prod.
4. Approve it; show the prod deploy complete.
5. Open the Lesson 14 Grafana dashboard for checkout.
   -> walk through rate, errors, duration, and the SLO panel.
6. Replay 60 seconds of the Lesson 16 flash-sale drill.
   -> show p99 climbing, the saturation alert (not the old
      full-exhaustion one) firing this time, and the
      runbook link in the alert itself.
7. Close on the postmortem doc and its action items.
```

That sequence proves every phase of the capstone in under ten minutes, in the order a hiring panel actually cares about: it ships, it's observable, it's secure, and when it breaks, the team has a process — not just a prayer.

## Closing out the technical build

This lesson is the last stop before Chapter 6, Career Preparation, where the same project becomes a resume line, a GitHub portfolio piece, and the backbone of answers to behavioral and incident interview questions. Everything you documented here — the architecture diagram, the runbooks, the postmortem — is also exactly what an interviewer means when they ask "walk me through a project you built end to end."

## Key terms

- **README-driven onboarding** — writing the README so a new engineer can run and deploy the project without asking a human first
- **Runbook** — a written, specific playbook for what to check when a named alert fires
- **Architecture diagram** — a single picture showing every service, dependency, and data store in the system
- **Commit-to-prod demo** — a live walkthrough proving the whole pipeline, not just describing it
