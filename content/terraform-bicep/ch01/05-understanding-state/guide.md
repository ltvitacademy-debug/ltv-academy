# Lesson 5 — Understanding State

**Chapter 1 · Infrastructure as Code Fundamentals · Lesson 5 of 22**

## What you'll learn

- What `terraform.tfstate` actually contains
- Why state is what lets Terraform tell "create" apart from "update"
- What happens if the state file is lost, corrupted, or hand-edited
- Why this course defers remote state to Lesson 17, not this lesson

## State is Terraform's memory

Every time Terraform successfully applies a configuration, it writes
a record of exactly what it created — every resource's ID, every
attribute value it set, every dependency — into a JSON file named
`terraform.tfstate`. That file is Terraform's only memory of what it
has already built. Without it, Terraform has no way to know that the
storage account you see in the Azure Portal is the one *it* created
versus one someone made by hand.

```
terraform.tfstate  (simplified)
{
  "resources": [
    {
      "type": "azurerm_storage_account",
      "name": "example",
      "instances": [
        {
          "attributes": {
            "id": "/subscriptions/.../storageAccounts/ltvdataeng001",
            "name": "ltvdataeng001",
            "account_tier": "Standard"
          }
        }
      ]
    }
  ]
}
```

## State is what makes "plan" possible

When you run `terraform plan`, Terraform compares three things: your
HCL configuration (what you want), the state file (what it last
knew existed), and — critically — it also checks the real
infrastructure to catch drift. From that three-way comparison, it
decides whether each resource needs to be created, updated in place,
replaced, or left alone.

```
$ terraform plan

azurerm_storage_account.example: Refreshing state...

Terraform will perform the following actions:

  # azurerm_storage_account.example will be updated in-place
  ~ resource "azurerm_storage_account" "example" {
        name                     = "ltvdataeng001"
      ~ account_replication_type = "LRS" -> "GRS"
    }

Plan: 0 to add, 1 to change, 0 to destroy.
```

Without state, Terraform would have no baseline to diff against —
every `plan` would look like a fresh "create everything," even for
resources that already exist.

## Losing or hand-editing state is genuinely dangerous

Because state is the *only* record linking your HCL to the real
resources in Azure, damaging it has real consequences:

- **Delete the state file**, and Terraform "forgets" every resource
  it manages. The next `plan` will propose creating duplicates of
  resources that already exist in Azure.
- **Hand-edit the state file** (opening the JSON and changing a
  value directly) to "fix" a mismatch, and you can desynchronize
  Terraform's understanding from the real resource without Terraform
  ever validating that edit — the next `apply` acts on bad
  information.
- **Two people running `apply` from their own local state files at
  the same time** can each think they have the authoritative record,
  and overwrite each other's changes.

```
Local state, one person:        Local state, two people:
- works fine solo                - whoever applies last wins
- state lives on one laptop      - no locking, no shared source of truth
- lose the laptop, lose state    - a genuine team hazard
```

## Why this course isn't fixing that yet

That last problem — state as a single file on one person's machine —
is exactly why real teams store state remotely (in Azure Storage,
for Terraform's `azurerm` backend) instead of locally. This lesson
deliberately stops at understanding *why* that matters; Lesson 17,
"State Management & Remote State," is where you'll actually configure
a remote backend with locking. For now, know that the local state
file you've been using in these examples is a starting point, not
the production pattern.

## Key terms

| Term | Meaning |
|---|---|
| `terraform.tfstate` | The JSON file recording every resource Terraform manages and its last-known attributes |
| Drift | When real infrastructure no longer matches what state says it should be (introduced in Lesson 1) |
| Refresh | Terraform checking real infrastructure against state before computing a plan |
| Remote state | Storing the state file in a shared backend instead of locally — covered properly in Lesson 17 |

## Check yourself

Chapter 1 complete. You're ready for Chapter 2 when you can explain,
without looking: why would deleting `terraform.tfstate` cause
Terraform's next plan to propose creating resources that already
exist in Azure?
