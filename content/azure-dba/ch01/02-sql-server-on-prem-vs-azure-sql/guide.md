# Lesson 2 — SQL Server On-Prem vs. Azure SQL — Understanding the Ecosystem

**Chapter 1 · Azure SQL & DBA Foundations · Lesson 2 of 95**

## What you'll learn

- What "on-prem SQL Server" actually means for a DBA's daily responsibilities
- The real shift Azure SQL makes: not "the same server, somewhere else" but a different ownership split
- Why "Azure SQL" is an umbrella term, not one product
- How to think about the ecosystem before Lesson 3 splits it into three concrete options

## On-prem: you own the whole stack

Every responsibility a DBA has ever had starts with one fact: on a
traditional on-prem SQL Server, **you own everything above the
concrete floor**. You (or your infrastructure team) rack the
hardware, patch the operating system, install and patch SQL Server
itself, configure storage and networking, build the backup jobs,
build the HA/DR topology, and answer the pager when any layer of
that stack fails at 2 a.m. Nothing about that is wrong — it's simply
total ownership, and total ownership is total responsibility.

```
On-prem SQL Server — what you own:
  hardware / power / cooling
  operating system + patching
  SQL Server installation + patching
  storage, networking, firewall rules
  backups, HA/DR, monitoring
  ...all of it, all the time
```

## Azure SQL: an umbrella, not a product

"Azure SQL" is not one thing you deploy — it's the umbrella term
Microsoft uses for a *family* of ways to run SQL Server-compatible
workloads in Azure, each one moving a different slice of that
ownership list onto Microsoft. Some options move almost everything
except your data and your queries. Others move only the hardware
and let you keep patching the OS yourself. The three concrete shapes
this umbrella covers — Azure SQL Database, Azure SQL Managed
Instance, and SQL Server on an Azure VM — are Lesson 3's subject in
full; this lesson is about the shift underneath all three of them.

## The real shift: ownership, not location

The tempting way to describe Azure SQL is "SQL Server, but in the
cloud instead of your server room." That's misleading. The real
shift is *which responsibilities move to Microsoft, and which stay
with you* — and that split is different for each of the three
options. A DBA moving to Azure SQL doesn't stop being a DBA; the job
changes shape. Patching an OS you'll never SSH into isn't a task
you automate away — it's a task that stops being yours at all. What
replaces it is capacity planning, cost management, and understanding
exactly which knobs Microsoft left you and which ones it took.

```
On-prem question:              Azure SQL question:
"did last night's OS patch      "did I pick the deployment option
 install cleanly?"                that even has an OS I'd patch?"
"is the RAID array healthy?"    "did I pick the right storage tier?"
"is my failover cluster up?"    "did I turn on the built-in HA?"
```

## Why this matters before Lesson 3

Every one of the three concrete deployment options trades a
different amount of control for a different amount of
Microsoft-managed convenience. Understanding *that there's a trade,
and what's being traded* is the prerequisite for choosing correctly
between them — which is exactly what Lesson 3 does side by side, and
what Lesson 4 reframes through the IaaS/PaaS lens specifically.

## Key terms

| Term | Meaning |
|---|---|
| On-prem SQL Server | SQL Server you host and fully own — hardware through HA/DR |
| Azure SQL | Umbrella term for Microsoft's family of Azure-hosted SQL Server-compatible options |
| Ownership split | Which layers of the stack you manage vs. which Microsoft manages, per option |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
is "Azure SQL" the wrong term to use if someone asks you which
*specific* product they should deploy?
