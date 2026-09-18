# Script — State Management & Remote State

## Segment 1 (title)

By default, Terraform writes what it created to a state file on your own laptop. That's fine solo. It falls apart the moment a second person needs to run apply against the same infrastructure.

## Segment 2 (code: the problem with local state)

terraform.tfstate lives only on the machine that ran apply. Lose that laptop, delete that file, or wipe that disk, and Terraform no longer knows your resource group, your storage account, or your Fabric capacity exist.

## Segment 3 (code: a remote backend)

A remote backend stores that same file somewhere shared instead — Terraform Cloud, or an azurerm backend that stores it as a blob in a Storage Account you provision once, up front. Every teammate's plan and apply now reads and writes the same file.

## Segment 4 (steps: state locking)

Remote backends add state locking. The moment someone applies, the backend locks the file. A teammate trying to apply at the same time gets refused — not a race that corrupts the state.

## Segment 5 (outro)

Local state is a single point of failure; remote state with locking removes it. Next up: the plan-then-apply workflow that reads that state on every run.
