# Deploying to Kubernetes Automatically

Lesson 10 ended with a scanned, SHA-tagged image sitting in `northbridgeacr.azurecr.io` — built, but not running anywhere. This lesson adds the CD job that takes over the moment CI passes on `main`: authenticate to Azure, point `kubectl`/`helm` at the right cluster, and `helm upgrade --install` the new image into the `northbridge-dev` namespace. No one runs this by hand — it happens on every merge.

## What you'll learn

- The CD job that runs automatically after CI passes on `main`
- How the workflow authenticates to Azure with OIDC — no stored client secret, ever
- The Helm chart layout both services share, and what `values-dev.yaml` sets
- Why secrets never appear in those values files at all

## The deploy job

This job is added to the same workflow file as Lesson 10's CI job, gated so it only runs on `main` (never on a PR from a fork) and only after the build-test-scan job succeeds:

```yaml
# .github/workflows/product-catalog-ci.yml (continued)
  deploy-dev:
    needs: build-test-scan
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
          resource-group: rg-northbridge-dev
          cluster-name: northbridge-aks-dev

      - name: Deploy with Helm
        run: |
          helm upgrade --install product-catalog ./charts/product-catalog \
            --namespace northbridge-dev \
            --create-namespace \
            --values ./charts/product-catalog/values-dev.yaml \
            --set image.tag=${{ github.sha }}
```

`checkout`'s deploy job is the same shape, pointed at its own chart and namespace. `helm upgrade --install` is deliberately idempotent — the first-ever run creates the release, every run after that upgrades it, so the same command works whether this is deploy #1 or #400.

## Authenticating to Azure without a stored secret

`azure/login@v2` here uses **OIDC federated credential** authentication, not a stored client secret. GitHub issues a short-lived OIDC token for the workflow run; Azure AD trusts that token (because of a federated identity credential set up in Phase 2) and exchanges it for a short-lived Azure access token. `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID` are just identifiers — there is no long-lived password or client secret sitting in GitHub Secrets for an attacker to steal, and nothing to rotate on a schedule. This is the same philosophy as the Workload Identity federation AKS pods use to reach Key Vault, covered in Chapter 3: trust is established through identity federation, not a stored credential.

## The Helm chart layout

Both services' charts follow the same structure:

```
charts/product-catalog/
  Chart.yaml
  values.yaml              # shared defaults
  values-dev.yaml
  values-staging.yaml
  values-prod.yaml
  templates/
    deployment.yaml
    service.yaml
    hpa.yaml
    ingress.yaml
```

`values-dev.yaml` for `product-catalog`:

```yaml
replicaCount: 2
image:
  repository: northbridgeacr.azurecr.io/product-catalog
  tag: ""   # overridden at deploy time with --set image.tag
ingress:
  host: dev.shop.northbridgeretail.com
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 8
  targetCPUUtilizationPercentage: 70
```

`checkout`'s `values-dev.yaml` is almost identical, except its autoscaling block reads `minReplicas: 3, maxReplicas: 15` — checkout's HPA is sized for flash-sale spikes, product-catalog's for steady read traffic. Chapter 3 covered why those numbers differ; this is where they actually get applied.

## Secrets still never touch these files

Nothing in `values-dev.yaml` holds a database password or the PaymentPro API key. The **External Secrets Operator**, running in the cluster since Phase 2, syncs those from `northbridge-kv-dev` directly into Kubernetes Secrets that the pod mounts at runtime. The Helm values file only ever references the *name* of a Kubernetes Secret, never its contents — which is exactly the boundary that almost got crossed with the near-miss PaymentPro key mentioned in Lesson 10.

## Key terms

- **`helm upgrade --install`** — idempotent Helm command that creates a release on first run and upgrades it every run after
- **OIDC federated credential** — GitHub Actions authenticates to Azure using a short-lived token exchange, with no stored client secret
- **`values-dev.yaml`** — per-environment Helm values file; sets replica counts, HPA bounds, and the ingress host for dev
- **External Secrets Operator** — syncs Key Vault secrets into Kubernetes Secrets at runtime, so Helm values files never hold credentials
