# Script — State Commands & Recovery

## Segment 1 (title)

You've now written state to disk, moved it to a shared backend, locked it against simultaneous applies, and imported an existing resource into it. This lesson covers the everyday terraform state commands you'll reach for constantly, plus what to actually do when that file goes missing or looks corrupted.

## Segment 2 (code)

terraform state list prints every resource currently tracked in state — a fast way to see exactly what Terraform thinks it's managing for Northbridge, across both the Azure and AWS sides. terraform state show, followed by one of those names, prints every attribute Terraform recorded for that specific resource, including the real resource ID you'd otherwise have to go dig up in the console.

## Segment 3 (code)

terraform state mv renames a resource inside state without touching the real infrastructure at all — useful after refactoring a configuration's local names or moving a resource into a module. terraform state rm removes a resource from state without destroying it in Azure or AWS; the resource keeps running exactly as it was, Terraform just stops tracking it. Both are state-only operations — neither one ever calls a cloud API.

## Segment 4 (steps)

If state goes missing or starts looking corrupted, check for terraform dot tfstate dot backup first — Terraform writes one automatically before most state-changing operations. On a remote backend, check its own version history next; an azurerm storage container or an S3 bucket with versioning enabled both keep prior copies you can restore directly. As an absolute last resort, you can rebuild a lost state file resource by resource using terraform import.

## Segment 5 (outro)

That's the full lifecycle of state: written, moved to a shared backend, locked, imported into, inspected, and recoverable when something goes wrong. Chapter 4 moves on to packaging configuration into reusable modules, starting with lesson 17: writing modules.
