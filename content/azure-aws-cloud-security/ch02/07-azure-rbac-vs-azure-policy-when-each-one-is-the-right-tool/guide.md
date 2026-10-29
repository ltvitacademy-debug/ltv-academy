# Lesson 7 — Azure RBAC vs. Azure Policy: When Each One Is the Right Tool

**Chapter 2 · Azure Identity & Access Security · Lesson 3 of 4**

## What you'll learn

- The precise difference in what Azure RBAC and Azure Policy each
  actually govern, beyond "one is permissions and one is rules"
- How an RBAC role definition's `Actions`, `NotActions`, and
  `DataActions` combine with scope to define exactly what a
  principal can do
- What Azure Policy effects — `Deny`, `Audit`, `AuditIfNotExists`,
  `DeployIfNotExists`, and `Modify` — each actually do at evaluation
  time
- Why real governance almost always needs both tools together, not
  one instead of the other

## Two different questions, two different control planes

You already know Azure RBAC assigns roles and that Azure Policy
enforces rules. The distinction that actually matters operationally
is *which question each one answers*. Azure RBAC answers: **can this
principal attempt this action at all?** It's evaluated by Azure
Resource Manager at authorization time, before anything happens — if
RBAC says no, the request never reaches a resource provider.
Azure Policy answers a different question: **is this resource's
configuration allowed, regardless of who created it?** Policy doesn't
care whether the caller is an Owner or a Reader; it evaluates the
resource's properties against a rule.

This is why an Owner — who can do literally anything RBAC permits —
can still be blocked from creating a storage account without
encryption, or have that storage account flagged as non-compliant
after the fact. RBAC authorized the attempt. Policy judged the
result.

## Inside an RBAC role definition

A **role definition** is scoped permission data, not a UI toggle.
Its core fields are `Actions` (the management-plane operations it
grants, like `Microsoft.Storage/storageAccounts/write`), `NotActions`
(exclusions carved out of a broader `Actions` wildcard — how Azure
builds roles like Contributor, which is `*` minus the ability to
grant access to others), and `DataActions`/`NotDataActions` (data-plane
operations, like reading blob contents, which are governed separately
from management-plane actions because a role can permit managing a
storage account's configuration without permitting reading the data
inside it). Every assignment of that role definition also carries a
**scope** — management group, subscription, resource group, or a
single resource — and permissions apply at that scope and everything
beneath it. A custom role is just a JSON document combining these
fields differently from the built-ins; you reach for one when no
built-in role's `Actions`/`NotActions` combination matches the exact
slice of permission the job actually requires.

## Inside an Azure Policy effect

A **policy definition** evaluates a resource's properties against a
rule and applies an **effect**. `Deny` stops a non-compliant resource
from being created or updated at all — the closest Policy gets to
acting like RBAC, except it's keyed on configuration, not identity.
`Audit` lets the write through but flags the resource non-compliant
in the compliance dashboard, useful for rolling out a new standard
without breaking anyone immediately. `AuditIfNotExists` checks for a
related resource's existence (did this VM get a specific extension
installed?) and flags non-compliance if it's missing, without
touching the primary resource. `DeployIfNotExists` goes further and
actually remediates — it deploys a related resource if it's missing,
like attaching a diagnostic setting to a resource that doesn't have
one, using a managed identity with its own scoped RBAC permissions to
do the deploying. `Modify` can add, update, or remove specific
properties or tags on the resource being evaluated, directly, at
write time. Related policies are grouped into an **initiative**
(policy set) and assigned together at a scope, exactly like RBAC role
assignments.

## Why real governance uses both

Consider: "only the platform team should be able to create storage
accounts, and every storage account in the subscription must have
public blob access disabled." The first half is an RBAC problem —
restrict the `Microsoft.Storage/storageAccounts/write` action to a
custom role assigned to the platform team, deny it to everyone else.
The second half is a Policy problem — RBAC has no concept of a
storage account's `allowBlobPublicAccess` property, but a `Deny`-effect
policy evaluating that exact property does. Using RBAC alone would
stop the wrong people from creating storage accounts but do nothing
about a platform-team member creating one with public access enabled
by mistake. Using Policy alone would catch the misconfiguration but
let anyone attempt the creation in the first place. Production
governance layers them: RBAC restricts who can act, Policy constrains
what the result of that action is allowed to look like.

## Key terms

| Term | Meaning |
|---|---|
| Role definition | The JSON document defining `Actions`/`NotActions`/`DataActions` — what a role permits, independent of who it's assigned to |
| Scope | The management group, subscription, resource group, or resource an RBAC assignment or Policy assignment applies to and inherits downward from |
| `Deny` effect | A Policy effect that blocks a non-compliant resource from being created or updated |
| `DeployIfNotExists` | A Policy effect that actively remediates by deploying a related resource when it's missing |
| Initiative | A named group of policy definitions assigned together at a scope |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
can an Azure Owner still be blocked from creating a non-compliant
resource even though RBAC grants them unrestricted `Actions`, and
what's the practical difference between `Audit` and `Deny` when
rolling out a new policy to an existing subscription full of
resources?
