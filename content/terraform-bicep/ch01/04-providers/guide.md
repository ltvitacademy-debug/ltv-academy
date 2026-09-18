# Lesson 4 — Providers

**Chapter 1 · Infrastructure as Code Fundamentals · Lesson 4 of 22**

## What you'll learn

- What a Terraform provider actually is, and why every configuration needs one
- The `azurerm` provider specifically — the plugin this course uses throughout
- Why and how to pin a provider version
- What `terraform init` does with the provider block

## A provider is a translator

Terraform's core engine knows nothing about Azure, AWS, or any other
platform. It only knows how to read HCL, build a dependency graph,
and compare desired state against state it already knows about. A
**provider** is the plugin that fills the gap — it translates generic
Terraform resource blocks into real calls against one platform's
API. For Azure, that plugin is `azurerm`, maintained by HashiCorp in
partnership with Microsoft.

```hcl
provider "azurerm" {
  features {}
}
```

That `features {}` block is required even when empty — it's where
you'd opt into provider-specific behaviors (like how `azurerm`
handles soft-deleted Key Vaults) if you needed to override a
default.

## Declaring which provider, and which version

Terraform also needs to know *which* provider and *which version* of
it to download. That goes in a `terraform` block, usually at the top
of your configuration:

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.80"
    }
  }
}

provider "azurerm" {
  features {}
}
```

`source` is the provider's address in the Terraform Registry —
`hashicorp/azurerm` resolves to
`registry.terraform.io/hashicorp/azurerm`. `version` constrains which
releases Terraform is allowed to install.

## Why pin a version at all

`~> 3.80` means "any 3.x version at 3.80 or higher, but not 4.0."
Providers ship breaking changes across major versions the same way
any software does — an unpinned provider can silently upgrade on a
teammate's machine and behave differently than it does on yours. A
version constraint keeps everyone on the team, and CI, resolving to
compatible versions.

```
version = "3.80.0"   # exact version only -- brittle, blocks all updates
version = "~> 3.80"  # 3.80.x and later 3.x releases -- the common choice
version = ">= 3.0"   # any 3.x or later -- too loose for production
```

## What `terraform init` actually does with this

Running `terraform init` in a directory containing a provider block
downloads the provider plugin matching your constraint and records
the exact version it resolved to in a lock file
(`.terraform.lock.hcl`):

```
$ terraform init

Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/azurerm versions matching "~> 3.80"...
- Installing hashicorp/azurerm v3.95.0...
- Installed hashicorp/azurerm v3.95.0 (signed by HashiCorp)

Terraform has been successfully initialized!
```

That lock file gets checked into Git alongside your `.tf` files, so
the exact same provider version is used everywhere the configuration
is applied — your laptop, a teammate's laptop, and CI.

## Key terms

| Term | Meaning |
|---|---|
| Provider | The plugin that translates Terraform resource blocks into a specific platform's API calls |
| `azurerm` | The Terraform provider for Azure, maintained by HashiCorp with Microsoft |
| `required_providers` | The block declaring which providers and version constraints a configuration needs |
| `.terraform.lock.hcl` | The lock file recording the exact provider version resolved by `terraform init` |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what
would happen if two engineers on the same team ran `terraform init`
with no version constraint on the `azurerm` provider, months apart?
