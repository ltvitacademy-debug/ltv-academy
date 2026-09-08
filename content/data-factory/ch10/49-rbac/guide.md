# Lesson 49 — RBAC

**Chapter 10 · Security, DevOps & CI/CD · Lesson 2 of 5**

## What you'll learn

- The difference between the Contributor role and Data Factory Contributor
- What scope actually controls, and why it matters
- How to grant "can edit, can't publish" access
- Building custom roles for genuinely narrow permission needs

## Two roles, one easy confusion

Most of the roles you'd assign for Data Factory are standard,
built-in Azure roles — Owner, Contributor, Reader. There's exactly
one Data Factory-specific role worth knowing by name: **Data Factory
Contributor**.

Here's the detail that trips people up: **Contributor is a superset
of Data Factory Contributor.** If someone already has Contributor at
the resource group level, granting them Data Factory Contributor too
does genuinely nothing extra. Data Factory Contributor exists for the
narrower case — someone who should manage data factories and their
child resources, but shouldn't have blanket Contributor rights across
every other resource type in that resource group.

## What Data Factory Contributor actually grants

| Capability | Included |
|---|---|
| Create/edit/delete data factories and child resources | Yes |
| Deploy Resource Manager templates | Yes |
| Manage App Insights alerts for a data factory | Yes |
| Create support tickets | Yes |
| Create *other* Azure resource types (VMs, storage accounts, etc.) | No |

That last row matters more than it looks: Resource Manager template
deployment through this role **doesn't elevate your permissions**. If
a template you deploy tries to create a VM and you don't otherwise
have permission to create VMs, the deployment fails with an
authorization error — the role doesn't quietly grant you more than it
says it does.

## Scope: where you assign the role changes everything

The exact same role means something different depending on scope:

```
Subscription
  └── Resource Group
        └── Data Factory (individual resource)
```

- **Data Factory Contributor at Resource Group level (or above)** —
  can create, edit, and delete *any* data factory in that group.
- **Contributor at the individual Data Factory level** — can edit
  that one specific factory, but genuinely can't create new ones or
  touch anything else in the resource group.

Assign at the narrowest scope that still does the job. A user who
only ever needs to manage one specific factory shouldn't hold a
resource-group-wide role just because it was more convenient to
assign.

## A genuinely useful pattern: can edit, can't publish

Here's a real, specific scenario worth internalizing: **Git repo
permissions and Data Factory permissions are independent of each
other.** A user who's only a Data Factory **Reader**, but has write
access to the connected Git repo, can edit child resources and commit
changes to the repo — but can't click **Publish**. That's a genuinely
useful way to let someone stage changes for review without letting
them push straight to the live factory.

## Custom roles for narrower needs

The built-in roles don't cover every real scenario. A few concrete
examples Microsoft documents directly:

- **View and monitor only, no edits** — assign built-in **Reader** on
  the data factory resource.
- **Test connections and preview data, nothing else** — a custom role
  granting exactly `Microsoft.DataFactory/factories/getFeatureValue/read`
  and `Microsoft.DataFactory/factories/getDataPlaneAccess/action`.
- **Edit via PowerShell/SDK, but not the Azure portal's Publish
  button** — built-in Contributor at the factory level, without the
  Publish/Publish All buttons being usable from the portal UI itself.

## Key terms

| Term | Meaning |
|---|---|
| Data Factory Contributor | The Data Factory-specific role, a narrower alternative to full Contributor |
| Scope | The level (subscription, resource group, or individual resource) a role assignment applies at |
| Custom role | A role you define yourself, granting only specific, named permissions |

## Lab

1. Decide the correct scope for a user who should manage every data
   factory in one resource group, versus a user who should only
   manage one specific factory.
2. Write one sentence explaining the "can edit, can't publish"
   pattern and when you'd actually want it.
3. Identify which built-in role fits someone who should only view and
   monitor a data factory.

## Check yourself

You're ready for Lesson 50 when you can explain, in one sentence, why
Contributor at the resource group level makes assigning Data Factory
Contributor to that same user redundant.
