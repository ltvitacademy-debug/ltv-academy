# Lesson 23 — What-If Deployments and Deployment Stacks

**Chapter 6 · Bicep Deep Dive · Lesson 23 of 32**

## What you'll learn

- How `az deployment group what-if` previews a Bicep deployment
  before anything changes, the same role `terraform plan` already
  plays
- How to read a what-if result's create/modify/delete symbols
- Why Azure's default (incremental) deployment mode never deletes a
  resource removed from the template, and what problem that leaves
  unsolved
- What a Deployment Stack is, and how it closes that gap by managing
  a deployment's full resource lifecycle, including real cleanup

## Previewing with az deployment group what-if

You already know why previewing matters — Chapter 1's `terraform
plan` shows exactly what will change before `apply` touches anything
real. Bicep and ARM have the same capability, through a CLI flag
rather than a separate command:

```
az deployment group what-if \
  --resource-group rg-prod \
  --template-file main.bicep \
  --parameters prod.bicepparam
```

The output lists every resource the deployment would touch, marked
with a symbol: `+` for create, `-` for delete, `~` for modify in
place, and `=` for no change. It's the same information `terraform
plan`'s own `+`/`-`/`~` markers give you, just produced by ARM
evaluating your Bicep against the resource group's current state
instead of Terraform evaluating HCL against a state file. Run it
before every real deployment, the same discipline this course has
applied to `terraform apply` since Chapter 1.

## The gap incremental mode leaves open

Here's a real difference worth knowing before you rely on it: Azure
deployments run in **incremental mode** by default, which only adds
and updates resources that are in the template — it does **not**
delete a resource just because you removed its block from the
template. Delete a resource's Bicep block, redeploy, and that
resource keeps running in Azure, orphaned from anything that still
manages it. There's also a **complete mode**, which does delete
anything in the resource group that isn't in the template — but
that's dangerous at resource-group scope, because it deletes
*everything* unmanaged, not just what your deployment previously
created.

Terraform doesn't have this problem, because its state file already
tracks the complete set of resources it manages — delete a `resource`
block and run `terraform apply`, and Terraform destroys that specific
resource because it's no longer in the desired state, nothing else is
touched.

## Deployment Stacks: real lifecycle management for Bicep

**Deployment Stacks** are a newer Azure feature built to close that
exact gap. A stack tracks precisely which resources it deployed — not
"everything in the resource group," the complete-mode problem — and
can clean up specifically those resources when they're removed from
the template or when the stack itself is deleted:

```
az stack group create \
  --name stack-prod-network \
  --resource-group rg-prod \
  --template-file main.bicep \
  --parameters prod.bicepparam \
  --action-on-unmanage deleteResources
```

`--action-on-unmanage` is the setting that actually matters here:
`deleteResources` removes resources the stack no longer manages
(including on a template update that drops them), `deleteAll` also
deletes the resource group itself when the stack is deleted, and
`detachAll` leaves everything running and just stops tracking it.
Update a stack by rerunning `az stack group create` with the same
`--name` against an updated template — remove a resource block, and
with `deleteResources` set, that specific resource gets cleaned up
automatically, the same outcome Terraform state gives you by default.

## Key terms

| Term | Meaning |
|---|---|
| `az deployment group what-if` | Previews a deployment's create/modify/delete changes before anything runs, Bicep's equivalent of `terraform plan` |
| Incremental mode | Azure's default deployment mode; adds/updates resources in the template but never deletes one removed from it |
| Complete mode | Deletes anything in the resource group not present in the template — risky, since it affects unmanaged resources too |
| Deployment Stack | Tracks exactly which resources a deployment manages and can clean them up on removal or deletion, via `--action-on-unmanage` |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
does deleting a resource block and redeploying in plain incremental
mode leave an orphaned resource behind, and how does a Deployment
Stack's `--action-on-unmanage deleteResources` setting avoid that?
