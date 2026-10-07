# Build Pipelines in YAML

With the lay of the land from Lesson 11, it's time to write a real pipeline. This lesson builds `azure-pipelines.yml` for Northbridge Retail's `storefront-api` from the ground up: trigger, agent, and the steps that install dependencies, run tests, and build a container image — the same CI job Chapter 2 built in GitHub Actions, now in Azure Pipelines' own syntax.

## What you'll learn

- The five building blocks of a YAML pipeline: trigger, pool, stages, jobs, and steps
- How to write a CI job that checks out code, runs tests, and builds a Docker image
- The difference between a `script` step and a `task` step
- How to read a real pipeline run's summary once it finishes

## The trigger and the agent pool

Every pipeline starts with what runs it and what it runs on:

```yaml
trigger:
  branches:
    include:
      - main

pr:
  branches:
    include:
      - main

pool:
  vmImage: "ubuntu-latest"
```

`trigger` controls CI — what starts a run automatically on push. `pr` controls validation builds on pull requests targeting `main`. `pool` picks the agent: `ubuntu-latest` is a Microsoft-hosted agent, pre-loaded with common tooling, torn down after the job finishes.

## Jobs and steps

A pipeline's actual work happens inside `jobs`, and each job is a list of `steps`:

```yaml
jobs:
  - job: BuildAndTest
    steps:
      - checkout: self

      - task: UseNode@3
        inputs:
          version: "20.x"

      - script: npm ci
        displayName: "Install dependencies"

      - script: npm test -- --ci
        displayName: "Run unit tests"
```

Two kinds of steps appear here. A **task** (`UseNode@3`) is a pre-built, versioned building block from Azure Pipelines' task catalog — install a runtime, publish a file, deploy to a target. A **script** step runs a raw shell command directly. Reach for a task when one exists for what you need; fall back to `script` for anything more custom.

## Building and pushing the container image

`storefront-api` ships as a container, so the CI job finishes with a build and push step:

```yaml
      - task: Docker@2
        inputs:
          containerRegistry: "northbridgeRetailACR"
          repository: "storefront-api"
          command: "buildAndPush"
          Dockerfile: "**/Dockerfile"
          tags: |
            $(Build.BuildId)
```

`containerRegistry` references a **service connection** — a stored, authenticated link to Northbridge Retail's Azure Container Registry, covered in full in Lesson 14. Tagging the image with `$(Build.BuildId)`, a built-in pipeline variable, gives every build a unique, traceable tag instead of silently overwriting `latest`.

## Reading a pipeline run

Every run produces a summary: which stages ran, how long each job took, how many commits and work items are linked, and how many artifacts were published.

![Azure Pipelines run summary showing Build and Deploy stages](/courses/ci-cd-pipelines/ch03/12-build-pipelines-in-yaml/pipeline-run-summary.png)
*A completed run's summary — two stages, Build and Deploy, each with one completed job and a published artifact.*
Source: [Microsoft Learn — Pipelines get started](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/key-pipelines-concepts)

This run only has a CI job so far; Lesson 13 adds the Deploy stage shown here, turning this into a real multi-stage pipeline.

## Key terms

- **Trigger** — the event (branch push) that starts a pipeline run automatically
- **Pool** — the agent (Microsoft-hosted or self-hosted) a job runs on
- **Job** — a unit of work in a pipeline, made of an ordered list of steps
- **Task** — a pre-built, versioned pipeline building block (e.g. `Docker@2`)
- **Script step** — a step that runs a raw shell command directly
- **Build.BuildId** — a built-in variable holding the current run's unique numeric ID
