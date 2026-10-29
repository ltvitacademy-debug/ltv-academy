# Lesson 6 — Privileged Identity Management (PIM) for Azure Roles

**Chapter 2 · Azure Identity & Access Security · Lesson 2 of 4**

## What you'll learn

- The real difference between an **eligible** and an **active** role
  assignment in PIM, and why that distinction is the entire point
- How to configure activation requirements — MFA, justification,
  approval, maximum duration — for both Entra ID roles and Azure
  resource roles
- Why PIM for Azure resource roles (subscription, resource group,
  management group scope) is configured separately from PIM for
  Entra ID directory roles, and where each one lives
- What a PIM access review catches that a one-time audit never will

## Eligible vs. active: the distinction that is the whole point

You already know what Global Administrator and Owner mean. The
problem PIM solves isn't "who should have this role" — it's that a
**permanent, standing** assignment to a privileged role is a standing
liability, whether or not it's ever misused. PIM's entire model rests
on one distinction: an **eligible** assignment means a principal
*can* activate a role when they need it, for a limited time, but
doesn't hold it continuously. An **active** assignment means the
principal holds the role right now, exactly like a classic permanent
assignment. The goal of a mature PIM configuration is almost nobody
holding **permanent active** assignments to anything sensitive —
Global Administrator, Owner, User Access Administrator — and instead
holding **eligible** assignments that they activate just-in-time.

When someone needs to do privileged work, they go to **My roles** in
PIM and activate the eligible assignment for a bounded window, instead
of the role simply always being on. When the window expires, the
active assignment is automatically removed and they're back to
eligible-only.

## Configuring activation requirements

Each role setting in PIM lets you control what activation actually
requires: **require Azure MFA** at activation (on by default and
almost never worth turning off), a **justification** text box so
there's a record of why the role was activated, **require approval**
so a designated approver has to sign off before activation completes,
a **maximum activation duration** (commonly a handful of hours, never
indefinite), and whether **activation triggers a notification** to
specified reviewers. You also set **assignment** requirements
separately — whether making someone eligible in the first place
requires approval, and whether eligible assignments themselves expire
after a set period rather than lasting forever.

## Two separate PIM surfaces: directory roles vs. resource roles

This is the detail that catches people new to PIM: **PIM for Entra ID
roles** (Global Administrator, Privileged Role Administrator,
Exchange Administrator, and so on) is configured under Entra ID >
Roles and administrators, while **PIM for Azure resource roles**
(Owner, Contributor, User Access Administrator, and any custom role)
is configured separately, per **scope** — a management group, a
subscription, a resource group, or an individual resource. A user can
be eligible for Owner on one subscription and have no PIM-managed
access at all on another. Each resource-role assignment inherits down
the scope hierarchy exactly the way standard Azure RBAC does, so an
eligible assignment at a management group applies to every
subscription beneath it. Set up resource-role PIM from **Privileged
Identity Management > Azure resources**, select the subscription or
management group you want to manage, and PIM takes over governing
eligible/active assignments at that scope going forward.

## What access reviews catch that an audit doesn't

A one-time audit tells you who currently holds a role. A **PIM access
review** is a recurring, time-boxed process — typically run quarterly
— where a designated reviewer (often the resource owner, not IT) has
to explicitly approve or deny each eligible assignment's continued
existence. The value isn't catching an obviously wrong assignment;
it's catching the far more common case of an eligible assignment that
made sense six months ago, for a project that's since ended, that
nobody has actively cancelled. Left alone, eligible assignments only
accumulate. Access reviews force a recurring decision instead of a
one-time one. PIM also raises its own alerts — for roles assigned
outside of PIM entirely, too many standing Global Administrators, and
eligible assignments that have never been activated — which is a
second, continuous layer on top of scheduled reviews.

## Key terms

| Term | Meaning |
|---|---|
| Eligible assignment | A role a principal can activate on demand for a bounded window, without holding it continuously |
| Active assignment | A role the principal currently holds, functionally identical to a classic permanent assignment |
| Activation | The act of turning an eligible assignment into a time-boxed active one, optionally gated by MFA, justification, or approval |
| PIM for Azure resources | The separate PIM surface governing Owner/Contributor/custom roles at a management group, subscription, resource group, or resource scope |
| Access review | A recurring, reviewer-driven re-approval of eligible assignments, distinct from a one-time audit |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
is a permanent *active* assignment to Owner a bigger standing risk
than an eligible assignment that gets activated daily, and why is PIM
for Entra ID roles configured in a completely different place than
PIM for Azure resource roles?
