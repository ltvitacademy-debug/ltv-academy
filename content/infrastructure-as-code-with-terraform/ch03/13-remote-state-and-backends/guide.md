# Remote State & Backends

Local state works fine for one person on one laptop. The moment Northbridge Retail needs a second engineer running `terraform apply` against the same Azure and AWS infrastructure, local state stops being fine — and that's what remote backends solve. This lesson covers both backends Northbridge actually relies on: `azurerm` for its Azure side, `s3` for its AWS side.

## What you'll learn

- Why a local `terraform.tfstate` file becomes a real liability for a team, not just a theoretical risk
- What a backend is, and how to configure the `azurerm` backend against an Azure Storage Account
- How to configure the `s3` backend against an S3 bucket for AWS infrastructure
- What remote state buys a team beyond "it's not on my laptop"

## The problem local state doesn't solve

A local `terraform.tfstate` file lives right next to your `.tf` files, on whichever machine happened to run `apply` last:

```
$ ls
main.tf  terraform.tfstate

# Lives only on whoever ran apply last.
# Two engineers, two clones of the repo:
#   two different "current" states, both wrong.
```

Lose that laptop, wipe that disk, or simply have two Northbridge engineers running `apply` from two separate clones of the repository, and nobody has one reliable, current copy of what's actually been built.

## The azurerm backend

For Northbridge's Azure infrastructure, the fix is a `backend "azurerm"` block pointing at a storage account and container provisioned once, up front, specifically to hold state:

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sttfstatenorthbridge"
    container_name       = "tfstate"
    key                  = "azure-prod.tfstate"
  }
}
```

Add that block and run `terraform init`, and every engineer's `plan` and `apply` reads and writes that same blob instead of a file on their own machine.

## The s3 backend

Northbridge also runs infrastructure on AWS, so that side uses a `backend "s3"` block instead:

```hcl
terraform {
  backend "s3" {
    bucket = "northbridge-tfstate"
    key    = "aws-prod/terraform.tfstate"
    region = "us-east-1"
  }
}
```

Same idea, different cloud: `bucket` and `key` identify exactly where this configuration's state lives, so one shared file replaces five laptops with five different copies.

## What remote state actually buys a team

- **Shared** — every engineer's `plan` and `apply` reads and writes the exact same file, not a private copy.
- **Durable** — the state survives any one laptop being lost, stolen, or wiped clean.
- **Lockable** — a remote backend can also prevent two `apply` runs from touching the state file at the same time, which is the entire subject of the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Local state | A state file kept only on the machine that ran `apply` — a single point of failure |
| Backend | The configured location Terraform reads and writes its state file to |
| `azurerm` backend | A remote backend storing state as a blob in an Azure Storage Account container |
| `s3` backend | A remote backend storing state as an object in an AWS S3 bucket |
