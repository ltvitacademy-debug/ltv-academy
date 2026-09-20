# Working With SQL Server via SMO

dbatools is the tool you'll reach for first, but dbatools itself doesn't invent its own way
of talking to SQL Server — under the hood, most of it is built on **SMO**, SQL Server
Management Objects. Knowing SMO directly matters because there's a wide surface of SQL
Server functionality that doesn't have a dedicated dbatools cmdlet, and SMO is how you
reach it from PowerShell.

## What you'll learn

- What SMO is and where it sits relative to dbatools
- How to load a `Server` object and browse it
- A real example of something SMO can do with no dbatools cmdlet for it
- Why dbatools existing doesn't make SMO knowledge obsolete

## What SMO actually is

SMO (`Microsoft.SqlServer.Management.Smo`) is the .NET class library Microsoft ships for
programmatically managing SQL Server — the same underlying API that SQL Server Management
Studio itself uses to render its object tree. It exposes SQL Server's entire object model
(servers, databases, tables, logins, jobs, and much more) as .NET objects with properties
and methods, callable from any .NET language, including PowerShell.

```powershell
# Load the SMO assembly (dbatools loads this for you automatically when imported)
Add-Type -AssemblyName "Microsoft.SqlServer.Smo"

$server = New-Object Microsoft.SqlServer.Management.Smo.Server "SQLPRD01"
$server.Databases | Select-Object Name, RecoveryModel, Size
```

## The Server object

Everything in SMO branches off a `Server` object — it's the root of the whole tree.
Databases, logins, jobs, linked servers, and configuration settings are all properties or
collections hanging off it:

```powershell
$server = New-Object Microsoft.SqlServer.Management.Smo.Server "SQLPRD01"

$server.Information.Version          # SQL Server version
$server.Configurations.MaxServerMemory.ConfigValue
$server.Logins | Select-Object Name, LoginType, IsDisabled
$server.Databases["Sales"].Tables | Select-Object Name, RowCount
```

This is the same object model dbatools wraps. When you call `Get-DbaDatabase`, dbatools is
doing roughly this work internally and handing you back cleaner, more DBA-friendly output.

## Something SMO can do that dbatools can't (directly)

dbatools deliberately covers the tasks DBAs do constantly, but it doesn't wrap every
single property and method SMO exposes — that would mean re-implementing the entire .NET
API by hand. A real example: scripting out a table's exact `CREATE TABLE` definition,
including constraints and indexes, as text, using SMO's `Scripter` object:

```powershell
$server = New-Object Microsoft.SqlServer.Management.Smo.Server "SQLPRD01"
$db = $server.Databases["Sales"]
$table = $db.Tables["Orders"]

$scripter = New-Object Microsoft.SqlServer.Management.Smo.Scripter $server
$scripter.Options.ScriptDrops = $false
$scripter.Options.WithDependencies = $true

$scripter.Script($table) | Out-File C:\scripts\Orders_create.sql
```

There's no single dbatools cmdlet that generates this exact scripted-object output with
this level of control over the options — because SMO's `Scripter` object already exposes
dozens of granular options directly, and dbatools focuses its cmdlet surface on the higher
-level, repeatable DBA tasks instead of wrapping every one of them individually.

## Why SMO knowledge doesn't go away

dbatools' own source code is full of SMO calls — when you install dbatools, you're
installing a large, well-tested layer written *in* SMO, not a replacement for it. For the
80% of daily work dbatools already covers cleanly, use dbatools. For the remaining edge
cases — a specific scripting option, a property dbatools hasn't wrapped, a piece of the
object model that's simply obscure — dropping down to SMO directly is the way through,
and it's the same skill this whole course keeps building on: PowerShell talking to .NET
objects, with dbatools as the friendly layer on top when it already fits.

## Key terms

| Term | Meaning |
|---|---|
| SMO | SQL Server Management Objects — the .NET API for programmatically managing SQL Server |
| `Server` object | SMO's root object; databases, logins, and jobs all hang off it |
| `Scripter` | SMO object that generates T-SQL scripts (CREATE statements, etc.) from live objects |

## Check yourself

dbatools is built partly on SMO, yet this lesson argues you still need to know SMO
directly. Why doesn't dbatools' existence make raw SMO knowledge unnecessary?
