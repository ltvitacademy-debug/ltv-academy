# State Locking

Remote state fixed one problem for Northbridge Retail — everyone now reads and writes the same file. It didn't fix a second one: what actually stops two engineers from running `terraform apply` on that same file at the exact same moment? That's state locking, and the two backends from the last lesson handle it in a few different ways.

## What you'll learn

- What a state lock is, and the problem it prevents
- How the `s3` backend locks state using a DynamoDB table
- How newer Terraform versions can lock `s3` state natively instead, with no DynamoDB table
- How the `azurerm` backend locks state natively, with no extra resource required
- What actually happens — and what doesn't — when a second `apply` collides with a lock

## Locking on AWS: a DynamoDB table

On the AWS side, Northbridge's `s3` backend adds a `dynamodb_table` setting, pointing at a small DynamoDB table that exists purely to hold lock records — not application data:

```hcl
terraform {
  backend "s3" {
    bucket         = "northbridge-tfstate"
    key            = "aws-prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "northbridge-tf-locks"
  }
}
```

The moment someone runs `terraform apply`, Terraform writes a lock record into that table. A second `apply` started seconds later checks the same table, sees the lock already held, and refuses to proceed.

## Locking on AWS, the newer way: native S3 locking

The DynamoDB table above is still the pattern you'll see in most existing codebases, and it still works. But as of **Terraform 1.10** (OpenTofu 1.8+), the `s3` backend can lock state natively, without a separate DynamoDB table at all, by setting `use_lockfile = true`:

```hcl
terraform {
  backend "s3" {
    bucket       = "northbridge-tfstate"
    key          = "aws-prod/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}
```

This relies on a feature S3 itself added in 2024 — conditional writes — to create a small lock file (the state key with a `.tflock` suffix) right next to the state object. A second `apply` that tries to write the same lock file fails the conditional write and backs off, the same guarantee as the DynamoDB table, with one less resource to create, pay for, and maintain IAM permissions on.

Two things worth knowing before you reach for it on a real project: it needs Terraform 1.10 or newer (older Terraform versions, and some other S3-compatible backends, don't support it), and if you're migrating an existing backend you'll drop `dynamodb_table`, add `use_lockfile`, and run `terraform init -reconfigure` to pick up the change. You can also run both settings at once during a migration — Terraform then requires a lock from *both* the table and the lockfile before proceeding — but for a new project, native locking alone is the simpler choice.

## Locking on Azure: native, no extra resource

The `azurerm` backend doesn't need a separate resource for this at all. It locks natively, using a lease placed directly on the state blob inside the storage account you already configured for remote state. Three different mechanisms under the hood — a DynamoDB table, a native S3 lockfile, or a blob lease — but the exact same guarantee either way: only one `apply` is allowed to touch the state file at any given moment.

## What the second engineer actually sees

```
$ terraform apply

Error: Error acquiring the state lock

Lock Info:
  ID:        3c6b2f0a-9d41-4e2a-8b7c-1a2b3c4d5e6f
  Path:      northbridge-tfstate/aws-prod/terraform.tfstate
  Operation: OperationTypeApply
  Who:       dana@northbridge-retail.com
  Created:   2026-10-06 14:32:05 UTC

Terraform acquires a state lock to protect the state from
being written by multiple users at the same time.
```

That's not a crash — it's the lock doing exactly its job. Terraform refuses to proceed rather than let two applies race to rewrite the same infrastructure record, naming who already holds the lock and what they're running, so the second engineer knows exactly who to check in with.

## Why this matters without locking

Without a lock, two simultaneous `apply` runs can each read the same starting state, make conflicting changes, and have the second write silently overwrite the first — leaving a state file that no longer matches anything real in Azure or AWS. Locking turns that race condition into a clear, recoverable error instead of silent corruption.

## Key terms

| Term | Meaning |
|---|---|
| State lock | A hold placed on the state file for the duration of one `plan`/`apply`, blocking a second one |
| `dynamodb_table` | The DynamoDB table the `s3` backend uses to store lock records (classic AWS locking) |
| `use_lockfile` | The `s3` backend setting (Terraform 1.10+) that enables native locking via a `.tflock` file, no DynamoDB table needed |
| Native locking | Locking with no extra resource to create — the `azurerm` backend's blob lease, or the `s3` backend's `use_lockfile` option |
| Lock Info | The error output naming who holds a lock and which operation they're running |
