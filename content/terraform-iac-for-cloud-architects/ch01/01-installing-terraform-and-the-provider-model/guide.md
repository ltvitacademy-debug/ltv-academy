# Lesson 1 — Installing Terraform and the Provider Model

**Chapter 1 · Terraform Fundamentals · Lesson 1 of 4**

## What you'll learn

- How to install the Terraform CLI itself, as a standalone binary or
  through a package manager
- Why Terraform's core engine knows nothing about any specific cloud,
  and what that buys you
- What a **provider** actually is, and why it's the plugin that turns
  generic Terraform into something that can talk to Azure, AWS, or
  anywhere else
- How to write a real `required_providers` block and read exactly
  what it's telling Terraform to do

## Installing the Terraform CLI

Terraform ships as a single, self-contained binary — there's no
runtime to install alongside it, no dependency chain to untangle.
HashiCorp publishes it at releases.hashicorp.com, and on Windows the
most common path is a package manager:

```
choco install terraform
```

or, with winget:

```
winget install HashiCorp.Terraform
```

Either one downloads `terraform.exe` and puts it on your `PATH`. If
you'd rather install it by hand, you download the matching `.zip` for
your OS and architecture from releases.hashicorp.com, unzip it
somewhere on your `PATH`, and you're done — there's genuinely nothing
else to configure. Once it's installed, confirm it with:

```
terraform version
```

That should print something like `Terraform v1.9.x`. If it doesn't,
`terraform.exe` isn't on your `PATH` yet — fix that before moving on,
because every command in this course assumes `terraform` just works
from any folder.

## Terraform core is cloud-agnostic

Here's the part that surprises people coming from Bicep or ARM
templates: the `terraform` binary you just installed has **no idea
what Azure is**. It doesn't know what AWS is either. Terraform's core
engine only knows how to do a small set of generic things — read HCL
configuration files, build a dependency graph of the resources you've
declared, compare that graph against a state file, and work out a
plan of creates/updates/deletes to get from one to the other. None of
that logic is cloud-specific. That's a deliberate architectural
choice: it's what lets the same Terraform CLI manage Azure, AWS,
Google Cloud, Kubernetes, GitHub, Datadog, and hundreds of other
systems with one consistent workflow.

## Providers: the plugins that know the cloud

So how does Terraform actually create an Azure resource group if its
core doesn't know Azure exists? Through a **provider** — a plugin,
built and maintained separately from Terraform core, whose entire job
is translating Terraform's generic "create this resource" instructions
into real calls against one specific API. `hashicorp/azurerm` knows how
to talk to the Azure Resource Manager API. `hashicorp/aws` knows how to
talk to AWS's APIs. Each one is downloaded separately, versioned
separately, and only loaded when your configuration asks for it.

This is the same separation of concerns you've already seen on the
Bicep side — Bicep compiles down to ARM JSON that Azure Resource
Manager understands, while Terraform core compiles your HCL down to
provider API calls that each cloud's provider plugin knows how to
make. Different mechanism, same idea: a generic authoring layer on
top, a cloud-specific translation layer underneath.

## Declaring a provider with `required_providers`

You tell a Terraform configuration which providers it needs, and
which versions are acceptable, in a `required_providers` block inside
a `terraform` block:

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }
  required_version = ">= 1.9.0"
}

provider "azurerm" {
  features {}
}
```

Read that line by line: `source = "hashicorp/azurerm"` tells
Terraform exactly which provider to download from the Terraform
Registry — `hashicorp` is the publisher, `azurerm` is the provider
name. `version = "~> 3.100"` constrains it to the `3.100.x` line,
so an unexpected major-version upgrade can't silently change behavior
under you. `required_version` does the same thing for the Terraform
CLI itself. The separate `provider "azurerm" {}` block is where you'd
configure provider-level settings — `features {}` is required by the
`azurerm` provider even when empty, and this is also where
authentication details would go if you weren't relying on an
already-signed-in Azure CLI session.

## Key terms

| Term | Meaning |
|---|---|
| Terraform CLI | The core, cloud-agnostic engine: reads HCL, builds a dependency graph, diffs against state, produces a plan |
| Provider | A separately versioned plugin (e.g. `hashicorp/azurerm`) that translates Terraform's generic actions into one specific cloud's real API calls |
| Terraform Registry | HashiCorp's public catalog of providers and modules, referenced by `source = "hashicorp/azurerm"` |
| `required_providers` | The block inside `terraform {}` that declares which providers a configuration needs and which versions are acceptable |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
is it accurate to say Terraform core "doesn't know what Azure is,"
and what role does the `azurerm` provider play that Terraform core
itself never does?
