# Lesson 6 — Managed Identities for Storage

**Chapter 1 · Azure Data Lake & Storage · Lesson 6 of 62**

## What you'll learn

- What a **managed identity** actually is, and the problem it solves
- **System-assigned** vs. **user-assigned** — the two flavors
- How a managed identity actually gets permission to read your storage
  account (tying straight back to Lesson 5's RBAC)
- Why this beats a connection string or access key sitting in code

## The problem: secrets in code

Before managed identities, an application that needed to read from a
storage account had to authenticate somehow — typically a **connection
string** or **access key**, stored in a config file, an environment
variable, or (too often, accidentally) committed straight into source
control. Every one of those is a real secret that can leak, has to be
rotated, and has to be managed by *someone*.

## The fix: an identity Azure manages for you

A **managed identity** is an Azure AD identity that Azure creates and
manages automatically, attached to a specific resource — a Function App,
a VM, a Databricks workspace, a Data Factory pipeline (all covered
later in this track). The resource can use that identity to authenticate
to other Azure services, like a storage account, **with no secret
anywhere in the code at all**. Azure handles issuing and rotating the
underlying credential entirely behind the scenes.

## Two flavors

- **System-assigned**: created and destroyed automatically, tied to the
  lifecycle of exactly one resource. Delete the resource, and the
  identity is gone with it.
- **User-assigned**: created as its own standalone Azure resource,
  independent of any one thing using it — you can attach the *same*
  user-assigned identity to multiple resources that all need the same
  access:

![The Create User Assigned Managed Identity wizard in the Azure Portal, showing the Basics tab with Subscription, Resource group, Region, and Name fields.](/courses/de-foundations/ch01/06-managed-identities-for-storage/create-user-assigned-managed-identity-portal.png)
*A user-assigned identity is created once, here, and can outlive — or be shared across — whatever resources use it.*

## Giving it access: this is Lesson 5's RBAC, applied

A managed identity is still just an identity — on its own, it can't do
anything. It needs a **role assignment**, exactly like Lesson 5 covered,
scoped to whatever it needs to touch:

![The Access control (IAM) blade for a managed identity resource in the Azure Portal, with the Add role assignment button highlighted, next to panels for Check access, Grant access, View access, and View deny assignments.](/courses/de-foundations/ch01/06-managed-identities-for-storage/role-assign.png)
*Grant this managed identity `Storage Blob Data Reader` (or Contributor) on your storage account, and it can authenticate — with zero secrets involved.*

## Why this beats a stored secret

- **Nothing to leak** — there's no connection string or key to
  accidentally commit, log, or expose
- **Nothing to rotate** — Azure manages the underlying credential's
  lifecycle for you
- **Auditable like any other identity** — every access shows up in Azure
  AD sign-in logs and Azure activity logs, tied to a real, named identity

## Key terms

| Term | Meaning |
|---|---|
| Managed identity | An Azure AD identity Azure creates and manages automatically for a resource |
| System-assigned | Tied to one resource's lifecycle — created and deleted with it |
| User-assigned | A standalone identity that can be shared across multiple resources |

## Lab

In the Azure Portal:

1. Open any resource that supports managed identities (a Function App,
   a VM) → **Identity** in the left navigation, and note the
   **System assigned** / **User assigned** tabs.
2. On a **user-assigned managed identity** resource, open **Access
   control (IAM)** → **Add role assignment**, and find
   `Storage Blob Data Reader` in the role list — this is exactly how
   you'd grant it read access to a storage account.

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what's
the difference between a system-assigned and a user-assigned managed
identity, and what does a managed identity still need before it can
actually access anything?
