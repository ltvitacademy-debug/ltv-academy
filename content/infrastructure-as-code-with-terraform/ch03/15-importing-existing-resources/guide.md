# Importing Existing Resources

Not everything Northbridge Retail manages started life in a Terraform configuration. Some resources were clicked into existence in the Portal or console years ago, long before this course — a resource group here, an S3 bucket there. `terraform import` is how you bring one of those under Terraform's management without destroying and recreating it.

## What you'll learn

- The four-step workflow for importing an existing resource into state
- The real `terraform import` syntax for an Azure resource
- The real `terraform import` syntax for an AWS resource
- The newer `import` block, and how it differs from running `import` on the command line

## The import workflow

Importing only ever updates **state** — it never writes your `.tf` file's attributes for you. That's why the workflow has four steps:

1. **Find the real resource's ID** in the Azure or AWS console.
2. **Write a resource block** for it in your configuration — even an empty one, with no attributes filled in yet.
3. **Run `terraform import`** to connect that block to the real resource inside state.
4. **Run `terraform plan` repeatedly**, filling in attributes in your configuration until plan finally reports no changes.

## Importing an Azure resource

For a resource group a Northbridge engineer created by hand years before this course existed:

```hcl
resource "azurerm_resource_group" "example" {
  # attributes filled in after import
}
```

```
$ terraform import azurerm_resource_group.example \
  /subscriptions/0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d/resourceGroups/rg-northbridge-legacy
```

Terraform reaches out, fetches that resource's current attributes from Azure, and writes them into state under the local name you gave it — `azurerm_resource_group.example`.

## Importing an AWS resource

The same idea works on the AWS side:

```
$ terraform import aws_s3_bucket.legacy_assets northbridge-legacy-assets
```

## The newer import block

Terraform 1.5 and later also supports this as a block written directly in your configuration instead of a one-off CLI command:

```hcl
import {
  to = aws_s3_bucket.legacy_assets
  id = "northbridge-legacy-assets"
}
```

Written this way, the import runs as part of a completely normal `terraform plan` and `terraform apply` — which also means it can be reviewed in a pull request, the same way any other configuration change is.

## After the import: close the gap

Either the CLI command or the `import` block only gets the real resource's attributes into state. Your `.tf` file still needs its own attributes written in — `resource_group_name`, `location`, `name`, and so on — to match. Run `terraform plan` after importing, and anything still missing or mismatched between your configuration and state shows up as a proposed change. Keep editing the configuration and re-running `plan` until it reports no changes at all; only then is the resource fully, safely under Terraform's management.

## Key terms

| Term | Meaning |
|---|---|
| `terraform import` | A CLI command that connects an existing real resource to a resource block, writing it into state |
| `import` block | A Terraform 1.5+ configuration block that performs the same connection as part of plan/apply |
| Reconciliation | The process of editing `.tf` attributes until `plan` reports no changes after an import |
