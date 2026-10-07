# Azure DevOps Overview

Chapter 2 built Northbridge Retail's first pipelines in GitHub Actions. This chapter rebuilds the same ideas in **Azure DevOps**, the other major platform you'll meet on the job — and the one many enterprises, including larger retailers like Northbridge, already run their work tracking and source control on. This lesson is the map: what Azure DevOps actually is, its five services, and where Azure Pipelines — the part you'll spend the rest of this chapter in — fits.

## What you'll learn

- What Azure DevOps is, and how it differs from "Azure" the cloud platform
- The five services inside it: Boards, Repos, Pipelines, Test Plans, and Artifacts
- How organizations and projects are structured
- YAML pipelines vs. the older Classic designer, and which one this course uses

## Azure DevOps is not Azure

Despite the name, Azure DevOps isn't a cloud compute service — it's a separate, standalone **software delivery platform**. A team can use Azure DevOps to plan, build, and ship an application that runs entirely on AWS, on-premises, or nowhere near Microsoft's cloud at all. Northbridge Retail happens to deploy to Azure Kubernetes Service, so the two work together naturally in this course, but the pairing is a choice, not a requirement.

## The five services

Every Azure DevOps project gives you five services, accessible from the left-hand navigation:

- **Boards** — work item tracking: backlogs, sprints, kanban boards. Covered in Lesson 15.
- **Repos** — Git source control, pull requests, and branch policies. Also Lesson 15.
- **Pipelines** — build (CI) and release (CD) automation. This chapter's main focus, Lessons 12-13.
- **Test Plans** — manual and exploratory testing, outside this course's scope.
- **Artifacts** — package feeds (npm, NuGet, Maven, universal packages) for sharing build output. Lesson 15.

A team doesn't have to use all five. Plenty of organizations use Azure Pipelines against a GitHub repo instead of Azure Repos — pipelines don't care where the source code lives.

## Organizations and projects

Everything in Azure DevOps lives under an **organization** (one per company or business unit, usually), which contains one or more **projects**. Northbridge Retail's engineers work inside a project simply named `storefront`, which holds the Boards backlog, the `storefront-api` Git repository, and every pipeline this chapter builds, all in one place.

![Azure DevOps project navigation with Pipelines highlighted](/courses/ci-cd-pipelines/ch03/11-azure-devops-overview/pipelines-overview.png)
*The left-hand navigation inside an Azure DevOps project — Boards, Repos, Pipelines, and the rest, one click apart.*
Source: [Microsoft Learn — Pipelines get started](https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/key-pipelines-concepts)

## YAML pipelines vs. the Classic designer

Azure Pipelines offers two ways to define a pipeline:

- **YAML pipelines** — the pipeline's definition lives as a file (conventionally `azure-pipelines.yml`) checked into the same repo as the code it builds. Version-controlled, reviewable in pull requests, and the format Microsoft recommends for new work.
- **Classic pipelines** — built visually through a drag-and-drop designer in the browser, with no file checked into source control.

This course uses YAML pipelines exclusively, for the same reason Chapter 2's GitHub Actions workflows lived in `.github/workflows/`: a pipeline that isn't version-controlled can't be code-reviewed, diffed, or rolled back like the application code it ships.

## Key terms

- **Azure DevOps** — Microsoft's software delivery platform (Boards, Repos, Pipelines, Test Plans, Artifacts); distinct from the Azure cloud platform itself
- **Organization** — the top-level container in Azure DevOps, typically one per company
- **Project** — a workspace inside an organization holding one team's backlog, repos, and pipelines
- **YAML pipeline** — a pipeline defined in a version-controlled file, the format this course uses
- **Classic pipeline** — a pipeline built through Azure DevOps's visual designer, with no file in source control
