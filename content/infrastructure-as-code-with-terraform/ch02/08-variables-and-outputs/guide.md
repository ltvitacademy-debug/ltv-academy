# Variables & Outputs

The resource blocks in the last lesson hardcoded values like `"rg-northbridge-prod"` directly into the file. That's fine for a one-off example, but it falls apart the moment Northbridge Retail needs the same configuration to also stand up a dev or staging environment. This lesson covers the two blocks that fix that: `variable`, for values that go into a configuration, and `output`, for values that come out of one.

## What you'll learn

- The `variable` block: declaring an input with a type, default, and description
- How to actually supply variable values, including `.tfvars` files
- The `output` block, and why you'd expose a value instead of hardcoding it elsewhere
- How to read output values with `terraform output`

## Declaring an input with `variable`

A **variable** block declares one input your configuration accepts:

```hcl
variable "environment" {
  type        = string
  description = "Deployment environment: dev, staging, or prod"
}

variable "vm_size" {
  type        = string
  description = "Azure VM size for the app tier"
  default     = "Standard_B2s"
}
```

`environment` has no `default`, so Terraform requires it to be supplied every run. `vm_size` has a `default`, so it's optional — omit it and Terraform uses `Standard_B2s`. Once declared, you reference a variable anywhere in your configuration as `var.environment` or `var.vm_size`.

```hcl
resource "azurerm_resource_group" "northbridge" {
  name     = "rg-northbridge-${var.environment}"
  location = "eastus2"
}
```

## Supplying values: flags, files, and `.tfvars`

You can pass a variable on the command line (`terraform apply -var="environment=staging"`), but for anything beyond a quick test, Northbridge's team keeps values in a `.tfvars` file instead:

```hcl
# prod.tfvars
environment = "prod"
vm_size     = "Standard_D2s_v3"
```

```bash
terraform apply -var-file="prod.tfvars"
```

A file named exactly `terraform.tfvars` is loaded automatically, with no flag needed — which is why teams often keep one `.tfvars` file per environment (`dev.tfvars`, `staging.tfvars`, `prod.tfvars`) and pass the right one explicitly, rather than relying on the auto-loaded default.

## Exposing a value with `output`

An **output** block exposes a value after `terraform apply` finishes — useful for anything another team, script, or Terraform configuration needs to consume:

```hcl
output "resource_group_name" {
  value       = azurerm_resource_group.northbridge.name
  description = "The resource group all Northbridge resources live in"
}

output "storage_account_primary_endpoint" {
  value = azurerm_storage_account.images.primary_blob_endpoint
}
```

Outputs commonly expose things that are only known after creation — like a storage account's endpoint URL or a VM's public IP — since those values don't exist in your `.tf` files until Terraform actually provisions the resource.

## Reading outputs with `terraform output`

After `apply`, Terraform prints every output's value. You can also ask for all of them, or just one, at any later point:

```bash
$ terraform output
resource_group_name = "rg-northbridge-prod"
storage_account_primary_endpoint = "https://northbridgeprodimages.blob.core.windows.net/"

$ terraform output resource_group_name
"rg-northbridge-prod"
```

That second form — asking for a single named output — is exactly what a deploy script or another Terraform configuration would use to pull a value out programmatically, without a person reading it off the screen.

## Key terms

| Term | Meaning |
|---|---|
| Variable | An input a configuration accepts, declared with the `variable` block and read as `var.name` |
| Default | A fallback value that makes a variable optional instead of required |
| `.tfvars` file | A file supplying variable values, loaded with `-var-file` or automatically if named `terraform.tfvars` |
| Output | A value a configuration exposes after apply, declared with the `output` block |
