# Lesson 2 — Fabric Workspaces

**Chapter 1 · Microsoft Fabric · Lesson 2 of 70**

## What you'll learn

- A Fabric workspace: the container every Fabric item lives inside
- Creating one, and assigning it to a capacity
- Roles: Admin, Member, Contributor, Viewer
- Why this feels familiar, coming from Databricks & Delta Lake

## What a workspace actually is

A **workspace** is the container for every Fabric item — a
lakehouse, a warehouse, a notebook, an eventstream, a report. This
is the same organizing role Databricks & Delta Lake's Lesson 2
workspace played there: everything you build lives inside exactly
one workspace, and a workspace is the first thing you create before
anything else.

## Creating one, and assigning capacity

1. From the Fabric portal, select **Workspaces → New workspace**.
2. Give it a name (this course uses `nyc-taxi-fabric`).
3. Under **License mode**, assign it to a **capacity** — a Fabric
   trial capacity, or a paid F-SKU (Lesson 14 covers the real
   pricing tiers).
4. Select **Apply**.

Unlike Databricks & Delta Lake's Lesson 2, there's no VM size, no
runtime version, no autoscaling bounds to configure — the capacity
assignment is the only compute-related decision, and it's a
workspace-level setting, not a per-item one.

## Roles: who can do what

| Role | Can do |
|---|---|
| **Admin** | Everything, including managing workspace settings and other members' roles |
| **Member** | Create, edit, and share items; cannot change workspace-level settings |
| **Contributor** | Create and edit items; cannot share them with others |
| **Viewer** | Read-only access to items |

This is a simpler, workspace-scoped version of the access-control
idea Databricks & Delta Lake's Unity Catalog chapter covered in
much more depth (`GRANT`/`REVOKE`, per-object) — Fabric's workspace
roles are coarser, applying to everything in the workspace at once,
rather than per-table.

## Why this feels familiar

Everything from this lesson maps directly onto a concept Databricks
& Delta Lake already established: a workspace as the top-level
container, a capacity as the compute Databricks & Delta Lake's
clusters provided, and roles as a simpler cousin of Unity Catalog's
`GRANT`. Recognizing the shape of a concept you already know,
even under a different name, is most of what learning a second
platform actually is.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | The container for every Fabric item |
| Capacity assignment | The one compute decision made at workspace creation, not per-item |
| Workspace role | Admin/Member/Contributor/Viewer — coarser than Unity Catalog's per-object grants |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
is a Fabric workspace's capacity assignment a workspace-level
decision, rather than something chosen per notebook or per item?
