# Script — Importing Existing Resources

## Segment 1 (title)

Not everything Northbridge Retail manages started life in a Terraform configuration. Some resources were clicked into existence in the Portal or console years ago, long before this course. terraform import is how you bring one of those under Terraform's management without destroying and recreating it.

## Segment 2 (steps)

The workflow has four steps. First, find the real resource's ID in the Azure or AWS console. Second, write a resource block for it in your configuration — even an empty one, with no attributes filled in yet. Third, run terraform import to connect that block to the real resource inside state. Fourth, run terraform plan repeatedly, filling in attributes in your configuration until plan finally reports no changes.

## Segment 3 (code)

For a resource group a Northbridge engineer created by hand years before this course existed, the command looks like this: terraform import azurerm_resource_group.example, followed by the full Azure resource ID — subscriptions, the subscription ID, resourceGroups, and the group's real name. Terraform reaches out, fetches that resource's current attributes from Azure, and writes them into state under the local name you gave it.

## Segment 4 (code)

The same idea works on the AWS side: terraform import aws_s3_bucket.legacy_assets, followed by the bucket's real name. Terraform 1.5 and later also supports this as an import block written directly in your configuration instead of a one-off CLI command — naming the resource and its ID — which plan and apply can then run as part of a completely normal workflow.

## Segment 5 (outro)

Either way, import only updates state — it never writes your dot tf file's attributes for you, which is why you still run plan afterward, again and again, until there's nothing left to reconcile. Up next, lesson 16: the terraform state commands you'll reach for constantly, and how to recover when state itself goes missing or gets corrupted.
