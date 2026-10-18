# Setting Up an Azure Quantum Workspace

Everything you've written so far has run on a simulator on your own machine. To submit a job to real hardware, a resource-estimator target, or even a cloud simulator, you first need an **Azure Quantum workspace** — an Azure resource that acts as the front door between your Q# code and every provider Azure Quantum connects you to.

## What you'll learn

- What an Azure Quantum workspace is, and where it sits in your Azure subscription
- The real prerequisites: subscription, resource group, linked storage account
- How to create a workspace from the Azure Portal and from the `az quantum` CLI
- How your code (Q# CLI, `qsharp`/`azure-quantum` Python packages) connects to a workspace once it exists
- Why providers are selected per-workspace, not globally

## A workspace is an Azure resource, like any other

An Azure Quantum workspace isn't a separate quantum-specific cloud — it's an ordinary Azure resource, provisioned inside a **resource group**, inside your **Azure subscription**, exactly the way a storage account or a virtual machine is. That matters practically: it shows up in the Azure Portal's resource list next to everything else you manage, it's billed through the same subscription, it can be governed by the same Azure RBAC roles and tags your organization already uses, and it can be deleted or redeployed with the same `az` tooling as any other resource. There's no separate "quantum account" to set up first.

Two things a workspace specifically requires beyond a bare resource group:

- **A linked storage account.** Azure Quantum uses Azure Storage to hold job inputs and outputs — the compiled program you submit and the results that come back. You either let workspace creation provision a new storage account for you or point it at an existing one in the same region.
- **At least one provider added during or after creation.** A provider is a specific simulator, resource estimator, or hardware partner you want this workspace to be able to submit jobs to. Providers aren't workspace-wide defaults — each workspace explicitly lists which ones it has access to, and some require accepting separate terms or being added to a provider's own access list.

## Creating a workspace from the Portal

The Portal flow is the most direct path for a first workspace: search for "Azure Quantum Workspaces," choose **Create**, then fill in subscription, resource group, workspace name, region, and the linked storage account. During creation you pick which providers to attach — at minimum, the built-in resource estimator (which has no separate access requirements) is worth adding immediately, since it's free and doesn't require any hardware-partner approval.

## Creating a workspace from the CLI

The same operation is scriptable with the Azure CLI's `quantum` extension, which is the more realistic path once you're managing workspaces as part of a repeatable setup rather than a one-off:

```bash
az extension add --name quantum

az group create \
  --name rg-quantum-dev \
  --location eastus

az quantum workspace create \
  --resource-group rg-quantum-dev \
  --workspace-name qsharp-dev-workspace \
  --location eastus \
  --storage-account mystoragelinked \
  --provider-sku-list "microsoft-elements.full-state-simulator:microsoft-elements,microsoft.estimator:microsoft-elements"
```

The `--provider-sku-list` argument is where you declare which providers and plan tiers this workspace should have access to; you can add more providers to an existing workspace later without recreating it.

## Connecting to the workspace from code

Once a workspace exists, your Q# or Python code needs its identity to submit jobs to it. From Python, the `azure-quantum` package's `Workspace` object takes the subscription ID, resource group, workspace name, and location directly, or a single connection string copied from the Portal's workspace overview page:

```python
from azure.quantum import Workspace

workspace = Workspace(
    subscription_id="<subscription-id>",
    resource_group="rg-quantum-dev",
    name="qsharp-dev-workspace",
    location="eastus",
)
```

Authentication happens through your existing Azure credentials (an `az login` session, or a managed identity in a cloud pipeline) — you don't manage separate Azure Quantum API keys. The same workspace reference is what later lessons in this chapter use to list available targets and submit jobs.

## Key terms

| Term | Meaning |
|---|---|
| Azure Quantum workspace | An Azure resource that connects your code to simulators, the resource estimator, and hardware providers |
| Resource group | The Azure container a workspace (and its linked storage account) is provisioned inside |
| Linked storage account | The Azure Storage account a workspace uses to hold job inputs/outputs |
| Provider | A specific simulator, estimator, or hardware partner a workspace has been explicitly granted access to |
| `az quantum workspace create` | The Azure CLI command (via the `quantum` extension) that provisions a workspace from script |

## Check yourself

A teammate says "I created an Azure Quantum workspace, so now I can submit to any hardware provider Azure Quantum offers." What's wrong with that statement, and what would you need to check or do before their first real-hardware job could actually run?
