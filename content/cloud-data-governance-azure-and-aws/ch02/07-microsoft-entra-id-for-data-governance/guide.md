# Lesson 7 — Microsoft Entra ID for Data Governance

**Chapter 2 · Identity and Access · Lesson 7 of 25**

## What you'll learn

- What Microsoft Entra ID governs that Azure RBAC (next lesson) does not
- How to find and read the Roles and administrators page in the Entra admin center
- The real three-step flow for assigning a directory role to a user or group
- Why directory roles can be assigned to applications, not just people — and why that matters for governance

## What Entra ID actually governs

Microsoft Entra ID (the renamed Azure Active Directory) is the **directory-level** identity layer — it governs the tenant itself, not any individual Azure resource. Directory roles answer questions like "who can manage users," "who can manage app registrations," and critically for this course, "who can administer the governance tooling itself" — roles like **Purview Administrator** or **Compliance Administrator** live here, not in Azure RBAC. If Azure RBAC (Lesson 8) controls who can read a specific storage account, Entra ID controls who can configure the identity system that Azure RBAC assignments depend on in the first place.

## Finding directory roles: Roles and administrators

Every directory role lives on one page: **Identity → Roles & admins → Roles & admins**, inside the Microsoft Entra admin center.

![Screenshot of the Roles and administrators page in the Microsoft Entra admin center, showing a searchable table of built-in directory roles like AI Administrator, Application Administrator, and Attack Payload Author, each with a Privileged flag, assignment count, and type.](/courses/cloud-data-governance-azure-and-aws/ch02/07-microsoft-entra-id-for-data-governance/entra-roles-admins.png)
*The red highlight around "Roles & admins" in the left navigation is Microsoft's own annotation on this page of the admin center — not an addition from this course.*

Every row is a built-in directory role. The **Privileged** column flags roles that can modify security-sensitive settings (Application Administrator and Application Developer both carry this flag in the screenshot above), and the **Ass...** column shows how many principals currently hold that role — a number worth auditing periodically, since a role with a growing assignment count unrelated to headcount growth is itself a governance signal.

## Assigning a role: the Add assignments pane

Selecting a role name (not its checkbox — the checkbox is for bulk actions like deletion) opens that role's detail page, where **Assignments → Add assignments** lets you search the directory and pick who gets the role.

![Screenshot of the Add assignments pane for the Billing Administrator role, showing a searchable list of directory principals with checkboxes, and a "Selected (2)" panel on the right listing Alan Steiner and Alicia Thomber as the two principals about to be assigned.](/courses/cloud-data-governance-azure-and-aws/ch02/07-microsoft-entra-id-for-data-governance/add-assignments.png)
*Everything checked on the left accumulates in the "Selected" panel on the right before you commit — nothing is assigned until you choose Add.*

Notice that this pane filters to **Users** by default but also has an **All** tab — Entra ID allows role-assignable security groups as well as individual users, and (per Microsoft's own guidance) assigning a role to a group rather than one person at a time is the pattern this course keeps recommending, for the same reason Lesson 10 covers in depth: group membership changes don't require touching the role assignment itself.

## Roles aren't only for people: app registrations

Directory roles can also be assigned to an **application** (an app registration) rather than a human — relevant because automated governance tooling, scripts, and service-to-service integrations need their own scoped permissions, not a shared human credential borrowed for the job.

![Screenshot of the Roles and administrators page for an app registration named TestApp, filtered to Assignable: Yes, showing one assignable role: Cloud Application Administrator, described as able to create and manage all aspects of app registrations and enterprise apps except App Proxy.](/courses/cloud-data-governance-azure-and-aws/ch02/07-microsoft-entra-id-for-data-governance/app-reg-roles.png)
*Directory-level roles have inherited access and can only be assigned at the directory level — this page shows only the subset of roles assignable specifically to this app registration.*

For data governance work specifically, this matters because a service principal running an automated classification job, a lineage-scanning script, or a Purview scan trigger should be granted exactly the directory role it needs — never a broad administrative role borrowed because it was convenient.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Entra ID | Azure's directory-level identity service — governs the tenant, users, groups, and administrative roles |
| Directory role | A tenant-wide role (e.g., Application Administrator, Purview Administrator) assigned via Entra ID, not Azure RBAC |
| Role-assignable group | A security group that can itself hold a directory role, so membership changes don't require new assignments |
| App registration / service principal | An application's identity in Entra ID, which can hold directory roles the same way a user can |

## Lab

Open (or imagine) a list of five people on a data team. Decide which, if any, should hold the **Purview Administrator** directory role individually, versus which should get access through a role-assignable group instead. Write one sentence justifying your choice for at least one person.

## Check yourself

Can you explain the difference between what Microsoft Entra ID governs and what Azure RBAC (next lesson) governs, and describe the three-step process for assigning a directory role to a user?
