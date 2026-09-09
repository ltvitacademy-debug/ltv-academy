# Lesson 2 — Creating a Databricks Workspace

**Chapter 1 · Databricks Fundamentals · Lesson 2 of 57**

## What you'll learn

- A Databricks **workspace** — the container for every cluster, notebook, and job
- Creating one from the Azure Portal: the real steps
- The three pricing tiers, and what actually differs between them
- Serverless vs. classic workspace type — the current default choice

## What a workspace actually is

A workspace is the top-level container in Azure Databricks — every
cluster, notebook, job, and (starting in Chapter 4) Unity Catalog
object you create lives inside exactly one workspace. It's a real
Azure resource, created the same way any other Azure resource is:
through the Azure Portal, the CLI, or infrastructure-as-code.

## Creating one through the Azure Portal

1. Sign in to the [Azure Portal](https://portal.azure.com) and select **Create a resource → Analytics → Azure Databricks**.
2. Under **Azure Databricks Service**, fill in:
   - **Workspace name** — any name you'll recognize later
   - **Subscription** and **Resource group** — same concepts from Foundations' storage account lessons
   - **Location** — a region close to where your data actually lives
   - **Pricing Tier** — Standard, Premium, or Trial
   - **Workspace type** — Serverless or Hybrid (classic)
3. Select **Review + Create**, then **Create**. Deployment usually takes a few minutes.
4. Once **Running**, open the workspace to log in for the first time — your account is automatically added as an admin.

This is exactly the same "fill in a form, review, create" pattern
Foundations' Lesson 2 walked through for a storage account —
Databricks workspaces are provisioned the same way every other Azure
resource is.

## Pricing tiers — what actually differs

| Tier | What you get |
|---|---|
| **Standard** | Core notebook/cluster/job features, no advanced security controls |
| **Premium** | Adds role-based access control, audit logging, and the features Unity Catalog (Chapter 4) depends on |
| **Trial** | Time-limited, for evaluation only |

Real production workspaces almost always use **Premium** — Unity
Catalog governance, covered in this course's Chapter 4, requires it.

## Serverless vs. classic (Hybrid)

**Serverless** workspaces manage compute entirely behind the
scenes — no cluster configuration at creation time, Databricks
handles provisioning per-query. **Hybrid** (classic) workspaces
create a dedicated virtual network, and you configure and manage
clusters yourself (Lesson 4 of this chapter). Microsoft's own
guidance now recommends serverless for the simplest path; this
course covers classic cluster management too, since understanding
what's happening underneath is exactly the kind of thing a real data
engineer needs to know, even when serverless hides it by default.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | The top-level container for every cluster, notebook, and job |
| Premium tier | Required for Unity Catalog governance features |
| Serverless vs. Hybrid | Fully managed compute vs. self-managed classic clusters |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does a real production workspace usually need the Premium tier
rather than Standard?
