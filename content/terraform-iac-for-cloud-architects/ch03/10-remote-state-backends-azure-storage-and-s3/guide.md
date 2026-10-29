# Lesson 10 — Remote State Backends: Azure Storage and S3

**Chapter 3 · State Management · Lesson 2 of 4**

## What you'll learn

- Why moving state off a laptop and into a remote backend fixes the
  shared-source-of-truth problem from Lesson 9
- How to configure a real `backend "azurerm"` block pointing at an
  Azure Storage Account and container
- How to configure a real `backend "s3"` block pointing at an AWS S3
  bucket
- What changes about `terraform init` once a backend block exists, and
  how to migrate state you already have locally into it

## The fix: one shared, durable copy of the truth

A **remote backend** tells Terraform to read and write
`terraform.tfstate` against a storage service everyone on the team can
reach, instead of a file on one person's disk. Configure it once, and
every teammate who runs `terraform init` in that same project connects
to the exact same state — there's no file to email around, no risk of
two divergent copies, and (with a provider like Azure Storage or S3)
built-in durability and versioning you'd never get from a laptop. It
also solves the other half of Lesson 9's problem: a storage account or
S3 bucket can be configured with server-side encryption and strict
access policies, which is a real security boundary around those
secrets instead of "hope nobody commits it to git."

## A real `azurerm` backend block

Here's a working backend configuration pointing Terraform at an Azure
Storage Account:

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sttfstateprod001"
    container_name       = "tfstate"
    key                   = "app-prod.terraform.tfstate"
  }
}
```

Read each argument for what it actually points at: `resource_group_name`
and `storage_account_name` identify the Storage Account itself (which
you create once, ahead of time, usually by hand or with a small
bootstrap Terraform config of its own), `container_name` is the blob
container inside that account where state files live, and `key` is the
specific blob name for *this* project's state — different projects
sharing the same Storage Account just use a different `key`, so one
account can safely hold many teams' state files side by side.

## A real `s3` backend block

The equivalent on AWS points at an S3 bucket instead of a Storage
Account:

```hcl
terraform {
  backend "s3" {
    bucket = "acme-terraform-state"
    key    = "app-prod/terraform.tfstate"
    region = "us-east-1"
  }
}
```

Same idea, different vocabulary: `bucket` is the S3 bucket you created
ahead of time (ideally with versioning turned on, so you can recover
an earlier state if one ever gets overwritten by mistake), `key` is the
object path within that bucket for this project — using a path like
`app-prod/terraform.tfstate` lets one bucket hold many projects' state
cleanly — and `region` is the AWS region the bucket lives in. Notice
this block says nothing about locking yet; that's `dynamodb_table`,
and it's the whole subject of Lesson 11.

## What changes about `terraform init`

Once a `backend` block exists in your configuration, `terraform init`
does more than just download providers — it also initializes the
backend connection, confirming it can actually reach that Storage
Account or S3 bucket and read/write to it. If you're adding a backend
block to a project that already has local state from Chapters 1 and 2,
running `terraform init` detects the existing local
`terraform.tfstate`, and prompts you:

```
Initializing the backend...
Do you want to copy existing state to the new backend?
  Pre-existing state was found while migrating the previous "local" backend to the
  newly configured "azurerm" backend. No existing state was found in the newly
  configured "azurerm" backend. Do you want to copy this state to the new "azurerm"
  backend? Enter "yes" to copy and "no" to start with an empty state.

  Enter a value: yes
```

Answer `yes`, and Terraform copies your current state up to the remote
backend in one move — nothing about your real infrastructure changes,
only where its state record now lives. From that point on, the local
`terraform.tfstate` file is no longer the source of truth and is safe
to leave out of git, exactly as it always should have been.

## Key terms

| Term | Meaning |
|---|---|
| Remote backend | A shared storage location (Azure Storage, S3, Terraform Cloud, etc.) where Terraform reads and writes state instead of local disk |
| `backend "azurerm"` | Backend type targeting an Azure Storage Account; configured with `resource_group_name`, `storage_account_name`, `container_name`, `key` |
| `backend "s3"` | Backend type targeting an AWS S3 bucket; configured with `bucket`, `key`, `region` |
| State migration | The one-time `terraform init` step that copies existing local state into a newly configured remote backend |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: what
does the `key` argument actually identify in both the `azurerm` and
`s3` backend blocks, and why does that let one Storage Account or S3
bucket safely hold more than one project's state?
