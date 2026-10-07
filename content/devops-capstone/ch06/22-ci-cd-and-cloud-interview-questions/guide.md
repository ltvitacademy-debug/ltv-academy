# CI/CD & Cloud Interview Questions

CI/CD and cloud questions are where your capstone pays off the most directly — you're not describing a pipeline you read about, you're describing one you built and watched run. This lesson covers real sample questions from this layer, with model answers grounded in the GitHub Actions and Azure pipeline you built for Northbridge Retail.

## What you'll learn

- How to describe your own pipeline clearly and completely when asked to "walk me through it"
- How to answer secrets-in-CI questions with a real mechanism, not a generic "we use a vault"
- The real difference between blue-green and canary deployments, and when each fits
- What OIDC federation is and why it beats long-lived cloud credentials in CI

## Sample questions and model answers

**Q: Walk me through your CI/CD pipeline.**
"A feature branch opens a PR against `main`. GitHub Actions runs lint and tests, builds a container image, scans it with Trivy for vulnerabilities, and scans the diff with gitleaks for secrets — all required to pass before a reviewer can approve. On squash merge, the pipeline builds and pushes the image to our ACR, `northbridgeacr.azurecr.io`, tagged with the git SHA, then runs `helm upgrade --install` into the dev namespace automatically. Pushing a semver tag like `v1.4.0` auto-deploys that same image to staging. Promoting to production requires a manual approval gate in a GitHub Environment before the last `helm upgrade` runs against the prod cluster." That answer is complete because it names every gate and every artifact, not just "it builds and deploys."

**Q: How do you handle secrets in CI without storing long-lived credentials?**
Nothing sensitive is stored in GitHub as a repository secret for cloud access. Instead, GitHub Actions authenticates to Azure using OIDC — a federated credential trusts short-lived tokens GitHub issues for each workflow run, scoped to a specific repo and branch, with no password or key sitting in GitHub at all. Application secrets (the PaymentPro API key, database credentials) live in Azure Key Vault and are synced into Kubernetes Secrets at runtime by the External Secrets Operator — they never pass through git or CI logs.

**Q: What's the difference between blue-green and canary deployments?**
Blue-green runs two full environments — the new version (green) is deployed completely alongside the old one (blue), then traffic cuts over all at once, with blue kept warm for instant rollback. Canary instead shifts a small percentage of real traffic to the new version first, watches error rates and latency, and ramps up gradually if metrics hold. Canary catches problems with less blast radius but needs traffic-splitting infrastructure and good metrics to watch; blue-green is simpler but an all-or-nothing cutover. For something like `checkout`, with an explicit latency SLO, a canary approach paired with the existing Prometheus/Grafana dashboards would catch a regression before it hit 100% of flash-sale traffic — that's a natural next step beyond the staged promotion already built in this capstone.

**Q: What is OIDC federation, and why avoid long-lived cloud credentials in CI?**
OpenID Connect federation lets GitHub Actions request a short-lived, cryptographically signed identity token for each workflow run, which Azure AD trusts via a pre-configured federated credential tied to the exact repo, branch, or environment — no client secret stored anywhere. Long-lived credentials (a stored service principal secret, for instance) are a standing liability: if they leak, they're valid until someone manually rotates them, and they often get used far more broadly than intended. A short-lived, scoped OIDC token can't be reused outside that one workflow run and expires automatically, which is exactly why Northbridge's pipeline has no stored cloud secrets at all.

## Key terms

| Term | Meaning |
|---|---|
| OIDC federation | Azure AD trusts short-lived tokens GitHub issues per run, with no stored secret |
| Blue-green deployment | Full cutover between two complete environments, instant rollback |
| Canary deployment | Gradual traffic shift to the new version while watching metrics |
| ACR (image registry) | `northbridgeacr.azurecr.io` — where built images are pushed, tagged by git SHA |
