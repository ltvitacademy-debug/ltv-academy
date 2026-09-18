# Lesson 18 — The Plan → Apply Workflow

**Chapter 4 · IaC in Practice · Lesson 18 of 22**

## What you'll learn

- What `terraform plan` actually does — a dry-run diff against real state, before anything changes
- What `terraform apply` does differently, and why it asks for confirmation
- Why a team reviews the *plan output* in a pull request before anyone runs apply
- How to read the `+` / `~` / `-` symbols in a plan

## `terraform plan` — the dry run

`terraform plan` compares three things: your `.tf` files, the current state file, and — via the provider — what's actually deployed in Azure right now. It then prints exactly what would change if you ran `apply`, without changing anything.

```
$ terraform plan

  # azurerm_storage_account.data will be created
  + resource "azurerm_storage_account" "data" {
      + name     = "stdataplatformprod"
      + location = "eastus2"
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

A `+` means create, `~` means update in place, and `-` means destroy. Reading those three symbols in a plan is how you catch a mistake — like a `-` next to a storage account you did not mean to delete — before it happens, not after.

## `terraform apply` — actually doing it

`terraform apply` runs the same comparison, shows you the same plan, and then asks for confirmation before it touches anything real.

```
$ terraform apply

Do you want to perform these actions?
  Only 'yes' will be accepted to approve.

  Enter a value: yes

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Typing anything other than `yes` — including just pressing Enter — cancels the apply. Nothing is created, changed, or destroyed until that one word is typed.

## Why a team reviews the plan, not just the code

Git/GitHub/CI-CD Lesson 10 taught you to review a pull request's *code* before it merges. A Terraform plan adds something application code review can't: it shows the actual, computed effect of that code against real infrastructure — not just what the `.tf` file says, but what will really change. A reviewer reading a diff of `resource_group_name = "rg-old"` to `"rg-new"` might miss that it forces a resource to be destroyed and recreated; the plan output says so explicitly, in the open, before anyone applies it.

## Key terms

| Term | Meaning |
|---|---|
| Dry run | Showing what would change without actually changing it |
| `terraform plan` | Computes and prints the diff between code, state, and real infrastructure |
| `terraform apply` | Runs that same diff, then asks for confirmation before applying it |
| Plan output | The `+`/`~`/`-` list of every resource that would be created, changed, or destroyed |

## Check yourself

You're ready for Lesson 19 when you can explain: why does a team reviewing `terraform plan` output in a pull request catch mistakes that reviewing the `.tf` code alone would miss?
