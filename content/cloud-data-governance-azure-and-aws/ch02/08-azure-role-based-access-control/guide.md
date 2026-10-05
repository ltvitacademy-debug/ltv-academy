# Lesson 8 — Azure Role-Based Access Control

**Chapter 2 · Identity and Access · Lesson 8 of 25**

## What you'll learn

- How Azure RBAC differs from the Entra ID directory roles covered last lesson
- The real three-step Add role assignment wizard: Role, Members, Review + assign
- How scope and inheritance work across management groups, subscriptions, resource groups, and resources
- Why "job function roles" like Reader or Storage Blob Data Reader are usually the right starting point, not Owner

## Azure RBAC governs resources, not the tenant

Where Entra ID (Lesson 7) answers "who can manage the directory itself," **Azure RBAC** answers a narrower, more common question: "what is this identity allowed to do to *this specific resource*." Azure RBAC assignments live on resources, resource groups, subscriptions, or management groups — never on the tenant as a whole — and every built-in role is a **role definition**: a named bundle of permissions like "read storage blobs" or "manage virtual machines" that gets bound to a principal at a chosen scope.

## Step 1: find Access control (IAM) on a resource

Every resource, resource group, and subscription has an **Access control (IAM)** blade in its left navigation.

![Screenshot of the Access control (IAM) page for an Azure resource group named example-group, showing tabs for Check access, Role assignments, Roles, and Deny assignments, plus a "Grant access to this resource" card with an Add role assignment button.](/courses/cloud-data-governance-azure-and-aws/ch02/08-azure-role-based-access-control/rg-access-control.png)
*The red highlight around "Access control (IAM)" in the left navigation is Microsoft's own annotation on this page of its documentation — not an addition from this course.*

This page is the center of gravity for Azure RBAC at any scope: **Check access** lets you look up what a specific principal can already do here, **Role assignments** lists everyone with access, **Roles** shows the full built-in role catalog, and **Deny assignments** (rare, usually set by Azure itself) show any explicit deny overrides.

## Step 2: Add role assignment

From the **Add** menu, **Add role assignment** opens the three-tab wizard every Azure RBAC assignment goes through.

![Screenshot of the Add menu expanded on an Access control (IAM) page, showing three options: Add role assignment, Add co-administrator, and Add custom role, with Add role assignment highlighted by a red box.](/courses/cloud-data-governance-azure-and-aws/ch02/08-azure-role-based-access-control/add-role-assignment-menu.png)
*Again, the red box here is Microsoft's own annotation, carried over from its documentation page.*

On the **Role** tab, built-in roles are grouped into two tabs: **Job function roles** (scoped to a specific task, like Reader or Storage Blob Data Reader) and **Privileged administrator roles** (broad roles like Owner or Contributor, which Lesson 10 covers the risks of over-assigning).

![Screenshot of the Add role assignment page's Role tab, showing a searchable table of job function roles including Reader, Access Review Operator Service Role, and several container-registry-specific roles like AcrPull and AcrPush, each with a description and category.](/courses/cloud-data-governance-azure-and-aws/ch02/08-azure-role-based-access-control/roles.png)
*Job function roles are scoped to one task — compare this to the broad, high-risk Privileged administrator roles tab next to it.*

The **Members** tab then opens a search pane to pick who the role applies to.

![Screenshot of the Select members pane, with a search box containing the text "alain" and two matching results, Alain and Alain Team, below a "Selected members" section currently showing no members selected.](/courses/cloud-data-governance-azure-and-aws/ch02/08-azure-role-based-access-control/select-members.png)
*Nothing is selected yet in this example — search finds principals by display name or email before you check them.*

## Step 3: scope and inheritance

A role assignment made at a **resource group** applies to every resource inside it, automatically — and one made at a **subscription** applies to every resource group beneath it, and so on up through the Lesson 3 hierarchy. This inheritance is the entire point of assigning roles high in the hierarchy rather than resource by resource: a team that needs read access to an entire resource group's worth of storage accounts gets one role assignment, not one per account, and automatically inherits access to any new storage account added to that group later.

## Key terms

| Term | Meaning |
|---|---|
| Azure RBAC | Resource-scoped authorization in Azure — governs what an identity can do to a specific resource, resource group, subscription, or management group |
| Role definition | A named, reusable bundle of permissions (e.g., Reader, Storage Blob Data Reader) |
| Job function role | A built-in role scoped to a specific task, as opposed to a broad privileged administrator role |
| Scope inheritance | A role assigned higher in the resource hierarchy automatically applies to everything beneath it |

## Lab

Pick a hypothetical team that needs read-only access to every storage account in one resource group, now and in the future. Decide: would you assign the Reader role to each storage account individually, or to the resource group once? Write one sentence explaining what you'd lose by choosing the per-resource approach.

## Check yourself

Can you name the three tabs of the Add role assignment wizard in order, and explain why a role assigned at the subscription level affects every resource group beneath it?
