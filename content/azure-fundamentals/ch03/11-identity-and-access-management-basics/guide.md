# Lesson 11 — Identity & Access Management Basics

**Chapter 3 · Security, Pricing & Governance · Lesson 11 of 18**

## What you'll learn

- Why "who you are" (Entra ID, from Lesson 9) and "what you're allowed to do" are two separate questions
- Role-Based Access Control (RBAC) — the actual permission model Azure uses
- The three-part shape of every role assignment: who, what role, at what scope
- The principle of least privilege, and why it's the default posture, not an afterthought

## Authentication vs. authorization

Lesson 9 covered Microsoft Entra ID, which answers one question: *who is this?*
A username and password, maybe multi-factor, proves you are who you say you
are — that's **authentication**. It doesn't say anything about what you're
allowed to touch once you're in. A billing clerk and a database administrator
can both authenticate successfully with Entra ID and still need completely
different permissions once inside a subscription. That second question — *what
is this identity allowed to do?* — is **authorization**, and in Azure it's
handled by a separate system: Role-Based Access Control.

## RBAC: the actual permission model

**Role-Based Access Control (RBAC)** is how Azure decides what an
authenticated identity can do. Every RBAC rule, called a **role assignment**,
has exactly three parts:

```
Role assignment = WHO + WHAT ROLE + AT WHAT SCOPE

WHO      a user, a group, or a service (an application identity)
ROLE     a named bundle of permissions — e.g. "Reader", "Contributor", "Owner"
SCOPE    where the role applies — subscription, resource group, or one resource
```

A **role** is just a predefined bundle of permissions. "Reader" can view
resources but not change them. "Contributor" can create and modify resources
but not grant other people access. "Owner" can do both — including managing
who else has access. Azure ships dozens of built-in roles this way, and you
can also build custom ones, but almost everything an AZ-900-level student
needs is covered by Reader, Contributor, and Owner.

## Scope: where a role assignment actually applies

Scope is the part people miss first. The exact same "Contributor" role means
something different depending on where you assign it:

| Scope | What "Contributor" means there |
|---|---|
| Subscription | Can manage every resource in every resource group in that subscription |
| Resource group | Can manage every resource inside that one resource group only |
| Individual resource | Can manage that one resource — nothing else |

This is the same nesting Lesson 5 introduced for resource groups. Assign a
role at a subscription, and it flows down to every resource group and
resource beneath it. Assign it at one resource group, and it's contained
there. Assign it at a single resource, and it touches nothing outside that
resource.

## The principle of least privilege

**Least privilege** means granting an identity only the access it actually
needs to do its job — not more, "just in case." A reporting analyst who only
needs to view cost data gets **Reader** at the resource group scope, not
**Owner** at the subscription scope. This isn't extra caution bolted on top —
it's the default posture, because every unnecessary permission is a bigger
blast radius if that identity's credentials are ever compromised. When you're
deciding on a role assignment, the question is never "what's the biggest role
that would work" — it's "what's the smallest role and narrowest scope that
still lets this identity do its job."

## Key terms

| Term | Meaning |
|---|---|
| Authentication | Proving who you are (handled by Microsoft Entra ID) |
| Authorization | Determining what an authenticated identity is allowed to do |
| RBAC | Role-Based Access Control — Azure's permission model |
| Role assignment | A role granted to a user/group/service at a specific scope |
| Least privilege | Granting only the minimum access needed, nothing more |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: what are
the three parts of every RBAC role assignment, and why does assigning
"Contributor" at a resource group scope behave differently than assigning it
at a subscription scope?
