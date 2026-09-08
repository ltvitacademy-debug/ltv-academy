# Lesson 50 — Git Integration & Source Control

**Chapter 10 · Security, DevOps & CI/CD · Lesson 3 of 5**

## What you'll learn

- Why authoring directly against the Data Factory service has real limits
- Feature branches, pull requests, and the collaboration branch
- Why the `adf_publish` branch exists and what it actually holds
- The genuinely important rule about Key Vault-backed secrets

## The limits of authoring without Git

By default, Data Factory Studio authors directly against the live
service — every change either gets published immediately via
**Publish All**, or it doesn't exist at all. That has three real
consequences worth naming: **no draft state** (you can't save
half-finished work), **no real collaboration model** (no code
review), and **no ARM template for the factory itself**. Connecting a
real Git repository — Azure Repos or GitHub — fixes all three at
once.

## Feature branches and pull requests

Every Git-connected factory has a **collaboration branch** (`main` by
default) — the only branch you can actually publish from. Real work
happens on feature branches instead:

![New branch dropdown in Data Factory Studio, with a name field and a base-branch selector.](/courses/data-factory/ch10/50-git-integration-source-control/new-branch.png)
*Create a feature branch, make your changes there, and save freely — no publish validation required until you're actually ready.*

When you're ready to bring those changes into the shared branch, you
open a real pull request, right from the branch dropdown:

![Branch dropdown menu showing "Create pull request", "New branch", and a list of existing branches including "main branch" and "test branch".](/courses/data-factory/ch10/50-git-integration-source-control/create-pull-request.png)
*This routes you into Azure Repos or GitHub's own pull request flow — code review, comments, and approval, exactly like reviewing application code.*

## Publish only works from the collaboration branch

Here's the constraint that makes the whole model coherent:

![Data Factory Studio toolbar on the main branch, with the Publish button enabled and highlighted.](/courses/data-factory/ch10/50-git-integration-source-control/publish-changes.png)
*Publish is only available when you're on the collaboration branch — you genuinely cannot publish directly from a feature branch, by design.*

This is precisely what makes "can edit, can't publish" from Lesson 49
work in practice: someone with repo write access can commit freely
to a feature branch, open a pull request, and get reviewed — but only
someone with actual Data Factory Contributor permissions on the
resource group can complete the publish that pushes those changes
live.

## Where publishing actually goes: the `adf_publish` branch

Publishing doesn't touch the collaboration branch — it generates
**ARM templates** representing your published factory state and
writes them to a separate branch, `adf_publish` by default. That
branch is what your CI/CD release pipeline (Lesson 52) actually
deploys from, not `main`. **The collaboration branch is never a
live reflection of what's actually running** — it must be published
manually (or via automation) to take effect.

## The one thing Git integration never stores

A deliberate, important exception: **Data Factory never writes
secrets into Git.** Any linked service still using a raw password or
connection string (not backed by Key Vault) publishes **immediately**
to the live service the moment you save it, bypassing the Git
workflow entirely for that one resource. This is precisely why Lesson
48's Key Vault pattern matters here specifically — a Key
Vault-referenced secret has nothing sensitive to keep out of source
control, so it flows through the normal branch-and-publish process
like everything else.

## Key terms

| Term | Meaning |
|---|---|
| Collaboration branch | The one branch (`main` by default) you can actually publish from |
| Publish branch | `adf_publish` by default — holds the generated ARM templates your CI/CD deploys |
| Feature branch | A working branch for changes not yet ready to merge and publish |

## Lab

1. If you have Fabric or ADF access with Git configured, create a
   feature branch and make one small change without publishing it.
2. Open a pull request from that branch back into your collaboration
   branch.
3. Write one sentence explaining why a non-Key-Vault-backed linked
   service password publishes immediately, bypassing the normal
   branch workflow.

## Check yourself

You're ready for Lesson 51 when you can explain, in one sentence, why
the collaboration branch is never guaranteed to match what's actually
live in the Data Factory service.
