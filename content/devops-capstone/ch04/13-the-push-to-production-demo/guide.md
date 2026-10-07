# The Push-to-Production Demo

Every piece of Phase 3 has been covered separately: CI stages, automatic dev deploys, tag-based promotion, the production approval gate. This lesson is demo day — one real change, walked start to finish through every phase of the capstone, so the whole pipeline clicks as a single system instead of four disconnected lessons.

## What you'll learn

- How one ticket travels from a feature branch to production
- Exactly which pipeline stage from Lessons 10-12 fires at each step
- How Phases 1-3 of the capstone connect into one working system
- What's still ahead in Phase 4: monitoring, security, and the two incidents already foreshadowed

## The change: CHK-108, retry PaymentPro timeouts

Remember `feature/CHK-108-retry-paymentpro-timeout` from Chapter 1's branching lesson? This is that change, finally shipping. A developer notices `checkout` occasionally fails an order outright when PaymentPro's OAuth2 token endpoint is briefly slow, instead of retrying. The fix: add a bounded retry with backoff around that one call.

```bash
git checkout main
git pull
git checkout -b feature/CHK-108-retry-paymentpro-timeout
# ... edit services/checkout/app/paymentpro_client.py ...
git add services/checkout/app/paymentpro_client.py
git commit -m "CHK-108: retry PaymentPro token requests with backoff"
git push -u origin feature/CHK-108-retry-paymentpro-timeout
```

## Step 1 — CI runs on the PR

Opening the PR against `main` triggers `checkout-ci.yml` (Lesson 10), because the change falls under `services/checkout/**`. `product-catalog-ci.yml` never fires — its path filter doesn't match. Lint, pytest, the image build, the Trivy scan, and the gitleaks scan all run and all pass; the PR shows four green checks.

## Step 2 — review and squash merge

A teammate reviews the diff, approves, and both of `main`'s branch protection rules are now satisfied: 1 approval, green CI. The PR squash-merges into `main` as one clean commit.

## Step 3 — automatic deploy to dev

The merge to `main` triggers `deploy-dev` (Lesson 11): OIDC login to Azure, AKS context set to `northbridge-aks-dev`, and `helm upgrade --install checkout --namespace northbridge-dev --set image.tag=<merge sha>`. Within minutes, the retry logic is live at `dev.shop.northbridgeretail.com` — nobody had to run a deploy command.

## Step 4 — a maintainer promotes the release

Once the fix looks good in dev, a maintainer cuts a tag:

```bash
git tag v1.5.0
git push origin v1.5.0
```

That triggers `promote-release.yml` (Lesson 12). `deploy-staging` runs immediately and automatically, deploying to `northbridge-staging` on the shared `northbridge-aks-dev` cluster. `deploy-prod` is next in the job graph — but it's gated on `environment: production`, so it pauses. GitHub shows a pending deployment waiting on a required reviewer.

## Step 5 — the approval, and the prod deploy

A reviewer checks staging, confirms the retry logic behaves correctly, and approves the pending deployment. `deploy-prod` resumes: OIDC login, AKS context switched to the *isolated* `northbridge-aks-prod` cluster, and the same `helm upgrade --install` pattern against `northbridge-prod`. `v1.5.0` is now live at `shop.northbridgeretail.com` — traceable the entire way back to one commit SHA.

## Tying Phases 1-3 together

None of this works without the earlier phases. Phase 1 built the containers this pipeline builds and scans. Phase 2 built the AKS clusters this pipeline deploys to, the Key Vault that backs the External Secrets Operator, and the OIDC federated identity this pipeline authenticates with. Phase 3 — what you just watched — is the automation that connects a commit to a running service, safely, with a human only in the loop exactly once: the production approval.

## What's still ahead

This pipeline is solid, but it isn't the whole story yet. Phase 4 adds the monitoring that would have caught the flash-sale checkout latency spike covered in the Monitoring & Observability course, and the full worked example of the PaymentPro secrets near-miss only foreshadowed back in Lesson 10. Both incidents happened on top of the exact pipeline you just walked through.

## Key terms

- **CHK-108** — the example ticket this lesson walks end to end: a bounded retry added to checkout's PaymentPro client
- **Pending deployment** — GitHub's UI state for a job waiting on a required Environment reviewer
- **End-to-end traceability** — every deployed artifact, from dev through prod, traces back to one git SHA
- **Phase 4 (next chapter)** — monitoring/alerting and security scanning, including the two incidents foreshadowed in this phase
