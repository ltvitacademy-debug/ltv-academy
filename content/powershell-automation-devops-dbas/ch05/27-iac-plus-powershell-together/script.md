# Script — IaC + PowerShell Together

## Segment 1 (title)

This chapter has circled the same boundary from three angles: IaC provisions infrastructure well and models SQL-Server-internal configuration poorly. This lesson makes that boundary explicit as a workflow.

## Segment 2 (code: the handoff point)

Terraform provisions the VM or the Azure SQL Database resource. The moment that resource exists, Terraform's job for it is done — it doesn't know or care what logins exist inside the instance. An output block passes the newly-provisioned server's address to whatever runs next.

## Segment 3 (code: what dbatools picks up)

A PowerShell script picks up where Terraform left off — creating specific logins with the right roles, restoring an initial database from a known-good backup, setting up agent jobs. None of this maps cleanly to a Terraform resource built around create-update-destroy lifecycle semantics.

## Segment 4 (steps: the real pipeline, in order)

Terraform apply provisions the resource. The pipeline captures its connection details. A dbatools script runs against the new instance for logins, database restore, and agent jobs. Each tool does the part it's actually good at.

## Segment 5 (outro)

Next up: building automated alerting — a scheduled script running dbatools health checks and triggering a notification when a threshold is breached.
