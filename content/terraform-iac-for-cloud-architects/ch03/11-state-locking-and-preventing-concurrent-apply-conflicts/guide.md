# Lesson 11 — State Locking and Preventing Concurrent Apply Conflicts

**Chapter 3 · State Management · Lesson 3 of 4**

## What you'll learn

- Why a remote backend by itself still doesn't stop two people from
  running `apply` at the exact same moment
- How the `azurerm` backend locks state automatically, with no setup,
  using native blob lease locking
- How to add real DynamoDB-backed locking to the `s3` backend with the
  `dynamodb_table` argument
- What actually happens — and what the real error looks like — when
  someone tries to apply while another apply already holds the lock

## A remote backend alone isn't enough

Lesson 10 moved state into one shared location, which fixes "nobody
has the same copy." It does nothing, by itself, about timing. Two
engineers can both have the remote backend configured correctly, both
run `terraform apply` within the same thirty seconds, and both read
the same state, calculate a plan, and start writing changes back —
with no coordination between them, their two sets of writes can
interleave and corrupt the state file, or one can simply overwrite the
other's result the instant after it was saved. **State locking** is
the mechanism that stops this: before Terraform writes to state, it
first acquires an exclusive lock, and any other `apply` or `plan` that
needs to write has to wait until that lock is released.

## Locking with the `azurerm` backend: automatic

This is one of the nicer defaults in Terraform: the `azurerm` backend
locks state automatically, using Azure Blob Storage's native **lease**
mechanism — a built-in feature of blob storage that lets a client
claim temporary exclusive ownership of a blob. There's no extra
argument to set and no extra resource to provision. The same
`backend "azurerm"` block from Lesson 10 already gets locking for
free:

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "sttfstateprod001"
    container_name        = "tfstate"
    key                    = "app-prod.terraform.tfstate"
  }
}
```

## Locking with the `s3` backend: a DynamoDB table

S3 itself has no equivalent built-in lease mechanism, so the `s3`
backend relies on a separate DynamoDB table to coordinate locks — add
one argument, `dynamodb_table`, pointing at a table you provision
ahead of time:

```hcl
terraform {
  backend "s3" {
    bucket         = "acme-terraform-state"
    key            = "app-prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
  }
}
```

That table needs exactly one thing: a primary key named `LockID` of
type String — Terraform writes and deletes a row keyed on the state
file's path to claim and release the lock. You can provision it with
Terraform itself, in a small bootstrap config that runs before the
main one (since it can't depend on the backend it's helping to lock):

```hcl
resource "aws_dynamodb_table" "terraform_locks" {
  name         = "terraform-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
```

## What happens when the lock is already held

Try to `apply` while someone else's apply already holds the lock, and
Terraform refuses outright rather than risk a collision:

```
Error: Error acquiring the state lock

Error message: ConditionalCheckFailedException: The conditional request failed
Lock Info:
  ID:        5f8c1e2a-9b3d-4a7e-8c1f-2d6e0a44b912
  Path:      app-prod/terraform.tfstate
  Operation: OperationTypeApply
  Who:       alice@acme-laptop
  Version:   1.9.5
  Created:   2026-10-20 14:32:07 UTC

Terraform acquires a state lock to protect the state from being written
by multiple users at the same time. Please resolve the issue above and
try again.
```

That message is actually useful: it tells you exactly who holds the
lock (`alice@acme-laptop`), what operation they're running, and when
they started — usually the right move is simply to wait for Alice's
apply to finish, which releases the lock automatically. Terraform does
provide `terraform force-unlock <LOCK_ID>` for the rare case a lock
gets stuck (a crashed process that never released it), but running it
while an apply is genuinely still in progress is exactly the state
corruption this whole lesson exists to prevent — confirm with the
`Who` first.

## Key terms

| Term | Meaning |
|---|---|
| State locking | The mechanism that makes one `apply` or `plan` wait while another holds exclusive write access to state |
| Blob lease | Azure Blob Storage's native locking primitive; the `azurerm` backend uses it automatically, no extra config |
| `dynamodb_table` | The `s3` backend argument pointing at a DynamoDB table (primary key `LockID`, type String) used to coordinate locks |
| `terraform force-unlock` | Manually clears a stuck lock — only safe once you've confirmed the operation that held it isn't still running |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
does the `s3` backend need a separate DynamoDB table for locking when
the `azurerm` backend doesn't need anything extra at all?
