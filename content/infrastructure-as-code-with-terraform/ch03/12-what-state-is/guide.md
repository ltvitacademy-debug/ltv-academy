# What State Is

The previous lesson ended with `terraform apply` creating real infrastructure for Northbridge Retail — a resource group, a storage account. The moment that command finishes, Terraform quietly does something you haven't looked at yet: it writes a file to disk. That file, `terraform.tfstate`, is how Terraform remembers what it built, and this lesson is about exactly what's inside it and why Terraform can't function without it.

## What you'll learn

- What `terraform.tfstate` actually is, and what format it's written in
- Why Terraform needs state at all: mapping your configuration to real resource IDs
- How state lets Terraform detect drift between your configuration and reality
- What Terraform loses if that file disappears

## Why your configuration alone isn't enough

Your `.tf` files describe what you want: a resource type, a local name, and a handful of attributes. What they never contain is the thing the cloud provider actually hands back after creating the resource — a real, unique resource ID. For `azurerm_resource_group.northbridge`, Azure doesn't just accept your desired name and location; it returns a full resource ID that nothing in your configuration predicted. Terraform has to keep a record of that ID somewhere, or the next time you run a command it has no way to find the resource it already created.

That record is `terraform.tfstate`.

## Inside terraform.tfstate

Here's a trimmed real state entry for that resource group:

```json
{
  "version": 4,
  "terraform_version": "1.9.0",
  "resources": [
    {
      "mode": "managed",
      "type": "azurerm_resource_group",
      "name": "northbridge",
      "provider": "provider[\"registry.terraform.io/hashicorp/azurerm\"]",
      "instances": [
        {
          "attributes": {
            "id": "/subscriptions/0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d/resourceGroups/rg-northbridge-prod",
            "name": "rg-northbridge-prod",
            "location": "eastus2"
          }
        }
      ]
    }
  ]
}
```

Notice `id`. That full Azure resource ID never appeared anywhere in your `.tf` file — Terraform received it from Azure at creation time and wrote it here. Everything Terraform does afterward, from showing you a plan to tearing the resource down, starts with looking up this entry.

## How plan uses that file to detect drift

Every `terraform plan` refreshes state against the real provider API before comparing anything:

```
$ terraform plan

azurerm_resource_group.northbridge: Refreshing state... [id=/subscriptions/.../rg-northbridge-prod]

# Terraform now has three things to compare:
#   1. what state says exists
#   2. what the Azure API actually returns right now
#   3. what your .tf files say should exist
# A mismatch between (1)/(2) and reality is reported as drift.
```

**Drift** is what happens when someone changes a resource outside of Terraform — resizing a VM in the Portal, for instance — so the real infrastructure no longer matches what state (and your configuration) last recorded. Terraform can only notice that mismatch because it has a state file to compare against in the first place. Delete `terraform.tfstate` and Terraform doesn't become cautious — it becomes blind. It no longer knows the resource group exists, and running `apply` again risks trying to create a duplicate on top of the one already sitting in Azure.

Right now, that file lives only on your own machine. That's a problem the moment a second Northbridge engineer needs to run `apply` against the same infrastructure — the subject of the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| State file (`terraform.tfstate`) | The record of every resource Terraform has created and the real attributes it was assigned |
| Resource ID | A unique identifier the cloud provider assigns at creation time, recorded in state, never typed by you |
| Drift | When real infrastructure no longer matches what state (and your configuration) say should exist |
| Refresh | The step where `plan` reads the real provider API before comparing it against state |
