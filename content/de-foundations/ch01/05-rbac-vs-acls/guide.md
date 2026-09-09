# Lesson 5 — RBAC vs. ACLs

**Chapter 1 · Azure Data Lake & Storage · Lesson 5 of 62**

## What you'll learn

- What **RBAC** (Role-Based Access Control) actually checks, and at
  what scope
- What **ACLs** (Access Control Lists) add on top — and why ADLS Gen2
  specifically is what makes them possible (tying back to Lesson 4)
- The real, official order Azure checks them in
- A concrete, real example: three operations, checked both ways

## Two different systems, checked in order

Azure doesn't make you choose between RBAC and ACLs — it checks **both**,
in a specific order, every time a request comes in:

![An official Microsoft flowchart showing the access-check flow: a Request first checks RBAC (is the required role assigned), then ABAC (do conditions exist and match), and finally ACLs (does the principal have the required permissions), ending in Access granted or Access denied.](/courses/de-foundations/ch01/05-rbac-vs-acls/data-lake-storage-permissions-flow.png)
*RBAC is checked first. Only if that doesn't already grant access does Azure fall through to checking ACLs.*

- **RBAC** assigns broad **roles** (like `Storage Blob Data Reader`,
  `Contributor`, or `Owner`) to a user, group, or service principal, at
  a scope you choose — the whole subscription, a resource group, one
  storage account, or one container. It answers: *does this identity
  have a role that allows this kind of operation, anywhere within this
  scope?*
- **ACLs** are POSIX-style permissions (`read`, `write`, `execute`) set
  directly on individual directories and files — the fine-grained
  control that only exists because Lesson 4's hierarchical namespace
  gives ADLS Gen2 real directory objects to attach permissions to in the
  first place. Plain Blob storage has no ACLs, because it has no real
  directories.

## A concrete example, both checks together

Here's exactly how that two-step check plays out for three real
operations:

![An official Microsoft diagram walking through three operations — List directory contents, Read file, and Create or delete a file — each first checked against RBAC/ABAC roles like Storage Blob Data Owner, Contributor, or Reader, then against matching ACL permissions, ending in Access granted or Access denied.](/courses/de-foundations/ch01/05-rbac-vs-acls/data-lake-storage-permissions-example.png)
*Notice: an RBAC role alone (Owner or Contributor) already grants access — ACLs only get checked if RBAC says no.*

Reading that diagram: if an identity already holds `Storage Blob Data
Owner` or `Contributor`, it's granted immediately — RBAC alone was
enough, and the ACL check never even runs. Only an identity *without* one
of those broad roles falls through to the ACL check, which then requires
**both** the right permission on the target itself, *and* execute
permission on every directory from the root down to it.

## Why both systems exist together

RBAC is coarse but easy to manage — a handful of role assignments cover
an entire team's access to an entire storage account. ACLs are granular
but require maintaining permissions directory-by-directory. Real
production data lakes use RBAC for broad access (a data engineering
team gets `Contributor` on the whole account) and ACLs for genuine
exceptions (one specific directory that only one specific service
principal should be able to read).

## Key terms

| Term | Meaning |
|---|---|
| RBAC | Role-based permissions checked at subscription/resource-group/account/container scope |
| ACL | POSIX-style read/write/execute permissions on individual directories and files (ADLS Gen2 only) |
| Storage Blob Data Owner/Contributor/Reader | The three built-in RBAC roles most commonly assigned for blob data access |

## Lab

In the Azure Portal, on a storage account:

1. Open **Access Control (IAM)** and view the **Role assignments** tab —
   this is RBAC.
2. If the account has hierarchical namespace enabled, open a container,
   right-click a directory, and look for **Manage ACL** — this is where
   the fine-grained permissions from this lesson actually get set.

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: which
system gets checked first, RBAC or ACLs, and why does an `Owner` role
assignment skip the ACL check entirely?
