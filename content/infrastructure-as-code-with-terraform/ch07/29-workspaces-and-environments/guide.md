# Workspaces & Environments

Northbridge Retail now has real Azure and AWS infrastructure under Terraform. The question this chapter answers is how a whole platform team runs that safely — starting here with how to manage dev, staging, and production without three copies of the same configuration.

## What you'll learn

- What Terraform workspaces are and the problem they solve
- The `terraform workspace new / select / list` commands
- How `terraform.workspace` can parameterize a configuration
- Why Northbridge's team ultimately chose directory-per-environment over workspaces for production

## One configuration, multiple states

A **workspace** lets you run the same `.tf` files against multiple, completely separate state files, switched with a command instead of a flag or a different folder. Every configuration starts with a `default` workspace automatically; from there you can create more:

```bash
terraform workspace new dev
terraform workspace new staging
terraform workspace list
```

```
  default
* dev
  staging
```

Each workspace gets its own isolated state. With the default local backend, that means a separate `terraform.tfstate.d/<workspace>/terraform.tfstate` file per workspace; with a remote backend, it's a separate state file keyed by workspace name in the same storage account or S3 bucket.

## Referencing the current workspace in configuration

The `terraform.workspace` expression lets one set of `.tf` files behave slightly differently per workspace — useful for naming:

```hcl
resource "azurerm_resource_group" "rg" {
  name     = "rg-northbridge-${terraform.workspace}"
  location = "eastus2"
}
```

Running this under the `dev` workspace creates `rg-northbridge-dev`; switch to `staging` with `terraform workspace select staging` and the same file creates `rg-northbridge-staging` instead.

## Workspaces vs. directory-per-environment

Workspaces are convenient, but they share the same `.tf` files, the same variable defaults, and the same provider configuration across every environment — which means a single typo in a `terraform workspace select` command can point a `terraform apply` meant for staging straight at production. Northbridge's platform team weighed this and ultimately chose **directory-per-environment** instead: separate folders (`environments/dev/`, `environments/staging/`, `environments/prod/`), each with its own backend configuration and `.tfvars` file, all calling the same shared modules. Switching environments means `cd`-ing into a different, explicit folder — there's no single flag that can silently target the wrong one.

Workspaces still earn their place for short-lived, low-risk scenarios — a throwaway environment for a feature branch or a pull-request preview — where the convenience of one command outweighs the isolation a separate directory gives you.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | A named, isolated state file that the same `.tf` configuration can be run against |
| `default` workspace | The workspace every Terraform configuration starts in automatically |
| `terraform.workspace` | An expression returning the current workspace's name, usable inside configuration |
| Directory-per-environment | Separate folders per environment, each with its own backend and `.tfvars`, calling shared modules |
