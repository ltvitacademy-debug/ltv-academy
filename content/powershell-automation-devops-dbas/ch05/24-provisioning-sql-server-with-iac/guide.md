# Provisioning SQL Server With IaC

The last lesson made the case in principle. This one makes it concrete: a real declarative
resource block that provisions a SQL Server target — an Azure SQL Database, or a VM running SQL
Server — instead of clicking through the Azure portal by hand.

## What you'll learn

- What a real Terraform resource block for Azure SQL actually looks like
- The difference between provisioning Azure SQL Database (PaaS) and a SQL Server VM (IaaS), and
  why that choice changes what IaC can and can't do for you
- Why the values in these blocks are almost always parameterized rather than hardcoded

## A real Azure SQL Database resource

Terraform's AzureRM provider has first-class resources for Azure SQL. A minimal, real example
that provisions a logical server and a database on it:

```hcl
resource "azurerm_mssql_server" "prod" {
  name                         = "sql-prod-eastus-01"
  resource_group_name          = azurerm_resource_group.prod.name
  location                     = azurerm_resource_group.prod.location
  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = var.sql_admin_password
}

resource "azurerm_mssql_database" "sales" {
  name      = "Sales"
  server_id = azurerm_mssql_server.prod.id
  sku_name  = "S1"
}
```

Run `terraform plan` and it shows you exactly what will be created before anything touches
Azure; run `terraform apply` and it actually provisions the logical server and the database.
No portal navigation, no "did I set the right pricing tier" guesswork — the tier (`S1` here) is
right there in the file, reviewable in a pull request before it ever runs.

## PaaS vs. IaaS: what changes

Azure SQL Database (the example above) is PaaS — Microsoft manages the underlying OS and SQL
Server binaries; you provision a database, not a server. If instead you need a full SQL Server
instance on a VM (for features Azure SQL Database doesn't support, or for a lift-and-shift
migration), the resource shape changes to an `azurerm_windows_virtual_machine` plus a SQL Server
VM extension, and you now own patching and OS-level configuration that Azure SQL Database would
have handled for you.

```hcl
resource "azurerm_windows_virtual_machine" "sql_vm" {
  name                = "vm-sqlprod-01"
  resource_group_name = azurerm_resource_group.prod.name
  location            = azurerm_resource_group.prod.location
  size                = "Standard_D4s_v5"
  admin_username      = "sqladmin"
  admin_password      = var.vm_admin_password
  # network_interface_ids, os_disk, source_image_reference omitted for brevity
}
```

This isn't a decision IaC makes for you — it's a real architectural choice (PaaS for less
operational overhead, IaaS for full instance-level control) that you make first, and then
express declaratively either way.

## Why values are parameterized, not hardcoded

Notice `var.sql_admin_password` above rather than a literal password in the file. Real IaC for
SQL Server almost never hardcodes secrets or environment-specific values directly in the
resource block — passwords come from a secrets store or variable input, and values like SKU
size or region are often variables too, so the same template can provision dev, test, and prod
with different inputs (Lesson 26 covers this environment-consistency pattern directly).

## Key terms

| Term | Meaning |
|---|---|
| `azurerm_mssql_server` / `azurerm_mssql_database` | Terraform AzureRM provider resources for Azure SQL Database (PaaS) |
| PaaS (Platform as a Service) | Microsoft manages the OS/SQL Server binaries; you provision a database |
| IaaS (Infrastructure as a Service) | You provision a VM and own the OS/SQL Server installation and patching |

## Check yourself

If a team needs full control over SQL Server-level features not exposed by Azure SQL Database —
say, specific instance-level configuration — which provisioning path (PaaS or IaaS) do they need,
and what extra operational responsibility do they take on by choosing it?
