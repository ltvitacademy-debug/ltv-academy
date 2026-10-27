# Lesson 16 — dbatools Basics

**Chapter 5 · Automation With PowerShell · Lesson 16 of 26**

## What you'll learn

- Why Overlook's automation needs a different tool than the Azure Portal or SSMS
- What dbatools is, and installing it
- `Invoke-DbaQuery` — running real T-SQL against `OverlookDB` from a script
- Why this is the natural starting point for everything the rest of this chapter builds

## What's missing after Chapters 2-4

Overlook's database is now provisioned (Chapter 2), secured (Chapter 3), and protected by a tested
failover group (Chapter 4). All of that still depends on someone manually running checks and
remembering to run them — exactly the "whoever happened to be on call" problem from Lesson 1,
just moved one chapter later. This chapter builds the automation layer the board actually asked
for: health checks, backup verification, and alerting that don't depend on any one person.

## Why dbatools, not just T-SQL scripts or SSMS

SQL Server Management Studio is a GUI, built for a human clicking through menus, one server at a
time. A huge amount of real DBA automation work is exactly what a GUI is bad at: checking the same
thing on a schedule, combining results from several checks into one decision, running
unattended with no one watching. **dbatools** is a free, open-source PowerShell module, maintained
by the SQL Server community, purpose-built for exactly this kind of SQL Server administration
work — not a replacement for SSMS's interactive use, but the tool for the repetitive work SSMS was
never designed to automate.

```powershell
Install-Module -Name dbatools -Scope CurrentUser
```

## Running real T-SQL against OverlookDB

The cmdlet to start with is `Invoke-DbaQuery` — it runs actual T-SQL against a server and hands
the results back as real PowerShell objects, not plain text that would need parsing:

```powershell
$results = Invoke-DbaQuery -SqlInstance "overlook-fg.database.windows.net" -Query "
    SELECT name, state_desc, recovery_model_desc
    FROM sys.databases
    WHERE name = 'OverlookDB'
"

$results | Format-Table
```

```
name          state_desc    recovery_model_desc
----          ----------    --------------------
OverlookDB    ONLINE        FULL
```

Note the `-SqlInstance` value: it's Chapter 4's failover group listener endpoint, not a specific
server name — the same reason that endpoint exists applies here. A script that connected directly
to `overlook-sql-prod` would break the moment a failover happened; connecting to the listener
endpoint means this script, and everything built on top of it in this chapter, keeps working no
matter which region is currently primary.

## Why this is the right starting point

Because `Invoke-DbaQuery`'s output is a real object collection, everything from basic PowerShell —
`Where-Object` to filter, `foreach` to act on each row — applies to it immediately. That's exactly
what Lesson 17 needs: combining several checks like this one into a single health-check routine.

## Key terms

| Term | Meaning |
|---|---|
| dbatools | A free, open-source PowerShell module purpose-built for SQL Server administration |
| `Invoke-DbaQuery` | Runs T-SQL against a server and returns the results as PowerShell objects |
| Listener endpoint | Chapter 4's stable failover group DNS name — the correct target for any script touching OverlookDB |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why does the `Invoke-DbaQuery`
example connect to `overlook-fg.database.windows.net` instead of `overlook-sql-prod` directly?
