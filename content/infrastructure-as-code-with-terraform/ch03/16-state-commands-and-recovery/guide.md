# State Commands & Recovery

You've written state to disk, moved it to a shared backend, locked it against simultaneous applies, and imported an existing resource into it. This lesson covers the everyday `terraform state` commands you'll reach for constantly, plus what to actually do when that file goes missing or looks corrupted.

## What you'll learn

- How `terraform state list` and `terraform state show` let you inspect what's being tracked
- How `terraform state mv` and `terraform state rm` change state without ever touching real infrastructure
- The order of recovery steps when a state file is lost or corrupted
- A full worked scenario: recovering from an `apply` that errors out partway through
- Where modules — the subject of Chapter 4 — fit after you've mastered state

## Inspecting state: list and show

`terraform state list` prints every resource currently tracked in state — a fast way to see exactly what Terraform thinks it's managing for Northbridge, across both the Azure and AWS sides:

```
$ terraform state list
azurerm_resource_group.northbridge
azurerm_storage_account.images
aws_s3_bucket.legacy_assets
```

`terraform state show`, followed by one of those names, prints every attribute Terraform recorded for that specific resource, including the real resource ID you'd otherwise have to go dig up in the console:

```
$ terraform state show azurerm_resource_group.northbridge
# id, name, location, and every other recorded attribute
```

## Renaming and removing: mv and rm

```
$ terraform state mv azurerm_resource_group.example azurerm_resource_group.northbridge

$ terraform state rm aws_s3_bucket.legacy_assets

# Neither command calls a cloud API.
# The real resources are untouched either way.
```

`terraform state mv` renames a resource inside state without touching the real infrastructure at all — useful after refactoring a configuration's local names or moving a resource into a module. `terraform state rm` removes a resource from state without destroying it in Azure or AWS; the resource keeps running exactly as it was, Terraform just stops tracking it. Both are state-only operations — neither one ever calls a cloud API.

## Recovering lost or corrupted state

If state goes missing or starts looking corrupted, work through this order:

1. **Check for `terraform.tfstate.backup`** — Terraform writes one automatically before most state-changing operations.
2. **Check the backend's own version history** — an `azurerm` storage container or an S3 bucket with versioning enabled both keep prior copies you can restore directly.
3. **As an absolute last resort, rebuild it** — resource by resource, using `terraform import` for everything that's left untracked.

That order matters: a backup or a prior version restores everything at once, while re-importing is slow, manual, and only worth doing when nothing else is left.

## Troubleshooting scenario: a partial, failed apply

Lost or corrupted state is one failure mode. A more common one is state that's perfectly intact
but no longer matches reality, because an `apply` died partway through.

**Problem description.** Northbridge is adding a new storage account and a container inside it
in one `apply`. The run errors out after the storage account is created in Azure but before the
container resource is applied — a transient API timeout on Azure's side, not a config mistake.
The terminal shows a failed run; nobody's sure what state Terraform is actually in now.

**Available evidence.**

```
$ terraform apply

azurerm_storage_account.exports: Creating...
azurerm_storage_account.exports: Creation complete after 24s [id=/subscriptions/.../exports]

azurerm_storage_container.exports_raw: Creating...

Error: context deadline exceeded

Error: Provider produced inconsistent final plan
```

**Diagnostic questions.**

- Does `terraform state list` already know about the storage account that was created, or does
  Terraform think the apply never started?
- Is the storage account that got created actually usable, or did it fail partway through its
  own provisioning?
- If state and reality now disagree, which one is correct, and how would you find out — not
  guess?

**Expected investigation sequence.**

```bash
# Step 1 -- does state already have the resource the error happened AFTER?
terraform state list | grep storage_account
azurerm_storage_account.exports    # yes -- Terraform did record it

# Step 2 -- does state have the resource the error happened ON?
terraform state list | grep storage_container
# (nothing) -- confirms the container was never created or recorded

# Step 3 -- confirm reality matches state's belief about the storage
# account specifically, rather than assuming the error message's
# ordering is the full story
az storage account show --name northbridgeexports --query "provisioningState"
"Succeeded"

# Step 4 -- re-run plan to see what Terraform now believes needs to happen
terraform plan
# Plan: 1 to add (azurerm_storage_container.exports_raw), 0 to change, 0 to destroy
```

**Correct resolution.** Because Terraform's own provider recorded the storage account in state
the moment it finished creating (state updates happen resource-by-resource during an apply, not
only at the very end), `terraform plan` already shows the accurate, minimal next step: create only
the missing container. Re-running `terraform apply` finishes the job without re-creating the
storage account or touching anything else.

**Why this failure happens, and why it isn't actually dangerous here.** The detail worth
understanding is that Terraform writes state incrementally, resource by resource, as each one
finishes — not as one atomic write at the very end of an apply. That's precisely why a failure
partway through doesn't produce a state/reality mismatch on its own: everything that *finished*
is correctly recorded, and everything that *didn't* simply isn't there yet, which `plan` reports
accurately. The real risk scenario is different — a resource that's left in a half-created,
genuinely broken state by the provider itself (not just "not yet started") — which `plan` or
`apply` will usually surface as its own error on the next run, worth investigating before blindly
re-applying.

**Prevention.** Treat `terraform plan` as the mandatory first step after any failed apply, never
`terraform apply` directly — plan is read-only and tells you exactly what Terraform believes
changed, without risk of compounding a partial failure. For operations more likely to leave a
resource genuinely half-created (multi-step resources, cross-resource dependencies), a `-target`
apply isolating just that resource lets you resolve it before resuming the full plan.

## Key terms

| Term | Meaning |
|---|---|
| `terraform state list` | Prints every resource address currently tracked in state |
| `terraform state show` | Prints every attribute recorded for one specific resource |
| `terraform state mv` / `rm` | Rename or stop tracking a resource in state only — never touches real infrastructure |
| `terraform.tfstate.backup` | A backup Terraform writes automatically before most state-changing operations |
| Incremental state write | Terraform records each resource in state as it finishes during an apply, not only at the very end — why a partial failure is recoverable with `plan`, not corrupting |
