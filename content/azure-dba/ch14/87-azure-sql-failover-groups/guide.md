# Lesson 87 — Azure SQL Failover Groups

**Chapter 14 · High Availability & Disaster Recovery · Lesson 87 of 95**

## What you'll learn

- What a failover group actually adds on top of geo-replication
- The listener endpoint problem it solves, and why that problem matters
- How automatic failover policies work, and why they're optional
- The T-SQL/PowerShell shape of creating one

## Geo-replication replicates data. Failover groups manage the endpoint too.

Lesson 86 covered active geo-replication: a readable secondary, kept
current in another region. But geo-replication alone leaves a real
problem unsolved — **how does the application know which region is
currently primary?** After a manual failover, the old primary's
connection string is now pointing at the wrong database. Every client
application would need to be told, by hand, to reconnect somewhere else.

A **failover group** sits on top of one or more geo-replicated database
pairs and adds exactly what's missing: a **stable listener endpoint** —
a single DNS name the application always connects to — that Azure
automatically points at whichever database is currently primary.

| | Active geo-replication alone | Failover group |
|---|---|---|
| Replicates data | Yes | Yes (it uses geo-replication underneath) |
| Manages the connection endpoint | No — client must know the actual server name | Yes — one stable DNS name, always routed to the current primary |
| Failover can be automatic | No — manual only | Optionally, based on a policy |
| What the app needs to know | Which server is primary, updated by hand | Nothing — always connects to the same endpoint |

This is the genuine difference the lesson topic calls out: geo-replication
just replicates data. A failover group is the layer *above* it that also
manages *where the application points*, so the application code never
needs to know or care which physical region is currently serving as
primary.

## Automatic failover policy — optional, and tunable

A failover group's failover can be triggered:

- **Manually** — a DBA runs the failover explicitly, same control as
  plain geo-replication.
- **Automatically** — the group monitors the primary's health and fails
  over on its own if it detects an outage, based on a policy with two
  settings: a **grace period** (how long to wait before triggering,
  avoiding a false alarm on a brief blip) and whether automatic failover
  is enabled at all.

Automatic failover trades a faster RTO for the small risk of an
unnecessary failover triggered by a transient issue — which is exactly
why the grace period exists, and why some environments deliberately
choose manual-only failover despite the slower RTO.

## Creating a failover group

Failover groups are created via PowerShell, the Azure CLI, or the Azure
Portal — there's no `CREATE FAILOVER GROUP` T-SQL statement, since a
failover group is a server-level (not database-level) Azure resource:

```powershell
New-AzSqlDatabaseFailoverGroup `
  -ResourceGroupName "ContosoRG" `
  -ServerName "contoso-sql-east" `
  -FailoverGroupName "contoso-fg" `
  -PartnerServerName "contoso-sql-west" `
  -FailoverPolicy Automatic `
  -GracePeriodWithDataLossHours 1

Add-AzSqlDatabaseToFailoverGroup `
  -ResourceGroupName "ContosoRG" `
  -ServerName "contoso-sql-east" `
  -FailoverGroupName "contoso-fg" `
  -Database (Get-AzSqlDatabase -ResourceGroupName "ContosoRG" `
    -ServerName "contoso-sql-east" -DatabaseName "SalesDB")
```

After this runs, the application connects to
`contoso-fg.database.windows.net` — never the individual server names —
and Azure keeps that name pointed at whichever server is currently
primary, automatically, based on the one-hour grace period configured
above.

## Key terms

| Term | Meaning |
|---|---|
| Failover group | A layer above geo-replication managing a stable listener endpoint, with optional automatic failover |
| Listener endpoint | The single DNS name (`<group>.database.windows.net`) the application always connects to |
| Grace period | How long an automatic failover policy waits before triggering, to avoid reacting to a brief blip |
| Failover policy | Manual or Automatic — controls whether the group fails over on its own |

## Check yourself

You're ready for Lesson 88 when you can explain, without looking: what
specific problem does a failover group solve that plain geo-replication
does not, and why does the automatic failover policy include a grace
period instead of triggering the instant the primary looks unreachable?
