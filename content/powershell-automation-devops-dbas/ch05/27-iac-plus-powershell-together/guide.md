# IaC + PowerShell Together

This chapter has circled the same boundary from three angles: IaC provisions infrastructure
well and models SQL-Server-internal configuration poorly. This final lesson makes that boundary
explicit as a workflow — where the IaC tool's job ends, and a PowerShell/dbatools script's job
begins, in a single real provisioning pipeline.

## What you'll learn

- The concrete handoff point between an IaC apply and a post-provisioning PowerShell script
- What specifically gets left to PowerShell/dbatools, and why IaC tools don't model it well
- How the two pieces chain together in a real pipeline, in order

## The handoff, concretely

Terraform provisions the VM or the Azure SQL Database resource. The moment that resource exists,
Terraform's job for it is done — it doesn't know or care what logins exist inside the instance,
what databases are on it, or what jobs are scheduled. That's the handoff point:

```hcl
resource "azurerm_mssql_server" "prod" {
  name                         = "sql-prod-eastus-01"
  resource_group_name          = azurerm_resource_group.prod.name
  administrator_login          = "sqladmin"
  administrator_login_password = var.sql_admin_password
}

output "sql_server_fqdn" {
  value = azurerm_mssql_server.prod.fully_qualified_domain_name
}
```

That `output` block matters — it's how the pipeline passes the newly-provisioned server's
address to whatever runs next.

## What's left to PowerShell/dbatools, and why

Once the server exists, a PowerShell script picks up where Terraform left off, using dbatools
for the SQL-Server-specific work IaC tools weren't built to express well:

```powershell
$sqlInstance = terraform output -raw sql_server_fqdn

New-DbaLogin -SqlInstance $sqlInstance -Login 'app_service' -Password $svcPassword
New-DbaDatabase -SqlInstance $sqlInstance -Name 'Sales'
Restore-DbaDatabase -SqlInstance $sqlInstance -Path \\fileshare\baseline\Sales.bak
New-DbaAgentJob -SqlInstance $sqlInstance -Job 'Nightly Integrity Check'
```

Creating specific logins with the right roles, restoring an initial database from a known-good
backup, setting up agent jobs — none of this maps cleanly to a Terraform resource. Terraform's
resource model is built around cloud/infrastructure objects with lifecycle semantics (create,
update, destroy); a SQL login or a restored database doesn't fit that model naturally, and
forcing it usually produces a worse result than a short, direct dbatools script would.

## The real pipeline, in order

Chaining these together is genuinely simple in principle, even if the pipeline tooling around it
(Lesson 22's CI/CD walkthrough) adds ceremony:

1. `terraform apply` provisions the SQL Server resource (VM or Azure SQL Database)
2. The pipeline captures the resource's connection details from Terraform's output
3. A PowerShell/dbatools script runs against that new instance — logins, initial database
   restore, agent jobs
4. (Optionally) a DSC configuration from Lesson 25 enforces baseline `sp_configure` settings

Each tool does the part it's actually good at. Nobody tries to make Terraform restore a
database, and nobody hand-provisions a VM when Terraform already does that reliably.

## Key terms

| Term | Meaning |
|---|---|
| Handoff point | Where IaC's job (provisioning) ends and a post-provisioning script's job (configuration) begins |
| Terraform output | A value Terraform exposes after apply, used to pass connection details downstream |
| `New-DbaLogin` / `Restore-DbaDatabase` | dbatools commands typically used in the post-provisioning step |

## Check yourself

Why does forcing a SQL login or a database restore into a Terraform resource usually produce a
worse result than handling it with a short PowerShell/dbatools script instead?
