# Script — Importing Existing Resources

## Segment 1 (title)

A storage account got created by hand months ago, or by an earlier team before Terraform was adopted. It's real and pipelines depend on it, but Terraform has no record of it.

## Segment 2 (code: finding the resource)

Terraform import is how you bring that resource under management without recreating it. First you find its real Azure resource ID — here, with az storage account show.

## Segment 3 (code: the resource block)

Import doesn't write your .tf file for you. You write a resource block describing what you believe already exists, matching every setting the real resource actually has.

## Segment 4 (code: running the import)

Then terraform import binds that block to the real resource's ID in state. The resource is now in state — Terraform knows it exists and considers it managed.

## Segment 5 (steps: always plan after)

Import doesn't check your block matches reality field for field. Run terraform plan right after — no changes means it matches. Any diff means the next apply would try to change a resource that's been running fine in production.

## Segment 6 (outro)

Write the block, import, then plan to verify. Next up: running plan and apply automatically, from CI/CD.
