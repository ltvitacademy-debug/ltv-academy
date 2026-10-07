# Terraform Architecture

Before writing real Terraform configuration, it helps to know what's actually running when you type `terraform apply`. This lesson opens up Terraform itself: the core binary, the provider plugins it talks to, and the state file that ties the two together.

## What you'll learn

- The three main pieces of Terraform's architecture: Core, providers, and state
- How Terraform Core and a provider plugin communicate
- What HCL compiles down to before anything happens
- Where OpenTofu fits as a community fork of Terraform

## Terraform Core: the engine

The `terraform` binary you install is called **Terraform Core**. It does the provider-independent work: reading your `.tf` files, building a dependency graph out of the resource references inside them, walking that graph to figure out the right order of operations, and comparing desired state against real state to compute a plan. Core has no idea how to actually talk to Azure or AWS — that's not its job.

## Providers: the plugins that speak to the cloud

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}
```

A **provider** is a separate plugin binary that Terraform Core downloads (during `terraform init`) and talks to over a local RPC protocol. The `azurerm` provider knows how to translate `resource "azurerm_storage_account"` into real Azure Resource Manager API calls. The `aws` provider does the same thing for AWS APIs. Core never calls a cloud API directly — every single resource type you use is implemented inside some provider's plugin code, which is also why Terraform can support hundreds of different services without its own core ever changing.

## State: the record that ties it together

Terraform Core keeps a record, called **state**, of every resource it has created and the real-world ID each one maps to — an Azure resource ID, an AWS ARN, and so on. State is what lets Terraform tell the difference between "this resource doesn't exist yet" and "this resource exists, here's its ID, let's check if anything about it has drifted." Chapter 3 of this course goes deep on state; for now, just know it's the third essential piece alongside Core and providers.

## How a plan actually happens

1. Core parses your `.tf` files into an internal representation and builds the dependency graph.
2. For each resource, Core asks the relevant provider plugin, "what does this look like in the real world right now?"
3. Core compares that real-world answer against your desired configuration and against state, and computes the plan — what to add, change, or destroy.
4. On `apply`, Core walks the graph in dependency order, asking each provider plugin to actually make the API calls.

## A quick note on OpenTofu

**OpenTofu** is a community-governed, open-source fork of Terraform, created after a 2023 licensing change to Terraform itself. It's wire-compatible with most existing `.tf` configuration and uses the same core architecture described above — Core, providers, state. This course teaches standard Terraform, but almost everything you learn transfers directly if a team you work for chooses OpenTofu instead.

## Key terms

| Term | Meaning |
|---|---|
| Terraform Core | The main binary — parses config, builds the dependency graph, computes plans |
| Provider | A plugin binary that translates resource blocks into real API calls for one service |
| State | Terraform's record of every resource it manages and its real-world ID |
| OpenTofu | A community-governed open-source fork of Terraform with the same core architecture |
