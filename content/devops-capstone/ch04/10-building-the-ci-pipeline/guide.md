# Building the CI Pipeline

Phase 2 ended with a cluster, a network, and a vault to hold secrets — but nothing deploys itself yet. Phase 3 is where `northbridgeretail/storefront` becomes a real DevOps pipeline: a push to GitHub is automatically built, tested, scanned, and packaged, with no human running `docker build` by hand. This lesson covers the CI half — everything that happens before an image is trusted enough to deploy. The CD half (actually shipping it) is Lesson 11.

## What you'll learn

- Why `product-catalog` and `checkout` each get their own GitHub Actions workflow, scoped with path filters
- The five CI stages every push runs through: lint/test → build → Trivy scan → gitleaks scan → push to ACR
- How images get tagged by git SHA instead of `latest`
- Why a secrets scanner sits directly in this pipeline, not bolted on later

## One workflow per service, scoped by path

`storefront` is a monorepo — `product-catalog` and `checkout` live side by side under `services/`. If one workflow watched the whole repo, every commit to either service would rebuild and rescan *both*, wasting minutes on every PR and making it unclear which service actually changed. Instead, each service gets its own workflow file with a `paths` filter so it only triggers on changes under its own folder:

```yaml
# .github/workflows/product-catalog-ci.yml
on:
  push:
    branches: [main]
    paths:
      - "services/product-catalog/**"
  pull_request:
    paths:
      - "services/product-catalog/**"
```

`checkout`'s workflow is identical in shape, just pointed at `services/checkout/**`. A PR that only touches `services/checkout/` never triggers `product-catalog-ci.yml` at all — CI stays fast and the status checks on a PR map directly to the service that actually changed.

## The five CI stages

```yaml
# .github/workflows/product-catalog-ci.yml (continued)
jobs:
  build-test-scan:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: services/product-catalog
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm test

      - name: Build image
        run: docker build -t northbridgeacr.azurecr.io/product-catalog:${{ github.sha }} .

      - name: Scan image with Trivy
        uses: aquasecurity/trivy-action@0.28.0
        with:
          image-ref: northbridgeacr.azurecr.io/product-catalog:${{ github.sha }}
          severity: CRITICAL
          ignore-unfixed: true
          exit-code: "1"

      - name: Scan for leaked secrets
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Push to ACR
        run: docker push northbridgeacr.azurecr.io/product-catalog:${{ github.sha }}
```

`checkout`'s version swaps `setup-node`/`npm` for `actions/setup-python@v4` and `pytest`, but the shape — lint/test, build, Trivy, gitleaks, push — is identical. Each stage is a gate: a failing lint, a failing test, a CRITICAL vulnerability with a fix already available, or a detected secret all stop the pipeline before an image ever reaches ACR.

## Tagging by git SHA, never `latest`

Notice the image tag: `${{ github.sha }}`, not `latest`. Every image in `northbridgeacr.azurecr.io` is traceable to the exact commit that produced it — which matters enormously once Lesson 12 covers rollbacks. You can't roll back to "latest" (it keeps moving), but you can always `helm upgrade --set image.tag=a1b2c3d` back to a known-good SHA.

## Why gitleaks lives in CI, not just on a developer's conscience

Trivy scans the *image* for vulnerable packages. gitleaks scans the *diff* for things that look like credentials — API keys, connection strings, tokens — accidentally committed in code or config. It runs as both a pre-commit hook locally and this CI step, so a secret has two chances to get caught before it reaches `main`. That redundancy isn't theoretical: later in this phase's pipeline build-out, a PaymentPro test API key very nearly got committed directly into a Helm `values.yaml` file. gitleaks caught it at the PR stage before it merged — a good reminder of exactly why this stage exists. Chapter 5 covers that incident in full.

## Key terms

- **Path filter (`paths:`)** — scopes a GitHub Actions workflow to trigger only on changes under a given directory
- **Trivy** — container image vulnerability scanner; this pipeline blocks on CRITICAL findings with an available fix
- **gitleaks** — secrets scanner that inspects diffs for committed credentials, run as both a pre-commit hook and a CI step
- **SHA-tagged image** — tagging a container image with the git commit SHA (`${{ github.sha }}`) instead of `latest`, so every image is traceable to exact source
- **ACR (Azure Container Registry)** — `northbridgeacr.azurecr.io`, the single shared registry both services push to
