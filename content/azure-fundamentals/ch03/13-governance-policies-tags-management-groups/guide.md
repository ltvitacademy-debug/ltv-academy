# Lesson 13 — Governance: Policies, Tags & Management Groups

**Chapter 3 · Security, Pricing & Governance · Lesson 13 of 18**

## What you'll learn

- Azure Policy — enforcing organization-wide rules automatically, not by asking nicely
- Tags — metadata that makes cost tracking and organization possible at scale
- Management groups — organizing many subscriptions under one hierarchy
- How these three tools work together as one governance layer

## Azure Policy: enforcing rules automatically

RBAC (Lesson 11) controls *who* can do *what*. **Azure Policy** controls
*what's allowed to exist at all*, regardless of who's creating it. A policy
is a rule evaluated automatically against every resource — "only allow
resources in the East US region," "require a cost-center tag on every
resource," "block VMs above a certain size." Where RBAC might grant someone
Contributor access and trust them to make good decisions, Policy makes the
bad decision impossible to execute in the first place, even for someone with
full Contributor rights. A policy can **deny** a non-compliant deployment
outright, or just **audit** it — flagging violations without blocking them,
useful while you're still figuring out what your rules should be.

## Tags: metadata that makes cost and organization possible

A **tag** is a name/value pair attached to a resource — `CostCenter:
Marketing`, `Environment: Production`, `Owner: jane@company.com`. Tags don't
change how a resource works; they change how you can *find, group, and bill*
it later. Remember Cost Management's "accountability" principle from Lesson
12? Tags are how that's actually implemented — filter a cost report by
`CostCenter: Marketing` and see exactly what that team is spending, across
every resource group they touch. Without tags, cost visibility stops at
"which resource group" — with them, it extends to "which team, which
environment, which project."

## Management groups: organizing subscriptions at scale

A single company often ends up with more than one Azure subscription — one
per department, one per environment, one per business unit. A **management
group** is a container that sits *above* subscriptions, letting you apply
RBAC and Policy once, at the top, and have it flow down to every subscription
underneath.

![A management group hierarchy: a root management group containing child management groups, which contain individual subscriptions, which contain resource groups and resources.](/courses/azure-fundamentals/ch03/13-governance-policies-tags-management-groups/mg-org.png)

This mirrors the nesting you already know from Lesson 5 (resource groups
inside subscriptions) — management groups just add one more layer on top:
**management groups → subscriptions → resource groups → resources**. Apply a
"no resources outside East US" policy at the management group level once,
and every subscription beneath it inherits that rule automatically, without
anyone having to configure it subscription by subscription.

## How they work together

These three tools aren't separate concerns — they're one governance layer,
applied at whatever level makes sense:

```
Management group   -- apply policy + RBAC once, inherited by all subscriptions
  Subscription      -- billing boundary, can still have its own policies
    Resource group   -- lifecycle boundary (Lesson 5)
      Resource         -- tagged for cost tracking and ownership
```

A large organization typically enforces broad rules (region restrictions,
required tags) at the management group level, and leaves narrower decisions
to individual subscriptions and resource groups.

## Key terms

| Term | Meaning |
|---|---|
| Azure Policy | A rule automatically evaluated against resources, can deny or audit |
| Tag | A name/value pair attached to a resource for tracking and organization |
| Management group | A container above subscriptions for applying RBAC/Policy at scale |
| Deny vs. audit | A policy effect that blocks vs. one that just flags a violation |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: how is
Azure Policy different from RBAC, and why would a company apply a policy at
the management group level instead of subscription by subscription?
