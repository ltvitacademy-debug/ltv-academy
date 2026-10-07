# Azure Repos, Boards & Artifacts

This chapter has stayed inside Pipelines since Lesson 11. This closing lesson looks at the three services around it: **Repos**, where `storefront-api`'s source actually lives; **Boards**, where Northbridge Retail tracks the work that pipeline ships; and **Artifacts**, where build output gets shared beyond a single pipeline run.

## What you'll learn

- Azure Repos: Git source control, pull requests, and branch policies that protect `main`
- Azure Boards: work items, and how linking a commit or PR to one closes the loop between planning and shipping
- Azure Artifacts: package feeds, and how they differ from the pipeline artifacts Lesson 12 already published
- How all three tie back into the pipeline this chapter built

## Azure Repos: Git, plus pull requests and policies

Azure Repos is standard Git — `storefront-api` clones, branches, and merges exactly like any GitHub repository. What Repos adds on top is **branch policies**: rules on `main` requiring a pull request before merging, a minimum number of reviewers, and (critically for this chapter) a passing pipeline run before the merge button unlocks.

![Azure DevOps project navigation with Repos and Files highlighted](/courses/ci-cd-pipelines/ch03/15-azure-repos-boards-and-artifacts/repos-files.png)
*Repos in the left-hand navigation, expanded to show Files — the same Git repository the pipeline's `trigger` and `pr` blocks watch.*
Source: [Microsoft Learn — Create a pull request](https://learn.microsoft.com/en-us/azure/devops/repos/git/pullrequest)

That last policy is what makes Chapter 3's `pr:` trigger from Lesson 12 meaningful — a branch policy can require the `BuildAndTest` job to succeed before a pull request into `main` is allowed to merge at all, turning CI from a nice-to-have into an enforced gate.

## Azure Boards: where the work is tracked

Boards holds **work items** — user stories, bugs, tasks — organized into backlogs, sprints, and kanban boards.

![Azure Boards kanban board showing work items in New, Active, and Resolved columns](/courses/ci-cd-pipelines/ch03/15-azure-repos-boards-and-artifacts/open-kanban-board-agile.png)
*A kanban board for a retail team, with work items moving through New, Active, and Resolved.*
Source: [Microsoft Learn — Kanban board quickstart](https://learn.microsoft.com/en-us/azure/devops/boards/boards/kanban-quickstart)

The real power shows up when a commit or pull request references a work item ID directly, for example `Fixes #482` in a commit message. Azure DevOps automatically links the two, so anyone looking at work item 482 can see exactly which commit, PR, and eventually which pipeline run shipped the fix — no separate spreadsheet, no manually updating a ticket's status by hand.

## Azure Artifacts: package feeds, not pipeline artifacts

It's easy to confuse two different things both called "artifact":

- A **pipeline artifact** (Lesson 12's `Docker@2` push, or a `PublishPipelineArtifact` task) is build output passed between stages or jobs within one pipeline run.
- An **Azure Artifacts feed** is a longer-lived package registry — npm, NuGet, Maven, or universal packages — that any pipeline, or any developer's machine, can pull a published package from.

![A pipeline run summary showing one published artifact](/courses/ci-cd-pipelines/ch03/15-azure-repos-boards-and-artifacts/published-artifact.png)
*A run's summary showing "1 published" artifact — pipeline-scoped output, not a long-lived package feed.*
Source: [Microsoft Learn — Publish and download pipeline artifacts](https://learn.microsoft.com/en-us/azure/devops/pipelines/artifacts/pipeline-artifacts)

If Northbridge Retail published a shared internal npm library that multiple services, including `storefront-api`, depend on, that library would live in an Azure Artifacts feed, not as a one-off pipeline artifact rebuilt by every consuming pipeline.

## How it all connects

A developer pushes a branch, opens a pull request linked to a Boards work item, the `pr` trigger from Lesson 12 runs CI, a branch policy blocks the merge until it's green, and once merged, the full `Build → DeployStaging → DeployProduction` pipeline from Lesson 13 takes over — authenticating with the service connections and variable groups from Lesson 14 along the way. That's the whole loop, Boards to production.

## Key terms

- **Branch policy** — a rule on a branch (e.g. `main`) requiring reviewers and/or a passing pipeline before a PR can merge
- **Work item** — a trackable unit of work in Azure Boards (story, bug, task)
- **Linked work item** — a work item automatically connected to a commit or PR that references its ID
- **Pipeline artifact** — build output passed between stages or jobs within a single pipeline run
- **Azure Artifacts feed** — a longer-lived package registry (npm, NuGet, Maven, universal) shared across pipelines and developers
