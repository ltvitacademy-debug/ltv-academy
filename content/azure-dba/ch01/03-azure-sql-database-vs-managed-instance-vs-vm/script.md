# Script — Azure SQL Database vs. Managed Instance vs. SQL Server on Azure VM

## Segment 1 (title)

Under the Azure SQL umbrella sit three genuinely different products: Azure SQL Database, a single fully-managed database; Azure SQL Managed Instance, a fully-managed instance with near-full SQL Server surface; and SQL Server on an Azure VM, full IaaS with 100% of the surface.

## Segment 2 (steps: the three options)

Azure SQL Database is most PaaS — database-scoped, fastest to provision, least to manage, but no instance-level surface. Managed Instance gives you near-100% of SQL Server's surface, including Agent and cross-database queries, while Microsoft still patches and backs it up. SQL Server on a VM is the real binary, full surface, but you're back to owning the OS and instance yourself.

## Segment 3 (code: choosing at a glance)

If you just need a database, fast and low-maintenance, pick Azure SQL Database. If you need Agent jobs, cross-database queries, or linked servers but still want PaaS patching, pick Managed Instance. If you need the OS itself, pick SQL Server on a VM.

## Segment 4 (outro)

This is a first pass — Chapter 3 revisits the same decision against real business requirements once storage, scaling, and compliance are on the table. Next up: applying the IaaS/PaaS lens directly to these three options.
