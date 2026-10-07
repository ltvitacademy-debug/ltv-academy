# State Commands & Recovery

You've written state to disk, moved it to a shared backend, locked it against simultaneous applies, and imported an existing resource into it. This lesson covers the everyday `terraform state` commands you'll reach for constantly, plus what to actually do when that file goes missing or looks corrupted.

## What you'll learn

- How `terraform state list` and `terraform state show` let you inspect what's being tracked
- How `terraform state mv` and `terraform state rm` change state without ever touching real infrastructure
- The order of recovery steps when a state file is lost or corrupted
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

## Key terms

| Term | Meaning |
|---|---|
| `terraform state list` | Prints every resource address currently tracked in state |
| `terraform state show` | Prints every attribute recorded for one specific resource |
| `terraform state mv` / `rm` | Rename or stop tracking a resource in state only — never touches real infrastructure |
| `terraform.tfstate.backup` | A backup Terraform writes automatically before most state-changing operations |
