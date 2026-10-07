# Deployment Environments

Chapter 4 ended with a pinned, versioned image sitting in a registry. Chapter 5 is about what happens next: getting that exact artifact running somewhere real, safely. Northbridge Retail doesn't deploy `storefront-api` straight to the servers customers hit — it moves through a sequence of **environments**, each one a progressively more trusted (and more cautious) place to run the same code.

## What you'll learn

- What a deployment environment actually is, beyond just "a different server"
- The dev → staging → production sequence, and what changes at each stage
- How to declare an environment in a pipeline, and what protection rules attach to it
- Why production needs different data, different scale, and different safeguards than staging

## An environment is a target, with rules attached

A deployment environment is a named destination a pipeline can deploy to — but naming it is almost beside the point. What actually matters is what gets *attached* to that name: which secrets are available only there, who (if anyone) has to approve a deployment before it proceeds, and which branches are even allowed to target it. Two environments can run the exact same Kubernetes cluster and still behave completely differently in the pipeline, because the rules attached to their names are different.

## The standard sequence: dev, staging, production

```yaml
jobs:
  deploy-dev:
    environment: dev
    runs-on: ubuntu-latest
    steps:
      - run: kubectl apply -f k8s/dev/ --context=dev-cluster

  deploy-staging:
    needs: deploy-dev
    environment: staging
    runs-on: ubuntu-latest
    steps:
      - run: kubectl apply -f k8s/staging/ --context=staging-cluster

  deploy-production:
    needs: deploy-staging
    environment: production
    runs-on: ubuntu-latest
    steps:
      - run: kubectl apply -f k8s/production/ --context=prod-cluster
```

- **Dev** — every merge to `main` lands here automatically. It's disposable: Northbridge Retail's engineers expect it to break occasionally, and that's fine, because nothing real depends on it.
- **Staging** — a close mirror of production's configuration, running against realistic (but not real customer) data. This is where a release gets exercised one more time before anyone trusts it with real traffic.
- **Production** — where actual customers place actual orders. Everything in Chapters 4 and 5 exists to make sure what lands here has already been proven safe everywhere upstream of it.

The `needs:` chain means production can't be reached except through staging, and staging can't be reached except through dev — there's no path that skips a step.

## Declaring the environment in Azure DevOps

The same concept exists outside GitHub Actions. Azure DevOps exposes environments as a first-class object in the pipelines UI, listed under **Pipelines → Environments**:

![Screenshot of the Azure DevOps left navigation with Environments highlighted under Pipelines.](/courses/ci-cd-pipelines/ch05/21-deployment-environments/environments-nav.png)
*Environments get their own place in the navigation — a target a pipeline deploys to, separate from the pipeline definition itself.*
Source: [Microsoft Learn — Define approvals and checks](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/environments)

Each environment tracks every run that has ever targeted it, which resources (a Kubernetes namespace, a VM group) it's actually connected to, and the approval and check rules — covered in full in Lesson 22 — that gate a deployment reaching it:

![Screenshot of an Azure DevOps environment's run view, showing deployment jobs and their status.](/courses/ci-cd-pipelines/ch05/21-deployment-environments/environments-run.png)
*Every run against this environment is tracked in one place, independent of which pipeline definition triggered it.*
Source: [Microsoft Learn — Define approvals and checks](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/environments)

## Why production needs different safeguards

Staging can use a scaled-down copy of the database and a handful of test accounts. Production has real customer data, real payment processing, and real consequences for downtime — which is exactly why the rules attached to the `production` environment (required approvals, restricted secrets, limited deploy windows) are stricter than the rules attached to `dev` or `staging`, even when the underlying deployment command looks identical.

## Key terms

| Term | Meaning |
|---|---|
| Deployment environment | A named deployment target with its own secrets, rules, and approval requirements |
| Dev environment | The first, most disposable deployment target; every merge typically lands here |
| Staging environment | A production-like environment used to validate a release before it reaches real users |
| Production environment | The environment serving real customers, protected by the strictest rules |
