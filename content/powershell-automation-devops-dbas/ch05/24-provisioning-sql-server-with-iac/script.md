# Script — Provisioning SQL Server With IaC

## Segment 1 (title)

The last lesson made the case in principle. This one makes it concrete — a real declarative resource block that provisions an Azure SQL Database or a SQL Server VM, instead of clicking through the portal by hand.

## Segment 2 (code: a real Azure SQL Database resource)

Terraform's AzureRM provider has first-class resources for this — a logical server and a database on it. Run terraform plan and it shows exactly what will be created before anything touches Azure; run terraform apply and it actually provisions it. The pricing tier is right there in the file, reviewable in a pull request.

## Segment 3 (code: PaaS vs. IaaS changes the resource shape)

Azure SQL Database is PaaS — Microsoft manages the OS and SQL Server binaries, you provision a database. A full SQL Server instance on a VM is IaaS — you own patching and OS-level configuration instead. That's a real architectural choice you make first, then express declaratively either way.

## Segment 4 (outro)

Next up: configuration as code — enforcing settings like max server memory and sp_configure values consistently across servers, after they're provisioned.
