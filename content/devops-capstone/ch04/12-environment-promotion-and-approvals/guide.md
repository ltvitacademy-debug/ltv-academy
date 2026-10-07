# Environment Promotion & Approvals

Lesson 11 covered how `main` deploys to `northbridge-dev` on every merge, automatically and constantly. That's deliberately cheap and frequent. Staging and production work on a completely different rhythm — a deliberate, versioned decision. This lesson covers tag-based promotion: how cutting a semver tag ships to staging automatically, how a GitHub Environments protection rule forces a human to approve before anything touches production, and what to do when a promoted release turns out to be bad.

## What you'll learn

- Why promotion is tag-based instead of branch-based
- How a semver tag push triggers an automatic staging deploy
- How the GitHub Environments "production" protection rule blocks the prod job until a reviewer approves
- Two rollback strategies: `helm rollback` and redeploying a prior image tag

## Tag push triggers staging automatically

A maintainer decides `main` is ready to ship a release, and cuts a semver tag:

```bash
git checkout main
git pull
git tag v1.5.0
git push origin v1.5.0
```

That tag push triggers a separate workflow, scoped to tag pushes rather than branch pushes:

```yaml
# .github/workflows/promote-release.yml
on:
  push:
    tags:
      - "v*.*.*"

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
      - uses: azure/aks-set-context@v4
        with:
          resource-group: rg-northbridge-dev
          cluster-name: northbridge-aks-dev
      - run: |
          helm upgrade --install product-catalog ./charts/product-catalog \
            --namespace northbridge-staging \
            --values ./charts/product-catalog/values-staging.yaml \
            --set image.tag=${{ github.sha }}
```

Notice `northbridge-staging` deploys to `northbridge-aks-dev` — the same dev cluster, just a different namespace, the cost-saving choice made back in Phase 2. No human approval is required here; cutting the tag itself is the deliberate act.

## The production gate: GitHub Environments

The `deploy-prod` job is identical in shape, except for one line:

```yaml
  deploy-prod:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production   # <-- this is the gate
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
      - uses: azure/aks-set-context@v4
        with:
          resource-group: rg-northbridge-prod
          cluster-name: northbridge-aks-prod
      - run: |
          helm upgrade --install product-catalog ./charts/product-catalog \
            --namespace northbridge-prod \
            --values ./charts/product-catalog/values-prod.yaml \
            --set image.tag=${{ github.sha }}
```

`environment: production` is a GitHub Environment configured with a **protection rule: 1 required reviewer**. When this job is reached, it pauses — GitHub shows a pending deployment, and nothing runs until an approved reviewer clicks approve. Only then does the job continue, log into Azure, point at the *isolated* `northbridge-aks-prod` cluster, and run the same `helm upgrade --install` pattern against `northbridge-prod`. The deploy logic never changes between staging and prod — only the cluster, the namespace, the values file, and this one approval gate.

## Rollback: two strategies

Because every image is SHA-tagged (Lesson 10) and every Helm release keeps a revision history, there are two ways to undo a bad promotion:

```bash
# option 1 — roll the Helm release itself back to its previous revision
helm history checkout --namespace northbridge-prod
helm rollback checkout 4 --namespace northbridge-prod

# option 2 — explicitly redeploy a known-good prior image tag
helm upgrade --install checkout ./charts/checkout \
  --namespace northbridge-prod \
  --values ./charts/checkout/values-prod.yaml \
  --set image.tag=a1b2c3d
```

`helm rollback` is faster — it reverts the whole release (values and image together) to exactly what was running before, which is usually what you want immediately after a bad promotion. Redeploying a specific prior SHA is more deliberate: useful when you want *this* image with a *changed* value, or when you're rolling back several releases at once and want to be explicit about exactly which commit you're returning to.

## Key terms

- **Tag-based promotion** — pushing a semver tag (e.g. `v1.5.0`) is what triggers staging, not a branch push
- **GitHub Environments protection rule** — a GitHub-native gate requiring a specified number of reviewer approvals before a job tied to that environment runs
- **`helm rollback`** — reverts a Helm release to a previous revision in one command
- **Redeploying a prior tag** — explicitly `helm upgrade --set image.tag=<sha>` back to a known-good image, as an alternative to `helm rollback`
