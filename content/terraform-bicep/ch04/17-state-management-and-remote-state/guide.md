# Lesson 17 — State Management & Remote State

**Chapter 4 · IaC in Practice · Lesson 17 of 22**

## What you'll learn

- Why a local `terraform.tfstate` file is a real risk, not a theoretical one
- What a remote state backend is, and the two common choices: Terraform Cloud or an `azurerm` backend
- Why remote state also brings state locking — what stops two people applying at once
- How a configuration points at a remote backend

## The problem with local state

By default, Terraform writes what it created to a file named `terraform.tfstate`, sitting right next to your `.tf` files on your own machine. Every `plan` and `apply` reads and rewrites that file. That's fine as a demo. It stops being fine the moment a second person needs to run `terraform apply` against the same infrastructure — because the state file, the one thing that tells Terraform what it's actually managing, is only on your laptop.

```
$ ls
main.tf  terraform.tfstate

# terraform.tfstate lives only on this laptop.
# Lost laptop, deleted file, or a wiped disk:
#   Terraform no longer knows what it created.
#   No one else can safely run terraform apply.
```

Lose that file and Terraform doesn't know your resource group, your storage account, or your Fabric capacity exist. Run `apply` again with no state, and it may try to create all of them a second time — on top of the ones already sitting in Azure.

## Remote state backends

A **remote backend** stores that same state file somewhere shared instead of on one machine: Terraform Cloud (HashiCorp's own hosted service), or — the more common choice on Azure — an `azurerm` backend, which stores the state file as a blob inside an Azure Storage Account you provision once, up front, before anything else.

```
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sttfstateprod"
    container_name       = "tfstate"
    key                  = "dataplatform.tfstate"
  }
}
```

Add that block, run `terraform init`, and every teammate's `plan` and `apply` reads and writes the same file, in the same place — not five different copies scattered across five laptops.

## State locking

Remote backends add one more thing local state can't: **locking**. The moment someone runs `terraform apply`, the backend places a lock on the state file. If a teammate tries to `apply` at the same time, Terraform refuses and tells them the state is locked — instead of two people racing to rewrite the same infrastructure at once and corrupting the file that describes it.

## Key terms

| Term | Meaning |
|---|---|
| State file | The record of what Terraform actually created, and its current settings |
| Local state | A state file kept only on the machine that ran `apply` — a single point of failure |
| Remote backend | Shared storage for the state file — Terraform Cloud, or an `azurerm` backend |
| State locking | A backend preventing two `apply` runs from touching the state file at once |

## Check yourself

You're ready for Lesson 18 when you can explain: if a teammate's laptop with the only copy of `terraform.tfstate` is lost, what does Terraform no longer know — and why does a remote backend prevent that from being a catastrophe?
