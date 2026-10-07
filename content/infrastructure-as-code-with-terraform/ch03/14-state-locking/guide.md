# State Locking

Remote state fixed one problem for Northbridge Retail — everyone now reads and writes the same file. It didn't fix a second one: what actually stops two engineers from running `terraform apply` on that same file at the exact same moment? That's state locking, and the two backends from the last lesson handle it in two different ways.

## What you'll learn

- What a state lock is, and the problem it prevents
- How the `s3` backend locks state using a DynamoDB table
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

## Locking on Azure: native, no extra resource

The `azurerm` backend doesn't need a separate resource for this at all. It locks natively, using a lease placed directly on the state blob inside the storage account you already configured for remote state. Two different mechanisms under the hood — a DynamoDB table versus a blob lease — but the exact same guarantee either way: only one `apply` is allowed to touch the state file at any given moment.

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
| `dynamodb_table` | The DynamoDB table the `s3` backend uses to store lock records |
| Native locking | The `azurerm` backend's built-in locking via a lease on the state blob, no extra resource needed |
| Lock Info | The error output naming who holds a lock and which operation they're running |
