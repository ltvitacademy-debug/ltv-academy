# Lesson 3 — The Fabric Admin Portal

**Chapter 1 · Fabric Governance Foundations · Lesson 3 of 25**

## What you'll learn

- How to reach the Fabric admin portal
- What lives inside it: tenant settings, capacity settings, domains, workspaces, users — plus audit logs and information protection, previewed here and covered in full in Chapter 3
- The delegation pattern every tenant setting follows: who it applies to, and who else can flip it
- Why tenant settings are grouped into named categories instead of one long list
- That the Domains page previewed here gets its own full walkthrough next lesson

## Getting to the admin portal

Everything in this chapter — tenant settings, capacity settings, domains, workspaces — is managed from one place: the **admin portal**. You reach it from the gear icon in the top right of the Fabric interface, then **Admin portal**. It's a separate surface from your everyday workspace view, built specifically for the people responsible for governing the tenant rather than building content in it.

## What's on the admin portal

The admin portal is organized into several pages, each covering a different governance surface:

- **Tenant settings** — the master list of on/off switches covering every Fabric capability, not just one. Git integration, external data sharing, who can create workspaces, whether Copilot features are enabled — all of it lives here.
- **Capacity settings** — settings scoped to a specific capacity (Lesson 2) rather than the whole tenant.
- **Domains** — groups workspaces by business area. Previewed below; Lesson 4 goes deep on it.
- **Workspaces** — a tenant-wide view of every workspace, for admins who need to manage access without being a member of each one.
- **Users** — the people and groups in the tenant.
- **Audit logs** and **Information protection** are also here, but this lesson only previews them — each gets its own full lesson later (Lesson 15 and Lesson 14, in Chapter 3).

## The delegation pattern

Open any individual tenant setting and you'll find the same two-part structure, regardless of which capability it controls. This example shows a real one — a Git integration setting — chosen as a representative tenant setting, not because this lesson is specifically about Git.

![Screenshot of a Fabric tenant setting's standard controls: Apply to (The entire organization / Specific security groups), Except specific security groups, and Delegate setting to other admins with Capacity admins and Workspace admins checkboxes.](/courses/microsoft-fabric-data-governance/ch01/03-the-fabric-admin-portal/settings-1.png)
*Every tenant setting has the same two parts: who it applies to, and who else is allowed to change it.*

The first part is **scope**: apply the setting to the entire organization, or just specific security groups — with an option to exclude specific groups even from a broad grant. The second part is **delegation**: the checkboxes under "Delegate setting to other admins" let capacity admins and/or workspace admins enable or disable this specific setting themselves, without a tenant admin in the loop every time. This is the pattern this course keeps returning to — a tenant admin doesn't have to personally manage every switch for every team forever; they can hand specific switches to the people closer to the decision.

## Settings organized into categories

Scroll the Tenant settings page and you won't find one giant undifferentiated list — settings are grouped under named category headings so an admin can find the handful relevant to a rollout instead of scrolling past hundreds of unrelated switches.

![Screenshot of the Fabric admin portal's Tenant settings page showing the "Git integration" category heading with four toggleable settings listed underneath, each showing "Enabled for the entire organization."](/courses/microsoft-fabric-data-governance/ch01/03-the-fabric-admin-portal/workspace-settings.png)
*The "Git integration" category, with four related settings grouped under it — one of many named categories on the Tenant settings page.*

Each setting listed this way shows its current scope at a glance ("Enabled for the entire organization" in this case) before you even open it to see the full delegation controls from the previous screenshot.

## Domains — previewed here

One of the other pages on the admin portal is **Domains**:

![Screenshot of the Domains page in the Fabric admin portal: a "Create new domain" button and a table of existing domains (Finance, Health, Education) with Admins, Subdomains, and Default domain for columns.](/courses/microsoft-fabric-data-governance/ch01/03-the-fabric-admin-portal/domains-page.png)
*The Domains page lists every domain the tenant has defined, who administers each one, and how many subdomains it has. Lesson 4 walks through creating and configuring one of these end to end.*

This lesson only previews it. Lesson 4 covers domains in full — what they group, how subdomains work, and the three ways to assign a workspace into one.

## Key terms

| Term | Meaning |
|---|---|
| Admin portal | The central Fabric surface for tenant governance — reached via the gear icon → Admin portal |
| Tenant setting | An on/off switch covering one Fabric capability, scoped by group and optionally delegated |
| Delegation | Letting capacity or workspace admins enable/disable a specific tenant setting themselves, without a tenant admin |

## Lab

Pick any one tenant setting you can think of (or imagine one, like "users can export to Git repositories"). Write out: who would you scope it to (entire org vs. specific security groups), and would you delegate it to capacity admins, workspace admins, both, or neither? Justify the choice in one sentence — what goes wrong if you delegate too broadly, and what goes wrong if you never delegate at all?

## Check yourself

Can you say, without looking back, how to reach the admin portal, name at least four of its pages, and explain the difference between a setting's "scope" and its "delegation" in your own words?
