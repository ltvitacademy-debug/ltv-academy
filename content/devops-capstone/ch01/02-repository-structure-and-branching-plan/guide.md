# Repository Structure & Branching Plan

Before you write a single Dockerfile or Terraform resource, you need to know where things live and how a change is allowed to move through the repository. This lesson covers the monorepo layout for `northbridgeretail/storefront`, the trunk-based branching plan the team uses, and how dev, staging, and production map onto branches and tags. Get this right first — every pipeline you build in later phases assumes this structure.

## What you'll learn

- The full monorepo layout and what lives in each top-level folder
- Trunk-based development: why `main` is always deployable
- The PR and review process: feature branches, required reviews, squash merges
- How environment promotion maps to branches versus tags

## The monorepo layout

Northbridge Retail keeps both services, infrastructure, and pipelines in a single GitHub repository, `northbridgeretail/storefront`:

```
storefront/
  services/
    product-catalog/        # Node.js 20 + Express app + Dockerfile
    checkout/                # Python 3.12 + FastAPI app + Dockerfile
  infra/
    terraform/                # azurerm Terraform for all Azure resources
  charts/
    product-catalog/          # Helm chart for product-catalog
    checkout/                  # Helm chart for checkout
  .github/
    workflows/                 # GitHub Actions CI/CD pipeline definitions
  docs/
    runbooks/                  # on-call runbooks
    architecture-diagram.*     # the diagram from Lesson 1
    postmortems/                # incident postmortems (see Chapter 5)
```

A monorepo keeps the two services, their infrastructure, and their pipelines versioned together — when a change to `checkout` needs a matching change to its Helm chart, both land in the same PR and the same commit history.

## Trunk-based development

Northbridge Retail uses **trunk-based development**: `main` is always deployable. Nobody works for days on a long-lived branch that drifts out of sync. Instead:

```bash
# start every change from an up-to-date main
git checkout main
git pull
git checkout -b feature/CAT-214-add-product-search-endpoint

# work, commit, push
git push -u origin feature/CAT-214-add-product-search-endpoint
```

Feature branches are named `feature/<ticket>-<short-desc>` — for example `feature/CAT-214-add-product-search-endpoint` or `feature/CHK-108-retry-paymentpro-timeout`. The ticket prefix makes it easy to trace a branch back to the work item that justified it.

## The PR and review process

Every feature branch becomes a pull request against `main`. Two rules are non-negotiable, enforced as GitHub branch protection rules on `main`:

- **At least 1 reviewer approval** before merge
- **CI must pass** — lint, unit tests, container build, Trivy scan, and gitleaks scan (the full pipeline you'll build in Phase 3)

When both are satisfied, the PR is **squash merged** — all of the branch's individual commits collapse into one clean commit on `main`. This keeps `main`'s history readable: one commit per shipped change, not a trail of "fix typo" and "wip" commits.

```bash
# after approval and green CI, merge via the GitHub UI or:
gh pr merge 214 --squash --delete-branch
```

## How environments map to branches and tags

This is the piece that connects branching to deployment, and it's worth memorizing because every later phase depends on it:

| Trigger | Environment | How |
|---|---|---|
| Merge to `main` | `northbridge-dev` namespace | Automatic — every merge deploys |
| Semver tag pushed (e.g. `v1.4.0`) | `northbridge-staging` namespace | Automatic on tag push |
| Staging deploy succeeds | `northbridge-prod` namespace | Manual approval gate, then deploy |

```bash
# a maintainer decides main is ready to ship
git checkout main
git pull
git tag v1.4.0
git push origin v1.4.0
# -> staging deploys automatically
# -> production waits for a reviewer to approve the GitHub Environment gate
```

Dev deploys constantly and cheaply, because every merge to `main` is assumed safe — that's the entire point of trunk-based development and required CI. Staging and production only move on a deliberate, versioned decision: cutting a tag. That distinction — "every merge is fine for dev" versus "only a tagged release goes further" — is what lets the team ship to dev dozens of times a day without ever worrying it'll accidentally expose something half-finished to customers.

## Key terms

- **Trunk-based development** — `main` is always deployable; no long-lived divergent branches
- **`feature/<ticket>-<short-desc>`** — the required naming convention for feature branches
- **Squash merge** — collapses a branch's commits into one commit on `main` at merge time
- **Semver tag (e.g. `v1.4.0`)** — the trigger that promotes a build to staging, and eventually prod
- **GitHub Environments protection rule** — the manual approval gate guarding the production deploy
