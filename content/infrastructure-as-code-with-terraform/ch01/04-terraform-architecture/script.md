# Script — Terraform Architecture

## Segment 1 (title)

Before writing real Terraform configuration, it helps to know what's actually running when you type terraform apply. Let's open up Terraform itself.

## Segment 2 (steps)

Terraform has three main pieces. Core is the engine — it parses your files, builds a dependency graph, and computes plans, but it has no idea how to talk to Azure or AWS. Providers are separate plugins that translate your resource blocks into real cloud API calls. And state is the record tying your configuration to the real-world IDs of everything Terraform has created.

## Segment 3 (code)

A provider is a plugin binary, downloaded during terraform init, that Core talks to over a local protocol. The azurerm provider knows how to turn a storage account resource block into real Azure Resource Manager calls. Core itself never touches a cloud API directly.

## Segment 4 (steps)

Here's what happens on a plan: Core builds the dependency graph from every resource reference in your files, asks each provider what that resource actually looks like right now, and compares that against your desired configuration and state to decide what to add, change, or destroy.

## Segment 5 (outro)

Core, providers, and state — that's the whole architecture. Next up, Lesson 5: actually installing the Terraform CLI and configuring both the azurerm and aws providers.
