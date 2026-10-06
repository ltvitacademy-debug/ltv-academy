# Lesson 3 — Workspaces and Workspace Roles

**Chapter 1 · Tenant and Workspace Governance · Lesson 3 of 20**

## What you'll learn

- What a workspace is, and why it has to be created in the service, not Power BI Desktop
- How to create a workspace and configure its optional settings
- The four workspace roles and exactly what each one can and can't do
- The single most important governance detail about workspace roles: how they interact with row-level security

## What a workspace is

A **workspace** is a collection of dashboards, reports, semantic models, paginated reports, and dataflows — the basic unit of collaboration in Power BI. You create and manage workspaces in the **Power BI service** (a browser, at app.powerbi.com), not in Power BI Desktop. Desktop can *publish* a report into a workspace you already have access to, but it has no workspace-creation screen of its own.

A workspace also doubles as the staging area for an **app** — a packaged, read-only distribution of its content to a wider audience, covered in Lesson 5.

## Creating a workspace

![Screenshot of the Workspaces flyout panel in the Power BI service nav pane, with the 'New workspace' button highlighted at the bottom.](/courses/power-bi-governance/ch01/03-workspaces-and-workspace-roles/power-bi-workspace-create-new.png)
*New workspace starts from the Workspaces flyout — give it a unique name, then configure optional settings like a contact list, workspace image, or Premium capacity assignment.*

A workspace name must be unique across the tenant. Beyond the name, optional settings include a workspace image, a contact list (who gets notified about issues — defaults to the workspace admins), a Workspace OneDrive, whether Contributors can update the associated app, and Premium capacity assignment.

## The four workspace roles

Every person or group added to a workspace gets exactly one of four roles, each with progressively less access:

| Role | Can do |
|---|---|
| **Admin** | Everything below, plus update/delete the workspace and manage everyone's role |
| **Member** | Everything below, plus add users with lower permissions, publish/manage the app |
| **Contributor** | Create, edit, and delete content — but can't manage who has access |
| **Viewer** | View and interact with items only — no editing |

A detail worth remembering: **Members can't change existing users' roles.** They can add new people with lower permissions, but to upgrade or downgrade someone already in the workspace, an Admin has to remove them first and a Member (or Admin) can re-add them with the new role.

## Assigning roles

![Screenshot of the Access dialog with a role dropdown open, showing Admin, Member, Contributor, and Viewer options, with Contributor highlighted.](/courses/power-bi-governance/ch01/03-workspaces-and-workspace-roles/power-bi-roles-access.png)
*The role picker in the Access dialog — one of the two places this same dropdown shows up.*

![Screenshot of the Add people panel, with a role dropdown showing Admin, Member, Contributor, and Viewer options.](/courses/power-bi-governance/ch01/03-workspaces-and-workspace-roles/power-bi-workspace-add-members.png)
*The identical role picker in Add people — you can assign security groups, distribution lists, Microsoft 365 groups, or individuals, and everyone in a group inherits that role.*

Only workspace **Admins** can remove people or change an existing member's role. If you're the only Admin in a workspace, Power BI won't let you remove yourself — there always has to be at least one.

## The rule that changes everything: RLS and workspace roles

This is the single most important governance detail in this lesson, and it will come back explicitly in Lesson 7: **row-level security only restricts the Viewer role.** Admin, Member, and Contributor all have edit permission on the workspace's content, and RLS doesn't apply to anyone with edit permission — they already have full access to the underlying data by virtue of their role.

So if you build an RLS role meant to filter what a group of salespeople can see, and those salespeople are workspace Members instead of Viewers, the filter has **zero effect** on them. They'll see everything, RLS role or not. If RLS needs to actually restrict someone, that person has to be a Viewer.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | A collection of dashboards, reports, semantic models, and other content — created and managed in the Power BI service |
| Admin role | Full control: update/delete the workspace, manage every user's role |
| Member role | Add lower-permission users, manage the app, but can't remove or re-role existing members |
| Contributor role | Create/edit/delete content, no access-management rights |
| Viewer role | View and interact only — the only role actually restricted by row-level security |

## Lab

For a hypothetical "Regional Sales" workspace with 15 people — 2 BI developers who build reports, 1 manager who needs to add new team members, and 12 sales reps who should only see their own region's data via RLS — assign each group the correct workspace role, and explain why giving the sales reps anything above Viewer would break the RLS you plan to configure in Lesson 7.

## Check yourself

Can you list all four workspace roles from most to least access, and state one thing each role can do that the role below it can't? Can you explain, without looking back, exactly why RLS has no effect on a workspace Member — even one who's never created or edited a single report?
