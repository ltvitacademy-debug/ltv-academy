# Lesson 14 — Choosing the Correct Azure SQL Solution for Business Requirements

**Chapter 3 · Designing & Scaling Database Resources · Lesson 1 of 5**

## What you'll learn

- A real decision framework for Azure SQL Database vs. Managed Instance vs. SQL Server on a VM
- The signals that actually force you off Azure SQL Database and onto Managed Instance
- The signals that force you all the way to a VM
- Why "it depends" is a real answer here, not a dodge

## Start from Lessons 2-3, now with a decision, not a comparison

Lessons 2 and 3 laid out what Azure SQL Database, Managed Instance, and
SQL Server on a VM each *are*. This lesson is the job you'll actually
be handed as a DBA: a set of business requirements, and a decision to
defend. Nobody asks "what's the difference between these three" —
they ask "which one do we deploy for this workload," and you have to
answer with a reason an auditor or a manager will accept.

## The framework: what forces you off the simplest option

```
Azure SQL Database (start here)
  |  needs: SQL Agent jobs, cross-db queries, linked servers,
  |         CLR, Service Broker, or the full instance-level surface area
  v
Azure SQL Managed Instance
  |  needs: OS-level access, a specific SQL Server version pin,
  |         unsupported feature (e.g. certain replication topologies),
  |         or software that must run alongside the SQL Server process
  v
SQL Server on an Azure VM
```

Each arrow is a **real, specific requirement** — not "it might be
nice to have." If nothing on a given arrow's list is true for your
workload, stop there. Most new workloads stop at Azure SQL Database.

## What actually forces Managed Instance

- The application uses **SQL Server Agent jobs** it can't be
  rewritten to live without.
- It relies on **cross-database queries or transactions** within the
  same instance — Azure SQL Database can't query across databases the
  way an instance can.
- It needs **linked servers**, **Service Broker**, or **CLR
  integration** that isn't on Azure SQL Database's supported list.
- The team is migrating dozens of existing databases and wants
  near-instance-level compatibility without a full VM to patch.

## What actually forces a VM

- You need **OS-level access** — installing third-party agents,
  custom drivers, or software that has to run on the same box as SQL
  Server.
- You need a **specific SQL Server version or build** Managed
  Instance doesn't yet offer, or a **feature Managed Instance doesn't
  support at all** (certain HA topologies, specific legacy
  configurations).
- Compliance requires you to **control patching cadence and OS
  configuration** directly, not accept Microsoft's managed cadence.

Remember the cost from Lessons 4 and 13: a VM buys you that control,
but you now own OS patching, SQL Server patching, and HA/DR
infrastructure yourself — none of that is managed for you anymore.

## Key terms

| Term | Meaning |
|---|---|
| Decision framework | Moving to the next tier only when a specific, named requirement forces it |
| Instance-level surface area | Cross-database queries, Agent jobs, linked servers — features tied to a full instance, not a single database |
| OS-level access | The ability to install software or change configuration on the machine running SQL Server itself |

## Check yourself

You're ready for Lesson 15 when you can name, without looking, one
specific requirement that forces Managed Instance and one specific
requirement that forces a VM — not "more control," the actual named
feature or constraint.
