# Lesson 19 — Importing Existing Resources

**Chapter 4 · IaC in Practice · Lesson 19 of 22**

## What you'll learn

- The real problem `terraform import` solves — a resource that already exists but Terraform doesn't know about
- Why you must write a matching resource block *before* you import
- The exact `terraform import` command shape
- Why you always run `terraform plan` immediately after an import

## The problem: a resource Terraform has never heard of

A storage account got created by hand in the Portal, months before this codebase existed — or by an earlier team, before anyone adopted Terraform at all. It's real, it's running, and pipelines depend on it. But Terraform has no record of it in state, so as far as `terraform plan` is concerned, it doesn't exist. Bringing it under management without recreating it — and risking a delete-and-rebuild of something already in production — is exactly what `terraform import` is for.

```
# Created by hand, months ago — Terraform has never heard of it.
$ az storage account show \
    --name stdataplatformprod \
    --resource-group rg-data-platform \
    --query id -o tsv

/subscriptions/.../storageAccounts/stdataplatformprod
```

## Write the resource block first

`terraform import` does not write your `.tf` file for you. You write a resource block that describes what you believe already exists, and only then does import bind that block to the real resource's ID in state.

```
resource "azurerm_storage_account" "data" {
  name                     = "stdataplatformprod"
  resource_group_name      = "rg-data-platform"
  location                 = "eastus2"
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
```

## Running the import

```
$ terraform import azurerm_storage_account.data \
    /subscriptions/.../storageAccounts/stdataplatformprod

azurerm_storage_account.data: Importing from ID...
azurerm_storage_account.data: Import prepared!
azurerm_storage_account.data: Refreshing state...

Import successful!
```

The resource is now in state — Terraform knows it exists and considers it managed.

## Always plan right after

Import doesn't check that your resource block matches reality field for field. Run `terraform plan` immediately: no changes means your block matches what's actually deployed. Any `~` in that plan means your block is wrong about some setting, and the *next* `apply` would silently try to change or even recreate a resource that's been running fine in production — the exact outcome import was supposed to prevent.

## Key terms

| Term | Meaning |
|---|---|
| `terraform import` | Binds an existing resource's real Azure ID to a resource block in state, without recreating it |
| Import target | The resource address (like `azurerm_storage_account.data`) the imported resource is bound to |
| Drift after import | A mismatch between your resource block and the resource's real settings, visible as a plan diff |

## Check yourself

You're ready for Lesson 20 when you can explain: why must you write the resource block *before* running `terraform import`, and why is running `terraform plan` right afterward not optional?
