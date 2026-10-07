# Script — Provisioning Cloud Infrastructure With Terraform

## Segment 1 (title)

Phase one left you with two containerized services running locally under Compose. Phase two puts them on real Azure infrastructure, and it starts with Terraform instead of clicking around the portal. This lesson builds the infra terraform project for Northbridge Retail, and walks through a locking incident that happens almost as soon as more than one engineer touches it.

## Segment 2 (steps)

Northbridge's Terraform lives under infra terraform, split into a networking module and a database module, each applied once per environment with its own tfvars file. Dev and prod run the exact same module code with different inputs, so there's no hand-maintained duplicate HCL to keep in sync.

## Segment 3 (code)

Before Terraform creates anything, it needs somewhere durable to track state. Northbridge configures an azurerm backend that stores state as a blob in a storage account called sttfstatenorthbridge, inside a resource group called rg-tfstate. Dev and prod share that same backend, separated only by the state file's key.

## Segment 4 (code)

Here's the incident. Two engineers each pull main and run terraform apply within minutes of each other against the dev resource group. The second apply doesn't corrupt anything — it fails immediately with an error naming the exact engineer and operation holding the lock, because the azurerm backend uses an Azure Storage blob lease to serialize access to state.

## Segment 5 (steps)

That's the whole argument for remote state with locking: it's shared instead of living on one laptop, and the blob lease acts as a distributed lock. Without it, both applies would read the same stale state, compute conflicting diffs, and one would silently overwrite the other's record of what actually exists in Azure.

## Segment 6 (outro)

With networking, the Postgres server, and remote state locking in place, the next lesson provisions the AKS clusters themselves — dev and staging sharing one cluster, prod isolated on its own.
