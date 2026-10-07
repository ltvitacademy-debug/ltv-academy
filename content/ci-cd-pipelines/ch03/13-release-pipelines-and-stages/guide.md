# Release Pipelines & Stages

Lesson 12 left `storefront-api` with one job: build, test, push an image. A real pipeline doesn't stop there — it has to get that image into staging, and eventually production, with a human in the loop before anything customer-facing changes. This lesson adds **stages** to the YAML pipeline and shows how approvals gate a promotion from staging to production.

## What you'll learn

- How multi-stage YAML pipelines replaced the old Classic Release pipelines
- The `stages` → `jobs` → `steps` hierarchy, and how `dependsOn` chains stages together
- Environments, and how they differ from a plain deployment job
- How pre-deployment approvals put a real person between a merge and a production deploy

## YAML stages vs. Classic Release pipelines

Before multi-stage YAML, Azure DevOps split CI and CD into two separate tools: a YAML **build** pipeline produced an artifact, and a separate, visually-designed **Classic Release** pipeline picked it up and deployed it through environments. That split meant half the deployment logic lived outside source control.

Multi-stage YAML pipelines fold both halves into one file. `storefront-api`'s pipeline now has a `Build` stage and a `Deploy` stage, in the same `azure-pipelines.yml` Lesson 12 started:

```yaml
stages:
  - stage: Build
    jobs:
      - job: BuildAndTest
        steps:
          - script: npm ci && npm test -- --ci
          - task: Docker@2
            inputs:
              command: "buildAndPush"
              repository: "storefront-api"

  - stage: DeployStaging
    dependsOn: Build
    jobs:
      - deployment: DeployToStaging
        environment: "storefront-staging"
        strategy:
          runOnce:
            deploy:
              steps:
                - script: echo "Deploying to staging AKS namespace"
```

`dependsOn: Build` means `DeployStaging` only starts once `Build` finishes successfully — by default, stages run in the order they'd naturally depend on, but writing `dependsOn` explicitly keeps that order obvious to the next engineer reading the file.

## Deployment jobs and environments

Notice `DeployStaging` uses `deployment:` instead of `job:`. A **deployment job** is a special job type built for releasing to a target, and it's always paired with an **environment** — in this case, `storefront-staging`. Environments aren't just labels: they're real Azure DevOps resources that track every deployment's history, and they're where approval gates actually live.

## Adding a production gate

Promoting to production needs a second stage, depending on `DeployStaging`, targeting a `storefront-production` environment:

```yaml
  - stage: DeployProduction
    dependsOn: DeployStaging
    jobs:
      - deployment: DeployToProd
        environment: "storefront-production"
        strategy:
          runOnce:
            deploy:
              steps:
                - script: echo "Deploying to production AKS namespace"
```

By itself, this stage would deploy automatically the moment staging succeeds. The gate comes from the environment, not the YAML — configuring `storefront-production` with a **pre-deployment approval** means the stage pauses and waits for a named approver before any step inside it runs.

![Pre-deployment approvals configuration for a Production environment](/courses/ci-cd-pipelines/ch03/13-release-pipelines-and-stages/select-approvers.png)
*Configuring pre-deployment approvals on a Production environment — an approver is added, with a 30-day timeout and a policy preventing the requester from approving their own release.*
Source: [Microsoft Learn — Define approvals and checks](https://learn.microsoft.com/en-us/azure/devops/pipelines/release/approvals/approvals)

For Northbridge Retail, this means a merge to `main` deploys to staging automatically, but production always waits on a lead engineer's explicit sign-off — Continuous Delivery, not Continuous Deployment, for the environment customers actually reach.

## Key terms

- **Stage** — a major phase of a pipeline (e.g. Build, DeployStaging, DeployProduction); stages can depend on one another
- **dependsOn** — the keyword that makes one stage wait for another to finish
- **Deployment job** — a job type (`deployment:`) specialized for releasing to a target, paired with an environment
- **Environment** — a tracked deployment target that records history and hosts approval gates
- **Pre-deployment approval** — a configured gate requiring a named person to approve before a stage's steps run
