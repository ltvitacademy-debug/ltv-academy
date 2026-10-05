# Lesson 5 — Workspaces and Workspace Roles

**Chapter 1 · Fabric Governance Foundations · Lesson 5 of 25**

## What you'll learn

- What a workspace actually is: Fabric's fundamental container, and the real unit of deployment
- The four workspace roles — Admin, Member, Contributor, Viewer — and what each can and can't do
- Where to go to see and change who has access to a workspace
- Governance-relevant columns worth noticing in a workspace's item list, even this early in the course
- How a workspace relates to the capacity (Lesson 2) and the domain (Lesson 4) it's assigned to

## The workspace: Fabric's fundamental container

Every Lakehouse, Warehouse, report, pipeline, notebook, or any other Fabric item lives inside exactly one workspace. It's the container you actually deploy into — not a folder for organizing things after the fact, but the boundary that determines who can see an item, who can edit it, and which capacity bills for the compute it uses.

![Screenshot of a Fabric workspace page named 'Contoso Sample Workspace', showing Manage access and Workspace settings buttons in the top-right corner and an item list below with columns for Name, Type, Owner, Refreshed, Endorsement, and Sensitivity.](/courses/microsoft-fabric-data-governance/ch01/05-workspaces-and-workspace-roles/fabric-workspace-page.png)
*A workspace's own page: Manage access and Workspace settings sit top-right, and every item created or uploaded into this workspace shows up in the list below.*

## The four workspace roles

Access to a workspace is granted through one of four roles, each a progressively narrower slice of what a Contributor can already do:

- **Admin** — full control: manage every item, manage who has access (including adding other Admins), change workspace settings, and delete the workspace itself
- **Member** — can add and edit content, and can manage *some* access (adding people at the Member role or below)
- **Contributor** — can create and edit content, but cannot manage who has access at all
- **Viewer** — read-only: can view and interact with items (like a published report) but cannot create or edit anything

The distinction that trips people up most is **Contributor vs. Member**: both can build and edit items, but only Member can touch the access list. A Contributor who wants someone else added to the workspace has to ask an Admin or a Member to do it.

## Managing access: the real UI

Selecting **Manage access** from the workspace header opens a panel listing who currently has access, with an **Add people or groups** button at the top.

![Screenshot of the Manage access panel for 'Sample workspace1', with a highlighted 'Add people or groups' button, a search box, and one existing user listed as Admin.](/courses/microsoft-fabric-data-governance/ch01/05-workspaces-and-workspace-roles/workspace-manage-access-add-button.png)
*The Manage access panel: everyone who currently has access to the workspace, plus the button that starts adding more.*

Selecting that button opens the **Add people** panel, where you type in a name or email and then pick a role from a dropdown — this is the screen where the four roles actually become a concrete choice, not just a concept.

![Screenshot of the Add people panel for 'Sample workspace1' with a role dropdown open, listing Admin, Member, Contributor, and Viewer, with Viewer currently selected.](/courses/microsoft-fabric-data-governance/ch01/05-workspaces-and-workspace-roles/workspace-manage-access-add-people-panel.png)
*The role dropdown in the Add people panel — the moment the four roles stop being a list in a guide and become a decision you make for one real person or group.*

## The item list's governance columns, previewed

Scroll down into a populated workspace's item list and a few columns are worth noticing now, even though each gets its own full lesson later in the course.

![Screenshot of a Fabric workspace item list with numbered callouts pointing at a task flow diagram, a folder row, the Owner column, and the expand/collapse control for the list.](/courses/microsoft-fabric-data-governance/ch01/05-workspaces-and-workspace-roles/workspace-list-view.png)
*Microsoft's own numbered walkthrough of the list view — callout 2 lands on the Owner column, one of several governance-relevant columns (Owner, Endorsement, Sensitivity) this list surfaces for every item.*

**Owner** shows who created or last took ownership of an item. **Endorsement** shows whether an item has been marked Promoted or Certified — covered in Chapter 4. **Sensitivity** shows any sensitivity label applied to the item — covered in Chapter 3. None of these are configured from this screen; the list just surfaces them so they're visible at a glance.

## How a workspace fits the bigger picture

A workspace is assigned to exactly one **capacity** (Lesson 2) — that's what pays for its compute and determines its region. It can also be assigned to one **domain** (Lesson 4) — that's what groups it with other workspaces for organization-wide discovery. Workspace roles, covered here, are the third corner of that triangle: capacity decides where and on what it runs, domain decides how it's categorized for discovery, and workspace roles decide who can actually touch what's inside it.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | Fabric's fundamental container — every item lives inside exactly one workspace |
| Workspace role | One of four access levels — Admin, Member, Contributor, Viewer — granted per person or group |
| Manage access | The panel where a workspace's current access list is viewed and changed |

## Lab

Open (or imagine) a workspace with at least one existing item. Decide, for three hypothetical people — a data engineer who should build and edit pipelines but never touch the access list, a stakeholder who should only view a published report, and a second admin who should be able to do anything the first admin can — which of the four roles each one gets, and write one sentence justifying each choice.

## Check yourself

Can you name all four workspace roles in order from most to least access, explain the one real difference between Contributor and Member, and say which two things (besides its own roles) every workspace is assigned to?
