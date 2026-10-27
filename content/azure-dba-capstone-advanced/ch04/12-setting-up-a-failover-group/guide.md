# Lesson 12 — Setting Up a Failover Group

**Chapter 4 · High Availability & Disaster Recovery · Lesson 12 of 26**

## What you'll learn

- Why geo-replication alone doesn't fully solve Overlook's problem
- The real PowerShell commands that create a failover group for `OverlookDB`
- What automatic failover policy actually does, and the grace period setting
- What application code changes once this is in place — which is the whole point

## The problem geo-replication alone leaves unsolved

Active geo-replication keeps a readable secondary copy of `OverlookDB` current in another Azure
region. But replication alone leaves a real problem open: **how does Overlook's scheduling
application know which region is currently primary?** After a manual failover, the old primary's
connection string points at the wrong database, and every client would need to be told, by hand, to
reconnect somewhere else — exactly the kind of manual, error-prone step this capstone's board
mandate exists to eliminate.

A **failover group** sits on top of geo-replication and adds what's missing: a **stable listener
endpoint** — one DNS name the application always connects to — that Azure automatically points at
whichever database is currently primary.

| | Geo-replication alone | Failover group |
|---|---|---|
| Replicates data | Yes | Yes (uses geo-replication underneath) |
| Manages the connection endpoint | No — app must know the real server name | Yes — one stable DNS name |
| Failover can be automatic | No — manual only | Optionally, based on a policy |

## Creating Overlook's failover group

There's no `CREATE FAILOVER GROUP` T-SQL statement — a failover group is a server-level Azure
resource, created with PowerShell, the Azure CLI, or the Portal:

```powershell
New-AzSqlDatabaseFailoverGroup `
  -ResourceGroupName "OverlookRG" `
  -ServerName "overlook-sql-prod" `
  -FailoverGroupName "overlook-fg" `
  -PartnerServerName "overlook-sql-prod-west" `
  -FailoverPolicy Automatic `
  -GracePeriodWithDataLossHours 1

Add-AzSqlDatabaseToFailoverGroup `
  -ResourceGroupName "OverlookRG" `
  -ServerName "overlook-sql-prod" `
  -FailoverGroupName "overlook-fg" `
  -Database (Get-AzSqlDatabase -ResourceGroupName "OverlookRG" `
    -ServerName "overlook-sql-prod" -DatabaseName "OverlookDB")
```

`overlook-sql-prod` is the primary server from Chapter 2's Bicep deployment; `overlook-sql-prod-west`
is a secondary server in a different region, holding the geo-replicated copy of `OverlookDB`.

## Automatic failover policy, and why the grace period matters

`-FailoverPolicy Automatic` means the group monitors the primary's health and fails over on its own
if it detects an outage — no one has to notice and trigger it manually. `-GracePeriodWithDataLossHours 1`
is the setting that keeps that automation from overreacting: it waits before triggering, so a brief
network blip doesn't cause an unnecessary failover. This is a direct trade-off against Lesson 11's
RTO target — a shorter grace period gets closer to a fast RTO, at the cost of a higher chance of
reacting to a false alarm.

## What changes for the application

After this runs, Overlook's scheduling application connects to `overlook-fg.database.windows.net`
— never the individual server names — and Azure keeps that name pointed at whichever server is
currently primary, automatically. That's the entire point: the application code never needs to know
or care which physical region is serving as primary right now.

## Key terms

| Term | Meaning |
|---|---|
| Failover group | A layer above geo-replication managing a stable listener endpoint, with optional automatic failover |
| Listener endpoint | The single DNS name the application always connects to |
| Grace period | How long an automatic failover policy waits before triggering, to avoid reacting to a brief blip |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: what specific problem does a
failover group solve that geo-replication alone does not, and what does the application connect to
after it's set up?
