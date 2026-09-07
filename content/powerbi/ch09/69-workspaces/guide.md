# Lesson 69 — Workspaces

**Chapter 9 · Power BI Service & Fabric · Lesson 3 of 8**

## What you'll learn

- What a workspace is and why it's the container for everything else
  in this chapter
- How to create one, and the settings worth knowing before you do
- Workspace roles: Admin, Member, Contributor, Viewer
- Why deleting a workspace is permanent

## What a workspace actually is

A **workspace** is where designers store and manage a collection of
dashboards, reports, semantic models, and (in Fabric) other items like
lakehouses and notebooks. It's the collaborative unit everything else
in this chapter builds on: you publish reports *into* a workspace, you
package a workspace's content *into* an app, and you grant people
access *to* a workspace so they can help build it.

![Screenshot of a Power BI service workspace named Customer Profitability, listing a dashboard, report, workbook, and dataset.](/courses/power-bi/ch09/69-workspaces/power-bi-new-workspaces.png)
*A workspace's content list — every item you've published so far lives inside one of these.*

You create and manage workspaces entirely in the service (a browser at
`app.powerbi.com`) — as Lesson 67 covered, Desktop has no workspace
creation screen at all.

## Creating a workspace

1. In the nav pane, select **Workspaces → New workspace** (or
   **Create → Workspaces → New workspace**, depending on your tenant's
   navigation).
2. Give it a unique name.
3. Optionally set: a workspace image, a **contact list** (who gets
   notified about issues — defaults to the workspace admins), a
   **Workspace OneDrive**, and whether contributors can update the
   app.
4. Select **Save**.

![Screenshot of the workspace settings pane showing About, Premium, and Azure connections tabs.](/courses/power-bi/ch09/69-workspaces/power-bi-workspace-new-settings.png)
*Workspace settings — reachable any time from the "..." menu next to a workspace's name.*

If you don't see a **Create** or **New workspace** option, it's
usually one of: a Free license (workspace creation beyond "My
workspace" needs Pro, PPU, or capacity assignment), a tenant admin
restriction, or being in Desktop instead of the browser.

## Workspace roles

After creating a workspace, you add colleagues to one of four roles to
control what they can see and do:

| Role | Can do |
|---|---|
| **Admin** | Everything — add/remove members, delete the workspace, change all settings |
| **Member** | Publish and update content, add other members (but not Admins) |
| **Contributor** | Add, edit, and publish content, but can't manage who has access |
| **Viewer** | View content only — no editing or publishing |

By default, only Admins and Members can create or update the app
published from a workspace — a setting exists (Lesson 73 covers apps)
to delegate that to Contributors too.

## Pinning workspaces you use often

If you work across many workspaces, pin your favorites to the top of
the workspace flyout list so you don't have to search for them every
time:

![Screenshot of a pinned workspaces list at the top of the workspace flyout.](/courses/power-bi/ch09/69-workspaces/pinned-list.png)
*Pinned workspaces stay at the top, above the alphabetical list of everything else.*

## Deleting a workspace

Only a workspace's Admin can delete it, via **Workspace settings →
Remove this workspace**. This is worth saying plainly: **deleting a
workspace permanently removes every dashboard, report, semantic model,
and dataflow inside it, and this cannot be undone.** There's no
confirmation beyond the one dialog — no recycle bin, no recovery.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | A collaborative container for reports, dashboards, semantic models, and other Fabric items |
| Admin / Member / Contributor / Viewer | The four workspace roles, in decreasing order of permission |
| Contact list | Who receives notifications about workspace issues (defaults to Admins) |
| Workspace OneDrive | A linked Microsoft 365 Group's SharePoint storage, attached to the workspace |

## Lab

1. Create a new workspace named something like `AdventureWorks
   Sales Analytics`.
2. Publish one of your existing reports built against
   `AdventureWorksDW2014` into it (**File → Publish** from Desktop,
   selecting this new workspace as the destination).
3. Open **Workspace settings** and set a contact list and a workspace
   image, even a placeholder one — get comfortable with where these
   settings live before Lesson 72 asks you to manage actual access.

## Check yourself

You're ready for Lesson 70 when you can name all four workspace roles
from memory and say which one you'd give a colleague who should be
able to publish updated reports but shouldn't be able to delete the
workspace.
