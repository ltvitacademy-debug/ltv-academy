# Lesson 5 — Building the CI/CD Pipeline

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 5 of 16**

## What you'll learn

- The GitHub Actions workflow that builds, tests, and pushes the storefront app's image on every
  push to `main`
- How the pipeline authenticates to Azure with OIDC, with no stored client secret
- The CD job that runs `helm upgrade --install` against the AKS cluster Lesson 4 provisioned
- Why this pipeline deploys using the exact `values-prod.yaml` Lesson 4 already set up

## The CI job: build, test, scan, push

```yaml
# .github/workflows/storefront-ci.yml
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-test-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm test

      - name: Build image
        run: docker build -t acrdriftwoodprod.azurecr.io/storefront:${{ github.sha }} .

      - name: Scan image with Trivy
        uses: aquasecurity/trivy-action@0.28.0
        with:
          image-ref: acrdriftwoodprod.azurecr.io/storefront:${{ github.sha }}
          severity: CRITICAL
          exit-code: "1"

      - name: Azure login (OIDC)
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Push to ACR
        run: |
          az acr login --name acrdriftwoodprod
          docker push acrdriftwoodprod.azurecr.io/storefront:${{ github.sha }}
```

Every image is tagged with `${{ github.sha }}`, never `latest` — so any image sitting in ACR is
traceable back to the exact commit that produced it, which matters the moment anyone ever needs
to roll back to a known-good build.

## The CD job: deploying to AKS automatically

```yaml
  deploy-prod:
    needs: build-test-push
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      id-token: write   # required for OIDC
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Azure login (OIDC)
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Set AKS context
        uses: azure/aks-set-context@v4
        with:
          resource-group: rg-driftwood-prod
          cluster-name: aks-driftwood-prod

      - name: Deploy with Helm
        run: |
          helm upgrade --install storefront ./charts/storefront \
            --namespace driftwood-prod \
            --create-namespace \
            --values ./charts/storefront/values-prod.yaml \
            --set image.tag=${{ github.sha }}

      - name: Smoke test
        run: |
          kubectl rollout status deployment/storefront -n driftwood-prod
          curl -f https://storefront.driftwoodoutdoor.example/healthz
```

`azure/login@v2` uses an OIDC federated credential — GitHub issues a short-lived token, Azure AD
trusts it because of a federated identity credential set up alongside the cluster, and exchanges
it for a short-lived Azure access token. There's no long-lived client secret sitting in GitHub
Secrets for anyone to steal or forget to rotate.

## The pipeline deploys exactly what Lesson 4 wrote — nothing more

`helm upgrade --install` is idempotent: the first run creates the release, every run after that
upgrades it in place, using whatever is currently in `values-prod.yaml`. That's the entire point
of the pipeline, and it's also worth being precise about what it does *not* do: it never
re-derives or questions the autoscaling numbers in that file. It applies them, faithfully, every
single time — which means Lesson 4's `minReplicas: 10` now ships on every deploy without anyone
re-examining it, by design.

## Key terms

| Term | Meaning |
|---|---|
| OIDC federated credential | Short-lived token exchange between GitHub Actions and Azure AD, replacing a stored client secret |
| SHA-tagged image | An image tagged with the git commit SHA instead of `latest`, so it's traceable to exact source |
| `helm upgrade --install` | Idempotent Helm command: creates a release on first run, upgrades it every run after |
| Smoke test gate | A post-deploy check (rollout status, a health endpoint) that must pass before a deploy counts as successful |

## Lab

Starting from a scrambled list — checkout, test, build, scan, push, login, set cluster context,
helm upgrade, smoke test — put the pipeline's stages back in their correct order and mark which
ones belong to the CI job versus the CD job.

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: how does this pipeline
authenticate to Azure without a stored secret, and exactly which file does `helm upgrade
--install` read its autoscaling settings from on every single deploy?
