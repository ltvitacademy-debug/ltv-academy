# Lesson 3 — Workspaces and Workspace Roles · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Workspaces and workspace roles — where content actually lives in Power BI, and who can do what inside it.

## S2 · STEPS — What a workspace is

A workspace is a collection: dashboards, reports, semantic models, paginated reports, all living together. You create and manage workspaces in the Power BI service, at app.powerbi.com — Power BI Desktop can publish into an existing workspace, but it has no workspace-creation screen of its own. And a workspace doubles as the staging area for an app, which we'll cover in lesson five.

## S3 · SCREENSHOT — Creating a workspace

New workspace starts from the Workspaces flyout in the navigation pane. Give it a unique name, then optionally set a contact list, a workspace image, or assign it to Premium capacity.

## S4 · STEPS — The workspace roles

Four roles, each with less access than the last. Admin can update or delete the workspace and manage everyone else's role. Member can add users with lower permissions and publish or manage the app. Contributor can create, edit, and delete content, but can't manage who has access. And Viewer can only view and interact — no editing at all.

## S5 · SCREENSHOT — Assigning a role

The Access dialog's role dropdown is where that assignment happens — Admin, Member, Contributor, or Viewer, assigned per person or per security group.

## S6 · SCREENSHOT — Adding people or groups

The same role picker appears in the Add people flow. You can add security groups, distribution lists, Microsoft 365 groups, or individuals — each one gets whichever role you assign.

## S7 · STEPS — One rule to remember

Here's the detail that changes everything: Admin, Member, and Contributor all have edit access to a workspace's content — and row-level security does not apply to any of them. Only the Viewer role is actually restricted by RLS. So if row-level security matters for a group of people, they need to be Viewers, not Members, or the filter you built has no effect on them at all.

## S8 · OUTRO

Next lesson: workspace design patterns — how to structure dozens or hundreds of workspaces so the whole thing stays governable.
