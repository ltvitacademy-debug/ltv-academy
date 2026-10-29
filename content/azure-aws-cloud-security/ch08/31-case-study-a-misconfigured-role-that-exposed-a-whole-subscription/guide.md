# Lesson 31 — Case Study: A Misconfigured Role That Exposed a Whole Subscription

**Chapter 8 · Capstone: Securing a Multi-Cloud Environment · Lesson 31 of 32**

## What you'll learn

- How a custom Azure RBAC role, written with good intentions, can quietly grant far more access
  than anyone meant it to
- Why scope — the level a role assignment is made at — matters as much as the permissions inside
  the role definition itself
- How this kind of over-broad grant typically gets discovered in practice: not by a careful audit,
  but by a Defender for Cloud alert or an unrelated investigation stumbling across it
- What the real fix looks like, and why "just use a built-in role" is usually the better call than
  hand-patching a custom one

**This is an illustrative scenario for teaching purposes — Meridian Finworks is a fictional
company, not a real reported incident.**

## The setup

Meridian Finworks runs its loan-origination platform across several resource groups inside one
Azure subscription: `rg-meridian-prod-app`, `rg-meridian-prod-data`, and `rg-meridian-shared-net`.
A platform engineer needed a role for the CI/CD service principal that could restart app services,
scale out VM scale sets, and read diagnostic logs during deployments — routine operational access,
scoped to the production app resource group. Rather than composing that from Azure's built-in
`Reader` plus a narrow custom action set, the engineer wrote one custom role from a template found
online and, under deadline pressure, assigned it at the **subscription** level instead of the one
resource group it was actually meant for.

## What the role actually granted

```json
{
  "Name": "Meridian-CICD-Operator",
  "IsCustom": true,
  "Actions": [
    "Microsoft.Web/sites/restart/action",
    "Microsoft.Compute/virtualMachineScaleSets/*",
    "Microsoft.Insights/diagnosticSettings/*",
    "Microsoft.Authorization/*/read",
    "Microsoft.Resources/subscriptions/resourceGroups/read"
  ],
  "NotActions": [],
  "AssignableScopes": [
    "/subscriptions/8f21-...-meridian-prod"
  ]
}
```

Two problems compound each other here. First, `Microsoft.Compute/virtualMachineScaleSets/*`
is a wildcard at the resource-provider level — it grants every action on every VM scale set, not
just restart-and-scale, including ones in `rg-meridian-prod-data` that have nothing to do with
deployments. Second, and more consequential: `AssignableScopes` lists the whole subscription, and
the actual role *assignment* was made at that subscription scope rather than at
`rg-meridian-prod-app`. A role with somewhat-too-broad actions, scoped tightly, would have been a
minor finding. The same role, assigned subscription-wide, meant the CI/CD service principal could
act on VM scale sets, diagnostic settings, and authorization data across every resource group in
the subscription — including the data platform's own VM scale sets, well outside anything the
deployment pipeline was meant to touch.

## How it surfaced

Nobody caught this in a planned access review. It surfaced sideways: Microsoft Defender for Cloud
(Lesson 17) flagged an unrelated recommendation — "a service principal has write access to an
unusually large number of resource groups" — as part of its routine identity-and-access posture
scoring. A security engineer pulling that finding to close it out ran:

```
az role assignment list --assignee <meridian-cicd-sp-object-id> --all
```

and found a single assignment, at subscription scope, for a custom role nobody on the current team
remembered writing.

## Why this is worse than it looks at first read

The service principal in question had never actually *used* most of what it could reach — the
deployment pipeline only ever touched `rg-meridian-prod-app`. That's exactly what made this
dangerous rather than merely untidy: a credential compromise of this service principal (the kind of
incident Lesson 30 just walked through) would have hands that reached the entire subscription, not
just the one resource group the pipeline's actual job required. The blast radius of a future
incident was set by this one misconfigured assignment, long before any incident happened.

## The fix

1. **Re-scope first.** The assignment was removed at the subscription level and re-created at
   `rg-meridian-prod-app` only — the resource group the pipeline actually needed.
2. **Replace the wildcard action.** `Microsoft.Compute/virtualMachineScaleSets/*` was narrowed to
   the specific actions the pipeline calls: `restart/action` and `scaleSets/write`, not the
   provider-level wildcard.
3. **Prefer built-in roles where they fit.** Azure's built-in `Virtual Machine Contributor` and
   `Monitoring Reader` roles, combined and scoped to the one resource group, covered the same
   operational need without a custom role to maintain at all — fewer custom roles means fewer
   chances for this exact mistake to recur.
4. **Add a standing check.** Meridian added a recurring Access Analyzer-style review (same
   discipline as Lesson 12, applied to Azure RBAC) specifically for any custom role assignment made
   at subscription scope, since that single pattern was the actual root cause.

## Key terms

| Term | Meaning |
|---|---|
| `AssignableScopes` | The scopes a custom role is *allowed* to be assigned at — listing the subscription here didn't itself cause the exposure, but made the mistaken assignment possible |
| Scope vs. permissions | Two separate dimensions of a role assignment: what it can do, and where it can do it — both have to be tightened, not just one |
| Resource-provider wildcard | An action like `.../virtualMachineScaleSets/*` granting every operation under a provider, not just the specific ones a workload uses |
| Blast radius | The scope of damage a compromised identity could cause; this case study shows it being set by a misconfigured assignment, independent of whether a compromise ever happens |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why was the subscription-wide
*scope* of this assignment a bigger problem than the slightly-too-broad *actions* inside the role
definition, and what single `az role assignment list` command is how it was actually found?
