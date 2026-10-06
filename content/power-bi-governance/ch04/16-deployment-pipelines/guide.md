# Lesson 16 — Deployment Pipelines

**Chapter 4 · Lifecycle and Enterprise BI · Lesson 16 of 20**

## What you'll learn

- How a deployment pipeline gets created, right from a workspace's own toolbar
- How a new pipeline's three stages start empty and get named before anything else happens
- The structure every deployment pipeline shares: three linked Power BI workspaces
- Where the actual governance controls for each stage live

## Chapter 4 begins

Chapters 1 through 3 covered who can see content, how it's secured, and how it earns trust. Chapter 4 covers what happens to content *over time* — how it moves safely from someone's first draft to something the whole organization relies on. **Deployment pipelines** are Power BI's built-in answer.

## Creating a pipeline

A pipeline starts from an ordinary workspace, with a button sitting right in the main toolbar next to creating an app.

![Screenshot of a Power BI workspace toolbar with New, Upload, Create deployment pipeline, Create app, and Manage access options, with Create deployment pipeline outlined in a red box.](/courses/power-bi-governance/ch04/16-deployment-pipelines/create-pipeline.png)
*Create deployment pipeline sits in the same workspace toolbar as creating an app — governance built into the everyday workflow.*

That placement matters: this isn't a separate admin tool bolted onto Power BI. It's part of the same toolbar a report author already uses, which is exactly why it gets adopted instead of ignored.

## Naming the stages

A brand-new pipeline starts as three empty stage cards, waiting to be named and, later, connected to real workspaces.

![Screenshot of three empty deployment pipeline stage cards in a row, the first with an editable name field and checkmark, the other two still labeled Test and Production with dashed borders.](/courses/power-bi-governance/ch04/16-deployment-pipelines/customize-pipeline-new.png)
*A new pipeline starts as three empty, named stages — the structure comes first, content gets assigned after.*

Most organizations keep Microsoft's default names — Development, Test, Production — because they're already the vocabulary every other part of this chapter assumes.

## The structure behind the three names

Every deployment pipeline, no matter what you name its stages, follows the same underlying structure.

| Stage | What it actually is |
|---|---|
| Development | A real Power BI workspace, assigned to this stage |
| Test | A separate, real Power BI workspace, assigned to this stage |
| Production | A separate, real Power BI workspace, assigned to this stage |

That's the detail easy to miss: a deployment pipeline doesn't create some new kind of container. It's a wrapper around three ordinary workspaces you likely already know how to govern — the same workspace roles, the same tenant settings, the same sensitivity labels from earlier chapters all still apply to each one individually.

## Where governance actually lives

Each stage has its own settings, separate from the pipeline as a whole — unassigning the workspace, managing workspace settings, controlling access, or updating a published app.

![Screenshot of a stage's "..." menu open, showing Stage settings, Unassign workspace, Workspace settings, Workspace access, and a grayed-out Update app option.](/courses/power-bi-governance/ch04/16-deployment-pipelines/stage-settings-new.png)
*Stage settings is where governance actually lives — who can unassign a workspace, manage it, or update the published app.*

This is also where a governance team draws its real boundary: who's allowed to assign (or unassign) a workspace to the Production stage is a much higher-stakes permission than who can do the same for Development.

## Key terms

| Term | Meaning |
|---|---|
| Deployment pipeline | A Power BI feature connecting three stages for moving content between workspaces |
| Stage | One link in a pipeline (typically Development, Test, Production), backed by its own real workspace |
| Stage settings | Per-stage controls for assigning, unassigning, and managing the workspace behind a stage |

## Lab

Sketch the three-stage pipeline you'd set up for a report you've built or imagined in this course. Name each stage's workspace, and write one sentence for each describing who in your organization should be allowed to assign a workspace to it — notice how that answer gets stricter as you move from Development toward Production.

## Check yourself

Without looking back, can you explain what a deployment pipeline's stage actually *is* under the hood — and why that detail matters for applying everything you already know about workspace governance?
