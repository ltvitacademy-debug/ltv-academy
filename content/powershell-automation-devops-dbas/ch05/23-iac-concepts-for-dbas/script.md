# Script — IaC Concepts, Revisited for DBAs

## Segment 1 (title)

This chapter doesn't re-teach infrastructure as code from scratch — it assumes you already know the basics and applies them specifically to the part of the stack a DBA owns: the SQL Server instance itself.

## Segment 2 (code: same principle, a different target)

The core idea doesn't change: a declarative file describes the desired end state, gets checked into source control, and a tool reconciles reality to match it. What's different for a DBA is everything that comes after the VM boots — logins, sp_configure settings, maintenance jobs, an actual database on the thing.

## Segment 3 (steps: provisioning vs. configuration)

Provisioning is bringing the resource into existence — the VM, the Azure SQL Database. Configuration is setting its internal state once it exists. IaC tools model provisioning well and configuration poorly, and that gap is exactly what the rest of this chapter works through.

## Segment 4 (outro)

Next up: a real Terraform resource block provisioning an Azure SQL Database, so you can see this applied concretely instead of just in principle.
