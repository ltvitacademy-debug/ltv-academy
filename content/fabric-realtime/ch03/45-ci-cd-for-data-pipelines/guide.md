# Lesson 45 — CI/CD for Data Pipelines

**Chapter 3 · Production Data Engineering · Lesson 45 of 70**

## What you'll learn

- What CI/CD actually automates, on top of Lesson 44's environments
- A concrete pipeline: commit → build → test → deploy
- Fabric's REST APIs as the mechanism behind an automated deployment
- Why "click the Deploy button" doesn't scale past one person

## What CI/CD automates

Lesson 44 established three environments and a rule: nothing skips
from dev to prod without passing through test. **CI/CD** —
Continuous Integration, Continuous Deployment — is the automation
that enforces that rule without a human remembering to follow it
every time. Every commit to the Git-integrated workspace (Lesson 15)
can trigger a pipeline that builds, tests, and deploys automatically,
in the same order, every single time.

## A concrete pipeline

```yaml
# azure-pipelines.yml (conceptual)
trigger:
  branches: [main]

stages:
  - stage: Build
    jobs:
      - job: ValidateItems
        steps:
          - script: fabric-cli validate ./workspace-items

  - stage: Test
    jobs:
      - job: RunPySparkTests
        steps:
          - script: pytest tests/ --workspace test

  - stage: Deploy
    jobs:
      - job: PromoteToTest
        steps:
          - script: fabric-cli deploy --to test
      - job: PromoteToProd
        dependsOn: PromoteToTest
        steps:
          - script: fabric-cli deploy --to prod
```

Each stage only runs if the one before it succeeded — a failed test
stops the deploy stage from ever running, which is the entire point:
a broken change simply can't reach prod, because the pipeline itself
refuses to let it.

## Fabric's REST APIs behind the automation

Lesson 15's Deployment Pipeline can be triggered manually through
the Fabric UI, or through its **REST API** — the same action,
callable from a script instead of a click. CI/CD tools (Azure
DevOps, GitHub Actions) call that API as one step in a larger
scripted process, which is what turns a manual, human-triggered
action into a repeatable, automatic one.

## Why "click the Deploy button" doesn't scale

One person clicking Deploy after eyeballing a change works fine for
a single developer on a small project. It breaks down the moment a
second person joins: nothing guarantees they follow the same steps,
nothing stops a deploy from happening without tests actually
running, and nothing gives you a record of exactly what happened and
when. CI/CD isn't about that one person no longer being trusted —
it's about not needing to rely on any one person perfectly
remembering the same steps, every single time.

## Key terms

| Term | Meaning |
|---|---|
| CI/CD | Automation that enforces build → test → deploy, every time, without relying on memory |
| Fabric REST API | The scriptable version of Lesson 15's Deployment Pipeline |
| Staged pipeline | Each stage gates the next — a failed test blocks the deploy |

## Check yourself

You're ready for Lesson 46 when you can explain, without looking: why
does a failed test stage in a CI/CD pipeline prevent a deploy stage
from running at all, rather than just producing a warning?
