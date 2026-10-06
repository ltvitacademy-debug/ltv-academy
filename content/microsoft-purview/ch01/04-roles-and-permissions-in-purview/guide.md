# Lesson 4 — Roles and Permissions in Purview

**Chapter 1 · Purview Foundations · Lesson 4 of 35**

## What you'll learn

- Purview's role-based access control (RBAC) model, and how it relates to roles you already know from Microsoft 365
- The three-way relationship between members, roles, and role groups
- Where to actually manage permissions: Settings → Roles and scopes
- How Microsoft Entra roles interact with — and can override — Purview's own scoped role groups
- Temporary, auto-expiring permission assignments, and why they matter for least-privilege access

## RBAC, the Purview way

Microsoft Purview uses the same role-based access control (RBAC) model most Microsoft 365 services use. If you've managed permissions in Exchange or SharePoint admin centers before, the shape will feel familiar — but Purview has its own set of roles and role groups, layered on top of (and sometimes overridden by) Microsoft Entra roles.

One thing to set expectations correctly: managing permissions in the Purview portal only controls access to features *inside* Purview. It doesn't manage everything a solution needs — some service-specific permissions, like Exchange mail flow rules, still have to be set in that service's own admin center.

## Members, roles, and role groups

Three concepts, and the relationship between them is the whole model:

- A **role** grants permission to perform a set of tasks — for example, the *Case Management* role lets someone work with eDiscovery cases.
- A **role group** is a bundle of roles assigned together, matching a real job function — for example, the *Insider Risk Management* role group bundles everything an insider risk analyst needs into one assignable unit.
- A **member** (a user or a security group) gets added to a role group, inheriting every role inside it.

![Diagram showing a role group in the center connected to three users on the left and three roles on the right — role groups bundle roles together and members are assigned to the role group as a unit.](/courses/microsoft-purview/ch01/04-roles-and-permissions-in-purview/role-group-diagram.png)
*The core relationship: role groups bundle roles; members are assigned to role groups, not to individual roles directly.*

In practice, you almost never assign a lone role to a lone user. You add members to the role group that matches their job, and let the role group's bundled roles do the work.

## Where you manage this

Everything lives under **Settings → Roles and scopes** in the Purview portal — itself split into tabs for Role groups, Roles, Members, and "My permissions" (a self-check of what you personally can do):

![Screenshot of the "Role groups for Microsoft Purview solutions" page, showing 72 built-in role groups like Attack Simulator Administrators, Audit Manager, and Communication Compliance, with columns for Type, Roles, Users, and Security groups.](/courses/microsoft-purview/ch01/04-roles-and-permissions-in-purview/purview-portal-roles.png)
*Role groups for Microsoft Purview solutions: 72 built-in groups in this tenant, each showing how many roles, users, and security groups are attached.*

To even see this page, you need to be a Global Administrator or hold the **Role Management** role (assigned only through the *Organization Management* role group) — a deliberately narrow gate, since whoever can see this page can also create and modify role groups.

## Scoping to administrative units — and where it breaks down

A role group assignment doesn't have to grant tenant-wide access. While editing a role group's members, you can restrict that assignment to one or more Microsoft Entra **administrative units** — geographic regions or departments, typically — so a "restricted administrator" can only see and manage data for their own unit:

![Screenshot of the "Edit members of the role group" panel, showing Choose users, Choose groups, Assign admin units, and Remove members options, with Assign admin units highlighted in a red box.](/courses/microsoft-purview/ch01/04-roles-and-permissions-in-purview/assign-admin-units.png)
*Assign admin units: scope a role group assignment to one or more administrative units, instead of the whole tenant.*

Here's the part that trips people up: if a user has **both** a Microsoft Entra role (like Compliance Administrator) **and** a scoped Purview role group assignment (say, that same role but restricted to one administrative unit via this exact dialog), the Entra role wins at runtime. The user's effective access becomes *unscoped* — the administrative-unit restriction is effectively ignored for anything the two roles overlap on.

The practical takeaway: don't assume a narrow, scoped Purview role group assignment is actually narrow for a user who also happens to hold a broad Entra role. Check both.

## Temporary, auto-expiring access

Purview supports assigning a role group with a built-in expiration date — from a minimum of one day to a maximum of two years. When that date passes, the assignment is automatically removed with no manual cleanup required. This is a direct, practical tool for least-privilege access: grant a contractor scan-troubleshooting access for the two weeks they're actually engaged, and don't rely on someone remembering to revoke it afterward. (Two role groups are the exception and don't support this: eDiscovery Administrator and eDiscovery Manager.)

## Key terms

| Term | Meaning |
|---|---|
| Role | A grant of permission to perform a specific set of tasks |
| Role group | A bundle of roles matching a real job function; what you actually assign members to |
| Roles and scopes | The Settings area where all of this is managed: Role groups, Roles, Members, My permissions |
| Role Management role | The permission required to view and modify role groups — assigned only via Organization Management |

## Lab

Open **Settings → Roles and scopes → My permissions** (if you have Purview access) or imagine doing so. List the three questions that page should be able to answer for you about your own account, based on this lesson.

## Check yourself

If a user holds both a tenant-wide Microsoft Entra Compliance Administrator role and a Purview role group scoped to one administrative unit, what is their actual effective access — and why?
