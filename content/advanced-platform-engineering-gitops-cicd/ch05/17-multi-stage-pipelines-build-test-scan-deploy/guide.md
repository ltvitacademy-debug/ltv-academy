# Lesson 17 — Multi-Stage Pipelines: Build, Test, Scan, Deploy

**Chapter 5 · Advanced CI/CD Pipeline Design · Lesson 17 of 4**

## What you'll learn

- Why a real production pipeline is a sequence of gates, not one script
  that does everything at once
- What belongs in each stage — build, test, scan, deploy — and why the
  order matters
- How to wire the security scanning from the DevSecOps course (SAST,
  SCA, secrets detection, IaC scanning) into the same pipeline instead
  of treating it as a separate process
- How to read a real multi-job GitHub Actions workflow that enforces
  this order with `needs:`

## A pipeline is a chain of gates

Every stage before `deploy` exists to answer one question: "is there
any reason not to ship this change?" If the answer is yes at any
stage, the pipeline stops there — the whole point of staging the
pipeline is that a failure in testing should never even reach the
scanning stage, and a failure in scanning should never reach deploy.
That's cheaper and faster than running everything in parallel and
sorting out the results afterward.

## Stage 1: Build

Build turns source into something deployable — compiling code,
installing dependencies, and for most modern pipelines, producing a
container image tagged with the commit SHA. The build stage should
fail fast on anything that makes the artifact itself invalid: a
compile error, a missing dependency, a broken Dockerfile. Nothing
downstream should ever try to test or scan an artifact that didn't
build cleanly.

## Stage 2: Test

Testing itself is usually two tiers. Unit tests run against the code
in isolation — no network, no database, fast enough to run on every
commit. Integration tests spin up the artifact against real or
realistic dependencies (a test database, a message queue, another
service's API) and verify the pieces actually work together. Unit
tests catch most bugs cheaply; integration tests catch the bugs that
only show up when components interact, which is exactly the class of
bug a unit test, by design, cannot see.

## Stage 3: Scan

This is where the DevSecOps course's scanning chapter plugs directly
into the pipeline you're building here. A production-grade scan stage
runs several different tools, each checking a different risk:

- **SAST** (static application security testing) analyzes the code
  you wrote for insecure patterns — think Semgrep or CodeQL
- **SCA** (software composition analysis) checks every third-party
  dependency against known-CVE databases — GitHub Dependabot's alerts
  are one example you've already seen
- **Secrets detection** scans the diff and history for credentials
  that were accidentally committed — tools like gitleaks exist
  specifically for this
- **IaC scanning** checks Terraform/Bicep/Kubernetes manifests for
  misconfigurations before they're ever applied — Checkov and tfsec
  are the common names here

Each of these can fail the pipeline independently. A critical
vulnerability from SCA and a committed secret from secrets detection
are both equally valid reasons to stop before deploy — severity, not
which tool found it, decides whether the pipeline blocks.

## Stage 4: Deploy

Only after build, test, and scan all pass does deploy run. In a
GitOps-driven setup — which is what Chapters 3 and 4 covered — "deploy"
usually doesn't mean the pipeline pushes directly to the cluster at
all. It means the pipeline updates a manifest or image tag in the
GitOps repo, and ArgoCD or Flux picks up that change and reconciles it
into the cluster on its own pull-based cycle. The CI pipeline's job
ends at "the desired state in Git is now correct"; the GitOps
controller's job is making the cluster match it.

## A real multi-stage GitHub Actions workflow

```yaml
name: ci-cd
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build container image
        run: docker build -t registry.example.com/app:${{ github.sha }} .
      - run: docker push registry.example.com/app:${{ github.sha }}

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:integration

  scan:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: SAST
        run: semgrep ci
      - name: Secrets detection
        run: gitleaks detect --source .
      - name: IaC scan
        run: checkov -d infra/

  deploy:
    needs: scan
    runs-on: ubuntu-latest
    steps:
      - name: Update GitOps manifest
        run: |
          yq -i '.image.tag = "${{ github.sha }}"' gitops-repo/app/values.yaml
          git -C gitops-repo commit -am "deploy app@${{ github.sha }}"
          git -C gitops-repo push
```

Each `needs:` creates a hard dependency — `deploy` literally cannot
start until `scan` reports success, and `scan` cannot start until
`test` does. That's the gate chain made concrete in YAML.

## Key terms

| Term | Meaning |
|---|---|
| Build stage | Compiles/packages source and produces a versioned, deployable artifact (often a container image) |
| Unit vs. integration tests | Unit tests check code in isolation and run fast; integration tests check real interaction between components |
| SAST / SCA | Static scanning of your own code vs. scanning third-party dependencies for known CVEs |
| `needs:` | The GitHub Actions keyword that makes one job wait on another job's success before it starts |

## Check yourself

You're ready for Lesson 18 when you can explain why a failed secrets
scan should block deploy exactly as hard as a failed integration test
— what do both failures have in common, from the pipeline's point of
view?
