# Lesson 7 — Azure Role-Based Access Control (RBAC)

**Chapter 2 · Azure Identity: Microsoft Entra ID · Lesson 7 of 32**

## What you'll learn

- The exact equation behind every Azure permission: a role assignment is a security principal, a role definition, and a scope
- The three most important built-in roles — Owner, Contributor, Reader — and what actually separates them
- The four scope levels permissions can be granted at, and how they inherit downward
- How to apply the principle of least privilege concretely, not just as an abstract rule

## The role assignment equation

Azure **RBAC (role-based access control)** decides who can do what to which
resources, and every single permission in Azure comes down to one equation:

```
Role assignment = Security principal + Role definition + Scope
```

A **security principal** is the "who" — a user, a group, a service principal (an
app's identity), or a managed identity (Chapter 6 territory). A **role definition**
is the "what" — a collection of permitted actions, like "can restart a VM" or "can
create a storage account." **Scope** is the "where" — the specific set of resources
the permission applies to. Change any one of those three pieces and you have a
different role assignment. This is the single most important mental model for
understanding access in Azure, and everything else in this lesson is detail on top
of it.

## Built-in roles: Owner, Contributor, Reader

Azure ships with dozens of built-in role definitions, but three come up constantly.
**Owner** gets full access to everything at the assigned scope, *including* the
ability to grant access to other people — Owner can hand out roles, not just use
resources. **Contributor** also gets full access to manage resources — create,
modify, delete — but critically *cannot* grant access to anyone else. **Reader** can
view everything at the scope but change nothing at all.

That distinction between Owner and Contributor is the one people most often get
wrong: "full access" sounds the same for both until you remember that only Owner can
touch role assignments themselves. A Contributor on a resource group can deploy,
resize, and delete every VM in it, but they cannot add a new person to the project
and grant them access — only an Owner (or someone with the narrower
User Access Administrator role) can do that.

## Scope: where the role actually applies

Roles can be assigned at four levels, from broadest to narrowest: **management
group**, **subscription**, **resource group**, and individual **resource**. A role
assigned at a higher level is inherited by everything underneath it — assign
Contributor at the subscription scope, and that permission flows down to every
resource group and every resource inside that subscription automatically. Assign it
at a single resource group instead, and it only applies there.

## Least privilege, applied concretely

The **principle of least privilege** means granting the narrowest role, at the
narrowest scope, that still lets someone do their actual job — nothing broader "just
in case." In practice, this usually means resisting the urge to hand out Owner at
the subscription level because it's convenient. If Alex only needs to manage VMs in
the finance app's resource group, the least-privilege assignment is Contributor at
that one resource group — not Owner at the whole subscription, and not even
Contributor at the subscription, which would quietly also grant access to every
other resource group someone else is using.

## Example: scoping a role assignment correctly

The finance team needs to manage their own VMs, storage, and networking, but nothing
outside their project. Instead of making them Owner on the subscription, you create
a resource group `rg-finance-app` and assign the finance security group the
**Contributor** role at that resource group's scope. They can now fully manage
everything inside `rg-finance-app`, they cannot touch any other resource group in
the subscription, and they cannot grant anyone else access — exactly the access they
need, and nothing more.

## Key terms

| Term | Meaning |
|---|---|
| Role assignment | The combination of a security principal, a role definition, and a scope that grants a permission |
| Security principal | The "who" in a role assignment — a user, group, service principal, or managed identity |
| Scope | The "where" — management group, subscription, resource group, or resource — that a role applies to |
| Owner | Built-in role with full access, including the ability to grant access to others |
| Contributor | Built-in role with full access to manage resources, but cannot grant access to others |
| Least privilege | Granting the narrowest role at the narrowest scope that still does the job |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: what's the actual
functional difference between Owner and Contributor, and why does scoping a
Contributor assignment to a single resource group matter more than the role choice
itself?
