# Script — Release Pipelines & Stages

## Segment 1 (title)

Last lesson left storefront-api with one job: build, test, push an image. A real pipeline has to get that image into staging, and eventually production, with a human in the loop before anything customer-facing changes. This lesson adds stages to the pipeline to do exactly that.

## Segment 2 (steps)

Before multi-stage YAML existed, Azure DevOps split CI and CD into two separate tools — a YAML build pipeline produced an artifact, and a separate, visually-designed Classic Release pipeline picked it up and deployed it through environments. That split meant half the deployment logic lived outside source control. Multi-stage YAML pipelines fold both halves into one file instead.

## Segment 3 (code)

Here's storefront-api's pipeline with a Build stage and a DeployStaging stage, both in the same azure-pipelines.yml file from Lesson 12. dependsOn: Build means DeployStaging only starts once Build finishes successfully. Notice DeployStaging uses deployment instead of job — that's a deployment job, paired with an environment called storefront-staging, which tracks every release's history.

## Segment 4 (screenshot)

Promoting to production needs its own gate, and that gate lives on the environment, not the YAML. Here's a real Production environment configured with pre-deployment approvals — a named approver, a thirty-day timeout, and a policy that blocks the person requesting the release from approving their own deployment.

## Segment 5 (code)

The DeployProduction stage itself looks almost identical to staging — dependsOn: DeployStaging, targeting a storefront-production environment. Written this way alone, it would deploy automatically the moment staging succeeds. The approval configured on the environment is what actually pauses it, waiting on a lead engineer's explicit sign-off — continuous delivery, not continuous deployment, for the environment customers actually reach.

## Segment 6 (outro)

Next lesson, we look at exactly what those Deploy stages authenticate with — service connections and variable groups.
