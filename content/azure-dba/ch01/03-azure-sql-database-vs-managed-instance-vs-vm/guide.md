# Lesson 3 — Azure SQL Database vs. Managed Instance vs. SQL Server on Azure VM

**Chapter 1 · Azure SQL & DBA Foundations · Lesson 3 of 95**

## What you'll learn

- The three concrete deployment options that sit under the "Azure SQL" umbrella
- What each one actually is: PaaS single database, near-full-surface PaaS instance, or full IaaS VM
- The SQL Server surface area each option gives you — and what each one takes away
- How to start narrowing which option fits a given workload, before Lesson 4 applies the IaaS/PaaS lens directly

## Three options, one umbrella

Lesson 2 established that "Azure SQL" is an umbrella, not a single
product. Underneath it sit three concrete things you can actually
deploy, and they are genuinely different products with different
management surfaces — not three pricing tiers of the same thing.

| Option | What it is | SQL Server surface area |
|---|---|---|
| Azure SQL Database | A single, fully-managed database (or elastic pool of them) | Most PaaS — a subset of full SQL Server surface |
| Azure SQL Managed Instance | A fully-managed *instance*, not just a database | Near-100% of SQL Server's instance-level surface, still PaaS |
| SQL Server on Azure VM | SQL Server installed on a VM you provision | 100% — it's SQL Server, full stop |

## Azure SQL Database: most PaaS, database-scoped

Azure SQL Database deploys a single database at a time (databases
can be grouped into elastic pools — covered fully in Lesson 10).
There's no instance-level surface to manage: no `SQL Server Agent`
in the traditional sense, no cross-database queries by default, no
instance-level configuration. In exchange, Microsoft handles patching,
backups, and most HA concerns automatically, and you provision in
seconds, not hours. This is the option most new Azure SQL workloads
should default to unless something specific rules it out.

## Managed Instance: near-100% surface, still PaaS

Azure SQL Managed Instance exists precisely because Azure SQL
Database's database-scoped model is too narrow for some real
migrations. Managed Instance gives you an actual **instance** —
cross-database queries, SQL Server Agent, `CLR`, linked servers, and
instance-level features most on-prem SQL Server workloads already
depend on — while still being PaaS: Microsoft still patches it,
backs it up, and handles the underlying OS. The tradeoff is
deployment time and a hard networking requirement (a dedicated
subnet inside a VNet) that the other two options don't demand —
both covered in full in Lesson 12.

## SQL Server on Azure VM: full IaaS, full surface

SQL Server on an Azure VM is exactly what it sounds like: a virtual
machine you provision, with SQL Server installed on top of it —
100% of SQL Server's real surface area, because it *is* SQL Server,
the same binary you'd install on-prem. Nothing about the database
engine is different. What's different is that Microsoft now owns
the physical hardware and hypervisor, while you're back to owning
the OS and the SQL Server instance yourself — patching, backups
(unless you turn on the built-in automation), and HA/DR configuration
all become your job again, same as on-prem. This is the option for
workloads that need something Azure SQL Database and Managed
Instance genuinely can't provide: OS-level access, unsupported
features, or third-party agents that must run beside SQL Server.

## Choosing between them, at a glance

```
Need database-scoped, fastest to provision, least to manage?
  -> Azure SQL Database

Need near-full SQL Server surface (Agent, cross-db, linked servers)
but still want PaaS patching/backups?
  -> Azure SQL Managed Instance

Need the OS itself, or something Azure SQL literally can't run?
  -> SQL Server on Azure VM
```

This is a first pass, not the final answer — Lesson 14 in Chapter 3
revisits this exact decision against real business requirements
once storage, scaling, and compliance factors are on the table.

## Key terms

| Term | Meaning |
|---|---|
| Azure SQL Database | PaaS, database-scoped deployment; most managed, least surface area |
| Azure SQL Managed Instance | PaaS, instance-scoped; near-100% SQL Server surface, requires a VNet subnet |
| SQL Server on Azure VM | IaaS; 100% SQL Server surface, you manage the OS and instance |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking:
which of the three options would you pick for a workload that needs
SQL Server Agent jobs and cross-database queries but should still be
patched and backed up automatically by Microsoft — and why?
