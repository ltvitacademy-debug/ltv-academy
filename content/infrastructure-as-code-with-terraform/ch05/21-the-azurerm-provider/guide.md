# The azurerm Provider

Chapter 4 ended with module versioning — pinning a module to a known-good release before you build on top of it. That's exactly how production Azure configuration is usually written: wrapped in versioned modules, not raw resource blocks scattered across a repo. This chapter shows you the raw resources first, so you understand exactly what a module would be hiding. Northbridge Retail, our e-commerce example company, is moving its order-processing, storefront, and checkout workloads onto Azure, and every resource in this chapter belongs to that real buildout. Before any of it can be provisioned, Terraform needs to know which Azure subscription it's talking to and how to authenticate — that's the job of the `azurerm` provider.

## What you'll learn

- The `required_providers` block and pinning the `azurerm` provider to a known version
- Why the `provider "azurerm" {}` block needs an empty `features {}` block
- The `subscription_id` argument and three ways to authenticate to Azure
- Running `az login` and `terraform init` against Northbridge's subscription

## Declaring the provider

Every Terraform configuration that targets Azure starts with the same two blocks: `required_providers`, which pins the version, and `provider "azurerm"`, which configures it.

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.90"
    }
  }
}

provider "azurerm" {
  subscription_id = var.subscription_id
  features {}
}
```

`source = "hashicorp/azurerm"` tells Terraform exactly which provider to download from the registry — the same `registry.terraform.io` lookup you've used for every provider so far. `version = "~> 3.90"` pins it to the 3.90.x line, the same pessimistic-constraint pattern from Chapter 4, so Northbridge's pipeline never silently picks up a breaking major version.

## The features block

`features {}` is required by the `azurerm` provider even when empty — it's where you'd opt into provider-wide behaviors, like how resources are destroyed, if Northbridge ever needed to override a default. Leaving it empty keeps every default as-is. Terraform refuses to initialize an `azurerm` provider block without it.

## Authenticating to Azure

`subscription_id` tells Terraform which of Northbridge's Azure subscriptions to provision into, but it doesn't prove *who* is making the request. There are three common ways to supply that identity:

- **Azure CLI** — run `az login` once; Terraform reuses your signed-in CLI session. Best for local development.
- **Service principal** — set `ARM_CLIENT_ID`, `ARM_CLIENT_SECRET`, and `ARM_TENANT_ID` as environment variables. Used in CI/CD pipelines where no human is present to run `az login`.
- **OIDC / workload identity federation** — the pipeline exchanges a short-lived token for Azure credentials with no secret stored anywhere. The modern default for GitHub Actions and Azure DevOps pipelines.

## Running az login and terraform init

For local work on Northbridge's configuration, authenticate first, then initialize:

```bash
az login
az account set --subscription "Northbridge-Production"
terraform init
```

```text
Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/azurerm versions matching "~> 3.90"...
- Installing hashicorp/azurerm v3.95.0...

Terraform has been successfully initialized!
```

Once `terraform init` succeeds, every `azurerm_*` resource in the rest of this chapter can be planned and applied against Northbridge's subscription.

## Key terms

| Term | Meaning |
|---|---|
| `required_providers` | Block that pins a provider's source and version constraint |
| `provider "azurerm"` | Configuration block for the Azure provider, including auth and subscription |
| `features {}` | Required (can be empty) block inside `provider "azurerm"` |
| Service principal | A non-human Azure identity authenticated via client ID/secret/tenant, typically used in CI/CD |
