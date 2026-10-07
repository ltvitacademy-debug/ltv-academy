# Capstone: Build It

Lesson 29 defined the plan. This lesson is the build itself — a complete, working GitHub Actions pipeline for Northbridge Retail's `storefront-api`, assembled piece by piece from everything earlier chapters taught. Treat this as a worked example to build alongside, not just read.

## What you'll learn

- A complete, real workflow file implementing every stage from the Lesson 29 plan
- How the pieces from Chapters 2, 4, 5, and 6 compose into one file instead of staying separate examples
- How to adapt this exact file to Azure Pipelines instead, if that's the platform you chose
- What to check before calling the pipeline "done"

## The complete workflow, assembled

```yaml
name: storefront-api CI/CD

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm test

  build-and-push-image:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/northbridge-retail/storefront-api:${{ github.sha }}

  deploy-staging:
    needs: build-and-push-image
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: kubectl set image deployment/storefront-api
          storefront-api=ghcr.io/northbridge-retail/storefront-api:${{ github.sha }}
          --namespace=staging

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: kubectl set image deployment/storefront-api
          storefront-api=ghcr.io/northbridge-retail/storefront-api:${{ github.sha }}
          --namespace=production
```

## Reading what each job does

- **`build-and-test`** — the Chapter 2/4 part. Checks out code, installs dependencies with caching (Chapter 2, Lesson 9), and runs the test suite. Any other job `needs` this one, so a failing test stops everything downstream.
- **`build-and-push-image`** — the Chapter 4, Lesson 19 part, guarded by `if: github.ref == 'refs/heads/main'` so it only runs on `main`, never on a pull request from an untrusted fork. Logs into GHCR using the automatic `GITHUB_TOKEN` secret (Chapter 2, Lesson 8) and pushes an image tagged with the commit SHA.
- **`deploy-staging`** — targets the `environment: staging` (Chapter 5, Lesson 21) and runs automatically — Continuous Deployment.
- **`deploy-production`** — targets `environment: production`. If that environment has required reviewers configured in the repository's Settings (Chapter 5, Lesson 22), this job pauses and waits for a human to click Approve before it runs — Continuous Delivery, exactly as planned in Lesson 29.

## Adapting this to Azure Pipelines

The same four stages map directly onto Azure Pipelines' `stages:` block from Chapter 3: a `Build` stage running `npm ci && npm test`, a `BuildImage` stage using a `Docker@2` task, and two deployment stages each referencing an Azure Pipelines `environment` — `staging` with no checks, `production` with an approval check configured exactly like Chapter 3, Lesson 13 covered. The logic doesn't change between platforms; only the YAML dialect does.

## Before calling it done

Walk through this checklist once the pipeline is wired up: a broken test actually blocks the merge; a passing merge to `main` produces a real image in the registry, tagged correctly; staging updates within a minute or two of that merge with no human action; and production does **not** update until someone explicitly approves it. If all four hold, the pipeline matches the plan from Lesson 29.

## Key terms

- **`needs:`** — the GitHub Actions keyword that makes one job wait for another to succeed before running
- **`environment:`** — the keyword that ties a job to a named environment, which can carry its own approval rules
- **GHCR (GitHub Container Registry)** — GitHub's built-in container registry, authenticated here with the automatic `GITHUB_TOKEN`
