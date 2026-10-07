# Azure Entra ID & RBAC

Least privilege is the principle. In Azure, Microsoft Entra ID and Azure role-based access control (RBAC) are the mechanisms that put it into practice. This lesson walks through how Northbridge Retail's platform team uses both — Entra ID for who exists in the directory, and Azure RBAC for what each identity can do to a specific resource.

## What you'll learn

- The difference between Microsoft Entra ID (directory and authentication) and Azure RBAC (authorization on resources)
- How Azure RBAC's three-part model — security principal, role definition, scope — fits together
- Where role assignments actually happen: the Access control (IAM) blade
- How to read a role assignment the way you'd review one during a security audit

## Two different jobs: Entra ID vs. Azure RBAC

It's easy to blur these together, but they answer different questions:

- **Microsoft Entra ID** is Azure's identity directory. It's where users, groups, and service principals exist, where they authenticate, and where tenant-wide administrative roles (like Global Administrator or Privileged Role Administrator) are assigned. Entra ID roles control access to Entra ID itself and other Microsoft 365 / Azure AD-level administration.
- **Azure RBAC** is the authorization system for Azure *resources* — subscriptions, resource groups, storage accounts, Key Vaults, virtual machines, and so on. Azure RBAC roles (like Reader, Contributor, or a custom "Checkout Service Operator" role) determine what a principal can do to a specific resource, not to the directory itself.

A Northbridge Retail engineer might have no special Entra ID role at all (just a regular user) while holding an Azure RBAC role that lets them manage the checkout service's resource group. The two systems are related — Entra ID supplies the identities — but they're scoped and administered separately.

![Roles and administrators page in the Microsoft Entra admin center](/courses/devsecops-fundamentals/ch02/06-azure-entra-id-and-rbac/entra-roles-and-admins.png)
*The Entra admin center's Roles & admins list — this is where tenant-wide directory roles like Privileged Role Administrator live, separate from Azure resource roles.*

## The three parts of an Azure RBAC role assignment

Every Azure RBAC role assignment is built from exactly three pieces:

1. **Security principal** — who or what is getting access: a user, a group, a service principal, or a managed identity.
2. **Role definition** — what they can do: a collection of permissions, such as Reader (view only), Contributor (manage resources, but not grant access to others), or Owner (manage resources *and* grant access).
3. **Scope** — where the role applies: a management group, a subscription, a resource group, or a single resource.

The same role definition means something very different depending on scope. "Contributor at the subscription level" is sweeping access across everything in that subscription. "Contributor scoped to just the checkout-service resource group" is exactly what a service owner needs and nothing more — a textbook least-privilege assignment.

## Where it happens: Access control (IAM)

Role assignments are made from the **Access control (IAM)** blade, which appears on nearly every resource, resource group, and subscription in the Azure portal. It's the same screen for every scope — only what you're standing on changes what the assignment affects.

![Access control (IAM) page for an Azure resource group](/courses/devsecops-fundamentals/ch02/06-azure-entra-id-and-rbac/azure-rbac-access-control-iam.png)
*The Access control (IAM) page, here on a resource group. "Add role assignment" is the entry point for granting any Azure RBAC access at this scope.*

Clicking **Add role assignment** opens a role picker split into **Job function roles** (day-to-day roles like Reader, Contributor, or service-specific built-ins) and **Privileged administrator roles** (Owner, User Access Administrator, and other roles that can grant access to others — these deserve extra scrutiny in any audit).

![Add role assignment page showing the Role tab with built-in roles listed](/courses/devsecops-fundamentals/ch02/06-azure-entra-id-and-rbac/azure-rbac-add-role-assignment.png)
*Selecting a role is step one of three — role, then members, then review and assign. Each of the three parts of the model gets its own tab in this wizard.*

## Reading a role assignment like an auditor

When Northbridge Retail's security team reviews access, they ask the same three questions the model is built from: *who* has this role, *what* can the role actually do (check the permissions, not just the name — a custom role named "Reader" might not be read-only), and *where* does it apply. A Contributor assignment that looks fine at a glance can be a finding if its scope turns out to be the whole subscription instead of one resource group.

## Key terms

- **Microsoft Entra ID** — Azure's identity directory: where users, groups, and service principals exist and authenticate
- **Azure RBAC** — the authorization system controlling what a principal can do to Azure resources
- **Security principal** — the user, group, service principal, or managed identity receiving access
- **Role definition** — the named set of permissions being granted (Reader, Contributor, Owner, or custom)
- **Scope** — the management group, subscription, resource group, or resource a role assignment applies to

## Recap

Entra ID is who exists; Azure RBAC is what they can do and where. Every Azure RBAC assignment is a security principal, a role definition, and a scope — and the same role means very different things depending on that scope. Next up: the AWS equivalent — IAM roles and policies.
