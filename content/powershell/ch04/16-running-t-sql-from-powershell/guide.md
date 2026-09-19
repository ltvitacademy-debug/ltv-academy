# Lesson 16 — Running T-SQL From PowerShell: An Intro to dbatools

**Chapter 4 · PowerShell for Azure & SQL · Lesson 16 of 18**

## What you'll learn

- What dbatools is, and why it exists — the SQL Server admin tasks the GUI couldn't script
- Installing it: `Install-Module dbatools`
- `Invoke-DbaQuery` — running actual T-SQL from a PowerShell script
- Why this genuinely matters: one script, many servers, no SSMS clicking

## Why dbatools exists

SQL Server Management Studio is a GUI — built for a human clicking
through menus, one server at a time. A huge amount of real DBA work
is exactly the kind of thing a GUI is bad at: checking the same
thing across fifty servers, running the same maintenance step every
night, comparing settings between two environments. That's the gap
**dbatools** fills — a free, open-source PowerShell module,
maintained by the SQL Server community, purpose-built for SQL Server
administration. It doesn't replace SSMS for interactive work; it
replaces the *repetitive* work SSMS was never designed to automate.

```powershell
Install-Module -Name dbatools -Scope CurrentUser
```

It installs the same way `Az` does (Lesson 14) — no surprises there.

## Invoke-DbaQuery: T-SQL from a script

The single most useful cmdlet to start with is `Invoke-DbaQuery` —
it runs actual T-SQL against a server and hands the results back as
real PowerShell objects, not text you'd have to parse:

```powershell
$results = Invoke-DbaQuery -SqlInstance "SQL-PROD-01" -Query "
    SELECT name, recovery_model_desc, state_desc
    FROM sys.databases
    WHERE database_id > 4
"

$results | Format-Table
```

```
name              recovery_model_desc   state_desc
----              -------------------   ----------
SalesDB           FULL                  ONLINE
InventoryDB       SIMPLE                ONLINE
ArchiveDB         FULL                  ONLINE
```

Because that output is a real object collection, everything from
Chapters 1-3 applies to it immediately — pipe it through
`Where-Object` to filter, `foreach` to act on each row, or wrap the
whole thing in a function you call against a list of servers.

## Why this matters: many servers, one script

The real value shows up once you stop running this against one
server:

```powershell
$servers = "SQL-PROD-01", "SQL-PROD-02", "SQL-PROD-03"

foreach ($server in $servers) {
    $dbCount = (Invoke-DbaQuery -SqlInstance $server `
        -Query "SELECT COUNT(*) AS n FROM sys.databases").n
    Write-Host "$server has $dbCount databases"
}
```

That's Lesson 12's `foreach`, running real T-SQL, across a whole
fleet, in a few lines — the exact kind of thing that would mean
opening SSMS three separate times, or writing and re-writing the
same query by hand. This is also the natural PowerShell-side
counterpart to Azure Database Administrator Lesson 63's "Automating
DBA Maintenance" — that lesson covered automation from the SQL
Server Agent side (jobs running inside the server); dbatools
automates the same kind of maintenance work from *outside* the
server, scripted and repeatable across as many servers as you give
it.

## Key terms

| Term | Meaning |
|---|---|
| dbatools | A free, open-source PowerShell module purpose-built for SQL Server administration |
| `Invoke-DbaQuery` | Runs T-SQL against a server and returns the results as PowerShell objects |
| Why it exists | Automates the repetitive, multi-server work SSMS's GUI was never designed for |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking:
what does `Invoke-DbaQuery` hand back that makes its results
immediately usable with `Where-Object` or `foreach`, and why is that
different from copying query output out of SSMS?
