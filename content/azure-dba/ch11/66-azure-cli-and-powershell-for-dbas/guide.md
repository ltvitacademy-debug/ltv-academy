# Lesson 66 — Azure CLI & PowerShell for Database Administrators

**Chapter 11 · Azure Automation & Infrastructure as Code · Lesson 66 of 95**

## What you'll learn

- The `az sql` command group DBAs actually reach for
- The equivalent `Az.Sql` PowerShell cmdlets, and why the syntax differs but the operations match
- Why this course does not try to turn you into a PowerShell developer

## What this lesson is not

This is not a scripting course. Most DBAs never write CLI or PowerShell
automation from a blank file — they read a script someone else wrote (or
that Microsoft's docs provided), recognize the handful of commands doing
the real work, and adapt one or two parameters for their own server and
database names. That's the skill this lesson actually builds: reading
and modifying, not authoring from scratch.

Both tools do the same job — talk to the Azure control plane instead of
clicking through the portal — through two different command sets that
frequently show up side by side in real runbooks.

## Azure CLI: `az sql`

The CLI is scriptable, cross-platform, and returns JSON by default,
which makes it easy to pipe into other tools:

```
az sql db show --name mydb --server myserver --resource-group myrg
az sql db list --server myserver --resource-group myrg
az sql db update --name mydb --server myserver --resource-group myrg \
  --service-objective S3
```

`show` reads one database's current configuration. `list` reads every
database on a server — useful for a quick inventory pass before a
migration (Lesson 70). `update` is the one that actually changes
something: here, moving a database to the S3 service tier without
touching the Azure Portal at all.

## PowerShell: the `Az.Sql` module

The same three operations, in PowerShell's cmdlet syntax:

```
Get-AzSqlDatabase -ServerName myserver -ResourceGroupName myrg
Get-AzSqlDatabase -DatabaseName mydb -ServerName myserver -ResourceGroupName myrg
Set-AzSqlDatabase -DatabaseName mydb -ServerName myserver -ResourceGroupName myrg `
  -Edition "Standard" -RequestedServiceObjectiveName "S3"
```

`Get-AzSqlDatabase` without `-DatabaseName` lists every database on the
server, same as `az sql db list`. `Set-AzSqlDatabase` is the change
operation, same as `az sql db update`. Notice the pattern: CLI uses
`--flag value`, PowerShell uses `-Parameter Value` with the backtick as
a line continuation. Once you can recognize that pattern, an unfamiliar
script in either tool stops being intimidating — it's the same handful
of nouns (server, database, resource group) and verbs (show/get,
list, update/set, create/new) every time.

## Why not go deeper

Deep PowerShell scripting — loops, error handling, module authoring —
is its own specialty, and most working DBAs get by without it. What
does show up constantly is exactly what this lesson covered: reading an
existing script enough to trust it, and changing a server name, database
name, or tier before running it. That's the bar this course sets, and
it's a real one — plenty of production incidents get resolved by someone
adapting a known-good script under pressure, not writing a new one.

## Key terms

| Term | Meaning |
|---|---|
| `az sql` | The Azure CLI command group for SQL Database/Managed Instance resources |
| `Az.Sql` | The PowerShell module with the equivalent cmdlets (`Get-`, `Set-`, `New-AzSqlDatabase`, etc.) |
| Service objective | The compute/performance tier of a database (e.g. `S3`) — what `--service-objective` and `-RequestedServiceObjectiveName` both set |

## Check yourself

Given `az sql db update --name mydb --server myserver --resource-group myrg --service-objective P2`,
write the equivalent `Set-AzSqlDatabase` command without looking back at this guide.
